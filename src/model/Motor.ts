import { Identificavel } from "./Identificavel.ts";
import { TipoPeca } from "./TipoPeca";
import { Peca } from "./Peca.ts";
import { MotorQuebradoError } from "./exceptions/MotorQuebradoError.ts";

export default class Motor implements Identificavel {
    private nome: string;
    private cilindros: number;
    private potenciaBase: number;
    private limiteBase: number;
    private potenciaAtual: number;
    private limiteAtual: number;
    private pressaoBase?: number;
    private pecas: Map<TipoPeca, Peca>;

    constructor(nome: string, cilindros: number, potenciaBase: number, limiteBase: number, pecas: Map<TipoPeca, Peca>);
    constructor(nome: string, cilindros: number, potenciaBase: number, limiteBase: number, pressaoBase: number, pecas: Map<TipoPeca, Peca>);
    constructor(nome: string, cilindros: number, potenciaBase: number, limiteBase: number, quintoArgumento: number | Map<TipoPeca, Peca>, pecas?: Map<TipoPeca, Peca>) {
        if (typeof quintoArgumento === "number") {
            this.nome = nome;
            this.cilindros = cilindros;
            this.potenciaBase = potenciaBase;
            this.potenciaAtual = potenciaBase;
            this.limiteBase = limiteBase;
            this.limiteAtual = limiteBase;
            this.pressaoBase = quintoArgumento;
            this.pecas = pecas!;
            } else {
                this.nome = nome;
            this.cilindros = cilindros;
            this.potenciaBase = potenciaBase;
            this.potenciaAtual = potenciaBase;
            this.limiteBase = limiteBase;
            this.limiteAtual = limiteBase;
            this.pressaoBase = 0;
            this.pecas = quintoArgumento;
            }
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
        return this.pressaoBase!;
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

        const potenciaArredondada = Math.round(this.potenciaAtual);

        if (this.potenciaAtual > this.limiteAtual) {
            throw new MotorQuebradoError(
                `${this.nome} quebrou! Potência de ${potenciaArredondada}cv excede o limite de ${this.limiteAtual}cv`,
                this,
                potenciaArredondada
            )
        }
    }
}
