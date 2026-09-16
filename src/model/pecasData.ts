import type { Peca } from "./Peca";
import { TipoPeca } from "./TipoPeca";
import { PecaPotencia } from "./PecaPotencia";
import { PecaLimite } from "./PecaLimite";
import { PecaMista } from "./PecaMista";

const catalogo = new Map<TipoPeca, Peca[]>();

//Inicio Peças de Potência
catalogo.set(TipoPeca.Turbina, [
    new PecaPotencia("Turbina Stage 1", "Master Power R4449", 10),
    new PecaPotencia("Turbina Stage 2", "Garrett GT2860RS", 28),
    new PecaPotencia("Turbina Stage 3", "HX35", 48),
    new PecaPotencia("Turbina Stage 4", "Holset HX55", 62)
]);

catalogo.set(TipoPeca.Intake, [
    new PecaPotencia("", "", 0),
]);

catalogo.set(TipoPeca.Comando, [
    new PecaPotencia("", "", 0),
]);

catalogo.set(TipoPeca.ColetorADM, [
    new PecaPotencia("", "", 0),
]);

catalogo.set(TipoPeca.ColetorESC, [
    new PecaPotencia("", "", 0),
]);

//Inicio Peças de Limite
catalogo.set(TipoPeca.Pistao, [
    new PecaLimite("", "", 0),
]);

catalogo.set(TipoPeca.Biela, [
    new PecaLimite("", "", 0),
]);

catalogo.set(TipoPeca.Radiador, [
    new PecaLimite("", "", 0),
]);

catalogo.set(TipoPeca.RadiadorOleo, [
    new PecaLimite("", "", 0),
]);


//Inicio Peças Mistas
catalogo.set(TipoPeca.Cabecote, [
    new PecaMista("", "", 0, 0),
]);

catalogo.set(TipoPeca.Intercooler, [
    new PecaMista("", "", 0, 0),
]);

catalogo.set(TipoPeca.FuelTech, [
    new PecaMista("", "", 0, 0),
]);