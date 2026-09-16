import type Motor from "./Motor";

export abstract class Peca {
    protected readonly nome: string;
    protected readonly modelo: string;

    constructor(nome: string, modelo: string) {
        this.nome = nome;
        this.modelo = modelo;
    }
    
    getNome(): string {
        return this.nome;
    }

    getModelo(): string {
        return this.modelo;
    }

    abstract aplicarEfeito(motor: Motor): void;
}