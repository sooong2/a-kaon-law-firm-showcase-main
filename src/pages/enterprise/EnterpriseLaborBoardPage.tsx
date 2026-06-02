/* ===== 기업 서비스 · 노동청 대응 ===== */
import {
  Building2,
  FileSearch,
  Shield,
  AlertTriangle,
  ClipboardList,
  Users,
  Phone,
  Clock,
  FileText,
} from "lucide-react";
import heroCorporate from "@/assets/hero-corporate.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import {
  EnterpriseHero,
  EnterpriseCtaSection,
  EnterpriseSectionHeader,
} from "./enterpriseShared";

const whyCases = [
  {
    no: "01",
    title: "조사 통지 접수",
    desc: "통지를 받았지만 대응 절차를 모르면 초동 대응이 지연될 수 있습니다.",
    icon: FileSearch,
  },
  {
    no: "02",
    title: "제출 서류 미비",
    desc: "근로계약서·근로시간 기록 등 필수 자료가 없으면 불리하게 작용할 수 있습니다.",
    icon: FileText,
  },
  {
    no: "03",
    title: "근로자 면담 대응",
    desc: "면담 절차와 진술 방향이 정리되지 않으면 추가 조사로 이어질 수 있습니다.",
    icon: Users,
  },
  {
    no: "04",
    title: "시정명령·과태료",
    desc: "조사 결과에 대한 이의·시정 대응 전략이 없으면 부담이 커질 수 있습니다.",
    icon: AlertTriangle,
  },
  {
    no: "05",
    title: "사전 점검 부재",
    desc: "조사 전 자체 점검 없이 운영하면 반복 위반 리스크가 높아집니다.",
    icon: ClipboardList,
  },
  {
    no: "06",
    title: "긴급 상황 대응",
    desc: "신고·고발 접수 직후 신속한 초동 대응이 필요한 경우가 많습니다.",
    icon: Clock,
  },
];

const processSteps = [
  { step: "STEP 1", title: "초동 상담·현황 파악", icon: Phone },
  { step: "STEP 2", title: "제출 자료·리스크 점검", icon: FileSearch },
  { step: "STEP 3", title: "조사·면담 동행·자문", icon: Building2 },
  { step: "STEP 4", title: "결과 대응·재발 방지", icon: Shield },
];

const riskItems = [
  {
    id: "wage",
    title: "임금·수당 관련 조사",
    desc: "통상임금·연장근로·휴일수당 등 임금 산정 이슈가 조사 사유로 자주 지목됩니다.",
    serviceTitle: "임금 체계 사전 점검",
    serviceBullets: ["급여·수당 산정 기준 검토", "명세서·근로계약 정합성 확인"],
  },
  {
    id: "worktime",
    title: "근로시간·휴게 관련 조사",
    desc: "근로시간 기록 부재·연장근로 미인정 등이 시정명령 사유가 될 수 있습니다.",
    serviceTitle: "근로시간 관리 점검",
    serviceBullets: ["출퇴근·휴게 기록 체계 점검", "연장·휴일 근로 운영 검토"],
  },
  {
    id: "contract",
    title: "근로계약·취업규칙 관련",
    desc: "계약 조건·규정 내용이 법령과 다르면 행정 지도 대상이 될 수 있습니다.",
    serviceTitle: "규정·계약 정합성 점검",
    serviceBullets: ["취업규칙·근로계약 검토", "필수 기재사항·절차 확인"],
  },
  {
    id: "insurance",
    title: "4대보험·고용 관련",
    desc: "취득·상실 신고 누락, 일용·특고 근로자 분류 오류 등이 조사될 수 있습니다.",
    serviceTitle: "4대보험·고용 점검",
    serviceBullets: ["신고 이력·자격 검토", "고용 형태·보수 신고 확인"],
  },
];

const scopeItems = [
  "노동청 조사·감독 사전 자체 점검",
  "조사 통지 접수 후 초동 대응 전략",
  "제출 서류·근거 자료 정리 지원",
  "근로자·관계자 면담 대응 자문",
  "시정명령·과태료·이의신청 대응",
  "조사 종료 후 재발 방지 제도 개선",
];

const EnterpriseLaborBoardPage = () => (
  <main>
    <EnterpriseHero
      badge="● ENTERPRISE · LABOR BOARD"
      title="노동청 대응"
      description={
        <>
          <p>노동청 조사·감독 상황에서 신속하고 체계적인 대응을 지원합니다.</p>
          <p className="mt-2.5">사전 점검부터 조사 대응, 사후 조치까지 전 과정을 함께합니다.</p>
        </>
      }
      heroImage={heroCorporate}
      heroAlt="노동청 대응"
      ctaLabel="노동청 대응 상담"
      ctaTo="/inquiry?category=labor-consulting"
    />

    <section className="section-white py-24">
      <div className="container mx-auto px-4">
        <EnterpriseSectionHeader
          eyebrow="WHY YOU NEED IT"
          title="왜 전문 대응이 필요할까요"
          subtitle="조사·감독은 초동 대응과 자료 정리가 결과를 좌우하는 경우가 많습니다."
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
        <EnterpriseSectionHeader eyebrow="PROCESS" title="대응 진행 프로세스" subtitle="상황에 맞춰 단계별로 신속히 대응합니다." />
        <div className="mx-auto max-w-6xl">
          <div className="relative hidden md:block">
            <div className="pointer-events-none absolute left-0 right-0 top-[34px] h-px bg-border/70" aria-hidden />
            <div className="grid grid-cols-4 gap-8 lg:gap-10">
              {processSteps.map((s, i) => (
                <ScrollReveal key={s.step} delay={i * 90}>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-trust-blue-light ring-1 ring-[#3d83f5]/18">
                      <s.icon className="h-6 w-6 text-[#3d83f5]" strokeWidth={1.75} />
                    </div>
                    <p className="mt-3 text-[0.65rem] font-bold tracking-[0.14em] text-[#3d83f5]">{s.step}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-4 gap-8 lg:gap-10">
              {processSteps.map((s, i) => (
                <ScrollReveal key={`${s.step}-msg`} delay={i * 90 + 40}>
                  <div className="rounded-2xl border border-[#3d83f5]/10 bg-[#3d83f5]/10 px-5 py-4 text-sm font-semibold leading-relaxed text-foreground">
                    {s.title}
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
                    <s.icon className="h-6 w-6 text-[#3d83f5]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold tracking-[0.14em] text-[#3d83f5]">{s.step}</p>
                    <p className="mt-1 text-sm font-bold text-foreground break-keep">{s.title}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section
      className="py-24"
      style={{
        background: "linear-gradient(180deg, rgba(18,23,38,0.96) 0%, rgba(15,23,42,0.99) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff6b6b]/85">RISK ALERT</span>
            <h2 className="mt-2 text-3xl font-bold text-primary-foreground md:text-4xl">자주 조사·지적되는 영역</h2>
            <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/60">사전 점검으로 조사 대응 부담을 줄일 수 있습니다.</p>
          </div>
        </ScrollReveal>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
          {riskItems.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 70}>
              <div className="relative">
                <div className="relative">
                  <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex rounded-full border border-red-200/30 bg-red-500/10 px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-red-200">
                      Risk
                    </span>
                  </div>
                  <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="flex items-start gap-4 pt-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-200/25">
                        <AlertTriangle className="h-6 w-6 text-red-300" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-primary-foreground break-keep">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-primary-foreground/65 break-keep">{item.desc}</p>
                      </div>
                    </div>
                  </article>
                </div>
                <div className="relative flex flex-col items-center py-6">
                  <div className="h-10 w-px bg-gradient-to-b from-red-200/35 via-[#3d83f5]/20 to-transparent" aria-hidden />
                  <ArrowRight className="mt-1 h-4 w-4 rotate-90 text-red-300/75" aria-hidden />
                </div>
                <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
                  <p className="text-[0.65rem] font-bold tracking-[0.18em] text-[#3d83f5]/90">SERVICE</p>
                  <h3 className="mt-2 text-lg font-bold text-primary-foreground break-keep">{item.serviceTitle}</h3>
                  <ul className="mt-4 space-y-2">
                    {item.serviceBullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-primary-foreground/65">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3d83f5]" />
                        <span className="break-keep">{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <section className="section-light py-24">
      <div className="container mx-auto px-4">
        <EnterpriseSectionHeader eyebrow="SERVICE SCOPE" title="대응 지원 범위" />
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {scopeItems.map((text, i) => (
              <ScrollReveal key={text} delay={i * 50}>
                <article className="relative overflow-hidden rounded-[28px] border border-white/20 bg-white/10 p-6 backdrop-blur-xl sm:p-7">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#3d83f5]/10" aria-hidden />
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

    <EnterpriseCtaSection
      title="노동청 조사·감독, 지금 상담받으세요"
      ctaLabel="노동청 대응 상담 신청"
      ctaTo="/inquiry?category=labor-consulting"
    />
  </main>
);

export default EnterpriseLaborBoardPage;
