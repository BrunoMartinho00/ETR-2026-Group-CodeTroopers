/**
 * TC-009 — Validação de Formato de E-mail do Owner [Negative]
 *
 * Related requirements: REQ-006 (AC-1)
 * Type: Unit + UI Integration
 *
 * Preconditions: Formulário de Intake aberto.
 *
 * Test data:
 *   - owner: "utilizador.sem.dominio" (inválido)
 *   - owner: "utilizador@gmail.com" (domínio público/não corporativo)
 *   - owner: "utilizador@empresa.com" (válido corporativo)
 *
 * Steps:
 *   1. Preencher os restantes campos obrigatórios com dados válidos.
 *   2. Inserir um e-mail com formato inválido ou não corporativo no campo "Owner".
 *   3. Clicar em "Submeter Final".
 *
 * Expected results:
 *   - O sistema identifica o erro de formatação/domínio, bloqueia a submissão e exibe uma mensagem indicando que é necessário um e-mail corporativo válido.
 */

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { validate, type FormData } from "@/pages/Index";
import Index from "@/pages/Index";

// ─── PARTE 1: Testes Unitários ───────────────────────────────────────────────

describe("TC-009 Unit — validate() e-mail do Owner", () => {
  const baseValid: FormData = {
    nome: "Core Banking Platform",
    owner: "",
    criticidade: "Tier 3",
    dr: "",
    rto: "",
    rpo: "",
  };

  it("deve rejeitar e-mail com formato inválido (sem @ ou sem domínio)", () => {
    const errs1 = validate({ ...baseValid, owner: "utilizador.sem.dominio" });
    expect(errs1.owner).toBe("Formato de e-mail inválido");

    const errs2 = validate({ ...baseValid, owner: "utilizador@" });
    expect(errs2.owner).toBe("Formato de e-mail inválido");
  });

  it("deve rejeitar domínios não corporativos (públicos/gratuitos)", () => {
    const publicEmails = [
      "utilizador@gmail.com",
      "utilizador@yahoo.com",
      "utilizador@outlook.com",
      "utilizador@hotmail.com",
    ];

    publicEmails.forEach((email) => {
      const errs = validate({ ...baseValid, owner: email });
      expect(errs.owner).toBe("É necessário um e-mail corporativo válido");
    });
  });

  it("deve aceitar e-mails corporativos válidos", () => {
    const corporateEmails = [
      "utilizador@empresa.com",
      "suporte@corporate.co.uk",
      "admin@my-business.pt",
    ];

    corporateEmails.forEach((email) => {
      const errs = validate({ ...baseValid, owner: email });
      expect(errs.owner).toBeUndefined();
    });
  });
});

// ─── PARTE 2: Testes UI ──────────────────────────────────────────────────────

function renderForm() {
  return render(
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  );
}

describe("TC-009 UI — Validação de Formato de E-mail do Owner", () => {
  it("deve exibir erro correto para formato inválido no e-mail do owner", () => {
    renderForm();

    const ownerInput = screen.getByPlaceholderText("Ex.: maria.silva@empresa.com");
    const submitBtn = screen.getByRole("button", { name: /Submeter Final/i });

    // Inserir e-mail com formato inválido
    fireEvent.change(ownerInput, { target: { value: "utilizador.sem.dominio" } });
    fireEvent.click(submitBtn);

    // Deve exibir o erro de formatação
    expect(screen.getAllByText("Formato de e-mail inválido").length).toBeGreaterThanOrEqual(1);
  });

  it("deve exibir erro correto para e-mail com domínio não corporativo", () => {
    renderForm();

    const ownerInput = screen.getByPlaceholderText("Ex.: maria.silva@empresa.com");
    const submitBtn = screen.getByRole("button", { name: /Submeter Final/i });

    // Inserir e-mail de domínio público (não corporativo)
    fireEvent.change(ownerInput, { target: { value: "utilizador@gmail.com" } });
    fireEvent.click(submitBtn);

    // Deve exibir o erro de domínio corporativo
    expect(screen.getAllByText("É necessário um e-mail corporativo válido").length).toBeGreaterThanOrEqual(1);
  });

  it("deve permitir a submissão com e-mail corporativo válido", () => {
    renderForm();

    const nomeInput = screen.getByPlaceholderText("Ex.: Core Banking Platform");
    const ownerInput = screen.getByPlaceholderText("Ex.: maria.silva@empresa.com");
    const submitBtn = screen.getByRole("button", { name: /Submeter Final/i });

    // Preencher campos para passar validação básica
    fireEvent.change(nomeInput, { target: { value: "Novo Sistema Teste" } });
    fireEvent.change(ownerInput, { target: { value: "utilizador@empresa.com" } });
    
    // Submeter
    fireEvent.click(submitBtn);

    // Não deve exibir nenhum erro referente ao owner
    expect(screen.queryByText("Formato de e-mail inválido")).not.toBeInTheDocument();
    expect(screen.queryByText("É necessário um e-mail corporativo válido")).not.toBeInTheDocument();
  });
});
