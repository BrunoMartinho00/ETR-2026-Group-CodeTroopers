# Explicacao do Lab 1 - Kickoff, Role Play e Setup do Projeto

## O que o Lab 1 pedia

O Lab 1 pedia iniciar o trabalho do semestre e preparar a base do projeto.

O objetivo era criar uma estrutura comum para guardar documentacao, requisitos, testes e evidencias ao longo dos labs.

Os entregaveis principais eram:

- `README.md`
- `docs/vision.md`
- `docs/glossary.md`
- `docs/variant_assignment.md`, porque foi escolhida a baseline AMS
- pastas principais do repositorio:
  - `docs/`
  - `tests/`
  - `bdd/`
  - `templates/`

O lab tambem pedia:

- formar a equipa
- atribuir papeis iniciais
- escolher o projeto
- definir o slice funcional obrigatorio
- criar uma visao curta do produto
- definir 3 objetivos e 3 nao-objetivos
- criar um glossario com termos do dominio
- registar a variante AMS, se fosse usada a baseline recomendada

## Relacao com a Lesson 1

A Lesson 1 explica que Requirements Engineering serve para garantir que a equipa constroi o sistema certo, nao apenas um sistema que funciona tecnicamente.

Por isso, neste lab foram criados artefactos iniciais que ajudam a reduzir ambiguidade:

- a visao explica o valor do produto
- os objetivos dizem o que o projeto pretende atingir
- os nao-objetivos delimitam o que fica fora do escopo
- o glossario cria vocabulario comum
- a variante define o foco especifico do grupo

Estes documentos sao importantes porque os requisitos e testes dos labs seguintes devem nascer desta base.

## Projeto escolhido

A equipa escolheu a Opcao A:

```text
AMS baseline
```

Isto significa que o projeto segue o caso de estudo recomendado pelo curso.

A variante definida foi:

```text
Variant 4 - Data Quality & Consistency
```

Esta variante foca a qualidade e consistencia dos dados. O sistema deve impedir que informacao incompleta, contraditoria ou invalida avance no processo de intake.

## Equipa e papeis

O `README.md` identifica a equipa CodeTroopers e os seus membros:

- Duarte Martins
- Bruno Martinho
- Diogo Sa
- Denivaldo Antonio

Tambem regista os papeis iniciais do Lab 1:

- Scribe
- Facilitator
- Tester
- Reviewer

Estes papeis foram definidos porque o lab pede rotacao de responsabilidades. Cada papel ajuda a equipa a trabalhar de forma organizada:

- o Scribe mantem a documentacao atualizada
- o Facilitator controla tempo e foco
- o Tester garante que os testes sao considerados desde cedo
- o Reviewer verifica qualidade e coerencia

## Estrutura do repositorio

Foram criadas as pastas principais:

```text
docs/
tests/
bdd/
templates/
```

Cada pasta tem uma funcao no projeto:

| Pasta | Funcao |
|---|---|
| `docs/` | guardar requisitos, visao, glossario, rastreabilidade, casos de teste e evidencias |
| `tests/` | guardar testes automatizados, neste caso com PyTest |
| `bdd/` | guardar features e steps BDD |
| `templates/` | guardar modelos reutilizaveis, como templates de REM ou casos de teste |

Esta organizacao foi feita porque o curso avalia a rastreabilidade entre requisitos, testes e evidencias. Ter uma estrutura previsivel facilita a revisao.

## Vision

Foi criado:

```text
docs/vision.md
```

Este ficheiro descreve o slice:

```text
Intake & Discovery
```

A visao explica que o projeto pretende validar a entrada inicial de ativos/sistemas no contexto AMS, com foco na qualidade dos dados.

O documento tambem inclui 3 objetivos:

1. validar consistencia cruzada entre campos
2. detetar duplicados
3. registar auditoria de criacao

Estes objetivos foram definidos para alinhar o projeto com a Variante 4, que exige foco em consistencia, qualidade e controlo dos dados.

O documento tambem inclui 3 nao-objetivos:

1. gestao completa do ciclo de vida dos ativos
2. integracao real com hardware, RFID ou codigo de barras
3. autenticacao avancada

Os nao-objetivos sao importantes porque evitam scope creep. Eles deixam claro que o projeto nao vai tentar implementar tudo, apenas o slice necessario para os labs.

## Variant Assignment

Foi criado:

```text
docs/variant_assignment.md
```

Este ficheiro regista:

- variante
- persona principal
- restricao chave
- foco da variante
- requisitos especificos da variante

A persona principal e:

```text
Data Steward / Quality Manager
```

Esta persona preocupa-se com integridade, consistencia e qualidade dos dados.

A restricao chave e:

```text
Cross-field validation
```

Isto quer dizer que alguns campos dependem de outros. Por exemplo, se Disaster Recovery estiver marcado como "Sim", entao a data do ultimo teste deve existir e ser valida.

## Glossario

Foi criado:

```text
docs/glossary.md
```

O glossario define termos usados no projeto, como:

- Asset
- Intake
- Validation
- Duplication Check
- Audit Log
- Acceptance Criteria
- System ID
- Inconsistent State
- Data Steward

O glossario foi feito para evitar interpretacoes diferentes entre membros da equipa.

Por exemplo, se todos entendem "Inconsistent State" da mesma forma, fica mais facil escrever requisitos e testes que verifiquem esse comportamento.

## Stack tecnica inicial

O `README.md` indica a stack escolhida:

```text
Python
PyTest
Behave ou pytest-bdd
```

Esta stack foi escolhida porque combina bem com os labs de requisitos e testes:

- PyTest permite criar testes unitarios simples e parametrizados
- BDD permite escrever cenarios comportamentais em linguagem mais proxima do cliente
- Python facilita implementar validacoes pequenas para demonstrar regras de negocio

## Porque estes artefactos foram feitos

O Lab 1 nao e sobre implementar funcionalidades completas.

O objetivo principal e preparar uma base clara para os labs seguintes.

Cada artefacto tem uma razao:

| Artefacto | Porque foi feito |
|---|---|
| `README.md` | identifica equipa, projeto e stack |
| `docs/vision.md` | define valor, escopo e limites |
| `docs/glossary.md` | cria vocabulario comum |
| `docs/variant_assignment.md` | garante alinhamento com a variante AMS |
| `docs/` | centraliza documentacao e evidencias |
| `tests/` | prepara a area de testes automatizados |
| `bdd/` | prepara cenarios BDD |
| `templates/` | prepara modelos reutilizaveis |

Sem esta base, os requisitos, criterios de aceitacao e testes dos labs seguintes ficariam mais dificeis de validar.

## Como explicar o Lab

Neste lab, a equipa criou a fundacao do projeto.

Primeiro, foi escolhida a baseline AMS e a Variante 4, focada em qualidade e consistencia de dados.

Depois, foram definidos a visao, os objetivos e os limites do slice Intake & Discovery.

Tambem foi criado um glossario para garantir que todos usam os mesmos conceitos da mesma forma.

Por fim, foi criada a estrutura do repositorio para separar documentacao, testes automatizados, BDD e templates.

Esta organizacao permite que, nos labs seguintes, cada requisito tenha ligacao a criterios de aceitacao, casos de teste e evidencia.

## Resultado final

O Lab 1 ficou com:

- equipa identificada
- papeis iniciais definidos
- projeto AMS escolhido
- Variante 4 registada
- slice Intake & Discovery definido
- visao documentada
- 3 objetivos
- 3 nao-objetivos
- glossario criado
- estrutura base do repositorio criada
- stack tecnica inicial escolhida

## Pontos a confirmar

Existem alguns pontos que devem ser revistos para garantir alinhamento total com o enunciado:

- o `README.md` deve incluir como correr testes, mesmo que seja apenas `TBD`
- como foi escolhida a Opcao A, o `README.md` deve incluir explicitamente a frase `Use the course baseline case study.`
- `docs/variant_assignment.md` deve indicar explicitamente o slice
- o glossario tem 16 termos, mas o enunciado pede 10 a 15
- deve existir registo do role play com 8 a 10 perguntas/respostas e 3 open questions
- a Lesson 1 tambem pede um output separado chamado `Draft requirements - Lesson 1`, com 3 FR, 2 NFR e 1 criterio de aceitacao por requisito

## Limitacoes

Nesta fase ainda nao existe implementacao funcional completa.

Isso e esperado no Lab 1, porque o foco e preparar o projeto e a documentacao inicial.

Os testes, criterios de aceitacao detalhados, rastreabilidade e validacao comportamental sao desenvolvidos nos labs seguintes.
