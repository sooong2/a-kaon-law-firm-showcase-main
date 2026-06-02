import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DiagnosisPageHero, FieldGroup, FormSection, ResultSection } from "./diagnosisShared";
import { MenuDiagnosisDisclaimerBlock } from "./menuDiagnosisDisclaimer";

type Urgency = "watch" | "caution" | "urgent";

function UrgencyBadge({ level }: { level: Urgency }) {
  const cfg = {
    watch: { label: "주시", className: "border-slate-200 bg-slate-100 text-slate-800" },
    caution: { label: "주의", className: "border-amber-200 bg-amber-50 text-amber-900" },
    urgent: { label: "긴급", className: "border-red-200 bg-red-50 text-red-900" },
  }[level];
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-bold ${cfg.className}`}>
      현재 사건 긴급도: {cfg.label}
    </span>
  );
}

function analyzeIncident(input: {
  incidentType: string;
  stage: string;
  headcount: number;
  hasDocs: boolean;
  parties: number;
  companyResponded: boolean;
  laborBoardContact: boolean;
}) {
  let score = 0;
  if (input.incidentType === "임금체불") score += 3;
  if (input.incidentType === "노동청 신고") score += 3;
  if (input.incidentType === "부당해고") score += 4;
  if (input.incidentType === "직장 내 괴롭힘") score += 3;
  if (input.incidentType === "기타") score += 2;

  if (input.stage === "조사 진행 중") score += 4;
  else if (input.stage === "조사 예정") score += 3;
  else if (input.stage === "신고 접수") score += 2;
  else score += 1;

  if (!input.hasDocs) score += 2;
  if (input.parties >= 3) score += 2;
  else if (input.parties >= 2) score += 1;
  if (!input.companyResponded) score += 2;
  if (input.laborBoardContact) score += 1;
  if (input.headcount >= 30) score += 1;

  const urgency: Urgency = score <= 7 ? "watch" : score <= 12 ? "caution" : "urgent";

  const firstActions: string[] = [];
  if (!input.companyResponded) firstActions.push("사실관계·일시·당사자를 정리하고 대외 대응 창구를 단일화하세요.");
  if (!input.hasDocs) firstActions.push("근로계약, 임금대장, 출퇴근·근로시간 기록 등 관련 서류를 즉시 확보·보관하세요.");
  if (input.laborBoardContact || input.stage !== "발생 직후") {
    firstActions.push("노동청·신고인과의 커뮤니케이션은 기록을 남기며 진행하는 것이 안전합니다.");
  }
  if (input.incidentType === "부당해고") firstActions.push("해고 절차·이유서·취업규칙상 징계 절차 등 서면을 점검하세요.");
  if (!firstActions.length) firstActions.push("내부 보고 체계를 마련하고 반복 발생 방지를 위한 제도 점검을 검토하세요.");

  const docs: string[] = ["사업자등록증·회사 대표 연락처", "취업규칙·취업규칙 신고 증명", "해당 근로자 근로계약서·수정 합의서"];
  if (input.incidentType === "임금체불" || input.incidentType === "노동청 신고") {
    docs.push("임금대장·통장 입금 내역·임금명세서");
  }
  if (input.incidentType === "부당해고") {
    docs.push("해고예고통지·해고사유서·징계위원회 기록(해당 시)");
  }
  if (input.incidentType === "직장 내 괴롭힘") {
    docs.push("신고·진술 기록, 조사·조치 내역, 교육 이수 자료");
  }

  const recommendConsult = urgency !== "watch" || input.stage === "조사 진행 중" || input.incidentType === "부당해고";

  const guide: string[] = [
    "감정적 대응보다는 사실관계·증거 중심으로 정리하세요.",
    "추가 불리한 발언·문서는 신중히 다루고, 필요 시 대리인을 통한 대응을 검토하세요.",
  ];
  if (urgency === "urgent") {
    guide.unshift("즉시 공인노무사·변호사 등 전문가 상담을 권장합니다.");
  } else if (recommendConsult) {
    guide.unshift("전문가 상담을 통해 대응 시나리오를 짜는 것이 유리합니다.");
  }

  return { urgency, firstActions: firstActions.slice(0, 4), docs, recommendConsult, guide };
}

const LaborIncidentUrgentDiagnosisPage = () => {
  const resultRef = useRef<HTMLElement>(null);
  const [done, setDone] = useState(false);

  const [incidentType, setIncidentType] = useState("");
  const [stage, setStage] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [hasDocs, setHasDocs] = useState(false);
  const [parties, setParties] = useState("");
  const [companyResponded, setCompanyResponded] = useState(false);
  const [laborBoardContact, setLaborBoardContact] = useState(false);

  const summary = done
    ? analyzeIncident({
        incidentType: incidentType || "기타",
        stage: stage || "발생 직후",
        headcount: Math.max(0, parseInt(headcount || "0", 10) || 0),
        hasDocs,
        parties: Math.max(1, parseInt(parties || "1", 10) || 1),
        companyResponded,
        laborBoardContact,
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
        title="노동 사건 긴급 점검"
        description={
          "노동청 신고, 임금 분쟁, 부당해고, 직장 내 분쟁 등\n노동 사건 발생 시 초기 대응 방향을 빠르게 확인할 수 있습니다."
        }
      />

      <div className="container mx-auto max-w-3xl space-y-10 px-4 py-12 md:py-16">
        <form onSubmit={onSubmit} className="space-y-10">
          <FormSection title="사건 개요 입력">
            <div className="grid gap-6 md:grid-cols-2">
              <FieldGroup label="사건 유형">
                <select
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                >
                  <option value="">선택</option>
                  <option value="임금체불">임금체불</option>
                  <option value="노동청 신고">노동청 신고</option>
                  <option value="부당해고">부당해고</option>
                  <option value="직장 내 괴롭힘">직장 내 괴롭힘</option>
                  <option value="기타">기타</option>
                </select>
              </FieldGroup>
              <FieldGroup label="현재 진행 상태">
                <select
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                >
                  <option value="">선택</option>
                  <option value="발생 직후">발생 직후</option>
                  <option value="신고 접수">신고 접수</option>
                  <option value="조사 예정">조사 예정</option>
                  <option value="조사 진행 중">조사 진행 중</option>
                </select>
              </FieldGroup>
              <FieldGroup label="상시 근로자 수">
                <Input
                  inputMode="numeric"
                  required
                  value={headcount}
                  onChange={(e) => setHeadcount(e.target.value.replace(/\D/g, ""))}
                />
              </FieldGroup>
              <FieldGroup label="사건 당사자 수">
                <Input
                  inputMode="numeric"
                  required
                  placeholder="1"
                  value={parties}
                  onChange={(e) => setParties(e.target.value.replace(/\D/g, ""))}
                />
              </FieldGroup>
            </div>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3">
                <input type="checkbox" className="mt-1 h-4 w-4 text-[#3d83f5]" checked={hasDocs} onChange={(e) => setHasDocs(e.target.checked)} />
                <span>관련 주요 서류를 확보했습니다</span>
              </li>
              <li className="flex gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-[#3d83f5]"
                  checked={companyResponded}
                  onChange={(e) => setCompanyResponded(e.target.checked)}
                />
                <span>회사 차원의 1차 대응(사실 확인·내부 보고)을 했습니다</span>
              </li>
              <li className="flex gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-[#3d83f5]"
                  checked={laborBoardContact}
                  onChange={(e) => setLaborBoardContact(e.target.checked)}
                />
                <span>노동청 등으로부터 연락·통보를 받았습니다</span>
              </li>
            </ul>

            <button type="submit" className="btn-primary mt-8 w-full md:w-auto">
              긴급 점검 결과 보기
              <ArrowRight className="h-4 w-4" />
            </button>
          </FormSection>
        </form>

        {summary && (
          <section ref={resultRef} className="scroll-mt-24 space-y-6">
            <ResultSection title="긴급 점검 결과 (참고용)">
              <UrgencyBadge level={summary.urgency} />

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-white p-4">
                  <h3 className="text-sm font-bold text-navy">우선 대응 필요 항목</h3>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {summary.firstActions.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-white p-4">
                  <h3 className="text-sm font-bold text-navy">준비 필요 서류 (예시)</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {summary.docs.map((t) => (
                      <li key={t}>· {t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-[#3d83f5]/25 bg-white p-4">
                <h3 className="text-sm font-bold text-navy">노무사 상담 권장 여부</h3>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {summary.recommendConsult ? "권장 — 전문가 상담을 통해 대응 전략을 정하는 것이 안전합니다." : "선택 — 상황에 따라 예방·1차 자문을 검토해 보세요."}
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/80 p-4">
                <h3 className="text-sm font-bold text-navy">초기 대응 가이드</h3>
                <ol className="mt-2 list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                  {summary.guide.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
              </div>
            </ResultSection>

            <MenuDiagnosisDisclaimerBlock />

            <div className="rounded-2xl border border-border bg-navy p-6 text-center text-primary-foreground shadow-lg md:p-8">
              <p className="text-sm text-primary-foreground/90">사건 진행에 따라 즉시 변호사·노무사 연계가 필요할 수 있습니다.</p>
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

export default LaborIncidentUrgentDiagnosisPage;
