# Lab 12 — Unit Tests (PyTest/JUnit):

## Assertions + Running Tests + Evidence

**Tools:** PyTest *(Python)* or JUnit *(Java)*\
**Input:** `docs/requirements_v1.md`, `docs/acceptance_criteria.md`, `docs/test_plan.md` *(and your implementation from Lab 11/8)*\
**Output:** unit tests + `docs/unit_test_report.md` + `docs/test_execution.md`

This lab focuses on writing **unit tests** with strong **assertions** and running them consistently.\
You will demonstrate that key requirements/AC can be validated through automated unit tests.

> **GitHub rule:** All deliverables must be committed to your **team GitHub repository** under the exact paths listed below.\
> If it is not in the repo, it is not considered delivered.

***

### <mark style="color:blue;">Objectives</mark>

By the end of Lab 12, your team should:

* Write unit tests for core validation/business rules
* Use clear assertions that validate behavior (not implementation)
* Include negative and boundary coverage
* Run tests locally using a consistent command
* Record execution evidence (pass/fail summary and how to run)

***

### <mark style="color:blue;">Scope rule</mark>

Select **one** coherent area and test it thoroughly:

* Choose **3 requirements** (REQ-###) maximum
* Choose **6 acceptance criteria** total (across those requirements)

Your unit tests must cover:

* ≥ 4 happy-path assertions
* ≥ 2 negative/error cases
* ≥ 1 boundary test

> Tip: Best candidates are validation rules, transformations, scoring, or export formatting logic.

***

### <mark style="color:blue;">In-class tasks (step by step)</mark>

#### <mark style="color:$primary;">1) Select REQs and ACs</mark>

In `docs/unit_test_report.md`, list:

* the 3 selected REQs
* the AC items you are automating

***

#### <mark style="color:$primary;">2) Implement unit tests (minimum 8)</mark>

Create **at least 8 unit tests**.

Rules:

* Each test must clearly map to a REQ + AC
* Use Arrange–Act–Assert structure
* Use meaningful assertions (expected output, raised exception, blocked result, etc.)
* Include:
  * ≥ 2 negative/error tests
  * ≥ 1 boundary test

***

#### <mark style="color:$primary;">3) Add a “how to run tests” guide</mark>

Create `docs/test_execution.md` with:

* prerequisites (runtime/version)
* install/setup steps
* the command to run all tests
* the command to run one test file
* the command to run a single test (optional but recommended)

***

#### <mark style="color:$primary;">4) Run tests and record evidence</mark>

Run your test suite and record:

* pass/fail summary
* number of tests run
* any known limitations (if applicable)

Add this evidence to `docs/unit_test_report.md`.

***

### <mark style="color:blue;">Submission / Deliverables</mark>

Commit to your team GitHub repository:

* Unit tests (code):
  * Python: `tests/unit/` *(or `tests/`)*
  * Java: `src/test/java/` *(JUnit)*
* `docs/test_execution.md`
* `docs/unit_test_report.md`

Optional (recommended):

* console output screenshot saved under `docs/assets/`

***

### <mark style="color:blue;">Acceptance criteria (delivery)</mark>

Your Lab 12 delivery is accepted when:

* ✅ ≥ 8 unit tests exist and run
* ✅ At least:
  * 2 negative/error tests
  * 1 boundary test
* ✅ Each test maps to REQ-### and AC items (documented)
* ✅ `docs/test_execution.md` explains how to run tests locally
* ✅ `docs/unit_test_report.md` includes:
  * selected REQs + AC list
  * test coverage summary
  * execution evidence (tests run + result)
* ✅ All deliverables are committed under the correct paths

***

### <mark style="color:blue;">Templates (copy/paste)</mark>

#### `docs/test_execution.md`

```markdown
# Test Execution — Lab 12

## Stack
- Language: Python / Java
- Test framework: PyTest / JUnit
- Version requirements:

## Setup
1. <install steps>
2. <dependencies>
3. <environment variables (if any)>

## Run all unit tests
- Command:
  - `...`

## Run a single test file
- Command:
  - `...`

## Run a single test (optional)
- Command:
  - `...`

## Notes
- Known limitations:
- Troubleshooting tips:
```

#### `docs/unit_test_report.md`

```markdown
# Unit Test Report — Lab 12

## Selected scope (max 3 requirements)
- REQ-___
  - AC automated:
    - AC-...
    - AC-...
- REQ-___
  - AC automated:
- REQ-___
  - AC automated:

## Tests implemented (minimum 8)
| Test ID | Test name | REQ | AC | Type | Notes |
|---|---|---|---|---|---|
| UT-01 | ... | REQ-___ | AC-... | Happy | |
| UT-02 | ... | REQ-___ | AC-... | Happy | |
| UT-03 | ... | REQ-___ | AC-... | Negative | |
| UT-04 | ... | REQ-___ | AC-... | Boundary | |
| UT-05 | ... | REQ-___ | AC-... | Happy | |
| UT-06 | ... | REQ-___ | AC-... | Negative | |
| UT-07 | ... | REQ-___ | AC-... | Happy | |
| UT-08 | ... | REQ-___ | AC-... | Happy | |

## Coverage checklist
- Happy path tests: ___
- Negative/error tests: ___
- Boundary tests: ___

## Execution evidence
- Date:
- Command used:
- Result summary:
  - Tests run: __
  - Passed: __
  - Failed: __
- Notes (if any):
```

***

### <mark style="color:blue;">Suggested test structure (examples)</mark>

#### <mark style="color:$primary;">Python (PyTest)</mark>

* `tests/unit/test_validations.py`
* `tests/unit/test_rules.py`

#### <mark style="color:$primary;">Java (JUnit)</mark>

* `src/test/java/.../ValidationTests.java`
* `src/test/java/.../RulesTests.java`
