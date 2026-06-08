# Test Plan — Lab 10

## 1) Scope
- **Slice covered:** Intake & Discovery (AMS).
- **Out of scope:** Integrações reais com sistemas de inventário externos (serão usados Mocks), configuração de infraestrutura de produção e autenticação Single Sign-On (SSO).

## 2) Test strategy (static + dynamic)
### Static testing (reviews)
- **What we review:** Requisitos Funcionais (REQ-001 a REQ-009), Requisitos Não Funcionais (NFR-001 e NFR-002) e Critérios de Aceitação (AC).
- **Review checklist:**
  - Os requisitos são testáveis e não ambíguos?
  - Todos os critérios de aceitação têm um teste associado?
  - As regras de integridade da Variante 4 estão cobertas por casos negativos?

### Dynamic testing (planned execution)
| Level | What we test | Examples | Evidence |
|---|---|---|---|
| Unit | Pequena lógica e regras de validação | Validação de `trim()` (REQ-001) e cálculo de 365 dias (REQ-005) | Logs de execução de Testes Unitários |
| Integration | Interações entre componentes e APIs | Verificação de unicidade de Hostname via API (REQ-007) | Logs de resposta da API (ex: 409 Conflict) |
| System | Slice completo de ponta-a-ponta | Fluxo completo desde a entrada de dados até ao estado "Ready" | Notas de execução manual e capturas de ecrã |
| Acceptance (BDD) | Comportamento vs AC | Cenários de inconsistência de DR e modo Rascunho | Relatórios de execução de ficheiros .feature |

## 3) TDD plan (at least 2 candidates)
- **Candidate 1 (rule/REQ):** REQ-003 — Deteção de Inconsistência de DR (Bloqueio se DR=Não mas existe data).
- **Candidate 2 (rule/REQ):** REQ-005 — Validação de Caducidade de Evidências (Cálculo de 365 dias).
- **Why TDD is suitable:** São regras de lógica pura e determinística. Escrever o teste antes permite garantir que o motor de regras de qualidade de dados (Variante 4) funciona corretamente antes mesmo da interface estar pronta.

## 4) BDD plan (what behaviors become scenarios)
- **Feature(s):** Gatekeeper de Qualidade e Consistência de Dados (Variante 4).
- **Scenarios:**
  - Prevenir informações contraditórias de Disaster Recovery.
  - Permitir progresso parcial através do modo Rascunho (Draft).
  - Detetar nome de ativo duplicado.
  - Happy path — Submissão de inventário com dados consistentes e completos.
- **Links to REQs:** REQ-003, REQ-007, REQ-008, REQ-009.

## 5) Coverage goals
- **Happy path:** Submissão de um ativo com todos os campos válidos e consistentes.
- **Alternative flows:** Guardar rascunho com dados incompletos para finalização posterior (REQ-008).
- **Negative/error tests:** Tentativa de submeter dados contraditórios de DR ou Hostname já existente (REQ-003, REQ-007).
- **Boundary tests:** Validação de evidência com exatamente 365 dias (aceite) e 366 dias (rejeitada) (REQ-005).

## 6) NFR validation approach
- **NFR-001 (Audit Log):**
  - **How we verify:** Revisão de base de dados após alteração de campos críticos para confirmar a criação de registos imutáveis (TC-008).
- **NFR-002 (Performance):**
  - **How we verify:** Medição do tempo de resposta do motor de regras durante a submissão, garantindo que o processamento ocorre em < 500ms (TC-007).

## 7) Evidence recording and responsibilities
- **Where results are stored (repo paths):** `docs/test_cases.md`, `bdd/features/lab9.feature`, `docs/test_execution.md`, `docs/unit_test_report.md` e `docs/bdd_report.md`.
- **Who maintains traceability:** QA Lead e Data Steward da equipa CodeTroopers.
- **How updates are tracked:** Através do histórico de commits no GitHub e atualização da matriz de rastreabilidade (`docs/traceability_req_ac_tc.md`).
