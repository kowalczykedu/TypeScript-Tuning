import teclado from "readline-sync";
import { EscolhaInvalidaError } from "../model/exceptions/EscolhaInvalidaError";
import type { OficinaController } from "../controller/OficinaController";
import type Motor from "../model/Motor";
import cores from "./Cores";

export default class FirstScreen {
    private controller: OficinaController;

    constructor(controller: OficinaController) {
        this.controller = controller;
    }

    openFirstScreen(): void {

        let escolhaValida = false;
        while(!escolhaValida) {
            try {
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
                        escolhaValida = true;
                        break;

                    case 2:   
                        escolhaValida = true;
                        break;

                    default: 
                        throw new EscolhaInvalidaError("Escolha Inválida", escolha);
                }
            } catch (erro) {
                if (erro instanceof EscolhaInvalidaError) {
                    console.log(`${cores.VERMELHO_BRILHANTE}${erro.message}, sua escolha: ${erro.entradaRecebida}${cores.RESET}`);
                    console.log();
                } else {
                    throw erro;
                }
            }
        }
    }

    private listarMotores(): void {
        const motores = this.controller.getMotores();

        for (const [index, motor] of motores.entries()) {
            console.log(this.formatarMotor(motor, index));
        }
        console.log();

        let selecionado = false;
        while (!selecionado) {
            try {
                const escolhaMotor = this.receberEscolhaMotor();
                this.controller.selecionarMotor(escolhaMotor);
                selecionado = true;
                } catch (erro) {
                    if (erro instanceof EscolhaInvalidaError) {
                    console.log(`${cores.VERMELHO_BRILHANTE}${erro.message}, sua escolha: ${erro.entradaRecebida}${cores.RESET}`);
                } else {
                    throw erro;
                }
            }
        }
    }

    private formatarMotor(motor: Motor, index: number): string {       

    return `
${cores.ROXO_ESCURO}========================================${cores.RESET}
${cores.ROXO_ESCURO}${index + 1} - ${motor.getNome()}${cores.RESET}
${cores.ROXO_ESCURO}========================================${cores.RESET}
Quantidade de Cilindros : ${cores.AZUL_CEU}${motor.getCilindros()}${cores.RESET}
Potência Original       : ${cores.VERDE}${motor.getPotenciaBase()} cv${cores.RESET}
Limite de potência      : ${cores.VERMELHO_BRILHANTE}${motor.getLimiteBase()} cv${cores.RESET}
Pressão Base da Turbina : ${cores.AZUL_CEU}${motor.getPressaoBase()} kg${cores.RESET}
${cores.ROXO_ESCURO}========================================${cores.RESET}`;
}

    private receberEscolhaMotor(): number {
        const escolhaMotor = teclado.questionInt(`${cores.VERDE}Qual e o motor que voce deseja escolher?${cores.RESET} `);
        console.log(`O motor escolhido foi: ${cores.AZUL_CEU}${escolhaMotor}${cores.RESET}`);
        return escolhaMotor;
    }
}