import type { OficinaController } from "../controller/oficinaController";
import teclado from "readline-sync";
import { EscolhaInvalidaError } from "../model/exceptions/EscolhaInvalidaError";
import type Motor from "../model/Motor";


export default class FirstScreen {
    private controller: OficinaController;

    constructor(controller: OficinaController) {
        this.controller = controller;
    }

    openFirstScreen(): void {
        const escolha = teclado.questionInt(
`Escolha entre as seguintes opcoes e digite o numero escolhido: 
1 para listar os motores
2 para sair da tela 
`
);
        console.log();

        switch (escolha) {
            case 1:
                this.listarMotores();
                break;

            case 2:   
                break;

            default: 
                throw new EscolhaInvalidaError("Entrada Inválida", escolha);
        }
    }

    private listarMotores(): void {
        const motores = this.controller.getMotores();

        for (const [index, motor] of motores.entries()) {
            console.log(this.formatarMotor(motor, index));
        }
        console.log();
        const escolhaMotor = this.receberEscolhaMotor();
        this.controller.selecionarMotor(escolhaMotor);
    }

    private formatarMotor(motor: Motor, index: number): string {       
    const ROXO = "\x1b[34m";
    const VERDE = "\x1b[38;5;48m";
    const VERMELHO = "\x1b[31m";
    const AZUL = "\x1b[38;5;33m";
    const RESET = "\x1b[0m";

    return `
${ROXO}========================================${RESET}
${ROXO}${index + 1} - ${motor.getNome()}${RESET}
${ROXO}========================================${RESET}
Quantidade de Cilindros : ${AZUL}${motor.getCilindros()}${RESET}
Potência Original       : ${VERDE}${motor.getPotenciaBase()} cv${RESET}
Limite de potência      : ${VERMELHO}${motor.getLimiteBase()} cv${RESET}
Pressão Base da Turbina : ${AZUL}${motor.getPressaoBase()} kg${RESET}
${ROXO}========================================${RESET}`;
}

    private receberEscolhaMotor(): number {
        const VERDE = "\x1b[38;5;48m";
        const RESET = "\x1b[0m";

        const escolhaMotor = teclado.questionInt(`${VERDE}Qual é o motor que você deseja escolher?${RESET} `);
        return escolhaMotor;
    }
}