/* ===== 기업 서비스 · 노무 자문 관리 ===== */
import { FileText, Scale, Calendar, UserCog, Building2, BookOpen, Phone, MessageSquare, Shield, ClipboardCheck, Banknote } from "lucide-react";
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
    title: "연차 관리 기준 정리 필요",
    desc: "연차 운영 기준이 정리되지 않으면 직원과 갈등이 발생할 수 있습니다.",
    icon: Calendar,
  },
  {
    no: "02",
    title: "직원 징계 기준 필요",
    desc: "징계 절차와 기준이 없으면 분쟁으로 이어질 수 있습니다.",
    icon: UserCog,
  },
  {
    no: "03",
    title: "노동청 조사 대응 준비",
    desc: "대응 방향이 없으면 조사 대응이 지연될 수 있습니다.",
    icon: Building2,
  },
  {
    no: "04",
    title: "임금 정산 기준 통일 필요",
    desc: "기준이 불명확하면 문의·이의가 반복되어 분쟁으로 이어질 수 있습니다.",
    icon: Banknote,
  },
  {
    no: "05",
    title: "취업규칙/규정 정비 필요",
    desc: "규정이 미흡하면 운영 기준이 흔들리고 리스크가 커질 수 있습니다.",
    icon: BookOpen,
  },
  {
    no: "06",
    title: "근로시간 운영 기준 필요",
    desc: "현장별 기준 편차가 커지면 리스크가 발생할 수 있습니다.",
    icon: Scale,
  },
];

const scopeItems = [
  "근로계약서 검토 및 작성",
  "취업규칙 정비",
  "징계 및 해고 절차 자문",
  "근로시간 및 연차 관리",
  "노동청 조사 대응",
  "노동법 개정 대응",
];

const dedicatedItems = [
  { title: "전화 및 메신저 상담", desc: "긴급 이슈부터 정기 문의까지\n전화 · 메신저로 빠르게 상담합니다.", icon: Phone },
  { title: "정기 노무 이슈 점검", desc: "월 · 분기 단위로\n노무 리스크와 제도 운영을 점검합니다.", icon: ClipboardCheck },
  { title: "노동청 대응 자문", desc: "신고 및 조사 상황에서\n대응 방향과 절차를 함께 정리합니다.", icon: Shield },
  { title: "기업 맞춤 노무 관리", desc: "업종과 기업 규모에 맞춰\n실행 가능한 노무 관리 전략을 제안합니다.", icon: MessageSquare },
];

const processSteps = [
  { step: "01", title: "초기 상담", desc: "현황·지원 범위·기대 역할을 명확히 합니다." },
  { step: "02", title: "자문 범위 설계", desc: "계약·취업규칙·인사 운영 등 우선 과제를 정합니다." },
  { step: "03", title: "전담 배정", desc: "공인노무사 1인이 단일 창구로 배정됩니다." },
  { step: "04", title: "정기 자문 운영", desc: "점검·개정·분쟁 예방까지 지속적으로 지원합니다." },
];

const EnterpriseLaborConsultingPage = () => {
  return (
    <main>
      <EnterpriseHero
        badge="● ENTERPRISE · LABOR ADVISORY"
        title="노무 자문 관리 서비스"
        description={
          <>
            <p>전담 노무사가 인사·노무 관리 전반을 지속적으로 관리합니다.</p>
            <p className="mt-2.5">노동법 대응, 인사관리, 취업규칙 정비까지 한곳에서 자문합니다.</p>
          </>
        }
        heroImage={heroCorporate}
        heroAlt="노무 자문 관리"
        ctaLabel="자문 상담 신청"
      />

      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <EnterpriseSectionHeader eyebrow="WHY YOU NEED IT" title="왜 노무 자문이 필요할까요" subtitle="법령과 현장이 빠르게 변하는 환경에서 선제적 정비가 비용과 리스크를 줄입니다." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyCases.map((c, i) => (
              <ScrollReveal key={c.no} delay={i * 70}>
                <article className="card-lift h-full rounded-2xl border border-border bg-surface p-7 text-left transition-all duration-300 ease-out hover:-translate-y-[5px] hover:shadow-[0_18px_44px_-26px_rgba(15,23,42,0.18)]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-trust-blue-light">
                      <c.icon className="h-6 w-6 text-[#3d83f5]" strokeWidth={1.7} />
                    </div>
                    <span className="text-[0.65rem] font-bold tracking-[0.18em] text-[#3d83f5]">
                      CASE {c.no}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-foreground break-keep">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep line-clamp-2">
                    {c.desc}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-24">
        <div className="container mx-auto px-4">
          <EnterpriseSectionHeader eyebrow="SERVICE SCOPE" title="노무 자문 서비스 범위" />
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {scopeItems.map((text, i) => (
                <ScrollReveal key={text} delay={i * 60}>
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
                      <h3 className="mt-3 text-base font-bold leading-snug text-foreground">
                        <span className="break-keep">{text}</span>
                      </h3>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        {/** 배경: 어두운 네이비 그라디언트 (이 섹션만) */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 80% at 30% 10%, rgba(61,131,245,0.18) 0%, rgba(15,23,42,0.96) 45%, rgba(10,15,30,0.98) 100%)",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[#0a0f1e]/55" aria-hidden />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_70%_30%,rgba(61,131,245,0.14),transparent_55%)]" aria-hidden />

        <div className="container relative z-10 mx-auto px-4">
          {/** 헤더: 기존 문구 유지, 다크 배경용 스타일만 적용 */}
          <ScrollReveal>
            <div className="mb-14 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3d83f5]/90">DEDICATED COUNSEL</span>
              <h2 className="mt-2 text-3xl font-bold text-primary-foreground md:text-4xl">전담 노무사 관리</h2>
              <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/60">공인노무사 1인이 전담 담당자로 배정됩니다.</p>
            </div>
          </ScrollReveal>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {dedicatedItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 80}>
                <article className="relative h-full overflow-hidden rounded-2xl border border-[#3d83f5]/30 bg-white/[0.08] p-7 text-left shadow-[0_18px_56px_-34px_rgba(0,0,0,0.55)] backdrop-blur-[10px] transition-colors duration-300 hover:bg-white/[0.10]">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#3d83f5]/10 blur-2xl" aria-hidden />

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-[#3d83f5]/20">
                    <item.icon className="h-6 w-6 text-[#3d83f5]" strokeWidth={1.65} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-primary-foreground break-keep">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70 whitespace-pre-line break-keep">
                    {item.desc}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-32">
        <div className="container mx-auto px-4">
          <EnterpriseSectionHeader eyebrow="PROCESS" title="서비스 진행 방식" subtitle="투명한 단계로 자문 관계를 시작하고 유지합니다." />
          <div className="mx-auto max-w-6xl">
            {/** 데스크톱/태블릿: 상단 타임라인 + 하단 메시지 카드 (참고 이미지 스타일) */}
            <div className="relative hidden md:block">
              <div className="relative">
                <div className="pointer-events-none absolute left-0 right-0 top-[34px] h-px bg-border/70" aria-hidden />
                <div className="grid grid-cols-4 gap-8 lg:gap-10">
                  {processSteps.map((s, i) => (
                    <ScrollReveal key={s.step} delay={i * 90}>
                      <div className="relative flex flex-col items-center text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-trust-blue-light ring-1 ring-[#3d83f5]/18">
                          <span className="text-sm font-black text-[#3d83f5]">{s.step}</span>
                        </div>
                        <p className="mt-3 text-sm font-bold text-foreground">{s.title}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-4 gap-8 lg:gap-10">
                {processSteps.map((s, i) => (
                  <ScrollReveal key={`${s.step}-msg`} delay={i * 90 + 40}>
                    <div className="relative">
                      {/** 말풍선 포인터 */}
                      <div
                        className="pointer-events-none absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 -translate-y-[10px] border-x-[10px] border-x-transparent border-b-[10px] border-b-[#3d83f5]/10"
                        aria-hidden
                      />
                      <div className="rounded-2xl border border-[#3d83f5]/10 bg-[#3d83f5]/10 px-5 py-4 text-sm font-semibold leading-relaxed text-foreground shadow-[0_10px_30px_-22px_rgba(15,23,42,0.18)]">
                        {s.desc}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/** 모바일: 세로 스택 (깨짐 방지) */}
            <div className="md:hidden">
              <div className="space-y-4">
                {processSteps.map((s, i) => (
                  <ScrollReveal key={`${s.step}-mobile`} delay={i * 80}>
                    <div className="flex gap-4 rounded-2xl border border-border bg-surface p-5 card-lift">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-trust-blue-light ring-1 ring-[#3d83f5]/18">
                        <span className="text-sm font-black text-[#3d83f5]">{s.step}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-foreground">{s.title}</p>
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

      <EnterpriseCtaSection
        title="지금 자문 구조가 필요하신가요?"
        ctaLabel="자문 상담 신청"
      />
    </main>
  );
};

export default EnterpriseLaborConsultingPage;
