/**
 * 노무 리스크 데이터 근거 — 세로 막대 그래프(카드 없이 그래프 중심)
 * 스크롤 진입 시 막대가 아래→위로 채워지는 애니메이션
 */
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

type BarDatum = {
  id: string;
  value: string;
  valueLabel: string;
  lines: [string, string];
  /** 막대 픽셀 높이 — 비교: 중간 / 낮음 / 가장 높음 */
  heightPx: number;
  animDelayMs: number;
};

const BAR_DATA: BarDatum[] = [
  {
    id: "pre-check",
    value: "73%",
    valueLabel: "73퍼센트",
    lines: ["사전 점검 없는 기업", "노무 리스크 비율"],
    heightPx: 132,
    animDelayMs: 0,
  },
  {
    id: "fine",
    value: "90만원+",
    valueLabel: "90만원 이상",
    lines: ["근로기준법 위반 시", "평균 과태료 금액"],
    heightPx: 76,
    animDelayMs: 140,
  },
  {
    id: "disputes",
    value: "2800건+",
    valueLabel: "2800건 이상",
    lines: ["연간 노동 관련", "분쟁 발생 건수"],
    heightPx: 196,
    animDelayMs: 280,
  },
];

const CHART_AREA_PX = 220;

const RiskDataEvidenceSection = () => {
  const chartBlockRef = useRef<HTMLDivElement>(null);
  const [barsActive, setBarsActive] = useState(false);

  useEffect(() => {
    const root = chartBlockRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarsActive(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-background via-trust-blue-light/25 to-background py-20 md:py-24"
      aria-labelledby="risk-data-evidence-heading"
    >
      {/* 아주 은은한 수직 그리드 — 카드 없이 깊이만 보조 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, hsl(var(--trust-blue) / 0.04) 1px, transparent 1px)",
          backgroundSize: "min(12vw, 140px) 100%",
          backgroundPosition: "center top",
        }}
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <header className="mb-12 max-w-3xl text-center md:mb-14 md:text-left">
              <span className="mb-4 inline-block text-xs font-bold tracking-[0.25em] text-trust-blue">DATA</span>
              <h2 id="risk-data-evidence-heading" className="text-3xl font-bold leading-tight text-foreground md:text-4xl">
                노무 리스크는 생각보다
                <br className="hidden sm:block" /> 많이 발생하고 있습니다
              </h2>
              <div className="mx-auto mt-6 max-w-2xl space-y-3 text-base leading-relaxed text-muted-foreground md:mx-0">
                <p>
                  노동 관련 분쟁과 과태료는
                  <br className="hidden md:block" /> 대부분 사전 점검이 없는 기업에서 발생합니다.
                </p>
                <p className="text-sm md:text-base">
                  실제 데이터를 통해 현재 기업 노무 리스크 수준을 확인해보세요.
                </p>
              </div>
            </header>
          </ScrollReveal>

          {/* 그래프: 모바일 세로 스택, 데스크톱 3열 */}
          <div ref={chartBlockRef}>
            <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between md:gap-6 lg:gap-10">
              {BAR_DATA.map((bar) => (
                <div
                  key={bar.id}
                  className="flex flex-1 flex-col items-center md:min-w-0"
                >
                  {/* 막대 영역 + 퍼센트 베이스라인 느낌 */}
                  <div
                    className="relative flex w-full max-w-[200px] flex-col items-center md:max-w-none"
                    style={{ height: CHART_AREA_PX }}
                  >
                    {/* 상단 약한 가이드라인 */}
                    <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-trust-blue/10" aria-hidden />

                    <div className="flex h-full w-full flex-col items-center justify-end pb-0">
                      <div
                        className={cn(
                          "relative w-14 overflow-hidden rounded-t-lg shadow-[0_8px_24px_hsl(var(--trust-blue)/0.18)] sm:w-[4.25rem]",
                          "origin-bottom bg-gradient-to-t from-navy/85 via-trust-blue to-trust-blue-light",
                          "transition-transform ease-[cubic-bezier(0.16,1,0.3,1)]",
                          barsActive ? "scale-y-100" : "scale-y-0"
                        )}
                        style={{
                          height: bar.heightPx,
                          transitionDuration: "950ms",
                          transitionDelay: `${bar.animDelayMs}ms`,
                        }}
                        role="img"
                        aria-label={`${bar.valueLabel} 막대 그래프`}
                      >
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/15" aria-hidden />
                      </div>
                    </div>

                    {/* 베이스 라인 */}
                    <div className="mt-0 h-px w-full max-w-[11rem] bg-gradient-to-r from-transparent via-trust-blue/35 to-transparent sm:max-w-[13rem]" />
                  </div>

                  {/* 수치·설명 (카드 없이 타이포만) */}
                  <div className="mt-5 w-full max-w-xs text-center md:max-w-none">
                    <p className="text-2xl font-black tabular-nums text-navy sm:text-3xl">{bar.value}</p>
                    <p className="mt-3 text-sm leading-snug text-muted-foreground">
                      {bar.lines[0]}
                      <br />
                      {bar.lines[1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskDataEvidenceSection;
