import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import banner2 from "@/assets/banner2.jpg";
export { PageCoverHero as AboutCoverHero, CoverScrollContent, coverScrollSectionClass } from "@/components/PageCoverHero";

type AboutHeroProps = {
  badge: string;
  title: ReactNode;
  description: ReactNode;
  heroImage: string;
  heroAlt: string;
  ctaLabel?: string;
  ctaTo?: string;
  /** 커버 히어로: 패딩·높이 축소 */
  compact?: boolean;
};

function AboutHeroContent({
  badge,
  title,
  description,
  heroImage,
  heroAlt,
  ctaLabel,
  ctaTo = "/inquiry",
  compact = false,
}: AboutHeroProps) {
  return (
    <>
      <div className="absolute inset-0">
        <img src={heroImage} alt={heroAlt} className="h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
      </div>
      <div
        className={`relative z-10 container mx-auto px-4 text-center ${
          compact ? "py-12 md:py-14" : "py-20 md:py-24"
        }`}
      >
        <span className="badge-blue inline-flex border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm">
          {badge}
        </span>
        <h1 className="mt-6 text-3xl font-black leading-tight text-primary-foreground md:text-4xl lg:text-5xl">{title}</h1>
        <div className="mx-auto mt-5 max-w-3xl px-5 text-sm leading-[1.55] text-primary-foreground/85 sm:px-8 md:mt-6 md:max-w-4xl md:px-10 md:text-base md:leading-[1.6] lg:px-0">
          {description}
        </div>
        {ctaLabel && (
          <Link to={ctaTo} className="btn-primary mt-10 inline-flex px-10 py-4 text-base">
            {ctaLabel}
            <ArrowRight className="h-5 w-5" />
          </Link>
        )}
      </div>
    </>
  );
}

/** 일반 히어로 (오시는 길 등) */
export function AboutHero(props: AboutHeroProps) {
  return (
    <section className="relative flex min-h-[480px] items-center overflow-hidden md:min-h-[540px]">
      <AboutHeroContent {...props} />
    </section>
  );
}

export function AboutSectionHeader({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <ScrollReveal>
      <div className="mb-14 text-center">
        {eyebrow && (
          <span className={`text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-[#3d83f5]/90" : "text-[#3d83f5]/90"}`}>
            {eyebrow}
          </span>
        )}
        <h2 className={`mt-2 text-3xl font-bold md:text-4xl ${dark ? "text-primary-foreground" : "text-navy"}`}>{title}</h2>
        {subtitle && (
          <p className={`mx-auto mt-3 max-w-2xl ${dark ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{subtitle}</p>
        )}
      </div>
    </ScrollReveal>
  );
}

/** 소개 페이지 하단 CTA 배너 (parallax: 섹션 높이 고정, 배경 이미지만 위·아래로 이동) */
export function AboutCtaBanner({
  title,
  subtitle,
  ctaLabel,
  ctaTo = "/inquiry",
  parallax = false,
}: {
  title: string;
  subtitle?: string;
  /** 미전달 시 CTA 버튼 숨김 */
  ctaLabel?: string;
  ctaTo?: string;
  parallax?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [imageY, setImageY] = useState(0);

  useEffect(() => {
    if (!parallax) return;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const sectionH = el.offsetHeight;
      const viewH = window.innerHeight;
      const scrollRange = viewH + sectionH;
      if (scrollRange <= 0) return;

      // 섹션이 화면 아래에서 들어와 위로 나갈 때까지 0 → 1
      const progress = Math.min(1, Math.max(0, (viewH - rect.top) / scrollRange));

      // 이미지가 섹션보다 크므로, progress에 따라 위(0) → 아래(-travel) 구간을 보여줌
      const travel = sectionH * 1.35;
      setImageY(-progress * travel);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [parallax]);

  return (
    <section
      ref={sectionRef}
      className="section-dark relative overflow-hidden py-24 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <img
          src={banner2}
          alt=""
          className={
            parallax
              ? "absolute left-0 top-0 w-full object-cover object-top"
              : "absolute inset-0 h-full w-full object-cover object-center"
          }
          style={
            parallax
              ? {
                  height: "240%",
                  transform: `translate3d(0, ${imageY}px, 0)`,
                  willChange: "transform",
                }
              : undefined
          }
        />
        <div className="absolute inset-0 bg-[#121726]/80" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h2>
          {subtitle && <p className={`mx-auto max-w-lg text-primary-foreground/60 ${ctaLabel ? "mb-8" : ""}`}>{subtitle}</p>}
          {ctaLabel ? (
            <Link to={ctaTo} className="btn-primary inline-flex px-12 py-5 text-lg">
              {ctaLabel}
              <ArrowRight className="h-5 w-5" />
            </Link>
          ) : null}
        </ScrollReveal>
      </div>
    </section>
  );
}

/** 오시는 길 등 단순 레이아웃용 */
type AboutPageLayoutProps = {
  badge: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  /** 페이지 하단 배너 등 (main 내부) */
  footer?: ReactNode;
};

export function AboutPageLayout({ badge, title, subtitle, children, footer }: AboutPageLayoutProps) {
  return (
    <main>
      <section
        className="py-16 md:py-24"
        style={{
          background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(210 40% 97%) 100%)",
        }}
      >
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <span className="badge-blue">{badge}</span>
          <h1 className="mt-5 text-3xl font-black text-navy md:text-4xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>
        </div>
      </section>
      <section className="section-white py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">{children}</div>
      </section>
      {footer}
    </main>
  );
}

export function AboutLocationActions() {
  return (
    <ScrollReveal delay={100}>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/inquiry" className="btn-primary inline-flex px-8 py-4">
          상담 문의하기
          <ArrowRight className="h-4 w-4" />
        </Link>
        <a
          href="tel:070-1234-5678"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-8 py-4 text-sm font-semibold text-foreground transition hover:border-trust-blue/40 hover:text-trust-blue"
        >
          <Phone className="h-4 w-4 text-trust-blue" />
          전화 상담
        </a>
      </div>
    </ScrollReveal>
  );
}
