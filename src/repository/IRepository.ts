import type { Isearch } from "../model/ISearch";

export interface Irepository<T extends Isearch> {
    salvar(item: T): void;
    listar(): T[];
    buscarPorNome(nome: string): T | undefined;
}