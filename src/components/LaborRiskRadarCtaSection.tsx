/**
 * 기업 노무 리스크 빠른 진단 유도 CTA — RISK CHECK 섹션 직후 배치
 * 왼쪽: 카피·체크리스트·진단 페이지 링크 / 오른쪽: CSS 레이더 시각화
 */
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const CHECKPOINTS = [
  "기업 노무 리스크 빠른 점검",
  "조사·분쟁 가능성 사전 확인",
  "기업 맞춤 대응 방향 안내",
] as const;

/** 레이더 주변 라벨·점 위치 (시계 방향, 깔끔한 B2B 톤) */
const RADAR_LABELS = [
  { id: "labor-audit", text: "근로감독", className: "left-1/2 top-0 -translate-x-1/2 -translate-y-1", blink: true, blinkDelay: "0s", reverse: false },
  { id: "unfair-dismissal", text: "부당해고", className: "right-0 top-[18%] translate-x-0.5 -translate-y-1/2", blink: true, blinkDelay: "0.7s", reverse: true },
  { id: "wage-arrears", text: "임금체불", className: "left-1/2 bottom-0 -translate-x-1/2 translate-y-1", blink: false, blinkDelay: "0s", reverse: false },
  { id: "hr-mgmt", text: "노무관리", className: "left-0 top-[18%] -translate-x-0.5 -translate-y-1/2", blink: true, blinkDelay: "1.4s", reverse: false },
] as const;

const LaborRiskRadarCtaSection = () => {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-24 border-y border-border/60 bg-gradient-to-br from-trust-blue-light/35 via-background to-surface"
      aria-labelledby="labor-risk-radar-cta-heading"
    >
      {/* 은은한 그리드 텍스처 — 성능 부담 적은 CSS 배경 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--trust-blue) / 0.06) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--trust-blue) / 0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* 왼쪽: 텍스트 + CTA */}
          <ScrollReveal>
            <div className="max-w-xl lg:pr-4">
              <span className="badge-blue mb-5 inline-block">● 기업 노무 리스크 진단</span>
              <h2
                id="labor-risk-radar-cta-heading"
                className="text-3xl font-bold leading-tight text-foreground md:text-4xl"
              >
                노무 리스크는 줄이고,
                <br />
                <span className="text-trust-blue">기업의 안정은 지켜드립니다</span>
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  복잡한 노동법 이슈,
                  <br />
                  지금 우리 기업에 어떤 리스크가 있는지
                  <br />
                  간단한 진단을 통해 빠르게 확인해보세요.
                </p>
                <p className="text-sm md:text-base">전문 대응팀이 현재 상황을 분석해 기업에 맞는 대응 방향을 안내합니다.</p>
              </div>
              <ul className="mt-8 space-y-3">
                {CHECKPOINTS.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-foreground md:text-[15px]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-trust-blue" strokeWidth={2} aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link to="/diagnosis" className="btn-primary text-base px-8 py-4 md:px-10 md:py-5">
                  무료 노무 리스크 진단하기
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* 오른쪽: 레이더 UI (CSS 애니메이션) */}
          <ScrollReveal delay={180}>
            <div className="relative mx-auto flex w-full max-w-[340px] justify-center lg:mx-0 lg:ml-auto lg:max-w-[380px]">
              <div className="relative aspect-square w-full max-w-[320px] md:max-w-[360px]">
                {/* 바깥 파동 링 */}
                <div
                  className="labor-risk-radar-ring-pulse pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-trust-blue/25"
                  aria-hidden
                />
                {/* 고정 동심원 2~3개 */}
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-trust-blue/20"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-trust-blue/15"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-trust-blue/10"
                  aria-hidden
                />

                {/* 회전 스캔 라인 — 중앙을 축으로 천천히 회전 */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
                  <div className="labor-risk-radar-sweep relative h-0 w-0">
                    <div className="absolute left-0 top-0 h-[2px] w-[min(42vw,150px)] max-w-[150px] -translate-y-1/2 rounded-full bg-gradient-to-r from-trust-blue/85 via-trust-blue/45 to-transparent md:w-[158px] md:max-w-none" />
                  </div>
                </div>

                {/* 중앙 허브 */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-trust-blue shadow-[0_0_20px_hsl(var(--trust-blue)/0.45)] ring-4 ring-trust-blue/15" aria-hidden />

                {/* 주변 라벨 + 포인트 */}
                {RADAR_LABELS.map((item) => (
                  <div
                    key={item.id}
                    className={`absolute z-[5] flex items-center gap-1.5 ${item.reverse ? "flex-row-reverse" : ""} ${item.className}`}
                  >
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full bg-trust-blue shadow-sm ring-2 ring-trust-blue/20 ${
                        item.blink ? "labor-risk-radar-blink" : ""
                      }`}
                      style={item.blink ? { animationDelay: item.blinkDelay } : undefined}
                      aria-hidden
                    />
                    <span className="whitespace-nowrap text-[11px] font-semibold tracking-tight text-navy/90 md:text-xs">
                      {item.text}
                    </span>
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

export default LaborRiskRadarCtaSection;
