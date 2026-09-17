import type Motor from "./Motor.ts";
import { Peca } from "./Peca.ts";

export class PecaLimite extends Peca {
    private percentual: number;

    constructor(nome: string, modelo: string, descricao: string, percentual: number) {
        super(nome, modelo, descricao);
        this.percentual = percentual;
    }

    aplicarEfeito(motor: Motor): void {
        const ganho = motor.getLimiteBase() * (this.percentual / 100);
        motor.adicionarLimite(ganho);
    }
}