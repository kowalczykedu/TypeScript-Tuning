import type Motor from "./Motor";
import { Peca } from "./Peca";

export class PecaTurbina extends Peca {
    private pressao: number;
    
        constructor(nome: string, modelo: string, descricao: string, pressao: number) {
            super(nome, modelo, descricao);
            this.pressao = pressao;
        }
    
        aplicarEfeito(motor: Motor): void {
            const pressaoEfetiva = this.pressao - motor.getPressaoBase();
            const ganho = motor.getPotenciaBase() * pressaoEfetiva;
            motor.adicionarPotencia(ganho);
        }
}