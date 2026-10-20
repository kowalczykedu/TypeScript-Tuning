import Motor from "../model/Motor";
import { PecaTurbina } from "../model/PecaTurbina";
import { TipoPeca } from "../model/TipoPeca";
import { expect, test, describe } from '@jest/globals';

describe("Regras da turbina", () => {
    test("turbina de 2kg em motor aspirado de 54cv resulta em 162cv", () => {
        const pecasVazias = new Map();
        const motor = new Motor("Fusca teste", 4, 54, 260, pecasVazias);
        const turbina = new PecaTurbina("Turbina teste", "Modelo teste", "Descrição", 2);

        motor.instalarPeca(TipoPeca.Turbina, turbina);

        expect(motor.getPotenciaAtual()).toBe(162);
    });
});