# Rastreabilidade — Requisitos ↔ Cenarios BDD (Lab 13)

## Requisitos selecionados (minimo 2)
- REQ-001 — Validacao de Campos Obrigatorios
- REQ-003 — Inconsistencia DR
- REQ-005 — Caducidade de Evidencias

## Comportamentos de aceitacao selecionados
- REQ-001 / AC-1: Os campos obrigatorios devem estar presentes antes da submissao final.
- REQ-001 / AC-2: Espacos invisiveis devem ser removidos e rejeitados como input vazio.
- REQ-003 / AC-2: A data de teste DR deve ser limpa quando Disaster Recovery muda para "No".
- REQ-003 / AC-3: Uma submissao com DR = "No" e uma data de teste deve ser rejeitada como inconsistente.
- REQ-005 / AC-1: A data da evidencia deve ser comparada com a data do servidor.
- REQ-005 / AC-2: Evidencias com mais de 365 dias devem ser rejeitadas.

## Mapeamento (REQ → Cenario)
| Requisito (REQ-###) | Nome do cenario | Feature file | Notas |
|---|---|---|---|
| REQ-001 | Happy path — Final submission is valid when required fields are complete | bdd/features/lab13.feature | Cobre AC-1 |
| REQ-001 | Negative path — Final submission is blocked when required fields contain only spaces | bdd/features/lab13.feature | Cobre AC-2 |
| REQ-003 | Alternative flow — DR test date is cleared when Disaster Recovery changes to No | bdd/features/lab13.feature | Cobre AC-2 |
| REQ-003 | Negative path — Submission is inconsistent when DR is No but a test date exists | bdd/features/lab13.feature | Cobre AC-3 |
| REQ-005 | Boundary behavior — Evidence exactly 365 days old is accepted | bdd/features/lab13.feature | Cobre AC-1 e AC-2 |
| REQ-005 | Negative path — Evidence older than 365 days is rejected | bdd/features/lab13.feature | Cobre AC-1 e AC-2 |
