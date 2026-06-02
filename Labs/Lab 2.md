# Lab 2 — Elicitation Role Play + Requirements v0 (Variant-driven)

**Input:** Lab 1 team repo + your Variant Assignment\
**Output:** `docs/variant_assignment.md`, `docs/elicitation_notes.md`, `docs/requirements_v0.md`

This lab turns Lesson 2 into practice using the **AMS case study** as the baseline project domain: **AMS Project Management Platform with Intelligent Interface & AI Engine**.

You will run a short elicitation interview, capture raw needs, convert them into structured requirements, and rewrite ambiguity into verifiable statements.

> **Important (anti-copy rule):** You may use the AMS GitBook for domain understanding and workflows.\
> You must **not copy** existing user stories, requirements, or acceptance criteria text from AMS pages.\
> Your requirements must reflect your assigned **variant** (persona/constraints/workflow) and be written in **your own wording (paraphrased)**.

> **GitHub rule:** All deliverables must be committed to your **team GitHub repository** under the exact paths listed below.\
> If it is not in the repo, it is not considered delivered.

---

### <mark style="color:$primary;">Objectives</mark>

By the end of Lab 2, your team should be able to:

- Perform a short elicitation interview (Client ↔ DevTeam)
- Produce a raw needs list (≥ 15 items)
- Convert needs into **requirements v0** (≥ 10) with:
  - Type (FR/NFR), Stakeholder, Priority (H/M/L)
- Rewrite at least **5 ambiguous requirements** into verifiable/testable ones
- Record assumptions and open questions (variant-relevant)

---

#### <mark style="color:$primary;">Tools (examples)</mark>

- Azure DevOps (work items/backlog)

{% embed url="<https://dev.azure.com/>" %}

- Trello (boards/cards)

{% embed url="<https://trello.com>" %}

- Notion (pages/databases, optional)

{% embed url="<https://www.notion.com/>" %}

- Other (if your team uses another tool)

---

### <mark style="color:blue;">Variant mechanism (mandatory)</mark>

#### <mark style="color:$primary;">1) Record your variant</mark>

Your variant is assigned by the teacher (or by random draw in class). Do not change it unless instructed.

<mark style="color:yellow;">Create</mark> `docs/variant_assignment.md` using the template below and keep it unchanged unless the teacher updates your variant.

#### <mark style="color:$primary;">2) Variant proof rule</mark>

Your submission must contain:

- at least **3 requirements** clearly driven by your variant
- at least **2 open questions** related to your variant focus

If your deliverables do not show the variant, they may be returned for revision.

---

### <mark style="color:blue;">AMS context for this lab</mark>&#x20;

You are eliciting requirements for the **Intake & Discovery** slice of the AMS platform:

- what information must be collected (observability, DR/BCP, access, integrations, support model)
- who provides it (stakeholders)
- how to write requirements clearly and testably (avoid ambiguity)
- evidence-first thinking: what counts as proof and who owns it (links, sources, documents)

You are not implementing everything now — you are producing a clear Requirements v0 baseline.

---

### <mark style="color:blue;">In-class tasks (step by step)</mark>

{% hint style="info" %} <mark style="color:yellow;">**Note:**</mark> Carnival is **2026-02-17** (Tuesday - for the affected Shifts, we will have to plan a replacement lesson).
{% endhint %}

#### <mark style="color:$primary;">1) Role play interview (10–12 minutes)</mark>

Pair with another team:

- Team A = <mark style="color:green;">Client</mark> (AMS Transition Lead / Stakeholder)
- Team B = <mark style="color:orange;">DevTeam</mark> (Analysts/Engineers)

<mark style="color:green;">**Client responsibilities (AMS specific)**</mark>

- Describe the scenario using these “context anchors”:
  - Sector (e.g., Healthcare / BFSI / Retail / Other)
  - Solution type (ERP/CRM/Custom/Data)
  - Support model (L1/L2/L3 + service window + languages)
- Explain where transitions fail today (missing monitoring/DR/access/integrations, etc.)
- Provide realistic examples and edge cases
- Emphasize variant constraints (audit/privacy/security/performance/etc.)

<mark style="color:orange;">**DevTeam responsibilities**</mark>

- Ask questions focused on **WHAT** is needed (not HOW)
- Include at least **3 variant-specific** questions (e.g., audit trail, GDPR retention, performance targets, RBAC)
- Include at least **3 “evidence-first”** questions:
  - “What evidence proves this is true?”
  - “How fresh must this information be?”
  - “Who is the source/owner?”

<mark style="color:yellow;">**Scribe output**</mark>

- ≥ 10 Q/A items
- Tag at least 3 Q/A entries as **\[Variant]**
- Tag at least 3 Q/A entries as **\[Evidence]**

---

#### <mark style="color:$primary;">2) Create a raw needs list (minimum 15)</mark>

Write ≥ 15 raw needs in plain language based on the interview.

**Rule:** at least **5 needs** must relate to the assigned variant focus.

Tip: Needs can include:

- “We need to know which dashboards exist and who owns them”
- “We need to detect missing DR test date”
- “We need recommendations when evidence is missing” (You will convert these into requirements next.)

---

#### <mark style="color:$primary;">3) Convert 10 needs into structured requirements (v0)</mark>

Convert ≥ 10 needs into requirements (complete sentences).

For each requirement include:

- Type: FR / NFR
- Stakeholder (role/persona)
- Priority: H / M / L

**Rule:** at least **3 requirements** must be variant-specific.

---

#### <mark style="color:$primary;">4) Rewrite 5 ambiguous requirements into verifiable ones</mark>

Select 5 ambiguous statements and rewrite them.

**Rule:** at least **2 rewrites** must use your variant constraints.

**Examples:**

- Performance variant → measurable response time under conditions
- GDPR variant → retention/anonymization timeframe + scope
- Security variant → RBAC + unauthorized attempt handling
- Audit variant → change log fields (who/when/what)

---

#### <mark style="color:$primary;">5) Record assumptions and open questions</mark>

Capture:

- Assumptions (≥ 3)
- Open questions (≥ 3)

**Rule:** at least **2 open questions** must be variant-related.

---

### <mark style="color:blue;">Submission / Deliverables</mark>

Commit to your **team GitHub repository**:

- `docs/variant_assignment.md`
- `docs/elicitation_notes.md`
- `docs/requirements_v0.md`

---

### <mark style="color:blue;">Acceptance criteria (delivery)</mark>

Your Lab 2 delivery is accepted when:

- ✅ `docs/variant_assignment.md` exists and matches the assigned variant
- ✅ `docs/elicitation_notes.md` includes:
  - ≥ 10 questions + answers
  - assumptions + open questions
  - at least 3 items tagged **\[Variant]**
  - at least 3 items tagged **\[Evidence]**
- ✅ `docs/requirements_v0.md` contains:
  - ≥ 10 requirements with type (FR/NFR), stakeholder, priority
  - at least 3 requirements clearly **variant-specific**
- ✅ At least 5 requirements were rewritten into verifiable/testable ones
  - at least 2 rewrites explicitly reflect the variant focus
- ✅ All deliverables are committed to GitHub under the correct paths

---

### <mark style="color:blue;">Templates for GitHub (copy/paste)</mark>

#### <mark style="color:yellow;">`docs/variant_assignment.md`</mark>

```markdown
# Variant Assignment — Team <NAME>

- Variant number: <1–10>
- Primary persona: <...>
- Key constraint focus: <...>
- Mandatory slice: Intake & Discovery (AMS)

## Variant-driven expectations (minimum)

- 3+ requirements must reflect the variant
- 2+ open questions must reflect the variant
```

#### <mark style="color:yellow;">`docs/elicitation_notes.md`</mark>

```markdown
# Elicitation Notes — Lab 2 (AMS)

## Interview setup

- Date:
- Client team:
- DevTeam:
- Slice discussed: Intake & Discovery (AMS)
- Variant:

## Context anchors (AMS)

- Sector:
- Solution type:
- Support model (L1/L2/L3 + hours + languages):
- Key transition pain points (summary):

## Questions & Answers (min. 10)

1. Q: ...
   A: ...
2. [Evidence] Q: What evidence supports this?
   A: ...
3. [Variant] Q: ...
   A: ...
   ...

## Assumptions (min. 3)

- A1: ...
- A2: ...
- A3: ...

## Open questions (min. 3)

- Q1: ...
- Q2: ...
- Q3: ...

## Variant notes (required)

- How did the variant change our elicitation focus?
  - ...
```

#### <mark style="color:yellow;">`docs/requirements_v0.md`</mark>

```markdown
# Requirements v0 — Lab 2 (AMS)

| Item | Requirement          | Type | Stakeholder | Priority | Variant? |
| ---: | -------------------- | ---- | ----------- | -------- | -------- |
|    1 | The system shall ... | FR   | ...         | H        | Yes/No   |
|    2 | The system shall ... | NFR  | ...         | M        | Yes/No   |
|    3 | The system shall ... | FR   | ...         | H        | Yes/No   |
|  ... | ...                  | ...  | ...         | ...      | ...      |

## Ambiguity rewrite (min. 5)

1. Original: "..."
   Rewritten: "..."

2. Original: "..."
   Rewritten: "..."
```
