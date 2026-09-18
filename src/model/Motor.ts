import { TipoPeca } from "./TipoPeca";
import { Peca } from "./Peca.ts";

export default class Motor {
    private nome: string;
    private cilindros: number;
    private potenciaBase: number;
    private limiteBase: number;
    private potenciaAtual: number;
    private limiteAtual: number;
    private pressaoBase: number;
    private pecas: Map<TipoPeca, Peca>;

    constructor(nome: string, cilindros: number, potenciaBase: number, limiteBase: number, pressaoBase: number, pecas: Map<TipoPeca, Peca>) {
        this.nome = nome;
        this.cilindros = cilindros;
        this.potenciaBase = potenciaBase;
        this.potenciaAtual = potenciaBase;
        this.limiteBase = limiteBase;
        this.limiteAtual = limiteBase;
        this.pressaoBase = pressaoBase
        this.pecas = pecas;
    }

    //Inicio getters
    getNome(): string {
        return this.nome;
    }

    getCilindros(): number {
        return this.cilindros;
    }

    getPotenciaBase(): number {
        return this.potenciaBase;
    }

    getLimiteBase(): number {
        return this.limiteBase;
    }

    getPotenciaAtual(): number {
        return this.potenciaAtual;
    }

    getLimiteAtual(): number {
        return this.limiteAtual;
    }

    getPressaoBase(): number {
        return this.pressaoBase;
    }

    getPecas(): Map<TipoPeca, Peca> {
        return this.pecas;
    }
    //fim Getters

    adicionarPotencia(valor: number): void{
        this.potenciaAtual += valor;
    }

    adicionarLimite(valor: number): void{
        this.limiteAtual += valor;
    }

    recalcular(): void {
        this.potenciaAtual = this.potenciaBase;
        this.limiteAtual = this.limiteBase;

        for (const peca of this.pecas.values()) {
            peca.aplicarEfeito(this);
        }
    }

    instalarPeca(tipoPeca: TipoPeca, peca: Peca): void {
        this.pecas.set(tipoPeca, peca);
        this.recalcular();
    }
}
