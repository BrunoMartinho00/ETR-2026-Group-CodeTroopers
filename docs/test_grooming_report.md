# Relatório de Test Grooming — Lab 14

## Ações de grooming realizadas (mínimo 5)

1. Ação: Consolidação da rastreabilidade principal.
   - Ficheiro(s): `docs/traceability_master.md`
   - Porquê: Criar uma fonte única para ligar REQ → AC → TC/UT → BDD → Evidence.

2. Ação: Identificação de lacunas de cobertura.
   - Ficheiro(s): `docs/gap_analysis_lab14.md`
   - Porquê: Detetar requisitos, ACs ou testes que ainda não têm cobertura automatizada ou ligação clara.

3. Ação: Revisão de retrocompatibilidade dos testes.
   - Ficheiro(s): `docs/test_retrocompatibility.md`
   - Porquê: Identificar pontos frágeis que podem quebrar os testes quando os requisitos, UI, código ou ambiente mudarem.

4. Ação: Normalização da documentação dos Labs 12 e 13 para português.
   - Ficheiro(s): `docs/unit_test_report.md`, `docs/test_execution.md`, `docs/bdd_report.md`, `docs/traceability_req_bdd.md`
   - Porquê: Manter consistência com o resto da documentação do projeto.

5. Ação: Ligação dos testes unitários à matriz master.
   - Ficheiro(s): `docs/traceability_master.md`
   - Porquê: Garantir que `UT-01` a `UT-11` estão ligados aos respetivos REQs, ACs e evidência.

6. Ação: Ligação dos cenários BDD à matriz master.
   - Ficheiro(s): `docs/traceability_master.md`, `docs/traceability_req_bdd.md`
   - Porquê: Garantir que os cenários do Lab 13 estão ligados aos REQs e ACs correspondentes.

7. Ação: Ligação da evidência Lighthouse ao NFR-002.
   - Ficheiro(s): `docs/traceability_master.md`, `docs/lighthouse_report.md`
   - Porquê: Associar a avaliação de qualidade UI/performance à rastreabilidade de requisitos não funcionais.

## Atualizações de rastreabilidade
- O `docs/traceability_master.md` foi criado como matriz consolidada.
- Foram ligados requisitos funcionais, NFRs, ACs, casos de teste, unit tests, cenários BDD e evidências.
- Foi resolvida a lacuna de rastreabilidade do REQ-004 ao ligar os testes Lab 11 de Dashboard URL.
- Permanecem lacunas de automação futura em REQ-006, NFR-001 e NFR-002.

## Evidência de execução dos testes
- Data: 2026-06-08
- Comandos usados:
  - `python -m pytest tests/unit -q`
  - `python -m behave bdd/features/lab13.feature`

- Testes unitários:
  - Executados: 19
  - Passaram: 19
  - Falharam: 0

- Cenários BDD:
  - Executados: 6
  - Passaram: 6
  - Falharam: 0

- Steps BDD:
  - Executados: 28
  - Passaram: 28
  - Falharam: 0

## Notas sobre falhas
- Não foram observadas falhas durante a execução.
- Os testes atuais mostraram-se estáveis porque usam funções puras de validação e não dependem de seletores de UI.

## Lições aprendidas
- A principal fonte de fragilidade é a alteração futura dos requisitos, especialmente limites como os 365 dias de validade da evidência.
- A melhoria de maior valor foi consolidar a rastreabilidade numa matriz única, porque facilita perceber que testes e evidências cobrem cada requisito.
- A automação BDD ficou mais estável por chamar diretamente a lógica de negócio em `src/validations.py`, em vez de depender da interface gráfica.
