/* ===== 노무법인 가온 - 스마트 진단 센터 ===== */
import { Shield, BarChart3, FileSearch, CheckCircle, ArrowRight, AlertTriangle, TrendingUp, Eye, Star, ChevronRight } from "lucide-react";
import heroDiagnosis from "@/assets/hero-diagnosis.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";

const DiagnosisPage = () => {
  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroDiagnosis} alt="스마트 진단 시스템" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <span className="badge-blue bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 backdrop-blur-sm animate-fade-up">
            ● SMART DIAGNOSTIC CENTER
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-6 mb-6 text-primary-foreground leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
            보이지 않던 리스크와 기회를
            <br />
            <span className="text-trust-blue">숫자로 확인하세요</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 mb-10 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            AI 기반 스마트 진단으로 기업의 노무 리스크를 정밀하게 분석하고
            맞춤 솔루션을 제공합니다.
          </p>
          <button className="btn-primary text-lg px-10 py-5 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            무료 진단하기
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ===== Proven Results ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="badge-blue">● PROVEN RESULTS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">숫자로 증명된 가치</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">실제 기업 진단 데이터 기반 성과입니다</p>
          </ScrollReveal>
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-12">
            {[
              { value: 1177, unit: "건", label: "누적 진단 수", desc: "진단 완료 기업 수" },
              { value: 0.5, unit: "일", label: "평균 소요일", desc: "빠른 진단 완료" },
              { value: 155, unit: "백만원", label: "절감 총액 평균", desc: "고객 평균 비용 절감" },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="stat-card">
                  <div className="mb-2">
                    <CountUp end={Math.floor(stat.value)} className="counter-value" />
                    <span className="counter-unit">{stat.unit}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Diagnosis Options ===== */}
      <section className="section-light py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="badge-blue">● DIAGNOSIS MENU</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">받고 싶은 진단을 선택하세요</h2>
              <p className="text-muted-foreground mt-3">기업 상황에 맞는 맞춤형 진단을 제공합니다</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: FileSearch,
                tag: "기본",
                title: "인사 제도 전반 리스크\n점검을 원하시나요?",
                desc: "취업규칙, 근로계약서, 임금체계 등 전반적인 노무 리스크를 진단합니다.",
              },
              {
                icon: BarChart3,
                tag: "심화",
                title: "급여 관리가 제대로\n되고 있는지 확인하세요",
                desc: "급여 산정, 연장·야간 수당, 4대보험 등 급여 관련 항목을 정밀 진단합니다.",
              },
              {
                icon: AlertTriangle,
                tag: "긴급",
                title: "노동 사건이 발생했나요?\n긴급 진단이 필요합니다",
                desc: "부당해고, 산재, 노동위원회 등 긴급 사건 발생 시 즉시 대응 방안을 안내합니다.",
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="card-lift rounded-2xl overflow-hidden bg-surface border border-border h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
                    <item.icon className="w-16 h-16 text-trust-blue opacity-50" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="badge-blue text-xs w-fit mb-3">{item.tag}</span>
                    <h3 className="text-lg font-bold text-foreground whitespace-pre-line mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                    <button className="mt-4 text-sm font-semibold text-trust-blue flex items-center gap-1 group">
                      진단하기
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
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
              {/* Tab header */}
              <div className="flex border-b border-border">
                <div className="px-6 py-4 text-sm font-semibold text-trust-blue border-b-2 border-trust-blue bg-trust-blue-light">
                  ● 노무리스크 진단
                </div>
                <div className="px-6 py-4 text-sm text-muted-foreground">급여명세서 분석</div>
                <div className="px-6 py-4 text-sm text-muted-foreground">인건비 분석</div>
              </div>

              {/* Content */}
              <div className="p-8 grid md:grid-cols-2 gap-8 bg-surface">
                <div>
                  <h4 className="font-bold text-foreground mb-4">노무리스크 진단</h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    근로기준법, 노동조합법, 산업안전보건법 등 주요 법령에 따른 노무 리스크를 종합 분석합니다.
                  </p>
                  <ul className="space-y-2">
                    {["취업규칙 · 급여 · 휴일일", "임금체계 · 4대보험 운영", "근로시간 · 연차 · 퇴직금"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-trust-blue" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="btn-primary mt-6 text-sm px-6 py-3">
                    노무리스크 진단 시작
                    <ArrowRight className="w-4 h-4" />
                  </button>
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
                      { label: "근로계약 및 인사관리", amount: "위반사항", severity: "high" },
                      { label: "임금관리(수당 및 퇴직금)", amount: "1,800만원", severity: "high" },
                      { label: "근로시간/휴일/휴가", amount: "900만원", severity: "medium" },
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${item.severity === "high" ? "bg-destructive" : "bg-trust-blue"}`} />
                          <span className="text-foreground">{item.label}</span>
                        </div>
                        <span className="font-semibold text-foreground">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== 3 Steps ===== */}
      <section className="section-light py-24">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="badge-blue">● HOW IT WORKS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">3분이면 충분합니다</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">간단한 3단계로 정밀 노무 진단을 받아보세요</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
            {[
              { icon: FileSearch, title: "기본 정보 입력", desc: "회사 정보를 간단히 입력합니다" },
              { icon: BarChart3, title: "실시간 분석", desc: "AI가 즉시 정밀 분석합니다" },
              { icon: Eye, title: "즉시 리포트 확인", desc: "맞춤 진단 리포트를 바로 확인하세요" },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-trust-blue-light flex items-center justify-center mb-6 transition-all duration-300 hover:bg-trust-blue group">
                    <step.icon className="w-10 h-10 text-trust-blue transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Reviews ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="badge-blue">● TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">실제 사용자 후기</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
            {[
              { text: "진단 결과가 너무 정확해서 놀랐습니다. 우리 회사의 급여 체계 문제를 바로 잡을 수 있었어요.", name: "김○○ 대표", company: "IT업 / 30명" },
              { text: "무료 진단이라 가벼운 마음으로 시작했는데, 결과보고서가 매우 전문적이었습니다.", name: "박○○ 이사", company: "제조업 / 120명" },
              { text: "덕분에 근로감독 대비를 철저히 할 수 있었습니다. 강력 추천합니다.", name: "최○○ 대표", company: "서비스업 / 50명" },
            ].map((review, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="testimonial-card text-left h-full flex flex-col">
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map(j => <Star key={j} className="w-4 h-4 fill-trust-blue text-trust-blue" />)}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1">"{review.text}"</p>
                  <div className="mt-4 pt-3 border-t border-border">
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.company}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DiagnosisPage;
