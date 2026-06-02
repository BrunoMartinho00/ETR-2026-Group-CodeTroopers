# Lab 14 — Quality & Testing Maintenance:

## <mark style="color:blue;">Traceability + Test Backward Compatibility + Test Grooming</mark>

**Tools:** Your test stack (PyTest/JUnit + BDD), your repo docs, optional board (Azure DevOps/Trello)\
**Input:** `docs/requirements_v1.md`, `docs/acceptance_criteria.md`, `docs/test_plan.md`, `docs/test_cases.md`, `bdd/features/`\
**Output:** updated traceability + grooming report + compatibility notes

This lab is a “quality maintenance sprint”: you will make your testing assets and traceability **consistent, up to date, and maintainable**, and you will document what changed and why.

> **GitHub rule:** All deliverables must be committed to your **team GitHub repository** under the exact paths listed below.\
> If it is not in the repo, it is not considered delivered.

***

### <mark style="color:blue;">Objectives</mark>

By the end of Lab 14, your team should be able to:

* Consolidate traceability across requirements, AC, tests, and BDD scenarios
* Identify and fix traceability gaps (REQ without tests, tests without REQ)
* Assess test “retrocompatibility” risks (why tests break when things change)
* Perform a short **test grooming** cycle (clean up test assets)
* Align test lifecycle updates with requirement lifecycle changes

***

### <mark style="color:blue;">Tools (logical)</mark>

* Static review (inspection): REQ/AC/TC/BDD alignment
* Test execution (optional but recommended): run unit tests + BDD scenarios
* Repo maintenance: refactor test naming, steps, duplication
* Optional: board for tracking grooming tasks

***

### <mark style="color:blue;">In-class tasks (step by step)</mark>

#### <mark style="color:$primary;">1) Traceability consolidation (single source of truth)</mark>

Create (or update) a consolidated traceability matrix:

* `docs/traceability_master.md`

It must link:

* **REQ → AC → TC → BDD Scenario (if applicable)**

Minimum coverage:

* **10 REQs** (or all REQs if your set is smaller)
* Include at least **2 NFRs**
* Include at least **2 variant-driven REQs**

***

#### <mark style="color:$primary;">2) Gap analysis (required)</mark>

In `docs/gap_analysis_lab14.md`, identify:

* REQs with **no tests** (no TC and no scenario)
* Tests (TC or scenario) with **no REQ link**
* AC items not covered by tests

For each gap, decide one action:

* add a missing TC/scenario
* link existing tests
* update AC wording to be testable
* explicitly mark as out-of-scope (with justification)

***

#### <mark style="color:$primary;">3) Test retrocompatibility check (required)</mark>

Create `docs/test_retrocompatibility.md` and answer:

* What kinds of changes would break your tests?
  * requirement wording changes
  * UI changes (selectors)
  * refactoring (internal structure)
  * environment/dependency changes
  * test data instability
* Identify at least **3 fragile points** in your current tests/BDD:
  * brittle assertions
  * duplicated steps
  * UI-dependent scenarios
  * hard-coded data

For each fragile point, add an improvement action.

***

#### <mark style="color:$primary;">4) Test grooming cycle (required)</mark>

Perform a grooming cycle with a small, realistic set of actions.

Minimum grooming actions (**do at least 5 total**):

* rename unclear tests (improve readability)
* split one oversized scenario into two
* remove duplicated scenarios/steps
* refactor step definitions to reuse common steps
* reduce brittle assertions (avoid unstable text/ordering)
* standardize IDs/naming: TC-###, UT-###, feature/scenario names
* clean up test data setup (make it minimal/repeatable)
* update doc links and paths

Record what you did in:

* `docs/test_grooming_report.md`

***

#### <mark style="color:$primary;">5) (Recommended) Execute tests and record evidence</mark>

If you already have runnable automated tests:

* run unit tests
* run BDD scenarios (if set up)

Record the outcome in `docs/test_grooming_report.md`:

* number of tests/scenarios executed
* pass/fail summary
* what failures taught you (REQ change? brittle test? missing setup?)

If you cannot run tests yet, explain why (briefly) and what is missing.

***

### <mark style="color:blue;">Submission / Deliverables</mark>

Commit to your team GitHub repository:

* `docs/traceability_master.md`
* `docs/gap_analysis_lab14.md`
* `docs/test_retrocompatibility.md`
* `docs/test_grooming_report.md`

Plus any updated files:

* `docs/acceptance_criteria.md` (if edited)
* `docs/test_cases.md` (if edited)
* `bdd/features/*.feature` (if edited)
* step definitions / unit tests (if edited)

***

### <mark style="color:blue;">Acceptance criteria (delivery)</mark>

Your Lab 14 delivery is accepted when:

* ✅ `docs/traceability_master.md` links REQ → AC → TC → Scenario for ≥ 10 REQs (or all)
* ✅ `docs/gap_analysis_lab14.md` lists:
  * REQs with no tests
  * tests with no REQ link
  * AC gaps
  * actions taken (or justified out-of-scope)
* ✅ `docs/test_retrocompatibility.md` includes:
  * ≥ 3 fragile points + improvement actions
* ✅ `docs/test_grooming_report.md` documents:
  * ≥ 5 grooming actions performed
  * what files changed
  * (recommended) test execution results or limitation explanation
* ✅ All deliverables are committed under correct paths

***

### <mark style="color:blue;">Templates (copy/paste)</mark>

#### `docs/traceability_master.md`

```markdown
# Traceability Master — Lab 14 (REQ → AC → Tests → Evidence)

| REQ-### | AC reference | Test Case (TC/UT) | BDD Scenario (Feature/Scenario) | Evidence (where) | Notes |
|---|---|---|---|---|---|
| REQ-___ | AC-... | TC-___ / UT-___ | Feature: ___ / Scenario: ___ | logs/report/link | |
| REQ-___ | AC-... | TC-___ |  |  | |
| REQ-___ (NFR) | AC-... | TC-___ |  |  | |
| REQ-___ (Variant) | AC-... | UT-___ | Feature: ___ / Scenario: ___ |  | |
```

#### `docs/gap_analysis_lab14.md`

```markdown
# Gap Analysis — Lab 14

## REQs with no test coverage
- REQ-___ → Action: add TC / add scenario / link existing / out-of-scope (why)
- REQ-___ → Action: ...

## Tests/scenarios with no REQ link
- TC-___ / Scenario: ___ → Action: link to REQ-___ or remove

## AC items not covered by tests
- REQ-___ / AC-___ → Action: add UT/TC/Scenario or rewrite AC

## Actions completed in this lab
1. ...
2. ...
3. ...
```

#### `docs/test_retrocompatibility.md`

```markdown
# Test Retrocompatibility — Lab 14

## What changes can break our tests?
- Requirement changes:
- UI changes:
- Refactoring:
- Environment/dependencies:
- Test data:

## Fragile points (min. 3) + improvements
1. Fragile point:
   - Why fragile:
   - Improvement action:
2. Fragile point:
   - Why fragile:
   - Improvement action:
3. Fragile point:
   - Why fragile:
   - Improvement action:
```

#### `docs/test_grooming_report.md`

```markdown
# Test Grooming Report — Lab 14

## Grooming actions performed (min. 5)
1. Action:
   - File(s):
   - Why:
2. Action:
   - File(s):
   - Why:
3. Action:
   - File(s):
   - Why:
4. Action:
   - File(s):
   - Why:
5. Action:
   - File(s):
   - Why:

## Traceability updates
- What changed in traceability_master:
- Key gaps resolved:

## Test execution evidence (recommended)
- Date:
- Commands used:
- Unit tests: executed __, passed __, failed __
- BDD scenarios: executed __, passed __, failed __
- Notes on failures (if any):

## Lessons learned
- What was the main source of brittleness?
- What improvement gave the biggest value?
```
