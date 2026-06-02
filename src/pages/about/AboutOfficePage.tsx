/* ===== 노무법인 가온 - 사무소 소개 ===== */
import { Shield, Target, Users, Scale, Building2, FileText, TrendingUp, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import heroBanner from "@/assets/banner1.jpg";
import officePhoto from "@/assets/3371.jpg";
import imgRisk from "@/assets/8336.jpg";
import imgPractical from "@/assets/악수.jpg";
import imgDedicated from "@/assets/1384.jpg";
import imgFair from "@/assets/1925.jpg";
import { AboutCoverHero, AboutSectionHeader, AboutCtaBanner, coverScrollSectionClass } from "./aboutShared";

const coreValues = [
  {
    icon: Shield,
    title: "선제적 리스크 관리",
    desc: "분쟁이 발생하기 전, 규정·급여·근로시간 등 운영 기준을 점검하여 리스크를 줄입니다.",
    image: imgRisk,
  },
  {
    icon: Target,
    title: "실무 중심 자문",
    desc: "법령 해석을 넘어 현장에서 바로 적용할 수 있는 실행 가능한 방안을 제시합니다.",
    image: imgPractical,
  },
  {
    icon: Users,
    title: "전담 노무사 체계",
    desc: "고객사별 전담 공인노무사가 지속적으로 소통하며 일관된 자문을 제공합니다.",
    image: imgDedicated,
  },
  {
    icon: Scale,
    title: "공정한 분쟁 대응",
    desc: "기업과 근로자 모두의 권리를 존중하며, 근거 있는 대응 전략을 수립합니다.",
    image: imgFair,
  },
];

const stats = [
  { value: "12+", label: "운영 연수", caption: "2014년 설립" },
  { value: "850+", label: "자문 기업", caption: "누적 고객사" },
  { value: "4,200+", label: "자문 건수", caption: "연간 상담·자문" },
  { value: "98%", label: "고객 만족", caption: "재의뢰·추천 비율" },
];

const services = [
  {
    icon: Building2,
    title: "기업 노무 자문",
    desc: "취업규칙, 인사·징계, 근로계약 등 전반 자문",
    linkTo: "/enterprise/labor-consulting",
  },
  {
    icon: FileText,
    title: "급여 · 4대보험",
    desc: "급여 산정, 명세서, 보험 신고 아웃소싱",
    linkTo: "/enterprise/payroll-outsourcing",
  },
  {
    icon: Scale,
    title: "노동청 · 사건 대응",
    desc: "조사·감독 대응, 임금·해고 분쟁 지원",
    linkTo: "/enterprise/labor-board",
  },
  {
    icon: TrendingUp,
    title: "성장기업 맞춤",
    desc: "규모별·업종별 노무 체계 구축 컨설팅",
    linkTo: "/consulting",
  },
];

const history = [
  { year: "2014", event: "노무법인 가온 설립, 기업 노무 자문 서비스 개시" },
  { year: "2017", event: "급여·4대보험 아웃소싱 및 중견기업 자문 확대" },
  { year: "2020", event: "노동 사건 대응 전담팀 신설, 전담 노무사 체계 도입" },
  { year: "2023", event: "셀프 진단·실무 도구 등 디지털 노무 서비스 런칭" },
  { year: "2026", event: "기업 규모별 맞춤 노무 프로그램 및 정보센터 운영" },
];

function HistoryTimelineItem({ item, index }: { item: (typeof history)[number]; index: number }) {
  const isLeft = index % 2 === 0;

  const card = (
    <article className="rounded-2xl border border-border/80 bg-surface/95 p-5 shadow-[0_12px_36px_-20px_rgba(15,23,42,0.18)] backdrop-blur-sm md:p-6">
      <p className="text-sm font-bold text-trust-blue">{item.year}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.event}</p>
    </article>
  );

  return (
    <ScrollReveal delay={index * 120} className={isLeft ? "reveal-from-left" : "reveal-from-right"}>
      {/* 데스크톱: 중앙 선 기준 좌·우 교차 */}
      <div className="relative hidden md:grid md:grid-cols-[1fr_56px_1fr] md:items-center md:gap-8 md:pb-16 last:md:pb-0">
        <div className={isLeft ? "md:text-right" : ""}>{isLeft ? <div className="md:ml-auto md:max-w-sm">{card}</div> : null}</div>

        <div className="relative z-10 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#3d83f5]/35 bg-surface shadow-[0_0_0_6px_hsl(var(--background))]">
            <Award className="h-5 w-5 text-[#3d83f5]" strokeWidth={1.6} />
          </div>
        </div>

        <div>{!isLeft ? <div className="md:max-w-sm">{card}</div> : null}</div>
      </div>

      {/* 모바일: 중앙 선 + 한쪽 정렬 */}
      <div className="relative flex gap-4 pb-10 md:hidden last:pb-0">
        <div className="flex flex-col items-center">
          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#3d83f5]/35 bg-surface">
            <Award className="h-4 w-4 text-[#3d83f5]" />
          </div>
          {index < history.length - 1 && <div className="mt-2 w-px flex-1 bg-border" aria-hidden />}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">{card}</div>
      </div>
    </ScrollReveal>
  );
}

const AboutOfficePage = () => (
  <main className="relative">
    <AboutCoverHero
      badge="● ABOUT GAON"
      title="노무법인 가온"
      description={
        <>
          <p>기업과 근로자 모두의 권리를 지키는 전문 노무법인입니다.</p>
          <p className="mt-2">선제적 노무 관리부터 분쟁 대응까지, 성장 단계에 맞는 통합 솔루션을 제공합니다.</p>
        </>
      }
      heroImage={heroBanner}
      heroAlt="노무법인 가온 사무소"
    />

    <div className="relative z-10 bg-background">
    {/* 미션 — 스크롤 시 sticky 히어로 위를 덮으며 올라옴 */}
    <section className={`section-white py-32 md:py-40 ${coverScrollSectionClass}`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-border shadow-[0_20px_50px_-30px_rgba(15,23,42,0.2)]">
              <img src={officePhoto} alt="노무법인 가온 사무실" className="h-full w-full object-cover" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3d83f5]/90">OUR MISSION</span>
            <h2 className="mt-3 text-3xl font-bold text-navy md:text-4xl">
              노무의 복잡함을
              <br />
              <span className="text-trust-blue">명확한 기준</span>으로
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              노무법인 가온은 기업의 인사·노무 리스크를 선제적으로 관리하고, 노동 분쟁 발생 시 신속하고 체계적으로
              대응하는 전문 노무법인입니다.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              공인노무사 중심의 실무형 자문 체계를 통해 중소기업부터 중견·대기업까지, 성장 단계에 맞는 노무
              솔루션을 제공합니다. 단순 민원 대응을 넘어 취업규칙·급여·4대보험·노동 사건까지 통합적으로 지원합니다.
            </p>
            <Link to="/about/lawyers" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-trust-blue hover:underline">
              노무사 팀 보기
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* 핵심 가치 */}
    <section className="section-light py-24">
      <div className="container mx-auto px-4">
        <AboutSectionHeader eyebrow="CORE VALUES" title="가온이 지키는 네 가지 원칙" subtitle="모든 자문과 대응의 기준이 되는 핵심 가치입니다." />
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {coreValues.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 70}>
              <article className="card-lift relative h-full overflow-hidden rounded-2xl border border-border">
                <img
                  src={item.image}
                  alt=""
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
                  aria-hidden
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/88 via-white/82 to-white/78" aria-hidden />
                <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#3d83f5]/8 blur-2xl" aria-hidden />
                <div className="relative z-10 p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-trust-blue-light/95 backdrop-blur-sm">
                    <item.icon className="h-6 w-6 text-[#3d83f5]" strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#191f2e]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#191f2e]/80">{item.desc}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* 성과지표 */}
    <section
      className="py-32 md:py-40"
      style={{
        background: "linear-gradient(180deg, rgba(18,23,38,0.96) 0%, rgba(15,23,42,0.99) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <AboutSectionHeader
          eyebrow="BY THE NUMBERS"
          title="성과지표"
          subtitle="축적된 경험과 신뢰를 바탕으로 성장해 왔습니다."
          dark
        />
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 60}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
                <p className="text-3xl font-black text-[#3d83f5] md:text-4xl">{s.value}</p>
                <p className="mt-2 text-sm font-bold text-primary-foreground">{s.label}</p>
                <p className="mt-1 text-xs text-primary-foreground/50">{s.caption}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* 주요 서비스 */}
    <section className="section-white py-24">
      <div className="container mx-auto px-4">
        <AboutSectionHeader eyebrow="WHAT WE DO" title="주요 업무 영역" subtitle="기업 노무 전반을 아우르는 통합 지원 체계입니다." />
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 60}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/20 bg-white/10 p-6 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-7">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#3d83f5]/10" aria-hidden />
                <div className="relative z-10 flex flex-1 items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-trust-blue-light">
                    <s.icon className="h-5 w-5 text-[#3d83f5]" strokeWidth={1.7} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-foreground">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                <Link
                  to={s.linkTo}
                  className="relative z-10 mt-5 inline-flex w-fit items-center gap-1.5 rounded-lg border border-[#3d83f5]/25 bg-[#3d83f5]/10 px-4 py-2.5 text-sm font-semibold text-trust-blue transition hover:border-[#3d83f5]/45 hover:bg-[#3d83f5]/15"
                >
                  자세히 보기
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    {/* 연혁 — 중앙 선 + 좌우 교차 */}
    <section className="section-light py-24">
      <div className="container mx-auto px-4">
        <AboutSectionHeader eyebrow="HISTORY" title="주요 연혁" />
        <div className="relative mx-auto max-w-4xl">
          <div
            className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-0.5 -translate-x-1/2 bg-gradient-to-b from-[#3d83f5]/30 via-border to-[#3d83f5]/30 md:block"
            aria-hidden
          />
          {history.map((item, i) => (
            <HistoryTimelineItem key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>

    <AboutCtaBanner
      title="노무 파트너, 가온과 함께하세요"
      subtitle="기업 규모와 상황에 맞는 자문 방향을 안내해 드립니다."
      parallax
    />
    </div>
  </main>
);

export default AboutOfficePage;
