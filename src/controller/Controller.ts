import Motor from "../model/Motor.ts";
import { TipoPeca } from "../model/TipoPeca.ts";
import { Peca } from "../model/Peca.ts";
import { PecaOriginal } from "../model/PecaOriginal.ts";
import { PecaNaoInstalada } from "../model/PecaNaoInstalada.ts";
import { motoresPreDefinidos } from "../model/motoresData.ts";
import { catalogo } from "../model/pecasData.ts";
import { MotorQuebradoError } from "../model/exceptions/MotorQuebradoError.ts";

export interface InfoMotor {
  index: number;
  nome: string;
  cilindros: number;
  potenciaBase: number;
  limiteBase: number;
  pressaoBase: number;
}

export interface InfoPeca {
  nome: string;
  modelo: string;
  descricao: string;
  estado: "original" | "nao-instalada" | "modificada";
  disponivel: boolean;
  motivoIndisponivel?: string;
  pressaoPeca?: number;
}

export interface BonusPeca {
  percentualPotencia: number;
  percentualLimite: number;
  ganhoCvPotencia: number;
  ganhoCvLimite: number;
  potenciaEstimada: number;
  limiteEstimado: number;
  riscoQuebra: boolean;
  textoResumo: string;
  pressaoTurbina?: number;
  pressaoDelta?: number;
}

export interface InfoPressaoTurbina {
  pressaoAtual: number;
  pressaoBase: number;
  pressaoDelta: number;
  temTurbina: boolean;
  descricao: string;
}

export interface EstadoMotor {
  index: number;
  nome: string;
  cilindros: number;
  potenciaBase: number;
  limiteBase: number;
  pressaoBase: number;
  pressaoTurbina: InfoPressaoTurbina;
  potenciaAtual: number;
  limiteAtual: number;
  pecas: Map<TipoPeca, InfoPeca>;
  quebrado: boolean;
  mensagemQuebra: string;
  potenciaFinalQuebra: number;
}

export interface ResultadoInstalacao {
  sucesso: boolean;
  mensagem?: string;
  potenciaFinal?: number;
}

export interface MotorSalvo {
  id: string;
  nomePersonalizado: string;
  motorIndex: number;
  motorOriginalNome: string;
  cilindros: number;
  potenciaBase: number;
  limiteBase: number;
  pressaoBase: number;
  pressaoFinal: number;
  pressaoDescricao: string;
  potenciaFinal: number;
  limiteFinal: number;
  pecasInstaladas: Record<string, { tipo: "original" | "nao-instalada" | "catalogo"; indiceCatalogo?: number }>;
  pecasCustomizadasNomes: string[];
  dataCriacao: string;
}

const STORAGE_KEY_BUILDS = "typescript_tuning_garage_builds";

export class Controller {
  private motorAtual: Motor | null = null;
  private indexMotorAtual: number = -1;
  private quebrado: boolean = false;
  private mensagemQuebra: string = "";
  private potenciaFinalQuebra: number = 0;
  // Registra escolhas de peças para persistência na garagem
  private registroPecas: Map<TipoPeca, { tipo: "original" | "nao-instalada" | "catalogo"; indiceCatalogo?: number }> = new Map();

  // Retorna a lista de todos os motores disponíveis
  getMotores(): InfoMotor[] {
    return motoresPreDefinidos.map((m, index) => ({
      index,
      nome: m.getNome(),
      cilindros: m.getCilindros(),
      potenciaBase: m.getPotenciaBase(),
      limiteBase: m.getLimiteBase(),
      pressaoBase: m.getPressaoBase(),
    }));
  }

  getIndexMotorAtual(): number {
    return this.indexMotorAtual;
  }

  temMotorSelecionado(): boolean {
    return this.motorAtual !== null;
  }

  // Seleciona um motor pré-definido por índice
  selecionarMotor(index: number): void {
    const original = motoresPreDefinidos[index];
    this.indexMotorAtual = index;
    this.motorAtual = this.clonarMotor(original);
    this.quebrado = false;
    this.mensagemQuebra = "";
    this.potenciaFinalQuebra = 0;
    this.registroPecas.clear();

    for (const [tipo, peca] of original.getPecas()) {
      if (peca.getModelo() === "Não Instalada") {
        this.registroPecas.set(tipo, { tipo: "nao-instalada" });
      } else {
        this.registroPecas.set(tipo, { tipo: "original" });
      }
    }
  }

  // Clona um motor preservando o estado inicial sem alterar os originais
  private clonarMotor(original: Motor): Motor {
    const pecasOriginais = new Map<TipoPeca, Peca>();
    for (const [tipo, peca] of original.getPecas()) {
      if (peca.getModelo() === "Não Instalada") {
        pecasOriginais.set(tipo, new PecaNaoInstalada(`${tipo}`));
      } else {
        pecasOriginais.set(tipo, new PecaOriginal(`${tipo}`));
      }
    }
    return new Motor(
      original.getNome(),
      original.getCilindros(),
      original.getPotenciaBase(),
      original.getLimiteBase(),
      original.getPressaoBase(),
      pecasOriginais
    );
  }

  // Verifica compatibilidade de slots (regra do Fusca: somente Radiador é incompatível por ser a ar)
  isSlotDisponivel(tipo: TipoPeca): { disponivel: boolean; motivo?: string } {
    if (!this.motorAtual) return { disponivel: true };

    const nome = this.motorAtual.getNome().toLowerCase();
    const isFusca = nome.includes("fusca") || nome.includes("boxer 1600");

    if (isFusca && tipo === TipoPeca.Radiador) {
      return {
        disponivel: false,
        motivo: "Incompatível / Refrigeração a Ar",
      };
    }

    return { disponivel: true };
  }

  // Retorna peças do catálogo para um tipo
  getPecasPorTipo(tipo: TipoPeca): Peca[] {
    return catalogo.get(tipo) ?? [];
  }

  // Mede com precisão a pressão de uma peça de turbina simulando em motor teste base 0 kg
  medirPressaoTurbina(peca: Peca): number {
    if (peca.getModelo() === "Não Instalada") return 0;
    const motorTeste = new Motor("TestePressao", 4, 100, 100, 0, new Map());
    peca.aplicarEfeito(motorTeste);
    const pressao = Math.round(((motorTeste.getPotenciaAtual() - 100) / 100) * 10) / 10;
    return Math.max(0, pressao);
  }

  // Obtém a telemetria completa da pressão de turbina do motor atual em tempo real
  getPressaoTurbinaAtual(): InfoPressaoTurbina {
    if (!this.motorAtual) {
      return { pressaoAtual: 0, pressaoBase: 0, pressaoDelta: 0, temTurbina: false, descricao: "Sem motor ativo" };
    }

    const pressaoBase = this.motorAtual.getPressaoBase();
    const pecaTurbina = this.motorAtual.getPecas().get(TipoPeca.Turbina);

    if (!pecaTurbina || pecaTurbina.getModelo() === "Não Instalada") {
      return {
        pressaoAtual: 0,
        pressaoBase,
        pressaoDelta: -pressaoBase,
        temTurbina: false,
        descricao: pressaoBase > 0 ? "Turbina removida (Aspirado)" : "Aspirado natural (Sem turbo)",
      };
    }

    if (pecaTurbina.getModelo() === "Original") {
      return {
        pressaoAtual: pressaoBase,
        pressaoBase,
        pressaoDelta: 0,
        temTurbina: pressaoBase > 0,
        descricao: pressaoBase > 0 ? `Pressão original de fábrica (${pressaoBase.toFixed(1)} kg/cm²)` : "Aspirado natural (Original OEM)",
      };
    }

    // Peça customizada instalada
    const pressaoAtual = this.medirPressaoTurbina(pecaTurbina);
    const pressaoDelta = Math.round((pressaoAtual - pressaoBase) * 10) / 10;

    let descricao = "";
    if (pressaoBase === 0) {
      descricao = `+${pressaoAtual.toFixed(1)} kg/cm² adaptada (Aspirado de fábrica)`;
    } else if (pressaoDelta > 0) {
      descricao = `+${pressaoDelta.toFixed(1)} kg/cm² vs fábrica (${pressaoBase.toFixed(1)} kg base)`;
    } else if (pressaoDelta < 0) {
      descricao = `${pressaoDelta.toFixed(1)} kg/cm² vs fábrica (${pressaoBase.toFixed(1)} kg base)`;
    } else {
      descricao = `Mesma pressão de fábrica (${pressaoBase.toFixed(1)} kg/cm²)`;
    }

    return {
      pressaoAtual,
      pressaoBase,
      pressaoDelta,
      temTurbina: true,
      descricao,
    };
  }

  // Calcula com exatidão o ganho de performance de uma peça sem modificar o motor
  calcularBonusPeca(tipo: TipoPeca, peca: Peca): BonusPeca {
    // 1. Simula em um motor de calibração base 100 para isolar as porcentagens
    const pressaoBase = this.motorAtual?.getPressaoBase() ?? 0;
    const motorTeste = new Motor("Teste", 4, 100, 100, pressaoBase, new Map());
    peca.aplicarEfeito(motorTeste);

    const deltaPotenciaPct = Math.round((motorTeste.getPotenciaAtual() - 100) * 10) / 10;
    const deltaLimitePct = Math.round((motorTeste.getLimiteAtual() - 100) * 10) / 10;

    let ganhoCvPotencia = 0;
    let ganhoCvLimite = 0;
    let potenciaEstimada = 0;
    let limiteEstimado = 0;
    let riscoQuebra = false;
    let pressaoTurbina: number | undefined;
    let pressaoDelta: number | undefined;

    if (tipo === TipoPeca.Turbina) {
      pressaoTurbina = this.medirPressaoTurbina(peca);
      pressaoDelta = Math.round((pressaoTurbina - pressaoBase) * 10) / 10;
    }

    if (this.motorAtual) {
      ganhoCvPotencia = Math.round((this.motorAtual.getPotenciaBase() * deltaPotenciaPct) / 100);
      ganhoCvLimite = Math.round((this.motorAtual.getLimiteBase() * deltaLimitePct) / 100);

      // Simula instalação no motor atual através de uma réplica
      try {
        const replica = this.clonarMotor(this.motorAtual);
        for (const [t, p] of this.motorAtual.getPecas()) {
          replica.getPecas().set(t, p);
        }
        replica.instalarPeca(tipo, peca);
        potenciaEstimada = Math.round(replica.getPotenciaAtual());
        limiteEstimado = Math.round(replica.getLimiteAtual());
        riscoQuebra = potenciaEstimada > limiteEstimado;
      } catch (err) {
        if (err instanceof MotorQuebradoError) {
          potenciaEstimada = err.potenciaFinal;
          limiteEstimado = Math.round(this.motorAtual.getLimiteAtual() + ganhoCvLimite);
          riscoQuebra = true;
        }
      }
    }

    const partesTexto: string[] = [];

    if (tipo === TipoPeca.Turbina && pressaoTurbina !== undefined) {
      if (pressaoBase === 0) {
        partesTexto.push(`${pressaoTurbina.toFixed(1)} kg/cm² (+${pressaoTurbina.toFixed(1)} kg adaptada)`);
      } else {
        const sinal = pressaoDelta !== undefined && pressaoDelta >= 0 ? "+" : "";
        partesTexto.push(`${pressaoTurbina.toFixed(1)} kg/cm² (${sinal}${pressaoDelta?.toFixed(1)} kg vs base ${pressaoBase.toFixed(1)} kg)`);
      }
    }

    if (deltaPotenciaPct > 0) {
      partesTexto.push(`+${deltaPotenciaPct}% Potência (+${ganhoCvPotencia} cv)`);
    }
    if (deltaLimitePct > 0) {
      partesTexto.push(`+${deltaLimitePct}% Limite (+${ganhoCvLimite} cv)`);
    }
    if (partesTexto.length === 0) {
      partesTexto.push("0% Ganho (Original OEM)");
    }

    return {
      percentualPotencia: deltaPotenciaPct,
      percentualLimite: deltaLimitePct,
      ganhoCvPotencia,
      ganhoCvLimite,
      potenciaEstimada,
      limiteEstimado,
      riscoQuebra,
      textoResumo: partesTexto.join(" · "),
      pressaoTurbina,
      pressaoDelta,
    };
  }

  // Instala uma peça no motor atual
  instalarPeca(tipoPeca: TipoPeca, indicePeca: number): ResultadoInstalacao {
    if (!this.motorAtual || this.quebrado) {
      return { sucesso: false, mensagem: "Motor indisponível." };
    }

    const compat = this.isSlotDisponivel(tipoPeca);
    if (!compat.disponivel) {
      return { sucesso: false, mensagem: compat.motivo || "Slot indisponível para este motor." };
    }

    const pecas = catalogo.get(tipoPeca);
    if (!pecas || !pecas[indicePeca]) {
      return { sucesso: false, mensagem: "Peça não encontrada no catálogo." };
    }

    try {
      this.motorAtual.instalarPeca(tipoPeca, pecas[indicePeca]);
      this.registroPecas.set(tipoPeca, { tipo: "catalogo", indiceCatalogo: indicePeca });
      return { sucesso: true };
    } catch (erro) {
      if (erro instanceof MotorQuebradoError) {
        this.quebrado = true;
        this.mensagemQuebra = erro.message;
        this.potenciaFinalQuebra = erro.potenciaFinal;
        return {
          sucesso: false,
          mensagem: erro.message,
          potenciaFinal: erro.potenciaFinal,
        };
      }
      throw erro;
    }
  }

  // Desinstala uma peça (volta para "Não Instalada")
  desinstalarPeca(tipoPeca: TipoPeca): ResultadoInstalacao {
    if (!this.motorAtual || this.quebrado) {
      return { sucesso: false, mensagem: "Motor indisponível." };
    }

    try {
      this.motorAtual.getPecas().set(tipoPeca, new PecaNaoInstalada(`${tipoPeca}`));
      this.motorAtual.recalcular();
      this.registroPecas.set(tipoPeca, { tipo: "nao-instalada" });
      return { sucesso: true };
    } catch (erro) {
      if (erro instanceof MotorQuebradoError) {
        this.quebrado = true;
        this.mensagemQuebra = erro.message;
        this.potenciaFinalQuebra = erro.potenciaFinal;
        return { sucesso: false, mensagem: erro.message, potenciaFinal: erro.potenciaFinal };
      }
      throw erro;
    }
  }

  // Restaura peça original de fábrica
  restaurarOriginal(tipoPeca: TipoPeca): ResultadoInstalacao {
    if (!this.motorAtual || this.quebrado) {
      return { sucesso: false, mensagem: "Motor indisponível." };
    }

    try {
      this.motorAtual.getPecas().set(tipoPeca, new PecaOriginal(`${tipoPeca}`));
      this.motorAtual.recalcular();
      this.registroPecas.set(tipoPeca, { tipo: "original" });
      return { sucesso: true };
    } catch (erro) {
      if (erro instanceof MotorQuebradoError) {
        this.quebrado = true;
        this.mensagemQuebra = erro.message;
        this.potenciaFinalQuebra = erro.potenciaFinal;
        return { sucesso: false, mensagem: erro.message, potenciaFinal: erro.potenciaFinal };
      }
      throw erro;
    }
  }

  // Retorna o estado atual do motor para renderização
  getEstadoMotor(): EstadoMotor | null {
    if (!this.motorAtual) return null;

    const pecasInfo = new Map<TipoPeca, InfoPeca>();
    for (const [tipo, peca] of this.motorAtual.getPecas()) {
      let estado: InfoPeca["estado"];
      if (peca.getModelo() === "Não Instalada") {
        estado = "nao-instalada";
      } else if (peca.getModelo() === "Original") {
        estado = "original";
      } else {
        estado = "modificada";
      }

      const compat = this.isSlotDisponivel(tipo);
      let pressaoPeca: number | undefined;
      if (tipo === TipoPeca.Turbina && estado === "modificada") {
        pressaoPeca = this.medirPressaoTurbina(peca);
      }

      pecasInfo.set(tipo, {
        nome: peca.getNome(),
        modelo: peca.getModelo(),
        descricao: peca.getDescricao(),
        estado,
        disponivel: compat.disponivel,
        motivoIndisponivel: compat.motivo,
        pressaoPeca,
      });
    }

    const pressaoTurbina = this.getPressaoTurbinaAtual();

    return {
      index: this.indexMotorAtual,
      nome: this.motorAtual.getNome(),
      cilindros: this.motorAtual.getCilindros(),
      potenciaBase: this.motorAtual.getPotenciaBase(),
      limiteBase: this.motorAtual.getLimiteBase(),
      pressaoBase: this.motorAtual.getPressaoBase(),
      pressaoTurbina,
      potenciaAtual: this.motorAtual.getPotenciaAtual(),
      limiteAtual: this.motorAtual.getLimiteAtual(),
      pecas: pecasInfo,
      quebrado: this.quebrado,
      mensagemQuebra: this.mensagemQuebra,
      potenciaFinalQuebra: this.potenciaFinalQuebra,
    };
  }

  // Reseta o motor atual para o estado inicial
  resetarMotor(): void {
    if (this.indexMotorAtual >= 0) {
      this.selecionarMotor(this.indexMotorAtual);
    }
  }

  // ─── Garagem / Motores Salvos (localStorage) ───────────────────────────────

  getMotoresSalvos(): MotorSalvo[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_BUILDS);
      if (!data) return [];
      return JSON.parse(data) as MotorSalvo[];
    } catch {
      return [];
    }
  }

  salvarMotorAtual(nomePersonalizado: string): MotorSalvo {
    if (!this.motorAtual) {
      throw new Error("Nenhum motor ativo para salvar.");
    }

    const estado = this.getEstadoMotor()!;
    const pecasCustomizadas: string[] = [];

    const registroPlain: Record<string, { tipo: "original" | "nao-instalada" | "catalogo"; indiceCatalogo?: number }> = {};
    for (const [tipo, reg] of this.registroPecas.entries()) {
      registroPlain[tipo] = reg;
      if (reg.tipo === "catalogo" && reg.indiceCatalogo !== undefined) {
        const peca = catalogo.get(tipo)?.[reg.indiceCatalogo];
        if (peca) {
          pecasCustomizadas.push(peca.getModelo());
        }
      }
    }

    const novoBuild: MotorSalvo = {
      id: "build_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      nomePersonalizado: nomePersonalizado.trim() || `${this.motorAtual.getNome()} Custom`,
      motorIndex: this.indexMotorAtual,
      motorOriginalNome: this.motorAtual.getNome(),
      cilindros: this.motorAtual.getCilindros(),
      potenciaBase: this.motorAtual.getPotenciaBase(),
      limiteBase: this.motorAtual.getLimiteBase(),
      pressaoBase: this.motorAtual.getPressaoBase(),
      pressaoFinal: estado.pressaoTurbina.pressaoAtual,
      pressaoDescricao: estado.pressaoTurbina.descricao,
      potenciaFinal: Math.round(estado.potenciaAtual),
      limiteFinal: Math.round(estado.limiteAtual),
      pecasInstaladas: registroPlain,
      pecasCustomizadasNomes: pecasCustomizadas,
      dataCriacao: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
    };

    const salvos = this.getMotoresSalvos();
    salvos.unshift(novoBuild);
    localStorage.setItem(STORAGE_KEY_BUILDS, JSON.stringify(salvos));
    return novoBuild;
  }

  carregarMotorSalvo(id: string): boolean {
    const salvos = this.getMotoresSalvos();
    const build = salvos.find((b) => b.id === id);
    if (!build) return false;

    // 1. Recria o motor original
    this.selecionarMotor(build.motorIndex);

    // 2. Reaplica cada peça salva
    for (const [tipoKey, reg] of Object.entries(build.pecasInstaladas)) {
      const tipo = tipoKey as TipoPeca;
      if (reg.tipo === "catalogo" && reg.indiceCatalogo !== undefined) {
        this.instalarPeca(tipo, reg.indiceCatalogo);
      } else if (reg.tipo === "nao-instalada") {
        this.desinstalarPeca(tipo);
      } else {
        this.restaurarOriginal(tipo);
      }
    }

    return true;
  }

  excluirMotorSalvo(id: string): void {
    const salvos = this.getMotoresSalvos().filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY_BUILDS, JSON.stringify(salvos));
  }
}
