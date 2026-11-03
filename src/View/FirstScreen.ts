import teclado from "readline-sync";
import { EscolhaInvalidaError } from "../model/exceptions/EscolhaInvalidaError";
import type { OficinaController } from "../controller/OficinaController";
import type Motor from "../model/Motor";
import cores from "./util/Cores";
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
                let motorSelecionado = `${cores.VERMELHO}${cores.RISCADO}Nenhum motor selecionado${cores.RESET}`;
                if (this.controller.temMotorSelecionado()) {
                    motorSelecionado = this.controller.getMotorSelecionado().getNome();
                }

                const escolha = teclado.questionInt(
`
${cores.ROXO_INTENSO}╔ ${cores.BRANCO_BRILHANTE}${cores.NEGRITO}Motor Selecionado: ${cores.VERDE_MENTA}${motorSelecionado} ${cores.RESET}
${cores.ROXO_INTENSO}╚═══════════════════${cores.RESET}
${cores.ROXO_INTENSO}╔ ${cores.BRANCO_BRILHANTE}${cores.NEGRITO}Escolha entre as seguintes opções e digite a sua escolha${cores.ROXO_INTENSO} ╗${cores.RESET}    
${cores.ROXO_INTENSO}║ ${cores.VERMELHO}0 ← Sair da tela Inicial ${cores.ROXO_INTENSO}════════════════════════════════╣${cores.RESET}
${cores.ROXO_INTENSO}║ ${cores.ROXO_SUAVE}1 → Listar os motores disponíveis ${cores.ROXO_INTENSO}═══════════════════════╣${cores.RESET}
${cores.ROXO_INTENSO}║ ${cores.ROXO_SUAVE}2 → Listar os seus motores customizados ${cores.ROXO_INTENSO}═════════════════╣${cores.RESET}
${cores.ROXO_INTENSO}║ ${cores.ROXO_SUAVE}3 → Buscar um dos seus motores customizados ${cores.ROXO_INTENSO}═════════════╣${cores.RESET}
${cores.ROXO_INTENSO}║ ${cores.ROXO_SUAVE}4 → Ir para a tela de tuning do motor selecionado ${cores.ROXO_INTENSO}═══════╣${cores.RESET}
${cores.ROXO_INTENSO}╚══════════════════════════════════════════════════════════╝${cores.RESET}
${cores.ROXO_INTENSO}➜ ${cores.BRANCO_BRILHANTE} ${cores.VERDE_MENTA}`
);
console.log(cores.RESET);

                switch (escolha) {
                    case 0:   
                        escolhaValida = true;
                        break;

                    case 1: {
                        if (this.controller.temMotorSelecionado()) {
                            const trocar = this.confirmarTroca();

                            if (trocar === false) {
                                break;
                            }
                        }

                        const escolheu = this.listarMotores();
                        if (escolheu) {
                            this.secondScreen.openSecondScreen();
                        }
                        break;
                    }

                    case 2:   
                        this.listarMotoresCustomizados();
                        break;

                    case 3:
                        this.buscarMotorCustomizado();
                        break;

                    case 4:
                        if (this.controller.temMotorSelecionado()) {
                            this.secondScreen.openSecondScreen();
                        } else {
                            console.log(`${cores.etiqueta(`${cores.NEGRITO}${cores.ITALICO}Selecione um motor antes de acessar a tela de tuning.`, cores.VERMELHO_SANGUE, cores.BRANCO_BRILHANTE)}`);
                        }
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

        if (nome === "") {
            console.log();
            console.log(`${cores.etiqueta(`${cores.NEGRITO}${cores.ITALICO}Digite alguma coisa para iniciar a busca.`, cores.VERMELHO_SANGUE, cores.BRANCO_BRILHANTE)}`)
            return;
        }

        const encontrados = this.controller.pesquisarMotoresCustomizados(nome);
        if (encontrados.length === 0) {
            console.log();
            console.log(`${cores.etiqueta(`${cores.NEGRITO}${cores.ITALICO}Não foi possível achar um motor com o nome "${nome}".`, cores.VERMELHO_SANGUE, cores.BRANCO_BRILHANTE)}`)
            return;
        }

        const slots = this.controller.listarSlots();
        if (encontrados.length === 1) {
            console.log(`\n${cores.BRANCO_BRILHANTE}${cores.NEGRITO}${cores.ITALICO}Foi encontrado ${cores.VERDE_MENTA}${encontrados.length}${cores.RESET}${cores.BRANCO_BRILHANTE}${cores.NEGRITO}${cores.ITALICO} motor com o nome ${cores.VERDE_MENTA}"${nome}"${cores.RESET}`);
        } else {
            console.log(`\n${cores.BRANCO_BRILHANTE}${cores.NEGRITO}${cores.ITALICO}Foram encontrados ${cores.VERDE_MENTA}${encontrados.length}${cores.RESET}${cores.BRANCO_BRILHANTE}${cores.NEGRITO}${cores.ITALICO} motores com o nome ${cores.VERDE_MENTA}"${nome}"${cores.RESET}`);
        }

        for (const motor of encontrados) {
            console.log(this.formatador.formatarEstado(motor, slots, motor.getNome()));
        }
    }

    private confirmarTroca(): boolean {
        let motorSelecionado = this.controller.getMotorSelecionado().getNome();
        const escolha = teclado.question(
`
${cores.ROXO_INTENSO}╔ ${cores.BRANCO_BRILHANTE}${cores.NEGRITO}Seu motor atual: ${cores.VERDE_MENTA}${motorSelecionado} ${cores.RESET}
${cores.ROXO_INTENSO}╚═════════════════${cores.RESET}
${cores.ROXO_INTENSO}╔ ${cores.BRANCO_BRILHANTE}${cores.NEGRITO}Você deseja trocar o motor atual por outro? ${cores.ROXO_INTENSO}╗${cores.RESET}    
${cores.ROXO_INTENSO}║ ${cores.ROXO_SUAVE}S → Sim ${cores.ROXO_INTENSO}════════════════════════════════════╣${cores.RESET}
${cores.ROXO_INTENSO}║ ${cores.ROXO_SUAVE}N → Não ${cores.ROXO_INTENSO}════════════════════════════════════╣${cores.RESET}
${cores.ROXO_INTENSO}╚═════════════════════════════════════════════╝${cores.RESET}
${cores.ROXO_INTENSO}➜ ${cores.BRANCO_BRILHANTE} ${cores.VERDE_MENTA}`
).trim();
console.log(cores.RESET);

        if (escolha.toUpperCase() === "S") {
            return true;
        } else if (escolha.toUpperCase() === "N") {
            return false;
        } else {
            console.log(`${cores.etiqueta(`${cores.NEGRITO}${cores.ITALICO}Escolha inválida. Por favor, digite "S" para Sim ou "N" para Não.`, cores.VERMELHO_SANGUE, cores.BRANCO_BRILHANTE)}`);
            return this.confirmarTroca();
        }
    }

    private listarMotores(): boolean {
        const motores = this.controller.getMotores();

        for (const [index, motor] of motores.entries()) {
            console.log(this.formatarMotor(motor, index));
        }
                console.log(`
${cores.VERMELHO_ESCURO}╔══════════════════════════════════════╗${cores.RESET}
${cores.VERMELHO}${cores.NEGRITO}${cores.ITALICO}           0 - Voltar ao Menu${cores.RESET}
${cores.VERMELHO_ESCURO}╚══════════════════════════════════════╝${cores.RESET}
`);

        while (true) {
            try {
                const escolhaMotor = this.receberEscolhaMotor();
                if (escolhaMotor === 0) {
                    return false;
                }

                this.controller.selecionarMotor(escolhaMotor);
                return true;
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