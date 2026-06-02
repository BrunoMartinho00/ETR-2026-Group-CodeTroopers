# Lab 13 — BDD Scenarios + Automation (PyTest-BDD / Behave / Cucumber) + Optional Quality Checks (Ligh

**Tools (choose what fits your stack):**

* **PyTest-BDD** *(Python)* or **Behave** *(Python)*
* **Cucumber** *(Gherkin-Cucumber, typically Java/JS stacks)*
* **Google Lighthouse** *(optional, for web UI quality checks)*
* Other tools are allowed if justified and documented

**Input:** `docs/requirements_v1.md`, `docs/acceptance_criteria.md`, `docs/test_plan.md`, existing feature files (Lab 9/11)\
**Output:** automated BDD scenarios + `docs/bdd_report.md` + `docs/traceability_req_bdd.md` *(plus optional Lighthouse report)*

This lab turns your acceptance behavior into **executable specifications** using BDD.\
You will write Gherkin scenarios and implement step definitions so the scenarios can run automatically (at least partially).

> **GitHub rule:** All deliverables must be committed to your **team GitHub repository** under the exact paths listed below.\
> If it is not in the repo, it is not considered delivered.

***

### <mark style="color:blue;">Objectives</mark>

By the end of Lab 13, your team should be able to:

* Write clear Feature/Scenario definitions aligned with requirements and AC
* Implement step definitions and run BDD scenarios automatically
* Cover happy path, negative path, and alternative flow behavior
* Maintain traceability: **REQ → Scenario**
* Produce a short BDD execution report (pass/fail + evidence)

**Optional:**

* Run Lighthouse on a UI page and record quality findings

***

### <mark style="color:blue;">Tool selection (pick one primary BDD stack)</mark>

Choose **ONE** primary automation path:

#### <mark style="color:purple;">**Option A**</mark>**&#x20;(Python):** PyTest-BDD or Behave

* Recommended if your prototype/logic is in Python

#### <mark style="color:orange;">**Option B**</mark>**&#x20;(Gherkin-Cucumber):** Cucumber

* Recommended if your project is using Java/JS and Cucumber integrates well

> You may write feature files in Gherkin regardless of stack. The key is to **run** scenarios with at least one tool.

***

### <mark style="color:blue;">Scope rule</mark>

Select **one slice** and automate behavior for:

* **2 requirements** (REQ-###) minimum
* **4 scenarios** minimum total:
  * 1 happy path
  * 1 negative path
  * 1 alternative flow
  * 1 boundary-related scenario (if applicable)

> Keep scenarios domain-focused. Avoid deep UI automation unless you have a stable UI.

***

### <mark style="color:blue;">In-class tasks (step by step)</mark>

#### <mark style="color:$primary;">1) Select requirements and acceptance behaviors</mark>

Choose 2 REQs and list the AC behaviors you will express as scenarios.

Record in `docs/traceability_req_bdd.md`.

***

#### <mark style="color:$primary;">2) Create the feature file(s)</mark>

Create:

* `bdd/features/lab13.feature`

Minimum:

* 1 Feature
* 4 Scenarios (happy/negative/alternative/boundary)

Rules:

* Use domain language, not UI button clicks
* Each scenario must reference REQ IDs in comments
* “Then” must be observable and verifiable

***

#### <mark style="color:$primary;">3) Implement step definitions (automation glue)</mark>

Create step definitions that connect your scenarios to executable code.

Minimum:

* steps implemented for at least **3 scenarios**
* scenarios must be runnable locally

You may:

* call your application functions/services directly (preferred for stability)
* use API calls (if available)
* use simple UI automation only if stable (optional)

***

#### <mark style="color:$primary;">4) Run BDD tests and record evidence</mark>

Run your BDD suite and record:

* command used
* number of scenarios executed
* pass/fail summary
* brief notes on failures (if any)

Capture evidence in `docs/bdd_report.md`.

***

#### <mark style="color:$primary;">5) (Optional) Google Lighthouse quality check</mark>

If you have a web UI:

* run Lighthouse against one key page of your slice
* record top findings (performance/accessibility/best practices)

Commit the report:

* `docs/lighthouse_report.md` *(or exported HTML/JSON under `docs/assets/`)*

> Lighthouse is optional. It is a bonus quality exercise and can support NFR validation.

***

### <mark style="color:blue;">Submission / Deliverables</mark>

Commit to your team GitHub repository:

Required:

* `bdd/features/lab13.feature`
* step definitions:
  * Python: `bdd/steps/` *(Behave)* or appropriate PyTest-BDD structure
  * Cucumber: step definitions folder for your stack
* `docs/bdd_report.md`
* `docs/traceability_req_bdd.md`

Optional:

* `docs/lighthouse_report.md` and/or `docs/assets/lighthouse_*.html`

***

### <mark style="color:blue;">Acceptance criteria (delivery)</mark>

Your Lab 13 delivery is accepted when:

* ✅ `bdd/features/lab13.feature` exists with:
  * 1 feature + ≥ 4 scenarios (happy/negative/alternative/boundary)
  * REQ links included
* ✅ Step definitions exist and allow execution of:
  * ≥ 3 scenarios automatically
* ✅ `docs/bdd_report.md` includes:
  * tool used
  * command(s)
  * scenarios executed + pass/fail summary
  * evidence notes (screenshots/logs optional)
* ✅ `docs/traceability_req_bdd.md` maps:
  * ≥ 2 REQs → scenarios
* ✅ All deliverables committed under correct paths

Optional bonus:

* ✅ Lighthouse report exists and includes 3 findings + actions

***

### <mark style="color:yellow;">Optional — Google Lighthouse (UI Quality Check)</mark>

Use this option only if your team has a **web UI page** running (local or deployed).\
Goal: produce a small, objective **quality snapshot** (performance/accessibility/best practices) and identify improvements.

#### What you must do (minimum)

1. **Pick one target page** related to your slice\
   Examples:
   * a form page (create/edit record)
   * a listing/dashboard page
   * a results/summary page
2. **Run Google Lighthouse in Chrome/Edge**
   * Open the page in **Google Chrome** (or Microsoft Edge).
   * Open DevTools:
     * Windows/Linux: `F12` or `Ctrl + Shift + I`
     * macOS: `Cmd + Option + I`
   * Go to the **Lighthouse** tab.
   * Select:
     * **Device**: Desktop (recommended)
     * Categories: **Performance**, **Accessibility**, **Best Practices**
       * SEO is optional
   * Click **Analyze page load**.
3. **Capture evidence**
   * Take a screenshot of the Lighthouse summary (scores + main findings), OR
   * Export the report:
     * Click **Export** → save as HTML (recommended)
4. **Record results and actions** Create `docs/lighthouse_report.md` and include:
   * page URL/route tested
   * scores (Performance/Accessibility/Best Practices)
   * **top 3 findings** and what you would change to improve them
   * note if any finding is related to your **NFRs** (e.g., responsiveness, accessibility)

#### What to commit (deliverables)

* `docs/lighthouse_report.md` *(required if you choose this optional part)*
* One of the following evidence files *(recommended)*:
  * `docs/assets/lighthouse_report.html` *(exported report)*\
    **or**
  * `docs/assets/lighthouse_screenshot.png`

#### Acceptance criteria (optional part)

This optional part is considered complete when:

* ✅ Lighthouse was run on **one relevant UI page**
* ✅ `docs/lighthouse_report.md` contains:
  * tested page
  * scores
  * at least **3 findings** + improvement actions
* ✅ Evidence (HTML or screenshot) is committed in `docs/assets/`

> Note: This is a quality exercise — it does not replace functional testing (unit/BDD). It complements NFR thinking.

***

### <mark style="color:blue;">Templates (copy/paste)</mark>

#### `bdd/features/lab13.feature`

```gherkin
Feature: <Behavior area for your slice>
  This feature validates key acceptance behaviors for the selected requirements.

  # REQ links: REQ-..., REQ-...

  Scenario: Happy path — <name>
    Given <context>
    And <precondition>
    When <action>
    Then <expected outcome>
    And <additional expected outcome>

  Scenario: Negative path — <name>
    Given <context>
    When <invalid action or missing input>
    Then <validation error or blocked outcome>

  Scenario: Alternative flow — <name>
    Given <context>
    And <variation condition>
    When <action>
    Then <expected outcome>

  Scenario: Boundary behavior — <name>
    Given <context>
    And <boundary input condition>
    When <action>
    Then <expected boundary outcome>
```

#### `docs/traceability_req_bdd.md`

```markdown
# Traceability — Requirements ↔ BDD Scenarios (Lab 13)

## Selected requirements (min. 2)
- REQ-___
- REQ-___

## Mapping (REQ → Scenario)
| Requirement (REQ-###) | Scenario name | Feature file | Notes |
|---|---|---|---|
| REQ-___ | Happy path — ... | bdd/features/lab13.feature | |
| REQ-___ | Negative path — ... | bdd/features/lab13.feature | |
| REQ-___ | Alternative flow — ... | bdd/features/lab13.feature | |
| REQ-___ | Boundary behavior — ... | bdd/features/lab13.feature | |
```

#### `docs/bdd_report.md`

```markdown
# BDD Automation Report — Lab 13

## Tool used
- PyTest-BDD / Behave / Cucumber:
- Language/stack:
- Version (optional):

## How to run
- Command:
  - `...`

## Execution results
- Date:
- Scenarios executed: __
- Passed: __
- Failed: __

## Notes
- What worked well:
- What failed and why (if anything):
- Next steps (improvements):
```

#### `docs/lighthouse_report.md` (optional)

```markdown
# Lighthouse Report — Lab 13 (Optional)

## Target page
- URL / local route:

## Summary
- Performance:
- Accessibility:
- Best Practices:
- SEO (optional):

## Top findings (min. 3)
1. Finding:
   - Why it matters:
   - Action:
2. Finding:
   - Why it matters:
   - Action:
3. Finding:
   - Why it matters:
   - Action:
```

***

### <mark style="color:blue;">Notes (common pitfalls)</mark>

* Don’t turn scenarios into UI scripts unless you must.
* Keep “Then” statements observable and assertable.
* Prefer stable step definitions that call your logic/services directly.
