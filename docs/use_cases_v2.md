# Use Cases v2 — Lab 6 (Completo)

Este documento detalha os Casos de Uso do sistema AMS, focando na lógica de negócio e nas restrições impostas pela **Variante 4 — Qualidade e Consistência de Dados**.

---

## UC-01 — Submeter Novo Ativo
- **Primary actor:** Transition Lead (End User)
- **Supporting actors:** Asset Database (CMDB), Active Directory (AD)
- **Goal:** Registar um novo ativo de inventário garantindo que os dados são únicos, consistentes e completos.
- **Preconditions:** Utilizador autenticado no sistema e acesso ao formulário de Intake.
- **Trigger:** O utilizador clica no botão "Submeter Final" (Transition to Ready).
- **Postconditions (success):** Ativo registado na base de dados com estado "Ready to Proceed" e log de auditoria gerado.
- **Postconditions (failure):** Submissão bloqueada; erros destacados na UI; estado permanece "Incomplete" ou "Inconsistent".
- **Related requirements:** REQ-001, REQ-002, REQ-004, REQ-006, REQ-007, REQ-008, REQ-009, NFR-004, NFR-005.

### Main flow (happy path)
1. O Actor preenche os campos base: Nome do Sistema, Owner e Modelo de Suporte (REQ-001).
2. O Actor identifica os Owners de cada integração através de uma pesquisa no AD (REQ-006).
3. O Actor insere o URL HTTPS do dashboard de monitorização (REQ-004).
4. O Actor anexa a evidência de teste de Disaster Recovery (UC-03).
5. O System invoca o motor de validação (UC-04) para verificar a sanidade dos dados.
6. O System consulta a Asset Database para garantir que o Hostname é único (REQ-007).
7. O System confirma o sucesso e transita o ativo para o estado "Ready to Proceed" (REQ-009).
8. O System gera um registo no Log de Auditoria (NFR-001).

### Alternative flows
- **A1: Guardar Rascunho (Draft):** O Actor clica em "Guardar Rascunho" invocando o **UC-02**. O Sistema permite a gravação mesmo com campos obrigatórios em falta ou inconsistências lógicas.
- **A2: Correção de Inconsistência:** Após um erro detetado pelo UC-04, o Actor corrige os dados contraditórios e re-submete o formulário com sucesso.

### Exceptions / errors
- **E1: Ativo Duplicado:** A Asset DB informa que o Hostname já existe. O Sistema destaca o campo a vermelho em < 1s (NFR-005) e bloqueia a submissão (REQ-007).
- **E2: Falha de Validação Síncrona:** O motor de regras deteta que campos obrigatórios foram preenchidos apenas com espaços. O Sistema aplica `trim()` e rejeita a submissão (REQ-001).

---

## UC-02 — Guardar Rascunho (Draft)
- **Primary actor:** Transition Lead (End User)
- **Goal:** Guardar o progresso do preenchimento do formulário de forma segura, contornando intencionalmente o motor de regras estrito.
- **Preconditions:** Formulário de Intake aberto e parcialmente preenchido.
- **Trigger:** Clique no botão "Guardar Rascunho".
- **Postconditions (success):** Registo persistido na base de dados com a flag de estado `is_draft=True`.
- **Postconditions (failure):** O rascunho não é guardado; o utilizador recebe uma mensagem de erro e os dados permanecem no formulário sempre que possível.
- **Related requirements:** REQ-008.

### Main flow (happy path)
1. O Actor clica em "Guardar Rascunho".
2. O System suspende temporariamente o motor de validação cruzada (UC-04).
3. O System guarda os dados inseridos até ao momento na tabela temporária.
4. O System apresenta a mensagem de "Rascunho guardado com sucesso".

### Alternative flows
- **A1: Retomar Rascunho:** O Actor acede à lista de rascunhos num dia posterior, carrega os dados no formulário e prossegue com o preenchimento.
- **A2: Guardar rascunho com inconsistências:** O Actor guarda o formulário mesmo contendo campos obrigatórios em falta ou dados contraditórios. O System mantém o estado como "Draft" e não permite transição para "Ready to Proceed".

### Exceptions / errors
- **E1: Perda de Conectividade:** Ocorreu uma falha de rede; o Sistema avisa que não foi possível guardar o rascunho de forma segura.
- **E2: Erro de persistência temporária:** O System não consegue persistir o rascunho. O System mostra erro, mantém os dados no ecrã e recomenda nova tentativa antes de fechar o formulário.

---

## UC-03 — Upload de Evidências
- **Primary actor:** Transition Lead (End User)
- **Goal:** Anexar ficheiros comprovativos (ex: Teste DR) garantindo que a informação operacional não está obsoleta.
- **Preconditions:** Utilizador no ecrã de upload de documentos.
- **Trigger:** Seleção de um ficheiro no explorador do sistema operativo.
- **Postconditions (success):** Ficheiro anexado e associado ao ativo.
- **Postconditions (failure):** O ficheiro não é associado ao ativo; o utilizador recebe uma indicação clara do motivo da rejeição.
- **Related requirements:** REQ-005.

### Main flow (happy path)
1. O Actor seleciona o ficheiro PDF a anexar.
2. O System extrai a data de modificação/criação dos metadados do ficheiro (ou do input do utilizador).
3. O System calcula a diferença face ao relógio atual (`Date.now()`).
4. O System verifica que a idade é inferior a 365 dias (REQ-005).
5. O System anexa o ficheiro com sucesso.

### Alternative flows
- **A1: Substituição de Evidência:** O Actor faz upload de um novo documento que substitui automaticamente o anterior.
- **A2: Data de evidência introduzida manualmente:** Quando os metadados do ficheiro não estão disponíveis, o Actor informa a data da evidência e o System valida essa data antes de anexar o ficheiro.

### Exceptions / errors
- **E1: Evidência Expirada (Variante 4):** A data do documento excede os 365 dias. O Sistema cancela o upload imediatamente com o alerta visual "Evidência Expirada (>1 ano)".
- **E2: Data futura ou inválida:** A evidência tem data futura ou formato inválido. O System rejeita o upload, apresenta o campo afetado e impede que a evidência seja usada no estado "Ready to Proceed".

---

## UC-04 — Validar Regras de Consistência

- **Primary actor:** Data Steward
- **Supporting actors:** Transition Lead (End User), Asset Database
- **Goal:** Validar a qualidade, integridade lógica e consistência temporal dos dados antes da transição para "Ready to Proceed".
- **Preconditions:** Existe um formulário de Intake preenchido ou parcialmente preenchido.
- **Trigger:** O Transition Lead tenta submeter o Intake final ou o Data Steward solicita validação manual dos dados.
- **Postconditions (success):** O Intake é considerado válido e pode avançar para "Ready to Proceed" em menos de 500ms para 95% dos pedidos.
- **Postconditions (failure):** O Intake permanece em "Incomplete" ou "Inconsistent", com erros identificados para correção.
- **Related requirements:** REQ-001, REQ-002, REQ-003, REQ-005, REQ-007, REQ-009, NFR-002, NFR-004, NFR-005.

### Main flow (happy path)
1. O Actor solicita a validação dos dados do Intake.
2. O System verifica se os campos obrigatórios estão preenchidos (REQ-001).
3. O System valida a regra de Disaster Recovery: se DR = "Sim", a data do último teste é obrigatória (REQ-002).
4. O System verifica se existe contradição entre DR = "Não" e uma data de teste preenchida (REQ-003).
5. O System verifica se a evidência operacional tem 12 meses ou menos e não tem data futura (REQ-005).
6. O System consulta a Asset Database para confirmar que o Hostname é único (REQ-007).
7. O System valida se todos os requisitos da Variante 4 foram cumpridos.
8. O System retorna a confirmação de integridade total e permite a transição para "Ready to Proceed" (REQ-009, NFR-004).

### Alternative flows
- **A1: Auditoria Preventiva:** O Data Steward corre este caso de uso sobre registos em estado "Draft" para gerar uma lista de problemas de qualidade pendentes, sem alterar o estado final.
- **A2: Correção após falha de validação:** O Actor corrige os campos indicados, solicita nova validação e o System reexecuta as regras de consistência.

### Exceptions / errors
- **E1: Inconsistência lógica (Variante 4):** O utilizador declarou DR = "Não" mas forneceu uma data de teste. O System marca o registo como "Inconsistent", bloqueia o estado "Ready" e identifica o campo afetado (REQ-003).
- **E2: Duplicado encontrado:** A Asset Database indica que o Hostname já existe. O System bloqueia a validação final, apresenta erro em menos de 1 segundo e impede a transição para "Ready to Proceed" (REQ-007, NFR-005).

---

## UC-05 — Resolver Inconsistências de Dados
- **Primary actor:** Data Steward
- **Goal:** Analisar e intervir sobre ativos que ficaram bloqueados no estado "Inconsistent".
- **Preconditions:** O Steward tem permissões de auditoria; existem ativos em estado de erro.
- **Trigger:** Acesso ao Dashboard de Controlo de Qualidade.
- **Postconditions (success):** Registo corrigido e transitado para "Ready".
- **Related requirements:** REQ-003, REQ-009.

### Main flow (happy path)
1. O Actor acede à lista de ativos sinalizados como "Inconsistent".
2. O Actor abre o detalhe de um ativo.
3. O System destaca especificamente a regra que falhou (ex: conflito no DR).
4. O Actor ajusta o dado consoante investigação manual (ex: remove a data fantasma).
5. O Actor clica em aprovar. O System re-executa o **UC-04**.
6. O System transita o ativo para "Ready to Proceed" (REQ-009).

### Alternative flows
- **A1: Rejeição Definitiva:** O Steward decide que os dados são irrecuperáveis e apaga o registo.

### Exceptions / errors
- **E1: Falha Reincidente:** O Steward tenta submeter mas outra validação cruzada falha. O ativo permanece "Inconsistent".

---

## UC-06 — Exportar Logs de Auditoria
- **Primary actor:** Auditor / Data Steward
- **Goal:** Extrair o *Audit Trail* de alterações críticas para reportar conformidade.
- **Preconditions:** O utilizador tem perfil de Auditor. Existem logs gravados no sistema.
- **Trigger:** Clique no botão "Exportar Relatório de Auditoria".
- **Postconditions (success):** Ficheiro estruturado descarregado com sucesso.
- **Related requirements:** NFR-001, NFR-006.

### Main flow (happy path)
1. O Actor seleciona o período temporal desejado (ex: últimos 6 meses).
2. O System extrai todos os logs referentes à criação ou edição de campos críticos (Owner, Nome, DR).
3. O System compila a informação com UserID, Timestamp, Valor Antigo e Valor Novo (NFR-001).
4. O System disponibiliza o download do ficheiro (CSV/JSON).

### Alternative flows
- **A1: Consulta em Ecrã:** Em vez de descarregar, o Actor escolhe apenas visualizar o histórico daquele ativo na grelha da interface.

### Exceptions / errors
- **E1: Tentativa de Eliminação:** O Actor tenta apagar um log. O Sistema bloqueia a operação garantindo que o armazenamento imutável preserva a retenção de 12 meses (NFR-006).

---

## Variant-driven notes (Required)
- **Impacto da Variante 4:** A restrição de "Qualidade e Consistência" é o motor principal do **UC-04**, que atua como o *gatekeeper* de todo o sistema. A criação do **UC-05** existe estritamente para lidar com o "lixo" que a variante previne de entrar no fluxo normal. 
- **Separação de Estados:** O **UC-02** permite uma experiência de utilizador fluida (Draft), enquanto o **UC-01** (associado ao REQ-009) garante que a base de dados final (*Ready*) é 100% íntegra, cumprindo o **NFR-004**.
