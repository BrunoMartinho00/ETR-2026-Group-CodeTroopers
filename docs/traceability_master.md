# Traceability Master — Lab 14 (REQ → AC → Tests → Evidence)

## Source of truth
- Requirements: `docs/requirements_v1.md`
- Acceptance criteria: `docs/acceptance_criteria.md`
- Test cases: `docs/test_cases.md`
- Unit test evidence: `docs/unit_test_report.md`
- BDD evidence: `docs/bdd_report.md`
- Lighthouse evidence: `docs/lighthouse_report.md`

| REQ-### | AC reference | Test Case (TC/UT) | BDD Scenario (Feature/Scenario) | Evidence (where) | Notes |
|---|---|---|---|---|---|
| REQ-001 | AC-1, AC-2 | TC-001, TC-011, TC-014, UT-01, UT-02, UT-03, UT-04 | Feature: Data quality validation for asset intake / Happy path — Final submission is valid when required fields are complete; Negative path — Final submission is blocked when required fields contain only spaces | `docs/unit_test_report.md`, `docs/bdd_report.md` | Variant-driven; covered by unit tests and BDD |
| REQ-002 | AC-1, AC-2, AC-3 | TC-002 | Existing Lab 9 BDD scenario partially covers DR happy path | `docs/test_cases.md`, `bdd/features/lab9.feature` | Covered by documented TC; not automated in Lab 13 |
| REQ-003 | AC-1, AC-2, AC-3 | TC-003, TC-015, TC-018, UT-05, UT-06, UT-07, UT-10 | Feature: Data quality validation for asset intake / Alternative flow — DR test date is cleared when Disaster Recovery changes to No; Negative path — Submission is inconsistent when DR is No but a test date exists | `docs/unit_test_report.md`, `docs/bdd_report.md` | Variant-driven; automated in unit and BDD tests |
| REQ-004 | AC-1, AC-2 | No automated test yet | None | `docs/acceptance_criteria.md` | Gap: dashboard URL validation documented but not automated |
| REQ-005 | AC-1, AC-2 | TC-004, TC-010, UT-08, UT-09, UT-11 | Feature: Data quality validation for asset intake / Boundary behavior — Evidence exactly 365 days old is accepted; Negative path — Evidence older than 365 days is rejected | `docs/unit_test_report.md`, `docs/bdd_report.md` | Variant-driven; boundary covered |
| REQ-006 | AC-1, AC-2, AC-3 | TC-009, TC-012 | None | `docs/test_cases.md` | Partially covered by documented tests; AD lookup not automated |
| REQ-007 | AC-1, AC-2 | TC-005, TC-019 | Existing Lab 9 BDD scenario: Detetar nome de ativo duplicado através da Base de Dados | `docs/test_cases.md`, `bdd/features/lab9.feature` | Variant-driven; integration-oriented |
| REQ-008 | AC-1, AC-2 | TC-006, TC-016 | Existing Lab 9 BDD scenario: Permitir progresso parcial através do modo Rascunho | `docs/test_cases.md`, `bdd/features/lab9.feature` | Variant-driven; alternative flow documented |
| REQ-009 | AC-1, AC-2, AC-3 | TC-002, TC-016, TC-017 | Existing Lab 9 BDD scenario: Happy path — Submissão de inventário com dados consistentes e completos | `docs/test_cases.md`, `bdd/features/lab9.feature` | Final transition behavior covered by system/BDD documentation |
| NFR-001 | AC-1, AC-2 | TC-008, TC-020 | None | `docs/test_cases.md` | Audit log coverage documented; not automated |
| NFR-002 | AC-1, AC-2 | TC-007, TC-013 | None | `docs/test_cases.md`, `docs/lighthouse_report.md` | Performance/UX quality supported by TC and Lighthouse evidence |
| NFR-004 | AC-1, AC-2 | TC-015, UT/BDD coverage for REQ-003 and REQ-005 | Feature: Data quality validation for asset intake / DR and evidence validation scenarios | `docs/unit_test_report.md`, `docs/bdd_report.md` | Quality gate supported by automated validation behavior |