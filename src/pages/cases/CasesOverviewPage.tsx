import { Link } from "react-router-dom";
import { ArrowRight, Scale } from "lucide-react";
import heroCase from "@/assets/hero-case.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { caseResponseLinks } from "@/lib/siteNav";

const caseDescriptions: Record<string, string> = {
  "/cases/wrongful-dismissal": "해고의 정당성 검토부터 구제신청, 소송 대응까지 전 과정을 지원합니다.",
  "/cases/wage-arrears": "미지급 임금·퇴직금·수당 등 체불 임금 회수를 위한 법적 대응을 지원합니다.",
  "/cases/workplace-harassment": "직장 내 괴롭힘·성희롱 사건 조사, 징계, 재발 방지 체계까지 함께합니다.",
};

const CasesOverviewPage = () => (
  <main>
    <section className="relative flex min-h-[420px] items-center overflow-hidden md:min-h-[480px]">
      <div className="absolute inset-0">
        <img src={heroCase} alt="사건 대응" className="h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        <span className="badge-blue border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm">
          ● CASE RESPONSE
        </span>
        <h1 className="mt-6 text-4xl font-black text-primary-foreground md:text-5xl">사건 대응</h1>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/75">
          부당해고, 임금체불, 직장 내 괴롭힘 등 노동 분쟁 유형별 전문 대응 서비스입니다.
        </p>
      </div>
    </section>

    <section className="section-white py-20 md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-navy md:text-3xl">분야별 사건 대응</h2>
            <p className="mt-3 text-muted-foreground">상황에 맞는 전문 대응 전략을 제안합니다.</p>
          </div>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {caseResponseLinks.map((item, i) => (
            <ScrollReveal key={item.path} delay={i * 80}>
              <Link
                to={item.path}
                className="card-lift group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-trust-blue/30"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-trust-blue-light">
                  <Scale className="h-6 w-6 text-trust-blue" />
                </div>
                <h3 className="text-lg font-bold text-navy group-hover:text-trust-blue">{item.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {caseDescriptions[item.path]}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-trust-blue">
                  자세히 보기
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  </main>
);

export default CasesOverviewPage;
