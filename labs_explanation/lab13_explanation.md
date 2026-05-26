# Explicacao do Lab 13 - BDD e Lighthouse

## O que o Lab 13 pedia

O Lab 13 pedia transformar comportamentos de aceitacao em especificacoes executaveis usando BDD.

Os entregaveis obrigatorios eram:

- `bdd/features/lab13.feature`
- Step definitions em `bdd/steps/`
- `docs/bdd_report.md`
- `docs/traceability_req_bdd.md`

O lab tambem pedia:

- Pelo menos 2 requisitos selecionados
- Pelo menos 4 cenarios BDD
- Pelo menos 1 happy path
- Pelo menos 1 negative path
- Pelo menos 1 alternative flow
- Pelo menos 1 boundary-related scenario, quando aplicavel
- Step definitions que permitam executar automaticamente pelo menos 3 cenarios
- Evidencia de execucao dos cenarios

A parte de Lighthouse era opcional, mas foi incluida como exercicio de qualidade da interface web.

## Ferramenta escolhida

A ferramenta escolhida foi:

```text
Behave
```

Behave foi escolhido porque:

- O projeto ja tinha logica Python criada no Lab 12
- O enunciado aceita Behave como stack BDD em Python
- Os cenarios podem chamar diretamente as funcoes de validacao em `src/validations.py`
- Evita automacao fragil de UI e mantem os testes estaveis

## Relacao com a Lesson 13

A Lesson 13 explica que BDD usa cenarios em linguagem partilhada para descrever comportamento esperado.

No Lab 13, isso foi aplicado atraves de:

- Feature: area de comportamento testada
- Scenario: exemplo concreto de comportamento
- Given: contexto inicial
- When: acao ou evento
- Then: resultado observavel
- Step definitions: codigo Python que liga os passos Gherkin a funcoes executaveis

## Escopo selecionado

Foram selecionados 3 requisitos:

- `REQ-001` - Validacao de Campos Obrigatorios
- `REQ-003` - Inconsistencia DR
- `REQ-005` - Caducidade de Evidencias

O minimo pedido era 2 requisitos, por isso o escopo cumpre e ultrapassa o requisito minimo.

Estes requisitos foram escolhidos porque representam comportamentos importantes de aceitacao e ja tinham logica testavel criada no Lab 12.

## Criterios de aceitacao expressos em BDD

### REQ-001 - Validacao de Campos Obrigatorios

Comportamentos BDD:

- Submissao e valida quando os campos obrigatorios estao completos
- Submissao e bloqueada quando o campo Nome contem apenas espacos

### REQ-003 - Inconsistencia DR

Comportamentos BDD:

- A data de teste DR e limpa quando Disaster Recovery muda para "No"
- A submissao fica inconsistente quando DR e "No" mas existe data de teste

### REQ-005 - Caducidade de Evidencias

Comportamentos BDD:

- Evidencia exatamente com 365 dias e aceite
- Evidencia com mais de 365 dias e rejeitada

## Feature file criado

O ficheiro criado foi:

```text
bdd/features/lab13.feature
```

Ele contem 1 Feature:

```text
Data quality validation for asset intake
```

E contem 6 cenarios:

| Tipo | Cenario |
|---|---|
| Happy path | Final submission is valid when required fields are complete |
| Negative path | Final submission is blocked when required fields contain only spaces |
| Alternative flow | DR test date is cleared when Disaster Recovery changes to No |
| Negative path | Submission is inconsistent when DR is No but a test date exists |
| Boundary behavior | Evidence exactly 365 days old is accepted |
| Negative path | Evidence older than 365 days is rejected |

O enunciado pedia no minimo 4 cenarios; foram criados 6.

## Step definitions criadas

As step definitions foram criadas em:

```text
bdd/steps/lab13_steps.py
```

Estas steps ligam as frases Gherkin a codigo Python executavel.

Exemplo:

```gherkin
Given an evidence file dated "2025-05-25"
And the server date is "2026-05-26"
When the evidence age is validated
Then the evidence should be rejected
And the evidence error should be "EVIDENCE_EXPIRED"
```

Estas steps chamam a funcao:

```python
validate_evidence_age(evidence_date, server_date)
```

Assim, o BDD valida comportamento de aceitacao, mas continua a usar logica de negocio estavel.

## Como os cenarios foram executados

O Behave foi executado com:

```powershell
python -m behave bdd/features/lab13.feature
```

Resultado:

```text
1 feature passed, 0 failed, 0 skipped
6 scenarios passed, 0 failed, 0 skipped
28 steps passed, 0 failed, 0 skipped
```

Isto cumpre o requisito de cenarios executaveis e ultrapassa o minimo de 3 cenarios automatizados.

## Relatorio BDD

O relatorio oficial esta em:

```text
docs/bdd_report.md
```

Este ficheiro inclui:

- Ferramenta usada
- Linguagem/stack
- Comando para executar
- Numero de features, cenarios e steps executados
- Resultado pass/fail
- Evidencia de execucao
- Notas e proximos passos

## Rastreabilidade

A rastreabilidade esta em:

```text
docs/traceability_req_bdd.md
```

Este ficheiro mapeia:

```text
REQ -> Scenario
```

O mapeamento mostra que os cenarios BDD estao ligados aos requisitos e criterios de aceitacao selecionados.

## Parte opcional - Lighthouse

A parte opcional do Lighthouse tambem foi feita.

O objetivo do Lighthouse e avaliar qualidade da interface web, nao substituir testes funcionais.

Ele ajuda a verificar:

- Performance
- Accessibility
- Best Practices
- SEO

Foi testada a pagina:

```text
https://asset-form-guardian.lovable.app/
```

Os resultados registados foram:

- Performance: 98
- Accessibility: 98
- Best Practices: 100
- SEO: 100

O relatorio esta em:

```text
docs/lighthouse_report.md
```

A evidencia exportada esta em:

```text
docs/assets/lighthouse_report.html
```

## Como explicar o Lab

Neste lab, pegamos em comportamentos de aceitacao do projeto e escrevemo-los em Gherkin, usando Given/When/Then.

Depois criamos step definitions em Python com Behave para automatizar esses cenarios.

Os cenarios nao simulam cliques na interface. Em vez disso, chamam diretamente a logica de validacao criada no Lab 12. Isto torna os testes mais estaveis e alinhados com a recomendacao da Lesson 13: BDD deve focar comportamento e resultados observaveis, nao detalhes da UI.

O Lab 13 ficou com:

- 1 feature
- 6 cenarios BDD
- 28 steps executados
- 6 cenarios a passar
- Rastreabilidade entre REQs e cenarios
- Relatorio de execucao
- Relatorio opcional Lighthouse

## Limitacoes

Os cenarios BDD automatizados focam-se em regras de validacao e comportamento de negocio.

Nao cobrem:

- Fluxos completos end-to-end na UI
- Base de dados real
- APIs externas
- Autenticacao

Essas areas devem ser cobertas por testes de integracao, sistema ou E2E quando a aplicacao estiver mais completa e estavel.

