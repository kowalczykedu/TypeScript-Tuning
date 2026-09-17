import type Motor from "./Motor.ts";
import { Peca } from "./Peca.ts";

export class PecaOriginal extends Peca {
    constructor(nome: string) {
        super(nome, "Original", "");
    }

    aplicarEfeito(motor: Motor): void {
        //método feito apenas para o arquivo não reclamar, não faz nada.
        // Peça de fábrica não altera nada: o desempenho dela já está
        // contabilizado na potenciaBase e no limiteBase do motor.
    }
}