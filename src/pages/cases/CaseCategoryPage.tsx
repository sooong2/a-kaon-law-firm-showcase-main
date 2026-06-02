import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import heroCase from "@/assets/hero-case.jpg";
import ScrollReveal from "@/components/ScrollReveal";

export type CaseCategoryContent = {
  title: string;
  heroSubtitle: string;
  overview: string;
  services: string[];
  process: string[];
};

export function CaseCategoryPage({ content }: { content: CaseCategoryContent }) {
  return (
    <main>
      <section className="relative flex min-h-[400px] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCase} alt={content.title} className="h-full w-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <span className="badge-blue border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm">
            ● CASE RESPONSE
          </span>
          <h1 className="mt-6 text-3xl font-black text-primary-foreground md:text-4xl">{content.title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/75">{content.heroSubtitle}</p>
          <Link to="/inquiry?category=case-center" className="btn-primary mt-8 inline-flex px-8 py-4">
            긴급 상담 신청
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="section-white py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <ScrollReveal>
            <p className="text-center text-base leading-relaxed text-muted-foreground md:text-lg">{content.overview}</p>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <ScrollReveal delay={80}>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <h2 className="text-lg font-bold text-navy">주요 지원 내용</h2>
                <ul className="mt-4 space-y-3">
                  {content.services.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-trust-blue" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <h2 className="text-lg font-bold text-navy">대응 절차</h2>
                <ol className="mt-4 space-y-3">
                  {content.process.map((step, i) => (
                    <li key={step} className="flex gap-3 text-sm text-foreground">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-trust-blue-light text-xs font-bold text-trust-blue">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
