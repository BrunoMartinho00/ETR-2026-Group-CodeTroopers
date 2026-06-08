# Explicacao do Lab 2 - Elicitation Role Play e Requirements v0

## O que o Lab 2 pedia

O Lab 2 pedia transformar a base criada no Lab 1 em requisitos iniciais.

O objetivo era simular uma entrevista de elicitation, recolher necessidades em linguagem simples e converter essas necessidades em requisitos estruturados.

Os entregaveis obrigatorios eram:

- `docs/variant_assignment.md`
- `docs/elicitation_notes.md`
- `docs/requirements_v0.md`

O lab tambem exigia:

- pelo menos 10 perguntas e respostas da entrevista
- pelo menos 15 necessidades em linguagem natural
- pelo menos 10 requisitos v0
- tipo de requisito: FR ou NFR
- stakeholder associado
- prioridade H, M ou L
- pelo menos 3 requisitos claramente influenciados pela variante
- assumptions e open questions
- pelo menos 3 itens marcados como `[Variant]`
- pelo menos 3 itens marcados como `[Evidence]`
- pelo menos 5 reescritas de requisitos ambiguos para requisitos testaveis

## Relacao com a Lesson 2

A Lesson 2 explica a diferenca entre:

- requirement
- solution
- constraint

Tambem reforca que um requisito so e util se for claro, testavel e rastreavel.

Por isso, o Lab 2 aplicou esses conceitos na pratica:

- a entrevista recolheu necessidades reais do cliente
- as necessidades foram convertidas em requisitos
- cada requisito foi classificado como FR ou NFR
- cada requisito recebeu stakeholder e prioridade
- a variante foi usada para garantir alinhamento com o contexto do grupo

Isto ajuda a evitar requisitos vagos como "o sistema deve ser rapido" ou "o sistema deve ser facil de usar". Em vez disso, os requisitos devem indicar comportamento observavel ou condicoes verificaveis.

## Variante usada

Foi usada a Variante 4:

```text
Data Quality & Consistency
```

A persona principal e:

```text
Data Steward / Quality Manager
```

Esta variante obriga a equipa a focar-se em:

- validacoes cruzadas entre campos
- dados incompletos
- estados inconsistentes
- evidencia desatualizada
- bloqueio de submissao quando os dados nao sao confiaveis

Por isso, muitas perguntas e requisitos focam casos como:

- Disaster Recovery marcado como "Sim" sem data de teste
- Disaster Recovery marcado como "Nao" com data preenchida
- evidence antiga ou invalida
- duplicacao de sistemas
- passagem para `Ready to Proceed` apenas quando todas as regras passam

## Elicitation Notes

Foi criado:

```text
docs/elicitation_notes.md
```

Este documento regista a entrevista feita em role play.

Inclui:

- data
- equipa cliente
- DevTeam
- slice discutido
- variante
- contexto AMS
- perguntas e respostas
- lista de necessidades
- assumptions
- open questions
- notas da variante

## Contexto AMS

O contexto definido para a entrevista foi:

- setor: Healthcare
- tipo de solucao: ERP + Plataforma de Analytics
- modelo de suporte: L1/L2/L3, 24/7, Ingles e Espanhol
- problemas principais: documentacao em falta, DR inconsistente, acessos desatualizados, integracoes nao documentadas e evidencia desatualizada

Este contexto foi importante porque os requisitos nao devem ser genericos. Eles devem nascer de uma situacao concreta.

Por exemplo, num contexto de Healthcare, informacao incorreta ou desatualizada pode ter impacto serio na operacao, por isso a qualidade dos dados ganha prioridade.

## Perguntas e respostas

O documento contem 12 perguntas e respostas.

Isto cumpre o minimo de 10 pedido pelo lab.

As perguntas foram usadas para descobrir:

- que informacao e obrigatoria no intake
- que evidencia prova que existe Disaster Recovery
- quem valida a informacao
- se o intake pode ser guardado parcialmente
- como lidar com dados contraditorios
- quem e responsavel por listas de stakeholders

Algumas perguntas foram marcadas com:

```text
[Variant]
```

Isto mostra que a pergunta foi influenciada pela Variante 4.

Outras foram marcadas com:

```text
[Evidence]
```

Isto mostra preocupacao com prova, fonte e validade da informacao.

Estas tags sao importantes porque o Lab 2 exige demonstrar que a variante e o pensamento evidence-first influenciaram a entrevista.

## Lista de necessidades

Foi criada uma lista com 15 necessidades em linguagem natural.

Exemplos de necessidades:

- validar campos obrigatorios
- exigir data de DR quando DR esta marcado como "Sim"
- detetar inconsistencias entre campos
- validar evidencia de monitorizacao
- garantir owner para integracoes
- impedir nomes de sistemas duplicados
- diferenciar estados como Draft, Incomplete e Ready

Esta lista serve como ponte entre entrevista e requisitos.

Antes de escrever requisitos formais, a equipa primeiro regista aquilo que o cliente precisa em linguagem simples.

## Assumptions e open questions

O ficheiro `docs/elicitation_notes.md` tambem inclui assumptions.

As assumptions registam pontos assumidos pela equipa, por exemplo:

- stakeholders fornecem informacao correta
- testes de DR sao realizados pelo menos uma vez por ano
- evidencia esta num repositorio acessivel
- existe definicao clara de campos obrigatorios

Tambem foram registadas open questions.

As open questions servem para nao inventar respostas quando ainda falta confirmacao do cliente.

Duas perguntas abertas estao claramente ligadas a variante:

- idade maxima aceitavel para evidencia de teste de DR
- se inconsistencias devem bloquear submissao ou permitir apenas draft

Isto cumpre a regra do Lab 2 de ter pelo menos 2 open questions variant-related.

## Requirements v0

Foi criado:

```text
docs/requirements_v0.md
```

Este documento converte as necessidades em requisitos estruturados.

Cada requisito contem:

- item
- requisito
- tipo
- stakeholder
- prioridade
- indicacao se e variant-specific

Foram definidos 10 requisitos.

Isto cumpre o minimo pedido pelo lab.

## Functional Requirements

A maioria dos requisitos v0 sao Functional Requirements.

Eles descrevem comportamentos que o sistema deve executar, como:

- impedir submissao com campos obrigatorios vazios
- exigir data de ultimo teste de DR quando DR esta ativo
- assinalar inconsistencias quando DR esta desativado mas existe data preenchida
- validar URL de dashboard de monitorizacao
- rejeitar evidencia expirada
- exigir owner para integracoes
- rejeitar sistemas duplicados
- permitir guardar rascunho
- transitar para `Ready to Proceed` apenas quando todas as validacoes passam

Estes requisitos sao funcionais porque descrevem acoes ou regras de comportamento do sistema.

## Non-Functional Requirement

Tambem foi definido um NFR:

```text
Audit trail para alteracoes em campos criticos
```

Este requisito preocupa-se com qualidade, rastreabilidade e compliance.

Ele define que o sistema deve manter registos de auditoria com:

- ID do utilizador
- data/hora
- valor anterior
- valor novo

Embora tenha impacto funcional, este requisito e tratado como NFR porque descreve uma propriedade transversal de auditabilidade.

## Requisitos influenciados pela variante

Varios requisitos foram marcados como variant-specific.

Exemplos:

- campos obrigatorios nao podem estar vazios
- DR = Sim exige data valida
- DR = Nao com data preenchida gera inconsistencia
- evidencia de DR com mais de 12 meses deve ser rejeitada
- duplicados devem ser bloqueados
- rascunho nao deve acionar validacoes finais
- `Ready to Proceed` so ocorre apos validacoes completas

Isto mostra que a Variante 4 influenciou o conteudo dos requisitos e nao ficou apenas documentada no ficheiro de variante.

## Criterios de aceitacao e testes iniciais

O ficheiro `docs/requirements_v0.md` tambem inclui uma secao de criterios de aceitacao focada em estados invalidos e consistencia.

Foram descritos cenarios como:

- submissao com campos obrigatorios em falta
- inconsistencia em Disaster Recovery
- evidencia expirada

Tambem foi incluido um plano inicial de testes de qualidade de dados.

Isto ajuda a ligar os requisitos ao pensamento de testabilidade, mesmo antes dos labs focados em testes.

## Porque estes artefactos foram feitos

Cada documento tem uma funcao especifica:

| Artefacto | Funcao |
|---|---|
| `docs/variant_assignment.md` | fixa a variante e o foco obrigatorio do grupo |
| `docs/elicitation_notes.md` | regista entrevista, necessidades, assumptions e perguntas abertas |
| `docs/requirements_v0.md` | transforma necessidades em requisitos estruturados |

Esta organizacao cria uma cadeia simples:

```text
Entrevista -> Necessidades -> Requisitos v0 -> Criterios/Testes futuros
```

Isto e importante para Requirements Engineering porque permite justificar de onde cada requisito veio.

## Como explicar o Lab

Neste lab, simulamos uma entrevista com o cliente para perceber o que era necessario no slice Intake & Discovery.

Durante a entrevista, fizemos perguntas sobre informacao obrigatoria, evidencias, Disaster Recovery, integracoes, stakeholders e inconsistencias.

Depois transformamos essas respostas numa lista de necessidades.

A seguir, convertemos as necessidades em requisitos v0, classificando cada um como FR ou NFR, indicando stakeholder, prioridade e se era influenciado pela variante.

Como a nossa variante e Data Quality & Consistency, demos prioridade a regras de validacao cruzada, estados invalidos, evidencia expirada e bloqueio de dados contraditorios.

## Resultado final

O Lab 2 ficou com:

- variante documentada
- contexto AMS definido
- 12 perguntas e respostas
- mais de 3 entradas `[Variant]`
- mais de 3 entradas `[Evidence]`
- 15 necessidades recolhidas
- 4 assumptions
- 4 open questions
- pelo menos 2 open questions ligadas a variante
- 10 requisitos v0
- 7 requisitos marcados como variant-specific
- criterios de aceitacao iniciais
- plano inicial de testes de qualidade de dados

## Pontos a confirmar

Existem alguns pontos que devem ser revistos para garantir alinhamento total com o enunciado:

- `docs/requirements_v0.md` deve incluir uma secao explicita `Ambiguity rewrite` com pelo menos 5 reescritas
- pelo menos 2 dessas reescritas devem refletir diretamente a Variante 4
- `docs/variant_assignment.md` deve indicar explicitamente o slice obrigatorio `Intake & Discovery (AMS)`
- se a Lesson 2 for avaliada separadamente, pode ser necessario documentar o mini exercicio de classificacao entre requirement, solution e constraint

## Limitacoes

O Lab 2 ainda nao implementa funcionalidades.

Nesta fase, o trabalho e principalmente de Requirements Engineering:

- elicitar
- organizar
- classificar
- clarificar
- preparar requisitos para validacao futura

Os requisitos ainda sao uma versao inicial, por isso e normal que sejam refinados nos labs seguintes com IDs estaveis, acceptance criteria completos, use cases, REM e testes.
