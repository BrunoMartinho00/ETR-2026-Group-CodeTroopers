# Relatorio de Testes Unitarios — Lab 12

## Escopo selecionado (maximo 3 requisitos)

- REQ-001 — Validacao de Campos Obrigatorios
  - AC automatizados:
    - AC-1: O sistema deve validar a presenca dos campos 'Nome', 'Owner' e 'Suporte' no momento do clique em "Submeter Final".
    - AC-2: Caracteres invisiveis (espacos) inseridos pelo utilizador devem ser limpos (`trim()`) e rejeitados como campos vazios.

- REQ-003 — Inconsistencia DR
  - AC automatizados:
    - AC-2: Se o utilizador mudar a selecao de "Sim" para "Nao", o sistema deve limpar/apagar automaticamente qualquer data que ja estivesse preenchida no campo de teste.
    - AC-3: Se for injetada uma submissao onde o DR e "Nao" mas existe uma data de teste preenchida, o sistema deve rejeitar a transicao e marcar o ativo como "Inconsistent".

- REQ-005 — Caducidade de Evidencias
  - AC automatizados:
    - AC-1: O sistema deve extrair a data dos metadados do ficheiro ou input e comparar com o relogio do servidor.
    - AC-2: Se a diferenca for estritamente superior a 365 dias, o sistema deve abortar o upload e exibir a notificacao "Evidencia Expirada".

## Testes implementados (minimo 8)

| Test ID | Nome do teste | REQ | AC | Tipo | Notas |
|---|---|---|---|---|---|
| UT-01 | test_required_fields_accept_valid_values | REQ-001 | AC-1 | Happy | Campos obrigatorios validos permitem que a validacao de submissao final passe. |
| UT-02 | test_required_fields_trim_extra_spaces | REQ-001 | AC-2 | Happy | Espacos no inicio/fim sao removidos antes da validacao. |
| UT-03 | test_required_fields_reject_whitespace_only_name | REQ-001 | AC-2 | Negative | Um nome contendo apenas espacos e tratado como vazio. |
| UT-04 | test_required_fields_reject_missing_owner | REQ-001 | AC-1 | Negative | Owner em falta bloqueia a validacao. |
| UT-05 | test_dr_yes_with_test_date_is_valid | REQ-003 | AC-3 | Happy | DR ativo com data de teste e consistente. |
| UT-06 | test_dr_no_with_test_date_is_inconsistent | REQ-003 | AC-3 | Negative | DR desativado com data de teste e rejeitado como inconsistente. |
| UT-07 | test_dr_date_is_cleared_when_dr_changes_to_no | REQ-003 | AC-2 | Happy | A data de DR existente e limpa quando DR muda para No. |
| UT-08 | test_evidence_365_days_old_is_accepted | REQ-005 | AC-1, AC-2 | Boundary | Evidencia exatamente com 365 dias e aceite. |
| UT-09 | test_evidence_366_days_old_is_rejected | REQ-005 | AC-1, AC-2 | Negative | Evidencia com mais de 365 dias e rejeitada. |
| UT-10 | test_dr_yes_without_test_date_is_inconsistent | REQ-003 | AC-3 | Negative | DR ativo sem data de teste obrigatoria e rejeitado. |
| UT-11 | test_evidence_300_days_old_is_accepted | REQ-005 | AC-1, AC-2 | Happy | Evidencia mais recente do que o limite de 365 dias e aceite. |

## Checklist de cobertura
- Testes happy path: 5
- Testes negativos/de erro: 5
- Testes de fronteira: 1

## Evidencia de execucao
- Data: 2026-05-26
- Comando usado: `python -m pytest tests/unit -q`
- Resumo do resultado:
  - Testes executados: 11
  - Passaram: 11
  - Falharam: 0
- Notas:
  - Os testes unitarios cobrem regras selecionadas de validacao/negocio para campos obrigatorios, consistencia DR e caducidade de evidencias.
  - Os testes foram executados localmente com PyTest.
