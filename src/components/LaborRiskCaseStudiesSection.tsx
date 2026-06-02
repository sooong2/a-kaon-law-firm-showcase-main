/**
 * 실제 기업 노무 리스크 사례 — 다크 메시 배경 + 프리미엄 글라스 플로우 (기업 유형 → 문제 → 결과)
 */
import {
  Building2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Landmark,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

type CaseStudy = {
  id: string;
  companyType: string;
  problem: string[];
  outcome: string[];
  impact: string;
};

const CASES: CaseStudy[] = [
  {
    id: "mfg",
    companyType: "중견 제조업체",
    problem: ["근로계약서 미작성 및", "초과근로 관리 미흡"],
    outcome: ["노동청 조사 후", "과태료 및 임금 정산 발생"],
    impact: "약 1억 원 규모 비용 발생",
  },
  {
    id: "it",
    companyType: "IT 스타트업",
    problem: ["프리랜서 계약으로 운영했지만", "실질적 근로자 인정"],
    outcome: ["퇴직금 및 4대보험", "소급 적용"],
    impact: "수천만 원 추가 부담",
  },
  {
    id: "construction",
    companyType: "건설 관련 기업",
    problem: ["현장 인력 관리 미흡", "근로시간 기록 누락"],
    outcome: ["근로기준법 위반 판단", "과태료 및 체불임금 발생"],
    impact: "",
  },
];

/** 카드 사이: 얇은 글로우 라인 + 화살표 (데스크톱 가로 / 모바일 세로) */
function FlowConnector({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "group/connect flex shrink-0 flex-col items-center justify-center py-1 md:flex-row md:px-0.5 md:py-0",
        className
      )}
      aria-hidden
    >
      {/* 데스크톱: [─][›][─] */}
      <span className="hidden h-px w-6 shrink-0 rounded-full bg-gradient-to-r from-transparent via-white/35 to-white/25 shadow-[0_0_10px_hsl(217_91%_60%/0.35)] transition duration-500 group-hover/connect:via-trust-blue/50 md:block" />
      <ChevronRight
        className="hidden h-5 w-5 shrink-0 text-trust-blue/60 drop-shadow-[0_0_8px_hsl(217_91%_60%/0.35)] transition duration-500 group-hover/connect:text-trust-blue/90 md:mx-0.5 md:block"
        strokeWidth={2}
      />
      <span className="hidden h-px w-6 shrink-0 rounded-full bg-gradient-to-l from-transparent via-white/35 to-white/25 shadow-[0_0_10px_hsl(217_91%_60%/0.35)] transition duration-500 group-hover/connect:via-trust-blue/50 md:block" />

      {/* 모바일: 세로 라인 + 화살표 */}
      <span className="h-5 w-px shrink-0 rounded-full bg-gradient-to-b from-transparent via-white/30 to-white/20 shadow-[0_0_8px_hsl(217_91%_60%/0.2)] md:hidden" />
      <ChevronDown className="h-5 w-5 shrink-0 text-trust-blue/55 drop-shadow-[0_0_6px_hsl(217_91%_60%/0.3)] md:hidden" strokeWidth={2} />
      <span className="h-5 w-px shrink-0 rounded-full bg-gradient-to-b from-white/20 via-white/30 to-transparent shadow-[0_0_8px_hsl(217_91%_60%/0.2)] md:hidden" />
    </div>
  );
}

const labelCls =
  "text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/38";

const bodyCls =
  "mt-2 space-y-1 text-[15px] font-semibold leading-snug tracking-tight text-primary-foreground/92 md:text-[15px]";

const LaborRiskCaseStudiesSection = () => {
  return (
    <section
      className="relative overflow-hidden border-b border-white/[0.06] py-20 text-primary-foreground md:py-24"
      aria-labelledby="labor-risk-cases-heading"
    >
      {/* 메시 그라데이션 베이스 */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,hsl(217_50%_22%/0.45),transparent_55%),radial-gradient(ellipse_90%_60%_at_100%_100%,hsl(250_35%_20%/0.35),transparent_50%),linear-gradient(165deg,hsl(222_47%_11%)_0%,hsl(222_40%_9%)_45%,hsl(222_47%_7%)_100%)]"
        aria-hidden
      />
      {/* 소프트 오라 */}
      <div
        className="pointer-events-none absolute -left-[20%] top-[10%] h-[380px] w-[380px] rounded-full bg-trust-blue/20 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[15%] bottom-[5%] h-[320px] w-[320px] rounded-full bg-[hsl(265_45%_38%)]/25 blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(70vw,520px)] w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-trust-blue/5 blur-3xl"
        aria-hidden
      />
      {/* 은은한 그리드 패턴 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />
      {/* 노이즈 텍스처 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <header className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
              <h2
                id="labor-risk-cases-heading"
                className="bg-gradient-to-br from-white via-white to-white/85 bg-clip-text text-3xl font-bold leading-tight text-transparent md:text-4xl"
              >
                실제 기업 노무 리스크 사례
              </h2>
              <div className="mx-auto mt-4 max-w-[720px] space-y-2 text-sm leading-relaxed text-primary-foreground/58 md:text-[15px]">
                <p className="font-medium text-primary-foreground/72">
                  노무 관리의 작은 실수는 생각보다 큰 비용으로 이어질 수 있습니다.
                </p>
                <p className="text-primary-foreground/55">
                  실제 기업에서 발생했던 대표적인 노무 리스크 사례를 확인해보세요.
                </p>
              </div>
            </header>
          </ScrollReveal>

          <div className="flex flex-col gap-0 md:gap-11">
            {CASES.map((item, caseIndex) => {
              const baseDelay = caseIndex * 130;
              const isLast = caseIndex === CASES.length - 1;
              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex flex-col md:flex-row md:items-stretch md:gap-2 lg:gap-3",
                    // 모바일: 사례(3카드) 단위 구분 + 여백
                    "pt-2",
                    // 사례 간 간격은 아래 divider(1개)에서만 만든다
                    "mb-0 pb-0",
                    // PC: 기존 레이아웃/간격 유지
                    "md:mb-0 md:border-b-0 md:pb-0 md:pt-0"
                  )}
                >
                  {/* 기업 유형 — 블루 강조 글라스 */}
                  <ScrollReveal delay={baseDelay + 0} className="md:flex-1">
                    <div
                      className={cn(
                        "relative h-full overflow-hidden rounded-2xl border border-trust-blue/35 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.06)_inset,0_1px_0_rgba(255,255,255,0.1)_inset]",
                        "bg-gradient-to-br from-trust-blue/[0.22] via-trust-blue/[0.08] to-navy/20",
                        "backdrop-blur-[14px]"
                      )}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.14] via-transparent to-transparent" />
                      <div className="pointer-events-none absolute -bottom-6 -right-4 text-trust-blue/[0.12]">
                        <Building2 className="h-24 w-24" strokeWidth={1} />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.08] text-trust-blue">
                            <Building2 className="h-3.5 w-3.5" strokeWidth={2.2} />
                          </span>
                          <p className={labelCls}>기업 유형</p>
                        </div>
                        <p className="mt-2.5 text-base font-bold leading-tight tracking-tight text-white md:text-[17px]">
                          {item.companyType}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  <FlowConnector className="my-4 md:my-0 md:w-14 lg:w-16" />

                  {/* 문제 상황 — 중립 글라스 */}
                  <ScrollReveal delay={baseDelay + 110} className="md:flex-1">
                    <div
                      className={cn(
                        "relative h-full overflow-hidden rounded-2xl border border-white/[0.12] p-4",
                        "bg-white/[0.06] shadow-[0_12px_36px_rgba(0,0,0,0.32),0_0_0_1px_rgba(255,255,255,0.05)_inset,0_1px_0_rgba(255,255,255,0.08)_inset]",
                        "backdrop-blur-[16px]"
                      )}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-white/[0.02]" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                      <div className="pointer-events-none absolute -bottom-8 -right-2 text-white/[0.06]">
                        <ClipboardList className="h-28 w-28" strokeWidth={1} />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-primary-foreground/70">
                            <ClipboardList className="h-3.5 w-3.5" strokeWidth={2.2} />
                          </span>
                          <p className={labelCls}>문제 상황</p>
                        </div>
                        <div className={bodyCls}>
                          {item.problem.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>

                  <FlowConnector className="my-4 md:my-0 md:w-14 lg:w-16" />

                  {/* 결과 — 웜 코랄 강조 글라스 */}
                  <ScrollReveal delay={baseDelay + 220} className="md:flex-1">
                    <div
                      className={cn(
                        "relative h-full overflow-hidden rounded-2xl border border-orange-200/20 p-4",
                        "bg-gradient-to-br from-orange-400/[0.07] via-white/[0.05] to-white/[0.04]",
                        "shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_24px_-8px_rgba(251,146,60,0.18),0_0_0_1px_rgba(255,255,255,0.06)_inset,0_1px_0_rgba(255,255,255,0.09)_inset]",
                        "backdrop-blur-[16px]"
                      )}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-orange-500/[0.06] via-transparent to-transparent" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff8a8a]/35 to-transparent" />
                      <div className="pointer-events-none absolute -bottom-10 -right-4 text-orange-300/[0.09]">
                        <Landmark className="h-28 w-28" strokeWidth={1} />
                      </div>
                      <div className="relative z-10 flex h-full min-h-0 flex-col">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#ff8a8a]/25 bg-[#ff8a8a]/10 text-[#ff9a85]">
                            <Landmark className="h-3.5 w-3.5" strokeWidth={2.2} />
                          </span>
                          <p className={cn(labelCls, "text-primary-foreground/35")}>결과</p>
                        </div>
                        <div className={bodyCls}>
                          {item.outcome.map((line) => (
                            <p key={line}>{line}</p>
                          ))}
                        </div>
                        {item.impact ? (
                          <p className="mt-3 border-t border-[#ff8a8a]/15 pt-3 text-base font-bold leading-tight tracking-tight text-[#ff8a8a] shadow-black/20 drop-shadow-sm md:text-lg">
                            {item.impact}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* 모바일: 사례 세트(기업 유형→문제→결과) 끝난 뒤 외부 divider 1개만 (마지막 제외) */}
                  {!isLast ? (
                    <div className="md:hidden" aria-hidden>
                      {/* margin: 36px auto 40px auto */}
                      <div className="mx-auto mt-9 mb-10 h-px w-4/5 bg-white/[0.12]" />
                    </div>
                  ) : null}
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
};

export default LaborRiskCaseStudiesSection;
