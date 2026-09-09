import { Peca } from "./Peca.ts";

export class PecaOriginal extends Peca {
    constructor(nome: string) {
        super(nome, "Original");
    }
}