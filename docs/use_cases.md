# Casos de Uso — Lab 5 (CodeTroopers)

**Sistema:** AMS Intake & Data Quality Platform
**Variante:** 4 — Data Quality & Consistency

---

## UC-01 — Submeter Novo Ativo
- **Ator Principal:** End User (Utilizador Final)
- **Atores Secundários:** Asset Database (Sistema Externo), Data Steward.
- **Objetivo:** Registar um novo ativo de hardware no sistema, garantindo que todos os dados submetidos estão limpos, completos e validados.
- **Pré-condições:**
  1. O utilizador está autenticado no sistema.
  2. O formulário de Intake está aberto.
- **Gatilho (Trigger):** O utilizador clica no botão "Submeter Final".
- **Pós-condições (Sucesso):** O registo é gravado na Base de Dados com estado "Ready"; Um ID único é gerado; O Data Steward é notificado.
- **Pós-condições (Falha):** O registo não é gravado (ou permanece em "Draft"); Mensagens de erro são exibidas e nenhuma alteração crítica é persistida.
- **Requisitos Relacionados:** REQ-001, REQ-002, REQ-003, REQ-005, REQ-006, REQ-007, REQ-009, NFR-002.

### Fluxo Principal (Caminho Feliz)
1. O **Ator** preenche os campos de identificação do ativo (Nome, Owner, Tipo).
2. O **Ator** carrega o ficheiro de evidência (PDF) de compra (inclui UC-03).
3. O **Ator** clica no botão "Submeter".
4. O **Sistema** executa o motor de validação de consistência (inclui UC-04).
5. O **Sistema** verifica na "Asset Database" externa se o Hostname é único (REQ-007).
6. O **Sistema** grava o registo como "Ready".
7. O **Sistema** apresenta uma mensagem de sucesso e o ID do novo ativo.

### Fluxos Alternativos
**A1. Guardar como Rascunho (Draft)**
1. No passo 3, o **Ator** clica em "Guardar Rascunho".
2. O **Sistema** ignora as validações de campos obrigatórios (REQ-008).
3. O **Sistema** grava o registo com a flag `is_draft=True`.
4. O caso de uso termina com sucesso (estado parcial).

### Exceções / Erros
**E1. Falha na Validação Cruzada (Foco Variante 4)**
1. No passo 4, o **Sistema** deteta uma inconsistência (ex: "DR=Sim" mas "Data de Teste" vazia - REQ-002).
2. O **Sistema** aborta a transação de gravação.
3. O **Sistema** destaca os campos inválidos a vermelho e exibe a mensagem de erro específica.
4. O **Sistema** regista a tentativa falhada no log de auditoria.
5. O fluxo retorna ao passo 1 para correção pelo utilizador.

**E2. Duplicação de Ativo**
1. No passo 5, a "Asset Database" retorna que o ativo já existe.
2. O **Sistema** exibe erro bloqueante: "Ativo já registado na base de dados".
3. O fluxo termina em falha (o utilizador deve contactar o suporte).

---

## UC-04 — Validar Regras de Consistência

- **Ator Principal:** Data Steward.
- **Atores Secundários:** End User, Asset Database.
- **Objetivo:** Validar a qualidade, integridade lógica e consistência temporal dos dados antes da transição para "Ready to Proceed".
- **Pré-condições:** Existe um formulário de Intake preenchido ou parcialmente preenchido.
- **Gatilho (Trigger):** O End User tenta submeter o Intake final ou o Data Steward solicita validação manual dos dados.
- **Pós-condições (Sucesso):** O Intake é considerado válido e pode avançar para "Ready to Proceed".
- **Pós-condições (Falha):** O Intake permanece em "Incomplete" ou "Inconsistent", com erros identificados para correção.
- **Requisitos Relacionados:** REQ-001, REQ-002, REQ-003, REQ-005, REQ-007, REQ-009, NFR-002, NFR-004.

### Fluxo Principal (Caminho Feliz)
1. O **Ator** solicita a validação dos dados do Intake.
2. O **Sistema** verifica se os campos obrigatórios estão preenchidos (REQ-001).
3. O **Sistema** verifica a regra de Disaster Recovery: se DR = "Sim", a data do último teste é obrigatória (REQ-002).
4. O **Sistema** verifica se existe contradição entre DR = "Não" e uma data de teste preenchida (REQ-003).
5. O **Sistema** verifica se a evidência operacional tem 12 meses ou menos e não tem data futura (REQ-005).
6. O **Sistema** consulta a Asset Database para confirmar que o Hostname é único (REQ-007).
7. O **Sistema** devolve o resultado "Válido" e permite a transição para "Ready to Proceed" (REQ-009).

### Fluxos Alternativos
**A1. Validação preventiva pelo Data Steward**
1. O **Data Steward** seleciona um Intake em estado "Draft".
2. O **Data Steward** solicita a validação antes da submissão final.
3. O **Sistema** executa as mesmas regras de consistência.
4. O **Sistema** apresenta uma lista de problemas encontrados, sem alterar o estado final do Intake.

**A2. Correção após falha de validação**
1. O **Ator** recebe a lista de erros de consistência.
2. O **Ator** corrige os campos indicados.
3. O **Ator** solicita nova validação.
4. O **Sistema** reexecuta as regras e atualiza o resultado.

### Exceções / Erros
**E1. Violação de Regra de Negócio Crítica**
1. Durante a validação, o **Sistema** deteta uma regra quebrada, como DR = "Não" com data de teste preenchida (REQ-003).
2. O **Sistema** marca o Intake como "Inconsistent".
3. O **Sistema** bloqueia a transição para "Ready to Proceed".
4. O **Sistema** apresenta a regra violada e o campo afetado.

**E2. Duplicado encontrado na Asset Database**
1. Durante a verificação de unicidade, a **Asset Database** indica que o Hostname já existe (REQ-007).
2. O **Sistema** bloqueia a validação final.
3. O **Sistema** informa que o ativo já existe e deve ser revisto antes de nova submissão.