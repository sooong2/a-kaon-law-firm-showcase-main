import type { ReactNode } from "react";

export type PageCoverHeroProps = {
  badge: string;
  title: ReactNode;
  description: ReactNode;
  heroImage: string;
  heroAlt: string;
  /** 히어로 하단 버튼·링크 등 (선택) */
  actions?: ReactNode;
};

function HeroInner({ badge, title, description, heroImage, heroAlt, actions }: PageCoverHeroProps) {
  return (
    <>
      <div className="absolute inset-0">
        <img src={heroImage} alt={heroAlt} className="h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-12 text-center md:py-14">
        <span className="badge-blue inline-flex border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm">
          {badge}
        </span>
        <h1 className="mt-6 text-3xl font-black leading-tight text-primary-foreground md:text-4xl lg:text-5xl">{title}</h1>
        <div className="mx-auto mt-5 max-w-3xl px-5 text-sm leading-[1.55] text-primary-foreground/85 sm:px-8 md:mt-6 md:max-w-4xl md:px-10 md:text-base md:leading-[1.6] lg:px-0">
          {description}
        </div>
        {actions ? <div className="mt-8 flex justify-center">{actions}</div> : null}
      </div>
    </>
  );
}

/** sticky 히어로 — 스크롤 시 고정, 아래 섹션이 위로 올라와 덮음 */
export function PageCoverHero(props: PageCoverHeroProps) {
  return (
    <section className="sticky top-0 z-0 flex min-h-[58svh] w-full items-center overflow-hidden md:min-h-[54svh]">
      <div className="relative flex min-h-[58svh] w-full items-center md:min-h-[54svh]">
        <HeroInner {...props} />
      </div>
    </section>
  );
}

/** 커버 스크롤 하위 콘텐츠 래퍼 */
export function CoverScrollContent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative z-10 bg-background ${className}`.trim()}>{children}</div>;
}

/** 첫 번째 덮는 섹션 상단 스타일 */
export const coverScrollSectionClass =
  "rounded-t-[2rem] shadow-[0_-12px_48px_-16px_rgba(15,23,42,0.12)] md:rounded-t-[2.5rem]";
