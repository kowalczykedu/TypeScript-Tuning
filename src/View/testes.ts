import { TipoPeca } from "../model/TipoPeca";
import { catalogo } from "../data/pecasData";
import { MotorQuebradoError } from "../model/exceptions/MotorQuebradoError";
import { motoresPreDefinidos } from "../data/motoresData";

const motor = motoresPreDefinidos[0];
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
const alimentacao = catalogo.get(TipoPeca.Alimentacao)!;

console.log(`\x1b[38;5;33mPotência base =\x1b[0m \x1b[32m${motor.getPotenciaBase()}cv\x1b[0m`); 
console.log(`\x1b[38;5;33mLimite base =\x1b[0m \x1b[31m${motor.getLimiteAtual()}cv\x1b[0m`); 

motor.instalarPeca(TipoPeca.Pistao, pistao[3]);
motor.instalarPeca(TipoPeca.ColetorESC, coletorEscape[1]);
motor.instalarPeca(TipoPeca.ColetorADM, coletorAdmissao[1]);
motor.instalarPeca(TipoPeca.Alimentacao, alimentacao[0]);

try {
    motor.instalarPeca(TipoPeca.Turbina, turbinas[0]);
    motor.instalarPeca(TipoPeca.Comando, comando[1]);

    console.log("Instalada sem problema.");
} catch (erro) {
    if (erro instanceof MotorQuebradoError) {
        console.log(`Quebrou: ${erro.message}`);
        console.log(`Motor: ${erro.motor.getNome()}, potência no momento da quebra: ${erro.potenciaFinal}cv`);
    } else {
        throw erro;
    }
}

console.log(`\x1b[34m${motor.getNome()}\x1b[0m Potência = \x1b[32m${Math.trunc(motor.getPotenciaAtual())}cv\x1b[0m, Limite = \x1b[31m${Math.trunc(motor.getLimiteAtual())}cv\x1b[0m`);
for (const [slot, peca] of motor.getPecas()) {
    if (peca.getModelo() === "Original") {
         console.log(`\x1b[32m${slot}:\x1b[0m \x1b[33m${peca.getModelo()}\x1b[0m`);
    } else if (peca.getModelo() === "Não Instalada") {
        console.log(`\x1b[32m${slot}:\x1b[0m \x1b[38;5;203m${peca.getModelo()}\x1b[0m`);
    } else {
        console.log(`\x1b[32m${slot}:\x1b[0m \x1b[1;38;5;208m${peca.getModelo()}\x1b[0m e ${peca.getDetalhesTecnicos()}`);
    }
}
console.log(motor.getPressaoBase());