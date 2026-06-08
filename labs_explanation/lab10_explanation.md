# Explicacao do Lab 10 - Test Planning, Requirements Validation, AC e DoD

## O que o Lab 10 pedia

O Lab 10 continuava a parte de testing iniciada no Lab 9.

O objetivo principal era deixar de ter apenas test cases isolados e passar a ter uma estrategia de teste organizada.

Os entregaveis obrigatorios eram:

- `docs/test_plan.md`
- `docs/traceability_req_ac_tc.md`
- `docs/ac_dod_updates.md`

O lab tambem pedia:

- scope do slice e out-of-scope
- abordagem static + dynamic testing
- niveis de teste planeados: unit, integration, system e acceptance
- plano TDD com pelo menos 2 candidatos
- plano BDD
- coverage goals
- abordagem para validar NFRs
- metodo de registo de evidencia
- matriz REQ -> AC -> TC/Scenario
- pelo menos 8 requisitos na matriz
- pelo menos 2 NFRs
- pelo menos 2 requisitos influenciados pela variant
- pelo menos 3 melhorias de Acceptance Criteria
- pelo menos 2 updates de Definition of Done

## Relacao com a Lesson 10

A Lesson 10 explica que testing nao e apenas executar testes.

Antes de executar, e necessario planear:

- o que vai ser testado
- como vai ser testado
- que niveis de teste vao existir
- onde se aplica TDD
- onde se aplica BDD
- como se guarda evidencia
- como se prova que os requisitos foram validados

Tambem reforca que Acceptance Criteria e Definition of Done devem ser melhorados quando os testes mostram ambiguidades ou falta de detalhe.

O Lab 10 aplica estes conceitos ao slice AMS Intake & Discovery.

## Test Plan

Foi criado:

```text
docs/test_plan.md
```

Este ficheiro define a estrategia geral de testes para o projeto.

O scope escolhido foi:

```text
Intake & Discovery (AMS)
```

Este e o mesmo slice usado nos labs anteriores.

O out-of-scope tambem foi definido para manter o trabalho realista:

- integracoes reais com sistemas externos de inventario
- configuracao de infraestrutura de producao
- autenticacao SSO

Isto e importante porque o lab pede um plano simples e realista, nao uma estrategia completa para toda a plataforma AMS.

## Static Testing

No plano foi incluida uma parte de static testing.

Static testing significa validar artefactos sem executar codigo.

Neste projeto, a revisao estatica foca-se em:

- requisitos funcionais
- requisitos nao funcionais
- acceptance criteria
- test cases

O objetivo e encontrar problemas cedo, como:

- requisitos ambiguos
- AC dificeis de testar
- falta de casos negativos
- falhas na cobertura da Variante 4

Isto esta alinhado com a Lesson 10, que diz que static testing ajuda a detetar problemas antes da implementacao.

## Dynamic Testing

Tambem foi definido o plano de dynamic testing.

Dynamic testing e a parte em que o sistema, ou partes dele, sao executados.

Foram definidos quatro niveis:

| Nivel | Funcao |
|---|---|
| Unit | testar regras pequenas e deterministicas |
| Integration | testar interacoes entre componentes ou APIs |
| System | testar o fluxo completo do slice |
| Acceptance / BDD | validar comportamento contra AC e cenarios |

Esta divisao mostra que os testes nao ficam todos no mesmo nivel.

Cada nivel tem uma responsabilidade diferente.

## Unit Tests

Os unit tests foram planeados para regras pequenas e deterministicas.

Exemplos:

- validacao de campos com `trim()`
- calculo de caducidade de evidencia em 365 dias
- regras logicas de Disaster Recovery

Estas regras sao boas candidatas porque podem ser testadas com inputs e outputs claros.

## Integration Tests

Os integration tests foram planeados para comportamentos que dependem de interacao entre partes do sistema.

Exemplo:

- verificacao de unicidade de hostname atraves de API

Este tipo de teste confirma se o frontend/formulario e a API respondem de forma consistente.

## System Tests

Os system tests validam o fluxo completo.

Exemplo:

```text
entrada de dados -> validacao -> submissao -> estado Ready
```

Isto ajuda a confirmar que o slice funciona como um processo completo, e nao apenas como regras isoladas.

## Acceptance Tests e BDD

Os acceptance tests estao ligados aos cenarios BDD.

O plano aponta para:

```text
bdd/features/lab9.feature
```

Os cenarios principais sao:

- prevenir informacoes contraditorias de Disaster Recovery
- permitir progresso parcial atraves do estado Draft
- detetar hostname duplicado
- happy path de submissao com dados completos e consistentes

Estes cenarios usam linguagem proxima do negocio e ajudam a validar os acceptance criteria.

## TDD Plan

O Lab 10 pedia pelo menos 2 candidatos para TDD.

Foram selecionados:

- `REQ-003` - detecao de inconsistencia de Disaster Recovery
- `REQ-005` - validacao de caducidade de evidencias

Estes dois requisitos sao adequados para TDD porque:

- tem regras claras
- tem resultados esperados objetivos
- permitem testar casos positivos, negativos e boundary
- estao ligados a qualidade e consistencia de dados

No TDD, a equipa escreveria primeiro o teste, depois a regra minima para passar no teste e depois faria refatoracao.

## BDD Plan

O BDD plan mostra que comportamentos devem ser representados em cenarios Given/When/Then.

Foi usada a feature:

```text
Gatekeeper de Qualidade e Consistencia de Dados (Variante 4)
```

Esta feature e coerente com a variant do grupo, porque a Variante 4 foca-se em qualidade, consistencia e validacao dos dados.

Os cenarios BDD estao ligados a:

- `REQ-003`
- `REQ-007`
- `REQ-008`
- `REQ-009`

Isto mostra que BDD nao foi usado de forma generica, mas sim para validar comportamentos importantes do slice.

## Coverage Goals

O test plan tambem define coverage goals.

Foram cobertos:

- happy path
- alternative flows
- negative/error tests
- boundary tests

Exemplos:

- happy path: submissao de um ativo com dados validos
- alternative flow: guardar rascunho com dados incompletos
- negative test: tentar submeter DR contraditorio ou hostname duplicado
- boundary test: evidencia com 365 dias e com 366 dias

Isto evita que os testes validem apenas o caminho ideal.

## NFR Validation

O Lab 10 pedia que a validacao de NFRs fosse incluida.

Foram incluidos:

- `NFR-001` - Audit Log
- `NFR-002` - Performance

Para `NFR-001`, a validacao passa por confirmar que alteracoes a campos criticos geram registos de auditoria.

Para `NFR-002`, a validacao passa por medir se o motor de regras responde abaixo do limite definido.

Isto mostra que requisitos nao funcionais tambem precisam de evidencia, nao apenas os requisitos funcionais.

## Evidence Recording

O plano define onde a evidencia fica registada.

Os caminhos principais sao:

- `docs/test_cases.md`
- `bdd/features/lab9.feature`
- `docs/test_execution.md`
- `docs/unit_test_report.md`
- `docs/bdd_report.md`

Isto e importante porque o lab pede que a equipa explique onde os resultados e evidencias vivem.

A rastreabilidade tambem e mantida atraves de:

```text
docs/traceability_req_ac_tc.md
```

## Matriz REQ -> AC -> TC/Scenario

Foi criado:

```text
docs/traceability_req_ac_tc.md
```

Este ficheiro liga:

```text
Requirement -> Acceptance Criteria -> Test Case / BDD Scenario
```

Esta cadeia e essencial porque mostra como cada requisito e validado.

A matriz inclui:

- `REQ-001`
- `REQ-002`
- `REQ-003`
- `REQ-005`
- `REQ-006`
- `REQ-007`
- `REQ-008`
- `REQ-009`
- `NFR-001`
- `NFR-002`

Isto ultrapassa o minimo de 8 requisitos pedido no enunciado.

## Exemplos de rastreabilidade

Exemplos da matriz:

- `REQ-001` -> AC de campos obrigatorios -> `TC-001`, `TC-011`, `TC-014`
- `REQ-003` -> AC de inconsistencia DR -> `TC-003`, `TC-015`, `TC-018` e scenario BDD
- `REQ-005` -> AC de caducidade -> `TC-004`, `TC-010`
- `REQ-007` -> AC de hostname duplicado -> `TC-005`, `TC-019` e scenario BDD
- `REQ-008` -> AC de Draft -> `TC-006`, `TC-016` e scenario BDD
- `NFR-002` -> AC de performance -> `TC-007`, `TC-013`

Isto permite ao professor ver rapidamente que os requisitos nao ficaram soltos.

Cada requisito tem evidencia associada.

## Variant-driven coverage

A Variante 4 esta visivel no Lab 10.

Ela aparece em requisitos como:

- `REQ-003` - inconsistencia logica de DR
- `REQ-005` - caducidade de evidencias
- `REQ-007` - duplicados
- `REQ-008` - estado Draft para progresso parcial
- `REQ-009` - transicao para Ready apenas com dados consistentes
- `NFR-002` - performance do motor de validacao

Isto cumpre a regra de ter pelo menos 2 requisitos influenciados pela variant.

Tambem mostra que a estrategia de testes esta orientada para qualidade e consistencia dos dados.

## AC e DoD Updates

Foi criado:

```text
docs/ac_dod_updates.md
```

Este documento regista melhorias feitas aos Acceptance Criteria e a Definition of Done.

O objetivo e mostrar que os testes ajudaram a tornar os criterios mais verificaveis.

## Acceptance Criteria Improvements

Foram documentadas 5 melhorias de AC.

O minimo pedido era 3.

As melhorias incluem:

- `REQ-007` - verificacao de hostname duplicado com comportamento mais claro
- `REQ-001` - tratamento de campos com espacos invisiveis
- `REQ-003` - comportamento UI e API para inconsistencia de DR
- `REQ-005` - trocar "12 meses" por limite exato de 365 dias
- `NFR-002` - transformar "rapido" em limite mensuravel de performance

Estas alteracoes tornam os AC mais testaveis porque definem:

- trigger
- comportamento esperado
- mensagem ou resultado
- limites mensuraveis
- resposta do sistema em erro

## Variant-driven AC Update

O enunciado pedia pelo menos 1 AC update influenciado pela variant.

Este requisito foi cumprido em varios pontos.

Exemplos:

- `REQ-007` - prevencao de duplicados
- `REQ-003` - inconsistencia de Disaster Recovery
- `NFR-002` - performance das validacoes

Todos estes estao ligados a qualidade e consistencia dos dados, que e o foco da Variante 4.

## Definition of Done Updates

Foram propostos 3 updates de DoD.

O minimo pedido era 2.

Os updates reforcam:

- existencia de testes negativos para requisitos da Variante 4
- obrigatoriedade de rastreabilidade REQ -> AC -> teste
- revisao estatica dos AC antes do desenvolvimento

Isto melhora a Definition of Done porque deixa claro que uma funcionalidade nao esta "done" apenas por estar implementada.

Ela so esta done quando existe evidencia de teste e rastreabilidade.

## Porque estes artefactos foram feitos

Cada ficheiro tem uma funcao especifica:

| Artefacto | Funcao |
|---|---|
| `docs/test_plan.md` | definir a estrategia de testes do slice |
| `docs/traceability_req_ac_tc.md` | ligar requisitos a AC e testes/cenarios |
| `docs/ac_dod_updates.md` | mostrar melhorias de testabilidade em AC e DoD |

Juntos, estes ficheiros provam que os testes nao foram criados de forma aleatoria.

Eles estao ligados aos requisitos, aos acceptance criteria e aos objetivos da variant.

## Como explicar o Lab

Neste lab, pegamos nos requisitos, acceptance criteria, definition of done e test cases criados anteriormente.

Depois organizamos tudo num plano de testes.

Primeiro definimos o scope do slice e o que ficou fora.

Depois definimos como vamos testar usando static testing, unit tests, integration tests, system tests e acceptance tests.

Tambem identificamos regras adequadas para TDD e comportamentos adequados para BDD.

Por fim, criamos uma matriz REQ -> AC -> TC/Scenario e registamos melhorias nos AC e na Definition of Done.

## Resultado final

O Lab 10 ficou com:

- test plan completo
- scope e out-of-scope definidos
- abordagem static + dynamic
- niveis unit, integration, system e acceptance
- 2 candidatos TDD
- plano BDD
- coverage goals
- validacao de NFRs
- evidence recording
- matriz REQ -> AC -> TC/Scenario
- mais de 8 requisitos mapeados
- 2 NFRs incluidos
- varios requisitos variant-driven
- 5 melhorias de AC
- 3 updates de DoD

## Limitacoes

O Lab 10 e sobretudo um lab de planeamento e rastreabilidade.

Nem todos os testes precisam estar automatizados nesta fase.

Algumas evidencias sao planeadas ou documentais, como relatorios e registos de execucao.

A automacao completa e a execucao real de todos os testes continuam a ser aprofundadas nos labs seguintes.
