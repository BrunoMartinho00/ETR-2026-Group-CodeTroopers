# Test-First Log — Lab 11

## Selected scope (max 3 requirements)

- REQ-004 — Validação de URL de Dashboard
  - AC used:
    - AC-1: rejeitar URLs que não comecem por `https://`
    - AC-2: rejeitar URLs com domínio inválido

- REQ-006 — Identificação de Owner em Integrações
  - AC used:
    - AC-1: validar email corporativo com domínio `@empresa.com`

- REQ-007 — Unicidade de Hostname
  - AC used:
    - AC-2: impedir transição para `Ready` quando o hostname já existe

## Tests written first (list)

- T-01: aceitar URL HTTPS com domínio válido (REQ-004 / AC-1, AC-2)
- T-02: rejeitar URL HTTP (REQ-004 / AC-1)
- T-03: rejeitar URL HTTPS sem domínio válido (REQ-004 / AC-2)
- T-04: aceitar email corporativo do owner (REQ-006 / AC-1)
- T-05: rejeitar email externo do owner (REQ-006 / AC-1)
- T-06: bloquear hostname duplicado (REQ-007 / AC-2)
- T-07: aceitar hostname único (REQ-007 / AC-2)
- T-08: rejeitar email corporativo sem identificador antes de `@` (REQ-006 / AC-1, boundary)

## Results

- Initial run: falhou como esperado durante a recolha dos testes (`ImportError`). As funções novas ainda não existiam em `src/validations.py`. Esta foi a fase Red do ciclo TDD.
- First implementation run: 3 testes falharam e 15 passaram. A função `validate_dashboard_url()` usava `urlparse()` sem importar o módulo necessário.
- After implementation: 18 testes passaram após adicionar `from urllib.parse import urlparse`. Esta foi a fase Green do ciclo TDD.
- After refactor: 18 testes passaram. Foram ajustados imports, espaçamento e comentários sem alterar o comportamento. Esta foi a fase Refactor do ciclo TDD.
- Boundary iteration Red: o teste para rejeitar `@empresa.com`, um email sem identificador antes de `@`, falhou como esperado porque a implementação o aceitava indevidamente.
- Boundary iteration Green: 19 testes passaram após exigir um identificador não vazio antes de `@empresa.com`.

## Implementation notes (minimal code to pass)

- Foi adicionado `validate_dashboard_url(url)` para validar HTTPS e a presença de um domínio.
- Foi adicionado `validate_integration_owner_email(email)` para validar o domínio corporativo `@empresa.com`.
- Foi adicionado `validate_hostname_uniqueness(hostname, existing_hostnames)` para bloquear hostnames duplicados.
- A implementação foi mantida mínima: não foram adicionadas alterações à UI, chamadas reais a APIs ou integrações externas.

## BDD scenarios

- Feature: `bdd/features/lab11.feature`
- Scenario 1: happy path — aceitar URL HTTPS válida (`REQ-004 / AC-1, AC-2`)
- Scenario 2: negative path — rejeitar URL HTTP (`REQ-004 / AC-1`)
- Scenario 3: negative path — rejeitar hostname duplicado (`REQ-007 / AC-2`)
- Nota: os cenários foram desenhados para rastreabilidade; a implementação de steps Behave não é obrigatória neste Lab.

## AI usage

- Tool: ChatGPT / Codex
- Prompt summary: orientar a criação dos testes antes da implementação.
- Prompt rule applied: "Do not add features. Implement only what is necessary to satisfy these tests."
- What was accepted: seleção de uma pequena fatia adequada a TDD.
- What was rejected (feature drift): alterações à UI, Selenium e integrações reais com APIs externas.
- Why: não são necessárias para satisfazer os testes deste Lab.

## Requirements and AC changes

- Não foram alterados requisitos nem critérios de aceitação. Os testes traduzem os AC existentes para comportamento executável.

## Frontend alignment evidence

- O frontend real foi verificado a partir do repositório `iduartemt/asset-form-guardian`.
- Foi adicionado o campo `Dashboard URL` e a respetiva validação HTTPS + domínio para alinhar a UI com `REQ-004`.
- Foram mantidas e verificadas as regras reais de email corporativo (`REQ-006`) e hostname duplicado (`REQ-007`).
- Foi corrigido o fluxo DR para limpar e desativar a data quando o utilizador seleciona `Não`.
- Frontend tests: `npm test` terminou com 43 testes aprovados.
- Frontend build: `npm run build` terminou com sucesso.
- Frontend lint: `npm run lint` terminou sem erros e com 11 avisos não bloqueantes.
- Nota de entrega: as alterações do frontend devem ser committed e publicadas no repositório do site antes de validar o URL público.

## Lessons learned

- A escrita dos testes antes do código ajudou a limitar a implementação ao comportamento exigido pelos AC.
- O primeiro teste melhorou a clareza da regra de URL: não basta usar HTTPS; também é necessário existir um domínio válido.
- A primeira implementação revelou um erro simples de importação, detetado imediatamente pela suite.
- Num próximo ciclo, poderia ser clarificado se a comparação de hostnames deve distinguir maiúsculas de minúsculas.
