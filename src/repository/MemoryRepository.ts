import { Isearch } from "../model/ISearch";
import { Irepository } from "./IRepository";
import { buscarPorNome } from "../util/buscarPorNome";

export class MemoryRepository<T extends Isearch> implements Irepository<T> {
    private itens: T[];

    constructor() {
        this.itens = [];
    }

    salvar(item: T): void {
        this.itens.push(item);
    }

    listar(): T[] {
        return [...this.itens];
    }

    buscarPorNome(nome: string): T | undefined {
        return buscarPorNome(this.listar(), nome);
    }
}