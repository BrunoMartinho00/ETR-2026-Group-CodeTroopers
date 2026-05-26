# Relatorio de Automacao BDD — Lab 13

## Ferramenta usada
- Ferramenta BDD: Behave
- Linguagem/stack: Python
- Sintaxe da feature: Gherkin

## Como executar
- Comando:
  - `python -m behave bdd/features/lab13.feature`

## Resultados de execucao
- Data: 2026-05-26
- Ficheiros de feature executados: 1
- Cenarios executados: 6
- Passaram: 6
- Falharam: 0
- Steps executados: 28
- Steps que passaram: 28
- Steps que falharam: 0

## Evidencia
Resumo da execucao:

```text
1 feature passed, 0 failed, 0 skipped
6 scenarios passed, 0 failed, 0 skipped
28 steps passed, 0 failed, 0 skipped
Took 0min 0.028s
```

## Notas
- O que funcionou bem:
  - Os cenarios BDD foram automatizados com Behave.
  - Os cenarios chamam a logica Python existente em `src/validations.py`.
  - A suite cobre happy path, negative path, alternative flow e boundary behavior.

- O que falhou e por que motivo:
  - Nao foram observadas falhas durante a execucao.

- Proximos passos:
  - Alargar a cobertura BDD a workflows adicionais caso o sistema cresca.
  - Adicionar BDD de integracao ou UI apenas se a interface se tornar suficientemente estavel para automacao fiavel.
