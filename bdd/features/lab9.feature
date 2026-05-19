Feature: Gatekeeper de Qualidade e Consistência de Dados (Variante 4)
  Como Data Steward (Gestor de Qualidade de Dados)
  Quero garantir que todos os dados do inventário são logicamente consistentes e únicos
  Para que a CMDB permaneça como uma "fonte da verdade" confiável.

  Cenário: Prevenir informações contraditórias de Disaster Recovery
    Given que o utilizador seleciona "Disaster Recovery = Não"
    And o utilizador tenta fornecer uma "Data do Último Teste"
    When o utilizador clica em "Submeter Final"
    Then o sistema deve bloquear a transição para o estado "Ready"
    And o estado do registo deve ser marcado como "Inconsistent"

  Cenário: Permitir progresso parcial através do modo Rascunho (Draft)
    Given que o utilizador tem campos obrigatórios vazios (Nome ou Owner)
    When o utilizador seleciona "Guardar Rascunho"
    Then o sistema deve ignorar todas as verificações de consistência
    And guardar o registo com o estado "Draft"

  Cenário: Detetar nome de ativo duplicado através da Base de Dados de Ativos
    Given que o hostname "CORE-ERP" já existe no sistema
    When o utilizador insere "CORE-ERP" no campo de nome do sistema
    Then o sistema deve exibir um erro "Ativo já existe na base de dados"
    And desativar o botão de submissão final

  Cenário: Happy path — Submissão de inventário com dados consistentes e completos
    Given que o utilizador preencheu os campos obrigatórios ("Nome do Sistema", "Owner")
    And o utilizador selecionou "Disaster Recovery = Sim" e forneceu uma "Data do Último Teste" válida
    And o nome do sistema não existe atualmente na Base de Dados de Ativos
    When o utilizador clica em "Submeter Final"
    Then o sistema deve validar todas as regras de consistência com sucesso
    And o registo deve ser guardado e transitar para o estado "Ready"
