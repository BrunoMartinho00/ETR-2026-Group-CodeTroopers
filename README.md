# CodeTroopers - Projeto ETR 2026

## Identificação da Equipa
* *Duarte Martins* (a22400561)
* *Bruno Martinho* (a22400694)
* *Diogo Sá* (a22409245)
* *Denivaldo Antonio* (a22308169)

## Papéis (Lab 1)
* **Scribe (updates GitBook/docs)** Duarte Martins
* **Facilitator (keeps time and focus)** Bruno Martinho
* **Tester (makes sure tests run)** Diogo Sá
* **Reviewer (checks quality)** Denivaldo Antonio

## Projeto Escolhido
*Opção A:* Variant 4 - Data Quality & Consistency (Data Steward Persona)

## Stack Tecnológica
* Linguagem: Python
* Testes Unitários: PyTest
* BDD: Behave (ou pytest-bdd)

## Configuração do ambiente

Requisitos:
- Python 3.10 ou superior
- pip

Criar ambiente virtual:

```bash
python -m venv venv
```

Ativar ambiente virtual no Windows:

```bash
venv\Scripts\activate
```

Instalar dependências:

```bash
python -m pip install -r requirements.txt
```

## Executar a aplicação

```bash
python -m src.app
```

## Executar testes unitários

```bash
python -m pytest tests/unit/test_validations.py tests/unit/test_lab11_validations.py -q
```

## Executar testes BDD

```bash
python -m behave bdd/features/lab13.feature
```

## Notas sobre testes adicionais

O ficheiro `tests/unit/tests_selenium.py` contém testes de interface com Selenium e depende de Chrome/ChromeDriver e da aplicação publicada externamente. Por isso, estes testes não fazem parte da execução principal de validação local.

Os ficheiros `bdd/features/lab9.feature` e `bdd/features/lab11.feature` documentam cenários adicionais, mas a feature automatizada com Behave para validação local é `bdd/features/lab13.feature`.
