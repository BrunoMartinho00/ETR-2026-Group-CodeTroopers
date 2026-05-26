# BDD Automation Report — Lab 13

## Tool used
- BDD tool: Behave
- Language/stack: Python
- Feature syntax: Gherkin

## How to run
- Command:
  - `python -m behave bdd/features/lab13.feature`

## Execution results
- Date: 2026-05-26
- Feature files executed: 1
- Scenarios executed: 6
- Passed: 6
- Failed: 0
- Steps executed: 28
- Steps passed: 28
- Steps failed: 0

## Evidence
Execution summary:

```text
1 feature passed, 0 failed, 0 skipped
6 scenarios passed, 0 failed, 0 skipped
28 steps passed, 0 failed, 0 skipped
Took 0min 0.028s
```

## Notes
- What worked well:
  - The BDD scenarios were automated using Behave.
  - The scenarios call the existing Python validation logic from `src/validations.py`.
  - The suite covers happy path, negative path, alternative flow, and boundary behavior.

- What failed and why:
  - No failures were observed during execution.

- Next steps:
  - Extend BDD coverage to additional workflows if the system grows.
  - Add integration or UI-level BDD only if the UI becomes stable enough for reliable automation.