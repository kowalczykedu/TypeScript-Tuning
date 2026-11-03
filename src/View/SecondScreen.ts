import teclado from "readline-sync";
import { EscolhaInvalidaError } from "../model/exceptions/EscolhaInvalidaError";
import { MotorQuebradoError } from "../model/exceptions/MotorQuebradoError";
import type { OficinaController } from "../controller/OficinaController";
import cores, { Cores } from "./util/Cores";
import { nomesDosSlots } from "./util/NomesDosSlots";
import type { Peca } from "../model/Peca";
import type FormatadorMotor from "./util/FormatadorMotor";
import { NomeDuplicadoError } from "../model/exceptions/NomeDuplicadoErro";

export default class SecondScreen {
    private controller: OficinaController;
    private formatador: FormatadorMotor;

    constructor(controller: OficinaController, formatador: FormatadorMotor) {
        this.controller = controller;
        this.formatador = formatador;
    }

    openSecondScreen(): void {
        let finalizado = false;

        while(!finalizado) {
            try {
                const escolha = teclado.questionInt(
`
${cores.ROXO_INTENSO}╔ ${cores.BRANCO_BRILHANTE}${cores.NEGRITO}Motor Selecionado: ${cores.VERDE_MENTA}${this.controller.getMotorSelecionado().getNome()}${cores.RESET}
${cores.ROXO_INTENSO}╚═══════════════════${cores.RESET}
${cores.ROXO_INTENSO}╔ ${cores.BRANCO_BRILHANTE}${cores.NEGRITO}Escolha entre as seguintes opções e digite a sua escolha${cores.ROXO_INTENSO} ╗${cores.RESET}    
${cores.ROXO_INTENSO}║ ${cores.VERMELHO}0 ← Voltar ${cores.ROXO_INTENSO}══════════════════════════════════════════════╣${cores.RESET}
${cores.ROXO_INTENSO}║ ${cores.ROXO_SUAVE}1 → Mostrar o motor ${cores.ROXO_INTENSO}═════════════════════════════════════╣${cores.RESET}
${cores.ROXO_INTENSO}║ ${cores.ROXO_SUAVE}2 → Mostrar o menu com os tipos de peças ${cores.ROXO_INTENSO}════════════════╣${cores.RESET}
${cores.ROXO_INTENSO}║ ${cores.ROXO_SUAVE}3 → Finalizar e ver o resumo do tuning no motor${cores.ROXO_INTENSO}══════════╣${cores.RESET}
${cores.ROXO_INTENSO}╚══════════════════════════════════════════════════════════╝${cores.RESET}
${cores.ROXO_INTENSO}➜ ${cores.BRANCO_BRILHANTE} ${cores.VERDE_MENTA}`
);
console.log(cores.RESET);

                switch (escolha) {
                    case 0: 
                        finalizado = true;
                        break;

                    case 1:
                        this.estadoMotor();
                        break;

                    case 2: 
                        this.escolherPeca();
                        break;
                    
                    case 3:
                        console.log(`${cores.BRANCO_BRILHANTE}${cores.NEGRITO}${cores.ITALICO}Resumo do tuning: ${cores.RESET}`);
                        this.estadoMotor();
                        this.pedirNomeEFinalizar();
                        console.log(cores.RESET);
                        finalizado = true;
                        break;

                    default:
                        throw new EscolhaInvalidaError("Escolha inválida, tente novamente. Sua escolha:", escolha);
                }
            } catch(erro) {
                if(erro instanceof EscolhaInvalidaError) {
                    console.log(`\n${cores.etiqueta(`${cores.NEGRITO}${cores.ITALICO}${erro.message} ${erro.entradaRecebida}`, cores.VERMELHO_SANGUE, cores.BRANCO_BRILHANTE)}`)
                } else if (erro instanceof MotorQuebradoError) {
                    console.log(`\n${cores.etiqueta(`${cores.NEGRITO}${cores.ITALICO}${erro.message}`, cores.VERMELHO_SANGUE, cores.BRANCO_BRILHANTE)}`)
                    this.estadoMotor();
                } else {
                    throw erro;
                }
        }   }
    }

    private pedirNomeEFinalizar(): void {
        const nomePadrao = this.controller.getMotorSelecionado().getNome();
        let salvo = false;

        while (!salvo) {
            try {
                const nomeDigitado = teclado.question(
`
${cores.BRANCO_BRILHANTE}${cores.NEGRITO}${cores.ITALICO}Digite o nome que você deseja dar ao motor, ou apenas dê enter para usar o nome padrão. Nome padrão: ${cores.ROXO_SUAVE}[${nomePadrao}]${cores.RESET}
${cores.ROXO_INTENSO}➜ ${cores.BRANCO_BRILHANTE} ${cores.VERDE_MENTA}`);
                const motorSalvo = this.controller.finalizarTuning(nomeDigitado);
                console.log(`\n${cores.BRANCO_BRILHANTE}${cores.NEGRITO}${cores.ITALICO}Motor salvo com sucesso! Nome do motor: ${cores.VERDE_MENTA}${motorSalvo.getNome()}${cores.RESET}`);
                salvo = true;
            } catch (erro) {
                if (erro instanceof NomeDuplicadoError || erro instanceof EscolhaInvalidaError) {
                    console.log(`\n${cores.etiqueta(`${cores.NEGRITO}${cores.ITALICO}${erro.message}${erro.entradaRecebida}`, cores.VERMELHO_SANGUE, cores.BRANCO_BRILHANTE)}`)
                } else {
                    throw erro;
                }
            }
        }
    }

    private escolherPeca(): void {
        while (true) {
            console.log(this.formatarMenuSlots());
            const numeroSlot = this.receberEscolhaSlot();

            if (numeroSlot === 0) {
                return;
            }

            const pecas = this.controller.listarPecasDoSlot(numeroSlot);
            console.log(this.formatarMenuPecas(pecas));
            const numeroPeca = this.receberEscolhaPeca();

            if (numeroPeca === 0) {
                continue;
            }

            this.controller.instalarPecaNoMotor(numeroSlot, numeroPeca);
            return;
        }
    }

    estadoMotor(): void {
        const motor = this.controller.getMotorSelecionado();
        const slots = this.controller.listarSlots();
        console.log(this.formatador.formatarEstado(motor, slots, motor.getNome()));
    }

    formatarMenuSlots(): string {
        const slots = this.controller.listarSlots();

        let texto = "";

        texto += `${cores.VERMELHO_ESCURO}╔═══════════════════════╗${Cores.RESET}\n`;
        texto += `${Cores.VERMELHO}${cores.NEGRITO}${cores.ITALICO}0   ← Voltar ao Menu${Cores.RESET}\n`;
        texto += `${cores.VERMELHO_ESCURO}╚═══════════════════════╝${Cores.RESET}\n`;

        for (const [indice, slot] of slots.entries()) {
            const nome = nomesDosSlots[slot];
            const numero = String(indice + 1);
            
            texto += `${cores.ROXO_INTENSO}╔═══════════════════════╗${Cores.RESET}\n`;
            texto += `${Cores.BRANCO_BRILHANTE}${numero}  ${this.formatador.centralizar3(nome)}${Cores.RESET}\n`;
            texto += `${cores.ROXO_INTENSO}╚═══════════════════════╝${Cores.RESET}\n`;

        }
        return texto;
    }

    receberEscolhaSlot(): number {
        console.log(`${cores.BRANCO_BRILHANTE}${cores.NEGRITO}${cores.ITALICO}Qual é o tipo de peça que você deseja escolher? ${cores.RESET}`);
        return teclado.questionInt(`${cores.ROXO_INTENSO}➜ ${cores.BRANCO_BRILHANTE} ${cores.VERDE_MENTA}`);
    }

    formatarMenuPecas(pecas: Peca[]): string {
        let texto = "";

        texto += `\n`;
        texto += `${cores.VERMELHO_ESCURO}╔═══════════════════════════╗${Cores.RESET}\n`;
        texto += `${Cores.VERMELHO}${cores.NEGRITO}${cores.ITALICO}0 ← Voltar ao menu anterior${Cores.RESET}\n`;
        texto += `${cores.VERMELHO_ESCURO}╚═══════════════════════════╝${Cores.RESET}\n`;
        texto += `\n`;

        for (const [indice, peca] of pecas.entries()) {
            const numero = String(indice + 1);

            texto += `${Cores.SUBLINHADO}${cores.BRANCO_BRILHANTE}${cores.NEGRITO}${numero}${Cores.RESET} ${Cores.ROXO_INTENSO}→${Cores.RESET} ${cores.etiqueta(`${peca.getNome()}`, cores.ROXO_ESCURO)}${Cores.RESET}\n`;
            texto += `      ${Cores.ITALICO}${Cores.BORDO}${peca.getModelo()}${Cores.RESET}\n`;
            texto += `      ${Cores.PISCANTE}${Cores.CIANO_BRILHANTE}${peca.getDetalhesTecnicos()}${Cores.RESET}\n`;
            texto += `      ${Cores.BRANCO_BRILHANTE}${peca.getDescricao()}${Cores.RESET}\n\n`;
        }
        return texto;
    }

    receberEscolhaPeca(): number {
        console.log(`${cores.BRANCO_BRILHANTE}${cores.NEGRITO}${cores.ITALICO}Qual das peças acima você deseja instalar? ${cores.RESET}`);
        return teclado.questionInt(`${cores.ROXO_INTENSO}➜ ${cores.BRANCO_BRILHANTE} ${cores.VERDE_MENTA}`);
    }
}