import Motor from "../model/Motor";
import { PecaTurbina } from "../model/PecaTurbina";
import { TipoPeca } from "../model/TipoPeca";
import { MotorQuebradoError } from "../model/exceptions/MotorQuebradoError";
import { PecaPotencia } from "../model/PecaPotencia";
import { expect, test, describe } from '@jest/globals';

describe("RN-06: Regra da turbina", () => {
    test("Turbina de 2kg em motor aspirado de 54cv resulta em 162cv", () => {
        const motor = new Motor("Fusca", 4, 54, 260, new Map());
        const turbina = new PecaTurbina("Turbina teste", "Modelo teste", "Descrição", 2);

        motor.instalarPeca(TipoPeca.Turbina, turbina);

        expect(motor.getPotenciaAtual()).toBe(162);
    });

    test("Turbina de 2kg em motor turbo de 105cv com pressão base de 0.8kg resulta em 231cv", () => {
        const motor = new Motor("Up TSI", 3, 105, 250, 0.8, new Map());
        const turbina = new PecaTurbina("Turbina teste", "Modelo teste", "Descrição", 2);

        motor.instalarPeca(TipoPeca.Turbina, turbina);

        expect(motor.getPotenciaAtual()).toBe(231);
    });

    test("Turbina de 1kg em motor turbo de 182cv com pressão base de 1.2kg resulta em 145.6cv", () => {
        const motor = new Motor("Marea", 5, 182, 350, 1.2, new Map());
        const turbina = new PecaTurbina("Turbina teste", "Modelo teste", "Descrição", 1);

        motor.instalarPeca(TipoPeca.Turbina, turbina);

        expect(motor.getPotenciaAtual()).toBeCloseTo(145.6);
    });
});

describe("RN-07: trocar peça não acumula o ganho", () => {
    const motor = new Motor("Motor teste", 4, 100, 1000, new Map());

    const turbinaMedia = new PecaTurbina("Turbina Media", "Modelo medio", "Descrição", 2);
    const turbinaGrande = new PecaTurbina("Turbina grande", "Modelo grande", "Descrição", 3);

    test("Adição da turbina media com 2kg resulta em 300cv", () => {
        motor.instalarPeca(TipoPeca.Turbina, turbinaMedia);

        expect(motor.getPotenciaAtual()).toBe(300);
    });

    test("Adição da turbina grande com 3kg resulta em 400cv", () => {
        motor.instalarPeca(TipoPeca.Turbina, turbinaGrande);

        expect(motor.getPotenciaAtual()).toBe(400);
    });
});


describe("RN-08: Quebra do motor", () => {
    test("Potência acima do limite, lança MotorQuebradoError", () => {
        const motor = new Motor("Motor teste", 4, 100, 120, new Map());
        const pecaForte = new PecaPotencia("Peça Forte", "Modelo forte", "Descrição", 50);

        expect(() => motor.instalarPeca(TipoPeca.Comando, pecaForte)).toThrow(MotorQuebradoError);
    });

    test("Potência abaixo do limite, não lança MotorQuebradoError", () => {
        const motor = new Motor("Motor teste", 4, 100, 120, new Map());
        const pecaFraca = new PecaPotencia("Peça Fraca", "Modelo fraco", "Descrição", 10);

        expect(() => motor.instalarPeca(TipoPeca.Intake, pecaFraca)).not.toThrow();
    });

    test("Potência igual ao limite, não lança MotorQuebradoError", () => {
        const motor = new Motor("Motor teste", 4, 100, 120, new Map());
        const pecaMedia = new PecaPotencia("Peça Media", "Modelo medio", "Descrição", 20);

        expect(() => motor.instalarPeca(TipoPeca.Intercooler, pecaMedia)).not.toThrow();
    });
});