
# Asset Intake Form — Prototype Plan

A single-page form for a Data Steward tool, with strict reactive validation and two save modes (Draft / Final). Pure frontend, in-memory state.

## Layout & UX

Single centered card on a neutral background. Clean typography, clear field labels in Portuguese, helper text where useful, inline error messages in red beneath each field. A sticky footer-style action bar with the two buttons. A small "Estado atual" badge at the top right of the card showing `Vazio` / `Rascunho` / `Pronto`.

## Form fields (in order)

1. **Nome do Sistema** — text input (mandatory)
2. **Owner** — text input (mandatory)
3. **Criticidade de Negócio** — dropdown: Tier 1 / Tier 2 / Tier 3 (mandatory)
4. **Disaster Recovery Configurado?** — radio: Sim / Não
5. **RTO** + **RPO** — two side-by-side text/number inputs with unit hint (minutos)
6. **Data do Último Teste** — shadcn date picker (Popover + Calendar)
7. **Upload de Evidência** — mock file picker: shows filename + a required "Data de Criação do Ficheiro" date picker to simulate metadata extraction. Includes a "Remover" button.

## Validation engine (reactive)

Validations run:
- **On blur** for individual mandatory fields (REQ-001)
- **On change** for cross-field rules (so errors clear/appear as the user fixes them)
- **On submit** for the full ruleset

Rules implemented:
- **REQ-001**: Nome, Owner, Criticidade required → "Campo obrigatório"
- **REQ-002**: DR = Sim → Data do Último Teste required → "Data do último teste é obrigatória quando DR está configurado"
- **REQ-003**: DR = Não + date present → "Não pode haver data de teste se não há DR configurado"
- **Tier 1/2 RTO/RPO**: empty → "RTO/RPO obrigatório para Tier 1/2"; value matching `/^\s*n\.?\/?a\.?\s*$/i` → "Valor 'N/A' não é permitido"
- **REQ-004**: evidence creation date > 365 days old → "Evidência expirada (>1 ano)" (blocks the file; field shown in error state)

## Buttons & state machine

In-memory state shape:
```
{ status: 'empty' | 'draft' | 'ready', data: {...}, errors: {...} }
```

- **Guardar Rascunho** → bypasses all rules, sets `status = 'draft'`, fires sonner success toast "Rascunho guardado". Errors panel cleared.
- **Submeter Final** → runs full validation. If clean: `status = 'ready'`, success toast "Submissão final registada". If not: shows a top-of-card error summary listing every failing field (clickable to scroll/focus), individual fields highlighted, submission aborted, no toast.

## Visual polish

- Tailwind + shadcn primitives (Input, Select, RadioGroup, Calendar, Popover, Button, Label, Card, Badge, Alert for error summary).
- Error states use `border-destructive` + `text-destructive` helper text.
- Status badge uses neutral / amber / green tones.
- Fully responsive (single column on mobile, two-column for RTO/RPO on ≥sm).

## Out of scope (guardrails honored)

No auth, no routing beyond `/`, no dashboard, no backend, no persistence beyond React state.
