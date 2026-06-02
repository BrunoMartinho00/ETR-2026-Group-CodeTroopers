# Execucao de Testes — Lab 12

## Stack
- Linguagem: Python
- Framework de testes: PyTest
- Requisitos de versao:
  - Python 3.10.11
  - PyTest 9.0.3

## Setup
1. Abrir um terminal na raiz do repositorio.
2. Instalar PyTest:
   - `python -m pip install pytest`
3. Nao sao necessarias variaveis de ambiente.

## Executar todos os testes unitarios
- Comando:
  - `python -m pytest tests/unit -v`

## Executar um ficheiro de teste
- Comando:
  - `python -m pytest tests/unit/test_validations.py -v`
  - Este ficheiro contem os 11 testes associados ao Lab 12: 9 do escopo selecionado e 2 testes adicionais de regressao.

## Executar um teste especifico
- Comando:
  - `python -m pytest tests/unit/test_validations.py::test_evidence_365_days_old_is_accepted -v`

## Notas
- A suite completa tambem inclui os 8 testes test-first criados no Lab 11 em `tests/unit/test_lab11_validations.py`.
- Limitacoes conhecidas:
  - Estes testes cobrem apenas regras puras de validacao/negocio.
  - Interface grafica, base de dados, API e servicos externos estao fora do escopo desta suite de testes unitarios.
- Dicas de troubleshooting:
  - Se o PyTest nao estiver instalado, executar `python -m pip install pytest`.
  - Executar os comandos a partir da raiz do repositorio para que os imports de `src` sejam resolvidos corretamente.
  - A opcao `-v` mostra o nome e o resultado de cada teste.
