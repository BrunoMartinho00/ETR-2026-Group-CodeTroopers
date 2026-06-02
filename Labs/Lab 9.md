# Lab 9 — Testing Part I

## <mark style="color:blue;">**Test Cases: Design + Documentation (Visual Paradigm) +**</mark> [<mark style="color:blue;">**BDD Scenarios**</mark>](#user-content-fn-1)[^1] <mark style="color:blue;">**(Cucumber/Gherkin)**</mark>

### <mark style="color:blue;">**Tools:**</mark>

- **Cucumber / Gherkin** — <https://cucumber.io/>
- **Visual Paradigm** (Test Case diagram / test case specification)

{% embed url="<https://www.visual-paradigm.com/tutorials/testingprocedure.jsp>" %}

**Input:** `docs/requirements_v1.md`, `docs/acceptance_criteria.md`, `docs/use_cases_v2.md` _(or latest UC docs)_\
**Output:** `docs/test_cases.md`, `bdd/features/lab9.feature`, `docs/traceability_req_tc.md` _(plus optional Visual Paradigm export)_

This lab converts your requirements into **test cases** and **BDD scenarios**.\
You will focus on test design and documentation (no automation yet).

> **GitHub rule:** All deliverables must be committed to your **team GitHub repository** under the exact paths listed below.\
> If it is not in the repo, it is not considered delivered.

---

### Objectives

By the end of Lab 9, your team should be able to:

- Design test cases from requirements and acceptance criteria
- Create at least 8 well-structured test cases (TC-###)
- Write at least 1 BDD feature file with scenarios (Gherkin)
- Cover happy path, alternative flow, and negative/error path
- Provide traceability from requirements to test cases

---

### Tools (logical)

#### Option A — Visual Paradigm (Test Case)

Use Visual Paradigm to model/document test cases (diagram + specification).\
Export a screenshot or image for evidence (optional).

#### Option B — Cucumber/Gherkin

Use Gherkin to describe acceptance tests as scenarios:

- Feature → Scenario → Given/When/Then

You will deliver both: **test cases + at least one Gherkin feature file**.

---

### Scope rule

Select a coherent slice (same slice you used earlier), then select:

- **4 functional requirements** (FR)
- **2 non-functional requirements** (NFR)
- plus 2 additional requirements of your choice\
  Total coverage: **8 requirements mapped to test cases** (some requirements may need multiple tests).

---

### In-class tasks (step by step)

#### 1) Select requirements to test (8 REQ items)

Pick 8 REQ items from `docs/requirements_v1.md`:

- 4 FR + 2 NFR + 2 other

Record the selection in `docs/traceability_req_tc.md`.

---

#### 2) Design test cases (minimum 8)

Create **at least 8 test cases** (TC-001…).

Each test case must include:

- Test Case ID (TC-###)
- Title
- Related requirements (REQ-###)
- Preconditions
- Test data (if relevant)
- Steps
- Expected results
- Type (Unit / Integration / System / Acceptance)
- Priority (H/M/L) _(optional but recommended)_

**Coverage rule:** Across your test set you must include:

- at least 1 happy path test
- at least 1 alternative flow test
- at least 2 negative/error tests
- at least 1 boundary test (min/max/old/new/empty/invalid)

---

#### 3) Use Visual Paradigm (evidence)

In Visual Paradigm, create either:

- a Test Case diagram, **or**
- a Test Case specification set

Export an image (PNG) as evidence (recommended).\
Commit it under `docs/diagrams/`.

---

#### 4) Write one Gherkin feature file (Cucumber)

Create one feature file: `bdd/features/lab9.feature`

Minimum content:

- 1 Feature
- 3 Scenarios
  - 1 happy path
  - 1 negative/error scenario
  - 1 alternative flow scenario

Each scenario must map to at least one REQ item and reflect acceptance criteria.

---

#### 5) Build the traceability table (REQ → TC)

Create a traceability matrix:

- each selected REQ has at least one linked TC
- a TC can link to multiple REQs, but avoid “everything links to everything”

---

### Submission / Deliverables

Commit to your team GitHub repository:

- `docs/test_cases.md`
- `bdd/features/lab9.feature`
- `docs/traceability_req_tc.md`

Optional (recommended evidence):

- `docs/diagrams/test_cases_lab9.png` _(Visual Paradigm export)_

---

### Acceptance criteria (delivery)

Your Lab 9 delivery is accepted when:

- ✅ `docs/test_cases.md` contains ≥ 8 test cases (TC-###), each with:
  - preconditions, steps, expected results, and REQ links
  - at least one boundary test and at least two negative/error tests
- ✅ `bdd/features/lab9.feature` contains:
  - 1 feature + ≥ 3 scenarios (happy/alt/negative)
  - Given/When/Then format
- ✅ `docs/traceability_req_tc.md` maps selected REQs to TCs
- ✅ All deliverables are committed under the correct paths

---

### Templates (copy/paste)

#### `docs/test_cases.md`

```markdown
# Test Cases — Lab 9

## TC-001 — <title>

- Type: Unit / Integration / System / Acceptance
- Priority: H / M / L
- Related requirements: REQ-..., REQ-...
- Preconditions:
- Test data:
- Steps:
  1. ...
  2. ...
  3. ...
- Expected results:
  - ...
- Notes (optional):

(Repeat until at least 8 test cases)
```

#### `bdd/features/lab9.feature`

```
Feature: <Feature name describing your slice>
  The goal of this feature is to validate <business value>.

  # REQ links: REQ-..., REQ-...

  Scenario: Happy path — <short scenario name>
    Given <initial context>
    And <precondition>
    When <action>
    Then <expected outcome>
    And <expected outcome>

  Scenario: Negative path — <short scenario name>
    Given <initial context>
    When <action with invalid input or missing field>
    Then <validation error or blocked outcome>

  Scenario: Alternative flow — <short scenario name>
    Given <initial context>
    And <variation condition>
    When <action>
    Then <expected outcome>
```

#### `docs/traceability_req_tc.md`

```
# Traceability — Requirements ↔ Test Cases (Lab 9)

## Selected requirements (8)
- REQ-___
- REQ-___
- REQ-___
- REQ-___
- REQ-___
- REQ-___
- REQ-___
- REQ-___

## Mapping (REQ → TC)
| Requirement (REQ-###) | Test Cases (TC-###) | Notes |
|---|---|---|
| REQ-___ | TC-___, TC-___ | |
| REQ-___ | TC-___ | |
| REQ-___ | TC-___ | |
| REQ-___ | TC-___ | |
| REQ-___ | TC-___ | |
| REQ-___ | TC-___ | |
| REQ-___ | TC-___ | |
| REQ-___ | TC-___ | |
```

---

### Notes (common pitfalls)

- Do not write “works correctly” as an expected result.
- Ensure each scenario is observable and verifiable.
- Avoid duplicating the same test 8 times; vary coverage (alt/negative/boundary).

[^1]: BDD (Behavior-Driven Development) scenarios are plain-text, human-readable descriptions of system behavior written in Gherkin format (Given-When-Then) from a user’s perspective. They bridge technical and business teams to define requirements, reduce ambiguities, and facilitate automated testing using tools like Cucumber or SpecFlow.