import type { Isearch } from "../model/ISearch";

export interface Irepository<T extends Isearch> {
    salvar(item: T): void;
    listar(): T[];
    pesquisarPorNome(nome: string): T[];
}