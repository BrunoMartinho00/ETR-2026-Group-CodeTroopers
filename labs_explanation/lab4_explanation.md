# Explicacao do Lab 4 - Objectives, CSFs, REM v1 e Pre/Post Conditions

## O que o Lab 4 pedia

O Lab 4 pedia ligar os requisitos a objetivos de negocio e fatores criticos de sucesso.

O objetivo era mostrar que os requisitos nao existem isoladamente. Cada requisito deve ajudar a cumprir um objetivo e apoiar um fator critico de sucesso.

Os entregaveis obrigatorios eram:

- `docs/objectives_fcs.md`
- `docs/rem_v1.md`
- `docs/REM_v1.xlsx` como evidencia recomendada

O lab tambem pedia:

- 3 objetivos
- 3 CSFs/FCSs ligados aos objetivos
- requisitos mapeados para cada CSF/FCS
- REM v1 com pelo menos 8 requisitos completos
- precondicoes e pos-condicoes para pelo menos 3 requisitos funcionais
- alinhamento visivel com a variante

## Relacao com a Lesson 4

A Lesson 4 trabalha a representacao Agile de requisitos, como:

- Epics
- Features
- User Stories
- Tasks
- Acceptance Criteria

Mesmo assim, o Lab 4 focou principalmente a parte de estruturacao formal:

```text
Objectives -> CSFs/FCSs -> Requirements -> REM
```

Esta ligacao prepara o projeto para backlog, acceptance criteria e testes nos labs seguintes.

## Variante usada

A variante do grupo e:

```text
Variant 4 - Qualidade e Consistencia de Dados
```

A persona principal e:

```text
Data Steward / Gestor de Qualidade
```

O foco principal da variante e:

- validacao cruzada
- integridade de dados
- prevencao de obsolescencia
- prevencao de duplicacao
- deteccao de estados inconsistentes

Por isso, os objetivos, CSFs/FCSs e REM entries foram escritos para reforcar qualidade e consistencia dos dados no processo de Intake.

## Objectives and CSFs/FCSs

Foi criado:

```text
docs/objectives_fcs.md
```

Este ficheiro contem:

- informacao da variante
- 3 objetivos
- 3 fatores criticos de sucesso
- ligacao entre FCS/CSF e requisitos

## Objetivos definidos

Foram definidos 3 objetivos:

### OBJ-1

Garantir a integridade, unicidade e consistencia total dos dados.

Este objetivo e diretamente ligado a variante, porque procura impedir dados contraditorios, incompletos, obsoletos ou duplicados.

### OBJ-2

Assegurar a rastreabilidade e auditabilidade do processo.

Este objetivo garante que alteracoes a campos criticos ficam registadas e que responsabilidades operacionais, como owners de integracoes, ficam identificadas.

### OBJ-3

Otimizar a eficiencia operacional e resiliencia do sistema.

Este objetivo liga a qualidade de dados ao tempo de resposta e a disponibilidade do sistema. A equipa definiu sinais de sucesso como validacoes em menos de 500ms e uptime de 99.9%.

## CSFs/FCSs definidos

Foram definidos 3 FCSs:

### FCS-1

Dados de inventario sao consistentes, unicos e validados antes do estado operacional.

Este FCS suporta o `OBJ-1` e e o mais importante para a Variante 4.

### FCS-2

Alteracoes a dados criticos e responsabilidades sao totalmente rastreaveis.

Este FCS suporta o `OBJ-2` e liga requisitos de owner, auditoria e retencao de logs.

### FCS-3

O sistema fornece feedback imediato, e fiavel e permite fluxos de trabalho flexiveis.

Este FCS suporta o `OBJ-3` e liga requisitos de draft, performance, disponibilidade e feedback visual.

## Mapeamento para requisitos

Cada FCS lista os requisitos que o suportam.

Isto permite justificar porque cada requisito existe.

Exemplo de cadeia:

```text
OBJ-1 -> FCS-1 -> REQ-001, REQ-002, REQ-003, REQ-005, REQ-009
```

O enunciado original indicava 3 a 5 requisitos por CSF, mas o professor permitiu que fossem listados mais requisitos quando a ligacao fizesse sentido.

Por isso, o `FCS-1` inclui mais requisitos, porque a qualidade e consistencia de dados e o nucleo da variante.

## REM v1

Foi criado:

```text
docs/rem_v1.md
```

Este ficheiro apresenta os requisitos num formato REM legivel em Markdown.

Tambem existe:

```text
docs/REM_v1.xlsx
```

Este ficheiro serve como evidencia do template Excel preenchido.

## Estrutura de uma entrada REM

Cada entrada REM inclui campos como:

- ID e titulo
- requisitante
- descricao
- objetivo e FCS
- tipo
- prioridade
- impacto da variante
- criterios de aceitacao
- metodo de validacao
- precondicoes
- pos-condicoes

Esta estrutura e importante porque transforma requisitos em artefactos prontos para validacao e testes.

## REM entries criadas

O `rem_v1.md` contem 15 entradas.

Isto ultrapassa o minimo de 8 requisitos completos pedido pelo lab.

As entradas incluem:

- requisitos funcionais `REQ-001` a `REQ-009`
- requisitos nao funcionais `NFR-001` a `NFR-006`

## Requisitos funcionais no REM

Os requisitos funcionais documentam comportamentos como:

- validar campos obrigatorios
- exigir data de DR quando DR esta ativo
- detetar inconsistencia de DR
- validar caducidade de evidencias
- prevenir duplicados
- gerir estados de rascunho e pronto
- validar URL de observabilidade
- exigir owner em integracoes
- transitar para `Ready to Proceed`

Estes requisitos estao diretamente ligados ao processo de Intake & Discovery.

## NFRs no REM

Os NFRs documentam propriedades de qualidade:

- log de auditoria
- performance de validacao
- disponibilidade
- qualidade de dados garantida
- tempo de resposta de mensagens de erro
- retencao de logs

Estes NFRs ajudam a garantir que o sistema nao apenas funciona, mas funciona com qualidade, rastreabilidade e desempenho aceitavel.

## Criterios de aceitacao

Cada entrada REM tem criterios de aceitacao.

Os criterios de aceitacao servem para definir quando um requisito pode ser considerado aceite.

Exemplos:

- submissao bloqueada se campos obrigatorios estiverem vazios
- estado alterado para inconsistente quando existe contradicao de DR
- evidencias com mais de 12 meses rejeitadas
- validacoes cruzadas cumprem tempo limite de 500ms
- logs com menos de 12 meses continuam disponiveis

Os NFRs tambem receberam pelo menos dois criterios de aceitacao, para ficarem mais verificaveis.

## Precondicoes e pos-condicoes

O lab pedia precondicoes e pos-condicoes para pelo menos 3 requisitos funcionais.

O `rem_v1.md` inclui isso em varios requisitos.

Exemplos:

- `REQ-001`
- `REQ-002`
- `REQ-003`
- `REQ-004`
- `REQ-005`
- `REQ-006`

As precondicoes dizem o que tem de ser verdade antes da execucao do requisito.

As pos-condicoes dizem o que deve ser verdade depois.

Isto ajuda a desenhar testes, porque clarifica:

- estado inicial
- acao executada
- resultado esperado

## Alinhamento com a variante

O Lab 4 exigia alinhamento com a variante em dois pontos:

1. `docs/objectives_fcs.md`
2. `docs/rem_v1.md`

No ficheiro de objetivos, pelo menos dois objetivos/FCSs refletem a variante:

- `OBJ-1`
- `OBJ-3`
- `FCS-1`
- `FCS-3`

No REM, varias entradas estao marcadas com impacto da variante.

Exemplos:

- `REQ-001`
- `REQ-002`
- `REQ-003`
- `REQ-004`
- `REQ-005`
- `REQ-006`
- `REQ-009`
- `NFR-002`
- `NFR-004`
- `NFR-005`

Isto cumpre o minimo de 3 REM entries com impacto da variante.

## Porque estes artefactos foram feitos

Cada artefacto tem uma funcao:

| Artefacto | Funcao |
|---|---|
| `docs/objectives_fcs.md` | ligar objetivos, fatores criticos de sucesso e requisitos |
| `docs/rem_v1.md` | documentar requisitos num formato REM completo e verificavel |
| `docs/REM_v1.xlsx` | evidenciar o uso do template REM em Excel |

A cadeia de rastreabilidade fica:

```text
Objective -> CSF/FCS -> Requirement -> Acceptance Criteria -> Validation Method
```

Esta cadeia e essencial para demonstrar que os requisitos estao justificados e podem ser validados.

## Como explicar o Lab

Neste lab, pegamos nos requisitos ja estruturados e ligamo-los aos objetivos do projeto.

Primeiro, definimos tres objetivos de negocio: qualidade dos dados, rastreabilidade e eficiencia operacional.

Depois, criamos tres fatores criticos de sucesso que explicam o que tem de correr bem para esses objetivos serem atingidos.

A seguir, mapeamos requisitos para cada FCS, mostrando que cada requisito tem uma razao clara para existir.

Por fim, documentamos os requisitos em formato REM v1, com criterios de aceitacao, metodos de validacao, precondicoes e pos-condicoes.

## Resultado final

O Lab 4 ficou com:

- 3 objetivos
- 3 CSFs/FCSs
- variante documentada
- requisitos mapeados para CSFs/FCSs
- 15 entradas REM
- mais de 8 requisitos completos
- criterios de aceitacao por entrada
- metodos de validacao
- precondicoes e pos-condicoes em varios FRs
- mais de 3 entries com impacto da variante
- evidencia Excel em `docs/REM_v1.xlsx`

## Limitacoes

O documento usa a designacao portuguesa `FCS` em vez de `CSF`.

Isto representa o mesmo conceito:

```text
Critical Success Factor = Fator Critico de Sucesso
```

Tambem existem mais de 3 a 5 requisitos ligados ao primeiro FCS. Isto foi mantido porque o professor permitiu mais requisitos por CSF quando a ligacao fosse justificavel.

O foco deste lab ainda e documental. A execucao completa dos testes e a rastreabilidade ate evidencias sao desenvolvidas nos labs seguintes.
