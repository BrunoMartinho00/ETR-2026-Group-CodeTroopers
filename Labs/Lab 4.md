# Lab 4 — Objectives + CSFs + REM v1 (Variant-driven)

## <mark style="color:blue;">Objectives + CSFs + REM v1 (Variant-driven) + Preconditions/Postconditions + Acceptance Matrix</mark>

> **Important (anti-copy rule):** If you use AMS as domain reference, you must not copy pre-written objectives/requirements/AC. Your objectives, CSFs, and REM entries must reflect your assigned variant.
>
> **GitHub rule:** All deliverables must be committed to your team GitHub repository under the exact paths listed below.

---

### <mark style="color:blue;">Objectives</mark>

By the end of Lab 4, your team should:

- Define **3 objectives** and **3 linked CSFs** (variant-aware)
- Map **3–5 requirements** to each CSF (explicit linkage)
- Create **REM v1** using the provided Excel template, filling **≥ 8 complete requirements**
- Add **preconditions and postconditions** for **≥ 3 functional requirements (FR)**

---

### <mark style="color:blue;">Variant mechanism (mandatory)</mark>

Your Lab 4 submission must show variant alignment in two places:

#### 1) In `docs/objectives_fcs.md`

- At least **2 objectives or CSFs** must clearly reflect the variant focus\
  (audit/performance/privacy/security/etc.)

#### 2) In `docs/rem_v1.md`

- At least **3 REM entries** must include: `Variant impact: Yes`

### <mark style="color:blue;">In-class tasks (step by step)</mark>

#### <mark style="color:$primary;">1) Define 3 objectives and 3 CSFs (linked)</mark>

Create:

- OBJ-1, OBJ-2, OBJ-3
- CSF-1, CSF-2, CSF-3 (each linked to one objective)

**Rule:** at least 2 of these must be variant-driven.

---

#### <mark style="color:$primary;">2) Map 3–5 requirements to each CSF</mark>

For each CSF:

- list 3–5 linked requirements (REQ-###) (Later on, we must represent them as <mark style="color:blue;">**FR**</mark>-### - for <mark style="color:blue;">Functional Requirements</mark> or <mark style="color:$success;">NFR</mark>-### - for <mark style="color:$success;">Non-Functional Requirements</mark>) - <mark style="color:yellow;">**REQ**</mark>-### is illustrative for the generic representation
- ensure the same links are included in REM entries (fields Objective + CSF)

---

#### <mark style="color:$primary;">3) Create REM v1 using the provided template (</mark><mark style="color:$primary;">`REM_v2.xlsx`</mark><mark style="color:$primary;">)</mark>

You must use the teacher’s template **REM_v2.xlsx** as your primary structure to fill each requirement.

**What to do (recommended workflow)**

1. Copy the template into your repo:
   - `/templates/REM_v2.xlsx` (original template)
   - `/docs/REM_v1.xlsx` (your filled version for this lab)
2. For at least **8 requirements**, fill the main fields in the template (one requirement per filled template copy or per structured block, depending on how you organize it).
3. Produce `docs/rem_v1.md` by copying the filled fields into a readable Markdown format (see template below).

**Minimum content per REM entry (must be present in rem_v1.md)**

- ID (REQ-###) + Title
- Stakeholder (Requisitante)
- Description
- Objective (why/result)
- Type (<mark style="color:blue;">**FR**</mark>**/**<mark style="color:$success;">**NFR**</mark>) and Priority (H/M/L) -&#x20;
- Objective + CSF linkage
- Acceptance criteria (draft)
- Validation method
- Variant impact (Yes/No)

> Note: Your REM_v2.xlsx template contains rich guidance text.\
> You don’t need to copy that guidance into your submission—only your filled values.

{% file src="<https://3063079335-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FWEbErO9VDTnrpTpr5nNO%2Fuploads%2FL85O3ClvZf9eeDYGQnuU%2FREM_v2.xlsx?alt=media&token=350b61e5-70cf-4894-a0c4-b553fd97648f>" %}

---

---

#### <mark style="color:$primary;">4) Preconditions and postconditions (≥ 3 FRs)</mark>

Select at least 3 functional requirements and add:

- Preconditions (what must be true before)
- Postconditions (what must be true after)

---

### <mark style="color:blue;">Submission / Deliverables</mark>

Commit/publish:

- `docs/objectives_fcs.md`
- `docs/rem_v1.md`
- (Recommended evidence) `docs/REM_v1.xlsx` (your filled REM template)

---

### <mark style="color:blue;">Acceptance criteria (delivery)</mark>

Your Lab 4 delivery is accepted when:

- ✅ `docs/objectives_fcs.md` contains:
  - **3 objectives**
  - **3 CSFs**
  - mapping to requirements (each CSF lists **3–5 REQ-###**)
- ✅ `docs/rem_v1.md` contains:
  - **≥ 8 complete REM entries** (filled values, based on REM_v2.xlsx fields)
- ✅ At least **3 functional requirements** include **preconditions and postconditions**
- ✅ Variant mechanism is visible:
  - ≥ 2 objectives/CSFs are clearly variant-driven
  - ≥ 3 REM entries have `Variant impact: Yes`

---

### <mark style="color:blue;">Acceptance Matrix (self-check)</mark>

#### <mark style="color:$primary;">A) Objectives & CSFs (objectives_fcs.md)</mark>

<table><thead><tr><th width="125">Check</th><th width="185">What to verify</th><th>Pass criteria</th></tr></thead><tbody><tr><td>A1</td><td>Objectives</td><td>Exactly <strong>3</strong> objectives, outcome-driven</td></tr><tr><td>A2</td><td>CSFs</td><td>Exactly <strong>3</strong> CSFs, each linked to an objective</td></tr><tr><td>A3</td><td>Mapping</td><td>Each CSF lists <strong>3–5 REQ-###</strong></td></tr><tr><td>A4</td><td>Variant alignment</td><td>≥ <strong>2</strong> objectives/CSFs are variant-driven</td></tr></tbody></table>

---

#### <mark style="color:$primary;">B) REM v1 (rem_v1.md)</mark>

<table><thead><tr><th width="94.4000244140625">Check</th><th width="188.79998779296875">What to verify</th><th>Pass criteria</th></tr></thead><tbody><tr><td>B1</td><td>Count</td><td><strong>≥ 8</strong> complete entries</td></tr><tr><td>B2</td><td>Completeness</td><td>Each entry includes: stakeholder, description, objective, AC, validation</td></tr><tr><td>B3</td><td>Linkage</td><td>Each entry includes <strong>Objective + CSF</strong></td></tr><tr><td>B4</td><td>Acceptance criteria</td><td>Each entry has <strong>≥ 2</strong> draft AC bullets</td></tr><tr><td>B5</td><td>Variant alignment</td><td>≥ <strong>3</strong> entries have <code>Variant impact: Yes</code></td></tr></tbody></table>

---

#### <mark style="color:$primary;">C) Preconditions/Postconditions</mark>

<table><thead><tr><th width="110">Check</th><th width="152">What to verify</th><th>Pass criteria</th></tr></thead><tbody><tr><td>C1</td><td>FR coverage</td><td>≥ <strong>3</strong> FRs include pre/post conditions</td></tr><tr><td>C2</td><td>Usefulness</td><td>Pre/post conditions support test design</td></tr></tbody></table>

---

### <mark style="color:blue;">Templates (copy/paste)</mark>

#### `docs/objectives_fcs.md` — template

```markdown
# Objectives & Critical Success Factors (CSFs) — Lab 4

## Variant

- Variant number:
- Persona:
- Key constraint focus:

---

## Objectives (3)

### OBJ-1 — <Objective title>

- Description (why/outcome): ...
- Stakeholders impacted: ...
- Success signal (how we know): ...
- Variant-driven: Yes/No

### OBJ-2 — <Objective title>

- Description: ...
- Stakeholders impacted: ...
- Success signal: ...
- Variant-driven: Yes/No

### OBJ-3 — <Objective title>

- Description: ...
- Stakeholders impacted: ...
- Success signal: ...
- Variant-driven: Yes/No

---
```
