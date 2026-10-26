import type Motor from "../model/Motor";
import type { TipoPeca } from "../model/TipoPeca";
import type { Peca } from "../model/Peca";

export class MotorService {
    private motoresPreDefinidos: Motor[];
    private catalogo: Map<TipoPeca, Peca[]>;
    private motoresCustomizados: Motor[];

    constructor(motoresPreDefinidos: Motor[], catalogo: Map<TipoPeca, Peca[]>) {
        this.motoresPreDefinidos = motoresPreDefinidos;
        this.catalogo = catalogo;
        this.motoresCustomizados = [];
    }

    getMotores(): Motor[] {
        return this.motoresPreDefinidos;
    }

    getPecas(): Map<TipoPeca, Peca[]> {
        return this.catalogo;
    }

    listarPecasDoSlot(tipoPeca: TipoPeca): Peca[] {
        const pecas = this.catalogo.get(tipoPeca);
        if (!pecas) {
            throw new Error(`Nenhuma peça encontrada para o tipo ${tipoPeca}`);
        }
        return pecas;
    }

    instalarPecaNoMotor(motor: Motor, tipoPeca: TipoPeca, peca: Peca): void {
        motor.instalarPeca(tipoPeca, peca);
    }

    buscarMotor(indice: number): Motor | undefined {
        return this.motoresPreDefinidos[indice];
    }

    adicionarMotorCustomizado(motor: Motor): void {
        this.motoresCustomizados.push(motor);
    }

    getMotoresCustomizados(): Motor[] {
        return this.motoresCustomizados;
    }
}