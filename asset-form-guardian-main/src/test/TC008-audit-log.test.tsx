/**
 * TC-008 — Auditoria de Alterações Críticas [Acceptance]
 *
 * Related requirements: NFR-001
 * Type: Compliance / UI Acceptance / System
 *
 * Preconditions: Utilizador autenticado a editar um ativo com ID existente.
 *
 * Test data:
 *   - Novo valor para Owner: "novo.dono@corporate.com"
 *   - Ativo existente: id = "AST-001", owner = "owner.antigo@corporate.com", etc.
 *
 * Steps:
 *   1. Navegar para a página com o query parameter ?edit=AST-001.
 *   2. Alterar o campo "Owner" para "novo.dono@corporate.com".
 *   3. Clicar em "Submeter Final".
 *
 * Expected results:
 *   - O sistema valida com sucesso a edição.
 *   - É gerado um registo no Log de Auditoria (localStorage) com:
 *     - UserID ("USR-999" representando o utilizador autenticado).
 *     - Timestamp.
 *     - valores antigo ("owner.antigo@corporate.com") e novo ("novo.dono@corporate.com").
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
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

describe("TC-008 UI & Compliance — Auditoria de Alterações Críticas", () => {
  const originalLocation = window.location;

  beforeEach(() => {
    localStorage.clear();
    // Definir a URL mockada com o query parameter ?edit=AST-001
    Object.defineProperty(window, "location", {
      configurable: true,
      value: new URL("http://localhost:8080/?edit=AST-001"),
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });

  it("deve carregar o ativo existente e gerar log de auditoria ao alterar o Owner", () => {
    renderForm();

    // Validar precondição: campo Owner deve vir pré-preenchido com "owner.antigo@corporate.com"
    const ownerInput = screen.getByPlaceholderText("Ex.: maria.silva@empresa.com") as HTMLInputElement;
    expect(ownerInput.value).toBe("owner.antigo@corporate.com");

    // 2. Alterar o campo "Owner" para "novo.dono@corporate.com"
    fireEvent.change(ownerInput, { target: { value: "novo.dono@corporate.com" } });
    expect(ownerInput.value).toBe("novo.dono@corporate.com");

    // 3. Clicar em "Submeter Final"
    const submitBtn = screen.getByRole("button", { name: /Submeter Final/i });
    fireEvent.click(submitBtn);

    // Validar se o log de auditoria foi guardado no localStorage
    const auditLogsStr = localStorage.getItem("audit_logs");
    expect(auditLogsStr).not.toBeNull();

    const auditLogs = JSON.parse(auditLogsStr!);
    expect(auditLogs.length).toBe(1);

    const logEntry = auditLogs[0];
    expect(logEntry.userId).toBe("USR-999");
    expect(logEntry.assetId).toBe("AST-001");
    expect(logEntry.field).toBe("owner");
    expect(logEntry.oldValue).toBe("owner.antigo@corporate.com");
    expect(logEntry.newValue).toBe("novo.dono@corporate.com");
    expect(logEntry.timestamp).toBeDefined();

    // Garantir que o timestamp é uma data ISO válida
    expect(isNaN(Date.parse(logEntry.timestamp))).toBe(false);
  });
});
