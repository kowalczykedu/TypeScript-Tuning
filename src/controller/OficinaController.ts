import type Motor from "../model/Motor";
import type { Peca } from "../model/Peca";
import { TipoPeca } from "../model/TipoPeca";
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

    buscarMotorCustomizado(nome: string): Motor | undefined {
        return this.service.buscarMotorCustomizado(nome);
    }

    selecionarMotor(escolha: number): void {
        const motorOriginal = this.service.buscarMotor(escolha - 1);

        if (!motorOriginal) {
            throw new EscolhaInvalidaError("Motor não encontrado", escolha);
        }
        this.motorSelecionado = motorOriginal.clonar();
    }

    getMotorSelecionado(): Motor {
        if (!this.motorSelecionado) {
            throw new Error("Nenhum motor selecionado.");
        }
        return this.motorSelecionado;
    }

    listarSlots(): TipoPeca[] {
        return Object.values(TipoPeca);
    }

    private converterSlot(numeroSlot: number): TipoPeca {
        const slots = this.listarSlots();
        const slotSelecionado = slots[numeroSlot - 1];
        if (!slotSelecionado) {
            console.log();
            throw new EscolhaInvalidaError("O tipo de peça que você está tentando selecionar não existe, tente novamente. Sua escolha: ", numeroSlot);
        }
        return slotSelecionado;
    }

    listarPecasDoSlot(numeroSlot: number): Peca[] {
        const tipoPeca = this.converterSlot(numeroSlot);
        return this.service.listarPecasDoSlot(tipoPeca);
    }

    instalarPecaNoMotor(numeroSlot: number, numeroPeca: number): void {
        const tipoPeca = this.converterSlot(numeroSlot);
        const pecasDoSlot = this.listarPecasDoSlot(numeroSlot);
        const pecaSelecionada = pecasDoSlot[numeroPeca - 1];
        if (!pecaSelecionada) {
            console.log();
            throw new EscolhaInvalidaError("A peça selecionado não foi encontrada, tente novamente. Sua escolha: ", numeroPeca);
        }
        const motor = this.getMotorSelecionado();
        this.service.instalarPecaNoMotor(motor, tipoPeca, pecaSelecionada);
    }

    finalizarTuning(): void {
        const motor = this.getMotorSelecionado();
        this.service.adicionarMotorCustomizado(motor);
        this.motorSelecionado = undefined;
    }
}