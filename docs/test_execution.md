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
  - `python -m pytest tests/unit -q`

## Executar um ficheiro de teste
- Comando:
  - `python -m pytest tests/unit/test_validations.py -q`

## Executar um teste especifico
- Comando:
  - `python -m pytest tests/unit/test_validations.py::test_evidence_365_days_old_is_accepted -q`

## Notas
- Limitacoes conhecidas:
  - Estes testes cobrem apenas regras puras de validacao/negocio.
  - Interface grafica, base de dados, API e servicos externos estao fora do escopo desta suite de testes unitarios.
- Dicas de troubleshooting:
  - Se o PyTest nao estiver instalado, executar `python -m pip install pytest`.
  - Executar os comandos a partir da raiz do repositorio para que os imports de `src` sejam resolvidos corretamente.
