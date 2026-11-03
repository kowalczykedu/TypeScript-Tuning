import { DatabaseSync } from "node:sqlite";
import { Irepository } from "./IRepository";
import Motor from "../model/Motor";
import type { Peca } from "../model/Peca";
import type { TipoPeca } from "../model/TipoPeca";
import { PecaOriginal } from "../model/PecaOriginal";
import { PecaNaoInstalada } from "../model/PecaNaoInstalada";
import { buscarPorNomeExato } from "../util/buscarPorNomeExato";
import { filtrarPorNome }from "../util/filtrarPorNome";
import { PecaNaoEncontradaError } from "../model/exceptions/PecaNaoEncontradaError";

export class Database implements Irepository<Motor> {
    private banco: DatabaseSync;
    private catalogo: Map<TipoPeca, Peca[]>;

    constructor(caminhoDoBanco: string, catalogo: Map<TipoPeca, Peca[]>) {
        this.banco = new DatabaseSync(caminhoDoBanco);
        this.catalogo = catalogo;
        this.criarTabelas();
    }

    private criarTabelas(): void {
        this.banco.exec("PRAGMA foreign_keys = ON");
        this.banco.exec(`
            CREATE TABLE IF NOT EXISTS motores ( 
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL UNIQUE,
                cilindros INTEGER NOT NULL,
                potencia_base REAL NOT NULL,
                limite_base REAL NOT NULL,
                pressao_base REAL NOT NULL
            );
        `);
        this.banco.exec(`
            CREATE TABLE IF NOT EXISTS pecas_instaladas ( 
                motor_id INTEGER NOT NULL,
                slot TEXT NOT NULL,
                tipo TEXT NOT NULL CHECK (tipo IN ('original', 'nao_instalada', 'customizada')),
                nome_peca TEXT,
                PRIMARY KEY (motor_id, slot),
                FOREIGN KEY (motor_id) REFERENCES motores(id) ON DELETE CASCADE
            );
        `);
    }

    salvar(motor: Motor): void {
        this.banco.exec("BEGIN");
        try {
            const resultado = this.banco
                .prepare("INSERT INTO motores (nome, cilindros, potencia_base, limite_base, pressao_base) VALUES (?, ?, ?, ?, ?)")
                .run(motor.getNome(), motor.getCilindros(), motor.getPotenciaBase(), motor.getLimiteBase(), motor.getPressaoBase());

            const motorId = resultado.lastInsertRowid;

            const inserirPeca = this.banco.prepare(
                "INSERT INTO pecas_instaladas (motor_id, slot, tipo, nome_peca) VALUES (?, ?, ?, ?)"
            );

            for (const [slot, peca] of motor.getPecas()) {
                let tipo: string;
                let nomePeca: string | null;

                if (peca instanceof PecaOriginal) {
                    tipo = "original";
                    nomePeca = null;
                } else if (peca instanceof PecaNaoInstalada) {
                    tipo = "nao_instalada";
                    nomePeca = null;
                } else {
                    tipo = "customizada";
                    nomePeca = peca.getNome();
                }
                inserirPeca.run(motorId, slot, tipo, nomePeca);
            }

            this.banco.exec("COMMIT");
        } catch (erro) {
            this.banco.exec("ROLLBACK");
            throw erro;
        }
    }

    listar(): Motor[] {
        const linhasMotores = this.banco.prepare("SELECT * FROM motores").all();
        const consultarPecas = this.banco.prepare(
            "SELECT slot, tipo, nome_peca FROM pecas_instaladas WHERE motor_id = ?"
        );

        const motores: Motor[] = [];

        for (const linha of linhasMotores) {
            const id = Number(linha.id);
            const nome = String(linha.nome);
            const cilindros = Number(linha.cilindros);
            const potenciaBase = Number(linha.potencia_base);
            const limiteBase = Number(linha.limite_base);
            const pressaoBase = Number(linha.pressao_base);

            const linhasPecas = consultarPecas.all(id);
            const pecas = new Map<TipoPeca, Peca>();
            for (const linhaPeca of linhasPecas) {
                const slot = String(linhaPeca.slot) as TipoPeca;
                const tipo = String(linhaPeca.tipo);   
                
                let peca: Peca;
                const pecasDoSlot = this.catalogo.get(slot);

                if (tipo === "original") {
                    peca = new PecaOriginal(slot);

                } else if (tipo === "nao_instalada") {
                    peca = new PecaNaoInstalada(slot);

                } else {
                    const nomePeca = String(linhaPeca.nome_peca);

                    if (pecasDoSlot === undefined) {
                        throw new PecaNaoEncontradaError(
                            `O catálogo não possui o slot "${slot}" (motor "${nome}").`,
                            nomePeca,
                            slot
                        );
                    }

                    const encontrada = buscarPorNomeExato(pecasDoSlot, nomePeca);
                    if (encontrada === undefined) {
                        throw new PecaNaoEncontradaError(
                            `A peça "${nomePeca}" do motor "${nome}" não existe mais no slot "${slot}" do catálogo.`,
                            nomePeca,
                            slot
                        );
                    }
                    peca = encontrada;
                }
                pecas.set(slot, peca);
            }
            const motor = new Motor(nome, cilindros, potenciaBase, limiteBase, pressaoBase, pecas);
            motor.recalcular();
            motores.push(motor);
        }
        return motores;
    }

    pesquisarPorNome(nome: string): Motor[] {
        return filtrarPorNome(this.listar(), nome);
    }
}