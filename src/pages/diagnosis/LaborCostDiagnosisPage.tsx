import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  BurdenLevelBadge,
  DiagnosisPageHero,
  DisclaimerBlock,
  FieldGroup,
  FormSection,
  ResultSection,
} from "./diagnosisShared";

/** 월 소정근로시간 — 참고용 단순 환산(209시간) */
const MONTHLY_BASE_HOURS = 209;

function parseNum(s: string) {
  const n = parseFloat(s.replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
}

const LaborCostDiagnosisPage = () => {
  const resultRef = useRef<HTMLElement>(null);
  const [showResult, setShowResult] = useState(false);

  const [baseMonthly, setBaseMonthly] = useState("");
  const [fixedAllowance, setFixedAllowance] = useState("");
  const [hasBonus, setHasBonus] = useState(false);
  const [otHours, setOtHours] = useState("");
  const [nightHours, setNightHours] = useState("");
  const [holidayHours, setHolidayHours] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [insuranceCovered, setInsuranceCovered] = useState(true);
  const [severanceAccrual, setSeveranceAccrual] = useState(true);

  const result = showResult
    ? (() => {
        const n = Math.max(1, parseInt(headcount || "1", 10) || 1);
        const base = parseNum(baseMonthly);
        const fix = parseNum(fixedAllowance);
        const otH = parseNum(otHours);
        const nightH = parseNum(nightHours);
        const holH = parseNum(holidayHours);
        const hourly = base > 0 ? base / MONTHLY_BASE_HOURS : 0;
        /** 연장 1.5배·야간 0.5배·휴일 1.5배 등 단순 가정 (참고용) */
        const otCost = hourly * otH * 1.5;
        const nightCost = hourly * nightH * 0.5;
        const holidayCost = hourly * holH * 1.5;
        const premiumTotal = otCost + nightCost + holidayCost;
        const coreMonthly = (base + fix) * n;
        const bonusHint = hasBonus ? coreMonthly * 0.08 : 0;
        const insuranceRough = insuranceCovered ? coreMonthly * 0.095 : 0;
        const severanceRough = severanceAccrual ? ((base + fix) / 12) * n : 0;
        const estTotal = coreMonthly + premiumTotal * n + bonusHint + insuranceRough + severanceRough;

        const warnings: string[] = [];
        if (otH > 20) warnings.push("연장근로 비중이 높습니다 — 추가 수당·근로시간 캡을 점검하세요.");
        if (holH > 12) warnings.push("휴일근로가 많아 수당 부담이 커질 수 있습니다.");
        if (nightH > 15) warnings.push("야간근로가 상대적으로 많아 가산·건강보호 측면을 검토하세요.");
        if (base > 0 && premiumTotal / base > 0.25) warnings.push("가산수당이 기본급 대비 높은 편입니다. 인건비 구조 점검이 필요합니다.");
        if (!warnings.length) warnings.push("입력값 기준으로 특이한 패턴은 단순 분석에서 드러나지 않았습니다.");

        let burdenLevel: "low" | "medium" | "high" = "low";
        if (premiumTotal * n > coreMonthly * 0.2) burdenLevel = "high";
        else if (premiumTotal * n > coreMonthly * 0.08) burdenLevel = "medium";

        return {
          hourly,
          coreMonthly,
          premiumPerCapita: premiumTotal,
          premiumCompany: premiumTotal * n,
          bonusHint,
          insuranceRough,
          severanceRough,
          estTotal,
          warnings,
          burdenLevel,
        };
      })()
    : null;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setShowResult(true);
    queueMicrotask(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <main>
      <DiagnosisPageHero
        title="인건비 분석"
        description={
          "기본 급여 구조와 근로시간 정보를 바탕으로\n기업의 인건비 구성과 추가 비용 발생 가능성을 점검합니다.\n\n※ 정확한 세무·회계 계산기가 아니라 노무 관점의 참고용 도구입니다."
        }
      />

      <div className="container mx-auto max-w-3xl space-y-10 px-4 py-12 md:py-16">
        <form onSubmit={onSubmit} className="space-y-10">
          <FormSection title="기업 기본 정보 · 근로시간 (참고 입력)">
            <div className="grid gap-4 md:grid-cols-2">
              <FieldGroup label="월 기본급 (1인당, 원)">
                <Input inputMode="decimal" placeholder="0" value={baseMonthly} onChange={(e) => setBaseMonthly(e.target.value)} required />
              </FieldGroup>
              <FieldGroup label="월 고정수당 (1인당, 원)">
                <Input inputMode="decimal" placeholder="0" value={fixedAllowance} onChange={(e) => setFixedAllowance(e.target.value)} />
              </FieldGroup>
              <FieldGroup label="상시 근로자 수">
                <Input inputMode="numeric" placeholder="1" value={headcount} onChange={(e) => setHeadcount(e.target.value.replace(/\D/g, ""))} required />
              </FieldGroup>
              <FieldGroup label="월 평균 연장근로시간 (1인당)">
                <Input inputMode="decimal" placeholder="0" value={otHours} onChange={(e) => setOtHours(e.target.value)} />
              </FieldGroup>
              <FieldGroup label="월 평균 야간근로시간 (1인당)">
                <Input inputMode="decimal" placeholder="0" value={nightHours} onChange={(e) => setNightHours(e.target.value)} />
              </FieldGroup>
              <FieldGroup label="월 평균 휴일근로시간 (1인당)">
                <Input inputMode="decimal" placeholder="0" value={holidayHours} onChange={(e) => setHolidayHours(e.target.value)} />
              </FieldGroup>
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-[#3d83f5]"
                  checked={hasBonus}
                  onChange={(e) => setHasBonus(e.target.checked)}
                />
                <span>상여금이 정기적으로 지급됩니다 (참고용 8% 가산 추정)</span>
              </li>
              <li className="flex gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-[#3d83f5]"
                  checked={insuranceCovered}
                  onChange={(e) => setInsuranceCovered(e.target.checked)}
                />
                <span>4대보험 사업주 부담을 반영합니다 (단순 추정 약 9.5%)</span>
              </li>
              <li className="flex gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-[#3d83f5]"
                  checked={severanceAccrual}
                  onChange={(e) => setSeveranceAccrual(e.target.checked)}
                />
                <span>퇴직급 충당을 월 환산으로 반영합니다 (기본급+고정수당의 1/12 추정)</span>
              </li>
            </ul>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              연장·야간·휴일은 통상임금·소정근로시간 산정에 따라 실제 가산율이 달라질 수 있습니다. 여기서는
              <strong className="text-foreground"> 연장·야간·휴일 가산을 참고 수준을 단순 반영</strong>한 개략치입니다.
            </p>

            <button type="submit" className="btn-primary mt-8 w-full md:w-auto">
              진단 결과 보기
              <ArrowRight className="h-4 w-4" />
            </button>
          </FormSection>
        </form>

        {result && (
          <section ref={resultRef} className="scroll-mt-24 space-y-6">
            <ResultSection title="분석 결과 (참고용)">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <BurdenLevelBadge level={result.burdenLevel} />
                <span className="text-xs text-muted-foreground sm:text-right">
                  배지는 &quot;추가 수당 부담 상대 비중&quot;을 낮음/보통/높음으로 단순 표시합니다.
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-white p-4">
                  <p className="text-xs font-medium text-muted-foreground">추정 통상시급 (기본급÷209h)</p>
                  <p className="text-xl font-black tabular-nums text-navy">{Math.round(result.hourly).toLocaleString()}원</p>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                  <p className="text-xs font-medium text-muted-foreground">월 기준 예상 인건비 총액 (개략)</p>
                  <p className="text-xl font-black tabular-nums text-[#3d83f5]">{Math.round(result.estTotal).toLocaleString()}원</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-sm">
                <p className="font-bold text-navy">구성 요약</p>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>기본+고정 급여 총액: {Math.round(result.coreMonthly).toLocaleString()}원</li>
                  <li>가산근로 추정(전 직원): {Math.round(result.premiumCompany).toLocaleString()}원</li>
                  <li>상여 추정: {Math.round(result.bonusHint).toLocaleString()}원</li>
                  <li>4대보험 추정: {Math.round(result.insuranceRough).toLocaleString()}원</li>
                  <li>퇴직 충당 월환산: {Math.round(result.severanceRough).toLocaleString()}원</li>
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-sm font-bold text-navy">추가 수당 발생 가능 구간</h3>
                <p className="text-sm text-muted-foreground">
                  1인당 월 가산 추정 {Math.round(result.premiumPerCapita).toLocaleString()}원 — 연장·야간·휴일 입력에 따라 달라집니다.
                </p>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-[#3d83f5]"
                    style={{
                      width: `${Math.min(100, result.coreMonthly > 0 ? (result.premiumCompany / result.coreMonthly) * 50 : 0)}%`,
                    }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">막대는 기본급 대비 가산총액 비중을 시각화한 참고용입니다.</p>
              </div>

              <div className="mt-6">
                <h3 className="mb-2 text-sm font-bold text-navy">근로시간·인건비 유의사항</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {result.warnings.map((w) => (
                    <li key={w} className="flex gap-2">
                      <span className="text-amber-600" aria-hidden>
                        !
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </ResultSection>

            <DisclaimerBlock />

            <div className="rounded-2xl border border-border bg-navy p-6 text-center text-primary-foreground shadow-lg md:p-8">
              <p className="text-sm font-medium text-primary-foreground/90">인건비·제도 설계는 컨설팅과 함께 검토하는 것이 안전합니다.</p>
              <Link to="/consulting" className="btn-primary mt-5 inline-flex bg-[#3d83f5] hover:opacity-95">
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

export default LaborCostDiagnosisPage;
