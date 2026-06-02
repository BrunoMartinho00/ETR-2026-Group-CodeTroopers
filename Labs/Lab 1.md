# Lab 1 — Kickoff + Role Play + Project Setup

**Date:** 2026-02-09 (adjust if needed)\
**Format:** Group work (3–4 students) + short role play

This lab is the practical kickoff. You will form teams, run a short **Client ↔ DevTeam role play**, choose your project baseline, define the functional slice, and set up the repository structure you will use throughout the semester.

---

### Observations / Tools (from the official plan)

- Role Play: groups of 3–4
- Role Play topic:
  - If using **AMS baseline**: interview is about your **chosen slice** and must reflect your **assigned variant** (persona/constraints/workflow).
  - If using **your own project**: interview is about your project slice.

---

### Objectives

By the end of Lab 1, you should be able to:

- Understand the practical goals of the course (**Requirements + Testing**) and what will be evaluated.
- Choose your product/project:
  - **Option A:** AMS (recommended baseline), or
  - **Option B:** your 1st semester project (only if it meets the approval checklist)
- Define a mandatory functional slice (e.g., **Intake & Discovery**).
- Create a working setup: repository + documentation structure + collaboration rules.

---

### In-class tasks (step by step)

#### 1) Form your team (3–4)

- Pick a **team name**
- Assign rotating roles (you will rotate them every lab):
  - **Facilitator** (keeps time and focus)
  - **Scribe** (updates GitBook/docs)
  - **Reviewer** (checks quality)
  - **Tester** (makes sure tests run)

> Tip: write roles in your README so you can rotate every week.

---

#### 2) Choose the project

Pick one:

**Option A — AMS baseline (recommended)**

Use the course baseline case study.

**Option B — Your own project (1st semester)**

Allowed only if it meets the minimum checklist:

- 2–3 clear user flows
- testable acceptance criteria
- enough scope for requirements + tests (unit + BDD)
- not overly UI-heavy or tool-dependent for your current skill level

> **Important (AMS baseline):** AMS GitBook is a domain reference.\
> Do not copy existing user stories/requirements/acceptance criteria text. Your work must reflect your assigned variant.

---

#### 3) Define the mandatory slice

Choose one functional slice (common examples):

- **Intake & Discovery**
- Data capture + validation
- Missing information handling
- Evidence/consistency checks
- “Ready to proceed” vs “Need more data” decision

Write:

- **1 paragraph** vision
- **3 objectives**
- **3 non-objectives** (what is explicitly out of scope)

(AMS baseline only) Record your variant assignment

- Create `docs/variant_assignment.md` with:
  - Variant number
  - Persona
  - Key constraint focus
  - Slice
- `docs/variant_assignment.md` (AMS baseline only)

---

#### 4) Create an initial glossary (10–15 terms)

Create a shared domain vocabulary. Examples (adapt to your project):

- Intake, Evidence, Validation, Stakeholder, Assumption, Requirement, User story, Acceptance criteria, Use case, Test case, etc.

Each term must include a short definition (1–2 lines).

---

#### 5) Create the repository structure

Create these folders at the repo root:

- `/docs` — requirements & documentation artifacts
- `/tests` — automated tests (PyTest or JUnit)
- `/bdd` — BDD features and step definitions
- `/templates` — copy/paste templates (REM, test cases, etc.)

Also create a `README.md` with:

- team name and members
- chosen stack (PyTest/JUnit)
- how to run tests (placeholder is OK in Lab 1)
- link to GitBook (if available)

### Team GitHub Repository (mandatory)

All teams must create a **single GitHub repository** for the group and store **all lab outputs** there (docs + tests + templates).

This ensures:

- one shared source of truth
- easy review and grading
- traceability from requirements → tests → evidence

#### What to write in your repo (project choice)

In your `README.md`, include your project option:

- **Option A (recommended):** _Use the course baseline case study (AMS)_
- **Option B:** _Use our own project (approved)_

If you choose **Option A**, explicitly write:\
\&#xNAN;**“Use the course baseline case study.”**

---

### Step-by-step (GitHub)

#### 1) Create the repository

1. One student creates a GitHub repo named like:\
   `ETR-2026-Group-<name>`
2. Set visibility according to your teacher’s instructions (usually **private**).
3. Add a short description (e.g., “Requirements Engineering & Testing — Labs 2026”).

#### 2) Add collaborators

1. Go to **Settings → Collaborators** (or **Manage access**).
2. Invite all team members.
3. Make sure everyone accepts the invitation.

#### 3) Create the initial structure

Create these folders at the repo root:

- `/docs` (requirements, REM, objectives, glossary, notes)
- `/tests` (PyTest/JUnit automated tests)
- `/bdd` (features + step definitions if using BDD)
- `/templates` (REM_v2.xlsx, test templates, etc.)

Add a `README.md` with:

- team name + members
- chosen track (PyTest or JUnit)
- chosen project option (A or B)
- how to run tests (can be “TBD” in Lab 1, but must exist)

#### 4) Put every lab output in the repo

For each lab:

- commit the deliverables exactly as requested (file names and paths matter)
- push changes to GitHub
- keep your history clean (small commits with meaningful messages)

> <mark style="color:yellow;">Rule:</mark> if it’s not submitted in the Moodle entry and in the GitHub repo, it is not considered delivered.

---

### GitHub tutorials (official)

If you need help, use GitHub’s official guides:

- **Create a repository**
- **Add collaborators**
- **Clone a repository**
- **Commit and push changes**

(Teacher note: you may also use GitHub Desktop if you prefer a GUI.)

---

### Role Play (10–15 minutes)

Pair up with another team:

- Team A plays **Client**
- Team B plays **DevTeam**

**Client:** explains the theme/project and what they need\
**DevTeam:** asks clarification questions (focus on _what_ is needed, not _how_ to implement)

#### Output to capture (Scribe)

- 8–10 key questions asked by the DevTeam
- the Client’s answers (or assumptions if unknown)
- 3 “open questions” to clarify later

---

### Submission / Deliverables for this Lab

Upload or commit:

- `docs/vision.md`
  - 1-paragraph **vision**
  - 3 **objectives**
  - 3 **non-objectives**
- `docs/glossary.md`
  - **10–15 domain terms** with short definitions
- Initial repository structure and `README.md`
  - folders: `/docs`, `/tests`, `/bdd`, `/templates`
  - README with basic instructions and team info

---

### Acceptance criteria (delivery)

Your Lab 1 delivery is accepted when:

- ✅ `docs/vision.md` exists and includes:
  - 1 paragraph vision
  - 3 objectives
  - 3 non-objectives
- ✅ `docs/glossary.md` exists with **10–15 terms** and definitions
- ✅ Repository includes:
  - `/docs`, `/tests`, `/bdd`, `/templates`
  - `README.md` with basic instructions and team information

---

### Templates (copy/paste)

#### `docs/vision.md`

```markdown
# Vision

<Write 1 paragraph describing the product and the value it pro
```
