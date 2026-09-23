import { motoresPreDefinidos } from "./motoresData";
import { catalogo } from "./pecasData";
import { Identificavel } from "./Identificavel";
import { TipoPeca } from "./TipoPeca";

function exibirMenu(itens: Identificavel[]): void {
    itens.forEach((item, i) => {
        console.log(`${i + 1}. ${item.getNome()}`);
    });
}

exibirMenu(motoresPreDefinidos);
exibirMenu(catalogo.get(TipoPeca.Turbina)!); 