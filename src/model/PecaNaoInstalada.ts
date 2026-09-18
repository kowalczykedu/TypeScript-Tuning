import type Motor from "./Motor.ts";
import { Peca } from "./Peca.ts";

export class PecaNaoInstalada extends Peca {
    constructor(nome: string) {
        super(nome, "Não Instalada", "");
    }

    aplicarEfeito(motor: Motor): void {}
}