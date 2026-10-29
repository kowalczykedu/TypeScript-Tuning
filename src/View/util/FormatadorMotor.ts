import type Motor from "../../model/Motor";
import type { TipoPeca } from "../../model/TipoPeca";
import Cores from "./Cores";
import { nomesDosSlots } from "./NomesDosSlots";

export default class FormatadorMotor {
    private readonly largura = 60;
    private readonly largura2 = 40;
    private readonly largura3 = 18;
    private readonly borda = "═".repeat(this.largura);
    private readonly lateral = `${Cores.ROXO_ESCURO}║${Cores.RESET}`;

    // coloca o texto no meio da caixa
    private centralizar(texto: string): string {
        const espacoLivre = this.largura - texto.length;
        const espacoEsquerda = Math.floor(espacoLivre / 2);
        const espacoDireita = espacoLivre - espacoEsquerda;
        return " ".repeat(espacoEsquerda) + texto + " ".repeat(espacoDireita);
    }

    // coloca o texto no meio da caixa
    centralizar2(index: number, texto: string): string {
        const conteudo = `${index + 1} - ${texto}`;

        const espacoLivre = Math.max(0, this.largura2 - conteudo.length);

        const espacoEsquerda = Math.floor(espacoLivre / 2);
        const espacoDireita = espacoLivre - espacoEsquerda;

        return (
            " ".repeat(espacoEsquerda) + conteudo + " ".repeat(espacoDireita)
        );
    }

    centralizar3(texto: string): string {
        const conteudo = `${texto}`;

        const espacoLivre = Math.max(0, this.largura3 - conteudo.length);

        const espacoEsquerda = Math.floor(espacoLivre / 2);
        const espacoDireita = espacoLivre - espacoEsquerda;

        return (
            " ".repeat(espacoEsquerda) + conteudo + " ".repeat(espacoDireita)
        );
    }


    // monta uma linha do cabeçalho: rótulo, valor colorido e a borda direita
    private linhaCabecalho(rotulo: string, valor: string, cor: string): string {
        const rotuloPreenchido = rotulo.padEnd(25);
        const valorPreenchido = valor.padEnd(this.largura - 30);
        return `${this.lateral}   ${rotuloPreenchido}: ${cor}${valorPreenchido}${Cores.RESET}${this.lateral}\n`;
    }

    private formatarCabecalho(motor: Motor, titulo: string): string {
        let texto = "";
        texto += `\n${Cores.ROXO_ESCURO}╔${this.borda}╗${Cores.RESET}\n`;
        texto += `${this.lateral}${Cores.FUNDO_AZUL}${this.centralizar(titulo)}${Cores.RESET}${this.lateral}\n`;
        texto += `${Cores.ROXO_ESCURO}╠${this.borda}╣${Cores.RESET}\n`;
        texto += this.linhaCabecalho("Potência base", `${Math.round(motor.getPotenciaBase())} cv`, Cores.VERDE_MAR);
        texto += this.linhaCabecalho("Limite de potência base", `${Math.round(motor.getLimiteBase())} cv`, Cores.VERMELHO_BRILHANTE);
        texto += this.linhaCabecalho("Pressão de turbina base", `${motor.getPressaoBase()} bar`, Cores.AZUL_GELO);
        texto += `${Cores.ROXO_ESCURO}╠${this.borda}╣${Cores.RESET}\n`;
        texto += this.linhaCabecalho("Potência atual", `${Math.round(motor.getPotenciaAtual())} cv`, Cores.VERDE_MAR);
        texto += this.linhaCabecalho("Limite de potência atual", `${Math.round(motor.getLimiteAtual())} cv`, Cores.VERMELHO_BRILHANTE);
        texto += this.linhaCabecalho("Pressão de turbina atual", `${motor.getPressaoAtual()} bar`, Cores.AZUL_GELO);
        return texto;
    }

    private formatarSlots(motor: Motor, slots: TipoPeca[]): string {
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

    // único método público: cabeçalho e slots juntos, com o título que a tela escolher
    formatarEstado(motor: Motor, slots: TipoPeca[], titulo: string): string {
        return this.formatarCabecalho(motor, titulo) + this.formatarSlots(motor, slots);
    }
}