/**
 * Códigos ANSI para cores e estilos no terminal.
 * Permite estilizar textos no console sem dependências externas.
 */

// Reset e Estilos de Texto
export const RESET = "\x1b[0m";
export const NEGRITO = "\x1b[1m";
export const DIM = "\x1b[2m";
export const ITALICO = "\x1b[3m";
export const SUBLINHADO = "\x1b[4m";
export const PISCANTE = "\x1b[5m";
export const INVERTIDO = "\x1b[7m";

// Cores Padrão (Texto)
export const PRETO = "\x1b[30m";
export const VERMELHO = "\x1b[31m";
export const VERDE = "\x1b[32m";
export const AMARELO = "\x1b[33m";
export const AZUL = "\x1b[34m";
export const MAGENTA = "\x1b[35m";
export const ROXO = "\x1b[35m";
export const CIANO = "\x1b[36m";
export const BRANCO = "\x1b[37m";
export const CINZA = "\x1b[90m";

// Cores de Alta Intensidade / Brilhantes (Texto)
export const CINZA_CLARO = "\x1b[37m";
export const VERMELHO_BRILHANTE = "\x1b[91m";
export const VERDE_BRILHANTE = "\x1b[92m";
export const AMARELO_BRILHANTE = "\x1b[93m";
export const AZUL_BRILHANTE = "\x1b[94m";
export const MAGENTA_BRILHANTE = "\x1b[95m";
export const CIANO_BRILHANTE = "\x1b[96m";
export const BRANCO_BRILHANTE = "\x1b[97m";

// Cores Especiais da Paleta 256 Cores (Usadas no projeto)
export const VERDE_ESMERALDA = "\x1b[38;5;48m";
export const AZUL_CEU = "\x1b[38;5;33m";
export const LARANJA = "\x1b[38;5;208m";
export const LARANJA_NEGRITO = "\x1b[1;38;5;208m";
export const SALMAO = "\x1b[38;5;203m";
export const DOURADO = "\x1b[38;5;220m";
export const ROXO_ESCURO = "\x1b[38;5;55m";

// Cores de Fundo (Background)
export const FUNDO_PRETO = "\x1b[40m";
export const FUNDO_VERMELHO = "\x1b[41m";
export const FUNDO_VERDE = "\x1b[42m";
export const FUNDO_AMARELO = "\x1b[43m";
export const FUNDO_AZUL = "\x1b[44m";
export const FUNDO_MAGENTA = "\x1b[45m";
export const FUNDO_CIANO = "\x1b[46m";
export const FUNDO_BRANCO = "\x1b[47m";

// Objeto agrupador para permitir tanto import nomeado quanto import padrão
export const Cores = {
    RESET,
    NEGRITO,
    DIM,
    ITALICO,
    SUBLINHADO,
    PISCANTE,
    INVERTIDO,
    PRETO,
    VERMELHO,
    VERDE,
    AMARELO,
    AZUL,
    MAGENTA,
    ROXO,
    CIANO,
    BRANCO,
    CINZA,
    CINZA_CLARO,
    VERMELHO_BRILHANTE,
    VERDE_BRILHANTE,
    AMARELO_BRILHANTE,
    AZUL_BRILHANTE,
    MAGENTA_BRILHANTE,
    CIANO_BRILHANTE,
    BRANCO_BRILHANTE,
    VERDE_ESMERALDA,
    AZUL_CEU,
    LARANJA,
    LARANJA_NEGRITO,
    SALMAO,
    DOURADO,
    ROXO_ESCURO,
    FUNDO_PRETO,
    FUNDO_VERMELHO,
    FUNDO_VERDE,
    FUNDO_AMARELO,
    FUNDO_AZUL,
    FUNDO_MAGENTA,
    FUNDO_CIANO,
    FUNDO_BRANCO,
} as const;

export default Cores;

