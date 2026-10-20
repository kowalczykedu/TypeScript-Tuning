import type Motor from "./Motor";
import { Peca } from "./Peca";

export class PecaPotencia extends Peca {
    private percentual: number;

    constructor(nome: string, modelo: string, descricao: string, percentual: number) {
        super(nome, modelo, descricao);
        this.percentual = percentual;
    }

    getDetalhesTecnicos(): string {
        return `+${this.percentual}% de potência`;
    }

    aplicarEfeito(motor: Motor): void {
        const ganho = motor.getPotenciaBase() * (this.percentual / 100);
        motor.adicionarPotencia(ganho);
    }
}