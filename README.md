# 🚗 TypeScript Tuning

> Simulador de tuning de motores automotivos, feito em TypeScript puro e executado via terminal.

## 📋 Sobre o projeto

**TypeScript Tuning** é uma aplicação de linha de comando onde o usuário escolhe um motor entre opções pré-definidas e realiza modificações de performance nele, trocando peças em 12 slots diferentes (turbina, pistão, cabeçote, etc.). Cada motor já nasce com peças originais instaladas em todos os slots aplicáveis; o usuário vai trocando por peças customizadas do catálogo até chegar num resultado final — correndo o risco de quebrar o motor se exagerar sem o devido reforço estrutural.

O projeto foi desenvolvido como trabalho acadêmico, com foco em aplicar POO (herança, polimorfismo, classes abstratas, interfaces), tratamento de exceções e organização de código em TypeScript puro, sem frameworks externos.

**Estado atual:** toda a lógica de motores e peças (`model/`) está pronta e testada. Os menus de terminal (`view/`) e a orquestração do fluxo (`controller/`) ainda não foram implementados — veja [Próximos passos](#-próximos-passos).

## 🏎️ Motores pré-definidos

Cada motor é criado com 5 especificações de fábrica, fixas e nunca alteradas pelo tuning:

| Campo          | O que representa                                                    |
| -------------- | ------------------------------------------------------------------- |
| `nome`         | Nome do motor                                                       |
| `cilindros`    | Número de cilindros                                                 |
| `potenciaBase` | Potência de fábrica, em cv                                          |
| `limiteBase`   | Limite seguro de potência sem reforço estrutural                    |
| `pressaoBase`  | Pressão de turbo de fábrica, em kg — **`0` para motores aspirados** |

| Motor                             | Cilindros | Potência Base | Limite Base | Pressão Turbo Base |
| --------------------------------- | :-------: | :-----------: | :---------: | :----------------: |
| **EA211** _(Up TSI)_              |     3     |     105cv     |    150cv    |       0.8kg        |
| **Boxer 1600** _(Fusca)_          |     4     |     54cv      |    260cv    |  0kg _(aspirado)_  |
| **K20Z3** _(Civic Si 2008)_       |     4     |     192cv     |    400cv    |  0kg _(aspirado)_  |
| **Fivetech Turbo** _(Marea)_      |     5     |     182cv     |    350cv    |       1.2kg        |
| **Powertech 4.1** _(Omega)_       |     6     |     168cv     |    400cv    |  0kg _(aspirado)_  |
| **MWM Sprint 6.07TCA** _(F-250)_  |     6     |     180cv     |    250cv    |       0.8kg        |
| **MWM Sprint 4.07TCA** _(S-10)_   |     4     |     132cv     |    200cv    |       1.1kg        |
| **Ford 302 Windsor** _(Maverick)_ |     8     |     135cv     |    450cv    |  0kg _(aspirado)_  |
| **2JZ-GTE** _(Supra MK4)_         |     6     |     276cv     |    450cv    |       0.7kg        |
| **RB26DETT** _(Skyline R-34)_     |     6     |     286cv     |    430cv    |       0.7kg        |

> Valores exatos e novos motores são adicionados em `motoresData.ts`.

## 🔧 Categorias de peças

Toda peça pertence a uma de três categorias, cada uma com sua própria subclasse de `Peca`:

| Categoria    | Classe         | Efeito                                          |
| ------------ | -------------- | ----------------------------------------------- |
| **Potência** | `PecaPotencia` | Só aumenta `potenciaAtual`                      |
| **Limite**   | `PecaLimite`   | Só aumenta `limiteAtual` (resistência a quebra) |
| **Mista**    | `PecaMista`    | Aumenta os dois ao mesmo tempo                  |

Essas três calculam o ganho como **percentual sobre o valor de fábrica** (não sobre o valor atual — isso mantém o resultado previsível, independente da ordem em que as peças são instaladas):

```
ganho = valorDeFabrica × (percentual / 100)
```

**Exceção: a Turbina.** Ela tem uma fórmula própria (explicada abaixo) por trabalhar com pressão, não percentual — por isso existe uma classe própria, `PecaTurbina`, em vez de reaproveitar `PecaPotencia`.

## 🎛️ Slots disponíveis

Todo motor tem exatamente estes 12 slots (definidos em `TipoPeca.ts`):

Turbina · Intake · Pistão · Biela · Cabeçote · Comando · Radiador · Radiador de Óleo · Intercooler · Coletor de Escape · Coletor de Admissão · **Alimentação**

> O slot antes chamado "FuelTech/FT" foi renomeado para **Alimentação**, pra cobrir tanto módulos de injeção eletrônica programável quanto carburadores — não só uma marca específica.

## 🏭 Peças originais e peças não instaladas

Todo motor nasce com os 12 slots preenchidos — mas nem todo motor tem, de fábrica, todas as peças possíveis:

- **`PecaOriginal`** — a peça de fábrica de um slot que o motor realmente tem. Não altera potência nem limite (o valor dela já está embutido no `potenciaBase`/`limiteBase`).
- **`PecaNaoInstalada`** — usada nos slots que **não existem de fábrica** naquele motor específico. Por exemplo, o **Fusca** (aspirado) não vem de fábrica com Turbina, Intercooler, Radiador nem Intake de performance — esses 4 slots aparecem como **"Não Instalada"** em vez de "Original", até o usuário instalar algo ali.

A função `criarPecasOriginais()` aceita uma lista opcional de slots "não aplicáveis" por motor, então cada motor pré-definido decide quais dos 12 slots vêm vazios.

## 📦 Catálogo de peças (`pecasData.ts`)

O catálogo é um `Map<TipoPeca, Peca[]>` — para cada slot, uma lista de peças customizadas disponíveis pra escolha (ex: o slot Turbina pode ter várias opções, de turbinas menores a maiores). Cada peça no catálogo guarda:

- **`nome`** — descrição usada na hora de **escolher** a peça no menu (ex: "Turbina de alto fluxo, indicada pra média/alta potência")
- **`modelo`** — identificador curto, usado no **resumo final** (ex: "HX35", "Garrett GT2860")
- **`descricao`** — texto de apoio pra ajudar na escolha

Esse catálogo é separado das peças originais/não instaladas — é só de onde vêm as opções que o usuário pode instalar.

## ⚡ Lógica de potência da Turbina

A turbina não usa percentual — ela compara a pressão da peça instalada com a pressão de fábrica do motor:

```
pressãoEfetiva = pressãoDaTurbinaInstalada − pressaoBase (do motor)
ganho = potenciaBase × pressãoEfetiva
```

Isso faz o mesmo turbo dar ganhos bem diferentes dependendo do motor: num motor **aspirado** (`pressaoBase = 0`), toda a pressão da turbina conta como ganho. Num motor que **já é turbo de fábrica**, só a diferença de pressão em relação ao turbo original conta — instalar uma turbina "menor" que a de fábrica inclusive **reduz** a potência.

## 🔁 Instalar peça e recalcular

- **`instalarPeca(tipo, peca)`** — substitui a peça daquele slot e aciona o recálculo
- **`recalcular()`** — reseta `potenciaAtual`/`limiteAtual` para os valores de fábrica e percorre **todas** as 12 peças do motor, chamando `aplicarEfeito()` em cada uma (polimorfismo: cada peça sabe aplicar seu próprio efeito, sem nenhum `if`/`switch` checando o tipo)

Recalcular do zero a cada troca evita contar duas vezes o ganho de uma peça substituída.

## 💥 Quebra de motor

Depois de cada `instalarPeca()`, o motor verifica: se `potenciaAtual` ultrapassar `limiteAtual`, o motor quebra — de forma **determinística** (sem sorteio: ultrapassou, quebrou). Isso lança uma exceção personalizada:

```typescript
MotorQuebradoError; // extends Error
```

Carrega `message`, e também `motor` e `potenciaFinal` como propriedades públicas, pra quem capturar o erro (`catch`) conseguir reagir com informação completa, sem precisar reconsultar o motor.

## 🖥️ Telas planejadas (ainda não implementadas)

### Escolha do motor

Deve exibir, por motor: **nome, cilindros, potência base, limite base, pressão base**.

### Tuning do motor (escolha de peças)

Deve exibir: **nome, potência base, potência atual, limite base, limite atual**, e a lista das 12 peças, cada uma indicando se é **original**, **não instalada** ou **customizada**.

## 🧱 Estrutura do projeto

```
typescript-tuning/
├── src/
│   ├── model/
│   │   ├── TipoPeca.ts          # os 12 slots (enum)
│   │   ├── Peca.ts              # classe abstrata base
│   │   ├── PecaOriginal.ts      # peça de fábrica
│   │   ├── PecaNaoInstalada.ts  # slot inexistente naquele motor
│   │   ├── PecaPotencia.ts      # percentual sobre potenciaBase
│   │   ├── PecaLimite.ts        # percentual sobre limiteBase
│   │   ├── PecaMista.ts         # percentual nos dois
│   │   ├── PecaTurbina.ts       # fórmula própria, baseada em pressão
│   │   ├── Motor.ts
│   │   ├── motoresData.ts       # motores pré-definidos
│   │   ├── pecasData.ts         # catálogo de peças por slot
│   │   └── exceptions/
│   │       └── MotorQuebradoError.ts
│   ├── view/                    # 🚧 ainda não implementado
│   ├── controller/               # 🚧 ainda não implementado
│   └── index.ts                  # 🚧 ainda não implementado
├── package.json
├── tsconfig.json
└── README.md
```

## 🎓 Requisitos acadêmicos — onde cada um é aplicado

| Requisito                                    | Onde aparece                                                                                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fundamentos de POO                           | `Motor`, `Peca`; encapsulamento com `private`/`protected`/`readonly`                                                                                   |
| Divisão de responsabilidades                 | `model` pronto; `view`/`controller` planejados na mesma lógica                                                                                         |
| Tratamento de exceções                       | `MotorQuebradoError`, lançada em `instalarPeca()`                                                                                                      |
| Agrupamento de objetos e estruturas de dados | `Map<TipoPeca, Peca>` no motor; `Map<TipoPeca, Peca[]>` no catálogo                                                                                    |
| Herança, polimorfismo, classes abstratas     | `Peca` (abstrata) → `PecaOriginal`/`PecaNaoInstalada`/`PecaPotencia`/`PecaLimite`/`PecaMista`/`PecaTurbina`; `aplicarEfeito()` sobrescrito em cada uma |
| Interfaces                                   | 🚧 planejado, ainda não implementado                                                                                                                   |
| Injeção de dependência                       | `Motor` recebe o `Map` de peças pronto pelo construtor, em vez de criar sozinho                                                                        |

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/) 22.6+ (recomendado 24+)
- npm

## 🚀 Como executar

Este projeto usa `enum`, então precisa do **`tsx`** (o `node` nativo não roda enum sozinho):

```bash
npm install --save-dev tsx
npx tsx src/index.ts
```

Ou, instalando global (não precisa de `npx`):

```bash
npm install -g tsx
tsx src/index.ts
```

## 🔜 Próximos passos

- [ ] `EscolhaInvalidaError` (validação de entrada nos menus)
- [ ] Interface (`Identificavel`, implementada por `Motor` e `Peca`)
- [ ] Sobrecarga de métodos
- [ ] Testes automatizados (`node:test`)
- [ ] `view/` — menus de terminal
- [ ] `controller/` — orquestração do fluxo completo
