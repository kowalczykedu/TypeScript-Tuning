import teclado from "readline-sync";
import { EscolhaInvalidaError } from "../model/exceptions/EscolhaInvalidaError";
import type { OficinaController } from "../controller/OficinaController";
import type Motor from "../model/Motor";
import cores, { Cores } from "./util/Cores";
import SecondScreen from "./SecondScreen";
import FormatadorMotor from "./util/FormatadorMotor";

export default class FirstScreen {
    private controller: OficinaController;
    private secondScreen: SecondScreen;
    private formatador: FormatadorMotor;

    constructor(controller: OficinaController, secondScreen: SecondScreen, formatador: FormatadorMotor) {
        this.controller = controller;
        this.secondScreen = secondScreen;
        this.formatador = formatador;
    }

    openFirstScreen(): void {

        let escolhaValida = false;
        while(!escolhaValida) {
            try {
                const escolha = teclado.questionInt(
`
${cores.ROXO_INTENSO}╔ ${cores.BRANCO_BRILHANTE}${cores.NEGRITO}Escolha entre as seguintes opções e digite a sua escolha${cores.ROXO_INTENSO} ╗${cores.RESET}    
${cores.ROXO_INTENSO}║ ${cores.VERMELHO}0 ← Sair da tela Inicial ${cores.ROXO_INTENSO}════════════════════════════════╣${cores.RESET}
${cores.ROXO_INTENSO}║ ${cores.ROXO_SUAVE}1 → Listar os motores disponíveis ${cores.ROXO_INTENSO}═══════════════════════╣${cores.RESET}
${cores.ROXO_INTENSO}║ ${cores.ROXO_SUAVE}2 → Listar os seus motores customizados ${cores.ROXO_INTENSO}═════════════════╣${cores.RESET}
${cores.ROXO_INTENSO}║ ${cores.ROXO_SUAVE}3 → Buscar um dos seus motores customizados ${cores.ROXO_INTENSO}═════════════╣${cores.RESET}
${cores.ROXO_INTENSO}╚══════════════════════════════════════════════════════════╝${cores.RESET}
${cores.ROXO_INTENSO}➜ ${cores.BRANCO_BRILHANTE} ${cores.VERDE_MENTA}`
);
console.log(cores.RESET);

                switch (escolha) {
                    case 0:   
                        escolhaValida = true;
                        break;

                    case 1:
                        this.listarMotores();
                        this.secondScreen.openSecondScreen();
                        break;

                    case 2:   
                        this.listarMotoresCustomizados();
                        break;

                    case 3:
                        this.buscarMotorCustomizado();
                        break;

                    default: 
                        throw new EscolhaInvalidaError("Escolha inválida, tente novamente. Sua escolha:", escolha);
                }
            } catch (erro) {
                if (erro instanceof EscolhaInvalidaError) {
                    console.log(`${cores.etiqueta(`${cores.NEGRITO}${cores.ITALICO}${erro.message} ${erro.entradaRecebida}`, cores.VERMELHO_SANGUE, cores.BRANCO_BRILHANTE)}`)
                } else {
                    throw erro;
                }
            }
        }
    }

    private buscarMotorCustomizado(): void {
        console.log(`${cores.BRANCO_BRILHANTE}${cores.NEGRITO}${cores.ITALICO}Digite o nome do motor${cores.RESET}`);
        const nome = teclado.question(`${cores.ROXO_INTENSO}➜ ${cores.BRANCO_BRILHANTE} ${cores.VERDE_MENTA}`).trim();

        const busca = this.controller.buscarMotorCustomizado(nome);
        if (busca === undefined) {
            console.log();
            console.log(`${cores.etiqueta(`${cores.NEGRITO}${cores.ITALICO}Não foi possível achar um motor com o nome "${nome}".`, cores.VERMELHO_SANGUE, cores.BRANCO_BRILHANTE)}`)
            return;
        }

        const slots = this.controller.listarSlots();
        console.log(this.formatador.formatarEstado(busca, slots, busca.getNome()));
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
                        console.log();
                        console.log(`${cores.etiqueta(`${cores.NEGRITO}${cores.ITALICO}${erro.message}, tente novamente. Sua escolha: ${erro.entradaRecebida}`, cores.VERMELHO_SANGUE, cores.BRANCO_BRILHANTE)}`);
                        console.log();
                } else {
                    throw erro;
                }
            }
        }
    }

    private listarMotoresCustomizados(): void {
        const motores = this.controller.getMotoresCustomizados();

        if (motores.length === 0) {
            console.log(`${cores.etiqueta(`${cores.NEGRITO}${cores.ITALICO}Nenhum motor customizado foi adicionado ainda...`, cores.VERMELHO_SANGUE, cores.BRANCO_BRILHANTE)}`);
            return;
        }

        for (const [index, motor] of motores.entries()) {
            console.log(this.formatarMotorCustomizado(motor, index));
        }
    }

    private formatarMotorCustomizado(motor: Motor, index: number): string {
        const slots = this.controller.listarSlots();
        return this.formatador.formatarEstado(motor, slots, `${index + 1} - ${motor.getNome()}`);
    }

    private formatarMotor(motor: Motor, index: number): string {       

    return `
${cores.ROXO_INTENSO}========================================${cores.RESET}
${cores.FUNDO_ROXO_ESCURO}${cores.NEGRITO}${this.formatador.centralizar2(index, motor.getNome())}${cores.RESET}
${cores.ROXO_INTENSO}========================================${cores.RESET}
${cores.BRANCO_BRILHANTE}${cores.ITALICO}Quantidade de Cilindros : ${cores.DOURADO}${motor.getCilindros()}${cores.RESET}
${cores.BRANCO_BRILHANTE}${cores.ITALICO}Potência Original       : ${cores.VERDE_MAR}${motor.getPotenciaBase()} cv${cores.RESET}
${cores.BRANCO_BRILHANTE}${cores.ITALICO}Limite de potência      : ${cores.VERMELHO_BRILHANTE}${motor.getLimiteBase()} cv${cores.RESET}
${cores.BRANCO_BRILHANTE}${cores.ITALICO}Pressão Base da Turbina : ${cores.AZUL_GELO}${motor.getPressaoBase()} bar${cores.RESET}
${cores.ROXO_INTENSO}========================================${cores.RESET}`;
}


    private receberEscolhaMotor(): number {
        console.log(`${cores.BRANCO_BRILHANTE}${cores.NEGRITO}${cores.ITALICO}Escolha um motor entre as opções acima${cores.RESET}`);
        return teclado.questionInt(`${cores.ROXO_INTENSO}➜ ${cores.BRANCO_BRILHANTE} ${cores.VERDE_MENTA}`);
    }
}