# Explicacao do Lab 6 - Use Case Refinement, Complete Syntax e Traceability

## O que o Lab 6 pedia

O Lab 6 continuava o trabalho do Lab 5.

O objetivo era refinar o diagrama de casos de uso, melhorar a qualidade das descricoes e criar uma ligacao explicita entre use cases e requisitos.

Os entregaveis obrigatorios eram:

- `docs/use_case_diagram_v2.md`
- `docs/use_cases_v2.md`
- `docs/traceability_uc_req.md`
- um diagrama atualizado em `docs/diagrams/`

No projeto, os ficheiros usados foram:

- `docs/use_case_diagram_v2.md`
- `docs/use_cases_v2.md`
- `docs/traceability_uc_req.md`
- `docs/diagrams/use_case_diagram_v2.puml`
- `docs/diagrams/use_case_diagram_v2.png`

## Relacao com a Lesson 6

A Lesson 6 aprofunda a Lesson 5.

O foco deixa de ser apenas criar um diagrama inicial e passa a ser melhorar a qualidade dos use cases.

Nesta fase, os use cases devem ter:

- atores externos corretos
- fronteira do sistema clara
- nomes estaveis
- `include` e `extend` usados apenas quando fazem sentido
- fluxo principal
- fluxos alternativos
- excecoes/erros
- precondicoes e pos-condicoes
- ligacao a requisitos

Isto prepara os documentos para acceptance criteria, test cases e BDD scenarios nos labs seguintes.

## Scope refinado

O scope confirmado foi:

```text
Intake & Discovery
```

O sistema modelado foi:

```text
AMS Intake & Data Quality Platform
```

O foco do refinamento continuou a ser a Variante 4:

```text
Data Quality & Consistency
```

Isto significa que o diagrama e os use cases continuam limitados ao processo de intake, qualidade dos dados, validacoes, rascunhos, evidencias, inconsistencias e auditoria.

## Use Case Diagram v2

Foi criado/atualizado:

```text
docs/use_case_diagram_v2.md
```

Este ficheiro documenta:

- system boundary
- slice covered
- atores
- lista de use cases
- path do diagrama

O diagrama v2 esta em:

```text
docs/diagrams/use_case_diagram_v2.puml
docs/diagrams/use_case_diagram_v2.png
```

## Atores no Lab 6

Foram mantidos 3 atores:

### End User

Responsavel pela submissao inicial de dados e evidencias.

### Data Steward

Persona principal da Variante 4.

Responsavel pela auditoria de qualidade e resolucao de conflitos de dados.

### Asset Database

Sistema externo usado para validar a unicidade dos ativos.

Este ator e externo ao sistema, porque fornece informacao usada na verificacao de duplicados.

## Use cases refinados

O diagrama v2 contem 6 use cases:

- `UC-01` - Submeter Novo Ativo
- `UC-02` - Gerir Rascunhos
- `UC-03` - Carregar Evidencia
- `UC-04` - Validar Regras de Consistencia
- `UC-05` - Resolver Inconsistencias
- `UC-06` - Exportar Logs de Auditoria

O `UC-04` foi ajustado para evitar uma designacao demasiado tecnica.

Em vez de ficar como "Backend" ou "Motor de Backend", ficou como:

```text
Validar Regras de Consistencia
```

Isto esta mais alinhado com a Lesson 6, que recomenda use cases em linguagem de capacidade/objetivo, nao em linguagem tecnica.

## Include e extend

O diagrama usa `include` e `extend` de forma justificada.

### Include

O `UC-01` inclui `UC-04`.

Isto faz sentido porque submeter um novo ativo exige sempre validar regras de consistencia.

O `UC-01` tambem inclui `UC-03`.

Isto representa que a submissao inclui a recolha/carregamento de evidencia quando aplicavel ao intake.

### Extend

O `UC-05` estende `UC-04`.

Isto faz sentido porque resolver inconsistencias so acontece quando a validacao encontra problemas.

Ou seja, e um comportamento condicional.

## Use Cases v2

Foi criado/atualizado:

```text
docs/use_cases_v2.md
```

Este ficheiro contem descricoes mais completas dos use cases.

O Lab 6 pedia pelo menos 2 use cases completos.

O projeto tem pelo menos 4 use cases bem detalhados:

- `UC-01`
- `UC-02`
- `UC-03`
- `UC-04`

## UC-01 - Submeter Novo Ativo

O `UC-01` representa o fluxo principal do intake.

Ele inclui:

- primary actor
- supporting actors
- goal
- preconditions
- trigger
- postconditions de sucesso
- postconditions de falha
- related requirements
- main flow
- 2 alternative flows
- 2 exceptions/errors

Este use case cobre o caminho principal de submissao e liga requisitos como:

- `REQ-001`
- `REQ-002`
- `REQ-004`
- `REQ-006`
- `REQ-007`
- `REQ-008`
- `REQ-009`
- `NFR-004`
- `NFR-005`

## UC-02 - Guardar Rascunho

O `UC-02` foi reforcado para ficar mais completo.

Foi adicionada postcondition de falha, uma segunda alternativa e uma segunda excecao.

Este use case cobre a capacidade de guardar progresso sem executar todas as validacoes finais.

Isto e importante para separar:

```text
Draft
```

de:

```text
Ready to Proceed
```

Esta separacao e relevante para a Variante 4 porque evita que dados incompletos ou inconsistentes entrem no estado final.

## UC-03 - Upload de Evidencias

O `UC-03` tambem foi reforcado.

Foi adicionada:

- postcondition de falha
- alternativa para data de evidencia introduzida manualmente
- excecao para data futura ou invalida

Este use case esta ligado ao `REQ-005`, porque a evidencia operacional deve ser recente e valida.

Tambem reflete a Variante 4, porque evidencia expirada ou invalida e uma fonte de dados pouco fiavel.

## UC-04 - Validar Regras de Consistencia

O `UC-04` e o nucleo da Variante 4.

Foi ajustado para ter:

- primary actor externo: `Data Steward`
- supporting actors: `Transition Lead` e `Asset Database`
- goal claro
- preconditions
- trigger
- postconditions de sucesso e falha
- main flow
- 2 alternative flows
- 2 exceptions/errors
- related requirements

O `UC-04` valida:

- campos obrigatorios
- regras de Disaster Recovery
- contradicoes entre campos
- caducidade de evidencia
- unicidade de Hostname
- possibilidade de transitar para `Ready to Proceed`

## Variant-driven flows

O Lab 6 pedia pelo menos uma alternative flow ou exception ligada a variante.

O projeto tem varias.

Exemplos:

- `UC-04 / E1`: inconsistencia logica de DR
- `UC-04 / E2`: duplicado encontrado
- `UC-03 / E1`: evidencia expirada
- `UC-03 / E2`: data futura ou invalida
- `UC-02 / A2`: guardar draft com inconsistencias sem permitir `Ready`

Estas situacoes mostram claramente a influencia da Variante 4.

## Traceability UC-REQ

Foi criado:

```text
docs/traceability_uc_req.md
```

Este ficheiro liga todos os use cases aos requisitos.

A matriz cobre:

- `UC-01`
- `UC-02`
- `UC-03`
- `UC-04`
- `UC-05`
- `UC-06`

Cada use case tem requisitos associados quando faz sentido.

Exemplos:

- `UC-01` cobre submissao, recolha de dependencias e feedback visual
- `UC-04` cobre validacao de consistencia, performance e qualidade dos dados
- `UC-06` cobre audit trail e retencao de logs

## Gaps e observacoes

O documento de traceability tambem regista observacoes.

Uma delas explica que `NFR-003`, disponibilidade, nao esta ligado a um use case interativo especifico.

Isto faz sentido porque disponibilidade e um atributo transversal do sistema, nao uma acao executada por um ator.

Este tipo de observacao e importante porque mostra que a equipa analisou a cobertura em vez de ligar requisitos de forma artificial.

## Porque estes artefactos foram feitos

Cada ficheiro tem uma funcao:

| Artefacto | Funcao |
|---|---|
| `docs/use_case_diagram_v2.md` | documentar scope, boundary, atores e use cases refinados |
| `docs/diagrams/use_case_diagram_v2.puml` | manter o diagrama versionado em texto |
| `docs/diagrams/use_case_diagram_v2.png` | fornecer imagem visual do diagrama |
| `docs/use_cases_v2.md` | descrever use cases com sintaxe completa |
| `docs/traceability_uc_req.md` | ligar use cases a requisitos |

O Lab 6 melhora a cadeia:

```text
Requirements -> Use Cases -> Flows -> Test Scenarios
```

## Como explicar o Lab

Neste lab, refinamos o trabalho do Lab 5.

Primeiro confirmamos o scope: Intake & Discovery.

Depois melhoramos o diagrama, mantendo atores externos e use cases com nomes estaveis.

A seguir, completamos as descricoes dos use cases com precondicoes, triggers, postconditions, fluxos principais, alternativas e erros.

Tambem reforcamos os use cases mais importantes para a Variante 4, principalmente `UC-04`, que valida regras de consistencia.

Por fim, criamos uma matriz de rastreabilidade entre use cases e requisitos para mostrar que cada interacao tem suporte nos requisitos do projeto.

## Resultado final

O Lab 6 ficou com:

- diagrama v2 documentado
- diagrama v2 em PlantUML
- imagem do diagrama
- 6 use cases no diagrama
- pelo menos 4 use cases com descricoes reforcadas
- `UC-01` completo
- `UC-04` completo e alinhado com a Variante 4
- alternatives e exceptions variant-driven
- matriz UC -> REQ
- observacoes de cobertura e gaps

## Limitacoes

Nem todos os use cases precisam de ter o mesmo nivel de detalhe.

O enunciado pede pelo menos 2 use cases completos, e o projeto ultrapassa esse minimo.

Alguns use cases mais estreitos, como exportacao de logs, continuam mais simples porque representam fluxos mais especificos.

Os use cases ainda nao sao testes automatizados. Eles servem como base para acceptance criteria, test cases e BDD nos labs seguintes.
