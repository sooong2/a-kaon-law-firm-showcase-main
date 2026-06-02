import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

/** 진단 페이지 하단 고지 — 모든 진단 하단에 동일 문구 */
export const DIAGNOSIS_DISCLAIMER =
  "본 진단은 입력된 정보를 바탕으로 제공되는 참고용 결과이며, 실제 법률 판단이나 행정 대응은 공인노무사 상담을 통해 확인하시기 바랍니다.";

/** [Hero] 뒤로가기 · breadcrumb · 제목 · 설명 · 무료 진단 안내 */
export function DiagnosisPageHero({ title, description }: { title: string; description: string }) {
  return (
    <section className="border-b border-border bg-gradient-to-b from-slate-50/90 to-background py-12 md:py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <Link
          to="/diagnosis"
          className="mb-5 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-[#3d83f5]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          셀프진단으로 돌아가기
        </Link>
        <nav className="mb-3 text-xs text-muted-foreground" aria-label="현재 위치">
          <ol className="flex flex-wrap items-center gap-x-1.5">
            <li>
              <Link to="/diagnosis" className="hover:text-[#3d83f5]">
                셀프진단
              </Link>
            </li>
            <li aria-hidden className="text-muted-foreground/60">
              /
            </li>
            <li className="font-medium text-foreground">{title}</li>
          </ol>
        </nav>
        <h1 className="text-3xl font-bold leading-tight text-navy md:text-4xl">{title}</h1>
        <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">{description}</p>
        <p className="mt-5 text-sm font-semibold text-[#3d83f5]">무료 진단으로 참고용 결과를 확인해 보세요.</p>
      </div>
    </section>
  );
}

/** 노무 리스크 수준 배지 (낮음=슬레이트·블루톤 / 보통=오렌지 / 높음=레드) */
export function RiskLevelBadge({ level }: { level: "low" | "medium" | "high" }) {
  const cfg = {
    low: { label: "낮음", className: "border-slate-200 bg-slate-100 text-slate-800" },
    medium: { label: "보통", className: "border-amber-200 bg-amber-50 text-amber-900" },
    high: { label: "높음", className: "border-red-200 bg-red-50 text-red-900" },
  }[level];
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-bold ${cfg.className}`}>
      현재 리스크 수준: {cfg.label}
    </span>
  );
}

/** 인건비 페이지 — 가산 부담 정도 (색상 톤은 RiskLevel과 동일) */
export function BurdenLevelBadge({ level }: { level: "low" | "medium" | "high" }) {
  const cfg = {
    low: { label: "가산 부담 낮음", className: "border-slate-200 bg-slate-100 text-slate-800" },
    medium: { label: "가산 부담 보통", className: "border-amber-200 bg-amber-50 text-amber-900" },
    high: { label: "가산 부담 높음", className: "border-red-200 bg-red-50 text-red-900" },
  }[level];
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-bold ${cfg.className}`}>
      인건비 부담: {cfg.label}
    </span>
  );
}

/** 급여명세서 분석 결과 톤 */
export function PayResultBadge({ level }: { level: "ok" | "warn" | "risk" }) {
  const cfg = {
    ok: { label: "적정", className: "border-slate-200 bg-slate-100 text-slate-800" },
    warn: { label: "보완 필요", className: "border-amber-200 bg-amber-50 text-amber-900" },
    risk: { label: "리스크 있음", className: "border-red-200 bg-red-50 text-red-900" },
  }[level];
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-bold ${cfg.className}`}>
      종합 판정: {cfg.label}
    </span>
  );
}

/** 입력 폼 카드 래퍼 */
export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-[0_8px_28px_rgba(61,131,245,0.06)] md:p-8">
      <h2 className="mb-6 border-b border-border pb-3 text-lg font-bold text-navy">{title}</h2>
      {children}
    </section>
  );
}

/** 진단 결과 카드 */
export function ResultSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#3d83f5]/25 bg-gradient-to-b from-white via-sky-50/20 to-white p-6 shadow-[0_14px_32px_rgba(61,131,245,0.09)] md:p-8">
      <h2 className="mb-6 border-b border-[#3d83f5]/20 pb-3 text-lg font-bold text-navy">{title}</h2>
      {children}
    </section>
  );
}

export function DisclaimerBlock() {
  return (
    <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/90 px-4 py-4 text-center text-xs leading-relaxed text-muted-foreground md:text-sm">
      {DIAGNOSIS_DISCLAIMER}
    </p>
  );
}

/** 라벨 + 자식 한 줄 필드 간격 */
export function FieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}
