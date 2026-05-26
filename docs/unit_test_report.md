# Unit Test Report — Lab 12

## Selected scope (max 3 requirements)

- REQ-001 — Validação de Campos Obrigatórios
  - AC automated:
    - AC-1: O sistema deve validar a presença dos campos 'Nome', 'Owner' e 'Suporte' no momento do clique em "Submeter Final".
    - AC-2: Caracteres invisíveis (espaços) inseridos pelo utilizador devem ser limpos (`trim()`) e rejeitados como campos vazios.

- REQ-003 — Inconsistência DR
  - AC automated:
    - AC-2: Se o utilizador mudar a seleção de "Sim" para "Não", o sistema deve limpar/apagar automaticamente qualquer data que já estivesse preenchida no campo de teste.
    - AC-3: Se for injetada uma submissão onde o DR é "Não" mas existe uma data de teste preenchida, o sistema deve rejeitar a transição e marcar o ativo como "Inconsistent".

- REQ-005 — Caducidade de Evidências
  - AC automated:
    - AC-1: O sistema deve extrair a data dos metadados do ficheiro ou input e comparar com o relógio do servidor.
    - AC-2: Se a diferença for estritamente superior a 365 dias, o sistema deve abortar o upload e exibir a notificação "Evidência Expirada".

## Tests implemented (minimum 8)

| Test ID | Test name | REQ | AC | Type | Notes |
|---|---|---|---|---|---|
| UT-01 | test_required_fields_accept_valid_values | REQ-001 | AC-1 | Happy | Valid required fields allow final submission validation to pass. |
| UT-02 | test_required_fields_trim_extra_spaces | REQ-001 | AC-2 | Happy | Leading/trailing spaces are removed before validation. |
| UT-03 | test_required_fields_reject_whitespace_only_name | REQ-001 | AC-2 | Negative | A name containing only spaces is treated as empty. |
| UT-04 | test_required_fields_reject_missing_owner | REQ-001 | AC-1 | Negative | Missing Owner blocks validation. |
| UT-05 | test_dr_yes_with_test_date_is_valid | REQ-003 | AC-3 | Happy | DR enabled with a test date is consistent. |
| UT-06 | test_dr_no_with_test_date_is_inconsistent | REQ-003 | AC-3 | Negative | DR disabled with a test date is rejected as inconsistent. |
| UT-07 | test_dr_date_is_cleared_when_dr_changes_to_no | REQ-003 | AC-2 | Happy | Existing DR date is cleared when DR changes to No. |
| UT-08 | test_evidence_365_days_old_is_accepted | REQ-005 | AC-1, AC-2 | Boundary | Evidence exactly 365 days old is accepted. |
| UT-09 | test_evidence_366_days_old_is_rejected | REQ-005 | AC-1, AC-2 | Negative | Evidence older than 365 days is rejected. |
| UT-10 | test_dr_yes_without_test_date_is_inconsistent | REQ-003 | AC-3 | Negative | DR enabled without required test date is rejected. |
| UT-11 | test_evidence_300_days_old_is_accepted | REQ-005 | AC-1, AC-2 | Happy | Evidence newer than the 365-day limit is accepted. |

## Coverage checklist
- Happy path tests: 5
- Negative/error tests: 5
- Boundary tests: 1

## Execution evidence
- Date: 2026-05-26
- Command used: `python -m pytest tests/unit -q`
- Result summary:
  - Tests run: 11
  - Passed: 11
  - Failed: 0
- Notes:
  - Unit tests cover selected validation/business rules for required fields, DR consistency, and evidence expiry.
  - Tests were executed locally using PyTest.