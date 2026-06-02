# Lab 8 — Vibe Coding: Generate an Application Slice from Requirements (No Tests)

**Tools:** OpenAI Codex, Lovable (or similar), IDE of your choice\
**Input:** `docs/requirements_v1.md`, `docs/use_cases_v2.md`, `docs/acceptance_criteria.md`, `docs/variant_assignment.md`\
**Output:** runnable prototype + `docs/vibe_coding_log.md` + `docs/generated_scope.md`

In this lab you will practice **Vibe Coding**: generating a minimal application slice using AI-assisted tools, driven by your requirements and use cases.\
This lab is intentionally **without automated tests** (tests will come later).

> **GitHub rule:** All deliverables must be committed to your **team GitHub repository** under the exact paths listed below.\
> If it is not in the repo, it is not considered delivered.

---

### <mark style="color:blue;">Tools (choose one)</mark>

Use at least one of:

- **OpenAI Codex** (AI-assisted coding)
- **Lovable** (AI-generated app flow / UI scaffolding)
- Other AI-assisted builders are allowed if approved by the teacher

---

### <mark style="color:blue;">Objectives</mark>

By the end of Lab 8, your team should:

- Generate a **runnable prototype** for one coherent slice
- Keep scope under control (no feature drift)
- Preserve traceability: generated features must map to REQ/UC/AC
- Maintain an audit trail of prompts and iterations (vibe log)
- Show variant impact through at least 2 constraints reflected in the prototype

---

### <mark style="color:blue;">Scope rule (important)</mark>

You must implement **one slice only** (end-to-end). Pick one:

- Slice A: **Intake session → capture answers**
- Slice B: **Evidence metadata capture → validation**
- Slice C: **Review missing critical info → simple dashboard/list**
- Slice D: **Export results → file output / summary screen**

> Do not try to build the whole product. A small coherent slice is graded higher than a big unfinished one.

---

### <mark style="color:blue;">In-class tasks (step by step)</mark>

#### <mark style="color:$primary;">1) Select your “implementation target” (10 minutes)</mark>

Pick:

- 1 epic/area from your Requirements Map
- 1–2 use cases that describe the slice
- 6–10 requirements maximum to implement in this lab

Record them in `docs/generated_scope.md`.

---

#### <mark style="color:$primary;">2) Prepare the “generation prompt pack” (10 minutes)</mark>

Create a single prompt pack that includes:

- slice description
- actors/roles
- requirements (REQ-###)
- relevant use case flow (UC-###)
- acceptance criteria highlights
- variant constraints (must appear explicitly)

**Rule:** if you do not specify constraints, the tool will guess.

---

#### <mark style="color:$primary;">3) Generate the prototype (30–45 minutes)</mark>

Use Codex/Lovable to generate:

- a minimal UI for the slice
- basic data storage (simple local JSON / in-memory / basic DB — keep it minimal)
- core validations that match acceptance criteria drafts
- at least one realistic error path (from your UC exceptions)

**Scope guardrails**

- If the tool generates extra features, remove them (or log them as rejected)
- Keep naming consistent (REQ/UC references in comments or docs)

---

#### <mark style="color:$primary;">4) Run the prototype and document observations (15 minutes)</mark>

Run it locally (or in the tool environment) and verify manually:

- happy path works for your slice
- at least one alternative flow works
- at least one exception/error path works

Record outcomes in `docs/vibe_coding_log.md`.

---

#### <mark style="color:$primary;">5) Iterate (at least 2 cycles)</mark>

Do at least **two** prompt→generate→run→fix cycles.

Each cycle must be logged:

- what you asked
- what changed
- what improved
- what was rejected (feature drift)

---

### <mark style="color:blue;">Submission / Deliverables</mark>

Commit to your team GitHub repository:

- Prototype code (in your normal repo structure)
- `docs/generated_scope.md`
- `docs/vibe_coding_log.md`

Optional (recommended):

- screenshots (add to `docs/assets/`)
- short demo notes in README

---

### <mark style="color:blue;">Acceptance criteria (delivery)</mark>

Your Lab 8 delivery is accepted when:

- ✅ A runnable prototype exists implementing **one coherent slice**
- ✅ `docs/generated_scope.md` lists:
  - chosen slice
  - UC(s) implemented
  - REQ-### included (max 10)
  - variant constraints included
- ✅ `docs/vibe_coding_log.md` includes:
  - at least 2 iteration cycles
  - prompts used (or summary of prompts)
  - what was accepted/rejected and why
  - manual verification notes (happy path + one alternative + one exception)
- ✅ Variant impact is visible in the prototype (≥ 2 constraints reflected)
- ✅ All deliverables are committed to GitHub under the correct paths

---

### <mark style="color:blue;">Templates (copy/paste)</mark>

#### `docs/generated_scope.md`

```markdown
# Generated Scope — Lab 8

## Selected slice

- Slice: A / B / C / D
- Short description:

## Actors / roles

- Primary actor:
- Secondary actor (optional):

## Use Cases implemented

- UC-\_\_:
- UC-\_\_:

## Requirements implemented (max 10)

- REQ-\_\_\_
- REQ-\_\_\_
- REQ-\_\_\_
  ...

## Variant constraints implemented (min. 2)

- Constraint 1:
- Constraint 2:

## Out of scope (explicit)

- ...
```

#### `docs/vibe_coding_log.md`

```markdown
# Vibe Coding Log — Lab 8

## Tool used

- Codex / Lovable / Other:
- Environment/stack:

## Iteration 1

**Prompt (summary or paste):**

- ...

**Generated output (what appeared):**

- ...

**Kept (accepted):**

- ...

**Rejected (feature drift / out of scope):**

- ...

**Manual verification:**

- Happy path:
- Alternative flow:
- Exception/error path:

**Changes made after generation (manual edits):**

- ...

---

## Iteration 2

**Prompt (summary or paste):**

- ...

**Generated output:**

- ...

**Kept:**

- ...

**Rejected:**

- ...

**Manual verification:**

- Happy path:
- Alternative flow:
- Exception/error path:

**Changes made after generation:**

- ...

---

## Notes (lessons learned)

- What requirement ambiguity caused problems?
- What constraints were missing initially?
- What would you change in your requirements next?
```

---

### <mark style="color:blue;">Prompt pack example (optional)</mark>

```
You are helping generate a minimal prototype for an academic project.

Slice: Evidence Metadata Capture (end-to-end).
Actors: Transition Lead (primary).
Constraints: <insert variant constraints here>.

Implement only these requirements (do not add extra features):
REQ-001 ...
REQ-002 ...
REQ-003 ...

Use Case main flow:
1) ...
2) ...

Acceptance criteria highlights:
- AC-1 ...
- AC-2 ...

Deliver a runnable minimal prototype. Keep code simple and well-structured.
If you are unsure, ask assumptions explicitly in comments rather than inventing features.
```
