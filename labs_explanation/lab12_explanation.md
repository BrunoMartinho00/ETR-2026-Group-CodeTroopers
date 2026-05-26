# Explicacao do Lab 12 - Testes Unitarios

## O que o Lab 12 pedia

O Lab 12 pedia que a equipa demonstrasse testes unitarios automatizados usando PyTest.

Os entregaveis obrigatorios eram:

- Testes unitarios em `tests/unit/` ou `tests/`
- `docs/unit_test_report.md`
- `docs/test_execution.md`
- Evidencia de que os testes foram executados localmente

O lab tambem exigia:

- Pelo menos 8 testes unitarios
- Pelo menos 2 testes negativos/de erro
- Pelo menos 1 teste de fronteira
- Testes mapeados para requisitos e criterios de aceitacao
- Um comando consistente para correr os testes localmente

## Escopo selecionado

O lab permitia escolher no maximo 3 requisitos e 6 criterios de aceitacao.

Foram escolhidos 3 requisitos adequados para testes unitarios, porque representam regras puras de validacao/negocio:

- `REQ-001` - Validacao de campos obrigatorios
- `REQ-003` - Validacao de consistencia de Disaster Recovery
- `REQ-005` - Validacao de caducidade de evidencias

Estes requisitos foram escolhidos porque podem ser testados sem interface grafica, base de dados, API ou servicos externos.

## Criterios de aceitacao automatizados

### REQ-001 - Campos obrigatorios

ACs automatizados:

- `AC-1`: Validar que Nome, Owner e Modelo de Suporte estao presentes antes da submissao final.
- `AC-2`: Remover espacos invisiveis com `trim()` e rejeitar campos que contenham apenas espacos.

### REQ-003 - Inconsistencia de DR

ACs automatizados:

- `AC-2`: Limpar a data do teste de DR quando o DR e alterado para "Nao".
- `AC-3`: Rejeitar submissoes em que DR e "Nao" mas existe uma data de teste preenchida.

### REQ-005 - Caducidade de evidencias

ACs automatizados:

- `AC-1`: Comparar a data da evidencia com a data do servidor.
- `AC-2`: Rejeitar a evidencia quando a idade for estritamente superior a 365 dias.

## Implementacao criada

Como o repositorio continha principalmente documentacao e ainda nao tinha codigo Python de implementacao, foi criado um pequeno modulo de validacao em Python:

```text
src/validations.py
```

Este ficheiro contem as funcoes de regras de negocio testadas pelo PyTest:

- `validate_required_fields(data)`
- `validate_dr_consistency(data)`
- `clear_dr_date_when_disabled(data)`
- `validate_evidence_age(evidence_date, server_date)`

O objetivo nao foi criar uma aplicacao completa, mas sim criar unidades testaveis de logica de negocio que correspondem aos requisitos selecionados.

## Testes unitarios criados

O ficheiro de testes e:

```text
tests/unit/test_validations.py
```

Ele contem 11 testes unitarios:

| Test ID | Nome do teste | Tipo |
|---|---|---|
| UT-01 | `test_required_fields_accept_valid_values` | Happy |
| UT-02 | `test_required_fields_trim_extra_spaces` | Happy |
| UT-03 | `test_required_fields_reject_whitespace_only_name` | Negative |
| UT-04 | `test_required_fields_reject_missing_owner` | Negative |
| UT-05 | `test_dr_yes_with_test_date_is_valid` | Happy |
| UT-06 | `test_dr_no_with_test_date_is_inconsistent` | Negative |
| UT-07 | `test_dr_date_is_cleared_when_dr_changes_to_no` | Happy |
| UT-08 | `test_evidence_365_days_old_is_accepted` | Boundary |
| UT-09 | `test_evidence_366_days_old_is_rejected` | Negative |
| UT-10 | `test_dr_yes_without_test_date_is_inconsistent` | Negative |
| UT-11 | `test_evidence_300_days_old_is_accepted` | Happy |

## Resumo da cobertura

A cobertura final e:

- Testes happy path: 5
- Testes negativos/de erro: 5
- Testes de fronteira: 1
- Total de testes: 11

Isto ultrapassa os requisitos minimos do lab.

## Estrutura Arrange-Act-Assert

Os testes seguem a estrutura Arrange-Act-Assert:

- Arrange: preparar os dados de entrada
- Act: chamar a funcao de validacao
- Assert: verificar o resultado devolvido

Exemplo:

```python
def test_evidence_366_days_old_is_rejected():
    server_date = date(2026, 5, 26)
    evidence_date = date(2025, 5, 25)

    result = validate_evidence_age(evidence_date, server_date)

    assert result["is_valid"] is False
    assert result["status"] == "Rejected"
    assert result["error"] == "EVIDENCE_EXPIRED"
    assert result["age_days"] == 366
```

Este teste valida comportamento observavel, nao detalhes internos da implementacao.

## Como os testes foram executados

O PyTest foi instalado com:

```powershell
python -m pip install pytest
```

Todos os testes unitarios foram executados com:

```powershell
python -m pytest tests/unit -q
```

Resultado final:

```text
11 passed in 0.04s
```

## Ficheiros de evidencia

A evidencia oficial do Lab 12 esta documentada em:

```text
docs/unit_test_report.md
docs/test_execution.md
```

O ficheiro `docs/unit_test_report.md` contem:

- REQs e ACs selecionados
- Lista e mapeamento dos testes
- Checklist de cobertura
- Evidencia de execucao

O ficheiro `docs/test_execution.md` contem:

- Linguagem e framework
- Passos de setup
- Comando para correr todos os testes
- Comando para correr um ficheiro de teste
- Comando para correr um teste especifico
- Limitacoes conhecidas

## Limitacoes conhecidas

Estes testes focam-se apenas em regras puras de validacao/negocio.

Eles nao testam:

- Interface grafica
- Persistencia em base de dados
- Chamadas de API
- Autenticacao
- Integracoes externas

Essas areas exigiriam testes de integracao, sistema ou end-to-end, nao testes unitarios.

## Como explicar o Lab

Neste lab, selecionamos uma area pequena e coerente de validacao do projeto. Escolhemos regras deterministicas e faceis de testar automaticamente.

Foi implementado um pequeno modulo Python de validacao e depois foram escritos testes unitarios em PyTest para esse modulo. Os testes verificam resultados esperados, estados de validacao, codigos de erro, dados limpos e comportamento de fronteira.

O teste de fronteira mais importante e a regra da idade da evidencia:

- Evidencia com 365 dias e aceite
- Evidencia com 366 dias e rejeitada

Isto prova que a regra "estritamente superior a 365 dias" foi interpretada corretamente.

A suite final tem 11 testes a passar e pode ser executada de forma consistente com um unico comando:

```powershell
python -m pytest tests/unit -q
```

