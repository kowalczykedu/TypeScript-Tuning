import { Isearch } from "../model/ISearch";
import { Irepository } from "./IRepository";
import { filtrarPorNome } from "../util/filtrarPorNome";

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

    pesquisarPorNome(nome: string): T[] {
        return filtrarPorNome(this.listar(), nome);
    }
}