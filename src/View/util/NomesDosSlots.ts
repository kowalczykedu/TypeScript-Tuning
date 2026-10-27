import { TipoPeca } from "../../model/TipoPeca";

export const nomesDosSlots: Record<TipoPeca, string> = {
        [TipoPeca.Pistao]: "Pistão",
        [TipoPeca.Biela]: "Biela",
        [TipoPeca.Comando]: "Comando",
        [TipoPeca.Cabecote]: "Cabeçote",
        [TipoPeca.Turbina]: "Turbina",
        [TipoPeca.Alimentacao]: "Alimentação",
        [TipoPeca.ColetorADM]: "Coletor de Admissão",
        [TipoPeca.ColetorESC]: "Coletor de Escape",
        [TipoPeca.Intake]: "Intake",
        [TipoPeca.Intercooler]: "Intercooler",
        [TipoPeca.Radiador]: "Radiador",
        [TipoPeca.RadiadorOleo]: "Radiador de Óleo"
};