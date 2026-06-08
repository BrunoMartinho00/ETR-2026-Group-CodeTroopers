/**
 * TC-003 — Inconsistência Lógica de DR [Negative]
 *
 * Related requirements: REQ-003, REQ-009
 * Type: Logic / Variant 4 Focus / UI Integration
 *
 * Preconditions: Formulário de Intake aberto.
 *
 * Test data:
 *   - dr: "Nao"
 *   - ultimoTeste: Date("2023-10-10")
 *
 * Steps:
 *   1. Selecionar "Não" no campo "Disaster Recovery".
 *   2. Inserir uma data no campo "Data do Último Teste".
 *   3. Tentar clicar em "Submeter Final".
 *
 * Expected results:
 *   - O sistema bloqueia a transição (não transita para "Pronto").
 *   - Exibe o erro "Campo proibido para sistemas sem resiliência".
 *   - Marca o estado como "Inconsistent" (exibe badge "Inconsistent").
 */

import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { validate, type FormData } from "@/pages/Index";
import Index from "@/pages/Index";

// ─── PARTE 1: Teste Unitário — validate() lógica de inconsistência ──────────

describe("TC-003 Unit — validate() com DR='Nao' e Data preenchida", () => {
  const testData: FormData = {
    nome: "Core Banking Platform",
    owner: "maria.silva@corporate.com",
    criticidade: "Tier 3",
    dr: "Nao",
    rto: "",
    rpo: "",
    ultimoTeste: new Date("2023-10-10"),
  };

  it("deve gerar erro 'Campo proibido para sistemas sem resiliência' quando DR='Nao' e data está preenchida", () => {
    const errors = validate(testData);
    expect(errors.ultimoTeste).toBe("Campo proibido para sistemas sem resiliência");
  });
});

// ─── PARTE 2: Teste UI — Selecionar Não + Inserir Data + Submeter ────────────

function renderForm() {
  return render(
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  );
}

describe("TC-003 UI — Inconsistência Lógica de DR", () => {
  it("deve desativar a seleção de data quando DR='Nao'", () => {
    renderForm();

    const naoRadio = screen.getByLabelText("Não");
    fireEvent.click(naoRadio);

    const dateBtn = screen.getByRole("button", { name: /Escolher data/i });
    expect(dateBtn).toBeDisabled();
  });
});
