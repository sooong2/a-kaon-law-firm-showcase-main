import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DiagnosisPageHero,
  FieldGroup,
  FormSection,
  ResultSection,
  RiskLevelBadge,
} from "./diagnosisShared";
import { MenuDiagnosisDisclaimerBlock } from "./menuDiagnosisDisclaimer";

type Level = "low" | "medium" | "high";

function analyzeBasicLabor(input: {
  headcount: number;
  hasWorkRules: boolean;
  hasContract: boolean;
  givesPayslip: boolean;
  hasFourIns: boolean;
  annualOk: boolean;
  recentCase: boolean;
}) {
  let p = 0;
  const checkNeeded: string[] = [];
  const fixPriority: string[] = [];
  const riskTypes: string[] = [];

  if (!input.hasWorkRules) {
    p += 20;
    checkNeeded.push("취업규칙 제정·신고 여부 및 직원 공지");
    fixPriority.push("취업규칙 정비 및 노동청 신고");
    riskTypes.push("취업규칙 미비에 따른 행정 지도·과태료");
  }
  if (!input.hasContract) {
    p += 22;
    checkNeeded.push("근로계약서 작성·교부 현황");
    fixPriority.push("전 직원 근로계약서 서면 정비");
    riskTypes.push("근로계약 미작성·부실 기재");
  }
  if (!input.givesPayslip) {
    p += 18;
    checkNeeded.push("임금명세서 교부 절차·대장");
    fixPriority.push("매 급여일 명세서 교부 체계 마련");
    riskTypes.push("명세서 미교부 관련 과태료");
  }
  if (!input.hasFourIns) {
    p += 28;
    checkNeeded.push("4대보험 취득·신고·보수총액 신고");
    fixPriority.push("가입 대상·소득 총액 점검 및 신고 보완");
    riskTypes.push("보험 미가입·과소신고");
  }
  if (!input.annualOk) {
    p += 15;
    checkNeeded.push("연차·휴가 발생·사용 관리");
    fixPriority.push("연차 대장 및 사용 촉진 절차");
    riskTypes.push("연차 미부여·임금 산정 오류");
  }
  if (input.recentCase) {
    p += 16;
    checkNeeded.push("최근 분쟁·신고와 연관된 제도 재점검");
    fixPriority.push("동일 유형 재발 방지 대책 수립");
    riskTypes.push("재신고·반복 조사 가능성");
  }
  if (input.headcount >= 40) {
    checkNeeded.push("상시 인원 규모에 따른 감독·신고 대응 강화 필요");
  }

  const level: Level = p <= 25 ? "low" : p <= 55 ? "medium" : "high";
  if (!checkNeeded.length) {
    checkNeeded.push("정기 자체 점검으로 현 상태 유지");
    fixPriority.push("연 1회 이상 노무 체크리스트 점검");
    riskTypes.push("예방적 행정 준수");
  }

  return {
    level,
    checkNeeded,
    fixPriority: fixPriority.slice(0, 4),
    riskTypes,
  };
}

const BasicLaborRiskDiagnosisPage = () => {
  const resultRef = useRef<HTMLElement>(null);
  const [done, setDone] = useState(false);

  const [headcount, setHeadcount] = useState("");
  const [industry, setIndustry] = useState("");
  const [hasWorkRules, setHasWorkRules] = useState(false);
  const [hasContract, setHasContract] = useState(false);
  const [givesPayslip, setGivesPayslip] = useState(false);
  const [hasFourIns, setHasFourIns] = useState(false);
  const [annualOk, setAnnualOk] = useState(false);
  const [recentCase, setRecentCase] = useState(false);

  const summary = done
    ? analyzeBasicLabor({
        headcount: Math.max(0, parseInt(headcount || "0", 10) || 0),
        hasWorkRules,
        hasContract,
        givesPayslip,
        hasFourIns,
        annualOk,
        recentCase,
      })
    : null;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
    queueMicrotask(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  const checks: [string, boolean, (v: boolean) => void][] = [
    ["취업규칙을 보유·신고하고 있습니다", hasWorkRules, setHasWorkRules],
    ["모든 근로자와 근로계약서를 작성·교부합니다", hasContract, setHasContract],
    ["매 급여일 임금명세서를 교부합니다", givesPayslip, setGivesPayslip],
    ["4대보험에 적법하게 가입·신고합니다", hasFourIns, setHasFourIns],
    ["연차·휴가를 체계적으로 관리합니다", annualOk, setAnnualOk],
    ["최근 노동청 조사 또는 신고 경험이 있습니다", recentCase, setRecentCase],
  ];

  return (
    <main>
      <DiagnosisPageHero
        title="노무 리스크 기본 진단"
        description={
          "기업 인사·노무 관리 전반의 기본 리스크를 점검합니다.\n취업규칙, 근로계약서, 임금체계, 4대보험, 연차관리 등\n기초적인 노무 리스크를 확인할 수 있습니다."
        }
      />

      <div className="container mx-auto max-w-3xl space-y-10 px-4 py-12 md:py-16">
        <form onSubmit={onSubmit} className="space-y-10">
          <FormSection title="기업 정보 · 진단 항목">
            <div className="grid gap-6 md:grid-cols-2">
              <FieldGroup label="상시 근로자 수">
                <Input
                  inputMode="numeric"
                  required
                  placeholder="예: 15"
                  value={headcount}
                  onChange={(e) => setHeadcount(e.target.value.replace(/\D/g, ""))}
                />
              </FieldGroup>
              <FieldGroup label="업종">
                <select
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                >
                  <option value="">선택</option>
                  <option value="제조">제조</option>
                  <option value="도소매·유통">도소매·유통</option>
                  <option value="IT·서비스">IT·서비스</option>
                  <option value="건설">건설</option>
                  <option value="요식·숙박">요식·숙박</option>
                  <option value="기타">기타</option>
                </select>
              </FieldGroup>
            </div>

            <p className="mt-8 text-sm font-semibold text-navy">해당 시 체크해 주세요</p>
            <ul className="mt-3 space-y-3 text-sm">
              {checks.map(([label, checked, setVal]) => (
                <li key={String(label)} className="flex gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-input text-[#3d83f5] focus:ring-[#3d83f5]"
                    checked={checked}
                    onChange={(e) => setVal(e.target.checked)}
                  />
                  <span className="text-foreground">{label}</span>
                </li>
              ))}
            </ul>

            <button type="submit" className="btn-primary mt-8 w-full md:w-auto">
              기본 진단 결과 보기
              <ArrowRight className="h-4 w-4" />
            </button>
          </FormSection>
        </form>

        {summary && (
          <section ref={resultRef} className="scroll-mt-24 space-y-6">
            <ResultSection title="기본 진단 결과 (참고용)">
              <RiskLevelBadge level={summary.level} />
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-white p-4">
                  <h3 className="text-sm font-bold text-navy">주요 점검 필요 항목</h3>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {summary.checkNeeded.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                  <h3 className="text-sm font-bold text-navy">우선 정비 권장 항목</h3>
                  <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-foreground">
                    {summary.fixPriority.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="text-sm font-bold text-navy">예상 리스크 유형</h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {summary.riskTypes.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="text-[#3d83f5]">·</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </ResultSection>

            <MenuDiagnosisDisclaimerBlock />

            <div className="rounded-2xl border border-border bg-navy p-6 text-center text-primary-foreground shadow-lg md:p-8">
              <p className="text-sm text-primary-foreground/90">전문가 상담으로 정비 방향을 구체화해 보세요.</p>
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

export default BasicLaborRiskDiagnosisPage;
