import { TipoPeca } from "../model/TipoPeca";
import { PecaPotencia } from "../model/PecaPotencia";
import { PecaLimite } from "../model/PecaLimite";
import { PecaMista } from "../model/PecaMista";
import { catalogo } from "../model/pecasData";
import { motoresPreDefinidos } from "../model/motoresData";

const motor = motoresPreDefinidos[1];
const turbinas = catalogo.get(TipoPeca.Turbina)!;
const intake = catalogo.get(TipoPeca.Intake)!;
const comando = catalogo.get(TipoPeca.Comando)!;
const pistao = catalogo.get(TipoPeca.Pistao)!;
const biela = catalogo.get(TipoPeca.Biela)!;
const cabecote = catalogo.get(TipoPeca.Cabecote)!;
const intercooler = catalogo.get(TipoPeca.Intercooler)!;
const coletorEscape = catalogo.get(TipoPeca.ColetorESC)!;
const coletorAdmissao = catalogo.get(TipoPeca.ColetorADM)!;
const radiadorOleo = catalogo.get(TipoPeca.RadiadorOleo)!;
const fuelTech = catalogo.get(TipoPeca.FuelTech)!;

console.log(`\x1b[38;5;33mPotência base =\x1b[0m \x1b[32m${motor.getPotenciaBase()}cv\x1b[0m`); 
console.log(`\x1b[38;5;33mLimite base =\x1b[0m \x1b[31m${motor.getLimiteAtual()}cv\x1b[0m`); 

motor.instalarPeca(TipoPeca.Turbina, turbinas[3]);
motor.instalarPeca(TipoPeca.Intake, intake[2]);
motor.instalarPeca(TipoPeca.Comando, comando[2]);
motor.instalarPeca(TipoPeca.Pistao, pistao[2]);
motor.instalarPeca(TipoPeca.Biela, biela[2]);
motor.instalarPeca(TipoPeca.Cabecote, cabecote[4]);
motor.instalarPeca(TipoPeca.Intercooler, intercooler[1]);
motor.instalarPeca(TipoPeca.ColetorESC, coletorEscape[3]);
motor.instalarPeca(TipoPeca.ColetorADM, coletorAdmissao[1]);
motor.instalarPeca(TipoPeca.RadiadorOleo, radiadorOleo[1]);
motor.instalarPeca(TipoPeca.FuelTech, fuelTech[1]); 

/* const motor = motoresPreDefinidos[2];
const turbinas = catalogo.get(TipoPeca.Turbina)!;
const intake = catalogo.get(TipoPeca.Intake)!;
const comando = catalogo.get(TipoPeca.Comando)!;
const pistao = catalogo.get(TipoPeca.Pistao)!;
const biela = catalogo.get(TipoPeca.Biela)!;
const cabecote = catalogo.get(TipoPeca.Cabecote)!;
const intercooler = catalogo.get(TipoPeca.Intercooler)!;
const coletorEscape = catalogo.get(TipoPeca.ColetorESC)!;
const coletorAdmissao = catalogo.get(TipoPeca.ColetorADM)!;
const radiadorOleo = catalogo.get(TipoPeca.RadiadorOleo)!;
const fuelTech = catalogo.get(TipoPeca.FuelTech)!;

console.log(`\x1b[38;5;33mPotência base =\x1b[0m \x1b[32m${motor.getPotenciaBase()}cv\x1b[0m`); 
console.log(`\x1b[38;5;33mLimite base =\x1b[0m \x1b[31m${motor.getLimiteAtual()}cv\x1b[0m`); 

motor.instalarPeca(TipoPeca.Turbina, turbinas[3]);
motor.instalarPeca(TipoPeca.Intake, intake[3]);
motor.instalarPeca(TipoPeca.Comando, comando[4]);
motor.instalarPeca(TipoPeca.Pistao, pistao[2]);
motor.instalarPeca(TipoPeca.Biela, biela[2]);
motor.instalarPeca(TipoPeca.Cabecote, cabecote[5]);
motor.instalarPeca(TipoPeca.Intercooler, intercooler[3]);
motor.instalarPeca(TipoPeca.ColetorESC, coletorEscape[5]);
motor.instalarPeca(TipoPeca.ColetorADM, coletorAdmissao[3]);
motor.instalarPeca(TipoPeca.RadiadorOleo, radiadorOleo[1]);
motor.instalarPeca(TipoPeca.FuelTech, fuelTech[3]); */


console.log(`\x1b[34m${motor.getNome()}\x1b[0m Potência = \x1b[32m${Math.trunc(motor.getPotenciaAtual())}cv\x1b[0m, Limite = \x1b[31m${Math.trunc(motor.getLimiteAtual())}cv\x1b[0m`);
for (const [slot, peca] of motor.getPecas()) {
    if (peca.getModelo() === "Original") {
         console.log(`\x1b[32m${slot}:\x1b[0m \x1b[33m${peca.getModelo()}\x1b[0m`);
    } else {
        console.log(`\x1b[32m${slot}:\x1b[0m \x1b[1;38;5;208m${peca.getModelo()}\x1b[0m`);
    }
}

/* for (const motor of motoresPreDefinidos) {
    console.log(`\x1b[34m${motor.getNome()}\x1b[0m Potência = \x1b[32m${motor.getPotenciaAtual()}cv\x1b[0m, Limite = \x1b[31m${motor.getLimiteAtual()}cv\x1b[0m`);

    for (const [slot, peca] of motor.getPecas()) {
        if (peca.getModelo() === "Original") {
            console.log(`\x1b[32m${slot}:\x1b[0m \x1b[33m${peca.getModelo()}\x1b[0m`);
        } else {
            console.log(`\x1b[32m${slot}:\x1b[0m \x1b[38;5;208m${peca.getModelo()}\x1b[0m`);
        }
    }
    console.log();
} */
