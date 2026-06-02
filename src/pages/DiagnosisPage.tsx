/* ===== 노무법인 가온 - 셀프진단 ===== */
import { useState } from "react";
import { BarChart3, FileSearch, CheckCircle, ArrowRight, AlertTriangle, Eye, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroDiagnosis from "@/assets/hero-diagnosis.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import { PageCoverHero, coverScrollSectionClass } from "@/components/PageCoverHero";
import CountUp from "@/components/CountUp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

/** 진단 TESTIMONIALS — 슬라이드·자동 재생용 데이터 (기존 3건 + 추가 3건) */
const DIAGNOSIS_TESTIMONIALS = [
  {
    industry: "제조업 / 직원 30명",
    text: "노무 리스크 진단을 통해 취업규칙과 근로계약 문제를 빠르게 확인할 수 있었습니다.",
  },
  {
    industry: "IT 기업 / 직원 20명",
    text: "노무 체계가 정리되지 않아 걱정이 많았는데 현재 리스크를 명확하게 확인할 수 있었습니다.",
  },
  {
    industry: "건설업 / 현장 운영 기업",
    text: "노동청 대응 전에 리스크를 점검할 수 있어서 큰 도움이 되었습니다.",
  },
  {
    industry: "유통·물류 / 직원 45명",
    text: "배송·야간 근무 인력이 많아 근로시간 이슈가 걱정됐는데, 진단으로 우선 조치 항목을 정리할 수 있었습니다.",
  },
  {
    industry: "요식·프랜차이즈 / 다점포",
    text: "매장별 근로계약·최저임금 적용을 한눈에 점검할 수 있어 본사 기준을 맞추는 데 도움이 됐습니다.",
  },
  {
    industry: "서비스업 / 직원 60명",
    text: "퇴직금·연차 정산 등 임금 관련 문의가 잦았는데, 진단 리포트로 내부 설명 자료로 활용했습니다.",
  },
] as const;

const DiagnosisPage = () => {
  /** PREVIEW 섹션: 탭은 박스 안 콘텐츠만 전환, 상세 페이지 이동은 하단 버튼만 */
  const [previewTab, setPreviewTab] = useState<"labor" | "pay" | "cost">("labor");

  const previewTabBtnBase =
    "flex-1 px-4 py-4 text-center text-sm transition-colors sm:flex-none sm:px-6";
  const previewTabActive =
    "border-b-2 border-trust-blue bg-trust-blue-light font-semibold text-trust-blue";
  const previewTabIdle =
    "text-muted-foreground hover:bg-slate-50 hover:text-foreground";

  return (
    <main className="relative">
      <PageCoverHero
        badge="● SMART DIAGNOSTIC CENTER"
        title={
          <>
            기업의 노무 리스크를
            <br />
            <span className="text-trust-blue">사전에 점검하세요</span>
          </>
        }
        description={
          <>
            <p>간단한 기업 정보 입력만으로</p>
            <p className="mt-1">기업의 인사·노무 관리 리스크를 분석하고</p>
            <p className="mt-1">필요한 대응 방향을 확인할 수 있습니다.</p>
          </>
        }
        heroImage={heroDiagnosis}
        heroAlt="셀프진단"
        actions={
          <button type="button" className="btn-primary px-10 py-4 text-base">
            무료 진단 시작하기
            <ArrowRight className="h-5 w-5" />
          </button>
        }
      />

      <div className="relative z-10 bg-background">
      {/* ===== 신뢰 지표 ===== */}
      <section className={`section-white py-24 ${coverScrollSectionClass}`}>
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="badge-blue">● TRUST</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">노무법인이 쌓아 온 경험</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              공인노무사 기반 진단·컨설팅과 노동 행정 대응 경험을 바탕으로 한 신뢰 지표입니다.
            </p>
          </ScrollReveal>
          {/* 모바일: 원형 카드 1열(글자 잘림 방지) / md 이상: 3열 */}
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 justify-items-center gap-8 md:grid-cols-3 md:justify-items-stretch">
            {[
              {
                end: 120,
                suffix: "+",
                unit: "기업",
                label: "노무 리스크 진단 기업",
                desc: "진단을 통해 리스크를 점검한 누적 기업 규모입니다.",
              },
              {
                end: 1000,
                suffix: "+",
                unit: "시간",
                label: "노무 컨설팅 경험",
                desc: "현장 컨설팅·자문에 투입된 누적 전문 시간입니다.",
              },
              {
                end: 80,
                suffix: "+",
                unit: "건",
                label: "노동청 대응 사례",
                desc: "조사·분쟁 등 노동청 관련 대응 경험입니다.",
              },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="flex flex-col items-center">
                  <div
                    className="relative mx-auto flex aspect-square w-full max-w-[16.75rem] shrink-0 flex-col items-center justify-center overflow-hidden rounded-full border border-white/90 px-3 py-5 text-center shadow-[0_8px_28px_rgba(61,131,245,0.06),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-10px_26px_rgba(120,170,230,0.07)] backdrop-blur-[4px] sm:max-w-[17.25rem] sm:px-4 sm:py-6"
                    style={{
                      background:
                        "radial-gradient(circle at 32% 26%, rgba(255,255,255,0.99) 0%, rgba(244, 250, 255, 0.94) 28%, rgba(226, 240, 255, 0.72) 52%, rgba(210, 232, 255, 0.42) 76%, rgba(200, 228, 255, 0.22) 100%)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute -right-1 top-1 h-24 w-24 rounded-full bg-white/70 blur-2xl"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute bottom-3 left-1/2 h-12 w-[72%] -translate-x-1/2 rounded-full bg-white/50 blur-xl"
                      aria-hidden
                    />
                    <div className="relative z-[1] flex w-full flex-col items-center">
                      <div className="mb-2 flex flex-wrap items-baseline justify-center gap-x-0">
                        <CountUp
                          end={stat.end}
                          suffix={stat.suffix}
                          className="text-3xl font-black tabular-nums text-navy md:text-4xl"
                        />
                        <span className="ml-0.5 text-lg font-bold text-[#3d83f5] md:text-xl">{stat.unit}</span>
                      </div>
                      <p className="text-sm font-semibold leading-snug text-foreground">{stat.label}</p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{stat.desc}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 기업에서 자주 발생하는 노무 리스크 ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#ff6061]/22 bg-[#ff6061]/12 px-4 py-2 text-sm font-medium text-[#ff6061]">
                ● RISK CASES
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 whitespace-pre-line">
                기업에서 자주 발생하는{"\n"}
                노무 리스크
              </h2>
              <p className="text-muted-foreground mt-4 text-sm md:text-[0.9375rem] leading-relaxed">
                실제 기업에서 노동청 조사 시 자주 발견되는 노무 리스크 사례입니다.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {(
              [
                {
                  riskNo: "01",
                  title: "근로계약 미작성",
                  outcome: { kind: "amount" as const, prefix: "최대 과태료", value: "500만원" },
                },
                {
                  riskNo: "02",
                  title: "임금체계 미정비",
                  outcome: { kind: "split" as const, strong: "임금 분쟁", rest: "발생 가능" },
                },
                {
                  riskNo: "03",
                  title: "불법파견",
                  outcome: { kind: "split" as const, strong: "과징금", rest: "및 형사 책임 가능" },
                },
              ] as const
            ).map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 100}>
                <div className="h-full">
                  <div className="flex h-full min-h-[200px] flex-col rounded-2xl border border-[#ff6061]/28 bg-gradient-to-b from-white via-rose-50/20 to-rose-50/45 p-6 text-left shadow-[0_14px_36px_rgba(255,96,97,0.14)]">
                    <span className="inline-flex w-fit items-center rounded-full border border-slate-200/80 bg-white/90 px-2.5 py-1 text-[0.625rem] font-bold tracking-[0.14em] text-slate-500 shadow-sm">
                      RISK {card.riskNo}
                    </span>
                    <h3 className="mt-4 text-lg font-bold leading-snug text-foreground">{card.title}</h3>
                    <div className="mt-5 flex flex-1 flex-col justify-end border-t border-slate-200/60 pt-4">
                      {card.outcome.kind === "amount" ? (
                        <>
                          <p className="text-xs font-medium text-muted-foreground">{card.outcome.prefix}</p>
                          <p className="mt-1 text-lg font-bold tabular-nums tracking-tight text-[#ff6061] md:text-xl">
                            {card.outcome.value}
                          </p>
                        </>
                      ) : (
                        <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 leading-relaxed">
                          <span className="text-lg font-bold tabular-nums tracking-tight text-[#ff6061] md:text-xl">
                            {card.outcome.strong}
                          </span>
                          <span className="text-sm text-muted-foreground">{card.outcome.rest}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Diagnosis Options ===== */}
      <section className="py-24" style={{ backgroundColor: "#f6f6f6" }}>
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="badge-blue">● DIAGNOSIS MENU</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 whitespace-pre-line">
                기업 상황에 맞는{"\n"}
                노무 리스크 진단을 선택하세요
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto whitespace-pre-line">
                기업의 인사·노무 관리 상태를{"\n"}
                간단하게 점검할 수 있습니다.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: FileSearch,
                tag: "기본",
                title: "노무 리스크\n기본 진단",
                desc: "취업규칙, 근로계약서,\n임금체계 등\n기업 인사·노무 관리 전반의\n기본 리스크를 점검합니다.",
                href: "/diagnosis/basic-labor-risk",
              },
              {
                icon: BarChart3,
                tag: "심화",
                title: "급여 및 근로시간\n관리 점검",
                desc: "급여 산정,\n연장·휴일 근로,\n수당 관리 등\n임금 관련 노무 리스크를 분석합니다.",
                href: "/diagnosis/payroll-worktime",
              },
              {
                icon: AlertTriangle,
                tag: "긴급",
                title: "노동 사건\n긴급 점검",
                desc: "노동청 신고,\n임금 분쟁,\n노동 사건 발생 시\n초기 대응 방향을 확인할 수 있습니다.",
                href: "/diagnosis/labor-incident-urgent",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.href} delay={i * 120}>
                <div
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/80 p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-[10px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(61,131,245,0.12)]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(220, 236, 255, 0.62) 48%, rgba(186, 214, 255, 0.5) 100%)",
                  }}
                >
                  <div
                    className="mb-5 flex min-h-[9rem] items-center justify-center rounded-[1.25rem] border border-white/60 backdrop-blur-sm"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(255, 255, 255, 0.75) 0%, rgba(200, 230, 255, 0.45) 100%)",
                    }}
                  >
                    <item.icon className="h-16 w-16 text-[#3d83f5]" strokeWidth={1.65} />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="mb-3 inline-flex w-fit rounded-full bg-slate-200/80 px-3 py-1 text-xs font-semibold text-slate-700">
                      {item.tag}
                    </span>
                    <h3 className="text-lg font-bold text-foreground whitespace-pre-line mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1 whitespace-pre-line">{item.desc}</p>
                    <Link
                      to={item.href}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-white/90 bg-white/45 py-3.5 text-sm font-semibold text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-white/65"
                    >
                      진단 시작하기
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 진단 절차 ===== */}
      <section className="section-light py-24">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="badge-blue">● 진단 절차</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4 whitespace-pre-line">
              간단한 정보 입력으로{"\n"}
              노무 리스크를 확인할 수 있습니다
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
            {[
              {
                icon: FileSearch,
                title: "기업 정보 입력",
                desc: "기업 규모와 인사 운영 현황을 입력합니다.",
              },
              {
                icon: BarChart3,
                title: "노무 리스크 분석",
                desc: "입력된 정보를 바탕으로\n노무 관리 리스크를 분석합니다.",
              },
              {
                icon: Eye,
                title: "진단 결과 확인",
                desc: "현재 노무 리스크 수준과\n필요한 대응 방향을 확인할 수 있습니다.",
              },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-trust-blue-light flex items-center justify-center mb-6 transition-all duration-300 hover:bg-trust-blue group">
                    <step.icon className="w-10 h-10 text-trust-blue transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <p className="text-xs font-semibold text-trust-blue mb-1">{(i + 1).toString()}단계</p>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Diagnosis Result Preview ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="badge-blue">● PREVIEW</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">진단 결과는 이렇게 제공됩니다</h2>
              <p className="text-muted-foreground mt-3">실제 진단 리포트 미리보기</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="max-w-4xl mx-auto rounded-2xl border border-border overflow-hidden shadow-lg">
              {/* 탭: 페이지 이동 없이 미리보기 콘텐츠만 전환 */}
              <div className="flex flex-wrap border-b border-border sm:flex-nowrap" role="tablist" aria-label="진단 미리보기 종류">
                <button
                  type="button"
                  role="tab"
                  aria-selected={previewTab === "labor"}
                  onClick={() => setPreviewTab("labor")}
                  className={`${previewTabBtnBase} ${previewTab === "labor" ? previewTabActive : previewTabIdle}`}
                >
                  ● 노무리스크 진단
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={previewTab === "pay"}
                  onClick={() => setPreviewTab("pay")}
                  className={`${previewTabBtnBase} ${previewTab === "pay" ? previewTabActive : previewTabIdle}`}
                >
                  급여명세서 분석
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={previewTab === "cost"}
                  onClick={() => setPreviewTab("cost")}
                  className={`${previewTabBtnBase} ${previewTab === "cost" ? previewTabActive : previewTabIdle}`}
                >
                  인건비 분석
                </button>
              </div>

              {/* 미리보기 본문 — 탭별 교체 */}
              <div className="p-8 grid md:grid-cols-2 gap-8 bg-surface" role="tabpanel">
                {previewTab === "labor" && (
                  <>
                    <div>
                      <h4 className="font-bold text-foreground mb-4">노무리스크 진단</h4>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        근로기준법, 노동조합법, 산업안전보건법 등 주요 법령에 따른 기업 노무 리스크를 종합 분석합니다.
                      </p>
                      <ul className="space-y-2">
                        {["취업규칙 · 급여 · 휴일", "임금체계 · 4대보험 운영", "근로시간 · 연차 · 퇴직금"].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-trust-blue shrink-0" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/diagnosis/labor-risk" className="btn-primary mt-6 inline-flex text-sm px-6 py-3">
                        노무리스크 진단 시작
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div>
                      <div className="text-center mb-4">
                        <p className="text-sm text-muted-foreground">노무 리스크 점수</p>
                        <div className="text-6xl font-black text-navy mt-2">
                          74<span className="text-2xl text-trust-blue">/100</span>
                        </div>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-4 mb-6">
                        <div className="bg-trust-blue h-4 rounded-full transition-all duration-1000" style={{ width: "74%" }} />
                      </div>
                      <div className="space-y-3">
                        {[
                          { label: "근로계약 및 인사관리", amount: "위반사항", severity: "high" as const },
                          { label: "임금관리(수당 및 퇴직금)", amount: "1,800만원", severity: "high" as const },
                          { label: "근로시간/휴일/휴가", amount: "900만원", severity: "medium" as const },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-sm gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={`w-2 h-2 shrink-0 rounded-full ${item.severity === "high" ? "bg-destructive" : "bg-trust-blue"}`} />
                              <span className="text-foreground">{item.label}</span>
                            </div>
                            <span className="font-semibold text-foreground shrink-0">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {previewTab === "pay" && (
                  <>
                    <div>
                      <h4 className="font-bold text-foreground mb-4">급여명세서 분석</h4>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        임금명세서 필수 기재사항과 급여 항목 구성을 기준으로 현재 급여명세서의 적정성을 점검합니다.
                      </p>
                      <ul className="space-y-2">
                        {["기본급 · 수당 · 상여 구성", "연장/야간/휴일근로 표기", "공제 항목 및 총액 표시"].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-trust-blue shrink-0" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/diagnosis/pay-statement" className="btn-primary mt-6 inline-flex text-sm px-6 py-3">
                        급여명세서 분석 시작
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div>
                      <div className="text-center mb-4">
                        <p className="text-sm text-muted-foreground">급여명세서 점검 결과</p>
                        <p className="text-4xl md:text-5xl font-black text-amber-700 mt-3">보완 필요</p>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-4 mb-6">
                        <div className="h-4 rounded-full bg-amber-500 transition-all duration-500" style={{ width: "58%" }} />
                      </div>
                      <div className="space-y-3">
                        {[
                          { label: "필수 기재항목 누락 여부", amount: "점검", severity: "medium" as const },
                          { label: "수당 계산 기준 표기 여부", amount: "확인", severity: "high" as const },
                          { label: "공제내역 표시 여부", amount: "확인", severity: "medium" as const },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-sm gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={`w-2 h-2 shrink-0 rounded-full ${item.severity === "high" ? "bg-destructive" : "bg-amber-500"}`} />
                              <span className="text-foreground">{item.label}</span>
                            </div>
                            <span className="font-semibold text-foreground shrink-0">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {previewTab === "cost" && (
                  <>
                    <div>
                      <h4 className="font-bold text-foreground mb-4">인건비 분석</h4>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        기본 급여 구조와 근로시간 정보를 바탕으로 기업의 인건비 구성과 추가 비용 발생 가능성을 분석합니다.
                      </p>
                      <ul className="space-y-2">
                        {["기본급 및 고정수당 구조", "연장/야간/휴일근로 비용", "월 인건비 부담 요인"].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-trust-blue shrink-0" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/diagnosis/labor-cost" className="btn-primary mt-6 inline-flex text-sm px-6 py-3">
                        인건비 분석 시작
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div>
                      <div className="text-center mb-4">
                        <p className="text-sm text-muted-foreground">인건비 분석 결과</p>
                        <p className="text-4xl md:text-5xl font-black text-orange-700 mt-3">주의 구간</p>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-4 mb-6">
                        <div className="h-4 rounded-full bg-orange-500 transition-all duration-500" style={{ width: "72%" }} />
                      </div>
                      <div className="space-y-3">
                        {[
                          { label: "연장근로 비용 부담", amount: "높음", severity: "high" as const },
                          { label: "수당 구조 점검 필요", amount: "권장", severity: "medium" as const },
                          { label: "인건비 증가 요인 요약", amount: "다수", severity: "high" as const },
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-sm gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={`w-2 h-2 shrink-0 rounded-full ${item.severity === "high" ? "bg-destructive" : "bg-orange-500"}`} />
                              <span className="text-foreground">{item.label}</span>
                            </div>
                            <span className="font-semibold text-foreground shrink-0">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== Reviews (Swiper: 화살표 + 자동 슬라이드) ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="badge-blue">● TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">진단을 활용한 기업 사례</h2>
          </ScrollReveal>

          <div className="relative mx-auto mt-12 max-w-5xl px-11 sm:px-12 md:px-14">
            {/* 이전/다음 — Swiper Navigation이 클래스로 버튼에 연결됩니다 */}
            <button
              type="button"
              className="diagnosis-testimonials-prev absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-navy shadow-md transition hover:border-[#3d83f5]/35 hover:bg-sky-50/90 md:h-11 md:w-11"
              aria-label="이전 후기"
            >
              <ChevronRight className="h-5 w-5 rotate-180" aria-hidden />
            </button>
            <button
              type="button"
              className="diagnosis-testimonials-next absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-navy shadow-md transition hover:border-[#3d83f5]/35 hover:bg-sky-50/90 md:h-11 md:w-11"
              aria-label="다음 후기"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>

            <Swiper
              modules={[Autoplay, Navigation]}
              navigation={{
                prevEl: ".diagnosis-testimonials-prev",
                nextEl: ".diagnosis-testimonials-next",
              }}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              loop
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 22 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="diagnosis-testimonials-swiper !pb-1"
            >
              {DIAGNOSIS_TESTIMONIALS.map((review, i) => (
                <SwiperSlide key={`${review.industry}-${i}`} className="!h-auto">
                  <div className="testimonial-card flex h-full min-h-[200px] flex-col text-left">
                    <div className="mb-3 flex gap-1">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <Star key={j} className="h-4 w-4 fill-trust-blue text-trust-blue" />
                      ))}
                    </div>
                    <p className="mb-3 text-sm font-semibold text-foreground">{review.industry}</p>
                    <p className="flex-1 text-sm leading-relaxed text-foreground">"{review.text}"</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
};

export default DiagnosisPage;
