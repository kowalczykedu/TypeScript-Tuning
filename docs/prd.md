# TypeScript Tuning — Regras de Negócio

Regras que o sistema garante, numeradas para servirem de referência nos testes (`describe`/`test`) e na apresentação. Tudo aqui vive no `model/`, sem depender de terminal, view ou controller.

---

## RN-01 — Especificações de fábrica do motor

Todo motor nasce com 5 especificações que **nunca mudam** com o tuning:

| Campo          | Significado                           |
| -------------- | ------------------------------------- |
| `nome`         | Nome do motor                         |
| `cilindros`    | Número de cilindros                   |
| `potenciaBase` | Potência de fábrica, em cv            |
| `limiteBase`   | Limite seguro de potência sem reforço |
| `pressaoBase`  | Pressão de turbo de fábrica, em kg    |

- `pressaoBase = 0` significa **motor aspirado**.
- O construtor tem duas formas (sobrecarga): sem informar pressão, o motor é criado como aspirado (`pressaoBase = 0`); informando a pressão, ela é usada.
- Além das fixas, o motor guarda `potenciaAtual` e `limiteAtual`, que começam iguais à base e mudam conforme as peças instaladas.

## RN-02 — Slots do motor

Todo motor possui exatamente **12 slots**, definidos em `TipoPeca`:

Intake, Intercooler, Radiador, Radiador de Óleo, Pistão, Biela, Comando, Cabeçote, Turbina, Coletor de Admissão, Coletor de Escape e Alimentação (injeção ou carburador).

Cada slot guarda **uma única peça** por vez. Instalar uma peça num slot substitui a que estava lá.

## RN-03 — Peças de fábrica

Todo motor nasce com os 12 slots preenchidos:

- **Peça Original** (`PecaOriginal`): o slot existe de fábrica naquele motor. Modelo exibido: "Original".
- **Peça Não Instalada** (`PecaNaoInstalada`): o slot **não existe** de fábrica naquele motor. Exemplo: o Fusca (aspirado) vem sem Turbina, Intercooler, Radiador e Intake.

As duas **não alteram nada** no motor: o desempenho delas já está contado em `potenciaBase` e `limiteBase`.

## RN-04 — Categorias das peças instaláveis

| Categoria | Classe         | Efeito                                     |
| --------- | -------------- | ------------------------------------------ |
| Potência  | `PecaPotencia` | Aumenta só a potência                      |
| Limite    | `PecaLimite`   | Aumenta só o limite seguro                 |
| Mista     | `PecaMista`    | Aumenta potência e limite ao mesmo tempo   |
| Turbina   | `PecaTurbina`  | Aumenta a potência por pressão (ver RN-06) |

## RN-05 — Percentuais sempre sobre a base

- Ganho de potência = `potenciaBase × (percentual / 100)`
- Ganho de limite = `limiteBase × (percentual / 100)`

O cálculo usa **sempre a base de fábrica**, nunca o valor atual. Assim o resultado não depende da ordem em que as peças foram instaladas.

> Exemplo: motor de 100cv, `PecaPotencia` de 20% → +20cv.

## RN-06 — Regra da turbina

```
pressaoEfetiva = pressaoDaTurbina − pressaoBaseDoMotor
ganho          = potenciaBase × pressaoEfetiva
```

A mesma fórmula serve para motor aspirado e turbo, sem `if`: o aspirado tem pressão base 0.

| Motor            | Potência base | Pressão base | Turbina |          Ganho          |    Final    |
| ---------------- | :-----------: | :----------: | :-----: | :---------------------: | :---------: |
| Fusca (aspirado) |     54cv      |     0kg      |   2kg   |     54 × 2 = 108cv      |  **162cv**  |
| Up TSI (turbo)   |     105cv     |    0.8kg     |   2kg   |    105 × 1.2 = 126cv    |  **231cv**  |
| Marea (turbo)    |     182cv     |    1.2kg     |   1kg   | 182 × (- 0.2) = -36.4cv | **145.6cv** |

## RN-07 — Instalação e recálculo

Ao instalar uma peça num slot:

1. A peça substitui a anterior naquele slot.
2. `potenciaAtual` e `limiteAtual` voltam para os valores base.
3. O motor percorre **todos os 12 slots** e soma o efeito de cada peça.

Consequência: **trocar uma peça nunca acumula** o ganho da anterior.

> Exemplo: motor aspirado de 100cv. Turbina de 2kg → 300cv. Trocando pela de 3kg → **400cv** (não 600).

## RN-08 — Quebra do motor

Depois de recalcular, se `potenciaAtual > limiteAtual`, o motor **quebra**: é lançado `MotorQuebradoError`, que carrega o motor e a potência no momento da quebra.

- A regra é **determinística**: ultrapassou o limite, quebra.
- Potência **igual** ao limite não quebra.
- Peças de limite e mistas aumentam o limite e permitem ir mais longe.

> Exemplo: motor de 100cv, limite 120. Peça de potência de 50% → 150cv → quebra. Peça de 10% → 110cv → não quebra.

## RN-09 — Seleção e isolamento do motor

- Os motores pré-definidos **nunca são alterados**.
- Ao selecionar um motor, o sistema trabalha numa **cópia** (`clonar()`), com um `Map` de peças novo.
- Tunar a cópia não afeta o original. Selecionar o mesmo motor duas vezes começa do zero nas duas.
- As peças são imutáveis (campos `readonly`), então copiar o `Map` é suficiente.

## RN-10 — Validação das escolhas

- Escolher um motor fora da lista lança `EscolhaInvalidaError`, que guarda o valor digitado.
- A tela captura o erro, mostra a mensagem e **pergunta de novo**, sem encerrar o programa.
- Entrada que não é número é rejeitada pela própria biblioteca de leitura (`questionInt`).

## RN-11 — Finalização do tuning

- Ao finalizar, o motor customizado é **salvo** na lista de motores customizados.
- O motor selecionado é liberado, e o usuário pode escolher outro motor em seguida.
- Finalizar sem motor selecionado é um erro.

## RN-12 — O que é exibido

**Escolha do motor:** nome, cilindros, potência base, limite base e pressão base.

**Escolha das peças:** nome do motor, potência base e atual, limite base e atual, e a lista dos 12 slots separada em peças originais, não instaladas (se houver) e customizadas.

**Menu de peças de um slot:** modelo, descrição e detalhes técnicos de cada opção (`getDetalhesTecnicos()`, ex.: "+20% de potência", "2kg de pressão").

**Resumo:** mostra o modelo da peça instalada ("Original", "Não instalada" ou o modelo customizado).

---
