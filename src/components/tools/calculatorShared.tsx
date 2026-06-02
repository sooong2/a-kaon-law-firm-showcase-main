import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { CALCULATOR_DISCLAIMER } from "@/lib/laborCalculators";

export function CalculatorDisclaimer() {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-xs leading-relaxed text-amber-900/90">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" strokeWidth={1.75} />
      <p>{CALCULATOR_DISCLAIMER}</p>
    </div>
  );
}

export function CalculatorResultCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-trust-blue/30 bg-trust-blue-light/50"
          : "border-border/80 bg-slate-50/80"
      }`}
    >
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className={`mt-1.5 text-lg font-bold ${highlight ? "text-trust-blue" : "text-navy"}`}>{value}</p>
    </div>
  );
}

export function CalculatorField({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
