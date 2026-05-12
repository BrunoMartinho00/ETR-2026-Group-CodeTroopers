# AC & DoD Updates — Lab 10

## Acceptance Criteria improvements (5 itens)

### Item 1 (Variante - REQ-007)
- **Requirement:** REQ-007 — Prevenção de Duplicados.
- **Before:** O sistema deve verificar se o nome existe.
- **After:** Ao perder o foco (*onBlur*) do campo 'Nome do Sistema', o sistema deve disparar uma consulta assíncrona à API. Caso a API retorne um erro de conflito (Hostname já existente), o campo deve ser marcado a vermelho com a mensagem "ERRO-DUP: Este Hostname já está registado" e o botão "Submeter Final" deve ser bloqueado imediatamente.
- **Why changed:** O critério original era vago quanto ao momento da validação. Esta atualização melhora a testabilidade de integração e a experiência do utilizador (feedback imediato).

### Item 2 (REQ-001)
- **Requirement:** REQ-001 — Validação de Campos Obrigatórios.
- **Before:** Impedir submissão se campos estiverem vazios.
- **After:** Aplicar a função `trim()` a todas as entradas de texto; se o resultado for uma string vazia ou apenas espaços, a submissão deve ser bloqueada. O sistema deve focar automaticamente no primeiro campo inválido detetado.
- **Why changed:** Garante que entradas de "espaços em branco" (boundary case) são tratadas como erro, aumentando a qualidade dos dados na base.

### Item 3 (REQ-003 - Variante 4)
- **Requirement:** REQ-003 — Deteção de Inconsistência de DR.
- **Before:** Bloquear estado "Ready" se existir contradição.
- **After:** Se "Disaster Recovery" = "Não", o campo "Data do Último Teste" deve ser visualmente desativado (read-only). Se houver uma tentativa de injeção de dados via API com DR=Não e Data=Preenchida, o sistema deve responder com código 422 (Unprocessable Entity) e o estado deve passar para "Inconsistent".
- **Why changed:** Define o comportamento tanto para a UI como para a API (Backend), essencial para a robustez da Variante 4.

### Item 4 (REQ-005)
- **Requirement:** REQ-005 — Validação de Caducidade de Evidências.
- **Before:** Rejeitar evidências com data superior a 12 meses.
- **After:** O sistema deve comparar a data extraída do documento com a data do servidor (`Date.now()`). Se a diferença for superior a 365 dias, o upload deve ser abortado com a notificação específica: "EV-EXP: Evidência expirada (limite 365 dias)".
- **Why changed:** Substitui o termo genérico "12 meses" por um valor exato (365 dias), permitindo testes de limite (boundary tests) precisos.

### Item 5 (NFR-002)
- **Requirement:** NFR-002 — Performance de Validação.
- **Before:** Resposta rápida para validações.
- **After:** O processamento das regras lógicas (REQ-002 e REQ-003) deve ser concluído em menos de 500ms no Percentil 95 (P95). Se a resposta exceder 200ms, a UI deve apresentar obrigatoriamente um indicador de carregamento (*spinner*).
- **Why changed:** Torna o requisito de performance quantificável e define o comportamento esperado da interface sob latência.

## DoD updates (3 itens)

1. **Proposed DoD change (Validação de Dados):**
   - **Before:** Existem testes adequados para lógica.
   - **After:** Todo o requisito da Variante 4 deve possuir evidência de pelo menos um "Teste Negativo" (introdução de dados errados propositadamente) que resulte no bloqueio da transição para "Ready".
   - **Why:** Dado que a nossa variante é "Qualidade e Consistência", a proteção contra erros é tão importante quanto o fluxo de sucesso.

2. **Proposed DoD change (Rastreabilidade):**
   - **Before:** Matriz de rastreabilidade atualizada.
   - **After:** A matriz de rastreabilidade (`traceability_req_ac_tc.md`) deve obrigatoriamente ligar cada REQ a pelo menos 2 Critérios de Aceitação e 1 Caso de Teste/Cenário BDD específico.
   - **Why:** Garante que nenhum requisito é deixado sem validação prática.

3. **Proposed DoD change (Revisão Estática):**
   - **Before:** Conflitos resolvidos em equipa.
   - **After:** Revisão estática obrigatória por pares (Peer Review) para todos os Critérios de Aceitação, validando se são mensuráveis e sem ambiguidades antes do início do desenvolvimento.
   - **Why:** Reduz bugs de design e evita a implementação de funcionalidades que não podem ser testadas.
