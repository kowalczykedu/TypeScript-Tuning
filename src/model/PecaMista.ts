import type Motor from "./Motor.ts";
import { Peca } from "./Peca.ts";

export class PecaMista extends Peca {
    private percentualPotencia: number;
    private percentualLimite: number;
    

    constructor(nome: string, modelo: string, percentualPotencia: number, percentualLimite: number) {
        super(nome, modelo);
        this.percentualPotencia = percentualPotencia;
        this.percentualLimite = percentualLimite;

    }

    aplicarEfeito(motor: Motor): void {
        const ganhoPotencia = motor.getPotenciaBase() * (this.percentualPotencia / 100);
        motor.adicionarPotencia(ganhoPotencia);

        const ganhoLimite = motor.getLimiteBase() * (this.percentualLimite / 100);
        motor.adicionarLimite(ganhoLimite);
    }
}