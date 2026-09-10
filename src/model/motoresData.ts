import { Peca } from "./Peca";
import { TipoPeca } from "./TipoPeca";
import { PecaOriginal } from "./PecaOriginal";
import Motor from "./Motor";

function criarPecasOriginais(): Map<TipoPeca, Peca> {
    const pecasOriginais = new Map<TipoPeca, Peca>();

    for (const tipoPeca of Object.values(TipoPeca)) {
        pecasOriginais.set(tipoPeca, new PecaOriginal(`${tipoPeca}`))
    }
    return pecasOriginais;      
}

const motorUpTsi = new Motor("EA211 (Up Tsi)", 3, 105, 150, criarPecasOriginais());
const motorFusca = new Motor("Boxer 1600 (Fusca)", 4, 54, 110, criarPecasOriginais());
const motorCivicSi = new Motor("K20Z3 (Civic Si 2008)", 4, 192, 400, criarPecasOriginais());
const motorMarea = new Motor("Fivetech Turbo (Marea)", 5, 182, 350, criarPecasOriginais());
const motorOmega = new Motor("Powertech 4.1 (Omega)", 6, 168, 400, criarPecasOriginais());
const motorF250 = new Motor("MWM Sprint 6.07TCA (F-250)", 6, 180, 250, criarPecasOriginais());
const motorS10 = new Motor("MWM Sprint 4.07TCA (S-10)", 4, 132, 200, criarPecasOriginais());
const motorMaverick = new Motor("Ford 302 Windsor (Maverick)", 8, 135, 450, criarPecasOriginais());
const motorSupra = new Motor("2JZ-GTE (Supra MK4)", 6, 276, 450, criarPecasOriginais());
const motorR34 = new Motor("RB26DETT (Skyline R-34)", 6, 286, 430, criarPecasOriginais());


export const motoresPreDefinidos: Motor[] = [
    motorUpTsi,
    motorFusca,
    motorCivicSi,
    motorMarea,
    motorOmega,
    motorF250,
    motorS10,
    motorMaverick,
    motorSupra,
    motorR34
];

for (const motor of motoresPreDefinidos) {
    console.log(`\x1b[34m${motor.getNome()}\x1b[0m Potência = \x1b[32m${motor.getPotenciaAtual()}cv\x1b[0m, Limite = \x1b[31m${motor.getLimiteAtual()}cv\x1b[0m`);

    for (const [slot, peca] of motor.getPecas()) {
        console.log(`\x1b[32m${slot}:\x1b[0m \x1b[33m${peca.getModelo()}\x1b[0m`);
    }
    console.log();
}