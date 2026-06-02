/* ===== 기업 서비스 · 노동 사건 대응 ===== */
import { Banknote, UserX, Users, Building2, Gavel, Scale, FileSearch, Target, Shield } from "lucide-react";
import heroCase from "@/assets/hero-case.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import {
  EnterpriseHero,
  EnterpriseCtaSection,
  EnterpriseSectionHeader,
  enterpriseCardClass,
} from "./enterpriseShared";

const caseTypes = [
  {
    id: "wage-arrears",
    title: "임금 체불 사건",
    desc: "임금, 수당, 퇴직금 미지급 등으로\n근로자와 분쟁이 발생한 경우 대응합니다.",
    icon: Banknote,
    serviceTitle: "임금 분쟁 대응 전략 수립",
    serviceBullets: ["임금 지급 기준 검토", "체불 여부 법적 판단", "분쟁 대응 전략 수립"],
  },
  {
    id: "unfair-dismissal",
    title: "부당해고 사건",
    desc: "해고의 정당성이 문제되어\n노동위원회 구제 신청이 진행된 사건입니다.",
    icon: UserX,
    serviceTitle: "부당해고 대응 컨설팅",
    serviceBullets: ["해고 절차 적법성 검토", "노동위원회 대응 전략", "분쟁 대응 자문"],
  },
  {
    id: "harassment",
    title: "직장 내 괴롭힘 사건",
    desc: "직장 내 괴롭힘 신고 또는 조사 과정에서\n기업의 대응이 필요한 경우입니다.",
    icon: Users,
    serviceTitle: "직장 내 괴롭힘 대응 체계 지원",
    serviceBullets: ["조사 절차 자문", "내부 대응 프로세스 설계", "법적 리스크 관리"],
  },
  {
    id: "labor-office",
    title: "노동청 조사 대응",
    desc: "노동청 조사 또는\n근로감독이 진행되는 상황입니다.",
    icon: Building2,
    serviceTitle: "노동청 조사 대응 지원",
    serviceBullets: ["조사 자료 준비", "조사 대응 전략 수립", "조사 과정 자문"],
  },
  {
    id: "inspection",
    title: "근로감독 대응",
    desc: "근로감독 과정에서 발생할 수 있는\n법적 리스크 대응이 필요한 경우입니다.",
    icon: Gavel,
    serviceTitle: "근로감독 대응 컨설팅",
    serviceBullets: ["근로기준법 점검", "시정 대응 전략 수립", "행정 리스크 대응"],
  },
];

const processSteps = [
  { step: "STEP 1", title: "사건 상담", desc: "사실관계·증거·일정을 신속히 파악합니다.", icon: Scale },
  { step: "STEP 2", title: "사건 분석", desc: "쟁점·처리 경로·예상 시나리오를 정리합니다.", icon: FileSearch },
  { step: "STEP 3", title: "대응 전략 수립", desc: "합의·행정·소송 등 전략을 단계별로 제안합니다.", icon: Target },
  { step: "STEP 4", title: "노동청 대응 및 해결", desc: "서면·출석·후속 조치까지 일관되게 지원합니다.", icon: Shield },
];

const EnterpriseLaborDisputePage = () => {
  return (
    <main>
      <EnterpriseHero
        badge="● ENTERPRISE · LABOR DISPUTE"
        title="노동 사건 대응 서비스"
        description={
          <p>노동청 조사, 임금 분쟁, 부당해고 등 기업 노동 사건을 전문 노무사가 대응합니다.</p>
        }
        heroImage={heroCase}
        heroAlt="노동 사건 대응"
        ctaLabel="노동 사건 상담 신청"
      />

      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <EnterpriseSectionHeader
            eyebrow="WHY YOU NEED IT"
            title="왜 전문 대응이 필요할까요"
            subtitle="초기 대응과 기록·절차가 이후 결과를 크게 좌우합니다."
          />
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              { title: "신속한 사실 정리", desc: "서류·인적 사실관계를 빠르게 표준화합니다.", icon: FileSearch },
              { title: "대응 일관성", desc: "대외 커뮤니케이션과 내부 결정을 맞춥니다.", icon: Target },
              { title: "추가 리스크 억제", desc: "동일 유형 재발과 확대 분쟁을 예방합니다.", icon: Shield },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <article className="card-lift h-full rounded-2xl border border-border bg-surface p-7 text-left transition-all duration-300 ease-out hover:-translate-y-[5px] hover:shadow-[0_18px_44px_-26px_rgba(15,23,42,0.18)]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-trust-blue-light">
                      <item.icon className="h-6 w-6 text-[#3d83f5]" strokeWidth={1.7} />
                    </div>
                    <span className="text-[0.65rem] font-bold tracking-[0.18em] text-[#3d83f5]">
                      CASE {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-foreground break-keep">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">{item.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-light py-24"
        style={{
          background:
            "linear-gradient(135deg, rgba(248,250,252,1) 0%, rgba(241,245,249,1) 42%, rgba(239,246,255,1) 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <EnterpriseSectionHeader eyebrow="CASE TYPES" title="대응 가능한 노동 사건" />
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2">
            {caseTypes.map((c, i) => (
              <ScrollReveal key={c.id} delay={i * 80}>
                <div className="relative">
                  {/** 1) 사건 유형 카드 (블루 톤) */}
                  <article className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-[0_10px_34px_-18px_rgba(15,23,42,0.12)]">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#3d83f5]/10 blur-2xl" aria-hidden />
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-trust-blue-light ring-1 ring-[#3d83f5]/18">
                        <c.icon className="h-6 w-6 text-[#3d83f5]" strokeWidth={1.65} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.65rem] font-bold tracking-[0.18em] text-[#3d83f5]">CASE TYPE</p>
                        <h3 className="mt-2 text-lg font-bold text-foreground break-keep">{c.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep line-clamp-3">{c.desc}</p>
                      </div>
                    </div>
                  </article>

                  {/** 2) 연결 요소: 얇은 라인 + 작은 화살표 */}
                  <div className="relative flex flex-col items-center justify-center py-6">
                    <div className="pointer-events-none h-10 w-px bg-gradient-to-b from-[#3d83f5]/35 via-[#3d83f5]/20 to-transparent" aria-hidden />
                    <ArrowRight className="mt-1 h-4 w-4 rotate-90 text-[#3d83f5]/80" aria-hidden />
                  </div>

                  {/** 3) 대응 서비스 카드 (네이비 톤) */}
                  <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-navy/95 via-[#1a2744]/95 to-navy/95 p-6 text-left shadow-[0_18px_52px_-34px_rgba(0,0,0,0.50)]">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#3d83f5]/14 blur-2xl" aria-hidden />
                    <p className="text-[0.65rem] font-bold tracking-[0.18em] text-[#3d83f5]/90">SERVICE</p>
                    <h3 className="mt-2 text-lg font-bold text-primary-foreground break-keep">{c.serviceTitle}</h3>
                    <ul className="mt-4 space-y-2">
                      {c.serviceBullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-primary-foreground/70">
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

      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <EnterpriseSectionHeader eyebrow="PROCESS" title="사건 대응 절차" subtitle="단계마다 목표와 산출물을 명확히 합니다." />
          <div className="mx-auto max-w-6xl">
            {/** 데스크톱(lg+): 상단 타임라인 + 하단 메시지 카드 (동일 스타일) */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <div className="pointer-events-none absolute left-0 right-0 top-[34px] h-px bg-border/70" aria-hidden />
                <div className="grid grid-cols-4 gap-8 xl:gap-10">
                  {processSteps.map((s, i) => (
                    <ScrollReveal key={s.step} delay={i * 90}>
                      <div className="relative flex flex-col items-center text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-trust-blue-light ring-1 ring-[#3d83f5]/18">
                          <s.icon className="h-6 w-6 text-[#3d83f5]" strokeWidth={1.75} />
                        </div>
                        <p className="mt-3 text-[0.65rem] font-bold tracking-[0.14em] text-[#3d83f5]">{s.step}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-4 gap-8 xl:gap-10">
                {processSteps.map((s, i) => (
                  <ScrollReveal key={`${s.step}-msg`} delay={i * 90 + 40}>
                    <div className="relative">
                      <div
                        className="pointer-events-none absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 -translate-y-[10px] border-x-[10px] border-x-transparent border-b-[10px] border-b-[#3d83f5]/10"
                        aria-hidden
                      />
                      <div className="rounded-2xl border border-[#3d83f5]/10 bg-[#3d83f5]/10 px-5 py-4 text-sm font-semibold leading-relaxed text-foreground">
                        {s.desc}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/** 모바일/태블릿: 세로 스택 */}
            <div className="lg:hidden">
              <div className="space-y-4">
                {processSteps.map((s, i) => (
                  <ScrollReveal key={`${s.step}-mobile`} delay={i * 80}>
                    <div className="flex gap-4 rounded-2xl border border-border bg-surface p-5 card-lift">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-trust-blue-light ring-1 ring-[#3d83f5]/18">
                        <s.icon className="h-6 w-6 text-[#3d83f5]" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.65rem] font-bold tracking-[0.14em] text-[#3d83f5]">{s.step}</p>
                        <p className="mt-1 text-sm font-bold text-foreground break-keep">{s.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground break-keep">{s.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light py-24">
        <div className="container mx-auto px-4">
          <EnterpriseSectionHeader eyebrow="SERVICE SCOPE" title="서비스 범위" />
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "노동청 진정·신고 사건 대응",
              "사실관계·증거 목록·타임라인 정리",
              "합의·조정·행정 절차 병행 검토",
              "해고·징계·임금 쟁점별 자문",
              "대리인 연계 및 소송 준비 지원(필요 시)",
              "사후 재발 방지·제도 보완 제안",
            ].map((t, i) => (
              <ScrollReveal key={t} delay={i * 55}>
                <article className="relative overflow-hidden rounded-[28px] border border-white/20 bg-white/10 p-6 text-left shadow-[0_16px_40px_-28px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-7">
                  {/** 유리 느낌 오버레이 (네온 X) */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-[#3d83f5]/10" aria-hidden />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.20),transparent_42%)]" aria-hidden />

                  {/** 은은한 블루 하이라이트 */}
                  <div
                    className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[#3d83f5]/12 blur-2xl"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-[#3d83f5]/10 blur-2xl"
                    aria-hidden
                  />

                  <div className="relative z-10">
                    <p className="text-xs font-semibold tracking-widest text-foreground/55">
                      SCOPE {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 flex items-start gap-3 text-base font-bold leading-snug text-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3d83f5]" />
                      <span className="break-keep">{t}</span>
                    </h3>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
          </div>
        </div>
      </section>

      <EnterpriseCtaSection
        title="사건 초기부터 방향을 잡아 보세요"
        subtitle="긴급 연락 가능 여부는 상담 시 안내해 드립니다."
        ctaLabel="노동 사건 상담 신청"
      />
    </main>
  );
};

export default EnterpriseLaborDisputePage;
