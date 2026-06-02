import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DiagnosisPageHero,
  DisclaimerBlock,
  FieldGroup,
  FormSection,
  PayResultBadge,
  ResultSection,
} from "./diagnosisShared";

const MANDATORY_CHECKS = [
  { key: "workerId", label: "근로자를 특정할 수 있는 정보(성명, 근로일·시간 등)가 기재되어 있습니다" },
  { key: "payDate", label: "임금지급일이 명확히 기재되어 있습니다" },
  { key: "totalWage", label: "지급 임금의 총액이 표시되어 있습니다" },
  { key: "itemized", label: "기본급·수당·상여 등 항목별 금액이 구분되어 있습니다" },
  {
    key: "calcBasis",
    label: "계산이 필요한 수당 등은 산출 기준이 적혀 있거나, 해당 없음이 명확합니다",
  },
  { key: "otHours", label: "연장·야간·휴일근로가 있는 경우 그 시간 수가 드러납니다 (해당 없으면 체크)" },
  {
    key: "deduction",
    label: "공제가 있는 경우 항목별 금액과 공제 총액이 표시됩니다 (공제 없으면 체크)",
  },
] as const;

type CheckKey = (typeof MANDATORY_CHECKS)[number]["key"];

const PayStatementDiagnosisPage = () => {
  const resultRef = useRef<HTMLElement>(null);
  const [showResult, setShowResult] = useState(false);
  const [checks, setChecks] = useState<Record<CheckKey, boolean>>({
    workerId: false,
    payDate: false,
    totalWage: false,
    itemized: false,
    calcBasis: false,
    otHours: false,
    deduction: false,
  });

  const [basicPay, setBasicPay] = useState("");
  const [otPay, setOtPay] = useState("");
  const [nightPay, setNightPay] = useState("");
  const [holidayPay, setHolidayPay] = useState("");
  const [mealAllowance, setMealAllowance] = useState("");
  const [deductionTotal, setDeductionTotal] = useState("");
  const [grossPay, setGrossPay] = useState("");
  const [netPay, setNetPay] = useState("");
  const [payDateText, setPayDateText] = useState("");
  const [hoursOnSlip, setHoursOnSlip] = useState<"yes" | "no" | "na">("na");

  const missingLabels = MANDATORY_CHECKS.filter((c) => !checks[c.key]).map((c) => c.label);
  const failCount = missingLabels.length;

  let level: "ok" | "warn" | "risk" = "ok";
  if (failCount >= 3) level = "risk";
  else if (failCount >= 1) level = "warn";

  if (hoursOnSlip === "no" && (parseFloat(otPay) > 0 || parseFloat(nightPay) > 0 || parseFloat(holidayPay) > 0)) {
    level = level === "ok" ? "warn" : "risk";
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setShowResult(true);
    queueMicrotask(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  const recommend = [];
  if (!checks.workerId || !checks.payDate || !checks.totalWage) {
    recommend.push("근로기준법상 임금명세서 필수 기재사항(특정·지급일·총액)을 우선 보완하세요.");
  }
  if (!checks.itemized || !checks.calcBasis) {
    recommend.push("항목별 금액 및 산출 근거를 구체화하면 분쟁 예방에 유리합니다.");
  }
  if (!checks.otHours) {
    recommend.push("연장·야간·휴일근로가 있다면 시간 수를 명세서에 남기는 것이 안전합니다.");
  }
  if (!checks.deduction) {
    recommend.push("공제 세부 내역을 항목·금액별로 명시하세요.");
  }
  if (!recommend.length) recommend.push("현재 체크 기준에서는 큰 누락이 없어 보입니다. 실물 명세서로 재확인하세요.");

  return (
    <main>
      <DiagnosisPageHero
        title="급여명세서 분석"
        description={
          "임금명세서 필수 기재사항과\n기본적인 임금 항목 구성을 기준으로\n현재 급여명세서의 적정성을 점검합니다."
        }
      />

      <div className="container mx-auto max-w-3xl space-y-10 px-4 py-12 md:py-16">
        <form onSubmit={onSubmit} className="space-y-10">
          <FormSection title="임금명세서 필수 기재 체크리스트">
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
              아래는 근로기준법 등에 따른 <strong className="text-foreground">임금명세서에 갖추어야 할 요지</strong>
              를 바탕으로 한 참고용 체크입니다. 실제 계도·분쟁 여부는 개별 사실관계에 따라 달라질 수 있습니다.
            </p>
            <ul className="space-y-3">
              {MANDATORY_CHECKS.map((c) => (
                <li key={c.key} className="flex gap-3 rounded-lg border border-border/80 bg-slate-50/50 p-3">
                  <input
                    type="checkbox"
                    id={c.key}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-input text-[#3d83f5] focus:ring-[#3d83f5]"
                    checked={checks[c.key]}
                    onChange={(e) => setChecks((s) => ({ ...s, [c.key]: e.target.checked }))}
                  />
                  <label htmlFor={c.key} className="cursor-pointer text-sm leading-relaxed text-foreground">
                    {c.label}
                  </label>
                </li>
              ))}
            </ul>
          </FormSection>

          <FormSection title="금액·지급 정보 (직접 입력 · 참고)">
            <div className="grid gap-4 md:grid-cols-2">
              <FieldGroup label="기본급 (원)">
                <Input inputMode="decimal" placeholder="0" value={basicPay} onChange={(e) => setBasicPay(e.target.value)} />
              </FieldGroup>
              <FieldGroup label="연장근로수당 (원)">
                <Input inputMode="decimal" placeholder="0" value={otPay} onChange={(e) => setOtPay(e.target.value)} />
              </FieldGroup>
              <FieldGroup label="야간근로수당 (원)">
                <Input inputMode="decimal" placeholder="0" value={nightPay} onChange={(e) => setNightPay(e.target.value)} />
              </FieldGroup>
              <FieldGroup label="휴일근로수당 (원)">
                <Input inputMode="decimal" placeholder="0" value={holidayPay} onChange={(e) => setHolidayPay(e.target.value)} />
              </FieldGroup>
              <FieldGroup label="식대·기타 수당 (원)">
                <Input inputMode="decimal" placeholder="0" value={mealAllowance} onChange={(e) => setMealAllowance(e.target.value)} />
              </FieldGroup>
              <FieldGroup label="공제 합계 (원)">
                <Input inputMode="decimal" placeholder="0" value={deductionTotal} onChange={(e) => setDeductionTotal(e.target.value)} />
              </FieldGroup>
              <FieldGroup label="총 지급액 (원)">
                <Input inputMode="decimal" placeholder="0" value={grossPay} onChange={(e) => setGrossPay(e.target.value)} />
              </FieldGroup>
              <FieldGroup label="실지급액 (원)">
                <Input inputMode="decimal" placeholder="0" value={netPay} onChange={(e) => setNetPay(e.target.value)} />
              </FieldGroup>
              <FieldGroup label="임금 지급일 (텍스트)">
                <Input placeholder="예: 매월 25일" value={payDateText} onChange={(e) => setPayDateText(e.target.value)} />
              </FieldGroup>
              <FieldGroup label="명세서에 근로시간(연장 등) 표시 여부">
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={hoursOnSlip}
                  onChange={(e) => setHoursOnSlip(e.target.value as "yes" | "no" | "na")}
                >
                  <option value="na">해당 없음 / 모름</option>
                  <option value="yes">표시됨</option>
                  <option value="no">표시 안 됨</option>
                </select>
              </FieldGroup>
            </div>

            <button type="submit" className="btn-primary mt-8 w-full md:w-auto">
              진단 결과 보기
              <ArrowRight className="h-4 w-4" />
            </button>
          </FormSection>
        </form>

        {showResult && (
          <section ref={resultRef} className="scroll-mt-24 space-y-6">
            <ResultSection title="진단 결과 (참고용)">
              <div className="mb-6">
                <PayResultBadge level={level} />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-sm font-bold text-navy">누락된 필수 기재 항목 (체크 미완료)</h3>
                  {missingLabels.length ? (
                    <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                      {missingLabels.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">체크리스트 상 필수 항목은 모두 충족된 것으로 보입니다.</p>
                  )}
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-bold text-navy">보완 권장 항목</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {recommend.map((t) => (
                      <li key={t} className="flex gap-2">
                        <span className="text-[#3d83f5]" aria-hidden>
                          ·
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-4">
                  <h3 className="mb-2 text-sm font-bold text-amber-900">임금명세서 교부 관련 리스크 안내</h3>
                  <p className="text-sm leading-relaxed text-amber-950/90">
                    임금명세서를 교부하지 않거나 필수 항목이 누락된 경우 과태료 대상이 될 수 있습니다.
                  </p>
                </div>
              </div>
            </ResultSection>

            <DisclaimerBlock />

            <div className="rounded-2xl border border-border bg-navy p-6 text-center text-primary-foreground shadow-lg md:p-8">
              <p className="text-sm font-medium text-primary-foreground/90">명세서 실물 검토·수정이 필요하면 전문가와 상담해 보세요.</p>
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

export default PayStatementDiagnosisPage;
