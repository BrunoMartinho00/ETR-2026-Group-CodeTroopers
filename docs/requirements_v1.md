# Requisitos v1 — Equipa CodeTroopers

**Slice:** Intake & Discovery (AMS)  
**Variante:** 4 — Qualidade e Consistência de Dados (Data Steward)

## 1. Objetivos e Cadeia de Valor
* **OBJ-1: Garantir a integridade e consistência dos dados de inventário.**
* **OBJ-2: Assegurar a rastreabilidade e auditoria do processo de Intake.**

---

## 2. Requisitos Funcionais (FR)

### REQ-001: Validação de Campos Obrigatórios
* **Type:** FR
* **Fonte / Stakeholder:** Data Steward / Transition Lead
* **Prioridade:** Alta (H)
* **Objective:** OBJ-1 — Garantir a integridade e consistência dos dados de inventário.
* **CSF/FCS:** FCS-1 — Dados de inventário são consistentes, únicos e validados antes do estado operacional.
* **Descrição:** O sistema deve impedir a submissão final de um formulário de Intake quando os campos obrigatórios "Nome do Sistema", "Owner" ou "Modelo de Suporte" estiverem vazios.
* **Impacto da Variante:** Yes
* **Critérios de Aceitação (draft):**
  - Se um campo obrigatório estiver vazio, a submissão final é bloqueada.
  - O estado do Intake permanece "Incomplete".
  - O sistema indica quais os campos obrigatórios em falta.

### REQ-002: Condicionalidade de Teste de Disaster Recovery (DR)
* **Type:** FR
* **Fonte / Stakeholder:** Data Steward / Auditor
* **Prioridade:** Alta (H)
* **Objective:** OBJ-1 — Garantir a integridade e consistência dos dados de inventário.
* **CSF/FCS:** FCS-1 — Dados de inventário são consistentes, únicos e validados antes do estado operacional.
* **Descrição:** O sistema deve exigir uma data válida no campo "Data do Último Teste de DR" quando "Disaster Recovery" estiver marcado como "Sim".
* **Impacto da Variante:** Yes
* **Critérios de Aceitação (draft):**
  - Se DR = "Sim" e a data de teste estiver vazia, a submissão final é bloqueada.
  - Se DR = "Sim" e a data for válida, a validação desta regra passa.
  - A data de teste não pode estar no futuro.

### REQ-003: Deteção de Inconsistência de DR
* **Type:** FR
* **Fonte / Stakeholder:** Data Steward
* **Prioridade:** Alta (H)
* **Objective:** OBJ-1 — Garantir a integridade e consistência dos dados de inventário.
* **CSF/FCS:** FCS-1 — Dados de inventário são consistentes, únicos e validados antes do estado operacional.
* **Descrição:** O sistema deve bloquear a transição para "Ready to Proceed" quando "Disaster Recovery" estiver marcado como "Não" e existir uma data de teste de DR preenchida.
* **Impacto da Variante:** Yes
* **Critérios de Aceitação (draft):**
  - Se DR = "Não" e existir data de teste, o Intake é marcado como "Inconsistent".
  - O estado "Ready to Proceed" fica indisponível até a inconsistência ser corrigida.
  - Se a data for removida, a regra deixa de falhar.

### REQ-004: Evidência de Observabilidade
* **Type:** FR
* **Fonte / Stakeholder:** Transition Lead
* **Prioridade:** Média (M)
* **Objective:** OBJ-1 — Garantir a integridade e consistência dos dados de inventário.
* **CSF/FCS:** FCS-1 — Dados de inventário são consistentes, únicos e validados antes do estado operacional.
* **Descrição:** O sistema deve exigir um URL HTTPS válido para o dashboard de monitorização associado ao sistema em transição.
* **Impacto da Variante:** No
* **Critérios de Aceitação (draft):**
  - URLs que não começam por `https://` são rejeitados.
  - URLs sem domínio válido são rejeitados.
  - Um URL HTTPS com domínio válido é aceite.

### REQ-005: Validação de Caducidade de Evidências
* **Type:** FR
* **Fonte / Stakeholder:** Data Steward / Transition Lead
* **Prioridade:** Alta (H)
* **Objective:** OBJ-1 — Garantir a integridade e consistência dos dados de inventário.
* **CSF/FCS:** FCS-1 — Dados de inventário são consistentes, únicos e validados antes do estado operacional.
* **Descrição:** O sistema deve rejeitar evidências operacionais cuja data seja superior a 12 meses em relação à data de validação.
* **Impacto da Variante:** Yes
* **Critérios de Aceitação (draft):**
  - Evidências com 12 meses ou menos são aceites.
  - Evidências com mais de 12 meses são rejeitadas.
  - Evidências com data futura são rejeitadas.

### REQ-006: Identificação de Owner em Integrações
* **Type:** FR
* **Fonte / Stakeholder:** Transition Lead
* **Prioridade:** Média (M)
* **Objective:** OBJ-2 — Assegurar a rastreabilidade e auditabilidade do processo de Intake.
* **CSF/FCS:** FCS-2 — Alterações a dados críticos e responsabilidades são totalmente rastreáveis.
* **Descrição:** O sistema deve exigir que cada integração declarada no Intake tenha um owner identificado por ID de utilizador ou email válido.
* **Impacto da Variante:** No
* **Critérios de Aceitação (draft):**
  - Uma integração sem owner é rejeitada na submissão final.
  - Um email de owner deve ter formato válido.
  - Um ID de utilizador não pode estar vazio.

### REQ-007: Prevenção de Duplicados
* **Type:** FR
* **Fonte / Stakeholder:** Data Steward
* **Prioridade:** Alta (H)
* **Objective:** OBJ-1 — Garantir a integridade e consistência dos dados de inventário.
* **CSF/FCS:** FCS-1 — Dados de inventário são consistentes, únicos e validados antes do estado operacional.
* **Descrição:** O sistema deve impedir a criação de um novo registo quando o hostname informado já existir na base ativa de sistemas.
* **Impacto da Variante:** Yes
* **Critérios de Aceitação (draft):**
  - Se o hostname já existir, a criação do registo é bloqueada.
  - A validação ignora diferenças de maiúsculas/minúsculas.
  - Hostnames únicos são aceites.

### REQ-008: Gestão de Estados Draft
* **Type:** FR
* **Fonte / Stakeholder:** Transition Lead
* **Prioridade:** Média (M)
* **Objective:** OBJ-3 — Otimizar a eficiência operacional e resiliência do sistema.
* **CSF/FCS:** FCS-3 — O sistema fornece feedback imediato, é fiável e permite fluxos de trabalho flexíveis.
* **Descrição:** O sistema deve permitir guardar um Intake como "Draft" sem executar as validações cruzadas obrigatórias da submissão final.
* **Impacto da Variante:** Yes
* **Critérios de Aceitação (draft):**
  - Um formulário incompleto pode ser guardado como "Draft".
  - Um "Draft" não pode ser marcado como "Ready to Proceed".
  - As validações cruzadas obrigatórias são executadas apenas na submissão final.

### REQ-009: Transição para Ready to Proceed
* **Type:** FR
* **Fonte / Stakeholder:** Data Steward
* **Prioridade:** Alta (H)
* **Objective:** OBJ-1 — Garantir a integridade e consistência dos dados de inventário.
* **CSF/FCS:** FCS-1 — Dados de inventário são consistentes, únicos e validados antes do estado operacional.
* **Descrição:** O sistema deve permitir a transição para "Ready to Proceed" apenas quando todas as validações obrigatórias e regras de consistência forem concluídas com sucesso.
* **Impacto da Variante:** Yes
* **Critérios de Aceitação (draft):**
  - Se qualquer validação obrigatória falhar, a transição é bloqueada.
  - Se todas as validações passarem, o Intake pode passar para "Ready to Proceed".
  - O estado final não pode conter inconsistências conhecidas.

---

## 3. Requisitos Não Funcionais (NFR)

### NFR-001: Log de Auditoria
* **Type:** NFR
* **Descrição:** O sistema deve registar alterações em campos críticos, incluindo UserID, timestamp, valor anterior e valor novo.
* **Métrica / Threshold:** 100% das alterações em campos críticos devem gerar registo de auditoria.
* **Condições:** Durante criação, edição ou submissão final de Intake.
* **Measurement approach:** Revisão dos logs gerados após alteração de campos críticos.
* **Impacto da Variante:** No

### NFR-002: Performance de Validação
* **Type:** NFR
* **Descrição:** O sistema deve executar validações cruzadas sem atrasar significativamente a submissão do Intake.
* **Métrica / Threshold:** Resposta inferior a 500ms para 95% dos pedidos de validação cruzada.
* **Condições:** Sob carga normal de utilização.
* **Measurement approach:** Medição automática do tempo de execução dos testes de validação.
* **Impacto da Variante:** Yes

### NFR-003: Disponibilidade
* **Type:** NFR
* **Descrição:** O serviço de validação deve estar disponível durante o período normal de operação.
* **Métrica / Threshold:** Uptime mensal mínimo de 99.9%.
* **Condições:** Durante horário laboral e janelas de suporte acordadas.
* **Measurement approach:** Monitorização de disponibilidade mensal.
* **Impacto da Variante:** No

### NFR-004: Qualidade de Dados Garantida
* **Type:** NFR
* **Descrição:** O sistema deve garantir que apenas Intakes sem inconsistências conhecidas chegam ao estado "Ready to Proceed".
* **Métrica / Threshold:** 100% dos Intakes em "Ready to Proceed" devem cumprir as regras de consistência definidas.
* **Condições:** Antes da transição para estado final.
* **Measurement approach:** Execução de testes de validação e revisão da matriz de regras.
* **Impacto da Variante:** Yes

### NFR-005: Tempo de Resposta da UI
* **Type:** NFR
* **Descrição:** O sistema deve apresentar feedback visual rapidamente quando uma validação falhar.
* **Métrica / Threshold:** Mensagem ou indicação visual de erro em menos de 1 segundo após falha de validação.
* **Condições:** Durante edição ou submissão do formulário.
* **Measurement approach:** Teste manual ou automatizado do tempo entre falha e apresentação do erro.
* **Impacto da Variante:** Yes

### NFR-006: Retenção de Logs
* **Type:** NFR
* **Descrição:** O sistema deve manter logs de auditoria para permitir rastreabilidade posterior.
* **Métrica / Threshold:** Logs de auditoria retidos por pelo menos 12 meses.
* **Condições:** Para eventos de criação, alteração e submissão final.
* **Measurement approach:** Revisão da política de retenção e consulta de logs históricos.
* **Impacto da Variante:** No