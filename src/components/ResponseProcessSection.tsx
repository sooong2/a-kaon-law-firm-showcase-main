/**
 * 기업 노무 리스크 대응 프로세스를 단계별로 안내하는 섹션입니다.
 * 홈페이지에서 RISK CHECK 섹션 다음에 배치되며, 기존 사이트의 trust-blue·카드 UI 톤을 따릅니다.
 */
import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Building2, ClipboardCheck, FilePenLine, Gavel, HandCoins } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

/** 각 단계에 표시할 데이터(STEP 라벨, 제목, 불릿, 아이콘) */
type ProcessStep = {
  stepLabel: string;
  title: string;
  bullets: string[];
  Icon: LucideIcon;
};

/** 단계 간 등장 간격(ms) — 0.15~0.2초 범위 */
const STEP_REVEAL_STAGGER_MS = 175;

/** 카드 등장 시작 지연 — 기존 ScrollReveal(delay: 120)과 동일 */
const CARD_REVEAL_BASE_DELAY_MS = 120;

/**
 * index.css `.reveal` / `.reveal.visible` 과 동일한 fade + slide-up (30px, 0.8s, cubic-bezier)
 * 카드 프레임 한 번 등장 + 각 STEP 행은 같은 이징으로 순차 fade·slide-up
 */
const revealCardClass =
  "transition-[opacity,transform] duration-[800ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]";
const revealStepRowClass =
  "transition-[opacity,transform] duration-[800ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]";

const PROCESS_STEPS: ProcessStep[] = [
  {
    stepLabel: "STEP 1",
    title: "초기 진단 및 대응 방향 설정",
    bullets: [
      "기업 상황과 통보 내용을 종합적으로 검토합니다",
      "주요 쟁점과 예상 리스크를 체계적으로 정리합니다",
      "사업장 특성을 고려한 대응 방향을 설정합니다",
    ],
    Icon: Building2,
  },
  {
    stepLabel: "STEP 2",
    title: "자료 준비 및 1차 대응",
    bullets: [
      "요청된 자료를 정리하여 체계적으로 제출합니다",
      "조사 단계에 맞는 대응 의견을 준비합니다",
      "초기 단계에서 불필요한 리스크 발생을 최소화합니다",
    ],
    Icon: ClipboardCheck,
  },
  {
    stepLabel: "STEP 3",
    title: "소명 및 사실관계 정리",
    bullets: [
      "사실관계를 입증할 수 있는 자료를 확보합니다",
      "전문 대응팀의 의견서를 통해 입장을 정리합니다",
      "조사 과정에서 발생하는 쟁점에 대응합니다",
    ],
    Icon: FilePenLine,
  },
  {
    stepLabel: "STEP 4",
    title: "결과 협의 및 확정",
    bullets: [
      "조사기관과 협의를 통해 결과를 정리합니다",
      "과도한 산정이나 오류 발생 시 대응합니다",
      "기업 부담을 최소화하는 방향으로 결과를 확정합니다",
    ],
    Icon: Gavel,
  },
  {
    stepLabel: "STEP 5",
    title: "사후 관리 및 예방 컨설팅",
    bullets: [
      "동일 문제의 재발 방지를 위한 개선 방안을 제시합니다",
      "기업 내부 관리 체계를 점검합니다",
      "향후 노무 리스크 예방 전략을 안내합니다",
    ],
    Icon: HandCoins,
  },
];

const ResponseProcessSection = () => {
  const processCardRef = useRef<HTMLDivElement>(null);
  const [processCardInView, setProcessCardInView] = useState(false);

  useEffect(() => {
    const el = processCardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProcessCardInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-light py-16 md:py-24" aria-labelledby="response-process-heading">
      <div className="container mx-auto px-4">
        {/* 섹션 상단: 배지 + 제목 + 부제목 (다른 섹션과 동일한 badge-blue 패턴) */}
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-12">
            <span className="badge-blue">● RESPONSE PROCESS</span>
            <h2 id="response-process-heading" className="text-3xl md:text-4xl font-bold text-foreground mt-4">
              대응 프로세스
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">기업 노무 리스크 대응 단계</p>
          </div>
        </ScrollReveal>

        {/* 카드: 스크롤 진입 시 카드 프레임 등장(기존 ScrollReveal 타이밍) + STEP1→5 순차 fade·slide-up */}
        <div
          ref={processCardRef}
          className={cn(
            "max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border bg-surface shadow-[0_1px_3px_hsl(var(--navy)/0.08)]",
            revealCardClass,
            processCardInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
          )}
          style={{
            transitionDelay: processCardInView ? `${CARD_REVEAL_BASE_DELAY_MS}ms` : "0ms",
          }}
        >
          {/* 프로세스 카드 헤더 — 사이트 primary 블루(trust-blue) 사용 */}
          <div className="bg-trust-blue text-primary-foreground text-center py-3.5 px-4 text-sm md:text-base font-semibold">
            대응 단계
          </div>

          <ul className="divide-y divide-dashed divide-border">
            {PROCESS_STEPS.map(({ stepLabel, title, bullets, Icon }, index) => (
              <li key={stepLabel} className="px-4 py-6 md:px-8 md:py-8">
                <div
                  className={cn(
                    "flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center",
                    revealStepRowClass,
                    processCardInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  )}
                  style={{
                    transitionDelay: processCardInView
                      ? `${CARD_REVEAL_BASE_DELAY_MS + index * STEP_REVEAL_STAGGER_MS}ms`
                      : "0ms",
                  }}
                >
                  {/* 왼쪽: 원형 아이콘 영역 (카드·Safety 섹션과 맞는 trust-blue-light 배경) */}
                  <div className="flex justify-center sm:justify-start shrink-0">
                    <div
                      className="w-16 h-16 md:w-[4.5rem] md:h-[4.5rem] rounded-full border border-border bg-surface flex items-center justify-center shadow-sm"
                      aria-hidden
                    >
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-trust-blue-light flex items-center justify-center">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-trust-blue" strokeWidth={1.75} />
                      </div>
                    </div>
                  </div>

                  {/* 오른쪽: STEP 라벨 + 제목 + 불릿 리스트 */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <p className="text-xs font-bold text-trust-blue tracking-wide mb-1">{stepLabel}</p>
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">{title}</h3>
                    <ul className="space-y-2 text-left inline-block sm:block max-w-full">
                      {bullets.map((line) => (
                        <li
                          key={line}
                          className="text-sm md:text-[15px] text-muted-foreground leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-full before:bg-trust-blue/70"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ResponseProcessSection;
