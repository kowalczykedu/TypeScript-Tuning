import type { Isearch } from "../model/ISearch";

export function buscarPorNomeExato<T extends Isearch>(lista: T[], nome: string): T | undefined {
    const nomeBuscado = nome.toLowerCase();

    for (const item of lista) {
        const nomeDoItem = item.getNome().toLowerCase();

        if (nomeDoItem === nomeBuscado) {
            return item;
        }
    }
    return undefined;
}