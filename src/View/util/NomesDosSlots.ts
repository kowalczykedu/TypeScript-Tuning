import { TipoPeca } from "../../model/TipoPeca";

export const nomesDosSlots: Record<TipoPeca, string> = {
        [TipoPeca.Biela]: "Biela",        
        [TipoPeca.Pistao]: "Pistão",
        [TipoPeca.Intake]: "Intake",
        [TipoPeca.Comando]: "Comando",
        [TipoPeca.Turbina]: "Turbina",
        [TipoPeca.Cabecote]: "Cabeçote",
        [TipoPeca.Radiador]: "Radiador",
        [TipoPeca.Alimentacao]: "Alimentação",
        [TipoPeca.Intercooler]: "Intercooler",
        [TipoPeca.ColetorESC]: "Coletor de Escape",
        [TipoPeca.RadiadorOleo]: "Radiador de Óleo",
        [TipoPeca.ColetorADM]: "Coletor de Admissão"
};