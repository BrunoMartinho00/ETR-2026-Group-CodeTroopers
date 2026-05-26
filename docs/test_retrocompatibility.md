# Retrocompatibilidade dos Testes — Lab 14

## Que alterações podem quebrar os nossos testes?

- Alterações nos requisitos:
  - Se a formulação dos requisitos ou os resultados esperados dos AC mudarem, os testes unitários e os cenários BDD podem ficar desatualizados.
  - Exemplo: se o limite de caducidade da evidência mudar de 365 dias para 180 dias, os testes `UT-08`, `UT-09`, `UT-11` e os cenários BDD de evidência têm de ser atualizados.

- Alterações na interface:
  - Os testes unitários do Lab 12 e os cenários BDD do Lab 13 não dependem de seletores de UI.
  - No entanto, casos de teste antigos com foco em UI podem ser afetados por mudanças em labels, nomes de campos ou layout.

- Refatoração:
  - Se os nomes das funções ou a estrutura de retorno em `src/validations.py` mudarem, os testes PyTest e as step definitions do Behave podem falhar.
  - A refatoração é segura apenas se o comportamento público e os campos devolvidos continuarem compatíveis.

- Ambiente/dependências:
  - PyTest e Behave precisam de estar instalados no ambiente local.
  - Mudanças de versão do Python ou das dependências podem afetar imports ou execução dos testes.

- Dados de teste:
  - Datas fixas são usadas intencionalmente para repetibilidade.
  - Se os requisitos passarem a depender apenas de tempo real/dinâmico do servidor, os dados de teste terão de ser revistos.

## Pontos frágeis (mínimo 3) + melhorias

1. Ponto frágil: Datas fixas nos testes unitários e nos cenários BDD de evidência.
   - Porque é frágil: Se o requisito mudar de 365 dias para outro limite, vários testes e cenários têm de ser atualizados.
   - Ação de melhoria: Manter os valores de fronteira documentados em `docs/traceability_master.md` e atualizar UT/BDD em conjunto quando o requisito mudar.

2. Ponto frágil: Códigos de erro como `MISSING_NAME`, `DR_DATE_FORBIDDEN` e `EVIDENCE_EXPIRED` são verificados exatamente.
   - Porque é frágil: Se os nomes dos códigos mudarem, os testes falham mesmo que o comportamento continue correto.
   - Ação de melhoria: Tratar estes códigos como códigos de validação de negócio estáveis; se apenas o texto visível mudar, os códigos não devem ser alterados.

3. Ponto frágil: As step definitions do Behave dependem dos nomes das funções em `src/validations.py`.
   - Porque é frágil: Renomear ou mover funções de validação pode quebrar a automação BDD mesmo que o comportamento continue correto.
   - Ação de melhoria: Manter as funções de validação como uma API estável ou atualizar imports e steps durante a refatoração.

4. Ponto frágil: Os cenários BDD do Lab 9 estão ligados na rastreabilidade, mas não foram automatizados no Lab 13.
   - Porque é frágil: Cenários apenas documentais podem afastar-se do comportamento realmente implementado.
   - Ação de melhoria: Em grooming futuro, automatizar os cenários do Lab 9 ou marcá-los claramente como BDD documental.

5. Ponto frágil: Os scores do Lighthouse dependem do estado da aplicação publicada e das condições do browser/rede.
   - Porque é frágil: Os resultados podem mudar devido a hosting, rede, versão do browser ou alterações de UI.
   - Ação de melhoria: Tratar Lighthouse como evidência de qualidade, não como teste funcional pass/fail, e registar sempre URL e data testados.