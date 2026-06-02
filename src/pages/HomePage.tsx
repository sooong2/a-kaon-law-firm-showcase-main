/* ===== 노무법인 가온 - 홈페이지 ===== */
import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { Shield, Users, Scale, CheckCircle, ChevronRight, Building, Award, ArrowRight, Star } from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import banner2 from "@/assets/banner2.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import ResponseProcessSection from "@/components/ResponseProcessSection";
import LaborRiskRadarCtaSection from "@/components/LaborRiskRadarCtaSection";
import LaborRiskCaseStudiesSection from "@/components/LaborRiskCaseStudiesSection";
import RiskStoryTimelineSection from "@/components/RiskStoryTimelineSection";
import RiskDataEvidenceSection from "@/components/RiskDataEvidenceSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

/** 메인 통계 — 서비스 상세 DATA 도넛과 동일한 링·그라데이션·채움 애니메이션 */
function HomeStatDonut({
  label,
  caption,
  ringPercent,
  delayMs = 0,
  children,
}: {
  label: string;
  caption: string;
  ringPercent: number;
  delayMs?: number;
  children: ReactNode;
}) {
  const reactId = useId();
  const gradId = useMemo(() => `home-stat-ring-${reactId.replace(/:/g, "")}`, [reactId]);
  const size = 172;
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, ringPercent));
  const targetOffset = c * (1 - pct / 100);
  const [dashOffset, setDashOffset] = useState(c);

  useEffect(() => {
    setDashOffset(c);
    const t = window.setTimeout(() => setDashOffset(targetOffset), delayMs + 80);
    return () => window.clearTimeout(t);
  }, [c, targetOffset, delayMs, label, ringPercent]);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative mx-auto aspect-square w-full max-w-[180px] shrink-0">
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90" aria-hidden>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d83f5" />
              <stop offset="55%" stopColor="#5cadff" />
              <stop offset="100%" stopColor="#7ec8fa" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            className="stroke-neutral-900/12"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={dashOffset}
            style={{
              transition: "stroke-dashoffset 1.45s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 pb-3 pt-2 text-center">
          <p className="line-clamp-2 text-[10px] font-bold leading-snug text-foreground md:text-[11px]">{label}</p>
          <div className="mt-2 flex flex-wrap items-baseline justify-center gap-x-0.5">{children}</div>
          <p
            className="mt-2 line-clamp-2 text-[10px] font-semibold leading-tight md:text-[11px]"
            style={{ color: "#3d83f5" }}
          >
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}

const HomePage = () => {
  return (
    <main>
      {/* ===== Hero Section ===== */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroHome} alt="노무법인 가온 전문가팀" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="badge-blue bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 backdrop-blur-sm">
              ● LABOR LAW FIRM
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mt-6 mb-6 text-primary-foreground leading-tight animate-fade-up" style={{ animationDelay: "0.3s" }}>
            인사노무의 모든 답,
            <br />
            <span className="text-trust-blue">가온</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.5s" }}>
            기업의 든든한 파트너, 노무법인 가온이
            <br className="hidden md:block" />
            인사·노무의 모든 문제를 해결해 드립니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.7s" }}>
            <a href="#services" className="btn-primary text-lg px-10 py-5">
              서비스 알아보기
              <ChevronRight className="w-5 h-5" />
            </a>
            <Link to="/inquiry" className="btn-outline border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-navy text-lg px-10 py-5">
              무료 상담 신청
            </Link>
          </div>

          {/* Hero Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 animate-fade-up" style={{ animationDelay: "0.9s" }}>
            {[
              { value: "92", unit: "%", label: "고객 만족도" },
              { value: "24", unit: "시간", label: "신속 대응" },
              { value: "2800", unit: "건+", label: "누적 상담 건수" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-black text-primary-foreground">
                  {stat.value}<span className="text-trust-blue text-xl ml-1">{stat.unit}</span>
                </p>
                <p className="text-primary-foreground/60 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 기업 노무 리스크 안내 — 스토리형 타임라인 ===== */}
      <RiskStoryTimelineSection />

      <RiskDataEvidenceSection />

      <LaborRiskRadarCtaSection />

      <LaborRiskCaseStudiesSection />

      <ResponseProcessSection />

      {/* ===== 3-Step Solution Section ===== */}
      <section className="section-dark py-24">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="badge-blue bg-trust-blue/20 text-trust-blue">● OUR SOLUTION</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">
              3단계 케어로
              <br />
              <span className="text-trust-blue">완벽하게 해결합니다</span>
            </h2>
            <p className="text-primary-foreground/60 mb-16 max-w-xl mx-auto">
              노무법인 가온만의 체계적인 프로세스
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                icon: Shield,
                title: "예측",
                subtitle: "AI 기반 리스크 진단 시스템",
                desc: "최신 판례와 법규를 기반으로 우리 회사의 잠재적 노무 리스크를 사전에 진단합니다.",
                features: ["실시간 법규 모니터링", "맞춤형 리스크 보고서", "자동 알림 시스템"],
              },
              {
                step: "02",
                icon: Users,
                title: "예방",
                subtitle: "전담 노무사 배정 관리",
                desc: "전담 공인노무사가 월 단위로 체계적인 노무관리를 제공합니다.",
                features: ["급여/4대보험 관리", "취업규칙 정비", "정기 자문 서비스"],
              },
              {
                step: "03",
                icon: Scale,
                title: "해결",
                subtitle: "신속한 분쟁 대응 체계",
                desc: "노동사건 발생 시 24시간 내 초동대응하여 최적의 결과를 이끌어냅니다.",
                features: ["24시간 핫라인", "현장 즉시 투입", "최적 해결 전략"],
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="card-lift rounded-2xl p-8 bg-navy-light/50 backdrop-blur-sm border border-primary-foreground/10 text-left h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-bold text-trust-blue">{item.step}</span>
                    <div className="w-12 h-12 rounded-xl bg-trust-blue/20 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-trust-blue" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-trust-blue mb-4">{item.subtitle}</p>
                  <p className="text-sm text-primary-foreground/60 mb-6 leading-relaxed">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                        <CheckCircle className="w-4 h-4 text-trust-blue shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-8 text-sm font-semibold text-trust-blue flex items-center gap-1 group">
                    자세히 보기
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Stats Counter Section ===== */}
      <section className="section-white py-24" id="stats">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              노무 관리,
              <br />
              <span className="text-trust-blue">가온과 함께</span>
            </h2>
          </ScrollReveal>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            {[
              {
                value: 191,
                unit: "개사",
                label: "현재 관리 기업 수",
                ringPercent: 94,
                caption: "누적 관리 기업",
              },
              {
                value: 133,
                unit: "건+",
                label: "연간 사건 처리",
                ringPercent: 86,
                caption: "사건 대응 실적",
              },
              {
                value: 7,
                unit: "년",
                label: "평균 경력",
                ringPercent: 72,
                caption: "전문성·경험",
              },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <HomeStatDonut label={stat.label} caption={stat.caption} ringPercent={stat.ringPercent} delayMs={i * 80}>
                  <CountUp
                    end={stat.value}
                    className="text-[1.65rem] font-black tabular-nums text-foreground md:text-[1.85rem]"
                  />
                  <span className="text-sm font-bold" style={{ color: "#3d83f5" }}>
                    {stat.unit}
                  </span>
                </HomeStatDonut>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Services Grid ===== */}
      <section className="section-light py-24" id="services">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12 max-w-[700px] mx-auto">
              <span className="badge-blue">● SERVICES</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">전문 서비스 영역</h2>
              <p className="text-muted-foreground mt-3">기업 맞춤형 노무 솔루션을 제공합니다</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="relative max-w-6xl mx-auto">
              {/* Glass navigation buttons (PC only) */}
              <button
                type="button"
                className="services-swiper-prev hidden md:flex items-center justify-center absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-navy hover:bg-white/20 transition"
                aria-label="이전 서비스"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                type="button"
                className="services-swiper-next hidden md:flex items-center justify-center absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-navy hover:bg-white/20 transition"
                aria-label="다음 서비스"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <Swiper
                modules={[Autoplay, Navigation]}
                navigation={{
                  prevEl: ".services-swiper-prev",
                  nextEl: ".services-swiper-next",
                }}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                  768: { slidesPerView: 2, spaceBetween: 18 },
                  1024: { slidesPerView: 4, spaceBetween: 18 },
                }}
              >
                {[
                  {
                    title: "노무체계정비 컨설팅",
                    desc: "취업규칙, 근로계약서, 임금체계 등 노무제도 전반 정비",
                    tag: "BEST",
                    href: "/service/labor-system",
                    image:
                      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=60",
                  },
                  {
                    title: "HR 컨설팅",
                    desc: "인사제도, 평가·보상체계, 조직문화 진단 및 개선",
                    href: "/service/hr-consulting",
                    image:
                      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1400&q=60",
                  },
                  {
                    title: "중대재해처벌법 대응",
                    desc: "안전보건관리체계 구축 및 정기 점검 컨설팅",
                    href: "/service/serious-accident",
                    image:
                      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=60",
                  },
                  {
                    title: "도급/파견 컨설팅",
                    desc: "적법한 도급·파견 구조 설계 및 리스크 점검",
                    href: "/service/dispatch-consulting",
                    image:
                      "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1400&q=60",
                  },
                  {
                    title: "ESG 진단 및 구축",
                    desc: "ESG 기준에 맞는 근로환경 및 거버넌스 체계 구축",
                    href: "/service/esg",
                    image:
                      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=60",
                  },
                  {
                    title: "고용노동부 컨설팅",
                    desc: "정부지원사업 연계 및 노동부 근로감독 대응",
                    href: "/service/ministry-consulting",
                    image:
                      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=1400&q=60",
                  },
                ].map((service) => (
                  <SwiperSlide key={service.title}>
                    <Link
                      to={service.href}
                      className="block h-[420px] md:h-[440px] rounded-[18px] overflow-hidden relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-trust-blue/40 focus:ring-offset-2 focus:ring-offset-background"
                      aria-label={`${service.title} 자세히 보기`}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />

                      {service.tag ? (
                        <span className="absolute top-4 left-4 badge-blue bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 backdrop-blur-sm text-xs px-3 py-1">
                          {service.tag}
                        </span>
                      ) : null}

                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7 transition-transform duration-[400ms] group-hover:-translate-y-1">
                        <h3 className="text-lg font-bold text-primary-foreground">{service.title}</h3>
                        <p className="mt-2 text-sm text-primary-foreground/75 leading-relaxed">
                          {service.desc}
                        </p>
                        <span className="mt-5 text-sm font-semibold text-trust-blue flex items-center gap-1 group/btn">
                          자세히 보기
                          <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="badge-blue">● REVIEWS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">실제 사용자 후기</h2>
              <p className="text-muted-foreground mt-3">1,000여 기업이 가온과 함께하고 있습니다</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                stars: 5,
                text: "급여 관련 문제가 생길 때마다 빠르게 대응해주셔서 큰 도움이 됩니다. 매달 리포트도 꼼꼼하게 보내주세요.",
                name: "김○○ 대표",
                company: "IT 스타트업 / 직원 30명",
              },
              {
                stars: 5,
                text: "노무 리스크 진단 후 취업규칙을 전면 개정했는데, 직원들 만족도가 크게 올라갔습니다.",
                name: "박○○ 인사팀장",
                company: "제조업 / 직원 150명",
              },
              {
                stars: 5,
                text: "중대재해처벌법 대응이 막막했는데, 가온에서 체계적으로 안내해주셔서 안심이 됩니다.",
                name: "이○○ 대표",
                company: "건설업 / 직원 80명",
              },
              {
                stars: 5,
                text: "사건이 생겼을 때 정말 빠르게 움직여 주셨어요. 24시간 핫라인이 있어서 마음이 든든합니다.",
                name: "최○○ 대표",
                company: "유통업 / 직원 45명",
              },
              {
                stars: 5,
                text: "노무법인 여러 곳과 비교했는데, 가온이 가장 체계적이고 보고서 품질이 좋습니다.",
                name: "정○○ 경영지원팀장",
                company: "서비스업 / 직원 200명",
              },
              {
                stars: 5,
                text: "매월 정기 자문으로 인사 관리에 자신감이 생겼습니다. 항상 감사합니다.",
                name: "한○○ 대표",
                company: "마케팅 에이전시 / 직원 25명",
              },
            ].map((review, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="testimonial-card h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-trust-blue text-trust-blue" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1">"{review.text}"</p>
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.company}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="section-dark relative overflow-hidden py-20">
        <img
          src={banner2}
          alt=""
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[#121726]/80"
          aria-hidden
        />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              우리 회사 노무 리스크를
              <br />
              <span className="text-trust-blue">1분만에 확인</span>
            </h2>
            <p className="text-primary-foreground/60 mb-8 max-w-lg mx-auto">
              간단한 체크리스트로 우리 회사의 노무 리스크 수준을 진단해 보세요
            </p>
            <button className="btn-primary text-lg px-12 py-5">
              무료 진단 시작하기
              <ArrowRight className="w-5 h-5" />
            </button>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
