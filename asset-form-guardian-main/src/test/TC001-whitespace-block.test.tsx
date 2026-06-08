/**
 * TC-001 — Bloqueio de submissão com campos invisíveis [Boundary]
 *
 * Related requirements: REQ-001 (AC-2)
 * Type: Unit + UI Integration
 *
 * Preconditions: Formulário de Intake aberto.
 *
 * Test data:
 *   - nome: "   " (apenas espaços)
 *   - owner: "Maria Silva"
 *   - criticidade: "Tier 3"
 *   - dr: "" (não selecionado — opcional)
 *   - rto: "" (opcional para Tier 3)
 *   - rpo: "" (opcional para Tier 3)
 *
 * Steps:
 *   1. Inserir apenas espaços ("   ") no campo "Nome do Sistema".
 *   2. Preencher os restantes campos obrigatórios com valores válidos.
 *   3. Clicar em "Submeter Final".
 *
 * Expected results:
 *   - O sistema executa o trim(), reconhece o campo como vazio e gera erro.
 *   - A submissão é bloqueada (estado NÃO muda para "Pronto").
 *   - O campo "Nome do Sistema" fica destacado com borda vermelha (classe border-destructive).
 *   - É mostrada a mensagem "Campo obrigatório" por baixo do campo.
 *   - É mostrado um banner/alerta de resumo com a lista dos campos com erro.
 */

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import { validate, type FormData } from "@/pages/Index";

// ─── PARTE 1: Teste Unitário — função validate() ────────────────────────────

describe("TC-001 Unit — validate() com espaços invisíveis", () => {
  const baseValid: FormData = {
    nome: "   ",           // apenas espaços
    owner: "maria.silva@corporate.com",
    criticidade: "Tier 3",
    dr: "",
    rto: "",
    rpo: "",
  };

  it("deve gerar erro 'Campo obrigatório' quando nome contém apenas espaços", () => {
    const errors = validate(baseValid);
    expect(errors.nome).toBe("Campo obrigatório");
  });

  it("não deve gerar erros nos restantes campos obrigatórios preenchidos", () => {
    const errors = validate(baseValid);
    expect(errors.owner).toBeUndefined();
    expect(errors.criticidade).toBeUndefined();
  });

  it("deve gerar erro para string vazia '' após trim implícito", () => {
    const errors = validate({ ...baseValid, nome: "" });
    expect(errors.nome).toBe("Campo obrigatório");
  });

  it("deve gerar erro para tabs e newlines (outros whitespace invisíveis)", () => {
    const errors = validate({ ...baseValid, nome: "\t\n  " });
    expect(errors.nome).toBe("Campo obrigatório");
  });

  it("não deve gerar erro para nome com texto válido rodeado de espaços", () => {
    const errors = validate({ ...baseValid, nome: "  Core Banking  " });
    expect(errors.nome).toBeUndefined();
  });
});

// ─── PARTE 2: Teste UI — renderização do componente Index ────────────────────

function renderForm() {
  return render(
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  );
}

describe("TC-001 UI — Bloqueio de submissão com campos invisíveis", () => {
  it("deve bloquear submissão e destacar campo quando nome tem apenas espaços", () => {
    renderForm();

    // Step 1: Inserir apenas espaços no campo "Nome do Sistema"
    const nomeInput = screen.getByPlaceholderText("Ex.: Core Banking Platform");
    fireEvent.change(nomeInput, { target: { value: "   " } });

    // Step 2: Preencher Owner (o outro campo obrigatório de texto)
    const ownerInput = screen.getByPlaceholderText("Ex.: maria.silva@empresa.com");
    fireEvent.change(ownerInput, { target: { value: "maria.silva@corporate.com" } });

    // Nota: Criticidade (Select do Radix) é difícil de manipular com fireEvent.
    // Testamos que validate() rejeita o nome — a lógica de UI é a mesma.

    // Step 3: Clicar em "Submeter Final"
    const submitBtn = screen.getByRole("button", { name: /Submeter Final/i });
    fireEvent.click(submitBtn);

    // Expected: Mensagem "Campo obrigatório" visível
    const errorMessages = screen.getAllByText("Campo obrigatório");
    expect(errorMessages.length).toBeGreaterThanOrEqual(1);

    // Expected: O campo nome tem aria-invalid=true
    expect(nomeInput).toHaveAttribute("aria-invalid", "true");

    // Expected: Banner de alerta com "Não foi possível submeter"
    expect(screen.getByText("Não foi possível submeter")).toBeInTheDocument();

    // Expected: O campo "Nome do Sistema" aparece na lista de erros do banner
    // (aparece ≥2 vezes: label original + entrada no resumo de erros)
    const nomeMatches = screen.getAllByText(/Nome do Sistema/);
    expect(nomeMatches.length).toBeGreaterThanOrEqual(2);

    // Expected: Estado NÃO é "Pronto" (submissão bloqueada)
    expect(screen.queryByText("Pronto")).not.toBeInTheDocument();
  });

  it("deve manter o badge de estado como 'Vazio' após submissão falhada", () => {
    renderForm();

    const nomeInput = screen.getByPlaceholderText("Ex.: Core Banking Platform");
    fireEvent.change(nomeInput, { target: { value: "   " } });

    const submitBtn = screen.getByRole("button", { name: /Submeter Final/i });
    fireEvent.click(submitBtn);

    // O badge deve mostrar "Vazio", não "Pronto"
    expect(screen.getByText("Vazio")).toBeInTheDocument();
  });
});
