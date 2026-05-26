# Explicacao do Lab 14 - Qualidade, Rastreabilidade e Test Grooming

## O que o Lab 14 pedia

O Lab 14 pedia uma manutencao de qualidade dos artefactos de teste do projeto.

O objetivo nao era criar muitos testes novos, mas sim garantir que os testes, cenarios, requisitos, criterios de aceitacao e evidencias estao alinhados e faceis de manter.

Os entregaveis obrigatorios eram:

- `docs/traceability_master.md`
- `docs/gap_analysis_lab14.md`
- `docs/test_retrocompatibility.md`
- `docs/test_grooming_report.md`

O lab tambem pedia:

- Consolidar rastreabilidade entre REQ, AC, TC, UT, BDD e evidencia
- Identificar lacunas de cobertura
- Rever riscos de retrocompatibilidade dos testes
- Fazer um ciclo curto de test grooming
- Executar testes, se possivel, e registar evidencia

## Relacao com a Lesson 14

A Lesson 14 explica que testar nao e apenas escrever testes.

Testar tambem inclui:

- manter rastreabilidade
- perceber o impacto de mudancas nos requisitos
- evitar testes frageis
- atualizar testes quando os requisitos mudam
- fazer grooming regular aos testes

O Lab 14 aplicou estes conceitos ao projeto, usando os artefactos ja criados nos Labs anteriores.

## Fonte de verdade usada

Foi definida uma fonte de verdade para evitar inconsistencias entre documentos.

Os principais documentos usados foram:

- `docs/requirements_v1.md`
- `docs/acceptance_criteria.md`
- `docs/test_plan.md`
- `docs/test_cases.md`
- `docs/unit_test_report.md`
- `docs/bdd_report.md`
- `docs/lighthouse_report.md`

Isto ajuda a manter uma cadeia clara:

```text
REQ -> AC -> TC/UT/BDD -> Evidence
```

## Traceability Master

Foi criado:

```text
docs/traceability_master.md
```

Este ficheiro consolida a rastreabilidade do projeto.

Ele liga:

- Requisitos (`REQ-###` e `NFR-###`)
- Criterios de aceitacao
- Casos de teste (`TC-###`)
- Unit tests (`UT-###`)
- Cenarios BDD
- Evidencias de execucao

O Lab pedia cobertura de pelo menos 10 requisitos ou todos, se o conjunto fosse menor.

A matriz cobre:

- `REQ-001` a `REQ-009`
- `NFR-001`
- `NFR-002`
- `NFR-004`

Tambem inclui requisitos da variante, como:

- `REQ-001`
- `REQ-003`
- `REQ-005`
- `REQ-007`
- `REQ-008`

## Gap Analysis

Foi criado:

```text
docs/gap_analysis_lab14.md
```

Este documento identifica:

- requisitos sem cobertura zero
- requisitos com cobertura documental, mas sem automacao
- testes/cenarios sem ligacao a requisitos
- criterios de aceitacao ainda nao automatizados

Principais lacunas identificadas:

- `REQ-004`: validacao de URL HTTPS ainda nao automatizada
- `REQ-006`: validacao com Active Directory/autocomplete ainda nao automatizada
- `NFR-001`: audit log documentado, mas sem automacao
- `NFR-002`: performance documentada e apoiada por Lighthouse, mas sem benchmark automatizado

Para cada lacuna foi definida uma acao:

- adicionar teste futuro
- ligar teste existente
- marcar como futura automacao de integracao/sistema
- justificar como fora do escopo atual

## Test Retrocompatibility

Foi criado:

```text
docs/test_retrocompatibility.md
```

Este documento explica que mudancas podem quebrar os testes:

- alteracoes nos requisitos
- alteracoes na interface
- refatoracao interna
- mudancas no ambiente/dependencias
- instabilidade nos dados de teste

Tambem foram identificados pontos frageis.

Exemplos:

- datas fixas nos testes de evidencia
- codigos de erro verificados exatamente
- step definitions dependentes de nomes de funcoes
- cenarios antigos do Lab 9 ainda nao automatizados
- resultados Lighthouse dependentes do ambiente e browser

Para cada ponto fragil foi definida uma acao de melhoria.

## Test Grooming

Foi criado:

```text
docs/test_grooming_report.md
```

O relatorio documenta um ciclo de grooming com mais de 5 acoes.

As principais acoes foram:

1. consolidar a matriz de rastreabilidade
2. identificar lacunas de cobertura
3. rever retrocompatibilidade dos testes
4. normalizar documentos dos Labs 12 e 13 para portugues
5. ligar unit tests a requisitos e ACs
6. ligar cenarios BDD a requisitos e ACs
7. ligar evidencia Lighthouse ao `NFR-002`

Estas acoes ajudam a evitar test rot, ou seja, testes e documentos que ficam desatualizados com o tempo.

## Execucao dos testes

Como ja existiam testes automatizados, foram executados:

```powershell
python -m pytest tests/unit -q
```

Resultado:

```text
11 passed
```

Tambem foram executados os cenarios BDD:

```powershell
python -m behave bdd/features/lab13.feature
```

Resultado:

```text
1 feature passed
6 scenarios passed
28 steps passed
```

Isto demonstra que, depois do grooming, os testes continuaram compativeis e funcionais.

## Como explicar o Lab

Neste lab, fizemos uma revisao de qualidade dos testes e da rastreabilidade.

Primeiro, criamos uma matriz master para juntar requisitos, criterios de aceitacao, casos de teste, unit tests, cenarios BDD e evidencias.

Depois, analisamos lacunas para perceber o que ainda nao esta automatizado ou precisa de melhor ligacao.

Tambem avaliamos retrocompatibilidade, ou seja, que alteracoes futuras podem quebrar os testes.

Por fim, fizemos test grooming: limpamos e melhoramos a organizacao dos artefactos de teste, atualizamos documentos e executamos as suites PyTest e Behave para confirmar que tudo continua a passar.

## Resultado final

O Lab 14 ficou com:

- matriz de rastreabilidade consolidada
- gap analysis documentada
- retrocompatibilidade analisada
- grooming report com mais de 5 acoes
- evidencia de execucao PyTest
- evidencia de execucao Behave

## Limitacoes

Algumas areas ainda nao estao automatizadas:

- validacao de URL de dashboard (`REQ-004`)
- Active Directory/autocomplete (`REQ-006`)
- audit log persistente (`NFR-001`)
- benchmark automatico de performance (`NFR-002`)

Estas areas foram documentadas como lacunas e podem ser tratadas em sprints futuras, quando houver implementacao de API, persistencia ou integracoes reais.

