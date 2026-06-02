/* ===== 노무법인 가온 - 기업 지원 ===== */
import { CheckCircle, ArrowRight, HelpCircle, Building2, Scale, FileSearch } from "lucide-react";
import { Link } from "react-router-dom";
import heroCorporate from "@/assets/hero-corporate.jpg";
import iconShield from "@/assets/icon-shield.png";
import imgStarter from "@/assets/소규모사업장.png";
import imgProfessional from "@/assets/성장기업.png";
import imgEnterprise from "@/assets/중견대기업.png";
import ScrollReveal from "@/components/ScrollReveal";
import { PageCoverHero, coverScrollSectionClass } from "@/components/PageCoverHero";

/** 플랜 카드 상단 이미지 */
function PlanCardDecor({
  image,
  alt,
  accent,
}: {
  image: string;
  alt: string;
  accent: "default" | "featured" | "dark";
}) {
  const overlay =
    accent === "featured"
      ? "from-[#3d83f5]/25 via-transparent to-transparent"
      : accent === "dark"
        ? "from-navy/30 via-transparent to-transparent"
        : "from-slate-900/15 via-transparent to-transparent";

  return (
    <div className="relative h-40 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-44">
      <img
        src={image}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${overlay}`} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card/80 to-transparent" />
    </div>
  );
}

const CorporateSupportPage = () => {
  return (
    <main className="relative">
      <PageCoverHero
        badge="● Workplace Management Center"
        title={
          <>
            노무는 가온에게,
            <br />
            대표님은 <span className="text-trust-blue">안심하고 사업하세요</span>
          </>
        }
        description="매달 체계적인 노무관리로 리스크를 원천 차단합니다"
        heroImage={heroCorporate}
        heroAlt="기업 지원"
        actions={
          <button type="button" className="btn-primary px-10 py-4 text-base">
            상담 신청하기
            <ArrowRight className="h-5 w-5" />
          </button>
        }
      />

      <div className="relative z-10 bg-background">
      {/* ===== Pain Points (둥근 카드 + 상단 배지) ===== */}
      <section className={`py-24 bg-gradient-to-br from-slate-50 via-sky-50/65 to-blue-50/80 ${coverScrollSectionClass}`}>
        <div className="container mx-auto max-w-5xl px-4">
          <ScrollReveal>
            <div className="mb-12 text-center sm:mb-14">
              <h2 className="text-2xl font-bold leading-snug text-navy sm:text-3xl md:text-4xl">
                이런 고민 있으신가요
              </h2>
              <p className="mx-auto mt-3 max-w-md px-1 text-sm text-muted-foreground sm:text-base">
                많은 대표님들이 겪고 계신 고민입니다
              </p>
            </div>
          </ScrollReveal>
          <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 pt-2 sm:grid-cols-2 sm:gap-6 md:max-w-5xl md:gap-8 lg:gap-10">
            {(
              [
                {
                  id: "pay-overtime",
                  Icon: HelpCircle,
                  badge: "Pain Point" as const,
                  body: (
                    <>
                      급여, <strong className="font-bold text-navy">시간외 수당</strong> 문제가 생길 때{" "}
                      <strong className="font-bold text-navy">어떻게 대처</strong>해야 할지 모르겠다
                    </>
                  ),
                },
                {
                  id: "labor-inspection",
                  Icon: Building2,
                  badge: "Needs" as const,
                  body: (
                    <>
                      <strong className="font-bold text-navy">노동부 점검</strong>이 나오면{" "}
                      <strong className="font-bold text-navy">문제가 없는지</strong> 불안하다
                    </>
                  ),
                },
                {
                  id: "harassment",
                  Icon: Scale,
                  badge: "Pain Point" as const,
                  body: (
                    <>
                      직장 내 괴롭힘·성희롱 사건이 발생했는데{" "}
                      <strong className="font-bold text-navy">어떻게 처리</strong>해야 하는지 모른다
                    </>
                  ),
                },
                {
                  id: "rules-contract",
                  Icon: FileSearch,
                  badge: "Needs" as const,
                  body: (
                    <>
                      <strong className="font-bold text-navy">취업규칙</strong>이나{" "}
                      <strong className="font-bold text-navy">근로계약서</strong>가 제대로 되어 있는지 확인이 필요하다
                    </>
                  ),
                },
              ] as const
            ).map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 70}>
                <div className="relative pt-6 sm:pt-7">
                  <div
                    className="relative rounded-[1.75rem] border border-sky-100/70 bg-gradient-to-br from-white/85 via-sky-50/55 to-blue-50/70 px-5 pb-8 pt-9 shadow-[0_12px_40px_-16px_rgba(61,131,245,0.18)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#3d83f5]/35 hover:shadow-[0_20px_44px_-12px_rgba(61,131,245,0.22)] sm:rounded-[2rem] sm:px-7 sm:pb-10 sm:pt-10 md:px-8 md:pt-11"
                  >
                    <span className="absolute left-1/2 top-0 z-10 max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-100/80 bg-white/95 px-3 py-1.5 text-center text-[0.65rem] font-semibold leading-tight tracking-wide text-slate-700 shadow-sm sm:max-w-none sm:px-5 sm:text-[0.7rem]">
                      {item.badge}
                    </span>
                    <div className="flex items-start gap-3 sm:gap-4 md:gap-5">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sky-200/60 bg-gradient-to-br from-sky-100/90 to-[#3d83f5]/15 text-[#3d83f5] shadow-inner sm:h-12 sm:w-12 md:h-14 md:w-14"
                        aria-hidden
                      >
                        <item.Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="break-keep text-sm leading-relaxed text-slate-800 sm:text-[0.9375rem] md:leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Monthly Management Timeline ===== */}
      <section className="section-light py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">매월 이렇게 관리해드립니다</h2>
              <p className="text-muted-foreground mt-3">매달 체계적인 프로세스로 완벽하게 관리합니다</p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { day: "매월 1일", title: "급여 체크 사항 안내", desc: "급여 산정 시 주의사항과 변경사항을 사전 안내합니다" },
              { day: "매월 5일", title: "급여명세서 발송", desc: "정확한 급여명세서를 작성하여 전 직원에게 발송합니다" },
              { day: "매월 10일", title: "4대보험 신고", desc: "입퇴사 및 변경사항에 따른 4대보험을 신속 처리합니다" },
              { day: "매월 15일", title: "월간 법률동향 발송", desc: "최신 노동법 개정사항 및 판례를 정리하여 발송합니다" },
              { day: "매월 20일", title: "사회보험료 계산 제공", desc: "정확한 사회보험료를 계산하여 안내합니다" },
              { day: "매월 말일", title: "월간 리포트 발송", desc: "한 달 동안의 노무관리 현황을 종합 보고합니다" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="flex gap-6 items-start group">
                  <div className="flex flex-col items-center">
                    <div className="timeline-dot">{i + 1}</div>
                    {i < 5 && <div className="w-0.5 h-12 bg-border mt-2" />}
                  </div>
                  <div className="card-lift rounded-xl p-5 bg-surface border border-border flex-1 group-hover:border-trust-blue/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge-blue text-xs">{item.day}</span>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 기업 규모별 맞춤 노무 자문 프로그램 ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold leading-tight text-navy md:text-4xl">
                기업 규모별 맞춤
                <br className="sm:hidden" />
                <span className="sm:ml-2"> 노무 자문 프로그램</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground md:text-[0.9375rem]">
                기업의 성장 단계와 인사 운영 환경에 맞춰
                <br className="hidden sm:block" />
                필요한 노무 자문 범위를 제안합니다.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
            {(
              [
                {
                  key: "starter",
                  name: "Starter",
                  subtitle: "소규모 사업장",
                  image: imgStarter,
                  inquiryCategory: "starter",
                  tagline: "5인~30인 규모 사업장을 위한 기본 노무 자문",
                  features: [
                    "근로계약서 및 인사 서식 제공",
                    "취업규칙 검토",
                    "노무 관련 질의 응답",
                    "노동법 개정 안내",
                    "기본 인사노무 컨설팅",
                  ],
                  cta: "상담 신청하기",
                  ctaVariant: "outline" as const,
                  decor: "default" as const,
                  featured: false,
                },
                {
                  key: "professional",
                  name: "Professional",
                  subtitle: "성장 기업",
                  image: imgProfessional,
                  inquiryCategory: "professional",
                  tagline: "30인~100인 규모 기업을 위한 정기 노무 자문 프로그램",
                  features: [
                    "월 정기 노무 자문",
                    "취업규칙 및 인사규정 정비",
                    "급여 체계 검토",
                    "노동청 대응 자문",
                    "인사노무 운영 리포트",
                  ],
                  cta: "상담 신청하기",
                  ctaVariant: "primary" as const,
                  decor: "featured" as const,
                  featured: true,
                },
                {
                  key: "enterprise",
                  name: "Enterprise",
                  subtitle: "중견·대기업",
                  image: imgEnterprise,
                  inquiryCategory: "enterprise",
                  tagline: "100인 이상 기업을 위한 전담 노무 자문 프로그램",
                  features: [
                    "전담 노무사 배정",
                    "노무 감사 및 컴플라이언스 대응",
                    "HR 전략 자문",
                    "노동 사건 대응",
                    "인사노무 체계 구축 지원",
                  ],
                  cta: "기업 상담 신청",
                  ctaVariant: "outline" as const,
                  decor: "dark" as const,
                  featured: false,
                },
              ] as const
            ).map((plan, i) => (
              <ScrollReveal key={plan.key} delay={i * 100}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-[0_12px_40px_-18px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_-12px_rgba(61,131,245,0.22)] ${
                    plan.featured
                      ? "border-[#3d83f5] border-2 ring-1 ring-[#3d83f5]/25 bg-gradient-to-b from-sky-50/40 via-card to-card lg:z-10 lg:scale-[1.02]"
                      : "border-border/90"
                  }`}
                >
                  <PlanCardDecor image={plan.image} alt={plan.subtitle} accent={plan.decor} />

                  <div className="flex flex-1 flex-col px-6 pb-7 pt-5">
                    <div className="mb-3 flex min-h-[1.75rem] items-center justify-end">
                      {plan.featured ? (
                        <span className="inline-flex items-center rounded-full bg-[#3d83f5] px-3 py-1 text-xs font-bold text-primary-foreground shadow-md">
                          추천 플랜
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3d83f5]/90">{plan.name}</p>

                    <p className="mt-4 text-2xl font-semibold text-navy md:text-[1.75rem]">{plan.subtitle}</p>

                    <p className="mt-4 border-b border-border/80 pb-4 text-sm leading-relaxed text-muted-foreground">{plan.tagline}</p>

                    <p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-500">주요 서비스</p>
                    <ul className="mt-3 flex flex-1 flex-col gap-2.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#3d83f5]" strokeWidth={2} />
                          <span className="leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`/inquiry?category=${plan.inquiryCategory}`}
                      className={
                        plan.ctaVariant === "primary"
                          ? "btn-primary mt-8 w-full justify-center"
                          : "btn-outline mt-8 w-full justify-center border-[#3d83f5] text-[#3d83f5] hover:bg-[#3d83f5] hover:text-primary-foreground"
                      }
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why Gaon (SWOT형 2×2 + 중앙 아이콘) ===== */}
      <section
        className="py-14 sm:py-20 md:py-24"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 50% 45%, hsl(var(--background)) 0%, hsl(210 20% 96%) 45%, hsl(215 16% 92%) 100%)",
        }}
      >
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="mb-10 text-center sm:mb-12 md:mb-14">
              <h2 className="text-2xl font-bold leading-snug text-foreground sm:text-3xl md:text-4xl">
                왜 가온인가요
              </h2>
              <p className="mx-auto mt-3 max-w-lg px-1 text-sm text-muted-foreground sm:text-base">
                대표님이 사업에만 집중할 수 있도록 가온이 지킵니다
              </p>
            </div>
          </ScrollReveal>

          {/** 데스크톱·태블릿: 격자선 + 중앙 방패 아이콘 */}
          <ScrollReveal>
            <div className="relative mx-auto hidden md:block">
              <div
                className="relative grid min-h-[380px] grid-cols-2 grid-rows-2 rounded-xl border border-border/60 bg-surface/40 shadow-sm backdrop-blur-[1px] lg:min-h-[440px]"
                style={{ contain: "layout" }}
              >
                <div className="absolute left-1/2 top-0 z-[1] h-full w-px -translate-x-1/2 bg-border/70" aria-hidden />
                <div className="absolute left-0 top-1/2 z-[1] h-px w-full -translate-y-1/2 bg-border/70" aria-hidden />

                {/** Q1: 좌상 — 큰 숫자 왼쪽, 본문은 중앙 쪽 정렬 */}
                <div className="relative z-0 flex items-center gap-3 border-border/50 p-5 pr-8 lg:gap-4 lg:p-8 lg:pr-12">
                  <span
                    className="shrink-0 font-black leading-none text-navy/[0.08] select-none"
                    style={{ fontSize: "clamp(3.5rem, 12vw, 6.5rem)" }}
                    aria-hidden
                  >
                    01
                  </span>
                  <div className="min-w-0 flex-1 text-right">
                    <h3 className="text-base font-bold text-[#3d6fa8] lg:text-lg">AI 기반 리스크 관리</h3>
                    <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm lg:text-[0.9375rem]">
                      최신 AI 기술로 리스크를 사전 탐지합니다
                    </p>
                  </div>
                </div>

                {/** Q2: 우상 */}
                <div className="relative z-0 flex flex-row-reverse items-center gap-3 border-border/50 p-5 pl-8 lg:gap-4 lg:p-8 lg:pl-12">
                  <span
                    className="shrink-0 font-black leading-none text-navy/[0.08] select-none"
                    style={{ fontSize: "clamp(3.5rem, 12vw, 6.5rem)" }}
                    aria-hidden
                  >
                    02
                  </span>
                  <div className="min-w-0 flex-1 text-left">
                    <h3 className="text-base font-bold text-[#3d6fa8] lg:text-lg">종합 전문가 네트워크</h3>
                    <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm lg:text-[0.9375rem]">
                      노무사·변호사·세무사 통합 자문 체계 운영
                    </p>
                  </div>
                </div>

                {/** Q3: 좌하 */}
                <div className="relative z-0 flex items-center gap-3 border-border/50 p-5 pr-8 lg:gap-4 lg:p-8 lg:pr-12">
                  <span
                    className="shrink-0 font-black leading-none text-navy/[0.08] select-none"
                    style={{ fontSize: "clamp(3.5rem, 12vw, 6.5rem)" }}
                    aria-hidden
                  >
                    03
                  </span>
                  <div className="min-w-0 flex-1 text-right">
                    <h3 className="text-base font-bold text-[#3d6fa8] lg:text-lg">전담 노무사 배정</h3>
                    <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm lg:text-[0.9375rem]">
                      한 분의 전담 노무사가 지속적으로 케어합니다
                    </p>
                  </div>
                </div>

                {/** Q4: 우하 */}
                <div className="relative z-0 flex flex-row-reverse items-center gap-3 border-border/50 p-5 pl-8 lg:gap-4 lg:p-8 lg:pl-12">
                  <span
                    className="shrink-0 font-black leading-none text-navy/[0.08] select-none"
                    style={{ fontSize: "clamp(3.5rem, 12vw, 6.5rem)" }}
                    aria-hidden
                  >
                    04
                  </span>
                  <div className="min-w-0 flex-1 text-left">
                    <h3 className="text-base font-bold text-[#3d6fa8] lg:text-lg">체계적인 관리 시스템</h3>
                    <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground sm:text-sm lg:text-[0.9375rem]">
                      클라우드 기반 인사노무 자료 관리 시스템 제공
                    </p>
                  </div>
                </div>

                {/** 중앙 방패 아이콘 */}
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 px-2"
                  aria-hidden
                >
                  <img
                    src={iconShield}
                    alt=""
                    className="h-16 w-16 object-contain drop-shadow-sm lg:h-24 lg:w-24"
                    width={96}
                    height={96}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/** 모바일: ①② → 아이콘 → ③④ (한 열, 읽기 쉬운 카드) */}
          <div className="mx-auto max-w-lg space-y-4 md:hidden">
            <ScrollReveal>
              <article className="relative overflow-hidden rounded-2xl border border-border/70 bg-surface/90 p-5 shadow-sm">
                <span className="absolute -right-1 -top-2 font-black text-navy/[0.06] text-[4.5rem] leading-none select-none">
                  01
                </span>
                <h3 className="relative text-base font-bold text-[#3d6fa8]">AI 기반 리스크 관리</h3>
                <p className="relative mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  최신 AI 기술로 리스크를 사전 탐지합니다
                </p>
              </article>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <article className="relative overflow-hidden rounded-2xl border border-border/70 bg-surface/90 p-5 shadow-sm">
                <span className="absolute -right-1 -top-2 font-black text-navy/[0.06] text-[4.5rem] leading-none select-none">
                  02
                </span>
                <h3 className="relative text-base font-bold text-[#3d6fa8]">종합 전문가 네트워크</h3>
                <p className="relative mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  노무사·변호사·세무사 통합 자문 체계 운영
                </p>
              </article>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="flex justify-center py-2">
                <img
                  src={iconShield}
                  alt=""
                  className="h-20 w-20 object-contain drop-shadow-md"
                  width={80}
                  height={80}
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <article className="relative overflow-hidden rounded-2xl border border-border/70 bg-surface/90 p-5 shadow-sm">
                <span className="absolute -right-1 -top-2 font-black text-navy/[0.06] text-[4.5rem] leading-none select-none">
                  03
                </span>
                <h3 className="relative text-base font-bold text-[#3d6fa8]">전담 노무사 배정</h3>
                <p className="relative mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  한 분의 전담 노무사가 지속적으로 케어합니다
                </p>
              </article>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <article className="relative overflow-hidden rounded-2xl border border-border/70 bg-surface/90 p-5 shadow-sm">
                <span className="absolute -right-1 -top-2 font-black text-navy/[0.06] text-[4.5rem] leading-none select-none">
                  04
                </span>
                <h3 className="relative text-base font-bold text-[#3d6fa8]">체계적인 관리 시스템</h3>
                <p className="relative mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  클라우드 기반 인사노무 자료 관리 시스템 제공
                </p>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
};

export default CorporateSupportPage;
