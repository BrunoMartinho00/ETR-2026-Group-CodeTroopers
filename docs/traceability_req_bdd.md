# Traceability — Requirements ↔ BDD Scenarios (Lab 13)

## Selected requirements (min. 2)
- REQ-001 — Validação de Campos Obrigatórios
- REQ-003 — Inconsistência DR
- REQ-005 — Caducidade de Evidências

## Acceptance behaviors selected
- REQ-001 / AC-1: Required fields must be present before final submission.
- REQ-001 / AC-2: Invisible whitespace must be trimmed and rejected as empty input.
- REQ-003 / AC-2: DR test date must be cleared when Disaster Recovery changes to "No".
- REQ-003 / AC-3: A submission with DR = "No" and a test date must be rejected as inconsistent.
- REQ-005 / AC-1: Evidence date must be compared with the server date.
- REQ-005 / AC-2: Evidence older than 365 days must be rejected.

## Mapping (REQ → Scenario)
| Requirement (REQ-###) | Scenario name | Feature file | Notes |
|---|---|---|---|
| REQ-001 | Happy path — Final submission is valid when required fields are complete | bdd/features/lab13.feature | Covers AC-1 |
| REQ-001 | Negative path — Final submission is blocked when required fields contain only spaces | bdd/features/lab13.feature | Covers AC-2 |
| REQ-003 | Alternative flow — DR test date is cleared when Disaster Recovery changes to No | bdd/features/lab13.feature | Covers AC-2 |
| REQ-003 | Negative path — Submission is inconsistent when DR is No but a test date exists | bdd/features/lab13.feature | Covers AC-3 |
| REQ-005 | Boundary behavior — Evidence exactly 365 days old is accepted | bdd/features/lab13.feature | Covers AC-1 and AC-2 |
| REQ-005 | Negative path — Evidence older than 365 days is rejected | bdd/features/lab13.feature | Covers AC-1 and AC-2 |