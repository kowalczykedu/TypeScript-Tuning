import { TipoPeca } from "./TipoPeca";
import { Peca } from "./Peca.ts";

export default class Motor {
    private nome: string;
    private cilindros: number;
    private potenciaBase: number;
    private limiteBase: number;
    private potenciaAtual: number;
    private limiteAtual: number;
    private pecas: Map<TipoPeca, Peca>;

    constructor(nome: string, cilindros: number, potenciaBase: number, limiteBase: number, pecas: Map<TipoPeca, Peca>) {
        this.nome = nome;
        this.cilindros = cilindros;
        this.potenciaBase = potenciaBase;
        this.potenciaAtual = potenciaBase;
        this.limiteBase = limiteBase;
        this.limiteAtual = limiteBase;
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
}
