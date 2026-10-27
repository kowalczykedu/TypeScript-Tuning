import teclado, { question } from "readline-sync";
import { EscolhaInvalidaError } from "../model/exceptions/EscolhaInvalidaError";
import { MotorQuebradoError } from "../model/exceptions/MotorQuebradoError";
import type { OficinaController } from "../controller/OficinaController";
import Cores from "./util/Cores";
import { nomesDosSlots } from "./util/NomesDosSlots";
import type { Peca } from "../model/Peca";

export default class SecondScreen {
    private controller: OficinaController;
    private readonly largura = 60;
    private readonly borda = "═".repeat(this.largura);
    private readonly lateral = `${Cores.ROXO_ESCURO}║${Cores.RESET}`;

    constructor(controller: OficinaController) {
        this.controller = controller;
    }

    openSecondScreen(): void {
        let finalizado = false;

        while(!finalizado) {
            try {
              const escolha = teclado.questionInt(
`Escolha entre as seguintes opcoes e digite o numero escolhido: 
1 para mostrar o motor
2 para mostrar o menu com os tipos de pecas
0 para sair da tela
`);
                switch (escolha) {
                    case 0: 
                        console.log(`Resumo do tuning: `);
                        this.estadoMotor();
                        this.controller.finalizarTuning()
                        finalizado = true;
                        break;

                    case 1:
                        this.estadoMotor();
                        break;

                    case 2: 
                        this.escolherPeca();
                        break;

                    default:
                        throw new EscolhaInvalidaError("Escolha Inválida", escolha);
                }
            } catch(erro) {
                if(erro instanceof EscolhaInvalidaError) {
                    console.log(`${Cores.VERMELHO_BRILHANTE}${erro.message}, sua escolha: ${erro.entradaRecebida}${Cores.RESET}`);
                    console.log();
                } else if (erro instanceof MotorQuebradoError) {
                    console.log(`${Cores.PISCANTE}${Cores.VERMELHO}Seu motor ${Cores.NEGRITO}QUEBROU!!!${Cores.RESET} ${Cores.AZUL_CEU}${erro.message}${Cores.RESET}`);
                    this.estadoMotor();
                } else {
                    throw erro;
                }
        }   }
    }

    private escolherPeca(): void {
        console.log(this.formatarMenuSlots());
        const numeroSlot = this.receberEscolhaSlot();

        if (numeroSlot === 0) {
            return;
        }

        const pecas = this.controller.listarPecasDoSlot(numeroSlot);
        console.log(this.formatarMenuPecas(pecas));
        const numeroPeca = this.receberEscolhaPeca();

        if (numeroPeca === 0) {
            return;
        }

        this.controller.instalarPecaNoMotor(numeroSlot, numeroPeca);
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
        return `${this.lateral}   ${rotuloPreenchido}: ${cor}${valorPreenchido}${Cores.RESET}${this.lateral}\n`;
    }

    private formatarCabecalho(): string {
        const motor = this.controller.getMotorSelecionado();

        let texto = "";
        texto += `\n${Cores.ROXO_ESCURO}╔${this.borda}╗${Cores.RESET}\n`;
        texto += `${this.lateral}${Cores.FUNDO_AZUL}${this.centralizar(motor.getNome())}${Cores.RESET}${this.lateral}\n`;
        texto += `${Cores.ROXO_ESCURO}╠${this.borda}╣${Cores.RESET}\n`;
        texto += this.linhaCabecalho("Potência base", `${Math.round(motor.getPotenciaBase())} cv`, Cores.VERDE_ESMERALDA);
        texto += this.linhaCabecalho("Limite de potência base", `${Math.round(motor.getLimiteBase())} cv`, Cores.VERMELHO_BRILHANTE);
        texto += this.linhaCabecalho("Pressão de turbina base", `${motor.getPressaoBase()} bar`, Cores.CIANO);
        texto += `${Cores.ROXO_ESCURO}╠${this.borda}╣${Cores.RESET}\n`;
        texto += this.linhaCabecalho("Potência atual", `${Math.round(motor.getPotenciaAtual())} cv`, Cores.VERDE_ESMERALDA);
        texto += this.linhaCabecalho("Limite de potência atual", `${Math.round(motor.getLimiteAtual())} cv`, Cores.VERMELHO_BRILHANTE);
        texto += this.linhaCabecalho("Pressão de turbina atual", `${motor.getPressaoAtual()} bar`, Cores.CIANO);
        return texto;
    }

    private formatarSlots(): string {
        const motor = this.controller.getMotorSelecionado();
        const slots = this.controller.listarSlots();

        let texto = "";
        texto += `${Cores.ROXO_ESCURO}╠${this.borda}╣${Cores.RESET}\n`;
        texto += `${this.lateral}${Cores.FUNDO_AZUL}${this.centralizar("SLOTS DO MOTOR")}${Cores.RESET}${this.lateral}\n`;
        texto += `${Cores.ROXO_ESCURO}╠${this.borda}╣${Cores.RESET}\n`;

        for (const slot of slots) {
            const peca = motor.getPecas().get(slot);

            if (peca === undefined) {
                throw new Error(`Peça inexistente do tipo ${slot} no motor ${motor.getNome()}`);
            }

            const nome = nomesDosSlots[slot];
            const modelo = peca.getModelo();

            let modeloColorido: string;
            if (modelo === "Original") {
                modeloColorido = `${Cores.DOURADO}${modelo}${Cores.RESET}`;
            } else if (modelo === "Não Instalada") {
                modeloColorido = `${Cores.VERMELHO_BRILHANTE}${modelo}${Cores.RESET}`;
            } else {
                modeloColorido = `${Cores.VERDE_ESMERALDA}${modelo}${Cores.RESET}`;
            }

            // espaços que faltam para fechar a caixa (calculados sobre o texto sem cor)
            const textoPuro = `${nome}: ${modelo}`;
            const espacosFinais = " ".repeat(Math.max(0, this.largura - 2 - textoPuro.length));

            texto += `${this.lateral}  ${nome}: ${modeloColorido}${espacosFinais}${this.lateral}\n`;
        }

        texto += `${Cores.ROXO_ESCURO}╚${this.borda}╝${Cores.RESET}\n`;
        return texto;
    }

    estadoMotor(): void {
        console.log(this.formatarCabecalho() + this.formatarSlots());
    }

    formatarMenuSlots(): string {
        const slots = this.controller.listarSlots();

        let texto = "";

        for (const [indice, slot] of slots.entries()) {
            const nome = nomesDosSlots[slot];

            const numero = String(indice + 1).padEnd(2);

            texto += `${Cores.SUBLINHADO}${numero}${Cores.RESET} ${Cores.ROXO_ESCURO}${nome}${Cores.RESET}\n`;
        }
        texto += `${Cores.SUBLINHADO}0${Cores.RESET} ${Cores.VERDE}para voltar${Cores.RESET}\n`;
        return texto;
    }

    receberEscolhaSlot(): number {
        return teclado.questionInt(`${Cores.VERDE}Qual e o tipo de peca que voce deseja escolher?${Cores.RESET} `);
    }

    formatarMenuPecas(pecas: Peca[]): string {
        let texto = "";

        for (const [indice, peca] of pecas.entries()) {
            const numero = String(indice + 1);

            texto += `${Cores.SUBLINHADO}${numero}${Cores.RESET} ${Cores.ROXO_ESCURO}→${Cores.RESET} ${Cores.FUNDO_AZUL}${peca.getNome()}${Cores.RESET}\n`;
            texto += `    ${Cores.ITALICO}${Cores.PRETO}${peca.getModelo()}${Cores.RESET}\n`;
            texto += `    ${Cores.PISCANTE}${Cores.CIANO_BRILHANTE}${peca.getDetalhesTecnicos()}${Cores.RESET}\n`;
            texto += `    ${Cores.BRANCO_BRILHANTE}${peca.getDescricao()}${Cores.RESET}\n\n`;
        }
        texto += `${Cores.SUBLINHADO}0${Cores.RESET} ${Cores.VERDE_BRILHANTE}para voltar${Cores.RESET}\n`;        
        return texto;
    }

    receberEscolhaPeca(): number {
        return teclado.questionInt(`${Cores.VERDE}Qual das seguintes pecas voce quer?${Cores.RESET} `);
    }
}