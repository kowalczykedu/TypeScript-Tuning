import type { Isearch } from "../model/ISearch";

export function buscarPorNome<T extends Isearch>(lista: T[], nome: string): T | undefined {
    for (const item of lista) {
        if (item.getNome() === nome) {
            return item;
        }
    }
    return undefined;
}