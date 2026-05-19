# Matriz de Rastreabilidade Integrada (REQ → AC → TC/Cenário)

| ID REQ | Descrição Curta | Critérios de Aceitação (AC) | Validação (TC / Cenário BDD) |
| :--- | :--- | :--- | :--- |
| **REQ-001** | Validação de Campos Obrigatórios | **AC-1:** Validar Nome, Owner e Suporte no envio.<br>**AC-2:** Uso de `trim()` para rejeitar espaços vazios. | **TC-001, TC-011, TC-014** |
| **REQ-002** | Condicionalidade de DR | **AC-1:** Exibir e marcar data como obrigatória se DR=Sim.<br>**AC-2:** Bloquear envio se DR=Sim e data estiver vazia. | **TC-002** |
| **REQ-003** | Inconsistência Lógica de DR | **AC-1:** Desativar campo de data se DR=Não.<br>**AC-3:** Rejeitar via API se houver data com DR=Não. | **TC-003, TC-015, TC-018**<br>**SCEN-001:** Prevenir informações contraditórias de Disaster Recovery |
| **REQ-005** | Caducidade de Evidências | **AC-1:** Comparar data da evidência com `Date.now()`.<br>**AC-2:** Abortar upload se diferença > 365 dias. | **TC-004, TC-010** |
| **REQ-006** | Identificação de Owner | **AC-1:** Validar formato de e-mail corporativo.<br>**AC-2:** Rejeitar e-mails inexistentes no diretório (AD). | **TC-008, TC-009, TC-012** |
| **REQ-007** | Unicidade de Hostname | **AC-1:** Consulta API via `GET` no evento `onBlur`.<br>**AC-2:** Desativar botão se retornar `409 Conflict`. | **TC-005, TC-019**<br>**SCEN-003:** Detetar nome de ativo duplicado através da Base de Dados |
| **REQ-008** | Gestão de Estados (Draft) | **AC-1:** Ignorar validações lógicas ao guardar rascunho.<br>**AC-2:** Persistir dados com a flag `is_draft=True`. | **TC-006, TC-016**<br>**SCEN-002:** Permitir progresso parcial através do modo Rascunho (Draft) |
| **REQ-009** | Transição para "Ready" | **AC-1:** Exigir 0 erros lógicos para transição.<br>**AC-2:** Forçar reexecução total do motor na submissão. | **TC-002, TC-016, TC-017**<br>**SCEN-004:** Happy path — Submissão de inventário com dados consistentes e completos |
| **NFR-001** | Log de Auditoria | **AC-1:** Alterações a campos críticos geram log.<br>**AC-2:** Registo inclui UserID e Timestamp. | **TC-008, TC-020** |
| **NFR-002** | Performance (Variante 4) | **AC-1:** Processamento de regras abaixo de 500ms.<br>**AC-2:** Feedback visual em menos de 1s. | **TC-007, TC-013** |
