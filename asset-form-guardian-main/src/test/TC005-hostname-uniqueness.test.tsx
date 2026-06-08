/**
 * TC-005 — Unicidade de Hostname (onBlur) [Integration]
 *
 * Related requirements: REQ-007
 * Type: UI Integration / Logic
 *
 * Preconditions: Formulário de Intake aberto e Base de Dados de Ativos acessível.
 *
 * Test data:
 *   - Nome do sistema: "PROD-DB"
 *
 * Steps:
 *   1. Inserir o nome "PROD-DB" (já existente no Mock do Asset Database).
 *   2. Retirar o foco do campo (onBlur).
 *
 * Expected results:
 *   - O sistema sinaliza o erro "Ativo já existe" ao retirar o foco (onBlur).
 *   - O botão de submissão fica desativado (disabled).
 */

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { validate, MOCK_ASSET_DATABASE } from "@/pages/Index";
import Index from "@/pages/Index";

// ─── PARTE 1: Teste Unitário — validate() lógica de unicidade ────────────────

describe("TC-005 Unit — Lógica de Unicidade de Hostname", () => {
  it("deve rejeitar nomes que já existam no mock database", () => {
    MOCK_ASSET_DATABASE.forEach((existingName) => {
      const errors = validate({
        nome: existingName,
        owner: "maria.silva@corporate.com",
        criticidade: "Tier 3",
        dr: "",
        rto: "",
        rpo: "",
      });
      expect(errors.nome).toBe("Ativo já existe");
    });
  });

  it("deve aceitar um nome que não exista no mock database", () => {
    const errors = validate({
      nome: "NEW-PROD-SERVER",
      owner: "maria.silva@corporate.com",
      criticidade: "Tier 3",
      dr: "",
      rto: "",
      rpo: "",
    });
    expect(errors.nome).toBeUndefined();
  });
});

// ─── PARTE 2: Teste UI — Inserção de "PROD-DB" + onBlur ──────────────────────

function renderForm() {
  return render(
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  );
}

describe("TC-005 UI — Unicidade de Hostname no blur", () => {
  it("deve mostrar erro 'Ativo já existe' e desativar o botão de submissão", () => {
    renderForm();

    const nomeInput = screen.getByPlaceholderText("Ex.: Core Banking Platform");
    const submitBtn = screen.getByRole("button", { name: /Submeter Final/i });

    // Inicialmente o botão não deve estar desativado por este motivo
    expect(submitBtn).not.toBeDisabled();

    // 1. Inserir o nome "PROD-DB"
    fireEvent.change(nomeInput, { target: { value: "PROD-DB" } });

    // 2. Retirar o foco (onBlur)
    fireEvent.blur(nomeInput);

    // Expected: O erro "Ativo já existe" é exibido
    const errorMsg = screen.getAllByText("Ativo já existe");
    expect(errorMsg.length).toBeGreaterThanOrEqual(1);

    // Expected: O botão de submissão está desativado (disabled)
    expect(submitBtn).toBeDisabled();
  });

  it("deve reativar o botão de submissão e limpar o erro quando o nome passa a ser único", () => {
    renderForm();

    const nomeInput = screen.getByPlaceholderText("Ex.: Core Banking Platform");
    const submitBtn = screen.getByRole("button", { name: /Submeter Final/i });

    // Escrever duplicado e dar blur
    fireEvent.change(nomeInput, { target: { value: "PROD-DB" } });
    fireEvent.blur(nomeInput);
    expect(submitBtn).toBeDisabled();

    // Alterar para um nome único
    fireEvent.change(nomeInput, { target: { value: "PROD-DB-UNIQUE" } });
    fireEvent.blur(nomeInput);

    // O erro não deve estar visível e o botão de submissão deve estar ativo
    expect(screen.queryByText("Ativo já existe")).not.toBeInTheDocument();
    expect(submitBtn).not.toBeDisabled();
  });
});
