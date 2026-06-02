# Lab 7 — Requirements Validation (Role Play) + Acceptance Criteria + Definition of Done (DoD)

**Input:** `docs/requirements_v1.md`, `docs/use_cases_v2.md` _(or Lab 6 equivalent)_, `docs/variant_assignment.md`\
**Output:** `docs/requirements_validation.md`, `docs/acceptance_criteria.md`, `docs/definition_of_done.md`

This lab focuses on **validating requirements** through a short role play and strengthening your requirements with **Acceptance Criteria** and a clear **Definition of Done (DoD)**.

> **GitHub rule:** All deliverables must be committed to your **team GitHub repository** under the exact paths listed below.\
> If it is not in the repo, it is not considered delivered.

---

### <mark style="color:blue;">Tools</mark>

- Requirements validation (review + role play)
- Your repo documents (`/docs`)
- Optional: your board/tool of choice (Azure DevOps / Trello / Notion / Other)

---

### <mark style="color:blue;">Objectives</mark>

By the end of Lab 7, your team should be able to:

- Validate whether requirements are correct, complete, and testable
- Improve requirements by adding strong Acceptance Criteria
- Define and apply a Definition of Done for requirements and stories
- Detect conflicts, ambiguity, missing requirements, and scope drift
- Demonstrate variant alignment through validation scenarios (security, privacy, audit, performance, etc.)

---

### <mark style="color:blue;">Exercise:</mark> <mark style="color:blue;background-color:yellow;">Role Play</mark> <mark style="color:blue;">(Requirements Validation)</mark>

#### <mark style="color:$primary;">Setup (5 minutes)</mark>

Form two teams (or pair with another group):

- **Team A = Client / Stakeholders**
- **Team B = DevTeam / Analysts**

Roles may rotate:

- Facilitator (keeps time)
- Scribe (records findings)
- Reviewer (challenges ambiguity)
- Tester (focuses on verification)

---

### <mark style="color:blue;">In-class tasks (step by step)</mark>

#### <mark style="color:$primary;">1) Select the requirements to validate</mark>

From `docs/requirements_v1.md`, select:

- **6 requirements** (minimum) to validate:
  - at least **4 functional** requirements
  - at least **2 non-functional** requirements
- Rule: at least **2** of the selected items must be **variant-driven**.

Record the selected list in `docs/requirements_validation.md`.

---

#### <mark style="color:$primary;">2) Validation role play (12–15 minutes)</mark>

**Client / Stakeholder team** For each selected requirement, challenge:

- Is this what you really need?
- Is the scope correct?
- What are the boundary conditions?
- What would make you say “this is done”?
- What evidence would you accept?

**DevTeam team** For each selected requirement, confirm:

- Is it clear and unambiguous?
- Is it testable/verifiable?
- Is it missing acceptance criteria?
- Does it contain “how” (implementation leakage)?
- Does it conflict with another requirement?

**Variant rule:** ask at least **3 validation questions** directly related to the variant focus.

---

#### <mark style="color:$primary;">3) Write the validation results (for each requirement)</mark>

For each validated requirement, record:

- Status: **Valid / Needs rewrite / Out of scope / Duplicate**
- Issues found (ambiguity, missing info, conflicting constraints)
- Proposed fix (rewrite, new AC, split into smaller requirements)
- What evidence is expected (link, measurement, review, demo)

---

#### <mark style="color:$primary;">4) Create/upgrade Acceptance Criteria (AC)</mark>

Write acceptance criteria for at least:

- **6 requirements** (same set you validated)

Rules:

- Each requirement must have **2–4 acceptance criteria** minimum
- At least **2 requirements** must use **Given/When/Then** format (BDD-friendly)
- At least **2 AC** must reflect your **variant** constraints

---

#### <mark style="color:$primary;">5) Define a Definition of Done (DoD)</mark>

Create a DoD with **two levels**:

1. **DoD for a Requirement (REQ-###)**
2. **DoD for a User Story (US-###)** _(even if you haven’t fully built the backlog yet)_

Keep each DoD short (6–10 items).

---

### <mark style="color:blue;">Submission / Deliverables</mark>

Commit to your team GitHub repository:

- `docs/requirements_validation.md`
- `docs/acceptance_criteria.md`
- `docs/definition_of_done.md`

---

### <mark style="color:blue;">Acceptance criteria (delivery)</mark>

Your Lab 7 delivery is accepted when:

- ✅ `docs/requirements_validation.md` includes:
  - list of ≥ 6 selected requirements (with at least 2 variant-driven)
  - validation outcomes per requirement (status + issues + proposed fixes)
  - at least 3 variant-driven validation questions
- ✅ `docs/acceptance_criteria.md` includes:
  - ≥ 6 requirements, each with 2–4 acceptance criteria
  - at least 2 requirements expressed with Given/When/Then AC
  - at least 2 variant-driven AC
- ✅ `docs/definition_of_done.md` includes:
  - DoD for requirements + DoD for user stories (each 6–10 checks)
- ✅ All deliverables are committed under the correct paths

---

### <mark style="color:blue;">Templates (copy/paste)</mark>

#### `docs/requirements_validation.md`

```markdown
# Requirements Validation — Lab 7

## Participants / roles

- Client/Stakeholders:
- DevTeam:
- Facilitator:
- Scribe:
- Reviewer:
- Tester:

## Selected requirements (min. 6)

- REQ-\_\_\_ (Variant impact: Yes/No)
- REQ-\_\_\_ (Variant impact: Yes/No)
- REQ-\_\_\_ (Variant impact: Yes/No)
- REQ-\_\_\_ (Variant impact: Yes/No)
- REQ-\_\_\_ (Variant impact: Yes/No)
- REQ-\_\_\_ (Variant impact: Yes/No)

## Variant-driven validation questions (min. 3)

1. ...
2. ...
3. ...

## Validation results (one block per requirement)

### REQ-\_\_\_ — <title>

- Status: Valid / Needs rewrite / Out of scope / Duplicate
- Issues found:
  - ...
- Proposed fix (rewrite/split/clarify):
  - ...
- Expected evidence (how to verify):
  - Review / Demo / Test / Measurement
  - Notes: ...

(Repeat for all selected requirements)
```

#### `docs/acceptance_criteria.md`

```markdown
# Acceptance Criteria — Lab 7

## REQ-\_\_\_ — <title>

- AC-1: ...
- AC-2: ...
- AC-3: ...

## REQ-\_\_\_ — <title> (Given/When/Then)

- Given ...
- When ...
- Then ...

## REQ-\_\_\_ — <title>

- AC-1: ...
- AC-2: ...

(Repeat until ≥ 6 requirements)
```

#### `docs/definition_of_done.md`

```markdown
# Definition of Done (DoD) — Lab 7

## DoD — Requirement (REQ-###)

A requirement is considered "Done" when:

1. REQ-### has a stable ID, clear title, and type (FR/NFR/constraint)
2. Stakeholder and source are recorded
3. Description is unambiguous and avoids implementation leakage
4. Acceptance criteria exist (min. 2–4) and are testable/verifiable
5. Variant impact is stated (Yes/No) where applicable
6. Links exist to related use cases or stories (if available)
7. Conflicts/duplicates have been resolved or documented
8. Validation method is defined (review/demo/test/measurement)

## DoD — User Story (US-###)

A user story is considered "Done" when:

1. Story has actor/value and is small and testable
2. Acceptance criteria are agreed and verifiable
3. Implementation meets all AC (demonstrated or tested)
4. Tests exist (unit/integration/BDD where applicable)
5. No critical defects remain
6. Documentation updated (if required)
7. Stakeholders accept the outcome (validation)
```

---

### <mark style="color:blue;">Notes (common pitfalls)</mark>

- “Works correctly” is not acceptance criteria. Replace with verifiable conditions.
- Avoid rewriting everything during validation. Capture issues + propose changes first.
- Keep DoD short—if it’s too long, teams won’t use it.
