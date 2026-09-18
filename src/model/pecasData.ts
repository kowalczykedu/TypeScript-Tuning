import type { Peca } from "./Peca";
import { TipoPeca } from "./TipoPeca";
import { PecaPotencia } from "./PecaPotencia";
import { PecaLimite } from "./PecaLimite";
import { PecaMista } from "./PecaMista";
import { PecaTurbina } from "./PecaTurbina";

const catalogo = new Map<TipoPeca, Peca[]>();
export { catalogo };

//Inicio Peças de Potência
catalogo.set(TipoPeca.Turbina, [
    new PecaTurbina(
        "Turbina Pequena",
        "Master Power R4449",
        "Turbina nacional de resposta rápida, ideal para projetos de rua com ganho de potência moderado.",
        1
    ),

    new PecaTurbina(
        "Turbina Média",
        "Garrett GT2860RS",
        "Modelo esportivo com ótimo equilíbrio entre desempenho e tempo de enchimento da turbina.",
        2
    ),

    new PecaTurbina(
        "Turbina Grande",
        "Holset HX35",
        "Turbina de alto fluxo muito utilizada em projetos turbo nacionais de média e alta potência.",
        3
    ),

    new PecaTurbina(
        "Turbina Gigante",
        "Holset HX55",
        "Turbina de competição para motores preparados, capaz de entregar potência extrema em altas rotações.",
        4
    )
]);

catalogo.set(TipoPeca.Intake, [
    new PecaPotencia(
        "Intake Básico",
        "K&N 57 Series",
        "Sistema de admissão esportiva que melhora o fluxo de ar e a resposta do acelerador.",
        3
    ),

    new PecaPotencia(
        "Intake Esportivo",
        "K&N 63 Series",
        "Admissão de alto fluxo indicada para motores preparados de uso diário.",
        5
    ),

    new PecaPotencia(
        "Intake Performance",
        "K&N 69 Series",
        "Filtro de alto desempenho com maior volume de ar para motores aspirados e turbo.",
        7
    ),

    new PecaPotencia(
        "Intake Competição",
        "K&N 77 Series",
        "Sistema de admissão premium voltado para máxima eficiência em projetos de alta potência.",
        9
    )
]);

catalogo.set(TipoPeca.Comando, [
    new PecaPotencia(
        "Comando Aspirado",
        "SamCams VW a Ar 284°",
        "Comando esportivo para motores boxer aspirados de rua.",
        12
    ),

    new PecaPotencia(
        "Comando Diesel",
        "SamCams Diesel",
        "Perfil de comando otimizado para motores diesel preparados e maior torque.",
        15
    ),

    new PecaPotencia(
        "Comando Turbo",
        "SamCams VW a Ar 308° Turbo",
        "Comando com perfil otimizado para motores boxer turbo.",
        20
    ),

    new PecaPotencia(
        "Comando Universal Sport",
        "SamCams Universal Stage 2",
        "Comando esportivo universal para projetos aspirados e turbo de médio desempenho.",
        22
    ),

    new PecaPotencia(
        "Comando Universal Race",
        "SamCams Universal Stage 3",
        "Comando de competição com maior levante e duração para máxima potência.",
        30
    )
]);

catalogo.set(TipoPeca.ColetorADM, [
    new PecaPotencia(
        "Coletor de Admissão Básico",
        "SPA Turbo Weber IDF",
        "Coletor de admissão esportivo com melhor distribuição de ar para motores preparados.",
        4
    ),

    new PecaPotencia(
        "Coletor de Admissão Duplo",
        "SPA Turbo Weber IDF Duplo",
        "Modelo com maior capacidade de fluxo para preparação intermediária.",
        7
    ),

    new PecaPotencia(
        "Coletor de Admissão Performance",
        "SPA Turbo Weber DCOE",
        "Coletor de alto fluxo para motores aspirados e turbo de alta performance.",
        9
    ),

    new PecaPotencia(
        "Coletor de Admissão Race",
        "SPA Turbo TIN2800",
        "Coletor de competição projetado para máxima alimentação de ar.",
        12
    )
]);

catalogo.set(TipoPeca.ColetorESC, [
    new PecaPotencia(
        "Coletor de Escape Básico",
        "Universal T3",
        "Coletor tubular universal que melhora a vazão dos gases de escape.",
        6
    ),

    new PecaPotencia(
        "Escape Aspirado",
        "Dimension 4x1 VW Boxer",
        "Coletor dimensionado que melhora o fluxo dos gases em motores aspirados.",
        7
    ),

    new PecaPotencia(
        "Coletor de Escape Sport",
        "Universal T4",
        "Modelo universal de maior fluxo para turbinas de médio porte.",
        10
    ),

    new PecaPotencia(
        "Escape Turbo",
        "SPA Turbo T3 VW Boxer",
        "Coletor tubular para instalação de turbina T3 em motores boxer.",
        12
    ),

    new PecaPotencia(
        "Coletor de Escape Performance",
        "Universal T3 High Flow",
        "Coletor de alto fluxo com melhor eficiência para projetos turbo.",
        15
    ),

    new PecaPotencia(
        "Coletor de Escape Race",
        "Universal T4 High Flow",
        "Coletor de competição para máxima vazão e desempenho em altas rotações.",
        22
    )
]);

//Inicio Peças de Limite
catalogo.set(TipoPeca.Pistao, [
    new PecaLimite(
        "Pistão Forjado Básico",
        "Mahle PowerPak",
        "Pistão forjado de entrada que aumenta a resistência do conjunto do motor.",
        15
    ),

    new PecaLimite(
        "Pistão Aspirado",
        "Mahle 85,5 mm Taxado",
        "Pistão de alta compressão para motores aspirados.",
        18
    ),

    new PecaLimite(
        "Pistão Forjado Sport",
        "Iapel Forged",
        "Pistão nacional forjado para suportar preparações intermediárias.",
        25
    ),

    new PecaLimite(
        "Pistão Forjado Performance",
        "Wiseco Forged",
        "Pistão de alta resistência indicado para motores turbo de alto desempenho.",
        35
    ),

    new PecaLimite(
        "Pistão Forjado Race",
        "JE Pistons Ultra Series",
        "Pistão de competição projetado para suportar níveis extremos de potência.",
        50
    )
]);

catalogo.set(TipoPeca.Biela, [
    new PecaLimite(
        "Biela Forjada Básica",
        "SamCams AP",
        "Biela forjada para preparações leves e maior confiabilidade do motor.",
        15
    ),

    new PecaLimite(
        "Biela Aspirada",
        "SamCams H-Beam VW Boxer",
        "Biela reforçada para motores aspirados preparados.",
        20
    ),

    new PecaLimite(
        "Biela Forjada Sport",
        "SamCams GM",
        "Biela reforçada indicada para motores de média potência.",
        23
    ),

    new PecaLimite(
        "Biela Forjada Performance",
        "SPA Turbo Super A-Beam",
        "Biela de alta resistência para motores turbo preparados.",
        35
    ),

    new PecaLimite(
        "Biela Forjada Race",
        "SPA Turbo Super A-Beam Competition",
        "Biela de competição para suportar grandes pressões e altas rotações.",
        48
    )
]);

catalogo.set(TipoPeca.Radiador, [
    new PecaLimite(
        "Radiador Básico",
        "Visconde Alumínio 1 Fileira",
        "Radiador esportivo com melhor capacidade de refrigeração que o original.",
        10
    ),

    new PecaLimite(
        "Radiador Sport",
        "Visconde Alumínio 2 Fileiras",
        "Sistema de refrigeração reforçado para motores preparados.",
        18
    ),

    new PecaLimite(
        "Radiador Performance",
        "Visconde 3 Fileiras",
        "Radiador de alto desempenho para uso intenso e motores turbo.",
        27
    ),

    new PecaLimite(
        "Radiador Race",
        "Visconde Racing 4 Fileiras",
        "Radiador de competição com máxima eficiência de resfriamento.",
        38
    )
]);

catalogo.set(TipoPeca.RadiadorOleo, [
    new PecaLimite(
        "Radiador de Óleo Básico",
        "SPA Turbo 10 Linhas",
        "Ajuda a manter a temperatura do óleo em preparações leves.",
        8
    ),

    new PecaLimite(
        "Radiador de Óleo Sport",
        "SPA Turbo 13 Linhas",
        "Maior capacidade de resfriamento para motores turbo de rua.",
        14
    ),

    new PecaLimite(
        "Radiador de Óleo Performance",
        "SPA Turbo 16 Linhas",
        "Controle eficiente da temperatura do óleo em uso esportivo.",
        21
    ),

    new PecaLimite(
        "Radiador de Óleo Race",
        "SPA Turbo 19 Linhas",
        "Sistema de refrigeração de óleo para projetos de alta potência.",
        30
    )
]);

//Inicio Peças Mistas
catalogo.set(TipoPeca.Cabecote, [
    new PecaMista(
        "Cabeçote Street",
        "Street Flow",
        "Cabeçote retrabalhado para melhorar fluxo de ar e resistência do motor.",
        5,
        8
    ),

    new PecaMista(
        "Cabeçote Sport",
        "Sport Flow",
        "Cabeçote preparado para projetos esportivos com maior eficiência volumétrica.",
        10,
        15
    ),

    new PecaMista(
        "Cabeçote Aspirado",
        "Street Flow 40x35,5",
        "Cabeçote retrabalhado para motores boxer aspirados.",
        12,
        18
    ),

    new PecaMista(
        "Cabeçote Race",
        "Race Flow",
        "Cabeçote usinado para alto desempenho em motores preparados.",
        17,
        25
    ),

    new PecaMista(
        "Cabeçote Turbo",
        "Competition CNC 42x37,5",
        "Cabeçote CNC preparado para motores boxer turbo.",
        20,
        30
    ),

    new PecaMista(
        "Cabeçote Competition",
        "Competition CNC",
        "Cabeçote CNC de competição com fluxo máximo e alta resistência.",
        25,
        40
    )
]);

catalogo.set(TipoPeca.Intercooler, [
    new PecaMista(
        "Intercooler Pequeno",
        "SPA Turbo 400x190x50",
        "Intercooler compacto que reduz a temperatura do ar admitido.",
        4,
        10
    ),

    new PecaMista(
        "Intercooler Médio",
        "SPA Turbo 543x234x44",
        "Modelo intermediário com maior capacidade de troca térmica.",
        7,
        16
    ),

    new PecaMista(
        "Intercooler Grande",
        "SPA Turbo 550x230x65",
        "Intercooler de alto fluxo indicado para motores turbo preparados.",
        10,
        23
    ),

    new PecaMista(
        "Intercooler Gigante",
        "SPA Turbo 600x300x76",
        "Intercooler de competição para máxima eficiência de resfriamento.",
        14,
        32
    )
]);

catalogo.set(TipoPeca.Alimentacao, [
    new PecaMista(
        "FT Extremamente Básica",
        "FuelTech FT300",
        "Central de injeção programável bastante utilizada em preparações aspiradas de Fusca, oferecendo controle de injeção e ignição para projetos de entrada.",
        5,
        10
    ),

    new PecaMista(
        "FT Básica",
        "FuelTech FT450",
        "Injeção programável de entrada para projetos aspirados e turbo leves.",
        7,
        12
    ),

    new PecaMista(
        "FT Sport",
        "FuelTech FT550",
        "Central de injeção com mais recursos para motores preparados.",
        9,
        18
    ),

    new PecaMista(
        "FT Performance",
        "FuelTech FT600",
        "Gerenciamento completo para projetos de alta performance.",
        14,
        28
    ),

    new PecaMista(
        "FT Competition",
        "FuelTech FT700",
        "Central de competição para motores extremamente preparados.",
        20,
        40
    )
]);