# Explicacao do Lab 12 - Testes Unitarios

## O que o Lab 12 pede

O Lab 12 pede testes unitarios automatizados com PyTest, assertions claras e evidencia de execucao local. Os entregaveis obrigatorios sao:

- testes em `tests/unit/` ou `tests/`
- `docs/unit_test_report.md`
- `docs/test_execution.md`
- evidencia de execucao

O escopo deve ter no maximo 3 requisitos e 6 criterios de aceitacao, com pelo menos 8 testes, 2 casos negativos e 1 teste de fronteira.

## Escopo selecionado

Foram escolhidos:

- `REQ-001` - validacao de campos obrigatorios
- `REQ-003` - inconsistencia de Disaster Recovery
- `REQ-005` - caducidade de evidencias

No total, foram automatizados 6 ACs destes 3 requisitos.

## Implementacao

As regras testaveis estao em `src/validations.py`:

- `validate_required_fields(data)`
- `validate_dr_consistency(data)`
- `clear_dr_date_when_disabled(data)`
- `validate_evidence_age(evidence_date, server_date)`

Os testes do Lab 12 estao em `tests/unit/test_validations.py`.

## Cobertura contabilizada

O escopo selecionado tem 9 testes:

- 4 testes happy path
- 4 testes negativos/de erro
- 1 teste de fronteira

Existem ainda 2 testes de regressao para `REQ-002`. Eles continuam na suite porque sao uteis, mas nao contam para o limite de requisitos selecionados do Lab 12:

- `test_dr_yes_with_test_date_is_valid`
- `test_dr_yes_without_test_date_is_inconsistent`

O teste de fronteira mais importante verifica a regra das evidencias:

- evidencia com 365 dias e aceite
- evidencia com 366 dias e rejeitada

Isto prova que a expressao "estritamente superior a 365 dias" foi aplicada corretamente.

## Arrange-Act-Assert

Os testes seguem a estrutura AAA:

- Arrange: preparar os dados de entrada
- Act: chamar a funcao de validacao
- Assert: verificar o resultado observavel

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

## Como executar

Para executar toda a suite:

```powershell
python -m pytest tests/unit -v
```

Para executar apenas o ficheiro associado ao Lab 12:

```powershell
python -m pytest tests/unit/test_validations.py -v
```

Na verificacao de 2026-06-02:

- suite completa do repositorio: 19 testes passaram
- ficheiro do Lab 12: 11 testes passaram
- escopo formal selecionado do Lab 12: 9 testes

## Limitacoes

Estes testes validam unidades isoladas de logica de negocio. Interface grafica, base de dados, APIs e integracoes externas exigem testes de integracao, sistema ou end-to-end.

## Como explicar oralmente

Selecionamos tres requisitos com regras deterministicas. Criamos testes unitarios com assertions sobre resultados observaveis e cobrimos caminhos validos, erros e a fronteira dos 365 dias. Mantivemos dois testes adicionais de regressao, mas deixamo-los explicitamente fora do escopo contabilizado para respeitar o limite de tres requisitos do enunciado.
