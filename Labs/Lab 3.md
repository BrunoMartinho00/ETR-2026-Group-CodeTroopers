# Lab 3 — Requirements v1 (IDs + Structure) + NFRs + Requirements Map (Variant-driven)

---

**Input:** `docs/requirements_v0.md` + `docs/variant_assignment.md`\
**Output:** `docs/requirements_v1.md`, `docs/requirements_map.md`

This lab upgrades your Requirements v0 into **Requirements v1** with stable IDs and consistent structure.\
You will also create measurable NFRs and a requirements map by epic/functional area.

> **Important (anti-copy rule):** If using AMS as domain reference, you must not copy existing requirements/user stories/AC text from AMS pages. Your Requirements v1 must reflect your assigned **variant** and be written in **your own wording (paraphrased)**.

> **GitHub rule:** All deliverables must be committed to your **team GitHub repository** under the exact paths listed below. If it is not in the repo, it is not considered delivered.

---

### <mark style="color:blue;">Objectives</mark>

By the end of Lab 3, your team will:

- Assign stable IDs (REQ-###) and group requirements into epics/areas
- Detail at least 6 key requirements (description + objective + draft AC)
- Create at least 6 NFRs and make at least 3 measurable
- Produce a requirements map (epic → REQ list)
- Demonstrate variant alignment in your requirements

---

### <mark style="color:blue;">Tools (examples)</mark>

You may represent requirements using:

- Azure DevOps (work items/backlog)
- Trello (boards/cards)
- Notion (pages/databases, optional)
- Other (if your team uses another tool)

---

### <mark style="color:blue;">Variant mechanism (mandatory)</mark>

Your Requirements v1 must include:

- ≥ 5 requirements clearly influenced by your variant **OR**
- ≥ 3 requirements + ≥ 2 NFRs clearly influenced by your variant

Mark them explicitly with a field: `Variant impact: Yes`.

---

### <mark style="color:blue;">AMS context (scope guidance)</mark>

You are structuring requirements for the **AMS platform — Intake & Discovery slice**.\
Keep scope realistic: focus on what must be collected, validated, and traceable for a transition to succeed.

Suggested epic/area examples (you may rename):

-

---

### <mark style="color:blue;">In-class tasks (step by step)</mark>

#### <mark style="color:$primary;">1) Assign IDs and group into epics/areas</mark>

From requirements v0:

- Create stable IDs: REQ-001, REQ-002, ...
- Define 1-2 epics/areas.
- Assign each REQ to an epic/area
- Rule: IDs are stable from now on. Don’t renumber later.

---

#### <mark style="color:$primary;">2) Detail the 6 most important requirements</mark>

Select 6 key requirements and complete:

- Description (testable)
- Objective (why/value)
- Acceptance criteria (draft, 2–4 bullets)
- Variant impact (Yes/No)

---

#### <mark style="color:$primary;">3) Identify NFRs (≥ 6) and make 3 measurable</mark>

Write ≥ 6 NFRs total.

Make ≥ 3 measurable by adding:

- metric + threshold
- conditions (load/usage context, e.g., “under normal load”, “for 95% requests”)
- measurement approach

Examples:

- Performance: “≤ 2 seconds for 95% requests under normal load”
- Availability: “99% monthly uptime”
- Auditability: “store audit logs for 12 months”
- Privacy: “delete/anonymize after X days”

Avoid vague words: fast, secure, easy, robust. Replace with measurable or verifiable statements.

**Variant rule:** at least 2 NFRs should reflect your variant focus whenever applicable (performance, GDPR, audit, security, etc.).

---

#### <mark style="color:$primary;">4) Create the Requirements Map (epic → requirements)</mark>

Create a map that lists each epic/area and the requirements that belong to it:

- EPIC-1: REQ-001, REQ-005, ...
- EPIC-2: ...

This map will be used later for traceability and to ensure coverage across the scope.

---

### <mark style="color:blue;">Submission / Deliverables</mark>

Commit to your team GitHub repository:

- `docs/requirements_v1.md`
- `docs/requirements_map.md`

---

### <mark style="color:blue;">Acceptance criteria (delivery)</mark>

- ✅ `docs/requirements_v1.md` includes:
  - stable IDs (REQ-###)
  - ≥ 6 detailed requirements (description + objective + draft AC)
- ✅ There are ≥ 6 NFRs and ≥ 3 are measurable
- ✅ `docs/requirements_map.md` links epics/areas to REQ-###
- ✅ Variant mechanism is visible:
  - 5 requirements variant-influenced OR 3 requirements + 2 NFRs variant-influenced
- ✅ All deliverables are committed under the correct paths

---

#### <mark style="color:$primary;">Requirements Map template</mark>

➡️ Use this template: [**Requirements Map — Lab 3**](https://ulht-jcb.gitbook.io/requirements-engineering-and-testing/lab-3/lab-3-requirements-v1-ids-+-structure-+-nfrs-+-requirements-map-variant-driven/requirements-map-lab-3)

---
