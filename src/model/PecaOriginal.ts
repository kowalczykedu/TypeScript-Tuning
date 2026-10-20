import type Motor from "./Motor";
import { Peca } from "./Peca";

export class PecaOriginal extends Peca {
    constructor(nome: string) {
        super(nome, "Original", "");
    }

    aplicarEfeito(motor: Motor): void {}
}