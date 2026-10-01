import type Motor from "../model/Motor";
import type { Peca } from "../model/Peca";
import type { TipoPeca } from "../model/TipoPeca";
import { EscolhaInvalidaError } from "../model/exceptions/EscolhaInvalidaError";
import type { MotorService } from "../service/MotorService";

export class OficinaController {
    private motorSelecionado?: Motor;
    private service: MotorService;

    constructor(service: MotorService) {
        this.service = service;
    }

    getMotores(): Motor[] {
        return this.service.getMotores();
    }

    getPecas(): Map<TipoPeca, Peca[]> {
        return this.service.getPecas();
    }

    getMotoresCustomizados(): Motor[] {
        return this.service.getMotoresCustomizados();
    }

    selecionarMotor(escolha: number): void {
        const motorOriginal = this.service.buscarMotor(escolha - 1);

        if (!motorOriginal) {
            throw new EscolhaInvalidaError("Motor inválido", escolha);
        }
        this.motorSelecionado = motorOriginal.clonar();
    }

    getMotorSelecionado(): Motor {
        if (!this.motorSelecionado) {
            throw new Error("Nenhum motor selecionado.");
        }
        return this.motorSelecionado;
    }

    finalizarTuning(): void {
        const motor = this.getMotorSelecionado();
        this.service.adicionarMotorCustomizado(motor);
        this.motorSelecionado = undefined;
    }
}