import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DiagnosisPageHero, FieldGroup, FormSection, ResultSection, RiskLevelBadge } from "./diagnosisShared";
import { MenuDiagnosisDisclaimerBlock } from "./menuDiagnosisDisclaimer";

type Level = "low" | "medium" | "high";

function analyzePayrollWorktime(input: {
  basePay: number;
  hasFixedAllowance: boolean;
  hasOt: boolean;
  hasNight: boolean;
  hasHoliday: boolean;
  hasAllowanceRule: boolean;
  hoursOnPayslip: boolean;
  payCriteriaDoc: boolean;
}) {
  let wageRisk = 0;
  let timeRisk = 0;
  const hasPremium = input.hasOt || input.hasNight || input.hasHoliday;

  if (!input.payCriteriaDoc) wageRisk += 2;
  if (!input.hasAllowanceRule) wageRisk += 2;
  if (hasPremium) {
    timeRisk += 1;
    if (!input.hoursOnPayslip) timeRisk += 3;
    if (!input.hasAllowanceRule) wageRisk += 1;
  }

  const combined = wageRisk + timeRisk;
  const payLevel: Level = wageRisk <= 2 ? "low" : wageRisk <= 5 ? "medium" : "high";
  const timeLevel: Level = timeRisk <= 2 ? "low" : timeRisk <= 4 ? "medium" : "high";
  const overall: Level = combined <= 4 ? "low" : combined <= 8 ? "medium" : "high";

  const allowanceNotes: string[] = [];
  if (input.basePay > 0 && !input.hasFixedAllowance) {
    allowanceNotes.push("고정수당 유무에 따라 통상임금·수당 산정 방식이 달라질 수 있으니 통상임금 산정 범위를 점검하세요.");
  }
  if (!input.hasAllowanceRule) allowanceNotes.push("연장·야간·휴일 등 수당 산정 기준을 문서·취업규칙 등에 명확히 두는 것이 안전합니다.");
  if (input.hasOt && !input.hoursOnPayslip) allowanceNotes.push("연장근로가 있는 경우 명세서·근로시간 기록에 시간이 드러나야 합니다.");
  if (input.hasHoliday) allowanceNotes.push("휴일근로는 대체휴무·수당 선택 등 법정 요건을 함께 점검하세요.");

  const supplement: string[] = [];
  if (!input.payCriteriaDoc) supplement.push("급여 산정 기준(통상임금·포함·제외 임금) 문서화");
  if (!input.hoursOnPayslip) supplement.push("임금명세서 근로시간·가산근로 표기");
  if (!input.hasAllowanceRule) supplement.push("수당 지급 조건·산식 정비");

  let extraCost = "낮음 — 가산근로가 적거나 기준이 정비된 경우";
  if (overall === "medium") extraCost = "보통 — 가산근로·수당 산정 보완 시 추가 비용이 발생할 수 있음";
  if (overall === "high") extraCost = "높음 — 근로시간·임금 기준 미비 시 소급 임금·가산 지급 가능성 검토 필요";

  return {
    overall,
    payLevel,
    timeLevel,
    allowanceNotes: allowanceNotes.length ? allowanceNotes : ["현재 입력 기준 특이한 수당 리스크 신호는 제한적입니다."],
    supplement: supplement.length ? supplement : ["정기적인 임금·근로시간 자체 점검 유지"],
    extraCost,
  };
}

const PayrollWorktimeDiagnosisPage = () => {
  const resultRef = useRef<HTMLElement>(null);
  const [done, setDone] = useState(false);

  const [basePay, setBasePay] = useState("");
  const [hasFixedAllowance, setHasFixedAllowance] = useState(false);
  const [hasOt, setHasOt] = useState(false);
  const [hasNight, setHasNight] = useState(false);
  const [hasHoliday, setHasHoliday] = useState(false);
  const [hasAllowanceRule, setHasAllowanceRule] = useState(false);
  const [hoursOnPayslip, setHoursOnPayslip] = useState(false);
  const [payCriteriaDoc, setPayCriteriaDoc] = useState(false);

  const summary = done
    ? analyzePayrollWorktime({
        basePay: Math.max(0, parseFloat(basePay.replace(/,/g, "")) || 0),
        hasFixedAllowance,
        hasOt,
        hasNight,
        hasHoliday,
        hasAllowanceRule,
        hoursOnPayslip,
        payCriteriaDoc,
      })
    : null;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
    queueMicrotask(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <main>
      <DiagnosisPageHero
        title="급여 및 근로시간 관리 점검"
        description={
          "급여 산정, 연장·휴일근로, 수당 관리 등\n임금 관련 노무 리스크를 점검합니다.\n급여 구조와 근로시간 운영 방식이 법적 기준에 맞는지\n기본적으로 확인할 수 있습니다."
        }
      />

      <div className="container mx-auto max-w-3xl space-y-10 px-4 py-12 md:py-16">
        <form onSubmit={onSubmit} className="space-y-10">
          <FormSection title="급여 · 근로시간 입력">
            <FieldGroup label="월 기본급 (원)">
              <Input inputMode="decimal" required placeholder="0" value={basePay} onChange={(e) => setBasePay(e.target.value)} />
            </FieldGroup>

            <ul className="mt-6 space-y-3 text-sm">
              {[
                ["고정수당을 별도 지급하고 있습니다", hasFixedAllowance, setHasFixedAllowance],
                ["연장근로가 발생합니다", hasOt, setHasOt],
                ["야간근로가 발생합니다", hasNight, setHasNight],
                ["휴일근로가 발생합니다", hasHoliday, setHasHoliday],
                ["수당 지급 기준이 제도·문서로 정해져 있습니다", hasAllowanceRule, setHasAllowanceRule],
                ["임금명세서에 근로시간이 표시됩니다", hoursOnPayslip, setHoursOnPayslip],
                ["급여 산정 기준이 문서화되어 있습니다", payCriteriaDoc, setPayCriteriaDoc],
              ].map(([lab, val, setV]) => (
                <li key={String(lab)} className="flex gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 text-[#3d83f5]"
                    checked={val as boolean}
                    onChange={(e) => (setV as (b: boolean) => void)(e.target.checked)}
                  />
                  <span>{lab}</span>
                </li>
              ))}
            </ul>

            <button type="submit" className="btn-primary mt-8 w-full md:w-auto">
              급여·근로시간 점검 결과 보기
              <ArrowRight className="h-4 w-4" />
            </button>
          </FormSection>
        </form>

        {summary && (
          <section ref={resultRef} className="scroll-mt-24 space-y-6">
            <ResultSection title="점검 결과 (참고용)">
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <RiskLevelBadge level={summary.overall} />
                <span className="text-xs text-muted-foreground">종합 참고 등급입니다.</span>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-white p-4">
                  <p className="text-xs font-semibold text-muted-foreground">급여 관리 리스크 수준</p>
                  <p className="mt-2 text-lg font-bold text-navy">
                    {summary.payLevel === "low" ? "낮음" : summary.payLevel === "medium" ? "보통" : "높음"}
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                  <p className="text-xs font-semibold text-muted-foreground">근로시간 운영 리스크</p>
                  <p className="mt-2 text-lg font-bold text-navy">
                    {summary.timeLevel === "low" ? "낮음" : summary.timeLevel === "medium" ? "보통" : "높음"}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-amber-200/60 bg-amber-50/40 p-4">
                <h3 className="text-sm font-bold text-navy">수당 산정 주의 항목</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {summary.allowanceNotes.map((t) => (
                    <li key={t}>· {t}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-slate-50/80 p-4">
                <h3 className="text-sm font-bold text-navy">보완 필요 항목</h3>
                <ol className="list-inside list-decimal text-sm text-foreground">
                  {summary.supplement.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
              </div>

              <div className="mt-6 rounded-xl border border-[#3d83f5]/20 bg-sky-50/30 p-4">
                <h3 className="text-sm font-bold text-navy">예상 추가 비용 발생 가능성</h3>
                <p className="mt-2 text-sm text-muted-foreground">{summary.extraCost}</p>
              </div>
            </ResultSection>

            <MenuDiagnosisDisclaimerBlock />

            <div className="rounded-2xl border border-border bg-navy p-6 text-center text-primary-foreground shadow-lg md:p-8">
              <p className="text-sm text-primary-foreground/90">급여·근로시간 제도는 개별 사실관계에 따라 달라질 수 있습니다.</p>
              <Link to="/consulting" className="btn-primary mt-5 inline-flex bg-[#3d83f5]">
                상세 상담 신청
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default PayrollWorktimeDiagnosisPage;
