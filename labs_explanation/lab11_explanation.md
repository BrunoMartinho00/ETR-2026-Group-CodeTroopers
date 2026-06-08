# Explicacao do Lab 11 - Test-First Vibe Coding

## O que o Lab 11 pedia

O Lab 11 pedia aplicar uma abordagem test-first: escrever testes antes de implementar codigo.

O objetivo era usar o ciclo TDD:

```text
Red -> Green -> Refactor
```

Os entregaveis obrigatorios eram:

- testes automatizados em `tests/`
- cenarios BDD em `bdd/features/lab11.feature`
- registo do processo em `docs/test_first_log.md`

O lab tambem exigia:

- escolher no maximo 3 requisitos
- criar pelo menos 6 testes automatizados
- incluir pelo menos 3 happy paths
- incluir pelo menos 2 testes negativos/de erro
- incluir pelo menos 1 teste de fronteira
- mapear os testes para requisitos e criterios de aceitacao
- registar a utilizacao de IA e rejeitar funcionalidades fora do escopo

## Relacao com a Lesson 11

A Lesson 11 explica que os testes devem ser a fonte de verdade da implementacao.

Em vez de gerar codigo imediatamente, a equipa deve:

1. escolher requisitos e criterios de aceitacao
2. escrever testes que descrevem o comportamento esperado
3. executar os testes e observar a falha inicial
4. implementar apenas o codigo minimo necessario
5. refatorar mantendo os testes a passar

Isto reduz ambiguidades e evita feature drift.

## Escopo selecionado

Foram escolhidos 3 requisitos adequados a testes:

- `REQ-004` - Validacao de URL do Dashboard
- `REQ-006` - Identificacao de Owner em Integracoes
- `REQ-007` - Unicidade de Hostname

Estes requisitos foram escolhidos porque representam regras pequenas, objetivas e testaveis.

## Criterios de aceitacao automatizados

### REQ-004 - URL do Dashboard

ACs usados:

- `AC-1`: rejeitar URLs que nao comecem por `https://`
- `AC-2`: rejeitar URLs sem um dominio valido

### REQ-006 - Owner da Integracao

AC usado:

- `AC-1`: validar o email corporativo do owner

### REQ-007 - Unicidade de Hostname

AC usado:

- `AC-2`: bloquear a transicao para `Ready` quando o hostname ja existe

## Testes escritos primeiro (Backend Unitário)

Os testes foram adicionados em:

```text
tests/unit/test_lab11_validations.py
```

Foram criados 8 testes especificos do Lab 11:

| Test ID | Comportamento verificado | Tipo |
|---|---|---|
| T-01 | Aceitar URL HTTPS com dominio valido | Happy |
| T-02 | Rejeitar URL HTTP | Negative |
| T-03 | Rejeitar URL HTTPS sem dominio valido | Negative |
| T-04 | Aceitar email corporativo | Happy |
| T-05 | Rejeitar email externo | Negative |
| T-06 | Bloquear hostname duplicado | Negative |
| T-07 | Aceitar hostname unico | Happy |
| T-08 | Rejeitar email sem identificador antes de `@` | Boundary |

## Ciclo TDD aplicado

### Red

Os testes foram escritos antes das novas funcoes.

A primeira execucao falhou com:

```text
ImportError
```

Isto aconteceu porque as funcoes ainda nao existiam em:

```text
src/validations.py
```

Tambem foi criada uma iteracao adicional de fronteira:

```text
@empresa.com
```

Inicialmente, este email era aceite indevidamente. O teste falhou e revelou que era necessario exigir um identificador antes de `@`.

### Green

Foi implementado apenas o codigo minimo:

- `validate_dashboard_url(url)`
- `validate_integration_owner_email(email)`
- `validate_hostname_uniqueness(hostname, existing_hostnames)`

A validacao de email foi ajustada para rejeitar identificadores vazios.

Resultado final:

```text
python -m pytest -q
19 passed
```

### Refactor

Depois dos testes passarem, foram melhorados:

- imports
- espacamento
- comentarios
- legibilidade do codigo

Os testes foram executados novamente para garantir que o comportamento nao mudou.

## BDD scenarios

Foi criado:

```text
bdd/features/lab11.feature
```

O ficheiro contem:

- 1 feature
- 3 cenarios
- 1 happy path
- 2 negative paths

Os cenarios cobrem:

1. aceitar uma URL HTTPS valida
2. rejeitar uma URL HTTP
3. rejeitar um hostname duplicado

Os steps Behave nao foram implementados porque eram opcionais neste lab. Os cenarios foram desenhados para rastreabilidade.

## Utilizacao de IA

A IA foi usada para orientar o processo TDD e sugerir implementacao minima.

A regra aplicada foi:

```text
Do not add features. Implement only what is necessary to satisfy these tests.
```

Foram rejeitadas funcionalidades fora do escopo no ciclo inicial de backend:

- alteracoes UI desnecessarias durante o primeiro ciclo puro de TDD
- integracoes reais com APIs externas
- Active Directory real

## Automação de Interface (UI) com Selenium

Para complementar os testes unitários gerados, foi decidido criar testes *End-to-End (E2E)* com **Selenium** para provar que a interface gerada via Vibe Coding atua como um verdadeiro "Gatekeeper".

O script interage com os componentes complexos de UI (Radix/React) e valida as mensagens de erro em tempo real.

O ficheiro de testes E2E encontra-se em:
```text
tests/unit/tests_selenium.py
```

Cenários de UI programados:
1. **Happy Path:** Preenchimento de 100% dos campos e validação do "Toast" de sucesso.
2. **Negative Path 1:** Injeção de erro de URL (`http://`) e verificação do bloqueio visual.
3. **Negative Path 2:** Injeção de erro de Domínio (URL incompleto) e verificação de bloqueio.
4. **Negative Path 3:** Injeção de email pessoal (`@gmail.com`) provando a aplicação da regra de email institucional.

### Como executar os testes UI (Selenium)
Com o ambiente virtual ativado (`source venv/bin/activate`), execute na raiz do projeto:

```bash
pytest tests/unit/tests_selenium.py -v -s
```
*(As flags `-v` e `-s` servem para detalhar o output e exibir os passos em tempo real na consola).*

## Alinhamento com o frontend real

Depois do exercicio Python, o frontend real foi clonado a partir de:

```text
https://github.com/iduartemt/asset-form-guardian.git
```

Foi verificado que:

- `REQ-006` ja tinha validacao de email corporativo
- `REQ-007` ja tinha bloqueio de hostname duplicado
- `REQ-004` ainda nao tinha campo de Dashboard URL na interface

Para alinhar o site com o escopo do Lab 11, foi adicionado ao frontend:

- campo obrigatorio `Dashboard URL`
- validacao HTTPS
- validacao de dominio
- testes Vitest unitarios e de UI

Tambem foi corrigido o comportamento de DR:

- ao selecionar `Nao`, a data de teste e limpa
- o seletor da data fica desativado

## Verificacao do frontend

Foram executados:

```powershell
npm test
npm run build
npm run lint
```

Resultados:

```text
Frontend tests: 43 passed
Frontend build: sucesso
Frontend lint: 0 erros, 11 avisos nao bloqueantes
```

## Ficheiros de evidencia

A evidencia oficial do Lab 11 esta em:

```text
docs/test_first_log.md
bdd/features/lab11.feature
tests/unit/test_lab11_validations.py
tests/unit/test_validations.py
tests/unit/tests_selenium.py
src/validations.py
```

No frontend, a regra de Dashboard URL e testada em:

```text
src/test/TC011-dashboard-url.test.tsx
```

## Como explicar o Lab

Neste lab, escolhemos tres regras pequenas e testaveis (variante de Qualidade de Dados): URL HTTPS, email corporativo e hostname duplicado.

Primeiro escrevemos os testes PyTest puramente em código (TDD) e confirmamos que falhavam porque as funcoes ainda nao existiam. Depois implementamos apenas o minimo necessario para os testes passarem.

Em paralelo à camada de backend, implementámos testes automáticos de interface gráfica usando o **Selenium**. Estes testes provam ativamente que o protótipo gerado por IA bloqueia inputs incorretos na interface (como emails `@gmail.com` ou links `http://`), respeitando as regras estabelecidas pelo nosso Test-First Vibe Coding.

Tambem criamos cenarios BDD para documentar o comportamento esperado e garantimos o alinhamento total do protótipo final (Frontend).

## Resultado final

O Lab 11 ficou com:

- 3 requisitos selecionados
- 8 testes test-first (Backend Unitário)
- 4 testes de Automação de Interface (Selenium E2E)
- 4 happy paths (total)
- 7 testes negativos (total)
- 1 boundary test
- 1 feature BDD
- 3 cenarios BDD
- ciclo Red, Green e Refactor documentado
- utilizacao de IA documentada
- frontend alinhado com os requisitos selecionados

## Limitacoes

- Os cenarios `bdd/features/lab11.feature` nao possuem steps Behave executaveis porque estes eram opcionais.
- O prototipo usa mocks e armazenamento local, nao uma API ou base de dados real.
- A integracao com Active Directory continua fora do escopo.
- O site publico depende do deploy da plataforma Lovable depois do push para GitHub.
