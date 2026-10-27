import teclado from "readline-sync";
import { EscolhaInvalidaError } from "../model/exceptions/EscolhaInvalidaError";
import type { OficinaController } from "../controller/OficinaController";
import type Motor from "../model/Motor";
import cores from "./util/Cores";
import SecondScreen from "./SecondScreen";
import { nomesDosSlots } from "./util/NomesDosSlots";

export default class FirstScreen {
    private controller: OficinaController;
    private secondScreen: SecondScreen;
    private readonly largura = 60;
    private readonly borda = "═".repeat(this.largura);
    private readonly lateral = `${cores.ROXO_ESCURO}║${cores.RESET}`;

    constructor(controller: OficinaController, secondScreen: SecondScreen) {
        this.controller = controller;
        this.secondScreen = secondScreen;
    }

    openFirstScreen(): void {

        let escolhaValida = false;
        while(!escolhaValida) {
            try {
                const escolha = teclado.questionInt(
`Escolha entre as seguintes opcoes e digite o numero escolhido: 
1 para listar os motores
2 para listar os seus motores
0 para sair da tela 
`
                    );
                    console.log();

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

    private listarMotoresCustomizados(): void {
        const motores = this.controller.getMotoresCustomizados();

        if (motores.length === 0) {
            console.log(`Nenhum motor foi adicionado ainda.`);
            return;
        }

        for (const [index, motor] of motores.entries()) {
            console.log(this.formatarMotorCustomizado(motor, index));
        }
    }

    private formatarMotorCustomizado(motor: Motor, index: number): string {
        return this.formatarCabecalho(motor, index) + this.formatarSlots(motor);
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
        return teclado.questionInt(`${cores.VERDE}Qual e o motor que voce deseja escolher?${cores.RESET} `);
    }

        // coloca o texto no meio da caixa
    private centralizar(texto: string): string {
        const espacoLivre = this.largura - texto.length;
        const espacoEsquerda = Math.floor(espacoLivre / 2);
        const espacoDireita = espacoLivre - espacoEsquerda;
        return " ".repeat(espacoEsquerda) + texto + " ".repeat(espacoDireita);
    }
    
        // monta uma linha do cabeçalho: rótulo, valor colorido e a borda direita
    private linhaCabecalho(rotulo: string, valor: string, cor: string): string {
        const rotuloPreenchido = rotulo.padEnd(25);
        const valorPreenchido = valor.padEnd(this.largura - 30);
        return `${this.lateral}   ${rotuloPreenchido}: ${cor}${valorPreenchido}${cores.RESET}${this.lateral}\n`;
     }
    
     private formatarCabecalho(motor: Motor, index: number): string {
    
        let texto = "";
        texto += `\n${cores.ROXO_ESCURO}╔${this.borda}╗${cores.RESET}\n`;
        texto += `${this.lateral}${cores.FUNDO_AZUL}${this.centralizar(motor.getNome())}${cores.RESET}${this.lateral}\n`;
        texto += `${cores.ROXO_ESCURO}╠${this.borda}╣${cores.RESET}\n`;
        texto += this.linhaCabecalho("Potência base", `${Math.round(motor.getPotenciaBase())} cv`, cores.VERDE_ESMERALDA);
        texto += this.linhaCabecalho("Limite de potência base", `${Math.round(motor.getLimiteBase())} cv`, cores.VERMELHO_BRILHANTE);
        texto += this.linhaCabecalho("Pressão de turbina base", `${motor.getPressaoBase()} bar`, cores.CIANO);
        texto += `${cores.ROXO_ESCURO}╠${this.borda}╣${cores.RESET}\n`;
        texto += this.linhaCabecalho("Potência atual", `${Math.round(motor.getPotenciaAtual())} cv`, cores.VERDE_ESMERALDA);
        texto += this.linhaCabecalho("Limite de potência atual", `${Math.round(motor.getLimiteAtual())} cv`, cores.VERMELHO_BRILHANTE);
        texto += this.linhaCabecalho("Pressão de turbina atual", `${motor.getPressaoAtual()} bar`, cores.CIANO);
        return texto;
    }

    private formatarSlots(motor: Motor): string {
        const slots = this.controller.listarSlots();

        let texto = "";
        texto += `${cores.ROXO_ESCURO}╠${this.borda}╣${cores.RESET}\n`;
        texto += `${this.lateral}${cores.FUNDO_AZUL}${this.centralizar("SLOTS DO MOTOR")}${cores.RESET}${this.lateral}\n`;
        texto += `${cores.ROXO_ESCURO}╠${this.borda}╣${cores.RESET}\n`;

        for (const slot of slots) {
            const peca = motor.getPecas().get(slot);

            if (peca === undefined) {
                throw new Error(`Peça inexistente do tipo ${slot} no motor ${motor.getNome()}`);
            }

            const nome = nomesDosSlots[slot];
            const modelo = peca.getModelo();

            let modeloColorido: string;
            if (modelo === "Original") {
                modeloColorido = `${cores.DOURADO}${modelo}${cores.RESET}`;
            } else if (modelo === "Não Instalada") {
                modeloColorido = `${cores.VERMELHO_BRILHANTE}${modelo}${cores.RESET}`;
            } else {
                modeloColorido = `${cores.VERDE_ESMERALDA}${modelo}${cores.RESET}`;
            }

            // espaços que faltam para fechar a caixa (calculados sobre o texto sem cor)
            const textoPuro = `${nome}: ${modelo}`;
            const espacosFinais = " ".repeat(Math.max(0, this.largura - 2 - textoPuro.length));

            texto += `${this.lateral}  ${nome}: ${modeloColorido}${espacosFinais}${this.lateral}\n`;
        }

        texto += `${cores.ROXO_ESCURO}╚${this.borda}╝${cores.RESET}\n`;
        return texto;
    }
}