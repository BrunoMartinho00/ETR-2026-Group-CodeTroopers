# Explicacao do Lab 7 - Requirements Validation, Acceptance Criteria e DoD

## O que o Lab 7 pedia

O Lab 7 pedia validar requisitos atraves de role play e melhorar a sua verificabilidade.

O objetivo era confirmar se os requisitos estavam claros, completos, testaveis e alinhados com a Variante 4.

Os entregaveis obrigatorios eram:

- `docs/requirements_validation.md`
- `docs/acceptance_criteria.md`
- `docs/definition_of_done.md`

O lab tambem pedia:

- selecionar pelo menos 6 requisitos
- incluir pelo menos 4 requisitos funcionais
- incluir pelo menos 2 requisitos nao funcionais
- validar cada requisito selecionado
- registar issues, proposed fixes e expected evidence
- criar acceptance criteria para pelo menos 6 requisitos
- usar Given/When/Then em pelo menos 2 requisitos
- definir DoD para Requirement e User Story

## Relacao com a Lesson 7

A Lesson 7 fala sobre requirements management, validation, acceptance criteria e Definition of Done.

Ela distingue:

```text
Verification -> Did we build it right?
Validation -> Did we build the right thing?
```

O Lab 7 aplica essa ideia ao projeto.

Os requisitos deixam de ser apenas documentos escritos e passam a ter condicoes verificaveis de sucesso.

## Requirements Validation

Foi criado:

```text
docs/requirements_validation.md
```

Este ficheiro regista:

- participantes e roles
- requisitos selecionados
- perguntas variant-driven
- resultados de validacao por requisito

O documento simula uma sessao de role play entre stakeholders e DevTeam.

## Participantes e roles

Foram registados os papeis:

- Client/Stakeholders
- DevTeam
- Facilitator
- Scribe
- Reviewer
- Tester

Estes papeis ajudam a simular uma validacao real.

O Reviewer desafia ambiguidade.

O Tester foca a verificabilidade.

O Scribe regista as decisoes.

## Requisitos selecionados

Foram selecionados 11 itens:

- 9 requisitos funcionais
- 2 requisitos nao funcionais

Isto cumpre o minimo pedido pelo Lab 7:

```text
4 FR + 2 NFR
```

Os requisitos selecionados incluem:

- `REQ-001`
- `REQ-002`
- `REQ-003`
- `REQ-004`
- `REQ-005`
- `REQ-006`
- `REQ-007`
- `REQ-008`
- `REQ-009`
- `NFR-001`
- `NFR-002`

## Variante na validacao

O Lab 7 exigia pelo menos 3 perguntas diretamente ligadas a variante.

Foram registadas 3 perguntas sobre:

- comportamento quando DR muda para "Nao" depois de existir data
- resposta quando a Asset Database esta indisponivel
- criterio exato para medir os 12 meses de validade da evidencia

Estas perguntas refletem a Variante 4 porque lidam com:

- consistencia logica
- duplicados
- validade temporal da evidencia
- qualidade dos dados antes do estado `Ready`

## Validation results

Cada requisito tem um bloco de validacao com:

- status
- issues found
- proposed fix
- expected evidence

Isto permite saber se o requisito esta pronto ou se precisa de clarificacao.

Exemplos:

- `REQ-001` revelou a necessidade de tratar espacos em branco como vazio
- `REQ-003` clarificou que inconsistencias podem ser guardadas em Draft, mas nao em Ready
- `REQ-005` fixou a regra de 12 meses como 365 dias corridos
- `REQ-007` levantou preocupacao com performance da validacao de duplicados
- `NFR-002` clarificou as condicoes de medicao dos 500ms

## Acceptance Criteria

Foi criado:

```text
docs/acceptance_criteria.md
```

Este ficheiro define criterios de aceitacao para requisitos funcionais e nao funcionais.

Os ACs tornam os requisitos verificaveis.

Em vez de dizer apenas que um requisito esta "feito", os ACs dizem que comportamento deve ser observado.

## Cobertura dos ACs

O documento tem ACs para mais de 6 requisitos.

Inclui:

- `REQ-001`
- `REQ-002`
- `REQ-003`
- `REQ-004`
- `REQ-005`
- `REQ-006`
- `REQ-007`
- `REQ-008`
- `REQ-009`
- `NFR-001`
- `NFR-002`
- `NFR-004`

Isto ultrapassa o minimo pedido pelo lab.

## Given/When/Then

O Lab 7 pedia pelo menos 2 requisitos com ACs em formato Given/When/Then.

O projeto tem 3:

- `REQ-002`
- `REQ-003`
- `REQ-008`

Este formato e util porque aproxima os ACs de futuros cenarios BDD.

Exemplo da logica:

```text
Given uma condicao inicial
When uma acao acontece
Then um resultado esperado deve ocorrer
```

## ACs ligados a Variante 4

Varios ACs refletem diretamente a Variante 4.

Exemplos:

- `REQ-003`: impedir estado Ready quando DR esta inconsistente
- `REQ-005`: rejeitar evidencia com mais de 365 dias
- `REQ-007`: bloquear duplicados
- `NFR-002`: garantir performance inferior a 500ms no P95
- `NFR-004`: impedir criacao de ativos Ready com dados inconsistentes

Isto mostra que os ACs nao sao genericos. Eles foram escritos para validar qualidade e consistencia dos dados.

## Definition of Done

Foi criado:

```text
docs/definition_of_done.md
```

Este documento define o que significa "Done" em dois niveis:

- Requirement
- User Story

## DoD para Requirement

Um requisito e considerado Done quando cumpre criterios como:

- ID estavel
- titulo claro
- tipo definido
- stakeholder registado
- descricao inequívoca e testavel
- ACs verificaveis
- impacto da variante indicado
- dependencias identificadas
- conflitos resolvidos ou documentados
- metodo de validacao definido

Este DoD ajuda a evitar requisitos vagos ou impossiveis de testar.

## DoD para User Story

Uma User Story e considerada Done quando:

- esta escrita no formato correto
- tem valor de negocio claro
- tem ACs acordados
- esta alinhada com requisitos
- existem testes adequados
- nao ha defeitos criticos
- documentacao foi atualizada quando necessario
- stakeholders aceitaram o resultado

Este DoD prepara a equipa para fases mais proximas de backlog, implementacao e testes.

## Porque estes artefactos foram feitos

Cada ficheiro tem uma funcao:

| Artefacto | Funcao |
|---|---|
| `docs/requirements_validation.md` | registar a validacao dos requisitos e decisoes tomadas |
| `docs/acceptance_criteria.md` | tornar os requisitos testaveis/verificaveis |
| `docs/definition_of_done.md` | definir o que significa um requisito ou story estar concluido |

A cadeia criada fica:

```text
Requirement -> Validation Result -> Acceptance Criteria -> Definition of Done
```

Isto prepara os labs seguintes, onde os ACs vao alimentar test cases e BDD scenarios.

## Como explicar o Lab

Neste lab, validamos os requisitos atraves de uma sessao de role play.

Selecionamos 11 requisitos, incluindo requisitos funcionais e nao funcionais.

Para cada requisito, analisamos se estava claro, testavel, completo e alinhado com a variante.

Depois registamos issues, propostas de correcao e evidencias esperadas.

A seguir, criamos acceptance criteria para transformar os requisitos em comportamentos verificaveis.

Por fim, definimos uma Definition of Done para requisitos e user stories, garantindo uma regra comum para decidir quando algo esta realmente concluido.

## Resultado final

O Lab 7 ficou com:

- 11 requisitos selecionados
- 9 FRs
- 2 NFRs
- 3 perguntas variant-driven
- resultados de validacao por requisito
- ACs para mais de 6 requisitos
- 3 requisitos em Given/When/Then
- ACs variant-driven
- DoD para Requirement
- DoD para User Story

## Limitacoes

Este lab ainda nao executa testes automatizados.

O foco e validar e preparar os requisitos para teste.

Alguns ACs mencionam possiveis detalhes tecnicos ou mecanismos futuros, como diretorio de utilizadores, API ou medicao automatica.

Esses detalhes servem como evidencia esperada e podem ser refinados nos labs seguintes conforme o projeto evoluir.
