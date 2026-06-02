# Lab 12 — Testes Unitários (PyTest/JUnit):

## Asserções + Execução de Testes + Evidências

**Ferramentas:** PyTest *(Python)* ou JUnit *(Java)*\
**Entrada:** `docs/requirements_v1.md`, `docs/acceptance_criteria.md`, `docs/test_plan.md` *(e a tua implementação dos Labs 11/8)*\
**Saída:** testes unitários + `docs/unit_test_report.md` + `docs/test_execution.md`

Este laboratório foca-se na escrita de **testes unitários** com **asserções** (*assertions*) fortes e na sua execução de forma consistente.\
Vais demonstrar que os requisitos principais / Critérios de Aceitação (AC) podem ser validados através de testes unitários automatizados.

> **Regra do GitHub:** Todos os entregáveis devem ser submetidos (*committed*) no **repositório GitHub da tua equipa** utilizando os caminhos exatos listados abaixo.\
> Se não estiver no repositório, não é considerado entregue.

***

### <mark style="color:blue;">Objetivos</mark>

No final do Lab 12, a tua equipa deve:

* Escrever testes unitários para regras de validação/negócio centrais
* Usar asserções claras que validem o comportamento (e não a implementação)
* Incluir cobertura de testes negativos e de fronteira (*boundary*)
* Executar os testes localmente usando um comando consistente
* Registar evidências de execução (resumo de aprovação/falha e como executar)

***

### <mark style="color:blue;">Regra de Âmbito (Scope)</mark>

Seleciona **uma** área coerente e testa-a exaustivamente:

* Escolhe no máximo **3 requisitos** (REQ-###)
* Escolhe **6 critérios de aceitação** no total (distribuídos por esses requisitos)

Os teus testes unitários devem cobrir:

* ≥ 4 asserções de caminho feliz (*happy-path*)
* ≥ 2 casos negativos/de erro
* ≥ 1 teste de fronteira (*boundary*)

> Dica: Os melhores candidatos são regras de validação, transformações, cálculos de pontuação ou lógica de formatação de exportação.

***

### <mark style="color:blue;">Tarefas na aula (passo a passo)</mark>

#### <mark style="color:$primary;">1) Selecionar REQs e ACs</mark>

No ficheiro `docs/unit_test_report.md`, lista:

* os 3 REQs selecionados
* os itens de AC que estás a automatizar

***

#### <mark style="color:$primary;">2) Implementar os testes unitários (mínimo 8)</mark>

Cria **pelo menos 8 testes unitários**.

Regras:

* Cada teste deve mapear claramente para um REQ + AC
* Usar a estrutura Preparar-Agir-Verificar (*Arrange–Act–Assert*)
* Usar asserções significativas (resultado esperado, exceção levantada, resultado bloqueado, etc.)
* Incluir:
  * ≥ 2 testes negativos/de erro
  * ≥ 1 teste de fronteira (*boundary*)

***

#### <mark style="color:$primary;">3) Adicionar um guia de “como executar os testes”</mark>

Cria o ficheiro `docs/test_execution.md` com:

* pré-requisitos (ambiente de execução/versão)
* passos de instalação/configuração
* o comando para executar todos os testes
* o comando para executar um único ficheiro de testes
* o comando para executar um teste específico (opcional, mas recomendado)

***

#### <mark style="color:$primary;">4) Executar os testes e registar evidências</mark>

Executa a tua suite de testes e regista:

* resumo de testes passados/falhados (*pass/fail summary*)
* número de testes executados
* quaisquer limitações conhecidas (se aplicável)

Adiciona esta evidência ao ficheiro `docs/unit_test_report.md`.

***

### <mark style="color:blue;">Submissão / Entregáveis</mark>

Faz *commit* no repositório GitHub da tua equipa:

* Testes unitários (código):
  * Python: `tests/unit/` *(ou `tests/`)*
  * Java: `src/test/java/` *(JUnit)*
* `docs/test_execution.md`
* `docs/unit_test_report.md`

Opcional (recomendado):

* *screenshot* do output da consola guardado em `docs/assets/`

***

### <mark style="color:blue;">Critérios de Aceitação (entrega)</mark>

A tua entrega do Lab 12 é aceite quando:

* ✅ ≥ 8 testes unitários existem e são executados com sucesso
* ✅ Pelo menos:
  * 2 testes negativos/de erro
  * 1 teste de fronteira (*boundary*)
* ✅ Cada teste mapeia para um REQ-### e itens de AC (documentado)
* ✅ O ficheiro `docs/test_execution.md` explica como executar os testes localmente
* ✅ O ficheiro `docs/unit_test_report.md` inclui:
  * lista de REQs selecionados + AC
  * resumo da cobertura de testes
  * evidências de execução (testes corridos + resultado)
* ✅ Todos os entregáveis receberam *commit* nos caminhos corretos

***

### <mark style="color:blue;">Modelos (copiar/colar)</mark>

#### `docs/test_execution.md`

```markdown
# Execução de Testes — Lab 12

## Stack Tecnológica
- Linguagem: Python / Java
- Framework de testes: PyTest / JUnit
- Requisitos de versão:

## Configuração
1. <passos de instalação>
2. <dependências>
3. <variáveis de ambiente (se existirem)>

## Executar todos os testes unitários
- Comando:
  - `...`

## Executar um único ficheiro de testes
- Comando:
  - `...`

## Executar um teste específico (opcional)
- Comando:
  - `...`

## Notas
- Limitações conhecidas:
- Dicas de resolução de problemas: