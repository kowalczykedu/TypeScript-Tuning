import type { Isearch } from "../model/ISearch";

export function filtrarPorNome<T extends Isearch>(lista: T[], texto: string): T[] {
    const textoBuscado = texto.toLowerCase();
    const resultado: T[] = [];

    for (const item of lista) {
        const nomeDoItem = item.getNome().toLowerCase();

        if (nomeDoItem.includes(textoBuscado)) {
            resultado.push(item);
        }
    }
    return resultado;
}