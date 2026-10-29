import type Motor from "../model/Motor";
import type { TipoPeca } from "../model/TipoPeca";
import type { Peca } from "../model/Peca";
import type { Irepository } from "../repository/IRepository";

export class MotorService {
    private motoresPreDefinidos: Motor[];
    private catalogo: Map<TipoPeca, Peca[]>;
    private repositorio: Irepository<Motor>;

    constructor(motoresPreDefinidos: Motor[], catalogo: Map<TipoPeca, Peca[]>, repositorio: Irepository<Motor>) {
        this.motoresPreDefinidos = motoresPreDefinidos;
        this.catalogo = catalogo;
        this.repositorio = repositorio;
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
        this.repositorio.salvar(motor);
    }

    getMotoresCustomizados(): Motor[] {
        return this.repositorio.listar();
    }

    buscarMotorCustomizado(nome: string): Motor | undefined {
        return this.repositorio.buscarPorNome(nome);
    }
}