import type Motor from "./Motor";
import { Peca } from "./Peca";

export class PecaNaoInstalada extends Peca {
    constructor(nome: string) {
        super(nome, "Não Instalada", "");
    }

    aplicarEfeito(motor: Motor): void {}
}