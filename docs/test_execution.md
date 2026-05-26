# Test Execution — Lab 12

## Stack
- Language: Python
- Test framework: PyTest
- Version requirements:
  - Python 3.10.11
  - PyTest 9.0.3

## Setup
1. Open a terminal in the repository root.
2. Install PyTest:
   - `python -m pip install pytest`
3. No environment variables are required.

## Run all unit tests
- Command:
  - `python -m pytest tests/unit -q`

## Run a single test file
- Command:
  - `python -m pytest tests/unit/test_validations.py -q`

## Run a single test
- Command:
  - `python -m pytest tests/unit/test_validations.py::test_evidence_365_days_old_is_accepted -q`

## Notes
- Known limitations:
  - These tests cover pure validation/business rules only.
  - UI, database, API, and external service behavior are outside the scope of this unit test suite.
- Troubleshooting tips:
  - If PyTest is missing, run `python -m pip install pytest`.
  - Run commands from the repository root so imports from `src` resolve correctly.