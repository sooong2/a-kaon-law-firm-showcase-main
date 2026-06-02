import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import banner2 from "@/assets/banner2.jpg";

/** 기업 서비스 페이지 하단 고지 */
export const ENTERPRISE_LEGAL_NOTE =
  "본 서비스 안내는 일반적인 노무 관리 정보를 기반으로 작성된 것이며, 구체적인 사건 대응이나 법률 판단은 공인노무사 상담을 통해 확인하시기 바랍니다.";

/** 카드 호버 살짝 상승 + 고급스러운 테두리·그림자 */
export const enterpriseCardClass =
  "card-lift rounded-2xl border border-border/90 bg-gradient-to-br from-card via-card to-slate-50/40 p-6 md:p-7 shadow-[0_10px_38px_-14px_rgba(15,23,42,0.14)] transition-shadow duration-300 hover:shadow-[0_18px_48px_-12px_rgba(61,131,245,0.18)] hover:border-[#3d83f5]/25";

export function EnterpriseLegalNote() {
  return (
    <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-primary-foreground/55 md:text-sm">
      {ENTERPRISE_LEGAL_NOTE}
    </p>
  );
}

type EnterpriseCtaSectionProps = {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  ctaTo?: string;
};

/** 기업 서비스 하단 상담 신청 배너 (고지 문구 → 버튼 순) */
export function EnterpriseCtaSection({ title, subtitle, ctaLabel, ctaTo = "/consulting" }: EnterpriseCtaSectionProps) {
  return (
    <section className="section-dark relative overflow-hidden py-20">
      <img
        src={banner2}
        alt=""
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#121726]/80" aria-hidden />
      <div className="container relative z-10 mx-auto px-4 text-center">
        <ScrollReveal>
          <h2 className={`text-3xl font-bold md:text-4xl ${subtitle ? "mb-4" : "mb-8"}`}>{title}</h2>
          {subtitle && <p className="mx-auto mb-6 max-w-lg text-primary-foreground/60">{subtitle}</p>}
          <div className="mx-auto mb-8 max-w-3xl">
            <EnterpriseLegalNote />
          </div>
          <Link to={ctaTo} className="btn-primary inline-flex px-12 py-5 text-lg">
            {ctaLabel}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}

type EnterpriseHeroProps = {
  badge: string;
  title: string;
  description: ReactNode;
  heroImage: string;
  heroAlt: string;
  ctaLabel: string;
  ctaTo?: string;
};

export function EnterpriseHero({ badge, title, description, heroImage, heroAlt, ctaLabel, ctaTo = "/consulting" }: EnterpriseHeroProps) {
  return (
    <section className="relative flex min-h-[480px] items-center overflow-hidden md:min-h-[520px]">
      <div className="absolute inset-0">
        <img src={heroImage} alt={heroAlt} className="h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-20 text-center md:py-24">
        <span className="badge-blue inline-flex border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm">
          {badge}
        </span>
        <h1 className="mt-6 text-3xl font-black leading-tight text-primary-foreground md:text-4xl lg:text-5xl">{title}</h1>
        <div className="mx-auto mt-6 max-w-3xl text-base leading-[1.55] text-primary-foreground/85 md:max-w-4xl md:text-lg md:leading-[1.6]">
          {description}
        </div>
        <Link to={ctaTo} className="btn-primary mt-10 inline-flex px-10 py-4 text-base">
          {ctaLabel}
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

export function EnterpriseSectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <ScrollReveal>
      <div className="mb-14 text-center">
        {eyebrow && <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3d83f5]/90">{eyebrow}</span>}
        <h2 className="mt-2 text-3xl font-bold text-navy md:text-4xl">{title}</h2>
        {subtitle && <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </div>
    </ScrollReveal>
  );
}
