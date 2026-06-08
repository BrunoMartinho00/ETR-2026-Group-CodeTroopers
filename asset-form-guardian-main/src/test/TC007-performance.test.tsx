/**
 * TC-007 — Performance do Motor de Regras [Performance]
 *
 * Related requirements: NFR-002
 * Type: Non-Functional / Performance
 *
 * Preconditions: Motor de regras (a função validate) a correr normalmente.
 *
 * Test data:
 *   - Payload JSON complexo com várias regras de validação cruzada.
 *
 * Steps:
 *   1. Executar 1000 submissões consecutivas do payload complexo.
 *   2. Registar a latência de cada execução.
 *   3. Calcular o percentil 95 (P95).
 *
 * Expected results:
 *   - O processamento de todas as regras ocorre em menos de 500ms (P95).
 */

import { describe, it, expect } from "vitest";
import { validate, type FormData } from "@/pages/Index";

describe("TC-007 Performance — Tempo de Processamento de Regras", () => {
  const complexPayload: FormData = {
    nome: "PROD-DB", // Vai acionar a validação de unicidade
    owner: "maria.silva@corporate.com",
    criticidade: "Tier 1", // Aciona validação de RTO/RPO obrigatórios
    dr: "Sim", // Aciona validação de data do último teste obrigatória
    ultimoTeste: new Date(),
    rto: "60",
    rpo: "15",
    evidence: {
      name: "security_evidence.pdf",
      creationDate: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000), // 100 dias (válido)
    },
  };

  it("deve processar validações com P95 inferior a 500ms", () => {
    const iterations = 1000;
    const latencies: number[] = [];

    // Executar benchmark
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      validate(complexPayload);
      const end = performance.now();
      latencies.push(end - start);
    }

    // Ordenar latências para calcular percentil
    latencies.sort((a, b) => a - b);

    const p95Index = Math.floor(iterations * 0.95);
    const p95Latency = latencies[p95Index];

    console.log(`[TC-007 Benchmark] P95 Latency: ${p95Latency.toFixed(4)}ms`);

    // O limite superior é 500ms. O frontend local deve processar em menos de 2ms.
    expect(p95Latency).toBeLessThan(500);
  });
});
