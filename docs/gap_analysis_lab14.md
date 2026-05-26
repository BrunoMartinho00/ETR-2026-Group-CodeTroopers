# Gap Analysis — Lab 14

## REQs with no test coverage
- None with zero coverage.
- All selected functional requirements have at least one documented TC, UT, or BDD scenario.
- Some requirements have only documented/manual coverage and no automated coverage yet.

## REQs with documented tests but no automated tests
- REQ-004 — Dashboard URL validation
  - Current coverage: ACs documented in `docs/acceptance_criteria.md`.
  - Gap: no TC/UT/BDD automation currently linked in `docs/traceability_master.md`.
  - Action: add future unit tests for HTTPS URL validation and invalid domain syntax.

- REQ-006 — Owner identification in integrations
  - Current coverage: TC-009, TC-012.
  - Gap: Active Directory lookup behavior is documented but not automated.
  - Action: keep TC coverage now; add mocked integration test or BDD scenario in a future sprint.

- NFR-001 — Audit Log
  - Current coverage: TC-008, TC-020.
  - Gap: audit behavior is documented but not automated.
  - Action: mark as integration/system-level future automation because it requires persistence/log storage.

- NFR-002 — Performance validation
  - Current coverage: TC-007, TC-013 and Lighthouse report.
  - Gap: no automated performance test in the CI/test suite.
  - Action: keep Lighthouse evidence; add repeatable performance benchmark later if required.

## Tests/scenarios with no REQ link
- No unlinked Lab 12 unit tests found.
  - Action: all UT-01 to UT-11 are mapped in `docs/unit_test_report.md` and `docs/traceability_master.md`.

- No unlinked Lab 13 BDD scenarios found.
  - Action: all Lab 13 scenarios include REQ comments in `bdd/features/lab13.feature` and are mapped in `docs/traceability_req_bdd.md`.

- Existing Lab 9 scenarios are linked at feature level to REQ-003, REQ-007, REQ-008, and REQ-009.
  - Action: retain links in `docs/traceability_master.md`.

## AC items not covered by tests
- REQ-004 / AC-1 and AC-2
  - Gap: HTTPS dashboard URL validation has no automated unit or BDD scenario.
  - Action: add future unit tests for accepted `https://` URLs and rejected non-HTTPS or malformed URLs.

- REQ-006 / AC-2 and AC-3
  - Gap: Active Directory existence check and autocomplete suggestions are not automated.
  - Action: mark as future integration/UI automation because it requires an external directory or mock service.

- NFR-001 / AC-1 and AC-2
  - Gap: audit log persistence is not automated.
  - Action: keep documented test cases; automate later when storage/log persistence exists.

- NFR-002 / AC-1
  - Gap: P95 backend validation below 500ms is not automatically benchmarked.
  - Action: Lighthouse supports UI quality; future work should add repeatable backend performance measurement.

## Actions completed in this lab
1. Created `docs/traceability_master.md` as the consolidated source of truth for REQ → AC → TC/UT → BDD → Evidence.
2. Linked Lab 12 unit tests (`UT-01` to `UT-11`) to REQ-001, REQ-003, and REQ-005.
3. Linked Lab 13 BDD scenarios to REQ-001, REQ-003, and REQ-005.
4. Linked Lighthouse evidence to NFR-002 as UI quality support.
5. Identified requirements and ACs that are documented but not yet automated.