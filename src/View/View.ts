import { Controller, EstadoMotor, InfoMotor, MotorSalvo } from "../controller/Controller.ts";
import { TipoPeca } from "../model/TipoPeca.ts";
import { Peca } from "../model/Peca.ts";

// Mapeamento visual para cada tipo de peça
const TIPO_PECA_METADATA: Record<TipoPeca, { numero: string; label: string; icone: string; descPadrao: string }> = {
  [TipoPeca.Turbina]: { numero: "01", label: "Turbina", icone: "mode_fan", descPadrao: "Módulo de sobrealimentação por gases de escape" },
  [TipoPeca.Intake]: { numero: "02", label: "Intake", icone: "air", descPadrao: "Admissão de alto fluxo e filtro de ar" },
  [TipoPeca.Intercooler]: { numero: "03", label: "Intercooler", icone: "ac_unit", descPadrao: "Resfriamento do ar comprimido de admissão" },
  [TipoPeca.Pistao]: { numero: "04", label: "Pistão", icone: "hardware", descPadrao: "Componente móvel de compressão e câmara de queima" },
  [TipoPeca.Biela]: { numero: "05", label: "Biela", icone: "build", descPadrao: "Elo estrutural entre pistão e virabrequim" },
  [TipoPeca.Cabecote]: { numero: "06", label: "Cabeçote", icone: "view_in_ar", descPadrao: "Fluxo de válvulas e dutos de admissão/escape" },
  [TipoPeca.Comando]: { numero: "07", label: "Comando de Válvulas", icone: "settings", descPadrao: "Duração, graduação e levante das válvulas" },
  [TipoPeca.Radiador]: { numero: "08", label: "Radiador", icone: "heat_pump", descPadrao: "Arrefecimento a líquido do bloco do motor" },
  [TipoPeca.RadiadorOleo]: { numero: "09", label: "Radiador de Óleo", icone: "oil_barrel", descPadrao: "Controle térmico da lubrificação sob alta carga" },
  [TipoPeca.ColetorESC]: { numero: "10", label: "Coletor de Escape", icone: "local_fire_department", descPadrao: "Evacuação dimensionada dos gases de combustão" },
  [TipoPeca.ColetorADM]: { numero: "11", label: "Coletor de Admissão", icone: "filter_drama", descPadrao: "Distribuição equitativa de ar nos cilindros" },
  [TipoPeca.Alimentacao]: { numero: "12", label: "Alimentação & Injeção", icone: "electric_bolt", descPadrao: "Bicos injetores e calibração de combustível" },
};

// Imagens para todos os 10 carros da bancada
const IMAGENS_MOTORES: Record<number, string> = {
  0: "/images/uptsi.jpg",
  1: "/images/fusca.jpg",
  2: "/images/civic.jpg",
  3: "/images/marea.jpg",
  4: "/images/omega.jpg",
  5: "/images/f250.jpg",
  6: "/images/s10.jpg",
  7: "/images/maverick.jpg",
  8: "/images/supra.png",
  9: "/images/skyline.png",
};

// Imagens técnicas ilustradas para todos os 12 tipos de peças
const IMAGENS_PECAS: Record<TipoPeca, string> = {
  [TipoPeca.Turbina]: "/images/pecas/turbina.svg",
  [TipoPeca.Intake]: "/images/pecas/intake.svg",
  [TipoPeca.Intercooler]: "/images/pecas/intercooler.svg",
  [TipoPeca.Pistao]: "/images/pecas/pistao.svg",
  [TipoPeca.Biela]: "/images/pecas/biela.svg",
  [TipoPeca.Cabecote]: "/images/pecas/cabecote.svg",
  [TipoPeca.Comando]: "/images/pecas/comando.svg",
  [TipoPeca.Radiador]: "/images/pecas/radiador.svg",
  [TipoPeca.RadiadorOleo]: "/images/pecas/radiador_oleo.svg",
  [TipoPeca.ColetorESC]: "/images/pecas/coletor_escape.svg",
  [TipoPeca.ColetorADM]: "/images/pecas/coletor_admissao.svg",
  [TipoPeca.Alimentacao]: "/images/pecas/alimentacao.svg",
};

export class View {
  private controller: Controller;
  private app: HTMLElement;
  private abaAtiva: "motores" | "meus-motores" = "motores";
  private slotAberto: TipoPeca | null = null;
  private modalSalvarAberto: boolean = false;
  private modalStatsAberto: boolean = false;

  constructor(controller: Controller, app: HTMLElement) {
    this.controller = controller;
    this.app = app;
  }

  // ─── Header Compartilhado ──────────────────────────────────────────────────

  private htmlHeader(): string {
    const isMotores = this.abaAtiva === "motores";
    const isMeusMotores = this.abaAtiva === "meus-motores";
    const totalSalvos = this.controller.getMotoresSalvos().length;

    return `
      <header class="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-surface-container-high/40 shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
        <div class="h-16 max-w-7xl mx-auto px-gutter flex items-center justify-between">
          <div class="flex items-center gap-space-md cursor-pointer" id="nav-logo">
            <svg class="h-8 w-auto" viewBox="0 0 280 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="10" width="40" height="40" rx="8" fill="#14121E" stroke="#9E00FF" stroke-width="1.5"/>
              <path d="M12 22H32M22 22V38" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M26 30L34 22L30 38" stroke="#9E00FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="52" y="32" fill="#FFFFFF" font-family="'Syne', sans-serif" font-weight="800" font-size="18" letter-spacing="1.5">TYPESCRIPT</text>
              <text x="52" y="45" fill="#9E00FF" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="11" letter-spacing="4">TUNING</text>
            </svg>
          </div>
          
          <nav class="flex items-center gap-space-sm">
            <button 
              id="tab-motores"
              class="px-space-md py-space-sm font-label-md text-label-md uppercase tracking-wider transition-all rounded ${
                isMotores ? "text-on-surface bg-surface-container-high font-semibold shadow-sm" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }"
            >
              Motores
            </button>
            <button 
              id="tab-meus-motores"
              class="px-space-md py-space-sm font-label-md text-label-md uppercase tracking-wider transition-all rounded flex items-center gap-1.5 ${
                isMeusMotores ? "text-on-surface bg-surface-container-high font-semibold shadow-sm" : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }"
            >
              <span>Meus Motores</span>
              ${totalSalvos > 0 ? `<span class="px-1.5 py-0.2 rounded-full bg-primary/20 text-primary text-[10px] font-mono">${totalSalvos}</span>` : ""}
            </button>
          </nav>

          <div class="flex items-center gap-space-md">
            <div class="w-8 h-8 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary shadow-sm" title="Piloto Conectado">
              <span class="material-symbols-outlined text-[18px]">sports_motorsports</span>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  // ─── Footer Compartilhado ──────────────────────────────────────────────────

  private htmlFooter(): string {
    return `
      <footer class="w-full bg-surface-container-lowest border-t border-surface-container-high/30 py-space-lg mt-space-xl">
        <div class="max-w-7xl mx-auto px-gutter flex flex-col md:flex-row items-center justify-between gap-space-sm text-center md:text-left">
          <span class="font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
            TypeScript Tuning — Preparação Automotiva & Bancada de Dinamômetro
          </span>
          <span class="font-label-sm text-label-sm text-outline">
            ECU Calibration · 10 Carros em Alta Resolução · 12 Módulos Ilustrados
          </span>
        </div>
      </footer>
    `;
  }

  // ─── Tela 1: Escolha seu Motor ─────────────────────────────────────────────

  renderizarSelecaoMotor(): void {
    this.abaAtiva = "motores";
    this.slotAberto = null;
    const motores = this.controller.getMotores();

    this.app.innerHTML = `
      ${this.htmlHeader()}
      <main class="w-full pt-16 bg-surface flex-1">
        <div class="max-w-7xl mx-auto px-gutter py-space-xl">
          <div class="flex flex-col w-full">
            
            <!-- Header Minimalista da Bancada -->
            <div class="relative w-full mb-space-xl flex flex-col md:flex-row md:items-end justify-between gap-space-md">
              <div class="space-y-space-xs">
                <div class="flex items-center gap-space-sm">
                  <span class="inline-block w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#9e00ff]"></span>
                  <span class="font-label-sm text-label-sm uppercase tracking-widest text-outline">Bancada de Calibração // Fase 01</span>
                </div>
                <h1 class="font-display-hero text-display-hero text-on-surface tracking-tight uppercase">
                  Escolha seu Motor
                </h1>
                <p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  Selecione uma plataforma mecânica para iniciar a preparação. Calibre turbinas, dutos, limites estruturais e explore a potência com precisão cirúrgica.
                </p>
              </div>

              <div class="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-xl border border-surface-container-high/40 shadow-sm">
                <span class="material-symbols-outlined text-primary text-[20px]">tune</span>
                <span class="font-label-md text-label-md text-on-surface-variant uppercase">${motores.length} Plataformas Disponíveis</span>
              </div>
            </div>

            <!-- Grid de Motores com Imagens em Todos os Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter items-stretch">
              ${motores.map((m) => this.htmlCardMotor(m)).join("")}
            </div>

            <!-- Strip de Telemetria Inferior -->
            <div class="mt-space-xl pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md bg-surface-container-lowest/60 px-space-lg py-space-md rounded-xl border border-surface-container-high/30">
              <div class="flex items-center gap-space-md">
                <div class="flex items-center gap-space-xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span class="font-label-sm text-label-sm uppercase text-on-surface">Modo Dinamômetro Pronto</span>
                </div>
                <span class="text-outline text-label-sm font-label-sm">•</span>
                <span class="font-label-sm text-label-sm text-on-surface-variant">Firmware ECU v4.12 Nightfall</span>
              </div>
              <div class="font-label-sm text-label-sm text-outline tracking-wider">
                CAN-BUS TELEMETRY: <span class="text-primary font-mono font-semibold">0.4ms SYNC</span>
              </div>
            </div>

          </div>
        </div>
      </main>
      ${this.htmlFooter()}
    `;

    this.vincularEventosNavegacao();

    // Eventos nos cards de motor
    this.app.querySelectorAll<HTMLElement>("[data-action='preparar-motor']").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const index = parseInt(btn.dataset.index ?? "0");
        this.controller.selecionarMotor(index);
        this.renderizarTuning();
      });
    });
  }

  private htmlCardMotor(m: InfoMotor): string {
    const isTurbo = m.pressaoBase > 0;
    const isFusca = m.nome.toLowerCase().includes("fusca");
    const imagem = IMAGENS_MOTORES[m.index];
    const margemCv = m.limiteBase - m.potenciaBase;

    return `
      <div class="flex flex-col justify-between bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl border border-surface-container-high/40 transition-all duration-300 hover:shadow-[0_8px_32px_-4px_rgba(158,0,255,0.22)] hover:border-primary/40 group">
        
        <!-- Imagem do Veículo -->
        <div class="relative w-full aspect-[16/10] overflow-hidden bg-surface-container-highest flex items-center justify-center">
          <img src="${imagem}" alt="${m.nome}" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          
          <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"></div>
          
          <!-- Badges superiores -->
          <div class="absolute top-space-sm left-space-md flex items-center gap-space-xs">
            <span class="px-space-sm py-0.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md font-label-sm text-label-sm uppercase tracking-wider ${
              isTurbo ? "text-primary" : "text-secondary"
            }">
              ${isTurbo ? "Turbo Sobrealimentado" : "Aspirado Natural"}
            </span>
            ${isFusca ? `<span class="px-space-xs py-0.5 rounded bg-surface-container/80 backdrop-blur-md font-label-sm text-label-sm text-on-surface-variant">Refrigeração a Ar</span>` : ""}
          </div>

          <!-- Nome e Potência sobrepostos -->
          <div class="absolute bottom-space-sm left-space-md right-space-md flex items-end justify-between">
            <div class="min-w-0 pr-2">
              <h2 class="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight truncate">${m.nome}</h2>
            </div>
            <div class="text-right shrink-0">
              <span class="font-headline-xl text-headline-xl text-primary font-bold">${m.potenciaBase}</span>
              <span class="font-label-md text-label-md uppercase text-on-surface-variant ml-0.5">cv</span>
            </div>
          </div>
        </div>

        <!-- Especificações e Botão de Ação -->
        <div class="p-space-md flex flex-col justify-between flex-1 gap-space-md bg-surface-container-lowest">
          <div class="grid grid-cols-2 gap-space-xs py-space-xs px-space-md bg-surface-container-low rounded-lg border border-surface-container-high/30">
            <div class="flex flex-col">
              <span class="font-label-sm text-label-sm uppercase text-outline">Arquitetura</span>
              <span class="font-body-sm text-body-sm text-on-surface">${m.cilindros} cil · Limite ${m.limiteBase} cv</span>
            </div>
            <div class="flex flex-col">
              <span class="font-label-sm text-label-sm uppercase text-outline">Indução Base</span>
              <span class="font-body-sm text-body-sm text-on-surface">${isTurbo ? `Turbo: ${m.pressaoBase} kg` : "Aspirado (0.0 kg)"}</span>
            </div>
          </div>

          <div class="flex items-center justify-between text-outline font-label-sm text-label-sm px-1">
            <span>Margem Segura:</span>
            <span class="text-primary font-mono font-semibold">+${margemCv} cv disponíveis</span>
          </div>

          <button 
            data-action="preparar-motor" 
            data-index="${m.index}"
            class="w-full py-space-sm px-space-md rounded-xl bg-surface-container-high hover:bg-primary-container text-on-surface hover:text-on-primary-container font-headline-sm text-headline-sm uppercase tracking-wider text-center flex items-center justify-center gap-space-xs transition-all duration-300 hover:shadow-[0_0_20px_rgba(158,0,255,0.45)] group/btn"
          >
            <span>Preparar Motor</span>
            <span class="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
    `;
  }

  // ─── Tela 2: Bancada de Tuning (Tuning do Motor) ────────────────────────────

  renderizarTuning(): void {
    this.abaAtiva = "motores";
    const estado = this.controller.getEstadoMotor();
    if (!estado) {
      this.renderizarSelecaoMotor();
      return;
    }

    const pctCarga = Math.min((estado.potenciaAtual / estado.limiteAtual) * 100, 100);
    const isFusca = estado.nome.toLowerCase().includes("fusca");
    const imagemCarro = IMAGENS_MOTORES[estado.index];
    const pressao = estado.pressaoTurbina;

    this.app.innerHTML = `
      ${this.htmlHeader()}
      <main class="w-full pt-16 bg-surface flex-1">
        <div class="max-w-7xl mx-auto px-gutter py-space-xl">
          <div class="flex flex-col w-full gap-space-xl">

            <!-- Barra Superior de Navegação & Ações Rápidas -->
            <section class="flex flex-col md:flex-row md:items-center justify-between gap-space-lg bg-surface-container-low px-space-lg py-space-md rounded-xl border border-surface-container-high/40 shadow-sm">
              <div class="flex items-center gap-space-md min-w-0">
                <button id="btn-voltar-selecao" class="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all">
                  <span class="material-symbols-outlined text-[16px]">arrow_back</span>
                  <span>Voltar</span>
                </button>
                <div class="h-6 w-px bg-outline-variant/30 hidden sm:block"></div>
                
                <div class="flex items-center gap-space-md min-w-0">
                  <div class="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container-highest shadow-sm border border-surface-container-high/40">
                    <img src="${imagemCarro}" alt="${estado.nome}" class="w-full h-full object-cover" />
                  </div>
                  <div class="min-w-0">
                    <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary block">Calibração Ativa // Bancada</span>
                    <h1 class="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate">${estado.nome}</h1>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-space-sm flex-wrap">
                <button id="btn-stats" class="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm">
                  <span class="material-symbols-outlined text-[18px] text-primary">analytics</span>
                  <span>Estatísticas</span>
                </button>
                
                <button id="btn-resetar-motor" class="flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm" title="Restaurar peças originais">
                  <span class="material-symbols-outlined text-[18px] text-outline">restart_alt</span>
                  <span>Resetar</span>
                </button>

                <button id="btn-abrir-salvar" class="flex items-center gap-space-xs px-space-lg py-space-sm bg-gradient-to-r from-tertiary-container via-primary-container to-primary hover:brightness-110 text-on-primary-container rounded font-headline-sm text-[13px] font-bold uppercase tracking-wider transition-all shadow-[0_0_24px_rgba(158,0,255,0.35)] hover:shadow-[0_0_32px_rgba(158,0,255,0.6)]">
                  <span class="material-symbols-outlined text-[18px]">verified</span>
                  <span>Salvar na Garagem</span>
                </button>
              </div>
            </section>

            <!-- 4 Big Clean Stat Cards -->
            <section class="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
              
              <!-- Card 1: Potência -->
              <div class="bg-surface-container-low p-space-lg rounded-xl relative overflow-hidden flex flex-col justify-between shadow-md border border-surface-container-high/30">
                <div class="flex items-center justify-between mb-space-sm">
                  <span class="font-label-sm text-label-sm uppercase tracking-widest text-outline">Potência Atual</span>
                  <span class="material-symbols-outlined text-primary text-[20px]">bolt</span>
                </div>
                <div>
                  <div class="font-display-hero text-[40px] leading-tight font-extrabold text-on-surface tracking-tight">
                    ${Math.round(estado.potenciaAtual)} <span class="font-label-md text-label-md text-primary font-normal">cv</span>
                  </div>
                  <span class="font-body-sm text-body-sm text-on-surface-variant block mt-space-xs">
                    Base: ${estado.potenciaBase} cv (${estado.potenciaAtual >= estado.potenciaBase ? "+" : ""}${Math.round(estado.potenciaAtual - estado.potenciaBase)} cv)
                  </span>
                </div>
                <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-container/10 rounded-full blur-xl pointer-events-none"></div>
              </div>

              <!-- Card 2: Limite Seguro -->
              <div class="bg-surface-container-low p-space-lg rounded-xl relative overflow-hidden flex flex-col justify-between shadow-md border border-surface-container-high/30">
                <div class="flex items-center justify-between mb-space-sm">
                  <span class="font-label-sm text-label-sm uppercase tracking-widest text-outline">Limite Seguro</span>
                  <span class="material-symbols-outlined text-secondary text-[20px]">speed</span>
                </div>
                <div>
                  <div class="font-display-hero text-[40px] leading-tight font-extrabold text-on-surface tracking-tight">
                    ${Math.round(estado.limiteAtual)} <span class="font-label-md text-label-md text-secondary font-normal">cv</span>
                  </div>
                  <span class="font-body-sm text-body-sm text-on-surface-variant block mt-space-xs">
                    Teto mecânico do bloco
                  </span>
                </div>
                <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-secondary-container/10 rounded-full blur-xl pointer-events-none"></div>
              </div>

              <!-- Card 3: Cilindros -->
              <div class="bg-surface-container-low p-space-lg rounded-xl relative overflow-hidden flex flex-col justify-between shadow-md border border-surface-container-high/30">
                <div class="flex items-center justify-between mb-space-sm">
                  <span class="font-label-sm text-label-sm uppercase tracking-widest text-outline">Cilindros</span>
                  <span class="material-symbols-outlined text-on-surface-variant text-[20px]">view_column</span>
                </div>
                <div>
                  <div class="font-display-hero text-[40px] leading-tight font-extrabold text-on-surface tracking-tight">
                    ${estado.cilindros} <span class="font-label-md text-label-md text-outline font-normal">cilindros</span>
                  </div>
                  <span class="font-body-sm text-body-sm text-on-surface-variant block mt-space-xs">
                    ${isFusca ? "Boxer 4 cilindros arrefecido a ar" : "Configuração em linha / bancada"}
                  </span>
                </div>
              </div>

              <!-- Card 4: Pressão da Turbina em Tempo Real -->
              <div class="bg-surface-container-low p-space-lg rounded-xl relative overflow-hidden flex flex-col justify-between shadow-md border ${
                pressao.pressaoDelta > 0 
                  ? "border-primary/50 shadow-[0_4px_24px_rgba(158,0,255,0.18)]" 
                  : "border-surface-container-high/30"
              }">
                <div class="flex items-center justify-between mb-space-sm">
                  <div class="flex items-center gap-1.5">
                    <span class="font-label-sm text-label-sm uppercase tracking-widest text-outline">Pressão do Turbo</span>
                    ${
                      pressao.pressaoDelta > 0
                        ? `<span class="px-1.5 py-0.2 rounded-full bg-primary/20 text-primary font-mono text-[10px] font-bold">+${pressao.pressaoDelta.toFixed(1)} kg</span>`
                        : pressao.temTurbina && pressao.pressaoDelta === 0
                        ? `<span class="px-1.5 py-0.2 rounded bg-surface-container text-outline font-mono text-[10px]">OEM</span>`
                        : ""
                    }
                  </div>
                  <span class="material-symbols-outlined text-primary text-[20px] ${pressao.pressaoDelta > 0 ? "animate-pulse" : ""}">compress</span>
                </div>
                <div>
                  <div class="font-display-hero text-[40px] leading-tight font-extrabold text-on-surface tracking-tight">
                    ${pressao.pressaoAtual.toFixed(1)} <span class="font-label-md text-label-md text-primary font-normal">kg/cm²</span>
                  </div>
                  <span class="font-body-sm text-body-sm ${pressao.pressaoDelta > 0 ? "text-primary font-medium" : "text-on-surface-variant"} block mt-space-xs">
                    ${pressao.descricao}
                  </span>
                </div>
                <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-container/10 rounded-full blur-xl pointer-events-none"></div>
              </div>

            </section>

            <!-- Barra de Capacidade do Bloco -->
            <section class="bg-surface-container-low px-space-lg py-space-md rounded-xl shadow-sm border border-surface-container-high/30">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-sm">
                <div class="flex items-center gap-space-sm">
                  <span class="w-2 h-2 rounded-full ${pctCarga >= 90 ? "bg-error animate-ping" : "bg-primary-container shadow-[0_0_8px_#9e00ff]"}"></span>
                  <span class="font-label-md text-label-md text-on-surface font-semibold tracking-wide">
                    Potência: ${Math.round(estado.potenciaAtual)} cv <span class="text-outline font-normal">/ Limite: ${Math.round(estado.limiteAtual)} cv</span>
                  </span>
                </div>
                <span class="font-label-sm text-label-sm ${pctCarga >= 90 ? "text-error" : "text-primary"} uppercase tracking-wider font-semibold">
                  ${pctCarga.toFixed(1)}% da Carga Máxima Suportada
                </span>
              </div>
              <div class="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden p-0.5">
                <div 
                  class="h-full rounded-full transition-all duration-500 ${
                    pctCarga >= 90 
                      ? "bg-gradient-to-r from-error to-error-container shadow-[0_0_16px_rgba(239,68,68,0.8)]" 
                      : "bg-gradient-to-r from-tertiary-container via-primary-container to-secondary shadow-[0_0_12px_rgba(158,0,255,0.7)]"
                  }" 
                  style="width: ${pctCarga}%;"
                ></div>
              </div>
            </section>

            <!-- Matriz de Hardware (12 Slots Ilustrados com Imagens) -->
            <section class="flex flex-col gap-space-md">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-space-sm">
                  <span class="font-label-sm text-label-sm uppercase tracking-widest text-outline">Matriz de Hardware</span>
                  <span class="font-label-sm text-label-sm px-space-sm py-0.5 rounded bg-surface-container text-on-surface-variant font-mono">12 Slots</span>
                </div>
                <span class="font-body-sm text-body-sm text-outline hidden sm:inline">Clique em qualquer slot disponível para abrir o catálogo e instalar upgrades</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-md">
                ${Object.values(TipoPeca).map((tipo) => this.htmlSlotHardware(tipo, estado)).join("")}
              </div>
            </section>

          </div>
        </div>
      </main>
      ${this.htmlFooter()}

      <!-- Modal de Catálogo de Peças (Lateral / Overlay) -->
      ${this.slotAberto ? this.htmlModalCatalogo(this.slotAberto, estado) : ""}

      <!-- Modal de Salvar na Garagem -->
      ${this.modalSalvarAberto ? this.htmlModalSalvar(estado) : ""}

      <!-- Modal de Estatísticas Gerais -->
      ${this.modalStatsAberto ? this.htmlModalStats(estado) : ""}

      <!-- Overlay de Motor Quebrado (caso tenha quebrado) -->
      ${estado.quebrado ? this.htmlOverlayQuebra(estado) : ""}
    `;

    this.vincularEventosNavegacao();
    this.vincularEventosTuning();
  }

  private htmlSlotHardware(tipo: TipoPeca, estado: EstadoMotor): string {
    const meta = TIPO_PECA_METADATA[tipo];
    const pecaInfo = estado.pecas.get(tipo);
    const disponivel = pecaInfo?.disponivel ?? true;
    const estadoPeca = pecaInfo?.estado ?? "original";
    const isCustom = estadoPeca === "modificada";
    const isNaoInstalada = estadoPeca === "nao-instalada";
    const imagemPeca = IMAGENS_PECAS[tipo];

    if (!disponivel) {
      // Slot verdadeiramente incompatível (ex: Radiador no Fusca)
      return `
        <div class="p-space-lg rounded-xl bg-surface-container-lowest/50 border border-outline-variant/20 flex flex-col justify-between gap-space-md opacity-40 cursor-not-allowed select-none">
          <div class="flex items-start justify-between gap-space-sm">
            <span class="font-label-sm text-label-sm text-outline-variant uppercase tracking-wider">${meta.numero}. ${meta.label}</span>
            <span class="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-outline-variant">
              Incompatível
            </span>
          </div>

          <!-- Imagem opaca -->
          <div class="relative w-full h-28 rounded-lg overflow-hidden bg-surface-container-lowest border border-outline-variant/20 flex items-center justify-center">
            <img src="${imagemPeca}" alt="${meta.label}" class="w-full h-full object-cover grayscale opacity-40" />
            <div class="absolute inset-0 bg-surface-container-lowest/60 flex items-center justify-center">
              <span class="material-symbols-outlined text-[28px] text-outline-variant">block</span>
            </div>
          </div>

          <div>
            <h3 class="font-headline-sm text-headline-sm text-outline-variant">Não Aplicável</h3>
            <span class="font-body-sm text-body-sm text-outline-variant block mt-space-xs">${pecaInfo?.motivoIndisponivel || "Refrigeração a Ar"}</span>
          </div>
          <div class="flex items-center gap-1 text-outline-variant font-label-sm text-label-sm pt-space-xs">
            <span class="material-symbols-outlined text-[16px]">block</span>
            <span>Bloqueado de Fábrica</span>
          </div>
        </div>
      `;
    }

    if (isNaoInstalada) {
      // Slot vazio / Não instalada (ex: Fusca Turbina/Intake/Intercooler inicialmente) -> CLICÁVEL!
      return `
        <div 
          data-action="abrir-slot" 
          data-tipo="${tipo}"
          class="slot-card group cursor-pointer bg-surface-container-lowest hover:bg-surface-container-low p-space-lg rounded-xl transition-all duration-200 border border-dashed border-outline-variant/40 hover:border-primary/60 shadow-sm flex flex-col justify-between gap-space-md opacity-90 hover:opacity-100"
        >
          <div class="flex items-start justify-between gap-space-sm">
            <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">${meta.numero}. ${meta.label}</span>
            <span class="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-outline">
              <span class="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
              Não instalada
            </span>
          </div>

          <!-- Imagem da peça com efeito vazado -->
          <div class="relative w-full h-28 rounded-lg overflow-hidden bg-surface-container-lowest border border-dashed border-outline-variant/40 flex items-center justify-center">
            <img src="${imagemPeca}" alt="${meta.label}" class="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-500 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
            <div class="absolute bottom-1 left-2 flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px] text-outline">${meta.icone}</span>
              <span class="font-label-sm text-[10px] uppercase font-mono text-outline">${meta.label}</span>
            </div>
          </div>

          <div>
            <h3 class="font-headline-sm text-headline-sm text-outline group-hover:text-on-surface transition-colors">Slot Vazio</h3>
            <span class="font-body-sm text-body-sm text-outline-variant block mt-space-xs">
              ${tipo === TipoPeca.Turbina ? "Sem sobrealimentação (Aspirado)" : meta.descPadrao}
            </span>
          </div>
          <div class="flex items-center justify-between pt-space-xs text-outline-variant group-hover:text-primary transition-colors">
            <span class="font-label-sm text-label-sm uppercase font-semibold">Adicionar Peça</span>
            <span class="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">add_circle</span>
          </div>
        </div>
      `;
    }

    // Slot com peça instalada (Original ou Customizada)
    return `
      <div 
        data-action="abrir-slot" 
        data-tipo="${tipo}"
        class="slot-card group cursor-pointer bg-surface-container-low hover:bg-surface-container p-space-lg rounded-xl transition-all duration-200 border ${
          isCustom 
            ? "border-primary/40 hover:border-primary shadow-[0_4px_20px_rgba(158,0,255,0.12)]" 
            : "border-surface-container-high/40 hover:border-outline-variant"
        } shadow-sm flex flex-col justify-between gap-space-md"
      >
        <div class="flex items-start justify-between gap-space-sm">
          <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">${meta.numero}. ${meta.label}</span>
          <span class="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded ${
            isCustom ? "bg-surface-container-highest text-secondary font-medium" : "bg-surface-container-high text-on-surface-variant"
          } font-label-sm text-label-sm">
            <span class="w-1.5 h-1.5 rounded-full ${isCustom ? "bg-primary-container shadow-[0_0_6px_#9e00ff]" : "bg-outline"}"></span>
            ${isCustom ? "Customizada" : "Original OEM"}
          </span>
        </div>

        <!-- Imagem da Peça Instalada -->
        <div class="relative w-full h-28 rounded-lg overflow-hidden bg-surface-container-lowest border ${
          isCustom ? "border-primary/30" : "border-surface-container-high/40"
        } flex items-center justify-center">
          <img src="${imagemPeca}" alt="${meta.label}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-1.5 left-2 flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px] ${isCustom ? "text-primary" : "text-outline"}">${meta.icone}</span>
            <span class="font-label-sm text-[10px] uppercase font-mono ${isCustom ? "text-primary font-bold" : "text-outline"}">${meta.label}</span>
          </div>
        </div>

        <div>
          <h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors truncate">
            ${pecaInfo?.modelo || meta.label}
          </h3>
          <span class="font-body-sm text-body-sm text-on-surface-variant block mt-space-xs line-clamp-1">
            ${pecaInfo?.nome || meta.descPadrao}
          </span>
          
          <!-- Indicação de pressão em tempo real específica no slot de Turbina -->
          ${
            tipo === TipoPeca.Turbina && estado.pressaoTurbina.temTurbina
              ? `
              <div class="flex items-center gap-1.5 mt-2 font-mono text-xs">
                <span class="text-primary font-bold">Pressão: ${estado.pressaoTurbina.pressaoAtual.toFixed(1)} kg/cm²</span>
                ${
                  estado.pressaoTurbina.pressaoDelta > 0
                    ? `<span class="text-secondary font-semibold">(+${estado.pressaoTurbina.pressaoDelta.toFixed(1)} kg)</span>`
                    : ""
                }
              </div>
            `
              : ""
          }
        </div>
        <div class="flex items-center justify-between pt-space-xs text-outline group-hover:text-on-surface transition-colors">
          <span class="font-label-sm text-label-sm uppercase">Editar Slot</span>
          <span class="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">chevron_right</span>
        </div>
      </div>
    `;
  }

  // ─── Modal / Drawer: Catálogo de Peças ──────────────────────────────────────

  private htmlModalCatalogo(tipo: TipoPeca, estado: EstadoMotor): string {
    const meta = TIPO_PECA_METADATA[tipo];
    const pecaAtual = estado.pecas.get(tipo);
    const pecasDisponiveis = this.controller.getPecasPorTipo(tipo);
    const podeDesinstalar = estado.nome.toLowerCase().includes("fusca") || pecaAtual?.estado === "nao-instalada";
    const imagemPeca = IMAGENS_PECAS[tipo];

    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/80 backdrop-blur-xl animate-modal" id="modal-catalogo-overlay">
        <div class="bg-surface-container-low max-w-3xl w-full max-h-[90vh] p-space-xl rounded-xl shadow-2xl relative flex flex-col gap-space-lg border border-surface-container-high/60 overflow-hidden">
          
          <!-- Header do Catálogo -->
          <div class="flex items-center justify-between border-b border-surface-container-high/40 pb-space-md">
            <div>
              <div class="flex items-center gap-space-xs">
                <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-mono">Slot ${meta.numero}</span>
                <span class="text-outline-variant font-label-sm">•</span>
                <span class="font-label-sm text-label-sm text-outline">${estado.nome}</span>
                ${
                  tipo === TipoPeca.Turbina
                    ? `<span class="text-outline-variant font-label-sm">•</span><span class="font-label-sm text-label-sm text-primary font-mono">Pressão Atual: ${estado.pressaoTurbina.pressaoAtual.toFixed(1)} kg</span>`
                    : ""
                }
              </div>
              <h2 class="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">
                Catálogo — ${meta.label}
              </h2>
              <p class="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Peça atual instalada: <span class="text-primary font-semibold">${pecaAtual?.modelo || "Não Instalada"}</span>
                ${pecaAtual?.estado === "modificada" ? `<span class="ml-1 text-[11px] font-mono px-1.5 py-0.5 rounded bg-primary/20 text-primary">Customizada</span>` : ""}
              </p>
            </div>
            
            <button id="btn-fechar-catalogo" class="w-8 h-8 rounded bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface transition-colors" title="Fechar">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <!-- Banner Visual de Inspeção Mecânica -->
          <div class="relative w-full h-32 rounded-xl overflow-hidden bg-surface-container-lowest border border-surface-container-high/40 flex items-center justify-center shrink-0">
            <img src="${tipo === TipoPeca.Turbina ? "/images/turbina.jpg" : imagemPeca}" alt="${meta.label}" class="w-full h-full object-cover opacity-80" />
            <div class="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
            <div class="absolute bottom-2 left-3 flex items-center gap-space-sm">
              <span class="px-2 py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md text-primary font-mono text-xs font-bold uppercase">Módulo Mecânico</span>
              <span class="text-on-surface font-headline-sm text-sm">${meta.label} — ${pecaAtual?.modelo || "Padrão de Calibração"}</span>
            </div>
          </div>

          <!-- Lista de Peças do Catálogo -->
          <div class="flex-1 overflow-y-auto pr-1 flex flex-col gap-space-md" id="lista-pecas-catalogo">
            
            <!-- Opção: Restaurar Original OEM -->
            <div class="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high border border-surface-container-high/50 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md transition-all">
              <div class="flex items-start gap-space-md">
                <div class="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden shrink-0 border border-surface-container-high/60 flex items-center justify-center">
                  <img src="${imagemPeca}" alt="OEM" class="w-full h-full object-cover opacity-70" />
                </div>
                <div>
                  <div class="flex items-center gap-space-xs mb-0.5">
                    <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline font-mono">Fábrica OEM</span>
                  </div>
                  <h3 class="font-headline-sm text-headline-sm text-on-surface">Peça Original OEM</h3>
                  <p class="font-body-sm text-body-sm text-on-surface-variant">
                    ${
                      tipo === TipoPeca.Turbina && estado.pressaoBase > 0
                        ? `Restaura a turbina de fábrica com pressão original de ${estado.pressaoBase.toFixed(1)} kg/cm².`
                        : "Restaura a calibração e tolerância original de fábrica deste slot."
                    }
                  </p>
                </div>
              </div>
              <button 
                data-action="instalar-original" 
                data-tipo="${tipo}"
                class="px-space-lg py-space-sm rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md tracking-wider uppercase transition-all shrink-0 ${
                  pecaAtual?.estado === "original" ? "opacity-50 cursor-default" : ""
                }"
                ${pecaAtual?.estado === "original" ? "disabled" : ""}
              >
                ${pecaAtual?.estado === "original" ? "Instalada" : "Restaurar OEM"}
              </button>
            </div>

            <!-- Opção de Desinstalar (deixar vazio) caso aplicável -->
            ${
              podeDesinstalar
                ? `
                <div class="p-space-md rounded-xl bg-surface-container/60 hover:bg-surface-container-high border border-dashed border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md transition-all">
                  <div class="flex items-start gap-space-md">
                    <div class="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-outline-variant shrink-0 border border-outline-variant/30">
                      <span class="material-symbols-outlined text-[24px]">remove_circle_outline</span>
                    </div>
                    <div>
                      <span class="font-label-sm text-label-sm uppercase tracking-wider text-outline-variant font-mono">Sem Peça</span>
                      <h3 class="font-headline-sm text-headline-sm text-outline">Não Instalada (Slot Vazio)</h3>
                      <p class="font-body-sm text-body-sm text-outline-variant">
                        ${
                          tipo === TipoPeca.Turbina
                            ? "Remove o turbocompressor, deixando o motor operando como aspirado natural (0.0 kg/cm²)."
                            : "Remove qualquer componente deste slot (como original de fábrica no Fusca)."
                        }
                      </p>
                    </div>
                  </div>
                  <button 
                    data-action="desinstalar-peca" 
                    data-tipo="${tipo}"
                    class="px-space-lg py-space-sm rounded-lg bg-surface-container hover:bg-surface-bright text-outline hover:text-on-surface font-label-md text-label-md tracking-wider uppercase transition-all shrink-0 ${
                      pecaAtual?.estado === "nao-instalada" ? "opacity-50 cursor-default" : ""
                    }"
                    ${pecaAtual?.estado === "nao-instalada" ? "disabled" : ""}
                  >
                    ${pecaAtual?.estado === "nao-instalada" ? "Vazio" : "Remover Peça"}
                  </button>
                </div>
              `
                : ""
            }

            <!-- Peças Disponíveis no Catálogo com Imagens em Cada Item -->
            ${pecasDisponiveis
              .map((peca, index) => {
                const bonus = this.controller.calcularBonusPeca(tipo, peca);
                const isInstalada = pecaAtual?.modelo === peca.getModelo();

                return `
                  <div class="group relative rounded-xl p-space-md transition-all duration-300 flex flex-col justify-between gap-space-md border ${
                    isInstalada 
                      ? "bg-surface-container border-secondary/60 shadow-[0_4px_24px_rgba(158,0,255,0.18)]" 
                      : bonus.riscoQuebra 
                        ? "bg-surface-container-low hover:bg-surface-container border-error/40 hover:border-error" 
                        : "bg-surface-container-low hover:bg-surface-container border-surface-container-high/40 hover:border-primary/40"
                  }">
                    
                    ${isInstalada ? `<div class="absolute left-0 top-3 bottom-3 w-1 bg-secondary rounded-r"></div>` : ""}

                    <div class="flex flex-col md:flex-row md:items-start justify-between gap-space-md">
                      <div class="flex gap-space-md">
                        <!-- Imagem da Peça Individual -->
                        <div class="w-16 h-16 rounded-lg bg-surface-container overflow-hidden shrink-0 border border-surface-container-high/60 flex items-center justify-center">
                          <img src="${imagemPeca}" alt="${peca.getNome()}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        
                        <div class="flex flex-col">
                          <div class="flex items-center gap-space-sm mb-1 flex-wrap">
                            <span class="font-label-sm text-label-sm font-mono tracking-widest uppercase ${
                              bonus.riscoQuebra ? "text-error" : isInstalada ? "text-secondary" : "text-primary"
                            }">
                              ${peca.getNome()}
                            </span>
                            ${
                              tipo === TipoPeca.Turbina && bonus.pressaoTurbina !== undefined
                                ? `<span class="px-2 py-0.2 rounded bg-primary/20 text-primary font-mono text-[11px] font-bold">
                                    Pressão: ${bonus.pressaoTurbina.toFixed(1)} kg/cm²
                                   </span>`
                                : ""
                            }
                            ${
                              bonus.riscoQuebra
                                ? `<span class="px-1.5 py-0.2 rounded bg-error/20 text-error font-label-sm text-[10px] font-bold uppercase tracking-wider">⚠️ Risco de Quebra</span>`
                                : ""
                            }
                          </div>
                          
                          <h3 class="font-headline-md text-headline-md text-on-surface tracking-tight">${peca.getModelo()}</h3>
                          <p class="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-xl">${peca.getDescricao()}</p>
                        </div>
                      </div>

                      <!-- Pill de Performance / Bônus em % e CV -->
                      <div class="flex md:flex-col items-end justify-between shrink-0 bg-surface-container-lowest px-space-md py-space-sm rounded-lg border border-surface-container-high/30">
                        <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                          ${tipo === TipoPeca.Turbina ? "Pressão & Desempenho" : "Bônus de Desempenho"}
                        </span>
                        
                        ${
                          tipo === TipoPeca.Turbina && bonus.pressaoTurbina !== undefined
                            ? `
                            <div class="flex items-baseline gap-1 mt-0.5">
                              <span class="font-headline-sm text-headline-sm font-bold text-primary font-mono">${bonus.pressaoTurbina.toFixed(1)} kg/cm²</span>
                              ${
                                bonus.pressaoDelta !== undefined && bonus.pressaoDelta > 0
                                  ? `<span class="font-label-sm text-label-sm text-secondary font-bold font-mono">(+${bonus.pressaoDelta.toFixed(1)} kg)</span>`
                                  : bonus.pressaoDelta === 0
                                  ? `<span class="font-label-sm text-label-sm text-outline font-mono">(OEM)</span>`
                                  : `<span class="font-label-sm text-label-sm text-outline font-mono">(${bonus.pressaoDelta?.toFixed(1)} kg)</span>`
                              }
                            </div>
                          `
                            : `
                            <div class="flex items-baseline gap-1 mt-0.5">
                              ${
                                bonus.percentualPotencia > 0
                                  ? `<span class="font-headline-sm text-headline-sm font-bold text-primary">+${bonus.percentualPotencia}%</span>`
                                  : ""
                              }
                              ${
                                bonus.percentualLimite > 0
                                  ? `<span class="font-headline-sm text-headline-sm font-bold text-secondary">+${bonus.percentualLimite}% Lim</span>`
                                  : ""
                              }
                            </div>
                          `
                        }

                        <span class="font-label-sm text-label-sm text-on-surface-variant font-mono mt-0.5">
                          ${bonus.textoResumo}
                        </span>
                        <span class="font-label-sm text-label-sm text-outline font-mono mt-1">
                          Est: ${bonus.potenciaEstimada} cv / Lim: ${bonus.limiteEstimado} cv
                        </span>
                      </div>
                    </div>

                    <!-- Rodapé do Card com Ação -->
                    <div class="flex items-center justify-between pt-space-xs border-t border-surface-container-high/30">
                      <div class="flex items-center gap-space-md text-outline font-label-sm text-label-sm">
                        <span class="font-mono text-on-surface-variant">${bonus.textoResumo}</span>
                      </div>

                      <button 
                        data-action="instalar-peca-catalogo" 
                        data-tipo="${tipo}" 
                        data-indice="${index}"
                        class="px-space-lg py-space-sm rounded-lg font-label-md text-label-md tracking-wider uppercase transition-all shadow-sm ${
                          isInstalada 
                            ? "bg-secondary/20 text-secondary cursor-default" 
                            : bonus.riscoQuebra 
                              ? "bg-error-container hover:brightness-120 text-on-error-container glow-red font-bold" 
                              : "bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface"
                        }"
                        ${isInstalada ? "disabled" : ""}
                      >
                        ${isInstalada ? "✓ Instalada" : bonus.riscoQuebra ? "Testar Limite (Risco)" : "Instalar"}
                      </button>
                    </div>

                  </div>
                `;
              })
              .join("")}

          </div>

          <div class="flex items-center justify-end border-t border-surface-container-high/40 pt-space-md">
            <button id="btn-fechar-catalogo-footer" class="px-space-lg py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all">
              Fechar Catálogo
            </button>
          </div>

        </div>
      </div>
    `;
  }

  // ─── Modal: Salvar na Garagem ──────────────────────────────────────────────

  private htmlModalSalvar(estado: EstadoMotor): string {
    const pressao = estado.pressaoTurbina;

    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/80 backdrop-blur-xl animate-modal" id="modal-salvar-overlay">
        <div class="bg-surface-container-low max-w-md w-full p-space-xl rounded-xl shadow-2xl relative flex flex-col gap-space-lg border border-surface-container-high/60">
          <div class="flex items-center justify-between">
            <div>
              <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-mono">Oficina Privada</span>
              <h2 class="font-headline-lg text-headline-lg text-on-surface uppercase">Salvar Preparação</h2>
            </div>
            <button id="btn-fechar-salvar" class="w-8 h-8 rounded bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface transition-colors">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="space-y-space-md">
            <p class="font-body-md text-body-md text-on-surface-variant">
              Sua configuração de <strong class="text-on-surface">${estado.nome}</strong> está com <strong class="text-primary font-mono">${Math.round(estado.potenciaAtual)} cv</strong> e <strong class="text-primary font-mono">${pressao.pressaoAtual.toFixed(1)} kg de turbo</strong>. Dê um nome para este projeto:
            </p>

            <div class="space-y-1">
              <label for="input-nome-build" class="font-label-sm text-label-sm uppercase text-outline">Nome do Projeto</label>
              <input 
                id="input-nome-build" 
                type="text" 
                value="${estado.nome} Stage 1" 
                placeholder="Ex: Fusca Turbo 3kg Monstro" 
                class="w-full px-space-md py-space-sm rounded bg-surface-container-lowest border border-outline-variant/60 focus:border-primary focus:outline-none text-on-surface font-body-md"
              />
            </div>

            <div class="bg-surface-container p-space-md rounded-lg text-outline font-label-sm text-label-sm space-y-1">
              <div>Potência final: <span class="text-primary font-bold font-mono">${Math.round(estado.potenciaAtual)} cv</span></div>
              <div>Pressão do turbo: <span class="text-primary font-bold font-mono">${pressao.pressaoAtual.toFixed(1)} kg/cm²</span> <span class="text-xs">(${pressao.descricao})</span></div>
              <div>Limite seguro: <span class="text-secondary font-bold font-mono">${Math.round(estado.limiteAtual)} cv</span></div>
              <div>Carga: <span class="text-on-surface font-mono">${((estado.potenciaAtual / estado.limiteAtual) * 100).toFixed(1)}%</span></div>
            </div>
          </div>

          <div class="flex items-center justify-end gap-space-sm pt-space-xs border-t border-surface-container-high/40">
            <button id="btn-cancelar-salvar" class="px-space-lg py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all">
              Cancelar
            </button>
            <button id="btn-confirmar-salvar" class="px-space-lg py-space-sm bg-primary-container hover:bg-secondary-container text-on-primary-container rounded font-label-md text-label-md uppercase font-semibold tracking-wider transition-all shadow-[0_0_20px_rgba(158,0,255,0.4)]">
              Confirmar & Salvar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ─── Modal: Estatísticas Gerais ────────────────────────────────────────────

  private htmlModalStats(estado: EstadoMotor): string {
    const pct = ((estado.potenciaAtual / estado.limiteAtual) * 100).toFixed(1);
    const ganho = Math.round(estado.potenciaAtual - estado.potenciaBase);
    const pressao = estado.pressaoTurbina;

    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/80 backdrop-blur-xl animate-modal" id="modal-stats-overlay">
        <div class="bg-surface-container-low max-w-xl w-full p-space-xl rounded-xl shadow-2xl relative flex flex-col gap-space-lg border border-surface-container-high/60">
          <div class="flex items-center justify-between">
            <div>
              <span class="font-label-sm text-label-sm uppercase tracking-widest text-primary font-mono">Diagnóstico Dinâmico</span>
              <h2 class="font-headline-lg text-headline-lg text-on-surface">Estatísticas do Conjunto</h2>
            </div>
            <button id="btn-fechar-stats" class="w-8 h-8 rounded bg-surface-container-high hover:bg-surface-bright flex items-center justify-center text-on-surface transition-colors">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-space-md">
            <div class="bg-surface-container p-space-md rounded-lg border border-surface-container-high/30">
              <span class="font-label-sm text-label-sm text-outline block uppercase">Carga Estrutural</span>
              <span class="font-display-hero text-headline-lg text-on-surface font-mono">${pct}%</span>
              <span class="font-body-sm text-body-sm text-primary block mt-1">${ganho >= 0 ? `+${ganho} cv líquido` : `${ganho} cv`}</span>
            </div>
            <div class="bg-surface-container p-space-md rounded-lg border border-surface-container-high/30">
              <span class="font-label-sm text-label-sm text-outline block uppercase">Margem de Ruptura</span>
              <span class="font-display-hero text-headline-lg text-on-surface font-mono">${Math.max(0, Math.round(estado.limiteAtual - estado.potenciaAtual))} cv</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant block mt-1">Margem até fadiga</span>
            </div>
            <div class="bg-surface-container p-space-md rounded-lg border border-surface-container-high/30">
              <span class="font-label-sm text-label-sm text-outline block uppercase">Pressão de Turbina</span>
              <span class="font-display-hero text-headline-lg text-primary font-mono">${pressao.pressaoAtual.toFixed(1)} kg</span>
              <span class="font-body-sm text-body-sm text-on-surface-variant block mt-1">${pressao.descricao}</span>
            </div>
            <div class="bg-surface-container p-space-md rounded-lg border border-surface-container-high/30">
              <span class="font-label-sm text-label-sm text-outline block uppercase">Limite de Bloco</span>
              <span class="font-display-hero text-headline-lg text-on-surface font-mono">${Math.round(estado.limiteAtual)} cv</span>
              <span class="font-body-sm text-body-sm text-secondary block mt-1">Base original: ${estado.limiteBase} cv</span>
            </div>
          </div>

          <div class="bg-surface-container p-space-md rounded-lg flex items-center justify-between border border-surface-container-high/40">
            <div>
              <span class="font-label-sm text-label-sm text-outline block uppercase">Homologação da Bancada</span>
              <span class="font-body-md text-body-md text-on-surface font-semibold">Tuning Pronto para Validação de Pista</span>
            </div>
            <span class="material-symbols-outlined text-primary text-[28px]">check_circle</span>
          </div>

          <button id="btn-fechar-stats-footer" class="w-full py-space-sm bg-surface-container-high hover:bg-surface-bright text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all">
            Fechar Resumo
          </button>
        </div>
      </div>
    `;
  }

  // ─── Modal / Overlay: Motor Fundido ────────────────────────────────────────

  private htmlOverlayQuebra(estado: EstadoMotor): string {
    return `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/90 backdrop-blur-2xl animate-modal" id="overlay-quebra">
        <div class="bg-surface-container-low max-w-lg w-full p-space-xl rounded-xl shadow-2xl relative flex flex-col gap-space-lg border border-error/50 broken-glow text-center">
          <div class="w-20 h-20 rounded-full bg-error-container/40 text-error flex items-center justify-center mx-auto shadow-lg">
            <span class="material-symbols-outlined text-[44px]">explosion</span>
          </div>

          <div>
            <span class="font-label-sm text-label-sm uppercase tracking-widest text-error font-mono font-bold">FALHA MECÂNICA CATASTRÓFICA</span>
            <h2 class="font-headline-xl text-headline-xl text-on-surface uppercase mt-1">Motor Fundido!</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-sm mx-auto">
              ${estado.mensagemQuebra}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-space-sm py-space-md px-space-lg bg-surface-container-lowest rounded-xl border border-error/30 text-left">
            <div>
              <span class="font-label-sm text-label-sm text-outline uppercase block">Potência no Pico</span>
              <span class="font-display-hero text-headline-lg text-error font-bold font-mono">${estado.potenciaFinalQuebra} cv</span>
            </div>
            <div>
              <span class="font-label-sm text-label-sm text-outline uppercase block">Limite Suportado</span>
              <span class="font-display-hero text-headline-lg text-secondary font-bold font-mono">${Math.round(estado.limiteAtual)} cv</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-space-sm pt-space-xs">
            <button id="btn-resetar-apos-quebra" class="w-full sm:w-auto px-space-xl py-space-md rounded-xl bg-error hover:brightness-110 text-on-error font-headline-sm text-headline-sm uppercase tracking-wider font-bold transition-all shadow-[0_0_20px_rgba(239,68,68,0.45)]">
              🔄 Reconstruir Motor
            </button>
            <button id="btn-voltar-apos-quebra" class="w-full sm:w-auto px-space-lg py-space-md rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-md text-label-md uppercase tracking-wider transition-all">
              ← Escolher Outro Motor
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ─── Tela 3: Meus Motores / Garagem ────────────────────────────────────────

  renderizarMeusMotores(): void {
    this.abaAtiva = "meus-motores";
    const salvos = this.controller.getMotoresSalvos();

    this.app.innerHTML = `
      ${this.htmlHeader()}
      <main class="w-full pt-16 bg-surface flex-1">
        <div class="max-w-7xl mx-auto px-gutter py-space-xl">
          <div class="flex flex-col w-full">

            <!-- Micro-Strip de Status -->
            <div class="w-full flex items-center justify-between pb-space-lg">
              <div class="flex items-center gap-space-sm">
                <span class="w-2 h-2 rounded-full bg-primary-container animate-pulse shadow-[0_0_8px_#9e00ff]"></span>
                <span class="font-label-sm text-label-sm tracking-widest uppercase text-on-surface-variant font-mono">ECU Profile Sync // Garagem Pessoal</span>
              </div>
              <div class="font-label-sm text-label-sm uppercase tracking-widest text-outline font-mono">
                Preparações Salvas: <span class="text-primary font-semibold">${salvos.length}</span>
              </div>
            </div>

            <!-- Header da Garagem -->
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
              <div>
                <p class="font-label-md text-label-md tracking-wider uppercase text-primary mb-space-xs font-mono">Oficina Privada</p>
                <h1 class="font-headline-xl text-headline-xl text-on-surface tracking-tight uppercase">Meus Motores</h1>
                <p class="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
                  Suas preparações personalizadas salvas. Retome qualquer calibração ou teste novos limites.
                </p>
              </div>

              <div class="flex items-center gap-space-xs bg-surface-container-low p-space-xs rounded-xl border border-surface-container-high/40">
                <span class="px-space-md py-space-xs bg-surface-container-high text-on-surface rounded font-label-sm text-label-sm tracking-wider uppercase shadow-sm">
                  Projetos (${salvos.length})
                </span>
              </div>
            </div>

            <!-- Grid de Motores Salvos -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
              
              ${
                salvos.length === 0
                  ? `
                  <div class="lg:col-span-12 p-space-xl bg-surface-container-lowest rounded-xl border border-dashed border-outline-variant/40 text-center flex flex-col items-center justify-center gap-space-md py-16">
                    <div class="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
                      <span class="material-symbols-outlined text-[32px]">garage</span>
                    </div>
                    <div>
                      <h3 class="font-headline-md text-headline-md text-on-surface uppercase">Sua garagem está vazia</h3>
                      <p class="font-body-md text-body-md text-on-surface-variant mt-1 max-w-md">
                        Nenhum motor customizado foi salvo ainda. Selecione um motor, instale peças de performance e clique em "Salvar na Garagem".
                      </p>
                    </div>
                    <button id="btn-ir-escolher-motor" class="px-space-xl py-space-md rounded-xl bg-primary-container hover:bg-secondary-container text-on-primary-container font-headline-sm text-headline-sm uppercase tracking-wider font-bold transition-all shadow-[0_0_24px_rgba(158,0,255,0.4)]">
                      Começar Novo Projeto
                    </button>
                  </div>
                `
                  : salvos.map((build, index) => this.htmlCardBuildSalvo(build, index)).join("")
              }

              <!-- Card de Montar Nova Preparação (sempre visível ao final) -->
              <div class="lg:col-span-12 relative flex flex-col md:flex-row items-center justify-between p-space-xl bg-surface-container-lowest rounded-xl shadow-lg group overflow-hidden mt-space-sm transition-all duration-300 hover:bg-surface-container-low border border-surface-container-high/40">
                <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-primary-container/10 blur-3xl pointer-events-none rounded-full"></div>

                <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-space-lg mb-space-lg md:mb-0">
                  <div class="w-16 h-16 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-on-primary-container transition-all duration-300 shadow-md">
                    <span class="material-symbols-outlined text-[32px]">add</span>
                  </div>
                  <div>
                    <div class="flex items-center gap-space-xs mb-1">
                      <span class="font-label-sm text-label-sm text-primary tracking-widest uppercase font-mono">Bancada Livre</span>
                      <span class="w-1 h-1 rounded-full bg-outline"></span>
                      <span class="font-label-sm text-label-sm text-outline">Slot Disponível</span>
                    </div>
                    <h3 class="font-headline-md text-headline-md text-on-surface uppercase tracking-tight font-bold">
                      Montar Nova Preparação
                    </h3>
                    <p class="font-body-md text-body-md text-on-surface-variant mt-1 max-w-xl">
                      Selecione um motor de fábrica virgem e inicie uma nova montagem na bancada de calibração.
                    </p>
                  </div>
                </div>

                <div class="relative z-10 w-full md:w-auto flex-shrink-0">
                  <button id="btn-garagem-explorar" class="w-full md:w-auto inline-flex items-center justify-center gap-space-sm px-space-xl py-space-md bg-surface-container-high hover:bg-surface-bright text-on-surface hover:text-primary font-headline-sm text-headline-sm uppercase tracking-wider font-bold rounded shadow-sm transition-all duration-200">
                    <span class="material-symbols-outlined text-[20px]">swap_driving_apps_wheel</span>
                    <span>Explorar Motores</span>
                  </button>
                </div>
              </div>

            </div>

            <!-- Rodapé de Calibração -->
            <div class="mt-space-xl pt-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm text-outline font-label-sm text-label-sm">
              <div class="flex items-center gap-space-sm">
                <span class="material-symbols-outlined text-primary text-[16px]">verified</span>
                <span>TODOS OS MAPAS SALVOS COM EQUILÍBRIO ESTEQUIOMÉTRICO VALIDADO (AFR 11.8:1 A WOT)</span>
              </div>
              <div class="tracking-widest uppercase font-mono">
                GARAGE BUILD v4.8.2-PROD
              </div>
            </div>

          </div>
        </div>
      </main>
      ${this.htmlFooter()}
    `;

    this.vincularEventosNavegacao();
    this.vincularEventosGaragem();
  }

  private htmlCardBuildSalvo(build: MotorSalvo, index: number): string {
    const imagem = IMAGENS_MOTORES[build.motorIndex] || "/images/supra.png";
    const pct = Math.min((build.potenciaFinal / build.limiteFinal) * 100, 100).toFixed(1);

    return `
      <div class="lg:col-span-6 group relative flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-[0_8px_32px_-4px_rgba(158,0,255,0.18)] border border-surface-container-high/40">
        
        <!-- Header Visual do Projeto com Foto do Carro -->
        <div class="relative w-full h-64 sm:h-72 overflow-hidden bg-surface-container-high flex items-center justify-center">
          <img src="${imagem}" alt="${build.nomePersonalizado}" class="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105" />
          
          <div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/60 via-transparent to-transparent"></div>

          <!-- Badges de topo -->
          <div class="absolute top-space-md left-space-md right-space-md flex items-center justify-between">
            <span class="inline-flex items-center gap-1.5 px-space-sm py-1 bg-surface-container-lowest/80 backdrop-blur-md text-primary font-label-sm text-label-sm tracking-wider uppercase rounded">
              <span class="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              Configuração Salva
            </span>
            <span class="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high/80 backdrop-blur-md px-space-sm py-1 rounded font-mono">
              ${build.dataCriacao}
            </span>
          </div>

          <!-- Identidade Sobreposta -->
          <div class="absolute bottom-space-md left-space-lg right-space-lg">
            <span class="font-label-sm text-label-sm text-primary tracking-widest uppercase font-mono">${build.motorOriginalNome}</span>
            <h2 class="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight uppercase truncate">
              ${build.nomePersonalizado}
            </h2>
          </div>
        </div>

        <!-- Métricas & Peças Instaladas -->
        <div class="p-space-lg flex-1 flex flex-col justify-between space-y-space-lg bg-surface-container-lowest">
          
          <!-- Painel de Potência & Pressão -->
          <div class="bg-surface-container-low p-space-md rounded-lg flex items-end justify-between border border-surface-container-high/30">
            <div>
              <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Potência Calibrada</span>
              <div class="flex items-baseline gap-1 mt-space-xs">
                <span class="font-display-hero text-headline-xl text-on-surface font-extrabold tracking-tight">${build.potenciaFinal}</span>
                <span class="font-label-md text-label-md text-primary font-bold">cv</span>
              </div>
            </div>
            
            <div class="text-center">
              <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Pressão Turbo</span>
              <div class="mt-space-xs font-mono font-bold text-primary text-lg">
                ${build.pressaoFinal !== undefined && build.pressaoFinal > 0 ? `${build.pressaoFinal.toFixed(1)} kg` : "0.0 kg"}
              </div>
            </div>

            <div class="text-right">
              <span class="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Teto Térmico</span>
              <div class="flex items-center justify-end gap-1.5 mt-space-xs">
                <span class="font-label-md text-label-md text-on-surface-variant">Limite:</span>
                <span class="font-label-lg text-label-lg text-on-surface font-semibold font-mono">${build.limiteFinal} cv</span>
              </div>
            </div>
          </div>

          <!-- Barra de Carga -->
          <div class="space-y-space-xs">
            <div class="flex justify-between font-label-sm text-label-sm text-outline">
              <span>Carga Estrutural</span>
              <span class="text-primary font-medium font-mono">${pct}% Utilizado</span>
            </div>
            <div class="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-primary-container to-primary rounded-full" style="width: ${pct}%;"></div>
            </div>
          </div>

          <!-- Resumo de Peças Customizadas -->
          <div class="bg-surface-container-low/60 rounded-lg p-space-md border border-surface-container-high/20">
            <div class="flex items-center gap-space-xs mb-space-sm">
              <span class="material-symbols-outlined text-primary text-[18px]">build</span>
              <span class="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">
                ${build.pecasCustomizadasNomes.length} upgrades instalados
              </span>
            </div>
            <div class="flex flex-wrap gap-space-xs max-h-20 overflow-y-auto">
              ${
                build.pecasCustomizadasNomes.length > 0
                  ? build.pecasCustomizadasNomes
                      .map((nome) => `<span class="px-space-sm py-0.5 bg-surface-container-high text-on-surface-variant font-label-sm text-[11px] rounded">${nome}</span>`)
                      .join("")
                  : `<span class="text-outline font-body-sm text-xs">Nenhuma peça após o padrão original</span>`
              }
            </div>
          </div>

          <!-- Ações do Card -->
          <div class="flex items-center gap-space-sm pt-space-xs">
            <button 
              data-action="carregar-build" 
              data-id="${build.id}"
              class="flex-1 py-space-md px-space-lg rounded bg-gradient-to-r from-on-primary to-primary-container text-on-primary-container font-headline-sm text-headline-sm uppercase tracking-wider font-bold text-center shadow-md transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_rgba(158,0,255,0.45)] flex items-center justify-center gap-space-sm"
            >
              <span>Carregar na Bancada</span>
              <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            <button 
              data-action="excluir-build" 
              data-id="${build.id}"
              class="w-12 h-12 rounded bg-surface-container-high hover:bg-error-container/40 text-outline hover:text-error flex items-center justify-center transition-colors"
              title="Excluir este projeto"
            >
              <span class="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>

        </div>
      </div>
    `;
  }

  // ─── Vinculação de Eventos ─────────────────────────────────────────────────

  private vincularEventosNavegacao(): void {
    document.getElementById("nav-logo")?.addEventListener("click", () => {
      this.renderizarSelecaoMotor();
    });

    document.getElementById("tab-motores")?.addEventListener("click", () => {
      if (this.controller.temMotorSelecionado()) {
        this.renderizarTuning();
      } else {
        this.renderizarSelecaoMotor();
      }
    });

    document.getElementById("tab-meus-motores")?.addEventListener("click", () => {
      this.renderizarMeusMotores();
    });
  }

  private vincularEventosTuning(): void {
    // Voltar para seleção
    document.getElementById("btn-voltar-selecao")?.addEventListener("click", () => {
      this.renderizarSelecaoMotor();
    });

    // Resetar motor
    document.getElementById("btn-resetar-motor")?.addEventListener("click", () => {
      this.controller.resetarMotor();
      this.renderizarTuning();
    });

    // Abrir Modal de Salvar
    document.getElementById("btn-abrir-salvar")?.addEventListener("click", () => {
      this.modalSalvarAberto = true;
      this.renderizarTuning();
    });

    // Abrir Modal de Estatísticas
    document.getElementById("btn-stats")?.addEventListener("click", () => {
      this.modalStatsAberto = true;
      this.renderizarTuning();
    });

    // Clicar em slot de hardware
    this.app.querySelectorAll<HTMLElement>("[data-action='abrir-slot']").forEach((slot) => {
      slot.addEventListener("click", () => {
        const tipo = slot.dataset.tipo as TipoPeca;
        this.slotAberto = tipo;
        this.renderizarTuning();
      });
    });

    // Eventos do Modal Catálogo
    const fecharCatalogo = () => {
      this.slotAberto = null;
      this.renderizarTuning();
    };

    document.getElementById("btn-fechar-catalogo")?.addEventListener("click", fecharCatalogo);
    document.getElementById("btn-fechar-catalogo-footer")?.addEventListener("click", fecharCatalogo);
    document.getElementById("modal-catalogo-overlay")?.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "modal-catalogo-overlay") fecharCatalogo();
    });

    // Instalar peça do catálogo
    this.app.querySelectorAll<HTMLElement>("[data-action='instalar-peca-catalogo']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tipo = btn.dataset.tipo as TipoPeca;
        const indice = parseInt(btn.dataset.indice ?? "0");
        this.controller.instalarPeca(tipo, indice);
        this.slotAberto = null;
        this.renderizarTuning();
      });
    });

    // Restaurar original OEM
    this.app.querySelectorAll<HTMLElement>("[data-action='instalar-original']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tipo = btn.dataset.tipo as TipoPeca;
        this.controller.restaurarOriginal(tipo);
        this.slotAberto = null;
        this.renderizarTuning();
      });
    });

    // Desinstalar peça (slot vazio)
    this.app.querySelectorAll<HTMLElement>("[data-action='desinstalar-peca']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const tipo = btn.dataset.tipo as TipoPeca;
        this.controller.desinstalarPeca(tipo);
        this.slotAberto = null;
        this.renderizarTuning();
      });
    });

    // Eventos do Modal Salvar
    const fecharSalvar = () => {
      this.modalSalvarAberto = false;
      this.renderizarTuning();
    };
    document.getElementById("btn-fechar-salvar")?.addEventListener("click", fecharSalvar);
    document.getElementById("btn-cancelar-salvar")?.addEventListener("click", fecharSalvar);
    document.getElementById("modal-salvar-overlay")?.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "modal-salvar-overlay") fecharSalvar();
    });

    document.getElementById("btn-confirmar-salvar")?.addEventListener("click", () => {
      const input = document.getElementById("input-nome-build") as HTMLInputElement;
      const nome = input ? input.value : "";
      this.controller.salvarMotorAtual(nome);
      this.modalSalvarAberto = false;
      this.renderizarMeusMotores();
    });

    // Eventos do Modal Stats
    const fecharStats = () => {
      this.modalStatsAberto = false;
      this.renderizarTuning();
    };
    document.getElementById("btn-fechar-stats")?.addEventListener("click", fecharStats);
    document.getElementById("btn-fechar-stats-footer")?.addEventListener("click", fecharStats);
    document.getElementById("modal-stats-overlay")?.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "modal-stats-overlay") fecharStats();
    });

    // Eventos do Overlay de Quebra
    document.getElementById("btn-resetar-apos-quebra")?.addEventListener("click", () => {
      this.controller.resetarMotor();
      this.renderizarTuning();
    });

    document.getElementById("btn-voltar-apos-quebra")?.addEventListener("click", () => {
      this.renderizarSelecaoMotor();
    });
  }

  private vincularEventosGaragem(): void {
    document.getElementById("btn-ir-escolher-motor")?.addEventListener("click", () => {
      this.renderizarSelecaoMotor();
    });

    document.getElementById("btn-garagem-explorar")?.addEventListener("click", () => {
      this.renderizarSelecaoMotor();
    });

    // Carregar build salva
    this.app.querySelectorAll<HTMLElement>("[data-action='carregar-build']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id ?? "";
        const carregou = this.controller.carregarMotorSalvo(id);
        if (carregou) {
          this.renderizarTuning();
        }
      });
    });

    // Excluir build salva
    this.app.querySelectorAll<HTMLElement>("[data-action='excluir-build']").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id ?? "";
        if (confirm("Deseja realmente remover esta preparação da sua garagem?")) {
          this.controller.excluirMotorSalvo(id);
          this.renderizarMeusMotores();
        }
      });
    });
  }
}
