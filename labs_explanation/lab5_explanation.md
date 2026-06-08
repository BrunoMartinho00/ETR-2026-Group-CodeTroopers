# Explicacao do Lab 5 - Use Case Diagram e Use Case Syntax

## O que o Lab 5 pedia

O Lab 5 pedia representar o scope funcional do projeto atraves de casos de uso.

O objetivo era mostrar:

- quem interage com o sistema
- que objetivos esses atores cumprem
- quais os limites do sistema
- como os requisitos se traduzem em interacoes observaveis

Os entregaveis obrigatorios eram:

- `docs/use_case_diagram.md`
- `docs/use_cases.md`
- um ficheiro de diagrama em `docs/diagrams/`

No projeto, os ficheiros principais sao:

- `docs/use_case_diagram.md`
- `docs/use_cases.md`
- `docs/diagrams/use_case_diagram.puml`
- `docs/diagrams/use_case_diagram.png`

## Relacao com a Lesson 5

A Lesson 5 explica que use cases ajudam a modelar o scope funcional sem entrar em detalhes de UI ou implementacao.

Um use case deve responder a perguntas como:

- Quem e o ator?
- Que objetivo quer atingir?
- O que tem de ser verdade antes?
- O que acontece no fluxo principal?
- Que alternativas e erros podem acontecer?
- Que requisitos sao suportados?

Por isso, o Lab 5 transforma requisitos em interacoes entre atores externos e o sistema.

## System boundary

O sistema modelado e:

```text
AMS Intake & Data Quality Platform
```

O slice coberto e:

```text
Intake & Discovery
```

O foco esta na Variante 4:

```text
Data Quality & Consistency
```

A fronteira do sistema e importante porque separa o que esta dentro da responsabilidade da plataforma e o que esta fora.

Dentro da fronteira ficam os use cases.

Fora da fronteira ficam os atores, incluindo pessoas e sistemas externos.

## Atores identificados

Foram identificados 3 atores:

### End User

Responsavel por iniciar o processo de intake, preencher dados e fornecer evidencias.

Este ator representa quem usa o sistema para submeter informacao.

### Data Steward

Persona principal da Variante 4.

E responsavel por monitorizar qualidade, resolver inconsistencias e auditar o processo.

Este ator e essencial porque a variante exige foco em consistencia e integridade dos dados.

### Asset Database

Sistema externo usado para verificar duplicados.

Nao e uma componente interna do sistema. E um ator externo porque interage com a plataforma ao fornecer informacao sobre unicidade de ativos.

## Use cases do diagrama

O diagrama contem 6 casos de uso:

- `UC-01` - Submeter Novo Ativo
- `UC-02` - Gerir Rascunhos (Drafts)
- `UC-03` - Carregar Evidencia
- `UC-04` - Validar Regras de Consistencia
- `UC-05` - Resolver Inconsistencias de Dados
- `UC-06` - Exportar Logs de Auditoria

Isto cumpre o minimo pedido pelo Lab 5.

Os nomes estao escritos como capacidades de workflow, nao como botoes individuais da interface.

## PlantUML

O diagrama foi criado em PlantUML:

```text
docs/diagrams/use_case_diagram.puml
```

Tambem existe uma imagem renderizada:

```text
docs/diagrams/use_case_diagram.png
```

Usar PlantUML ajuda porque o diagrama fica versionado em texto e pode ser alterado facilmente no Git.

## Relacoes no diagrama

O diagrama usa associacoes entre atores e casos de uso.

Exemplos:

- End User interage com submissao, rascunhos e upload de evidencia
- Data Steward interage com resolucao de inconsistencias e exportacao de logs
- Asset Database participa na verificacao de duplicados

Tambem existem relacoes:

```text
<<include>>
```

e

```text
<<extend>>
```

O `UC-01` inclui `UC-04`, porque submeter um novo ativo exige validacao de regras de consistencia.

O `UC-01` tambem inclui `UC-03`, porque a submissao depende de evidencia.

O `UC-05` estende `UC-04`, porque resolver inconsistencias so acontece quando a validacao deteta problemas.

## Use case descriptions

Foi criado:

```text
docs/use_cases.md
```

Este ficheiro descreve pelo menos 2 casos de uso completos:

- `UC-01` - Submeter Novo Ativo
- `UC-04` - Validar Regras de Consistencia

Cada use case inclui:

- ator principal
- atores secundarios
- objetivo
- precondicoes
- trigger
- postconditions de sucesso
- postconditions de falha
- requisitos relacionados
- fluxo principal
- fluxos alternativos
- excecoes/erros

Isto cumpre a sintaxe pedida pela Lesson 5.

## UC-01 - Submeter Novo Ativo

O `UC-01` representa o fluxo principal de submissao de um novo ativo.

O ator principal e:

```text
End User
```

O objetivo e registar um ativo garantindo que os dados estao completos, consistentes e validados.

Este use case liga varios requisitos:

- `REQ-001` - campos obrigatorios
- `REQ-002` - condicionalidade de DR
- `REQ-003` - inconsistencia de DR
- `REQ-005` - caducidade de evidencias
- `REQ-006` - owner de integracoes
- `REQ-007` - duplicados
- `REQ-009` - transicao para Ready
- `NFR-002` - performance de validacao

## Fluxo principal do UC-01

O fluxo principal descreve o caminho feliz:

1. o utilizador preenche dados
2. carrega evidencia
3. submete
4. o sistema valida consistencia
5. a Asset Database verifica unicidade
6. o sistema grava como `Ready`
7. o sistema apresenta sucesso

Este fluxo mostra como os requisitos funcionais aparecem numa interacao completa.

## Fluxos alternativos e erros do UC-01

O UC-01 inclui um fluxo alternativo:

```text
Guardar como Rascunho
```

Este fluxo permite guardar dados ainda incompletos sem transitar para `Ready`.

Tambem inclui erros como:

- falha de validacao cruzada
- ativo duplicado

Estes erros sao importantes porque a Variante 4 se preocupa precisamente com dados inconsistentes e duplicados.

## UC-04 - Validar Regras de Consistencia

O `UC-04` representa a validacao da qualidade dos dados.

O ator principal foi definido como:

```text
Data Steward
```

Isto e importante porque a Lesson 5 diz que atores devem ser externos ao sistema.

O sistema nao deve ser ator principal de um use case.

O UC-04 valida:

- campos obrigatorios
- regra de Disaster Recovery
- contradicoes entre campos
- caducidade de evidencia
- duplicados
- possibilidade de transitar para `Ready to Proceed`

## Fluxos alternativos do UC-04

O UC-04 inclui fluxos alternativos:

- validacao preventiva pelo Data Steward
- correcao apos falha de validacao

Isto cumpre o Lab 5, que exige pelo menos um fluxo alternativo por use case descrito.

## Excecoes do UC-04

O UC-04 tambem inclui excecoes:

- violacao de regra de negocio critica
- duplicado encontrado na Asset Database

Estas excecoes ajudam a preparar testes futuros, porque indicam comportamento esperado quando o sistema encontra erros.

## Ligacao aos requisitos

Cada use case tem requisitos relacionados.

Isto permite rastreabilidade:

```text
Requirement -> Use Case -> Flow -> Test Scenario
```

Por exemplo:

- `REQ-003` aparece no UC-04 quando existe contradicao de DR
- `REQ-005` aparece quando a evidencia operacional e validada temporalmente
- `REQ-007` aparece quando o Hostname e verificado na Asset Database
- `REQ-009` aparece quando o Intake so pode avancar para `Ready to Proceed` depois das validacoes

Esta ligacao e essencial porque os use cases vao apoiar casos de teste e cenarios BDD nos labs seguintes.

## Porque estes artefactos foram feitos

Cada artefacto tem uma funcao:

| Artefacto | Funcao |
|---|---|
| `docs/use_case_diagram.md` | documentar boundary, atores e lista de use cases |
| `docs/diagrams/use_case_diagram.puml` | representar o diagrama como codigo versionavel |
| `docs/diagrams/use_case_diagram.png` | imagem visual do diagrama |
| `docs/use_cases.md` | descrever use cases com sintaxe completa |

O diagrama mostra o scope visual.

As descricoes mostram os detalhes necessarios para analise e testes.

## Como explicar o Lab

Neste lab, transformamos os requisitos em casos de uso.

Primeiro definimos a fronteira do sistema: AMS Intake & Data Quality Platform.

Depois identificamos os atores externos: End User, Data Steward e Asset Database.

A seguir, criamos 6 casos de uso que representam as principais capacidades do slice Intake & Discovery.

Por fim, detalhamos dois casos de uso principais: submissao de novo ativo e validacao de regras de consistencia.

Estes casos de uso mostram o caminho feliz, alternativas, erros e requisitos relacionados.

## Resultado final

O Lab 5 ficou com:

- system boundary definido
- 3 atores
- 6 use cases
- diagrama em PlantUML
- imagem do diagrama
- pelo menos 2 use cases completos
- precondicoes
- triggers
- postconditions
- main flows
- alternative flows
- exceptions/errors
- ligacao a requisitos `REQ-###` e `NFR-###`

## Limitacoes

O Lab 5 ainda nao implementa testes.

Os use cases servem como base para os labs seguintes, onde os fluxos serao usados para criar:

- acceptance criteria
- test cases
- cenarios BDD
- matrizes de rastreabilidade

Existe tambem uma versao posterior, `docs/use_cases_v2.md`, com mais casos de uso detalhados. No entanto, para o Lab 5, o ficheiro oficial pedido pelo enunciado e `docs/use_cases.md`.
