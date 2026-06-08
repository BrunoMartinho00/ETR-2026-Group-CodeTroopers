/**
 * TC-004 — Caducidade de Evidência (366 dias) [Boundary]
 *
 * Related requirements: REQ-005
 * Type: Functional / Temporal / UI Integration
 *
 * Preconditions: Formulário de Intake no passo de upload de evidências.
 *
 * Test data:
 *   - Ficheiro com data de criação equivalente a Date.now() - 366 dias.
 *   - Ficheiro com data de criação equivalente a Date.now() - 365 dias (limite válido).
 *
 * Steps:
 *   1. Carregar uma evidência (simular clique no botão de upload).
 *   2. Selecionar data de criação equivalente a 366 dias atrás.
 *   3. Tentar submeter o formulário.
 *
 * Expected results:
 *   - O sistema rejeita o ficheiro com a notificação "Evidência Expirada".
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { validate, type FormData } from "@/pages/Index";
import Index from "@/pages/Index";

// Mock do componente Calendar para permitir selecionar datas específicas de forma estável
vi.mock("@/components/ui/calendar", () => {
  return {
    Calendar: ({ onSelect, selected }: { onSelect: (date: Date) => void; selected?: Date }) => (
      <div data-testid="mock-calendar">
        <button
          data-testid="select-366-days-ago"
          onClick={() => {
            const date366 = new Date(Date.now() - 366 * 24 * 60 * 60 * 1000);
            onSelect(date366);
          }}
        >
          Select 366 Days Ago
        </button>
        <button
          data-testid="select-365-days-ago"
          onClick={() => {
            const date365 = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
            onSelect(date365);
          }}
        >
          Select 365 Days Ago
        </button>
      </div>
    ),
  };
});

// ─── PARTE 1: Teste Unitário — validate() lógica de caducidade (Boundary) ────

describe("TC-004 Unit — Lógica de Expiração de Evidência", () => {
  const baseData: FormData = {
    nome: "Core Banking Platform",
    owner: "Maria Silva",
    criticidade: "Tier 3",
    dr: "",
    rto: "",
    rpo: "",
  };

  it("deve rejeitar evidência com exatamente 366 dias de idade", () => {
    const creationDate = new Date(Date.now() - 366 * 24 * 60 * 60 * 1000);
    const data: FormData = {
      ...baseData,
      evidence: {
        name: "test-evidence.pdf",
        creationDate,
      },
    };

    const errors = validate(data);
    expect(errors.evidence).toBe("Evidência Expirada");
  });

  it("deve aceitar evidência com exatamente 365 dias de idade (limite)", () => {
    const creationDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    const data: FormData = {
      ...baseData,
      evidence: {
        name: "test-evidence.pdf",
        creationDate,
      },
    };

    const errors = validate(data);
    expect(errors.evidence).toBeUndefined();
  });

  it("deve aceitar evidência com menos de 365 dias (ex: 300 dias)", () => {
    const creationDate = new Date(Date.now() - 300 * 24 * 60 * 60 * 1000);
    const data: FormData = {
      ...baseData,
      evidence: {
        name: "test-evidence.pdf",
        creationDate,
      },
    };

    const errors = validate(data);
    expect(errors.evidence).toBeUndefined();
  });
});

// ─── PARTE 2: Teste UI — Upload e Seleção de Data Expirada ──────────────────

function renderForm() {
  return render(
    <BrowserRouter>
      <Index />
    </BrowserRouter>
  );
}

describe("TC-004 UI — Rejeição de Evidência Expirada", () => {
  it("deve exibir 'Evidência Expirada' ao selecionar um ficheiro com 366 dias de antiguidade", async () => {
    renderForm();

    // 1. Carregar uma evidência (simular clique no botão)
    const uploadBtn = screen.getByRole("button", { name: /Escolher ficheiro/i });
    fireEvent.click(uploadBtn);

    // O ficheiro deve aparecer como carregado
    expect(screen.getByText("Ficheiro carregado")).toBeInTheDocument();

    // Abrir o popover da data de criação
    const selectDateBtn = screen.getByRole("button", { name: /Escolher data de criação/i });
    fireEvent.click(selectDateBtn);

    // 2. Selecionar data de 366 dias atrás usando o nosso Calendar mockado
    const select366Btn = screen.getByTestId("select-366-days-ago");
    fireEvent.click(select366Btn);

    // 3. Tentar submeter
    const submitBtn = screen.getByRole("button", { name: /Submeter Final/i });
    fireEvent.click(submitBtn);

    // Expected: Exibe o erro de expiração
    const errorMsg = screen.getAllByText("Evidência Expirada");
    expect(errorMsg.length).toBeGreaterThanOrEqual(1);
  });
});
