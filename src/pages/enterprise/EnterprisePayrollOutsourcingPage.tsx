/* ===== 기업 서비스 · 급여 · 4대보험 아웃소싱 ===== */
import { Database, Calculator, FileSpreadsheet, ShieldCheck, Headphones, Landmark, AlertTriangle } from "lucide-react";
import heroHandshake from "@/assets/악수.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import {
  EnterpriseHero,
  EnterpriseCtaSection,
  EnterpriseSectionHeader,
} from "./enterpriseShared";

const processSteps = [
  { step: "STEP 1", title: "급여 데이터 수집", icon: Database },
  { step: "STEP 2", title: "급여 계산 및 명세서 작성", icon: Calculator },
  { step: "STEP 3", title: "4대보험 취득 및 상실 신고", icon: FileSpreadsheet },
  { step: "STEP 4", title: "급여 관련 노무 상담", icon: Headphones },
  { step: "STEP 5", title: "연말정산 지원", icon: Landmark },
];

const riskItems = [
  {
    id: "payroll-calc",
    title: "급여 계산 오류",
    desc: "급여 계산 방식이 명확하지 않으면 수당·공제·연장근로 계산에서 오류가 발생할 수 있습니다.",
    serviceTitle: "급여 체계 진단",
    serviceBullets: ["기업 급여 체계 점검", "수당 · 공제 기준 정리"],
  },
  {
    id: "overtime",
    title: "연장근로 수당 미지급",
    desc: "연장근로 기준이 정리되지 않으면 수당 미지급 분쟁이 발생할 수 있습니다.",
    serviceTitle: "근로시간 관리 체계 정비",
    serviceBullets: ["연장 · 휴일 기준 정리", "근로시간 기록 체계 점검"],
  },
  {
    id: "insurance",
    title: "4대보험 신고 누락",
    desc: "신규 입사자 신고나 보험 처리 누락으로 행정 리스크가 발생할 수 있습니다.",
    serviceTitle: "4대보험 관리 컨설팅",
    serviceBullets: ["취득 · 상실 신고 점검", "변동 신고 프로세스 정비"],
  },
  {
    id: "worktime",
    title: "근로시간 관리 문제",
    desc: "근로시간 기록과 관리 기준이 없으면 노동청 점검 시 문제가 될 수 있습니다.",
    serviceTitle: "근로시간 관리 시스템 구축",
    serviceBullets: ["관리 기준 수립", "점검/보고 체계 구축"],
  },
];

const EnterprisePayrollOutsourcingPage = () => {
  return (
    <main>
      <EnterpriseHero
        badge="● ENTERPRISE · PAYROLL & INSURANCE"
        title="급여 · 4대보험 아웃소싱"
        description={
          <>
            <p>전문 노무사가 급여 계산과 4대보험 신고 업무를 직접 관리합니다.</p>
            <p className="mt-2.5">급여 업무 부담을 줄이고 신고·산정 리스크를 예방합니다.</p>
          </>
        }
        heroImage={heroHandshake}
        heroAlt="급여 4대보험 아웃소싱"
        ctaLabel="급여 아웃소싱 상담 신청"
      />

      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <EnterpriseSectionHeader
            eyebrow="WHY YOU NEED IT"
            title="왜 아웃소싱이 필요할까요"
            subtitle="명세서·신고·근로시간이 맞물리는 영역에서 사소한 실수도 큰 분쟁으로 이어질 수 있습니다."
          />
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                title: "정확한 산정",
                desc: "통상임금·가산수당·공제까지 일관된 기준으로 정리합니다.",
                icon: Calculator,
              },
              {
                title: "신고 리스크 완화",
                desc: "취득·상실·보수총액 등 신고 이슈를 점검합니다.",
                icon: ShieldCheck,
              },
              {
                title: "내부 인력 절감",
                desc: "급여 담당 업무를 외부 전문가와 역할 분담합니다.",
                icon: Headphones,
              },
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

      <section className="section-light py-24">
        <div className="container mx-auto px-4">
          <EnterpriseSectionHeader
            eyebrow="PROCESS"
            title="업무 진행 프로세스"
            subtitle="표준 절차에 따라 급여·보험 업무를 끊김 없이 연결합니다."
          />
          <div className="mx-auto max-w-6xl">
            {/** 데스크톱(lg+): 상단 타임라인 + 하단 메시지 카드 (노무 자문 페이지 PROCESS와 동일 스타일) */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <div className="pointer-events-none absolute left-0 right-0 top-[34px] h-px bg-border/70" aria-hidden />
                <div className="grid grid-cols-5 gap-8 xl:gap-10">
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

              <div className="mt-8 grid grid-cols-5 gap-8 xl:gap-10">
                {processSteps.map((s, i) => (
                  <ScrollReveal key={`${s.step}-msg`} delay={i * 90 + 40}>
                    <div className="relative">
                      <div
                        className="pointer-events-none absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 -translate-y-[10px] border-x-[10px] border-x-transparent border-b-[10px] border-b-[#3d83f5]/10"
                        aria-hidden
                      />
                      <div className="rounded-2xl border border-[#3d83f5]/10 bg-[#3d83f5]/10 px-5 py-4 text-sm font-semibold leading-relaxed text-foreground shadow-[0_10px_30px_-22px_rgba(15,23,42,0.18)]">
                        {s.title}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/** 모바일/태블릿: 세로 스택 (깨짐 방지) */}
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
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, rgba(18,23,38,0.96) 0%, rgba(15,23,42,0.99) 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          {/** 다크 배경에 맞춘 헤더(문구는 그대로) */}
          <ScrollReveal>
            <div className="mb-14 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff6b6b]/85">RISK ALERT</span>
              <h2 className="mt-2 text-3xl font-bold text-primary-foreground md:text-4xl">급여 관리에서 자주 발생하는 문제</h2>
              <p className="mx-auto mt-3 max-w-2xl text-primary-foreground/60">
                사전에 점검하면 분쟁·행정 조치 가능성을 낮출 수 있습니다.
              </p>
            </div>
          </ScrollReveal>

          {/** 2열 정돈(PC/Tablet), 모바일 1열: 문제→해결 흐름 유지 */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-10">
            {riskItems.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 70}>
                <div className="relative">
                  {/** 1) 문제 카드 (레드 톤 유지, 다크 배경용 반투명) */}
                  <div className="relative">
                    {/** 상단 라벨: 카드 밖으로 살짝 튀어나오게 */}
                    <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
                      <span className="inline-flex items-center justify-center rounded-full border border-red-200/30 bg-red-500/10 px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] text-red-200">
                        Risk
                      </span>
                    </div>

                    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_16px_46px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                      {/** 은은한 레드 하이라이트 */}
                      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-500/14 blur-2xl" aria-hidden />
                      <div className="pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-red-500/10 blur-2xl" aria-hidden />

                      <div className="flex items-start gap-4 pt-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-200/25">
                          <AlertTriangle className="h-6 w-6 text-red-300" strokeWidth={1.75} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-primary-foreground break-keep">{item.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-primary-foreground/65 break-keep line-clamp-3">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>

                  {/** 2) 연결 요소: 얇은 라인 + 작은 화살표 (원형 경고 아이콘 제거) */}
                  <div className="relative flex flex-col items-center justify-center py-6">
                    <div
                      className="pointer-events-none h-10 w-px bg-gradient-to-b from-red-200/35 via-[#3d83f5]/20 to-transparent"
                      aria-hidden
                    />
                    <ArrowRight
                      className="mt-1 h-4 w-4 rotate-90"
                      style={{ color: "rgba(255, 138, 138, 0.75)" }}
                      aria-hidden
                    />
                  </div>

                  {/** 3) 서비스 카드 (블루 톤, 다크 배경용 글래스) */}
                  <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/6 p-6 text-left shadow-[0_18px_52px_-34px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_22px_60px_-34px_rgba(61,131,245,0.28)]">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#3d83f5]/12 blur-2xl" aria-hidden />
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
          <EnterpriseSectionHeader eyebrow="SERVICE SCOPE" title="서비스 범위" />
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "급여 계산·이체 자료 정리",
              "임금명세서 발급 지원",
              "4대보험 취득·상실·변동 신고",
              "근로시간·연장·휴일 수당 검토",
              "퇴직·정산 시 급여 처리 자문",
              "노무 상담과 연계한 제도 정비",
            ].map((t, i) => (
              <ScrollReveal key={t} delay={i * 50}>
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
        title="급여·보험 업무, 함께 정리해 드립니다"
        ctaLabel="급여 아웃소싱 상담 신청"
      />
    </main>
  );
};

export default EnterprisePayrollOutsourcingPage;
