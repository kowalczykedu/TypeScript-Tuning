function obterCodigoFundo(cor: string): string {
    // Paleta ANSI de 256 cores
    const cor256 = cor.match(/\x1b\[(?:\d+;)*38;5;(\d+)m/);

    if (cor256) {
        return `\x1b[48;5;${cor256[1]}m`;
    }

    // Cores ANSI padrão e brilhantes
    const corPadrao = cor.match(/\x1b\[(?:\d+;)*(3[0-7]|9[0-7])m/);

    if (corPadrao) {
        return `\x1b[${Number(corPadrao[1]) + 10}m`;
    }

    throw new Error("Utilize uma constante de cor de texto ANSI.");
}

export function etiqueta(
    texto: string,
    cor: string,
    corTexto: string = BRANCO,
    espacos: number = 1
): string {
    const fundo = obterCodigoFundo(cor);
    const padding = " ".repeat(Math.max(0, Math.floor(espacos)));

    return (
        `${cor}` +
        `${fundo}${corTexto}${padding}${texto}${padding}` +
        `\x1b[49m${cor}` +
        RESET
    );
}
/**
 * Códigos ANSI para cores e estilos no terminal.
 * Permite estilizar textos no console sem dependências externas.
 *
 * As cores ANSI de 256 posições utilizam a sequência:
 * Texto:  \x1b[38;5;{código}m
 * Fundo:  \x1b[48;5;{código}m
 */

// Funções auxiliares para a paleta de 256 cores
const cor256 = (codigo: number): string => `\x1b[38;5;${codigo}m`;
const fundo256 = (codigo: number): string => `\x1b[48;5;${codigo}m`;

// ======================================================
// RESET E ESTILOS DE TEXTO
// ======================================================

export const RESET = "\x1b[0m";
export const NEGRITO = "\x1b[1m";
export const DIM = "\x1b[2m";
export const ITALICO = "\x1b[3m";
export const SUBLINHADO = "\x1b[4m";
export const PISCANTE = "\x1b[5m";
export const INVERTIDO = "\x1b[7m";
export const OCULTO = "\x1b[8m";
export const RISCADO = "\x1b[9m";

// ======================================================
// CORES PADRÃO
// ======================================================

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

// ======================================================
// CORES BRILHANTES
// ======================================================

export const CINZA_CLARO = "\x1b[37m";
export const VERMELHO_BRILHANTE = "\x1b[91m";
export const VERDE_BRILHANTE = "\x1b[92m";
export const AMARELO_BRILHANTE = "\x1b[93m";
export const AZUL_BRILHANTE = "\x1b[94m";
export const MAGENTA_BRILHANTE = "\x1b[95m";
export const CIANO_BRILHANTE = "\x1b[96m";
export const BRANCO_BRILHANTE = "\x1b[97m";

// ======================================================
// ROXOS, VIOLETAS E LILASES
// ======================================================

export const ROXO_NOTURNO = cor256(53);
export const ROXO_PROFUNDO = cor256(54);
export const ROXO_ESCURO = cor256(55);
export const ROXO_INTENSO = cor256(56);
export const VIOLETA = cor256(57);
export const ROXO_AZULADO = cor256(93);
export const VIOLETA_INTENSO = cor256(129);
export const ROXO_NEON = cor256(165);
export const ROXO_CLARO = cor256(135);
export const ROXO_SUAVE = cor256(98);
export const LILAS_ESCURO = cor256(97);
export const LILAS = cor256(141);
export const LILAS_CLARO = cor256(183);
export const LAVANDA = cor256(189);
export const LAVANDA_CLARA = cor256(183);
export const AMETISTA = cor256(135);
export const AMETISTA_CLARA = cor256(177);
export const AMEIXA = cor256(96);
export const UVA = cor256(91);

// ======================================================
// ROSAS E MAGENTAS
// ======================================================

export const MAGENTA_ESCURO = cor256(90);
export const MAGENTA_VIVO = cor256(201);
export const FUCHSIA = cor256(198);
export const ROSA_ESCURO = cor256(162);
export const ROSA_INTENSO = cor256(205);
export const ROSA_NEON = cor256(206);
export const ROSA_CHICLETE = cor256(205);
export const ROSA = cor256(211);
export const ROSA_CLARO = cor256(218);
export const ROSA_PASTEL = cor256(217);

// ======================================================
// VERMELHOS
// ======================================================

export const VERMELHO_ESCURO = cor256(88);
export const VERMELHO_SANGUE = cor256(124);
export const VERMELHO_CARMIM = cor256(160);
export const VERMELHO_VIVO = cor256(196);
export const VERMELHO_NEON = cor256(196);
export const VINHO = cor256(88);
export const BORDO = cor256(125);
export const CEREJA = cor256(161);
export const RUBI = cor256(160);
export const CORAL = cor256(203);
export const SALMAO = cor256(203);
export const SALMAO_CLARO = cor256(210);
export const ROSA_AVERMELHADO = cor256(197);

// ======================================================
// LARANJAS, AMARELOS E DOURADOS
// ======================================================

export const LARANJA_ESCURO = cor256(166);
export const LARANJA = cor256(208);
export const LARANJA_NEGRITO = "\x1b[1;38;5;208m";
export const LARANJA_CLARO = cor256(214);
export const LARANJA_NEON = cor256(202);
export const ABÓBORA = cor256(202);
export const FERRUGEM = cor256(130);
export const COBRE = cor256(166);
export const BRONZE = cor256(136);
export const AMBAR = cor256(214);
export const DOURADO = cor256(220);
export const DOURADO_ESCURO = cor256(178);
export const MOSTARDA = cor256(178);
export const AMARELO_LIMAO = cor256(226);
export const AMARELO_SUAVE = cor256(228);
export const AMARELO_PASTEL = cor256(229);
export const CREME = cor256(230);
export const MARFIM = cor256(255);

// ======================================================
// VERDES
// ======================================================

export const VERDE_ESCURO = cor256(22);
export const VERDE_BOSQUE = cor256(22);
export const VERDE_PINHO = cor256(28);
export const VERDE_FLORESTA = cor256(34);
export const VERDE_FOLHA = cor256(40);
export const VERDE_ESMERALDA = cor256(48);
export const VERDE_INTENSO = cor256(34);
export const VERDE_NEON = cor256(46);
export const VERDE_LIMA = cor256(82);
export const VERDE_LIMA_CLARO = cor256(118);
export const VERDE_MUSGO = cor256(106);
export const VERDE_OLIVA = cor256(100);
export const VERDE_MILITAR = cor256(64);
export const VERDE_SÁLVIA = cor256(108);
export const VERDE_MENTA = cor256(121);
export const VERDE_MENTA_CLARO = cor256(157);
export const VERDE_PASTEL = cor256(157);
export const VERDE_CLARO = cor256(154);
export const VERDE_AGUA = cor256(43);
export const VERDE_TURQUESA = cor256(42);
export const VERDE_PRIMAVERA = cor256(48);
export const VERDE_MAR = cor256(36);
export const JADE = cor256(42);

// ======================================================
// AZUIS
// ======================================================

export const AZUL_MARINHO = cor256(17);
export const AZUL_NOTURNO = cor256(18);
export const AZUL_ESCURO = cor256(19);
export const AZUL_PROFUNDO = cor256(20);
export const AZUL_INTENSO = cor256(21);
export const AZUL_REAL = cor256(27);
export const AZUL_CEU = cor256(33);
export const AZUL_CELESTE = cor256(39);
export const AZUL_CLARO = cor256(75);
export const AZUL_BRILHANTE_256 = cor256(33);
export const AZUL_NEON = cor256(45);
export const AZUL_GELO = cor256(117);
export const AZUL_PASTEL = cor256(153);
export const AZUL_AÇO = cor256(67);
export const AZUL_ACINZENTADO = cor256(103);
export const AZUL_PETROLEO = cor256(24);
export const AZUL_COBALTO = cor256(26);
export const SAFIRA = cor256(27);
export const INDIGO = cor256(54);

// ======================================================
// CIANOS E TURQUESES
// ======================================================

export const CIANO_ESCURO = cor256(30);
export const CIANO_VIVO = cor256(45);
export const CIANO_NEON = cor256(51);
export const CIANO_CLARO = cor256(87);
export const CIANO_PASTEL = cor256(159);
export const TURQUESA = cor256(44);
export const TURQUESA_CLARO = cor256(87);
export const TURQUESA_ESCURO = cor256(30);
export const AZUL_TURQUESA = cor256(38);
export const AGUA_MARINHA = cor256(122);

// ======================================================
// MARRONS E TONS TERROSOS
// ======================================================

export const MARROM_ESCURO = cor256(94);
export const MARROM = cor256(130);
export const MARROM_CLARO = cor256(137);
export const MARROM_DOURADO = cor256(136);
export const CARAMELO = cor256(172);
export const CANELA = cor256(130);
export const CHOCOLATE = cor256(94);
export const CAFÉ = cor256(52);
export const AREIA = cor256(180);
export const BEGE = cor256(230);
export const CAQUI = cor256(143);

// ======================================================
// CINZAS E BRANCOS
// ======================================================

export const CINZA_CHUMBO = cor256(238);
export const CINZA_ESCURO_256 = cor256(240);
export const CINZA_GRAFITE = cor256(242);
export const CINZA_MEDIO_256 = cor256(244);
export const CINZA_AÇO = cor256(246);
export const CINZA_PRATA = cor256(250);
export const CINZA_CLARO_256 = cor256(252);
export const CINZA_NEVOA = cor256(254);
export const BRANCO_SUAVE = cor256(255);
export const BRANCO_GELO = cor256(255);

// ======================================================
// CORES DE FUNDO PADRÃO
// ======================================================

export const FUNDO_PRETO = "\x1b[40m";
export const FUNDO_VERMELHO = "\x1b[41m";
export const FUNDO_VERDE = "\x1b[42m";
export const FUNDO_AMARELO = "\x1b[43m";
export const FUNDO_AZUL = "\x1b[44m";
export const FUNDO_MAGENTA = "\x1b[45m";
export const FUNDO_CIANO = "\x1b[46m";
export const FUNDO_BRANCO = "\x1b[47m";

export const FUNDO_CINZA = "\x1b[100m";
export const FUNDO_VERMELHO_BRILHANTE = "\x1b[101m";
export const FUNDO_VERDE_BRILHANTE = "\x1b[102m";
export const FUNDO_AMARELO_BRILHANTE = "\x1b[103m";
export const FUNDO_AZUL_BRILHANTE = "\x1b[104m";
export const FUNDO_MAGENTA_BRILHANTE = "\x1b[105m";
export const FUNDO_CIANO_BRILHANTE = "\x1b[106m";
export const FUNDO_BRANCO_BRILHANTE = "\x1b[107m";

// ======================================================
// CORES DE FUNDO - PALETA DE 256 CORES
// ======================================================

export const FUNDO_ROXO_ESCURO = fundo256(55);
export const FUNDO_VIOLETA = fundo256(129);
export const FUNDO_LILAS = fundo256(141);
export const FUNDO_ROSA = fundo256(205);
export const FUNDO_VERMELHO_ESCURO = fundo256(88);
export const FUNDO_LARANJA = fundo256(208);
export const FUNDO_DOURADO = fundo256(220);
export const FUNDO_VERDE_ESCURO = fundo256(22);
export const FUNDO_VERDE_ESMERALDA = fundo256(48);
export const FUNDO_VERDE_NEON = fundo256(46);
export const FUNDO_VERDE_MENTA = fundo256(121);
export const FUNDO_AZUL_MARINHO = fundo256(17);
export const FUNDO_AZUL_CEU = fundo256(33);
export const FUNDO_AZUL_NEON = fundo256(45);
export const FUNDO_CIANO_ESCURO = fundo256(30);
export const FUNDO_TURQUESA = fundo256(44);
export const FUNDO_MARROM = fundo256(130);
export const FUNDO_CINZA_CHUMBO = fundo256(238);
export const FUNDO_CINZA_GRAFITE = fundo256(242);

// ======================================================
// OBJETO AGRUPADOR
// ======================================================

export const Cores = {
    RESET,
    NEGRITO,
    DIM,
    ITALICO,
    SUBLINHADO,
    PISCANTE,
    INVERTIDO,
    OCULTO,
    RISCADO,

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

    ROXO_NOTURNO,
    ROXO_PROFUNDO,
    ROXO_ESCURO,
    ROXO_INTENSO,
    VIOLETA,
    ROXO_AZULADO,
    VIOLETA_INTENSO,
    ROXO_NEON,
    ROXO_CLARO,
    ROXO_SUAVE,
    LILAS_ESCURO,
    LILAS,
    LILAS_CLARO,
    LAVANDA,
    LAVANDA_CLARA,
    AMETISTA,
    AMETISTA_CLARA,
    AMEIXA,
    UVA,

    MAGENTA_ESCURO,
    MAGENTA_VIVO,
    FUCHSIA,
    ROSA_ESCURO,
    ROSA_INTENSO,
    ROSA_NEON,
    ROSA_CHICLETE,
    ROSA,
    ROSA_CLARO,
    ROSA_PASTEL,

    VERMELHO_ESCURO,
    VERMELHO_SANGUE,
    VERMELHO_CARMIM,
    VERMELHO_VIVO,
    VERMELHO_NEON,
    VINHO,
    BORDO,
    CEREJA,
    RUBI,
    CORAL,
    SALMAO,
    SALMAO_CLARO,
    ROSA_AVERMELHADO,

    LARANJA_ESCURO,
    LARANJA,
    LARANJA_NEGRITO,
    LARANJA_CLARO,
    LARANJA_NEON,
    ABÓBORA,
    FERRUGEM,
    COBRE,
    BRONZE,
    AMBAR,
    DOURADO,
    DOURADO_ESCURO,
    MOSTARDA,
    AMARELO_LIMAO,
    AMARELO_SUAVE,
    AMARELO_PASTEL,
    CREME,
    MARFIM,

    VERDE_ESCURO,
    VERDE_BOSQUE,
    VERDE_PINHO,
    VERDE_FLORESTA,
    VERDE_FOLHA,
    VERDE_ESMERALDA,
    VERDE_INTENSO,
    VERDE_NEON,
    VERDE_LIMA,
    VERDE_LIMA_CLARO,
    VERDE_MUSGO,
    VERDE_OLIVA,
    VERDE_MILITAR,
    VERDE_SÁLVIA,
    VERDE_MENTA,
    VERDE_MENTA_CLARO,
    VERDE_PASTEL,
    VERDE_CLARO,
    VERDE_AGUA,
    VERDE_TURQUESA,
    VERDE_PRIMAVERA,
    VERDE_MAR,
    JADE,

    AZUL_MARINHO,
    AZUL_NOTURNO,
    AZUL_ESCURO,
    AZUL_PROFUNDO,
    AZUL_INTENSO,
    AZUL_REAL,
    AZUL_CEU,
    AZUL_CELESTE,
    AZUL_CLARO,
    AZUL_BRILHANTE_256,
    AZUL_NEON,
    AZUL_GELO,
    AZUL_PASTEL,
    AZUL_AÇO,
    AZUL_ACINZENTADO,
    AZUL_PETROLEO,
    AZUL_COBALTO,
    SAFIRA,
    INDIGO,

    CIANO_ESCURO,
    CIANO_VIVO,
    CIANO_NEON,
    CIANO_CLARO,
    CIANO_PASTEL,
    TURQUESA,
    TURQUESA_CLARO,
    TURQUESA_ESCURO,
    AZUL_TURQUESA,
    AGUA_MARINHA,

    MARROM_ESCURO,
    MARROM,
    MARROM_CLARO,
    MARROM_DOURADO,
    CARAMELO,
    CANELA,
    CHOCOLATE,
    CAFÉ,
    AREIA,
    BEGE,
    CAQUI,

    CINZA_CHUMBO,
    CINZA_ESCURO_256,
    CINZA_GRAFITE,
    CINZA_MEDIO_256,
    CINZA_AÇO,
    CINZA_PRATA,
    CINZA_CLARO_256,
    CINZA_NEVOA,
    BRANCO_SUAVE,
    BRANCO_GELO,

    FUNDO_PRETO,
    FUNDO_VERMELHO,
    FUNDO_VERDE,
    FUNDO_AMARELO,
    FUNDO_AZUL,
    FUNDO_MAGENTA,
    FUNDO_CIANO,
    FUNDO_BRANCO,

    FUNDO_CINZA,
    FUNDO_VERMELHO_BRILHANTE,
    FUNDO_VERDE_BRILHANTE,
    FUNDO_AMARELO_BRILHANTE,
    FUNDO_AZUL_BRILHANTE,
    FUNDO_MAGENTA_BRILHANTE,
    FUNDO_CIANO_BRILHANTE,
    FUNDO_BRANCO_BRILHANTE,

    FUNDO_ROXO_ESCURO,
    FUNDO_VIOLETA,
    FUNDO_LILAS,
    FUNDO_ROSA,
    FUNDO_VERMELHO_ESCURO,
    FUNDO_LARANJA,
    FUNDO_DOURADO,
    FUNDO_VERDE_ESCURO,
    FUNDO_VERDE_ESMERALDA,
    FUNDO_VERDE_NEON,
    FUNDO_VERDE_MENTA,
    FUNDO_AZUL_MARINHO,
    FUNDO_AZUL_CEU,
    FUNDO_AZUL_NEON,
    FUNDO_CIANO_ESCURO,
    FUNDO_TURQUESA,
    FUNDO_MARROM,
    FUNDO_CINZA_CHUMBO,
    FUNDO_CINZA_GRAFITE,
    etiqueta
} as const;

export default Cores;
