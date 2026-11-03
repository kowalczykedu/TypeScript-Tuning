import type Motor from "../model/Motor";
import type { TipoPeca } from "../model/TipoPeca";
import type { Peca } from "../model/Peca";
import type { Irepository } from "../repository/IRepository";
import { EscolhaInvalidaError } from "../model/exceptions/EscolhaInvalidaError";
import { NomeDuplicadoError } from "../model/exceptions/NomeDuplicadoErro";
import { buscarPorNomeExato } from "../util/buscarPorNomeExato";

export class MotorService {
    private motoresPreDefinidos: Motor[];
    private catalogo: Map<TipoPeca, Peca[]>;
    private repositorio: Irepository<Motor>;
    private readonly TAMANHO_MAXIMO_NOME = 40;

    constructor(motoresPreDefinidos: Motor[], catalogo: Map<TipoPeca, Peca[]>, repositorio: Irepository<Motor>) {
        this.motoresPreDefinidos = motoresPreDefinidos;
        this.catalogo = catalogo;
        this.repositorio = repositorio;
    }

    getMotores(): Motor[] {
        return this.motoresPreDefinidos;
    }

    getPecas(): Map<TipoPeca, Peca[]> {
        return this.catalogo;
    }

    listarPecasDoSlot(tipoPeca: TipoPeca): Peca[] {
        const pecas = this.catalogo.get(tipoPeca);
        if (!pecas) {
            throw new Error(`Nenhuma peça encontrada para o tipo ${tipoPeca}`);
        }
        return pecas;
    }

    instalarPecaNoMotor(motor: Motor, tipoPeca: TipoPeca, peca: Peca): void {
        motor.instalarPeca(tipoPeca, peca);
    }

    buscarMotor(indice: number): Motor | undefined {
        return this.motoresPreDefinidos[indice];
    }

    adicionarMotorCustomizado(motor: Motor, nomeDigitado: string): void {
        let nomeCustomizado = nomeDigitado.trim();
        if (nomeCustomizado === "") {
            nomeCustomizado = motor.getNome();
        }

        if (nomeCustomizado.length > this.TAMANHO_MAXIMO_NOME) {
            throw new EscolhaInvalidaError(`O nome do motor customizado não pode exceder ${this.TAMANHO_MAXIMO_NOME} caracteres. Nome digitado: `, nomeCustomizado);
        }

        if (buscarPorNomeExato(this.repositorio.listar(), nomeCustomizado) !== undefined) {
            throw new NomeDuplicadoError(`Já existe um motor usando esse nome, por favor escolha outro. Nome digitado: `, nomeCustomizado);
        }

        motor.renomear(nomeCustomizado);
        this.repositorio.salvar(motor);
    }

    getMotoresCustomizados(): Motor[] {
        return this.repositorio.listar();
    }

    pesquisarMotoresCustomizados(nome: string): Motor[] {
        return this.repositorio.pesquisarPorNome(nome);
    }
}