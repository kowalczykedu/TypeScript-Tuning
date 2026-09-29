import type Motor from "../model/Motor";
import { motoresPreDefinidos } from "../data/motoresData";
import { catalogo } from "../data/pecasData";
import { Peca } from "../model/Peca";
import { TipoPeca } from "../model/TipoPeca";
import { EscolhaInvalidaError } from "../model/exceptions/EscolhaInvalidaError";

export class OficinaController {
    private motorSelecionado?: Motor;
    private motoresCustomizados: Motor[] = [];

    getMotores(): Motor[] {
        return motoresPreDefinidos;
    }

    getPecas(): Map<TipoPeca, Peca[]> {
        return catalogo;
    }

    selecionarMotor(escolha: number): void {
        const motor = motoresPreDefinidos[escolha - 1];

        if (!motor) {
            throw new EscolhaInvalidaError("Motor inválido", escolha);
        }
        this.motorSelecionado = motor;
    }

    getMotorSelecionado(): Motor {
        if (!this.motorSelecionado) {
            throw new Error("Nenhum motor selecionado.");
        }
        return this.motorSelecionado;
    }

    adicionarMotorCustomizado(motor: Motor): void {
        this.motoresCustomizados.push(motor);
    }

    getMotoresCustomizados(): Motor[] {
        return this.motoresCustomizados;
    }
};