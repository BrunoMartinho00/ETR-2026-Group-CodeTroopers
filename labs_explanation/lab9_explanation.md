# Explicacao do Lab 9 - Test Cases, Test Design e BDD Scenarios

## O que o Lab 9 pedia

O Lab 9 introduzia a parte de testes.

O objetivo era transformar requisitos, acceptance criteria e use cases em test cases documentados e cenarios BDD.

Os entregaveis obrigatorios eram:

- `docs/test_cases.md`
- `bdd/features/lab9.feature`
- `docs/traceability_req_tc.md`

O lab tambem pedia:

- pelo menos 8 test cases
- test cases com ID, requisitos relacionados, preconditions, test data, steps e expected results
- pelo menos 1 happy path
- pelo menos 1 alternative flow
- pelo menos 2 negative/error tests
- pelo menos 1 boundary test
- 1 feature file em Gherkin
- pelo menos 3 scenarios
- rastreabilidade entre requisitos e test cases

## Relacao com a Lesson 9

A Lesson 9 explica que testing serve para reduzir risco e criar evidencia.

Os testes devem validar:

- requisitos
- acceptance criteria
- use case flows
- excecoes
- limites e casos negativos

Um bom test case deve ser:

- repetivel
- claro
- rastreavel
- verificavel

O Lab 9 aplica estes principios ao projeto AMS Intake & Data Quality.

## Test Cases

Foi criado:

```text
docs/test_cases.md
```

Este ficheiro contem 20 test cases.

Isto ultrapassa o minimo de 8 pedido pelo lab.

Cada test case segue uma estrutura com:

- ID `TC-###`
- titulo
- tipo de teste
- requisitos relacionados
- preconditions
- test data
- steps
- expected results

## Requisitos selecionados

O Lab 9 pedia selecionar 8 requisitos:

```text
4 FR + 2 NFR + 2 outros
```

Foram selecionados:

- `REQ-001`
- `REQ-002`
- `REQ-003`
- `REQ-005`
- `REQ-007`
- `REQ-008`
- `NFR-001`
- `NFR-002`

Esta selecao cobre requisitos funcionais e nao funcionais ligados a qualidade, consistencia, estado e auditoria.

## Cobertura dos test cases

O conjunto de testes cobre varios tipos de fluxo.

### Happy path

Exemplos:

- `TC-002` - Validacao condicional de DR ativa
- `TC-010` - Evidencia exatamente no limite de 365 dias
- `TC-016` - Retoma de rascunho e submissao final

### Alternative flow

Exemplos:

- `TC-006` - Guardar rascunho com dados em falta
- `TC-011` - Sanitizacao de inputs com sucesso
- `TC-016` - Retomar rascunho e concluir submissao
- `TC-019` - Recuperacao apos erro de hostname duplicado

### Negative/error tests

Exemplos:

- `TC-003` - Inconsistencia logica de DR
- `TC-005` - Hostname duplicado
- `TC-009` - E-mail de owner invalido
- `TC-014` - Campo obrigatorio em falta
- `TC-015` - Dados inconsistentes via API

### Boundary tests

Exemplos:

- `TC-001` - Campo preenchido apenas com espacos invisiveis
- `TC-004` - Evidencia com 366 dias
- `TC-010` - Evidencia exatamente com 365 dias

Isto mostra que a equipa nao testou apenas o caminho feliz.

## Variant-driven testing

A Variante 4 influencia varios test cases.

Exemplos:

- `TC-003` testa inconsistencia entre DR e data de teste
- `TC-004` testa evidencia expirada
- `TC-005` testa duplicados
- `TC-007` testa performance do motor de regras
- `TC-015` testa tentativa de contornar as regras de integridade

Estes testes validam o papel do sistema como gatekeeper de qualidade dos dados.

## BDD Feature

Foi criado:

```text
bdd/features/lab9.feature
```

Este ficheiro contem:

- 1 Feature
- 4 Scenarios
- Given/When/Then

O objetivo da feature e validar o gatekeeper de qualidade e consistencia de dados.

## Scenarios criados

Foram criados cenarios para:

- prevenir informacoes contraditorias de Disaster Recovery
- permitir progresso parcial atraves de Draft
- detetar ativo duplicado
- happy path de submissao com dados completos e consistentes

Isto cumpre o minimo de:

- 1 happy path
- 1 negative/error scenario
- 1 alternative flow scenario

## Gherkin

Os cenarios usam formato Gherkin:

```text
Feature
Scenario
Given
When
Then
And
```

Isto prepara o projeto para BDD nos labs seguintes.

Mesmo que neste lab ainda nao haja automacao dos cenarios, a estrutura ja esta pronta para ser transformada em testes executaveis.

## Traceability REQ-TC

Foi criado:

```text
docs/traceability_req_tc.md
```

Este ficheiro inclui:

- selected requirements
- mapping entre requisitos e test cases
- cobertura por use cases
- observacoes de cobertura

## Matriz de rastreabilidade

A matriz liga cada requisito selecionado a um ou mais test cases.

Exemplos:

- `REQ-001` -> `TC-001`, `TC-011`, `TC-014`
- `REQ-003` -> `TC-003`, `TC-015`, `TC-018`
- `REQ-005` -> `TC-004`, `TC-010`
- `REQ-007` -> `TC-005`, `TC-019`
- `NFR-002` -> `TC-007`, `TC-013`

Isto permite ver rapidamente que requisitos estao cobertos por testes.

## Cobertura por Use Case

O documento tambem liga os testes aos use cases.

Exemplos:

- `UC-01` e coberto por testes de submissao, validacao e auditoria
- `UC-02` e coberto por `TC-006`
- `UC-03` e coberto por `TC-004`
- `UC-04` e coberto por testes de consistencia e performance
- `UC-06` e coberto por testes ligados a auditoria

Esta ligacao mostra como os test cases nasceram dos fluxos definidos nos labs anteriores.

## Porque estes artefactos foram feitos

Cada artefacto tem uma funcao:

| Artefacto | Funcao |
|---|---|
| `docs/test_cases.md` | documentar testes estruturados e repetiveis |
| `bdd/features/lab9.feature` | representar cenarios BDD em Gherkin |
| `docs/traceability_req_tc.md` | ligar requisitos aos test cases |

A cadeia criada e:

```text
Requirements -> Acceptance Criteria -> Test Cases -> BDD Scenarios
```

Isto prepara os labs seguintes, onde alguns testes passam de documentacao para automacao.

## Como explicar o Lab

Neste lab, pegamos nos requisitos e acceptance criteria e desenhamos test cases.

Selecionamos 8 requisitos principais, incluindo funcionais e nao funcionais.

Depois criamos test cases para cobrir caminho feliz, fluxos alternativos, erros e boundaries.

Tambem criamos uma feature Gherkin com cenarios em Given/When/Then.

Por fim, fizemos uma matriz de rastreabilidade para mostrar que cada requisito selecionado tem pelo menos um test case associado.

## Resultado final

O Lab 9 ficou com:

- 20 test cases
- mais de 8 requisitos/testes documentados
- happy path
- alternative flows
- negative/error tests
- boundary tests
- 1 feature Gherkin
- 4 scenarios
- matriz REQ -> TC
- cobertura por use cases
- foco claro na Variante 4

## Limitacoes

O Lab 9 e principalmente documental.

Os test cases e cenarios BDD ainda nao precisam de estar automatizados.

A automacao de testes e tratada nos labs seguintes.

Alguns test cases mencionam API/backend como comportamento esperado futuro. Nesta fase, isso serve como desenho de teste e evidencia esperada, nao como prova de implementacao completa.
