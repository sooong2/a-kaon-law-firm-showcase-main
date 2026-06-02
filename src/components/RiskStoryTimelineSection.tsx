/**
 * 홈: 기업 노무 리스크 안내 — 스토리형 가로(모바일 세로) 타임라인
 * 기존 통계 카드 메시지는 카드 하단 참고 수치로 유지합니다.
 */
import { ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

type TimelineStep = {
  step: string;
  title: string;
  items: string[];
  /** 기존 RISK CHECK 통계 영역 — 신뢰 근거로 짧게 유지 */
  statRef: string;
};

const TIMELINE_STEPS: TimelineStep[] = [
  {
    step: "01",
    title: "노무 리스크 방치",
    items: ["근로계약서 미작성", "임금체계 미정비", "노동법 변경 미대응"],
    statRef: "사전 점검 없는 기업의 노무 리스크 노출 비율 73%*",
  },
  {
    step: "02",
    title: "노동 분쟁 발생",
    items: ["직원 민원", "노동청 신고", "부당해고 분쟁"],
    statRef: "연간 노동 관련 분쟁 누적 2,800건+*",
  },
  {
    step: "03",
    title: "예상치 못한 비용 발생",
    items: ["과태료", "소송 비용", "기업 이미지 하락"],
    statRef: "근로기준법 위반 시 평균 과태료 90만원+*",
  },
];

/** 노드 ↔ 카드 사이 연결(세로선 + 화살표), 전체 높이 약 20px에 가깝게 */
function NodeToCardConnector({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-0", className)}
      aria-hidden
    >
      <div className="h-2 w-px shrink-0 rounded-full bg-gradient-to-b from-trust-blue/50 to-trust-blue/35" />
      <ChevronDown className="h-3.5 w-3.5 -mt-px text-trust-blue/50" strokeWidth={2.5} />
    </div>
  );
}

/** 모바일: 카드 블록 아래 → 다음 단계로 이어지는 ↓ */
function MobileStepBridge() {
  return (
    <div className="ml-[30px] flex flex-col items-center py-2 md:hidden" aria-hidden>
      <div className="h-3 w-px rounded-full bg-trust-blue/35" />
      <ChevronDown className="h-4 w-4 -mt-px text-trust-blue/45" strokeWidth={2.2} />
      <div className="h-3 w-px rounded-full bg-trust-blue/35" />
    </div>
  );
}

const CARD_MIN_HEIGHT = "min-h-[300px]";

const RiskStoryTimelineSection = () => {
  return (
    <section
      className="relative overflow-hidden border-b border-border/80 bg-gradient-to-b from-muted/30 via-surface to-surface py-20 md:py-24"
      aria-labelledby="risk-story-heading"
    >
      <div className="container relative z-10 mx-auto px-4">
        {/* 인트로 + 타임라인 동일 max-width로 왼쪽 기준 정렬 통일 */}
        <div className="mx-auto w-full max-w-6xl">
          <ScrollReveal>
            <div className="mb-12 text-center md:mb-14 md:w-full md:text-left">
              <span className="mb-4 inline-block rounded-full border border-[#ff4d4f]/35 bg-[#ff4d4f]/[0.06] px-4 py-1.5 text-xs font-bold tracking-widest text-[#ff4d4f]">
                PROBLEM
              </span>
              <h2 id="risk-story-heading" className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
                지금 우리 회사,
                <br className="hidden sm:block" /> 정말 안전한가요?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:mx-0 md:max-w-2xl">
                노동 분쟁과 법적 리스크는
                <br className="hidden md:block" /> 대부분{" "}
                <span className="font-semibold text-foreground">&quot;모르고 지나가는 문제&quot;</span>에서 시작됩니다.
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground/90 md:mx-0 md:max-w-2xl">
                매년 증가하는 노동 관련 분쟁과 변화하는 법규 속에서, 사전 예방이 최선의 대응입니다.
              </p>
            </div>
          </ScrollReveal>

          {/* 데스크톱: 가로 타임라인 */}
          <ScrollReveal delay={120}>
            <div className="relative hidden w-full md:block">
              {/* 연한 블루 트랙 + 흐름 빛 — 그리드와 동일 너비 기준 */}
              <div className="pointer-events-none absolute left-[10%] right-[10%] top-[26px] z-0 h-[3px] overflow-hidden rounded-full bg-trust-blue/15">
                <div className="risk-timeline-line-flow absolute inset-y-0 w-full" aria-hidden />
              </div>

              <div className="relative z-[1] grid grid-cols-3 gap-5 lg:gap-6">
                {TIMELINE_STEPS.map((block, index) => (
                  <div key={block.step} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "relative z-[2] flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-black text-white shadow-md",
                        index === 0 && "risk-timeline-node--1",
                        index === 1 && "risk-timeline-node--2",
                        index === 2 && "risk-timeline-node--3"
                      )}
                      style={{
                        background: "linear-gradient(145deg, #ff6b6b 0%, #ff4d4f 48%, #ff3b30 100%)",
                      }}
                    >
                      <span className="select-none tabular-nums tracking-tight">{block.step}</span>
                    </div>

                    {/* 노드~카드 약 20px: 연결선 + ↓ */}
                    <NodeToCardConnector className="min-h-5 w-full shrink-0 py-0.5" />

                    <article
                      className={cn(
                        "risk-timeline-step-card group flex w-full flex-col rounded-2xl border border-border bg-surface p-6 text-left shadow-[0_1px_3px_hsl(var(--navy)/0.06)] transition-all duration-300 ease-out",
                        CARD_MIN_HEIGHT,
                        "hover:-translate-y-[6px] hover:border-trust-blue/35 hover:shadow-[0_14px_32px_hsl(var(--navy)/0.1),0_0_0_1px_hsl(var(--trust-blue)/0.14)]"
                      )}
                    >
                      <p className="text-xs font-bold tabular-nums text-[#ff4d4f]/90">● {block.step}</p>
                      <h3 className="mt-2 text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-navy">
                        {block.title}
                      </h3>
                      <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground/90">
                        {block.items.map((line) => (
                          <li
                            key={line}
                            className="relative pl-3.5 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-trust-blue/55"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-auto border-t border-border/80 pt-4 text-[11px] leading-snug text-muted-foreground">
                        * {block.statRef}
                      </p>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 모바일: 세로 — 노드 → ↓ → 카드 → ↓ → … */}
          <ScrollReveal delay={120}>
            <div className="relative w-full max-w-lg md:hidden">
              <div className="absolute bottom-4 left-[30px] top-4 w-[3px] overflow-hidden rounded-full bg-trust-blue/15">
                <div className="risk-timeline-line-flow-vertical absolute inset-0 w-full" aria-hidden />
              </div>

              <div className="flex flex-col pl-2">
                {TIMELINE_STEPS.map((block, index) => (
                  <div key={block.step}>
                    <div className="relative flex gap-4">
                      <div
                        className={cn(
                          "relative z-[2] mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xs font-black text-white shadow-md",
                          index === 0 && "risk-timeline-node--1",
                          index === 1 && "risk-timeline-node--2",
                          index === 2 && "risk-timeline-node--3"
                        )}
                        style={{
                          background: "linear-gradient(145deg, #ff6b6b 0%, #ff4d4f 48%, #ff3b30 100%)",
                        }}
                      >
                        <span className="tabular-nums">{block.step}</span>
                      </div>

                      <div className="min-w-0 flex-1 pb-1">
                        <NodeToCardConnector className="mb-1 min-h-5 items-start" />

                        <article
                          className={cn(
                            "risk-timeline-step-card group flex flex-col rounded-2xl border border-border bg-surface p-5 text-left shadow-[0_1px_3px_hsl(var(--navy)/0.06)] transition-all duration-300 ease-out",
                            CARD_MIN_HEIGHT,
                            "hover:-translate-y-[6px] hover:border-trust-blue/35 hover:shadow-[0_12px_28px_hsl(var(--navy)/0.09),0_0_0_1px_hsl(var(--trust-blue)/0.14)] active:scale-[0.99]"
                          )}
                        >
                          <p className="text-xs font-bold tabular-nums text-[#ff4d4f]/90">● {block.step}</p>
                          <h3 className="mt-1.5 text-base font-bold text-foreground transition-colors group-hover:text-navy">
                            {block.title}
                          </h3>
                          <ul className="mt-3 flex-1 space-y-1.5 text-sm text-muted-foreground group-hover:text-foreground/90">
                            {block.items.map((line) => (
                              <li
                                key={line}
                                className="relative pl-3.5 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-trust-blue/55"
                              >
                                {line}
                              </li>
                            ))}
                          </ul>
                          <p className="mt-auto border-t border-border/80 pt-3 text-[10px] leading-snug text-muted-foreground">
                            * {block.statRef}
                          </p>
                        </article>
                      </div>
                    </div>

                    {index < TIMELINE_STEPS.length - 1 ? <MobileStepBridge /> : null}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default RiskStoryTimelineSection;
