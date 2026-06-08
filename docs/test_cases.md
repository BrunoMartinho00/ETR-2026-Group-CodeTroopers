# Test Cases — Lab 9 (CodeTroopers)

## TC-001 — Bloqueio de submissão com campos invisíveis [Boundary]
- **Type:** Unit / UI
- **Related requirements:** REQ-001 (AC-2)
- **Preconditions:** Formulário de Intake aberto.
- **Test data:** 
- **Steps:**
  1. Inserir apenas espaços ("   ") no campo "Nome do Sistema".
  2. Preencher os restantes campos obrigatórios.
  3. Clicar em "Submeter Final".
- **Expected results:** O sistema executa o `trim()`, reconhece o campo como vazio, bloqueia a submissão e destaca o campo a vermelho.

## TC-002 — Validação condicional de DR ativa [Happy Path]
- **Type:** Integration
- **Related requirements:** REQ-002 (AC-1)
- **Preconditions:** Formulário de Intake aberto.
- **Test data:** Disaster Recovery = "Sim", Data = uma data válida recente.
- **Steps:**
  1. Selecionar "Sim" no campo "Disaster Recovery".
  2. Verificar se o campo "Data do Último Teste" exibe um marcador de obrigatoriedade (asterisco).
  3. Preencher uma data válida e submeter.
- **Expected results:** O sistema aceita a transição para "Ready" após validar a presença da data.

## TC-003 — Inconsistência Lógica de DR [Negative]
- **Type:** Logic / Variant 4 Focus
- **Related requirements:** REQ-003, REQ-009
- **Preconditions:** Formulário de Intake aberto.
- **Test data:** Disaster Recovery = "Não", Data = "2023-10-10".
- **Steps:**
  1. Selecionar "Não" no campo "Disaster Recovery".
  2. Inserir uma data no campo "Data do Último Teste".
  3. Tentar clicar em "Submeter Final".
- **Expected results:** O sistema bloqueia a transição, exibe o erro "Campo proibido para sistemas sem resiliência" e marca o estado como "Inconsistent".

## TC-004 — Caducidade de Evidência (366 dias) [Boundary]
- **Type:** Functional / Temporal
- **Related requirements:** REQ-005
- **Preconditions:** Formulário de Intake no passo de upload de evidências.
- **Test data:** Ficheiro com data de criação equivalente a Date.now() - 366 dias.
- **Steps:**
  1. Carregar uma evidência com data de 366 dias atrás face a `Date.now()`.
- **Expected results:** O sistema rejeita o ficheiro com a notificação "Evidência Expirada".

## TC-005 — Unicidade de Hostname (onBlur) [Integration]
- **Type:** Integration
- **Related requirements:** REQ-007
- **Preconditions:** Formulário de Intake aberto e Base de Dados de Ativos acessível.
- **Test data:** Nome do sistema = "PROD-DB".
- **Steps:**
  1. Inserir o nome "PROD-DB" (já existente no Mock do Asset Database).
  2. Retirar o foco do campo (onBlur).
- **Expected results:** O sistema sinaliza o erro "Ativo já existe" e desativa o botão de submissão.

## TC-006 — Gravação de Rascunho com Dados em Falta [Alternative]
- **Type:** System
- **Related requirements:** REQ-008
- **Preconditions:** Formulário de Intake aberto para um novo registo.
- **Test data:** Nome = "Sistema-Rascunho", Owner = vazio.
- **Steps:**
  1. Deixar campos obrigatórios vazios.
  2. Clicar em "Guardar Rascunho".
- **Expected results:** O sistema ignora as validações cruzadas e persiste os dados com a flag `is_draft=True`.

## TC-007 — Performance do Motor de Regras [Performance]
- **Type:** Non-Functional
- **Related requirements:** NFR-002
- **Preconditions:** Motor de regras de backend a correr normalmente.
- **Test data:** Payload JSON complexo com várias regras de validação cruzada.
- **Steps:** Submeter um payload complexo de validação cruzada.
- **Expected results:** O motor de backend processa todas as regras em menos de 500ms (P95).

## TC-008 — Auditoria de Alterações Críticas [Acceptance]
- **Type:** Non-Functional / Compliance
- **Related requirements:** NFR-001
- **Preconditions:** Utilizador autenticado a editar um ativo com ID existente.
- **Test data:** Novo valor para Owner = "Novo Dono".
- **Steps:** Alterar o campo "Owner" de um ativo existente e submeter.
- **Expected results:** O sistema gera um registo imutável no Log de Auditoria com UserID, Timestamp e valores antigo/novo.

## TC-009 — Validação de Formato de E-mail do Owner [Negative]
- **Type:** Unit / UI
- **Related requirements:** REQ-006 (AC-1)
- **Preconditions:** Formulário de Intake aberto.
- **Test data:** Owner = "utilizador.sem.dominio" ou "utilizador@gmail.com" (domínio não corporativo).
- **Steps:**
  1. Preencher os restantes campos obrigatórios com dados válidos.
  2. Inserir um e-mail com formato inválido ou não corporativo no campo "Owner".
  3. Clicar em "Submeter Final".
- **Expected results:** O sistema identifica o erro de formatação/domínio, bloqueia a submissão e exibe uma mensagem indicando que é necessário um e-mail corporativo válido.

## TC-010 — Caducidade de Evidência Limite (365 dias) [Boundary / Happy Path]
- **Type:** Functional / Temporal
- **Related requirements:** REQ-005 (AC-1, AC-2)
- **Preconditions:** Formulário de Intake no passo de upload de evidências.
- **Test data:** Ficheiro com data de criação equivalente a exatamente `Date.now() - (365 * 24 * 60 * 60 * 1000)`.
- **Steps:**
  1. Carregar uma evidência que tenha exatamente 365 dias de idade face à data do servidor.
  2. Verificar a aceitação do ficheiro pelo sistema.
- **Expected results:** O sistema aceita o upload com sucesso, validando que o limite de 365 dias é inclusivo e não aciona o bloqueio de caducidade.

## TC-011 — Sanitização de Inputs com Sucesso [Alternative]
- **Type:** Data Quality / System
- **Related requirements:** REQ-001 (AC-2)
- **Preconditions:** Formulário de Intake aberto para um novo registo.
- **Test data:** Nome do Sistema = "   SRV-CORE-01   " (com espaços extra propositados no início e no fim).
- **Steps:**
  1. Inserir o nome do sistema contendo os espaços em branco vazios.
  2. Preencher os restantes dados obrigatórios corretamente.
  3. Clicar em "Submeter Final".
- **Expected results:** O sistema aplica a função `trim()`, limpa os espaços vazios das extremidades, persiste o valor higienizado como "SRV-CORE-01" na base de dados e avança para o estado "Ready".

## TC-012 — Owner Inexistente no Diretório (AD) [Integration / Negative]
- **Type:** Integration
- **Related requirements:** REQ-006 (AC-2)
- **Preconditions:** Formulário de Intake aberto e Mock da API do Active Directory online.
- **Test data:** Owner = "fantasma@empresa.com" (formato corporativo válido, mas utilizador inexistente no diretório).
- **Steps:**
  1. Inserir o e-mail "fantasma@empresa.com" no campo "Owner".
  2. Retirar o foco do campo (evento *onBlur*) ou tentar submeter o formulário.
- **Expected results:** O sistema executa a consulta assíncrona ao diretório, deteta que o utilizador não existe no Active Directory e bloqueia a ação com o erro "Owner não encontrado no diretório da empresa".

## TC-013 — Exibição de Spinner em Latência Elevada [Non-Functional]
- **Type:** Non-Functional / UX
- **Related requirements:** NFR-002 (AC-2)
- **Preconditions:** Formulário de Intake preenchido e rede simulada com um atraso (*delay*) superior a 200ms na resposta do motor de regras.
- **Test data:** Payload de submissão válido; latência simulada de resposta do servidor fixada em 350ms.
- **Steps:**
  1. Clicar em "Submeter Final".
  2. Observar o comportamento da interface gráfica enquanto o motor de regras processa as validações de consistência cruzada.
- **Expected results:** A interface gráfica apresenta obrigatoriamente um indicador visual de carregamento (*spinner*) durante o tempo de processamento, dado que a resposta excedeu o limiar de 200ms.

## TC-014 — Falta de Campo Obrigatório Standard [Negative]
- **Type:** Unit / UI
- **Related requirements:** REQ-001 (AC-1)
- **Preconditions:** Formulário de Intake aberto para um novo registo.
- **Test data:** "Nome" e "Owner" preenchidos corretamente; "Suporte" deixado totalmente vazio.
- **Steps:**
  1. Preencher os campos de "Nome" e "Owner".
  2. Ignorar o campo "Suporte" (não inserir qualquer dado).
  3. Clicar em "Submeter Final".
- **Expected results:** A submissão é imediatamente bloqueada no frontend e o foco (cursor) é automaticamente movido para o campo "Suporte", destacando-o a vermelho.

## TC-015 — Injeção de Dados Inconsistentes via API (Variante 4) [Integration / Security]
- **Type:** Integration / Backend
- **Related requirements:** REQ-003 (AC-3)
- **Preconditions:** Endpoint da API REST acessível e cliente de testes (ex: Postman) configurado.
- **Test data:** Payload JSON com `"disaster_recovery": "Não"` e `"last_test_date": "2024-01-01"`.
- **Steps:**
  1. Submeter o payload JSON diretamente para o endpoint de criação de ativo (`POST /api/assets`), contornando o frontend.
- **Expected results:** A API do motor de regras de qualidade de dados rejeita o pedido com um código HTTP `422 Unprocessable Entity` e regista a tentativa no log de anomalias.

## TC-016 — Retoma de Rascunho e Submissão Final [Alternative / Happy Path]
- **Type:** System
- **Related requirements:** REQ-008, REQ-009
- **Preconditions:** Utilizador tem um registo gravado no estado "Draft", previamente com campos obrigatórios em falta.
- **Test data:** Preenchimento dos dados em falta (ex: Suporte = "Equipa de Redes").
- **Steps:**
  1. Abrir o registo que se encontra em estado "Draft".
  2. Preencher os campos obrigatórios que estavam vazios.
  3. Clicar em "Submeter Final".
- **Expected results:** O sistema remove a flag `is_draft`, valida todas as regras lógicas com sucesso e o estado do ativo transita de "Draft" para "Ready".

## TC-017 — Reexecução Forçada do Motor Lógico na Submissão [System / Data Quality]
- **Type:** System / Backend
- **Related requirements:** REQ-009 (AC-2)
- **Preconditions:** Formulário preenchido com dados inicialmente válidos na UI.
- **Test data:** Interceção do pedido de rede (via DevTools) para alterar um valor no exato momento da submissão (ex: forçar data caducada > 365 dias).
- **Steps:**
  1. Clicar em "Submeter Final".
  2. Intercetar o tráfego HTTP e alterar o payload inserindo uma inconsistência.
  3. Libertar o pedido para o servidor.
- **Expected results:** O backend reexecuta obrigatoriamente todas as regras do zero, deteta a anomalia injetada, aborta a transição para "Ready" e devolve erro lógico ao utilizador.

## TC-018 — Desativação Visual Dinâmica (Read-Only) [UI / Usability]
- **Type:** Unit / UI
- **Related requirements:** REQ-003 (AC-1)
- **Preconditions:** Formulário aberto, campo Disaster Recovery está com valor "Sim" e campo de Data tem uma data válida inserida.
- **Test data:** N/A
- **Steps:**
  1. Alterar o valor do campo "Disaster Recovery" de "Sim" para "Não".
- **Expected results:** O campo "Data do Último Teste" é limpo automaticamente e torna-se visualmente bloqueado (*read-only* ou *disabled*), impedindo nova introdução de texto.

## TC-019 — Recuperação após Erro de Hostname Duplicado [Alternative]
- **Type:** Integration / UI
- **Related requirements:** REQ-007 (AC-1, AC-2)
- **Preconditions:** Formulário encontra-se bloqueado (botão desativado) devido à introdução prévia de um hostname já existente (ex: "PROD-DB").
- **Test data:** Novo Nome do Sistema = "PROD-DB-V2" (que não existe na base de dados).
- **Steps:**
  1. Apagar o hostname inválido ("PROD-DB").
  2. Inserir um hostname único ("PROD-DB-V2").
  3. Retirar o foco do campo (evento *onBlur*).
- **Expected results:** A nova chamada à API retorna sucesso (sem conflito), a mensagem de erro vermelha "ERRO-DUP" desaparece e o botão "Submeter Final" é imediatamente reativado.

## TC-020 — Integridade Estrutural do Payload de Auditoria [Non-Functional / Compliance]
- **Type:** Non-Functional
- **Related requirements:** NFR-001 (AC-1, AC-2)
- **Preconditions:** Utilizador autenticado; registo de ativo no estado "Ready"; acesso de leitura à base de dados de Auditoria (Audit Log).
- **Test data:** Alteração do Owner de "antigo.dono@empresa.com" para "novo.dono@empresa.com".
- **Steps:**
  1. Fazer a alteração do Owner na interface e guardar.
  2. Consultar diretamente a base de dados de logs de auditoria para o ID do ativo modificado.
- **Expected results:** O log foi gerado contendo a estrutura imutável correta, evidenciando explicitamente: o UserID de quem alterou, o Timestamp exato, `old_value: "antigo.dono@empresa.com"` e `new_value: "novo.dono@empresa.com"`.
