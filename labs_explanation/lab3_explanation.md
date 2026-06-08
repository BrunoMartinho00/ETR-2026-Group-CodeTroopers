# Explicacao do Lab 3 - Requirements v1, NFRs e Requirements Map

## O que o Lab 3 pedia

O Lab 3 pedia evoluir os requisitos iniciais do Lab 2 para uma versao mais estruturada.

O objetivo era transformar `requirements_v0` em `requirements_v1`, com IDs estaveis, estrutura consistente, requisitos detalhados, NFRs mensuraveis e um mapa por epicos.

Os entregaveis obrigatorios eram:

- `docs/requirements_v1.md`
- `docs/requirements_map.md`

O lab tambem exigia:

- IDs estaveis no formato `REQ-###`
- requisitos agrupados por epicos ou areas funcionais
- pelo menos 6 requisitos detalhados
- cada requisito detalhado com descricao, objetivo e draft acceptance criteria
- pelo menos 6 NFRs
- pelo menos 3 NFRs mensuraveis
- mapa de requisitos por epic/area
- alinhamento visivel com a variante

## Relacao com a Lesson 3

A Lesson 3 explica que os requisitos devem estar formalmente estruturados.

Isto significa que nao basta ter uma lista de ideias ou necessidades. Cada requisito deve ter uma identidade clara, uma justificacao e uma ligacao ao valor de negocio.

A lesson tambem introduz a cadeia:

```text
Objectives -> CSFs/FCSs -> Requirements
```

Esta cadeia ajuda a responder a pergunta:

```text
Porque e que este requisito existe?
```

No Lab 3, essa ideia foi aplicada ao ligar cada requisito funcional a um objetivo e a um FCS/CSF.

## Fonte usada

O Lab 3 usou como base:

- `docs/requirements_v0.md`
- `docs/variant_assignment.md`

O `requirements_v0` continha os requisitos iniciais vindos da elicitation.

O `variant_assignment` definiu o foco da equipa:

```text
Variant 4 - Data Quality & Consistency
```

Por isso, a versao v1 teve de mostrar claramente regras de qualidade, consistencia, validacao cruzada e prevencao de dados invalidos.

## Requirements v1

Foi criado/atualizado:

```text
docs/requirements_v1.md
```

Este ficheiro passou a conter os requisitos com uma estrutura mais completa.

Cada requisito funcional inclui:

- ID estavel
- titulo
- tipo
- stakeholder
- prioridade
- objetivo
- FCS/CSF
- descricao testavel
- impacto da variante
- criterios de aceitacao draft

Esta estrutura torna os requisitos mais faceis de rever, testar e mapear nos labs seguintes.

## IDs estaveis

Foram definidos IDs de `REQ-001` a `REQ-009`.

Exemplos:

- `REQ-001` - Validacao de Campos Obrigatorios
- `REQ-002` - Condicionalidade de Teste de Disaster Recovery
- `REQ-003` - Detecao de Inconsistencia de DR
- `REQ-005` - Validacao de Caducidade de Evidencias
- `REQ-007` - Prevencao de Duplicados
- `REQ-009` - Transicao para Ready to Proceed

Os IDs sao importantes porque, a partir deste lab, nao devem ser renumerados.

Eles vao ser usados mais tarde em:

- criterios de aceitacao
- casos de uso
- casos de teste
- BDD scenarios
- matrizes de rastreabilidade

## Objetivos e FCS/CSF

Cada requisito foi ligado a um objetivo.

Os principais objetivos usados foram:

- `OBJ-1` - Garantir a integridade e consistencia dos dados de inventario
- `OBJ-2` - Assegurar a rastreabilidade e auditabilidade do processo de Intake
- `OBJ-3` - Otimizar a eficiencia operacional e resiliencia do sistema

Tambem foram usados FCS/CSFs.

Exemplos:

- `FCS-1` - Dados de inventario sao consistentes, unicos e validados antes do estado operacional
- `FCS-2` - Alteracoes a dados criticos e responsabilidades sao totalmente rastreaveis
- `FCS-3` - O sistema fornece feedback imediato, e fiavel e permite fluxos de trabalho flexiveis

Esta ligacao mostra que os requisitos nao sao aleatorios. Cada um contribui para um resultado esperado do projeto.

## Requisitos funcionais detalhados

O ficheiro contem 9 requisitos funcionais.

Isto ultrapassa o minimo de 6 requisitos detalhados pedido pelo lab.

Os requisitos cobrem:

- campos obrigatorios
- condicionalidade de Disaster Recovery
- inconsistencias de DR
- dashboard URL
- caducidade de evidencias
- owner de integracoes
- duplicados
- estado Draft
- transicao para `Ready to Proceed`

Cada requisito tem uma descricao testavel.

Por exemplo, em vez de dizer apenas que os dados devem ser bons, os requisitos dizem quando o sistema deve bloquear, aceitar, rejeitar ou alterar o estado.

## Draft acceptance criteria

Cada requisito funcional tem criterios de aceitacao draft.

Estes criterios ainda nao sao a versao final dos ACs, mas ja ajudam a preparar os labs seguintes.

Exemplos de comportamentos verificaveis:

- bloquear submissao quando campos obrigatorios estao vazios
- manter o estado como `Incomplete`
- rejeitar data futura
- bloquear `Ready to Proceed` quando existe inconsistencia
- rejeitar URL sem `https://`
- aceitar hostnames unicos
- permitir guardar como `Draft`

Isto reforca a regra da Lesson 3: um requisito deve ser escrito de forma que possa ser validado e testado.

## NFRs

Tambem foram definidos 6 requisitos nao funcionais:

- `NFR-001` - Log de Auditoria
- `NFR-002` - Performance de Validacao
- `NFR-003` - Disponibilidade
- `NFR-004` - Qualidade de Dados Garantida
- `NFR-005` - Tempo de Resposta da UI
- `NFR-006` - Retencao de Logs

Cada NFR inclui:

- tipo
- descricao
- metrica/threshold
- condicoes
- measurement approach
- impacto da variante

Isto foi feito porque a Lesson 3 e o Lab 3 avisam que NFRs vagos, como "rapido" ou "seguro", nao sao suficientes.

## NFRs mensuraveis

Pelo menos 3 NFRs tinham de ser mensuraveis.

O projeto tem mais do que 3:

| NFR | Metrica |
|---|---|
| `NFR-001` | 100% das alteracoes criticas geram log |
| `NFR-002` | resposta inferior a 500ms para 95% dos pedidos |
| `NFR-003` | uptime mensal minimo de 99.9% |
| `NFR-004` | 100% dos Intakes em Ready cumprem regras de consistencia |
| `NFR-005` | feedback visual em menos de 1 segundo |
| `NFR-006` | logs retidos por pelo menos 12 meses |

Tambem foi indicada uma forma de medir cada NFR.

Isto e importante porque um NFR so pode ser validado se existir uma forma clara de medir o seu cumprimento.

## Alinhamento com a variante

A Variante 4 influencia diretamente varios requisitos.

Requisitos funcionais com impacto da variante:

- `REQ-001`
- `REQ-002`
- `REQ-003`
- `REQ-005`
- `REQ-007`
- `REQ-008`
- `REQ-009`

NFRs com impacto da variante:

- `NFR-002`
- `NFR-004`
- `NFR-005`

Isto cumpre a regra do Lab 3, que pedia:

```text
5 requirements variant-influenced
```

ou:

```text
3 requirements + 2 NFRs variant-influenced
```

O projeto cumpre as duas formas, porque tem varios FRs e NFRs ligados a qualidade e consistencia de dados.

## Requirements Map

Foi criado/atualizado:

```text
docs/requirements_map.md
```

Este ficheiro agrupa os requisitos por epicos.

Foram definidos 4 epicos:

- `EPIC-1` - Intake Session & Lifecycle
- `EPIC-2` - Data Quality & Consistency
- `EPIC-3` - Evidence & Integrations
- `EPIC-4` - Audit & Compliance

O mapa ajuda a perceber que areas do sistema estao cobertas pelos requisitos.

Tambem ajuda a evitar que existam requisitos soltos sem area funcional associada.

## Epic coverage

O mapa mostra a distribuicao dos requisitos:

| Epic | Conteudo principal |
|---|---|
| `EPIC-1` | recolha, ciclo de vida e estados do Intake |
| `EPIC-2` | validacoes de qualidade, consistencia, caducidade e duplicados |
| `EPIC-3` | evidencias externas e owners de integracoes |
| `EPIC-4` | auditoria, disponibilidade e retencao de logs |

O `EPIC-2` e o mais ligado a variante, porque concentra as regras de Data Quality & Consistency.

## Porque estes artefactos foram feitos

Cada artefacto tem uma funcao:

| Artefacto | Funcao |
|---|---|
| `docs/requirements_v1.md` | formalizar requisitos com IDs, estrutura, objetivos, FCS/CSF e ACs draft |
| `docs/requirements_map.md` | organizar requisitos por epic/area e mostrar cobertura da variante |

A cadeia principal do Lab 3 ficou:

```text
Requirements v0 -> Requirements v1 -> Requirements Map
```

Isto prepara os proximos labs, onde os requisitos vao ser ligados a use cases, acceptance criteria, testes e evidencias.

## Como explicar o Lab

Neste lab, pegamos nos requisitos iniciais do Lab 2 e transformamo-los numa versao mais formal.

Primeiro, atribuímos IDs estaveis a cada requisito.

Depois, detalhamos os requisitos funcionais com stakeholder, prioridade, objetivo, FCS/CSF, descricao e criterios de aceitacao draft.

Tambem criamos 6 NFRs mensuraveis, incluindo performance, disponibilidade, qualidade de dados, feedback visual, auditoria e retencao de logs.

Por fim, organizamos tudo num mapa por epicos para mostrar a cobertura funcional e a influencia da Variante 4.

## Resultado final

O Lab 3 ficou com:

- `REQ-001` a `REQ-009`
- 9 requisitos funcionais detalhados
- objetivos associados aos requisitos
- FCS/CSF associado aos requisitos
- criterios de aceitacao draft
- 6 NFRs
- mais de 3 NFRs mensuraveis
- measurement approach para cada NFR
- 4 epicos no requirements map
- resumo de cobertura da variante
- variante claramente visivel em FRs e NFRs

## Limitacoes

Os acceptance criteria ainda sao draft.

Isto e normal no Lab 3, porque os criterios de aceitacao vao ser trabalhados com mais detalhe em labs posteriores.

Tambem nao existe ainda uma matriz completa de rastreabilidade ate testes. Nesta fase, o objetivo e preparar a estrutura para essa rastreabilidade ser criada depois.
