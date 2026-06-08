import { useMemo, useRef, useState } from "react";
import { format } from "date-fns";
import {
  AlertCircle,
  CalendarIcon,
  CheckCircle2,
  FileUp,
  X,
  Shield,
  Server,
  User,
  Layers,
  RefreshCw,
  Clock,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type Criticidade = "Tier 1" | "Tier 2" | "Tier 3" | "";
export type DR = "Sim" | "Nao" | "";
type Status = "empty" | "draft" | "ready" | "inconsistent";

export interface EvidenceFile {
  name: string;
  creationDate?: Date;
}

export interface FormData {
  id?: string;
  nome: string;
  owner: string;
  dashboardUrl?: string;
  criticidade: Criticidade;
  dr: DR;
  rto: string;
  rpo: string;
  ultimoTeste?: Date;
  evidence?: EvidenceFile;
}

export type Errors = Partial<Record<
  "nome" | "owner" | "dashboardUrl" | "criticidade" | "ultimoTeste" | "rto" | "rpo" | "evidence",
  string
>>;

const NA_REGEX = /^\s*n\.?\/?a\.?\s*$/i;
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const toUtcDateOnly = (date: Date) =>
  Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());

export const evidenceAgeInDays = (creationDate: Date, now = new Date()) =>
  Math.floor((toUtcDateOnly(now) - toUtcDateOnly(creationDate)) / MS_PER_DAY);

const FIELD_LABELS: Record<keyof Errors, string> = {
  nome: "Nome do Sistema",
  owner: "Owner",
  dashboardUrl: "Dashboard URL",
  criticidade: "Criticidade de Negócio",
  ultimoTeste: "Data do Último Teste",
  rto: "RTO",
  rpo: "RPO",
  evidence: "Upload de Evidência",
};

export const MOCK_ASSET_DATABASE = ["PROD-DB", "STAGE-API", "DEV-WEB"];

export function validateDashboardUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    return parsedUrl.protocol === "https:" && parsedUrl.hostname.includes(".");
  } catch {
    return false;
  }
}

export function validate(data: FormData): Errors {
  const errors: Errors = {};

  // REQ-001
  if (!data.nome.trim()) {
    errors.nome = "Campo obrigatório";
  } else if (MOCK_ASSET_DATABASE.includes(data.nome.trim())) {
    errors.nome = "Ativo já existe";
  }
  if (!data.owner.trim()) {
    errors.owner = "Campo obrigatório";
  } else {
    const email = data.owner.trim();
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PUBLIC_DOMAINS = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "live.com", "icloud.com"];
    
    if (!EMAIL_REGEX.test(email)) {
      errors.owner = "Formato de e-mail inválido";
    } else {
      const domain = email.split("@")[1].toLowerCase();
      if (PUBLIC_DOMAINS.includes(domain)) {
        errors.owner = "É necessário um e-mail corporativo válido";
      }
    }
  }
  if (!data.criticidade) errors.criticidade = "Campo obrigatório";

  // REQ-004
  const dashboardUrl = (data.dashboardUrl ?? "").trim();
  if (!dashboardUrl) {
    errors.dashboardUrl = "Campo obrigatorio";
  } else if (!validateDashboardUrl(dashboardUrl)) {
    errors.dashboardUrl = "URL HTTPS invalido";
  }

  // REQ-002 & REQ-003
  if (data.dr === "Sim" && !data.ultimoTeste) {
    errors.ultimoTeste = "Data do último teste é obrigatória quando DR está configurado";
  }
  if (data.dr === "Nao" && data.ultimoTeste) {
    errors.ultimoTeste = "Campo proibido para sistemas sem resiliência";
  }

  // Tier 1/2 RTO/RPO
  if (data.criticidade === "Tier 1" || data.criticidade === "Tier 2") {
    if (!data.rto.trim()) errors.rto = "RTO obrigatório para Tier 1/2";
    else if (NA_REGEX.test(data.rto)) errors.rto = "Valor 'N/A' não é permitido";

    if (!data.rpo.trim()) errors.rpo = "RPO obrigatório para Tier 1/2";
    else if (NA_REGEX.test(data.rpo)) errors.rpo = "Valor 'N/A' não é permitido";
  } else {
    if (data.rto.trim() && NA_REGEX.test(data.rto)) errors.rto = "Valor 'N/A' não é permitido";
    if (data.rpo.trim() && NA_REGEX.test(data.rpo)) errors.rpo = "Valor 'N/A' não é permitido";
  }

  // REQ-005
  if (data.evidence?.creationDate) {
    const ageDays = evidenceAgeInDays(data.evidence.creationDate);
    if (ageDays > 365) errors.evidence = "Evidência Expirada";
  } else if (data.evidence && !data.evidence.creationDate) {
    errors.evidence = "Data de criação do ficheiro é obrigatória";
  }

  return errors;
}

const initialData: FormData = {
  nome: "",
  owner: "",
  dashboardUrl: "",
  criticidade: "",
  dr: "",
  rto: "",
  rpo: "",
};

/* ─── Section header component ─── */
const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="flex items-center gap-2.5 pb-1">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Icon className="h-4 w-4" />
    </div>
    <h3 className="text-sm font-semibold tracking-wide text-foreground/80 uppercase">{title}</h3>
  </div>
);

/* ─── Field error message with animation ─── */
const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="text-sm text-destructive animate-fade-in flex items-center gap-1.5 mt-1.5">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  ) : null;

const Index = () => {
  const [data, setData] = useState<FormData>(() => {
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    if (params && params.get("edit") === "AST-001") {
      return {
        id: "AST-001",
        nome: "PROD-DB-EXISTENTE",
        owner: "owner.antigo@corporate.com",
        dashboardUrl: "https://monitoring.empresa.com",
        criticidade: "Tier 1",
        dr: "Sim",
        ultimoTeste: new Date("2026-05-01"),
        rto: "60",
        rpo: "15",
      };
    }
    return {
      nome: "",
      owner: "",
      dashboardUrl: "",
      criticidade: "",
      dr: "",
      rto: "",
      rpo: "",
    };
  });
  const originalDataRef = useRef<FormData>(data);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Errors, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("empty");

  const fieldRefs = useRef<Record<string, HTMLElement | null>>({});

  const liveErrors = useMemo(() => validate(data), [data]);

  // Errors visible per-field: blur-driven OR after submit attempt
  const visibleFieldErrors: Errors = useMemo(() => {
    const out: Errors = {};
    (Object.keys(liveErrors) as (keyof Errors)[]).forEach((k) => {
      const isCrossField = k === "ultimoTeste" || k === "evidence";
      if (submitAttempted || touched[k] || isCrossField) {
        out[k] = liveErrors[k];
      }
    });
    return out;
  }, [liveErrors, touched, submitAttempted]);

  // After submit, prefer the snapshot of errors (so they remain stable)
  const displayedErrors = submitAttempted ? errors : visibleFieldErrors;

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (status !== "empty") setStatus("empty");
  };

  const handleBlur = (field: keyof Errors) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const handleSaveDraft = () => {
    setStatus("draft");
    setErrors({});
    setSubmitAttempted(false);

    // Persistir dados com flag is_draft = true
    const payload = {
      ...data,
      is_draft: true,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("asset_intake_draft", JSON.stringify(payload));

    toast.success("Rascunho guardado", {
      description: "O estado foi guardado sem aplicar validações.",
    });
  };

  const handleSubmit = () => {
    const result = validate(data);
    setErrors(result);
    setSubmitAttempted(true);

    if (Object.keys(result).length === 0) {
      setStatus("ready");

      // Persistir dados com flag is_draft = false
      const payload = {
        ...data,
        is_draft: false,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem("asset_intake_submitted", JSON.stringify(payload));

      // NFR-001: Auditoria para alterações críticas
      if (data.id && originalDataRef.current) {
        const auditLogs = JSON.parse(localStorage.getItem("audit_logs") || "[]");
        let changeDetected = false;

        Object.keys(data).forEach((key) => {
          const k = key as keyof FormData;
          if (k !== "evidence" && data[k] !== originalDataRef.current[k]) {
            const entry = {
              id: `AUD-${Math.floor(Math.random() * 90000 + 10000)}`,
              userId: "USR-999", // Mock UserID (autenticado)
              timestamp: new Date().toISOString(),
              assetId: data.id,
              field: k,
              oldValue: String(originalDataRef.current[k] || ""),
              newValue: String(data[k] || ""),
            };
            auditLogs.push(entry);
            changeDetected = true;
          }
        });

        if (changeDetected) {
          localStorage.setItem("audit_logs", JSON.stringify(auditLogs));
        }
      }

      toast.success("Submissão final registada", {
        description: "Todos os requisitos foram validados com sucesso.",
      });
    } else {
      if (data.dr === "Nao" && data.ultimoTeste) {
        setStatus("inconsistent");
      } else {
        setStatus("empty");
      }
    }
  };

  const focusField = (key: keyof Errors) => {
    const el = fieldRefs.current[key];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      // Try focusing the inner input/button if it's a wrapper
      const focusable = el.querySelector<HTMLElement>("input, button, [role='combobox']");
      (focusable ?? el).focus?.();
    }
  };

  const errorEntries = Object.entries(displayedErrors) as [keyof Errors, string][];
  const hasErrors = submitAttempted && errorEntries.length > 0;

  const filledCount = [
    data.nome.trim(),
    data.owner.trim(),
    data.criticidade,
  ].filter(Boolean).length;
  const progressPct = Math.round((filledCount / 3) * 100);

  const statusBadge = () => {
    if (status === "ready") {
      return (
        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200 shadow-sm">
          <CheckCircle2 className="h-3 w-3 mr-1" /> Pronto
        </Badge>
      );
    }
    if (status === "draft") {
      return (
        <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-50 border border-amber-200 shadow-sm">
          Rascunho
        </Badge>
      );
    }
    if (status === "inconsistent") {
      return (
        <Badge className="bg-red-50 text-red-700 hover:bg-red-50 border border-red-200 shadow-sm">
          Inconsistent
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="shadow-sm">
        Vazio
      </Badge>
    );
  };

  return (
    <main className="min-h-screen bg-dots py-8 px-4 sm:py-12">
      <div className="mx-auto max-w-3xl animate-slide-up">
        {/* Header area */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-500 text-white shadow-lg shadow-primary/20">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gradient">Asset Intake Form</h1>
                <p className="text-sm text-muted-foreground">Registo de sistemas críticos — Data Steward</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Estado</span>
            {statusBadge()}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-muted-foreground">Campos obrigatórios</span>
            <span className="text-xs font-semibold text-primary">{filledCount}/3</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <Card className="shadow-xl shadow-black/[0.04] border-border/60">
          <CardContent className="p-6 sm:p-8 space-y-8">
            {/* Error banner */}
            {hasErrors && (
              <Alert variant="destructive" className="animate-fade-in border-destructive/30 bg-destructive/5">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Não foi possível submeter</AlertTitle>
                <AlertDescription>
                  <p className="mb-2">Corrija os seguintes campos:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {errorEntries.map(([key, msg]) => (
                      <li key={key}>
                        <button
                          type="button"
                          onClick={() => focusField(key)}
                          className="underline underline-offset-2 hover:opacity-70 text-left transition-opacity"
                        >
                          <span className="font-medium">{FIELD_LABELS[key]}:</span> {msg}
                        </button>
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* ─── Identificação ─── */}
            <section className="space-y-5">
              <SectionHeader icon={Server} title="Identificação do Sistema" />

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Nome */}
                <div className="space-y-1.5">
                  <Label htmlFor="nome" className="text-sm font-medium">
                    Nome do Sistema <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="nome"
                    ref={(el) => (fieldRefs.current.nome = el)}
                    value={data.nome}
                    onChange={(e) => update("nome", e.target.value)}
                    onBlur={() => handleBlur("nome")}
                    aria-invalid={!!displayedErrors.nome}
                    className={cn(
                      "h-11 bg-muted/40 border-border/60 transition-all focus:bg-background",
                      displayedErrors.nome && "border-destructive focus-visible:ring-destructive animate-error-pulse"
                    )}
                    placeholder="Ex.: Core Banking Platform"
                  />
                  <FieldError message={displayedErrors.nome} />
                </div>

                {/* Owner */}
                <div className="space-y-1.5">
                  <Label htmlFor="owner" className="text-sm font-medium">
                    Owner <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="owner"
                    ref={(el) => (fieldRefs.current.owner = el)}
                    value={data.owner}
                    onChange={(e) => update("owner", e.target.value)}
                    onBlur={() => handleBlur("owner")}
                    aria-invalid={!!displayedErrors.owner}
                    className={cn(
                      "h-11 bg-muted/40 border-border/60 transition-all focus:bg-background",
                      displayedErrors.owner && "border-destructive focus-visible:ring-destructive animate-error-pulse"
                    )}
                    placeholder="Ex.: maria.silva@empresa.com"
                  />
                  <FieldError message={displayedErrors.owner} />
                </div>
              </div>
            </section>

            <div className="border-t border-border/40" />

            {/* ─── Classificação ─── */}
            <section className="space-y-5">
              <SectionHeader icon={RefreshCw} title="Observabilidade" />

              <div className="space-y-1.5">
                <Label htmlFor="dashboardUrl" className="text-sm font-medium">
                  Dashboard URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="dashboardUrl"
                  ref={(el) => (fieldRefs.current.dashboardUrl = el)}
                  value={data.dashboardUrl ?? ""}
                  onChange={(e) => update("dashboardUrl", e.target.value)}
                  onBlur={() => handleBlur("dashboardUrl")}
                  aria-invalid={!!displayedErrors.dashboardUrl}
                  className={cn(
                    "h-11 bg-muted/40 border-border/60 transition-all focus:bg-background",
                    displayedErrors.dashboardUrl && "border-destructive focus-visible:ring-destructive"
                  )}
                  placeholder="https://monitoring.empresa.com"
                />
                <FieldError message={displayedErrors.dashboardUrl} />
              </div>
            </section>

            <div className="border-t border-border/40" />

            <section className="space-y-5">
              <SectionHeader icon={Layers} title="Classificação" />

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Criticidade */}
                <div className="space-y-1.5">
                  <Label htmlFor="criticidade" className="text-sm font-medium">
                    Criticidade de Negócio <span className="text-destructive">*</span>
                  </Label>
                  <div ref={(el) => (fieldRefs.current.criticidade = el)}>
                    <Select
                      value={data.criticidade || undefined}
                      onValueChange={(v) => {
                        update("criticidade", v as Criticidade);
                        handleBlur("criticidade");
                      }}
                    >
                      <SelectTrigger
                        id="criticidade"
                        aria-invalid={!!displayedErrors.criticidade}
                        className={cn(
                          "h-11 bg-muted/40 border-border/60",
                          displayedErrors.criticidade && "border-destructive focus:ring-destructive"
                        )}
                      >
                        <SelectValue placeholder="Selecione a criticidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tier 1">🔴 Tier 1 — Crítico</SelectItem>
                        <SelectItem value="Tier 2">🟡 Tier 2 — Importante</SelectItem>
                        <SelectItem value="Tier 3">🟢 Tier 3 — Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FieldError message={displayedErrors.criticidade} />
                </div>

                {/* DR */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Disaster Recovery Configurado?</Label>
                  <RadioGroup
                    value={data.dr}
                    onValueChange={(v) => {
                      const dr = v as DR;
                      setData((current) => ({
                        ...current,
                        dr,
                        ultimoTeste: dr === "Nao" ? undefined : current.ultimoTeste,
                      }));
                      if (status !== "empty") setStatus("empty");
                    }}
                    className="flex gap-4 pt-2"
                  >
                    <label
                      htmlFor="dr-sim"
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
                        data.dr === "Sim"
                          ? "border-primary bg-primary/5 text-primary shadow-sm"
                          : "border-border/60 bg-muted/40 hover:border-border"
                      )}
                    >
                      <RadioGroupItem value="Sim" id="dr-sim" />
                      <span className="text-sm font-medium">Sim</span>
                    </label>
                    <label
                      htmlFor="dr-nao"
                      className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
                        data.dr === "Nao"
                          ? "border-primary bg-primary/5 text-primary shadow-sm"
                          : "border-border/60 bg-muted/40 hover:border-border"
                      )}
                    >
                      <RadioGroupItem value="Nao" id="dr-nao" />
                      <span className="text-sm font-medium">Não</span>
                    </label>
                  </RadioGroup>
                </div>
              </div>
            </section>

            <div className="border-t border-border/40" />

            {/* ─── Resiliência ─── */}
            <section className="space-y-5">
              <SectionHeader icon={Clock} title="Resiliência & Tempos" />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* RTO */}
                <div className="space-y-1.5">
                  <Label htmlFor="rto" className="text-sm font-medium">
                    RTO <span className="text-muted-foreground text-xs font-normal">(minutos)</span>
                  </Label>
                  <Input
                    id="rto"
                    ref={(el) => (fieldRefs.current.rto = el)}
                    value={data.rto}
                    onChange={(e) => update("rto", e.target.value)}
                    onBlur={() => handleBlur("rto")}
                    aria-invalid={!!displayedErrors.rto}
                    className={cn(
                      "h-11 bg-muted/40 border-border/60 transition-all focus:bg-background",
                      displayedErrors.rto && "border-destructive focus-visible:ring-destructive"
                    )}
                    placeholder="Ex.: 60"
                  />
                  <FieldError message={displayedErrors.rto} />
                </div>

                {/* RPO */}
                <div className="space-y-1.5">
                  <Label htmlFor="rpo" className="text-sm font-medium">
                    RPO <span className="text-muted-foreground text-xs font-normal">(minutos)</span>
                  </Label>
                  <Input
                    id="rpo"
                    ref={(el) => (fieldRefs.current.rpo = el)}
                    value={data.rpo}
                    onChange={(e) => update("rpo", e.target.value)}
                    onBlur={() => handleBlur("rpo")}
                    aria-invalid={!!displayedErrors.rpo}
                    className={cn(
                      "h-11 bg-muted/40 border-border/60 transition-all focus:bg-background",
                      displayedErrors.rpo && "border-destructive focus-visible:ring-destructive"
                    )}
                    placeholder="Ex.: 15"
                  />
                  <FieldError message={displayedErrors.rpo} />
                </div>

                {/* Data Último Teste */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">
                    Data do Último Teste{" "}
                    {data.dr === "Sim" && <span className="text-destructive">*</span>}
                  </Label>
                  <div ref={(el) => (fieldRefs.current.ultimoTeste = el)}>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          type="button"
                          disabled={data.dr === "Nao"}
                          className={cn(
                            "w-full h-11 justify-start text-left font-normal bg-muted/40 border-border/60",
                            !data.ultimoTeste && "text-muted-foreground",
                            displayedErrors.ultimoTeste && "border-destructive",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {data.ultimoTeste ? format(data.ultimoTeste, "PPP") : <span>Escolher data</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={data.ultimoTeste}
                          onSelect={(d) => update("ultimoTeste", d ?? undefined)}
                          disabled={(date) => date > new Date()}
                          captionLayout="dropdown"
                          fromYear={2015}
                          toYear={new Date().getFullYear()}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    {data.ultimoTeste && (
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => update("ultimoTeste", undefined)}
                        className="mt-1 text-xs text-muted-foreground h-7"
                      >
                        <X className="h-3 w-3 mr-1" /> Limpar
                      </Button>
                    )}
                  </div>
                  <FieldError message={displayedErrors.ultimoTeste} />
                </div>
              </div>
            </section>

            <div className="border-t border-border/40" />

            {/* ─── Evidência ─── */}
            <section className="space-y-5">
              <SectionHeader icon={Upload} title="Evidência" />

              <div
                ref={(el) => (fieldRefs.current.evidence = el)}
                className={cn(
                  "rounded-xl border-2 border-dashed p-5 transition-all",
                  data.evidence
                    ? "border-primary/30 bg-primary/[0.02]"
                    : "border-border/50 bg-muted/30 hover:border-border hover:bg-muted/50",
                  displayedErrors.evidence && "border-destructive/50 bg-destructive/[0.02]",
                )}
              >
                {!data.evidence ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <FileUp className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground/70">Nenhum ficheiro selecionado</p>
                      <p className="text-xs text-muted-foreground mt-0.5">PDF, DOCX ou imagem até 10 MB</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      className="mt-1"
                      onClick={() =>
                        update("evidence", {
                          name: `evidencia-${Math.floor(Math.random() * 9000 + 1000)}.pdf`,
                        })
                      }
                    >
                      <FileUp className="h-4 w-4 mr-1.5" />
                      Escolher ficheiro
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FileUp className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{data.evidence.name}</p>
                          <p className="text-xs text-muted-foreground">Ficheiro carregado</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        type="button"
                        onClick={() => update("evidence", undefined)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4 mr-1" /> Remover
                      </Button>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">
                        Data de Criação do Ficheiro (metadata)
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            type="button"
                            className={cn(
                              "w-full h-11 justify-start text-left font-normal bg-muted/40 border-border/60",
                              !data.evidence.creationDate && "text-muted-foreground",
                              displayedErrors.evidence && "border-destructive",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {data.evidence.creationDate
                              ? format(data.evidence.creationDate, "PPP")
                              : <span>Escolher data de criação</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={data.evidence.creationDate}
                            onSelect={(d) =>
                              update("evidence", { ...data.evidence!, creationDate: d ?? undefined })
                            }
                            disabled={(date) => date > new Date()}
                            captionLayout="dropdown"
                            fromYear={2015}
                            toYear={new Date().getFullYear()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}
              </div>
              <FieldError message={displayedErrors.evidence} />
            </section>

            {/* ─── Actions ─── */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-6 border-t border-border/40">
              <Button
                variant="outline"
                type="button"
                onClick={handleSaveDraft}
                className="h-11 px-6 border-border/60"
              >
                Guardar Rascunho
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={liveErrors.nome === "Ativo já existe"}
                className="h-11 px-8 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Submeter Final
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-5 opacity-60">
          Protótipo · estado em memória · sem persistência
        </p>
      </div>
    </main>
  );
};

export default Index;
