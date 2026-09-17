import type Motor from "./Motor";

export abstract class Peca {
    protected readonly nome: string;
    protected readonly modelo: string;
    protected readonly descricao: string;

    constructor(nome: string, modelo: string, descricao: string) {
        this.nome = nome;
        this.modelo = modelo;
        this.descricao = descricao;
    }
    
    getNome(): string {
        return this.nome;
    }

    getModelo(): string {
        return this.modelo;
    }

    getDescricao(): string {
        return this.descricao;
    }

    abstract aplicarEfeito(motor: Motor): void;
}