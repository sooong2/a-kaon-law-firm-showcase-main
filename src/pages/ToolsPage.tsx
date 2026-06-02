/* ===== 실무도구 — 노무 실무 계산기 + 자가진단 도구 센터 ===== */
import { useState } from "react";
import {
  Calculator,
  ArrowRight,
  Wallet,
  CalendarDays,
  Landmark,
  Scale,
  ShieldAlert,
  ClipboardCheck,
  Stethoscope,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SeveranceCalculatorModal from "@/components/tools/SeveranceCalculatorModal";
import AnnualLeaveCalculatorModal from "@/components/tools/AnnualLeaveCalculatorModal";
import SubsidyDiagnosisModal from "@/components/tools/SubsidyDiagnosisModal";
import DismissalRiskModal from "@/components/tools/DismissalRiskModal";
import HarassmentDiagnosisModal from "@/components/tools/HarassmentDiagnosisModal";
import ContractChecklistModal from "@/components/tools/ContractChecklistModal";

const tools = [
  {
    id: "severance",
    type: "calculator" as const,
    icon: Wallet,
    title: "퇴직금 계산기",
    desc: "근속기간·평균임금 기준 퇴직금 예상액을 확인합니다.",
    actionLabel: "계산하기",
    hint: "「계산하기」를 누르면 입력 화면이 열리며, 값 변경 시 결과가 실시간으로 갱신됩니다.",
  },
  {
    id: "annual-leave",
    type: "calculator" as const,
    icon: CalendarDays,
    title: "연차 계산기",
    desc: "입사일·근속연수 기준 연차 발생일수를 계산합니다.",
    actionLabel: "계산하기",
    hint: "입사일 입력만으로 연차 발생·사용 가능 일수를 즉시 확인할 수 있습니다.",
  },
  {
    id: "subsidy",
    type: "diagnosis" as const,
    icon: Landmark,
    title: "정부지원금 진단",
    desc: "사업장 규모·업종·채용 현황 기준 신청 가능 지원금을 추천합니다.",
    actionLabel: "진단하기",
    hint: "사업장 정보를 입력하면 추천 지원사업과 신청 가능 목록을 확인할 수 있습니다.",
  },
  {
    id: "dismissal-risk",
    type: "diagnosis" as const,
    icon: Scale,
    title: "해고 리스크 진단",
    desc: "근속기간·징계·서면 통지 등 해고 절차 리스크를 점수화합니다.",
    actionLabel: "진단하기",
    hint: "해고 전 절차 이행 여부를 점검하고 노무사 상담 필요성을 안내합니다.",
  },
  {
    id: "harassment",
    type: "diagnosis" as const,
    icon: ShieldAlert,
    title: "직장 내 괴롭힘 진단",
    desc: "반복성·업무 관련성 등 직장 내 괴롭힘 해당 가능성을 점검합니다.",
    actionLabel: "진단하기",
    hint: "상황을 입력하면 해당 가능성과 권장 대응 방법을 확인할 수 있습니다.",
  },
  {
    id: "contract-checklist",
    type: "diagnosis" as const,
    icon: ClipboardCheck,
    title: "근로계약서 체크리스트",
    desc: "근로기준법 필수 기재 항목 누락 여부와 법적 리스크를 점검합니다.",
    actionLabel: "점검하기",
    hint: "근로계약서에 포함된 항목을 체크하면 누락 사항을 즉시 확인합니다.",
  },
] as const;

type ToolId = (typeof tools)[number]["id"];

const ToolsPage = () => {
  const [openTool, setOpenTool] = useState<ToolId | null>(null);

  return (
    <main>
      <section
        className="py-16 md:py-24"
        style={{
          background: "linear-gradient(180deg, hsl(var(--navy)) 0%, hsl(222 47% 16%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <span className="badge-blue bg-trust-blue/20 text-trust-blue">● PRACTICAL TOOLS</span>
          <h1 className="mt-6 text-3xl font-black text-primary-foreground md:text-4xl lg:text-5xl">노무 실무도구</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/70">
            계산기와 자가진단 도구를 통해
            <br className="hidden sm:block" />
            노무 이슈를 빠르게 확인해보세요.
          </p>
        </div>
      </section>

      <section className="section-white py-20 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid gap-6 sm:grid-cols-2">
            {tools.map((tool, i) => {
              const isDiagnosis = tool.type === "diagnosis";

              return (
              <ScrollReveal key={tool.id} delay={i * 60}>
                <article
                  id={tool.id}
                  className={`card-lift scroll-mt-24 rounded-2xl border p-6 md:p-8 ${
                    isDiagnosis
                      ? "border-slate-100 bg-[#fafbfc]"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                        isDiagnosis ? "bg-white" : "bg-trust-blue-light"
                      }`}
                    >
                      <tool.icon className="h-6 w-6 text-trust-blue" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-navy">{tool.title}</h3>
                        <span className="rounded-full bg-trust-blue/10 px-2 py-0.5 text-[0.65rem] font-semibold text-trust-blue">
                          이용 가능
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.desc}</p>
                    </div>
                  </div>

                  <div
                    className={`mt-6 rounded-xl border p-5 ${
                      isDiagnosis
                        ? "border-slate-100 bg-white/80"
                        : "border-trust-blue/15 bg-trust-blue-light/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {tool.actionLabel === "진단하기" || tool.actionLabel === "점검하기" ? (
                        <Stethoscope className="mt-0.5 h-5 w-5 shrink-0 text-trust-blue" />
                      ) : (
                        <Calculator className="mt-0.5 h-5 w-5 shrink-0 text-trust-blue" />
                      )}
                      <p className="text-sm text-muted-foreground">{tool.hint}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpenTool(tool.id)}
                    className="btn-primary mt-5 w-full justify-center py-3 text-sm"
                  >
                    {tool.actionLabel}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </article>
              </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <SeveranceCalculatorModal open={openTool === "severance"} onOpenChange={(o) => !o && setOpenTool(null)} />
      <AnnualLeaveCalculatorModal open={openTool === "annual-leave"} onOpenChange={(o) => !o && setOpenTool(null)} />
      <SubsidyDiagnosisModal open={openTool === "subsidy"} onOpenChange={(o) => !o && setOpenTool(null)} />
      <DismissalRiskModal open={openTool === "dismissal-risk"} onOpenChange={(o) => !o && setOpenTool(null)} />
      <HarassmentDiagnosisModal open={openTool === "harassment"} onOpenChange={(o) => !o && setOpenTool(null)} />
      <ContractChecklistModal
        open={openTool === "contract-checklist"}
        onOpenChange={(o) => !o && setOpenTool(null)}
      />
    </main>
  );
};

export default ToolsPage;
