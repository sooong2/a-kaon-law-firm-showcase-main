/* ===== 기업 서비스 · 취업규칙 · 인사규정 ===== */
import {
  BookOpen,
  FileText,
  Scale,
  ClipboardCheck,
  Shield,
  Users,
  Gavel,
  MessageSquare,
} from "lucide-react";
import heroCorporate from "@/assets/hero-corporate.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import {
  EnterpriseHero,
  EnterpriseCtaSection,
  EnterpriseSectionHeader,
} from "./enterpriseShared";

const whyCases = [
  {
    no: "01",
    title: "취업규칙 미비·미신고",
    desc: "취업규칙이 없거나 신고되지 않으면 법적 효력과 운영 기준에 문제가 생길 수 있습니다.",
    icon: BookOpen,
  },
  {
    no: "02",
    title: "징계·해고 규정 불명확",
    desc: "징계 사유와 절차가 모호하면 분쟁 시 대응이 어려워질 수 있습니다.",
    icon: Gavel,
  },
  {
    no: "03",
    title: "근로계약과 규정 불일치",
    desc: "근로계약서·취업규칙·인사규정 간 내용이 다르면 분쟁 리스크가 커집니다.",
    icon: FileText,
  },
  {
    no: "04",
    title: "평가·보상 규정 미정비",
    desc: "승진·평가·인사발령 기준이 없으면 임직원 갈등으로 이어질 수 있습니다.",
    icon: Users,
  },
  {
    no: "05",
    title: "근로시간·휴가 규정 누락",
    desc: "근로시간·연차·휴가 규정이 법령과 맞지 않으면 행정·분쟁 리스크가 발생합니다.",
    icon: Scale,
  },
  {
    no: "06",
    title: "내부 규정 개정 지연",
    desc: "법 개정 후 규정을 방치하면 현장 운영과 법령 간 괴리가 커질 수 있습니다.",
    icon: ClipboardCheck,
  },
];

const scopeItems = [
  "취업규칙 제·개정 및 관할 행정기관 신고",
  "인사·평가·징계·보상 규정 정비",
  "근로계약서·서약서·동의서 표준화",
  "임금·수당·근로시간 규정 검토",
  "취업규칙·인사규정·근로계약 정합성 점검",
  "규정 개정 후 교육·공지 프로세스 설계",
];

const deliverables = [
  { title: "규정 진단 리포트", desc: "현행 규정과 법령·판례 간 차이를\n문서로 정리해 드립니다.", icon: FileText },
  { title: "맞춤형 규정 초안", desc: "기업 규모·업종·인사 체계에 맞춘\n취업규칙·인사규정을 설계합니다.", icon: BookOpen },
  { title: "실무 적용 가이드", desc: "현장에서 바로 쓸 수 있는\n운영 매뉴얼과 FAQ를 제공합니다.", icon: MessageSquare },
  { title: "분쟁 예방 자문", desc: "징계·인사 운영 시\n규정 해석과 적용을 함께 검토합니다.", icon: Shield },
];

const processSteps = [
  { step: "01", title: "현황 진단", desc: "취업규칙·인사규정·근로계약을 전반 점검합니다." },
  { step: "02", title: "개정 설계", desc: "우선순위 과제와 개정 방향을 확정합니다." },
  { step: "03", title: "규정 작성·신고", desc: "초안 작성, 의견 수렴, 신고까지 지원합니다." },
  { step: "04", title: "운영 정착", desc: "공지·교육·실무 적용까지 후속 자문합니다." },
];

const EnterpriseEmploymentRulesPage = () => (
  <main>
    <EnterpriseHero
      badge="● ENTERPRISE · EMPLOYMENT RULES"
      title="취업규칙 · 인사규정"
      description={
        <>
          <p>법령에 맞는 취업규칙·인사규정을 설계하고 정비합니다.</p>
          <p className="mt-2.5">분쟁 예방과 인사 운영 일관성을 위한 실무 자문을 제공합니다.</p>
        </>
      }
      heroImage={heroCorporate}
      heroAlt="취업규칙 · 인사규정"
      ctaLabel="규정 정비 상담"
      ctaTo="/inquiry?category=labor-consulting"
    />

    <section className="section-white py-24">
      <div className="container mx-auto px-4">
        <EnterpriseSectionHeader
          eyebrow="WHY YOU NEED IT"
          title="왜 규정 정비가 필요할까요"
          subtitle="인사 운영의 기준이 문서로 정리되어 있어야 분쟁을 예방하고 대응할 수 있습니다."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyCases.map((c, i) => (
            <ScrollReveal key={c.no} delay={i * 70}>
              <article className="card-lift h-full rounded-2xl border border-border bg-surface p-7 text-left transition-all duration-300 ease-out hover:-translate-y-[5px] hover:shadow-[0_18px_44px_-26px_rgba(15,23,42,0.18)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-trust-blue-light">
                    <c.icon className="h-6 w-6 text-[#3d83f5]" strokeWidth={1.7} />
                  </div>
                  <span className="text-[0.65rem] font-bold tracking-[0.18em] text-[#3d83f5]">CASE {c.no}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-foreground break-keep">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep line-clamp-2">{c.desc}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section-light py-24">
      <div className="container mx-auto px-4">
        <EnterpriseSectionHeader eyebrow="SERVICE SCOPE" title="규정 정비 서비스 범위" />
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {scopeItems.map((text, i) => (
              <ScrollReveal key={text} delay={i * 60}>
                <article className="relative overflow-hidden rounded-[28px] border border-white/20 bg-white/10 p-6 text-left shadow-[0_16px_40px_-28px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-7">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#3d83f5]/10" aria-hidden />
                  <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[#3d83f5]/12 blur-2xl" aria-hidden />
                  <div className="relative z-10">
                    <p className="text-xs font-semibold tracking-widest text-foreground/55">SCOPE {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-base font-bold leading-snug text-foreground break-keep">{text}</h3>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden py-24">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 30% 0%, rgba(61,131,245,0.08) 0%, rgba(15,23,42,0.97) 38%, rgba(10,15,30,0.99) 100%)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[#0a0f1e]/60" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_70%_40%,rgba(61,131,245,0.10),transparent_55%)]" aria-hidden />
      <div className="container relative z-10 mx-auto px-4">
        <ScrollReveal>
          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3d83f5]/90">DELIVERABLES</span>
            <h2 className="mt-2 text-3xl font-bold text-primary-foreground md:text-4xl">제공 산출물</h2>
            <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/60">규정 정비 결과물을 실무에 바로 활용할 수 있도록 제공합니다.</p>
          </div>
        </ScrollReveal>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {deliverables.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 80}>
              <article className="relative h-full overflow-hidden rounded-2xl border border-[#3d83f5]/30 bg-white/[0.08] p-7 backdrop-blur-[10px]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-[#3d83f5]/20">
                  <item.icon className="h-6 w-6 text-[#3d83f5]" strokeWidth={1.65} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-primary-foreground break-keep">{item.title}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-primary-foreground/70 break-keep">{item.desc}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section-light py-32">
      <div className="container mx-auto px-4">
        <EnterpriseSectionHeader eyebrow="PROCESS" title="규정 정비 진행 방식" subtitle="진단부터 신고·운영 정착까지 단계별로 지원합니다." />
        <div className="mx-auto max-w-6xl">
          <div className="relative hidden md:block">
            <div className="pointer-events-none absolute left-0 right-0 top-[34px] h-px bg-border/70" aria-hidden />
            <div className="grid grid-cols-4 gap-8 lg:gap-10">
              {processSteps.map((s, i) => (
                <ScrollReveal key={s.step} delay={i * 90}>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-trust-blue-light ring-1 ring-[#3d83f5]/18">
                      <span className="text-sm font-black text-[#3d83f5]">{s.step}</span>
                    </div>
                    <p className="mt-3 text-sm font-bold text-foreground">{s.title}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-4 gap-8 lg:gap-10">
              {processSteps.map((s, i) => (
                <ScrollReveal key={`${s.step}-msg`} delay={i * 90 + 40}>
                  <div className="rounded-2xl border border-[#3d83f5]/10 bg-[#3d83f5]/10 px-5 py-4 text-sm font-semibold leading-relaxed text-foreground">
                    {s.desc}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
          <div className="space-y-4 md:hidden">
            {processSteps.map((s, i) => (
              <ScrollReveal key={`${s.step}-m`} delay={i * 80}>
                <div className="card-lift flex gap-4 rounded-2xl border border-border bg-surface p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-trust-blue-light">
                    <span className="text-sm font-black text-[#3d83f5]">{s.step}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{s.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground break-keep">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>

    <EnterpriseCtaSection
      title="취업규칙·인사규정, 지금 점검해 보세요"
      ctaLabel="규정 정비 상담 신청"
      ctaTo="/inquiry?category=labor-consulting"
    />
  </main>
);

export default EnterpriseEmploymentRulesPage;
