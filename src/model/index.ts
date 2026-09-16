import { TipoPeca } from "./TipoPeca";
import { PecaPotencia } from "./PecaPotencia";
import { PecaLimite } from "./PecaLimite";
import { PecaMista } from "./PecaMista";
import { motoresPreDefinidos } from "./motoresData";

const motor = motoresPreDefinidos[0];
console.log("Potencia Original: " + motor.getPotenciaAtual()); // valor de fábrica
motor.instalarPeca(TipoPeca.Turbina, new PecaPotencia("Turbo Stage 2", "Garrett GT2860", 100));
console.log("Potência com uma turbina trocada: " + motor.getPotenciaAtual()); // Aumenta 100% da potência

console.log("Limite máximo de potência original: " + motor.getLimiteAtual()); // valor de fábrica
motor.instalarPeca(TipoPeca.Pistao, new PecaLimite("Pistão forjado", "CP Pistons", 278));
console.log("Limite com Pistão forjado: " + motor.getLimiteAtual());  //sobre 100% de limite

console.log();
motor.instalarPeca(TipoPeca.Intercooler, new PecaMista("Intercooler Front-Mount", "Garrett", 10, 15));
console.log("Potencia com Intecooler: " + motor.getPotenciaAtual()); // deveria subir 10% da base
console.log("Limite com Intecooler: " + motor.getLimiteAtual());   // deveria subir 15% da base

for (const motor of motoresPreDefinidos) {
    console.log(`\x1b[34m${motor.getNome()}\x1b[0m Potência = \x1b[32m${motor.getPotenciaAtual()}cv\x1b[0m, Limite = \x1b[31m${motor.getLimiteAtual()}cv\x1b[0m`);

    for (const [slot, peca] of motor.getPecas()) {
        console.log(`\x1b[32m${slot}:\x1b[0m \x1b[33m${peca.getModelo()}\x1b[0m`);
    }
    console.log();
}
