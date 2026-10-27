import { Identificavel } from "./Identificavel";
import { TipoPeca } from "./TipoPeca";
import { Peca } from "./Peca";
import { MotorQuebradoError } from "./exceptions/MotorQuebradoError";

export default class Motor implements Identificavel {
    private nome: string;
    private cilindros: number;
    private potenciaBase: number;
    private limiteBase: number;
    private potenciaAtual: number;
    private limiteAtual: number;
    private pressaoBase: number;
    private pressaoAtual: number;
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
            this.pressaoAtual = quintoArgumento;
            this.pecas = pecas!;
            } else {
            this.nome = nome;
            this.cilindros = cilindros;
            this.potenciaBase = potenciaBase;
            this.potenciaAtual = potenciaBase;
            this.limiteBase = limiteBase;
            this.limiteAtual = limiteBase;
            this.pressaoBase = 0;
            this.pressaoAtual = 0;
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
        return this.pressaoBase;
    }

    getPressaoAtual(): number {
        return this.pressaoAtual;
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

    definirPressaoAtual(valor: number): void{
        this.pressaoAtual = valor;
    }

    recalcular(): void {
        this.potenciaAtual = this.potenciaBase;
        this.limiteAtual = this.limiteBase;
        this.pressaoAtual = this.pressaoBase;

        for (const peca of this.pecas.values()) {
            peca.aplicarEfeito(this);
        }
    }

    instalarPeca(tipoPeca: TipoPeca, peca: Peca): void {
        const pecaAnterior = this.pecas.get(tipoPeca);

        if (pecaAnterior === undefined) {
            throw new Error(`Peça inexistente do tipo ${tipoPeca} no motor ${this.nome}`);
        }

        this.pecas.set(tipoPeca, peca);
        this.recalcular();

        const potenciaArredondada = Math.round(this.potenciaAtual);
        const limiteArredondado = Math.round(this.limiteAtual);

        if (this.potenciaAtual > this.limiteAtual) {
            this.pecas.set(tipoPeca, pecaAnterior);
            this.recalcular();
            
            throw new MotorQuebradoError(
                `${this.nome} quebrou! Potência de ${potenciaArredondada}cv excede o limite de ${limiteArredondado}cv`,
                this,
                potenciaArredondada
            )
        }
    }

    clonar(): Motor {
        const pecasCopiadas = new Map<TipoPeca, Peca>(this.pecas);
        return new Motor(this.nome, this.cilindros, this.potenciaBase, this.limiteBase, this.pressaoBase, pecasCopiadas);
    }
}
