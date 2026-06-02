import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DiagnosisPageHero,
  DisclaimerBlock,
  FieldGroup,
  FormSection,
  ResultSection,
  RiskLevelBadge,
} from "./diagnosisShared";

type OtLevel = "none" | "sometimes" | "often";

/** 체크리스트 기반 참고용 노무 리스크 점수화 (법적 효력 없음) */
function computeLaborRisk(input: {
  headcount: number;
  hasWorkRules: boolean;
  hasWrittenContract: boolean;
  givesPayslip: boolean;
  otLevel: OtLevel;
  hasFourIns: boolean;
  annualLeaveOk: boolean;
  recentLaborIssue: boolean;
}) {
  let penalty = 0;
  const issues: string[] = [];
  const fixFirst: string[] = [];

  if (!input.hasWorkRules) {
    penalty += 22;
    issues.push("취업규칙 미비 또는 미신고 가능성");
    fixFirst.push("취업규칙 제정·신고 및 배포");
  }
  if (!input.hasWrittenContract) {
    penalty += 25;
    issues.push("근로계약서 미작성·부실 기재");
    fixFirst.push("근로계약서 표준 양식 정비 및 전 직원 서면 작성");
  }
  if (!input.givesPayslip) {
    penalty += 18;
    issues.push("임금명세서 미교부");
    fixFirst.push("임금명세서 교부 절차·대장 정비");
  }
  if (input.otLevel === "sometimes") {
    penalty += 12;
    issues.push("연장·야간·휴일근로 관리 부담");
    fixFirst.push("근로시간 기록·가산수당 산정 기준 정리");
  }
  if (input.otLevel === "often") {
    penalty += 22;
    issues.push("연장·야간·휴일근로 다발 — 임금·근시간 리스크");
    fixFirst.push("탄력·선택근로 등 제도 검토 및 근로시간 캡 점검");
  }
  if (!input.hasFourIns) {
    penalty += 28;
    issues.push("4대보험 가입·신고 누락 가능성");
    fixFirst.push("4대보험 취득·상실 신고 및 보수총액 신고 점검");
  }
  if (!input.annualLeaveOk) {
    penalty += 15;
    issues.push("연차·휴가 관리 미흡");
    fixFirst.push("연차 발생·사용 대장 및 대체휴가 제도 정비");
  }
  if (input.recentLaborIssue) {
    penalty += 18;
    issues.push("최근 노동청 조사·신고 이력 — 재발 방지 필요");
    fixFirst.push("시정·이행 확인 및 동일 쟁점 예방 교육");
  }

  if (input.headcount >= 50) {
    penalty += 5;
    issues.push("상시 근로자 수가 많아 점검·감독 관심도가 상대적으로 높을 수 있음");
  }

  const level: "low" | "medium" | "high" = penalty <= 28 ? "low" : penalty <= 58 ? "medium" : "high";
  const score = Math.min(100, Math.round(penalty * 1.05 + 12));

  const adminExamples =
    level === "high"
      ? ["임금체불·명세서 미교부에 따른 과태료·시정명령", "취업규칙 미신고·부실에 따른 행정 지도"]
      : level === "medium"
        ? ["근로계약·명세서 기재 보완 권고", "근로시간 기록 불비 시 과태료 사례"]
        : ["자체 점검 및 예방 차원의 행정 대응 준비"];

  return {
    level,
    numericScore: score,
    issues: issues.length ? issues : ["특이 사항 없음 — 정기 점검 권장"],
    fixFirst: fixFirst.slice(0, 3).length ? fixFirst.slice(0, 3) : ["정기적인 노무 자체 점검 유지"],
    adminExamples,
  };
}

const LaborRiskDiagnosisPage = () => {
  const resultRef = useRef<HTMLElement>(null);
  const [showResult, setShowResult] = useState(false);

  const [headcount, setHeadcount] = useState("");
  const [industry, setIndustry] = useState("");
  const [hasWorkRules, setHasWorkRules] = useState(false);
  const [hasWrittenContract, setHasWrittenContract] = useState(false);
  const [givesPayslip, setGivesPayslip] = useState(false);
  const [otLevel, setOtLevel] = useState<OtLevel>("none");
  const [hasFourIns, setHasFourIns] = useState(false);
  const [annualLeaveOk, setAnnualLeaveOk] = useState(false);
  const [recentLaborIssue, setRecentLaborIssue] = useState(false);

  const result = showResult
    ? computeLaborRisk({
        headcount: Math.max(0, parseInt(headcount || "0", 10) || 0),
        hasWorkRules,
        hasWrittenContract,
        givesPayslip,
        otLevel,
        hasFourIns,
        annualLeaveOk,
        recentLaborIssue,
      })
    : null;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setShowResult(true);
    queueMicrotask(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <main>
      <DiagnosisPageHero
        title="노무리스크 진단"
        description={
          "기업의 인사·노무 관리 상태를 기준으로\n기본적인 노무 리스크를 점검합니다."
        }
      />

      <div className="container mx-auto max-w-3xl space-y-10 px-4 py-12 md:py-16">
        <form onSubmit={onSubmit} className="space-y-10">
          <FormSection title="기업 기본 정보 · 진단 항목">
            <div className="grid gap-6 md:grid-cols-2">
              <FieldGroup label="상시 근로자 수">
                <Input
                  inputMode="numeric"
                  placeholder="예: 12"
                  value={headcount}
                  onChange={(e) => setHeadcount(e.target.value.replace(/\D/g, ""))}
                  required
                />
              </FieldGroup>
              <FieldGroup label="업종">
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  required
                >
                  <option value="">선택</option>
                  <option value="제조">제조</option>
                  <option value="도소매·유통">도소매·유통</option>
                  <option value="IT·서비스">IT·서비스</option>
                  <option value="건설">건설</option>
                  <option value="요식·숙박">요식·숙박</option>
                  <option value="의료·돌봄">의료·돌봄</option>
                  <option value="기타">기타</option>
                </select>
              </FieldGroup>
            </div>

            <p className="mt-8 text-sm font-semibold text-navy">필수 진단 체크 (해당 시 체크)</p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                ["취업규칙을 제정·신고하고 운영 중입니다", hasWorkRules, setHasWorkRules],
                ["모든 근로자와 근로계약서를 작성·교부합니다", hasWrittenContract, setHasWrittenContract],
                ["매 급여일 임금명세서를 교부합니다", givesPayslip, setGivesPayslip],
                ["4대보험에 적법하게 가입·신고합니다", hasFourIns, setHasFourIns],
                ["연차·휴가를 대장으로 관리하고 있습니다", annualLeaveOk, setAnnualLeaveOk],
                ["최근 2년 이내 노동청 조사 또는 신고 경험이 있습니다", recentLaborIssue, setRecentLaborIssue],
              ].map(([label, checked, setVal]) => (
                <li key={String(label)} className="flex gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-input text-[#3d83f5] focus:ring-[#3d83f5]"
                    checked={checked as boolean}
                    onChange={(e) => (setVal as (v: boolean) => void)(e.target.checked)}
                  />
                  <span className="text-foreground">{label}</span>
                </li>
              ))}
            </ul>

            <FieldGroup label="연장·야간·휴일근로 발생 정도">
              <div className="flex flex-wrap gap-4 text-sm">
                {(
                  [
                    ["none", "거의 없음"],
                    ["sometimes", "월 1~2회 정도"],
                    ["often", "상시·다발적"],
                  ] as const
                ).map(([val, lab]) => (
                  <label key={val} className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="ot"
                      value={val}
                      checked={otLevel === val}
                      onChange={() => setOtLevel(val)}
                      className="text-[#3d83f5] focus:ring-[#3d83f5]"
                    />
                    {lab}
                  </label>
                ))}
              </div>
            </FieldGroup>

            <button type="submit" className="btn-primary mt-8 w-full md:w-auto">
              진단 결과 보기
              <ArrowRight className="h-4 w-4" />
            </button>
          </FormSection>
        </form>

        {result && (
          <section ref={resultRef} className="scroll-mt-24 space-y-6">
            <ResultSection title="진단 결과 (참고용)">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <RiskLevelBadge level={result.level} />
                <span className="text-sm text-muted-foreground">
                  참고 리스크 지수:{" "}
                  <strong className="tabular-nums text-navy">{result.numericScore}</strong> / 100
                </span>
              </div>
              <div className="mb-2 h-3 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={`h-3 rounded-full transition-all ${
                    result.level === "high"
                      ? "bg-destructive"
                      : result.level === "medium"
                        ? "bg-amber-500"
                        : "bg-[#3d83f5]"
                  }`}
                  style={{ width: `${result.numericScore}%` }}
                />
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="mb-2 text-sm font-bold text-navy">주요 리스크 항목</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {result.issues.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-bold text-navy">우선 정비 필요 항목 (상위 3)</h3>
                  <ol className="list-inside list-decimal space-y-1 text-sm font-medium text-foreground">
                    {result.fixFirst.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-bold text-navy">예상 행정 리스크 예시</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {result.adminExamples.map((t) => (
                      <li key={t} className="flex gap-2">
                        <span className="text-[#3d83f5]" aria-hidden>
                          ·
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ResultSection>

            <DisclaimerBlock />

            <div className="rounded-2xl border border-border bg-navy p-6 text-center text-primary-foreground shadow-lg md:p-8">
              <p className="text-sm font-medium text-primary-foreground/90">전문가와 함께 리스크를 구체화하고 대응 전략을 세워 보세요.</p>
              <Link
                to="/consulting"
                className="btn-primary mt-5 inline-flex bg-[#3d83f5] hover:opacity-95"
              >
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

export default LaborRiskDiagnosisPage;
