import type Motor from "./Motor.ts";
import { Peca } from "./Peca.ts";

export class PecaMista extends Peca {
    private percentualPotencia: number;
    private percentualLimite: number;
    

    constructor(nome: string, modelo: string, descricao: string, percentualPotencia: number, percentualLimite: number) {
        super(nome, modelo, descricao);
        this.percentualPotencia = percentualPotencia;
        this.percentualLimite = percentualLimite;
    }

    getDetalhesTecnicos(): string {
        return `+${this.percentualPotencia}% de potência / +${this.percentualLimite}% de limite`;
    }

    aplicarEfeito(motor: Motor): void {
        const ganhoPotencia = motor.getPotenciaBase() * (this.percentualPotencia / 100);
        motor.adicionarPotencia(ganhoPotencia);

        const ganhoLimite = motor.getLimiteBase() * (this.percentualLimite / 100);
        motor.adicionarLimite(ganhoLimite);
    }
}