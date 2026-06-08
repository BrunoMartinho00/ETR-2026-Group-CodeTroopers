import { describe, expect, it } from "vitest";
import { evidenceAgeInDays, validate, type FormData } from "@/pages/Index";

const validBase: FormData = {
  nome: "Core Banking Platform",
  owner: "maria.silva@corporate.com",
  criticidade: "Tier 3",
  dr: "",
  rto: "",
  rpo: "",
};

describe("TC-010 Unit - Cobertura adicional de outliers", () => {
  it("deve rejeitar owner composto apenas por whitespace", () => {
    const errors = validate({ ...validBase, owner: " \t\n " });

    expect(errors.owner).toMatch(/Campo obrig/i);
  });

  it("deve rejeitar criticidade ausente", () => {
    const errors = validate({ ...validBase, criticidade: "" });

    expect(errors.criticidade).toMatch(/Campo obrig/i);
  });

  it("deve tratar campos obrigatorios ausentes como invalidos", () => {
    const errors = validate({
      ...validBase,
      nome: "",
      owner: "",
      criticidade: "",
    });

    expect(errors.nome).toMatch(/Campo obrig/i);
    expect(errors.owner).toMatch(/Campo obrig/i);
    expect(errors.criticidade).toMatch(/Campo obrig/i);
  });

  it("deve aceitar evidencia criada hoje", () => {
    const errors = validate({
      ...validBase,
      evidence: {
        name: "evidence.pdf",
        creationDate: new Date(),
      },
    });

    expect(errors.evidence).toBeUndefined();
  });

  it("deve aceitar evidencia com data futura sem marcar como expirada", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    const errors = validate({
      ...validBase,
      evidence: {
        name: "future-evidence.pdf",
        creationDate: futureDate,
      },
    });

    expect(errors.evidence).toBeUndefined();
  });

  it("deve calcular o limite temporal por dia de calendario, nao por milissegundos", () => {
    const now = new Date("2026-05-26T23:59:00");
    const exactly365DaysAgo = new Date("2025-05-26T00:01:00");
    const exactly366DaysAgo = new Date("2025-05-25T23:59:00");

    expect(evidenceAgeInDays(exactly365DaysAgo, now)).toBe(365);
    expect(evidenceAgeInDays(exactly366DaysAgo, now)).toBe(366);
  });
});
