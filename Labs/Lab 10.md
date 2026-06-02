# Lab 10 — Testing Part II

## <mark style="color:blue;">**Test Planning + Requirements Validation with Tests (AC & DoD Revisited)**</mark>

**(Planning + Static/TDD/BDD/Dynamic)**

**Input:** `docs/requirements_v1.md`, `docs/acceptance_criteria.md`, `docs/definition_of_done.md`, `docs/test_cases.md`, `bdd/features/lab9.feature`\
**Output:** `docs/test_plan.md`, `docs/traceability_req_ac_tc.md`, `docs/ac_dod_updates.md`

This lab consolidates your testing work into a **test plan** and strengthens requirement validation by linking: **Requirements → Acceptance Criteria → Test Cases / BDD Scenarios → Evidence**.

You will also revisit **Acceptance Criteria** and **Definition of Done (DoD)** and improve them based on what testing revealed.

> **GitHub rule:** All deliverables must be committed to your **team GitHub repository** under the exact paths listed below.\
> If it is not in the repo, it is not considered delivered.

---

### <mark style="color:blue;">Tools (logical)</mark>

- Static testing (review/inspection): requirements + AC + test cases
- Dynamic testing (execution planning): unit/integration/system/acceptance
- BDD: Gherkin (Cucumber-style scenarios)
- Your board/tool of choice (Azure DevOps / Trello / Notion / Other) _(optional)_

---

### <mark style="color:blue;">Objectives</mark>

By the end of Lab 10, your team should be able to:

- Produce a **simple, realistic test plan** for your project slice
- Define what you will test at each level (static, unit, integration, system, acceptance)
- Identify where **TDD** and **BDD** apply (even if not automated yet)
- Build a traceability matrix: **REQ → AC → TC / Scenario**
- Improve AC and DoD so they are testable and enforceable

---

### <mark style="color:blue;">Scope rule</mark>

Focus on your selected slice and choose:

- **8 requirements** (same set you used in Lab 9, or update if needed)
- At least **2 NFRs** must be included
- At least **2 requirements** must reflect your **variant**

---

### <mark style="color:blue;">In-class tasks (step by step)</mark>

#### <mark style="color:$primary;">1) Review your current artefacts (static testing)</mark>

Perform a quick inspection of:

- requirements clarity (REQ-###)
- acceptance criteria quality
- test cases completeness
- Gherkin scenario clarity

Record key issues you find (ambiguity, missing edge cases, vague expected results).

---

#### <mark style="color:$primary;">2) Build your Test Plan</mark>

Create `docs/test_plan.md` using the template below, including:

- **Scope** (slice + what is out of scope)
- **Test levels and approach**
  - Static review
  - Unit tests (planned)
  - Integration tests (planned)
  - System tests (planned)
  - Acceptance tests (manual/BDD)
- **TDD plan** (select at least 2 rules that are suitable for TDD)
- **BDD plan** (which behaviors will be represented as scenarios)
- **Coverage goals**
  - happy path + alternative + negative + boundary
  - NFR verification approach (measurement/review)
- **Evidence recording**
  - where results live (repo paths)
  - who is responsible
  - how traceability is updated

---

#### <mark style="color:$primary;">3) Create traceability: REQ → AC → TC/Scenario</mark>

Create `docs/traceability_req_ac_tc.md` mapping at least:

- 8 REQs
- to their AC items
- to test cases (TC-###) and/or scenarios (Feature/Scenario name)

Rules:

- each REQ must map to at least **2 AC items** where reasonable
- each REQ must map to at least **1 test case** or **1 scenario**
- avoid linking everything to everything—keep it meaningful

---

#### <mark style="color:$primary;">4) Revisit and improve AC and DoD (based on testing)</mark>

Create `docs/ac_dod_updates.md` and record:

- 3+ Acceptance Criteria you improved (before/after)
- 2+ DoD updates you propose (new checks or clarified wording)
- why these changes were needed (testability, ambiguity, gaps)

**Variant rule:** at least 1 AC update must reflect variant constraints.

---

### <mark style="color:blue;">Submission / Deliverables</mark>

Commit to your team GitHub repository:

- `docs/test_plan.md`
- `docs/traceability_req_ac_tc.md`
- `docs/ac_dod_updates.md`

---

### <mark style="color:blue;">Acceptance criteria (delivery)</mark>

Your Lab 10 delivery is accepted when:

- ✅ `docs/test_plan.md` includes:
  - slice scope + out-of-scope
  - static vs dynamic approach
  - planned test levels (unit/integration/system/acceptance)
  - where TDD and BDD apply (at least 2 TDD candidates + BDD scope)
  - coverage goals (happy/alt/negative/boundary)
  - NFR verification approach
  - evidence recording method
- ✅ `docs/traceability_req_ac_tc.md` maps:
  - ≥ 8 REQs → AC → TC/Scenario
  - includes ≥ 2 NFRs and ≥ 2 variant-driven REQs
- ✅ `docs/ac_dod_updates.md` contains:
  - ≥ 3 improved AC items (before/after)
  - ≥ 2 DoD updates with justification
  - at least 1 variant-driven AC update
- ✅ All deliverables are committed under the correct paths

---

### <mark style="color:blue;">Templates (copy/paste)</mark>

#### `docs/test_plan.md`

```markdown
# Test Plan — Lab 10

## 1) Scope

- Slice covered:
- Out of scope:

## 2) Test strategy (static + dynamic)

### Static testing (reviews)

- What we review:
- Review checklist:

### Dynamic testing (planned execution)

| Level            | What we test                 | Examples                       | Evidence                  |
| ---------------- | ---------------------------- | ------------------------------ | ------------------------- |
| Unit             | Small logic/validation rules | input validation, calculations | planned unit tests        |
| Integration      | Component interactions       | save → retrieve → export       | planned integration tests |
| System           | End-to-end slice             | intake → review missing info   | manual run notes          |
| Acceptance (BDD) | Behavior vs AC               | scenarios in Gherkin           | feature files             |

## 3) TDD plan (at least 2 candidates)

- Candidate 1 (rule/REQ):
- Candidate 2 (rule/REQ):
- Why TDD is suitable:

## 4) BDD plan (what behaviors become scenarios)

- Feature(s):
- Scenarios:
- Links to REQs:

## 5) Coverage goals

- Happy path:
- Alternative flows:
- Negative/error tests:
- Boundary tests:

## 6) NFR validation approach

- NFR-1:
  - How we verify (measurement/review/demo):
- NFR-2:
  - How we verify:

## 7) Evidence recording and responsibilities

- Where results are stored (repo paths):
- Who maintains traceability:
- How updates are tracked:
```

#### `docs/traceability_req_ac_tc.md`

```markdown
# Traceability — REQ → AC → Test Cases / BDD (Lab 10)

| Requirement (REQ-###) | Acceptance Criteria (AC IDs or text refs) | Test Cases (TC-###) | BDD Scenario (Feature/Scenario) |
| --------------------- | ----------------------------------------- | ------------------- | ------------------------------- |
| REQ-\_\_\_            | AC-1, AC-2                                | TC-\_\_\_           | Feature: **_ / Scenario: _**    |
| REQ-\_\_\_            | AC-1, AC-2                                | TC-\_\_\_           | Feature: **_ / Scenario: _**    |
| REQ-\_\_\_            | AC-1, AC-2                                | TC-\_\_\_           |                                 |
| REQ-\_\_\_            | AC-1, AC-2                                |                     | Feature: **_ / Scenario: _**    |
| REQ-\_\_\_ (NFR)      | AC-1, AC-2                                | TC-\_\_\_           |                                 |
| REQ-\_\_\_ (NFR)      | AC-1, AC-2                                |                     |                                 |
| REQ-\_\_\_            | AC-1, AC-2                                | TC-\_\_\_           |                                 |
| REQ-\_\_\_            | AC-1, AC-2                                | TC-\_\_\_           | Feature: **_ / Scenario: _**    |
```

#### `docs/ac_dod_updates.md`

```markdown
# AC & DoD Updates — Lab 10

## Acceptance Criteria improvements (min. 3)

### Item 1 (variant-driven if possible)

- Requirement: REQ-\_\_\_
- Before:
  - ...
- After:
  - ...
- Why changed:
  - ...

### Item 2

- Requirement: REQ-\_\_\_
- Before:
  - ...
- After:
  - ...
- Why changed:
  - ...

### Item 3

- Requirement: REQ-\_\_\_
- Before:
  - ...
- After:
  - ...
- Why changed:
  - ...

## DoD updates (min. 2)

1. Proposed DoD change:
   - Before: ...
   - After: ...
   - Why: ...

2. Proposed DoD change:
   - Before: ...
   - After: ...
   - Why: ...
```