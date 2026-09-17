import type Motor from "./Motor.ts";
import { Peca } from "./Peca.ts";

export class PecaPotencia extends Peca {
    private percentual: number;

    constructor(nome: string, modelo: string, descricao: string, percentual: number) {
        super(nome, modelo, descricao);
        this.percentual = percentual;
    }

    aplicarEfeito(motor: Motor): void {
        const ganho = motor.getPotenciaBase() * (this.percentual / 100);
        motor.adicionarPotencia(ganho);
    }
}