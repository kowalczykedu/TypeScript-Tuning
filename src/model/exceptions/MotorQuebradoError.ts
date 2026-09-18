import type Motor from "../Motor";

export class MotorQuebradoError extends Error {
    public readonly motor: Motor;
    public readonly potenciaFinal: number;

    constructor(mensagem: string, motor: Motor, potenciaFinal: number) {
        super(mensagem);
        this.name = "MotorQuebradoError";
        this.motor = motor;
        this.potenciaFinal = potenciaFinal;
    }
}