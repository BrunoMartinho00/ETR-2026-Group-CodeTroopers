/**
 * TC-006 — Gravação de Rascunho com Dados em Falta [Alternative]
 *
 * Related requirements: REQ-008
 * Type: System / UI Integration
 *
 * Preconditions: Formulário de Intake aberto para um novo registo.
 *
 * Test data:
 *   - Nome do sistema: "Sistema-Rascunho"
 *   - Owner: "" (vazio - campo obrigatório em falta)
 *
 * Steps:
 *   1. Deixar campos obrigatórios vazios (escrever apenas o Nome e deixar o Owner vazio).
 *   2. Clicar em "Guardar Rascunho".
 *
 * Expected results:
 *   - O sistema ignora as validações (não exibe erros).
 *   - O badge do estado muda para "Rascunho".
 *   - O sistema persiste os dados no localStorage com a flag is_draft = true.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";

function renderForm() {
  return render(
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  );
}

describe("TC-006 UI & System — Gravação de Rascunho com Dados em Falta", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve guardar rascunho com sucesso ignorando campos obrigatórios vazios", () => {
    renderForm();

    const nomeInput = screen.getByPlaceholderText("Ex.: Core Banking Platform");
    const saveDraftBtn = screen.getByRole("button", { name: /Guardar Rascunho/i });

    // 1. Preencher apenas o Nome e deixar Owner/Criticidade vazios
    fireEvent.change(nomeInput, { target: { value: "Sistema-Rascunho" } });

    // 2. Clicar em "Guardar Rascunho"
    fireEvent.click(saveDraftBtn);

    // Expected: Sem mensagens de erro visíveis
    expect(screen.queryByText("Campo obrigatório")).not.toBeInTheDocument();

    // Expected: Badge diz "Rascunho"
    expect(screen.getByText("Rascunho")).toBeInTheDocument();

    // Expected: Persiste os dados no localStorage com is_draft = true
    const savedItem = localStorage.getItem("asset_intake_draft");
    expect(savedItem).not.toBeNull();

    const parsedData = JSON.parse(savedItem!);
    expect(parsedData.nome).toBe("Sistema-Rascunho");
    expect(parsedData.owner).toBe("");
    expect(parsedData.is_draft).toBe(true);
  });
});
