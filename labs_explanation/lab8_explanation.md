# Explicacao do Lab 8 - Vibe Coding e Prototype Gerado

## O que o Lab 8 pedia

O Lab 8 pedia gerar um prototype funcional usando Vibe Coding.

O objetivo era usar requisitos, use cases e acceptance criteria como input principal para gerar uma aplicacao minima com ajuda de IA.

Este lab nao pedia testes automatizados.

Os entregaveis obrigatorios eram:

- prototype runnable
- `docs/generated_scope.md`
- `docs/vibe_coding_log.md`

No projeto, o prototype oficial esta em:

```text
asset-form-guardian-main/
```

## Relacao com a Lesson 8

A Lesson 8 explica Vibe Coding como uma tecnica academica de geracao rapida de aplicacoes a partir de requisitos.

O objetivo nao e substituir Requirements Engineering.

O objetivo e perceber como a qualidade dos requisitos afeta o codigo gerado.

Se os requisitos forem vagos, a IA tende a inventar funcionalidades, assumir regras ou ignorar casos limite.

Por isso, este lab exigia:

- scope pequeno
- requisitos rastreaveis
- constraints explicitas
- registo de prompts
- rejeicao de feature drift
- verificacao manual

## Ferramenta usada

A ferramenta usada foi:

```text
Lovable
```

O Lovable foi usado como AI pair-programmer para gerar um prototype React com preview em tempo real.

A stack usada foi:

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- LocalStorage

O prototype nao usa backend real, base de dados real ou login.

Isto foi uma decisao intencional para manter o scope pequeno e alinhado com o enunciado.

## Prototype oficial

O prototype oficial do Lab 8 esta em:

```text
asset-form-guardian-main/
```

O ficheiro principal da implementacao exportada do Lovable e:

```text
asset-form-guardian-main/src/pages/Index.tsx
```

Embora o plano inicial previsse ficheiros/componentes separados, a versao final exportada ficou consolidada principalmente nesta pagina.

Isto foi documentado no `vibe_coding_log.md` para manter consistencia entre log e codigo real.

## Como correr o prototype

Dentro da pasta:

```text
asset-form-guardian-main/
```

executar:

```powershell
npm install
npm run dev
```

Tambem foi confirmado que o build funciona com:

```powershell
npm run build
```

O build foi executado com sucesso.

## Generated Scope

Foi criado:

```text
docs/generated_scope.md
```

Este ficheiro define o scope gerado no Lab 8.

A slice escolhida foi:

```text
Slice A - Intake & Discovery
```

O foco foi:

```text
Data Capture & Validation
```

O prototype implementa um formulario de recolha de ativos com regras de qualidade de dados.

## Use cases implementados

O scope liga o prototype a dois use cases principais:

- `UC-01` - Submeter Novo Ativo
- `UC-04` - Validar Regras de Consistencia

Isto mostra que o prototype nao foi gerado de forma livre.

Ele foi gerado com base nos use cases ja definidos nos labs anteriores.

## Requisitos implementados

O Lab 8 permitia implementar no maximo 10 requisitos.

Foram selecionados 10 itens:

- `REQ-001` - Validacao de campos obrigatorios
- `REQ-002` - Condicionalidade de DR
- `REQ-003` - Inconsistencia de DR
- `REQ-004` - Validacao de URL HTTPS
- `REQ-005` - Caducidade de evidencias
- `REQ-006` - Identificacao de Owner
- `REQ-007` - Prevencao de duplicados
- `REQ-008` - Gestao de estados Draft
- `REQ-009` - Transicao para Ready to Proceed
- `NFR-001` - Log de auditoria

Isto cumpre o limite do enunciado.

## Constraints da Variante 4

O Lab 8 pedia pelo menos 2 constraints da variante refletidas no prototype.

Foram implementadas:

### Constraint 1 - Sanidade logica cross-field

Alguns campos dependem de outros.

Exemplo:

- se DR = "Sim", a data do ultimo teste e obrigatoria
- se DR = "Nao", uma data preenchida gera inconsistencia

### Constraint 2 - Integridade temporal

Evidencias com mais de 365 dias sao rejeitadas.

Isto impede que dados obsoletos sejam usados para colocar um ativo em `Ready to Proceed`.

Estas constraints mostram claramente a Variante 4 no prototype.

## Out of scope

O scope tambem documenta o que ficou fora.

Ficaram fora:

- base de dados real
- Active Directory real
- login/autenticacao
- RBAC
- exportacao de ficheiros
- dashboards globais

Isto e importante porque o Lab 8 valoriza scope control.

Um prototype pequeno e coerente vale mais do que tentar implementar o produto todo.

## Vibe Coding Log

Foi criado:

```text
docs/vibe_coding_log.md
```

Este ficheiro regista:

- ferramenta usada
- stack
- localizacao do prototype
- prompt pack
- outputs gerados
- funcionalidades aceites
- funcionalidades rejeitadas
- verificacao manual
- lessons learned

Isto cumpre a regra da Lesson 8 de documentar prompts e iteracoes.

## Iteration 1

Na primeira iteracao, o prompt pediu um prototype Single Page para Asset Intake.

Foram incluidos guardrails:

- sem backend
- sem base de dados real
- sem login
- LocalStorage permitido
- manter apenas o scope de Intake & Discovery

O output gerou o formulario base e as regras principais.

Foram aceites:

- validacoes de campos obrigatorios
- regras de DR
- validacao HTTPS
- evidencia expirada
- duplicados simulados
- guardar rascunho
- submeter final
- audit log visual

Foram rejeitados:

- ecras de login
- rotas extra
- integracoes reais
- upload real de ficheiros

## Verificacao manual da Iteration 1

Foram verificados:

- happy path
- alternative flow
- exception/error path

Exemplos:

- submissao valida passa para `Ready to Proceed`
- guardar rascunho persiste em LocalStorage
- URL sem `https://` e evidencia expirada bloqueiam submissao

## Iteration 2

A segunda iteracao focou melhorias visuais e confirmacao de regras.

Foram pedidos:

- erros mais visiveis
- confirmacao de duplicados
- audit log mais claro

Foram aceites:

- mensagens de erro mais visiveis
- bordas destacadas nos campos invalidos
- audit log em tabela visual
- confirmacao de duplicados case-insensitive

Foram rejeitados:

- efeitos exagerados
- modais desnecessarios
- classes visuais fora dos tokens do design system

## Verificacao manual da Iteration 2

Foram verificados:

- happy path sem regressao
- duplicado `PROD-DB`
- duplicado `core-erp` em minusculas
- campos vazios
- mensagens vermelhas com icone
- badge sem transitar indevidamente para Ready

Isto mostra que a iteracao melhorou a UX sem expandir o scope.

## Guardrails contra feature drift

O Lab 8 pedia controlar feature drift.

O projeto documenta feature drift rejeitado:

- nao criar backend
- nao criar login
- nao criar Supabase
- nao criar upload real de ficheiros
- nao adicionar animacoes ou modais fora do scope

Isto mostra que os requisitos continuaram a ser a source of truth.

## Lessons learned

O log tambem regista aprendizagens.

As principais foram:

- a expressao "base de dados de duplicados" podia levar a IA a criar backend real
- devia ter sido especificado se duplicados eram case-sensitive
- devia ter sido definido o comportamento do draft apos submissao final
- devia ter sido definido um limite para o audit log
- devia ter sido fixado explicitamente o idioma das mensagens

Estas observacoes cumprem o objetivo academico da Lesson 8: usar Vibe Coding para descobrir ambiguidades nos requisitos.

## Build do prototype

Foi executado:

```powershell
npm run build
```

na pasta:

```text
asset-form-guardian-main/
```

O build terminou com sucesso.

Isto confirma que o prototype e runnable.

## Porque estes artefactos foram feitos

Cada artefacto tem uma funcao:

| Artefacto | Funcao |
|---|---|
| `asset-form-guardian-main/` | prototype gerado por Vibe Coding |
| `docs/generated_scope.md` | define o que foi implementado e o que ficou fora |
| `docs/vibe_coding_log.md` | regista prompts, iteracoes, decisoes e verificacao manual |

A cadeia do Lab 8 fica:

```text
Requirements -> Prompt Pack -> Generated Prototype -> Manual Verification -> Lessons Learned
```

## Como explicar o Lab

Neste lab, usamos Lovable para gerar um prototype a partir dos requisitos.

Escolhemos uma slice pequena: Intake & Discovery.

Incluimos os requisitos principais, os use cases `UC-01` e `UC-04`, os ACs e as constraints da Variante 4.

Depois geramos o prototype, verificamos manualmente os fluxos e registamos duas iteracoes.

O objetivo nao era testar automaticamente, mas perceber se os requisitos eram suficientemente claros para gerar uma aplicacao coerente.

## Resultado final

O Lab 8 ficou com:

- prototype runnable em `asset-form-guardian-main/`
- scope documentado
- maximo de 10 requisitos implementados
- 2 use cases implementados
- 2 constraints da variante refletidas
- 2 iteracoes documentadas
- prompts e outputs registados
- accepted/rejected documentado
- happy path validado manualmente
- alternative flow validado manualmente
- exception path validado manualmente
- build executado com sucesso

## Limitacoes

O Lab 8 nao inclui testes automatizados.

Isto esta de acordo com o enunciado.

Os testes unitarios, BDD e outras verificacoes formais sao tratados nos labs seguintes.

O prototype tambem usa LocalStorage e mocks em vez de backend real, porque o objetivo era gerar uma slice academica pequena, controlada e rastreavel.
