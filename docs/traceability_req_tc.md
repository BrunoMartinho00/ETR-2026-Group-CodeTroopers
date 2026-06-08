# Matriz de Rastreabilidade — Requisitos vs Casos de Teste (Lab 9)

Este documento estabelece a ligação entre os Requisitos Funcionais (FR) e Não Funcionais (NFR) definidos no REM v1 e os Casos de Teste (TC) desenhados para o Lab 9, garantindo a cobertura total da **Variante 4 (Data Quality & Consistency)**.

## Selected requirements (8)

- **REQ-001** — Validação de Campos Obrigatórios
- **REQ-002** — Condicionalidade de Teste de DR
- **REQ-003** — Deteção de Inconsistência de DR
- **REQ-005** — Validação de Caducidade de Evidências
- **REQ-007** — Prevenção de Duplicados (Unicidade)
- **REQ-008** — Gestão de Estados (Rascunho)
- **NFR-001** — Log de Auditoria
- **NFR-002** — Performance de Validação

## Mapeamento de Rastreabilidade

| ID Requisito | Título do Requisito | Caso de Teste (TC) | 
|:---|:---|:---|
| **REQ-001** | Validação de Campos Obrigatórios | TC-001, TC-011, TC-014 | 
| **REQ-002** | Condicionalidade de Teste de DR | TC-002 | 
| **REQ-003** | Deteção de Inconsistência de DR | TC-003, TC-015, TC-018 | 
| **REQ-005** | Validação de Caducidade de Evidências | TC-004, TC-010 | 
| **REQ-007** | Prevenção de Duplicados (Unicidade) | TC-005, TC-019 | 
| **REQ-008** | Gestão de Estados (Rascunho) | TC-006, TC-016 | 
| **NFR-001** | Log de Auditoria | TC-008, TC-020 | 
| **NFR-002** | Performance de Validação | TC-007, TC-013 |

## Cobertura por Use Cases (UC)

Seguindo o alinhamento com o **Use Case Diagram v2**, os testes cobrem as seguintes interações sistémicas:

*   **UC-01 (Submeter Novo Ativo):** Validado pelos TC-001, TC-002, TC-005 e TC-008.
*   **UC-02 (Guardar Rascunho):** Validado pelo TC-006.
*   **UC-03 (Upload de Evidências):** Validado pelo TC-004.
*   **UC-04 (Validar Consistência):** Validado pelos TC-003 e TC-007 (Núcleo do Gatekeeper da Variante 4).
*   **UC-06 (Exportar Logs):** Validado pelo TC-008 no que respeita à criação de registos auditáveis.

## Observações de Cobertura
- **REQ-009 (Transição Final):** É testado indiretamente em todos os Happy Paths (TC-002, TC-008), onde o estado "Ready to Proceed" só é atingido após 100% de sucesso no motor de regras.
- **NFR-004 (Qualidade Garantida):** Validada pelo TC-008, assegurando que nenhuma submissão via API contorna as regras de integridade.
