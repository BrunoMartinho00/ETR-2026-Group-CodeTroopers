import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Index, { validateDashboardUrl } from "@/pages/Index";

describe("TC-011 Unit - Dashboard URL", () => {
  it("aceita URL HTTPS com domínio válido", () => {
    expect(validateDashboardUrl("https://monitoring.empresa.com")).toBe(true);
  });

  it("rejeita URL HTTP", () => {
    expect(validateDashboardUrl("http://monitoring.empresa.com")).toBe(false);
  });

  it("rejeita URL HTTPS sem domínio válido", () => {
    expect(validateDashboardUrl("https://invalid")).toBe(false);
  });
});

describe("TC-011 UI - Dashboard URL", () => {
  it("exibe erro quando o URL não usa HTTPS", () => {
    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );

    const dashboardInput = screen.getByPlaceholderText("https://monitoring.empresa.com");
    fireEvent.change(dashboardInput, { target: { value: "http://monitoring.empresa.com" } });
    fireEvent.blur(dashboardInput);

    expect(screen.getByText("URL HTTPS invalido")).toBeInTheDocument();
  });
});
