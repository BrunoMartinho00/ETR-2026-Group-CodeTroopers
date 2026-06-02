# Relatorio de Testes Unitarios - Lab 12

## Escopo selecionado (maximo 3 requisitos)

- REQ-001 - Validacao de Campos Obrigatorios
  - AC automatizados:
    - AC-1: Validar a presenca dos campos Nome, Owner e Suporte na submissao final.
    - AC-2: Limpar espacos com `trim()` e rejeitar campos que fiquem vazios.

- REQ-003 - Inconsistencia DR
  - AC automatizados:
    - AC-2: Limpar a data de teste quando DR muda de Sim para Nao.
    - AC-3: Rejeitar a submissao quando DR e Nao mas existe uma data de teste.

- REQ-005 - Caducidade de Evidencias
  - AC automatizados:
    - AC-1: Comparar a data da evidencia com o relogio do servidor.
    - AC-2: Rejeitar evidencias com idade estritamente superior a 365 dias.

## Testes implementados no escopo selecionado (minimo 8)

| Test ID | Nome do teste | REQ | AC | Tipo | Notas |
|---|---|---|---|---|---|
| UT-01 | test_required_fields_accept_valid_values | REQ-001 | AC-1 | Happy | Campos obrigatorios validos permitem a validacao. |
| UT-02 | test_required_fields_trim_extra_spaces | REQ-001 | AC-2 | Happy | Espacos no inicio e fim sao removidos. |
| UT-03 | test_required_fields_reject_whitespace_only_name | REQ-001 | AC-2 | Negative | Um nome contendo apenas espacos e tratado como vazio. |
| UT-04 | test_required_fields_reject_missing_owner | REQ-001 | AC-1 | Negative | Owner em falta bloqueia a validacao. |
| UT-06 | test_dr_no_with_test_date_is_inconsistent | REQ-003 | AC-3 | Negative | DR desativado com data e rejeitado como inconsistente. |
| UT-07 | test_dr_date_is_cleared_when_dr_changes_to_no | REQ-003 | AC-2 | Happy | A data existente e limpa quando DR muda para Nao. |
| UT-08 | test_evidence_365_days_old_is_accepted | REQ-005 | AC-1, AC-2 | Boundary | Evidencia exatamente com 365 dias e aceite. |
| UT-09 | test_evidence_366_days_old_is_rejected | REQ-005 | AC-1, AC-2 | Negative | Evidencia com mais de 365 dias e rejeitada. |
| UT-11 | test_evidence_300_days_old_is_accepted | REQ-005 | AC-1, AC-2 | Happy | Evidencia recente e aceite. |

## Testes adicionais de regressao

Estes testes continuam na suite, mas nao contam para o escopo selecionado do Lab 12:

| Test ID | Nome do teste | REQ | AC | Tipo | Notas |
|---|---|---|---|---|---|
| UT-05 | test_dr_yes_with_test_date_is_valid | REQ-002 | AC-3 | Happy | DR ativo com data e consistente. |
| UT-10 | test_dr_yes_without_test_date_is_inconsistent | REQ-002 | AC-2 | Negative | DR ativo sem data obrigatoria e rejeitado. |

## Checklist de cobertura do escopo selecionado

- Requisitos selecionados: 3
- Criterios de aceitacao selecionados: 6
- Testes contabilizados no escopo: 9
- Testes happy path: 4
- Testes negativos/de erro: 4
- Testes de fronteira: 1

## Evidencia de execucao

- Data da verificacao atual: 2026-06-02
- Comando usado: `python -m pytest tests/unit -q`
- Resumo do resultado:
  - Testes executados na suite completa: 19
  - Passaram: 19
  - Falharam: 0
- Detalhes:
  - Testes contabilizados para o escopo selecionado do Lab 12: 9
  - Testes adicionais de regressao do Lab 12: 2
  - Testes test-first do Lab 11: 8
- Notas:
  - Os testes do Lab 12 cobrem regras puras de validacao e negocio.
  - A suite foi executada localmente com PyTest.
