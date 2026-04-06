/* ===== 노무법인 가온 - 사건 대응 센터 ===== */
import { Shield, Scale, AlertTriangle, FileText, Users, CheckCircle, ArrowRight, Phone, TrendingDown, Star } from "lucide-react";
import heroCase from "@/assets/hero-case.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";

const CaseResponsePage = () => {
  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCase} alt="사건 대응" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          {/* Urgent banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/20 text-destructive border border-destructive/30 text-sm font-medium mb-6 animate-fade-up backdrop-blur-sm">
            <Phone className="w-4 h-4" />
            긴급 상담 가능 · 24시간 핫라인
          </div>

          <span className="badge-blue bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 backdrop-blur-sm animate-fade-up block w-fit mx-auto">
            ● CASE RESPONSE CENTER
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-6 mb-6 text-primary-foreground leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
            사건, 사고
            <br />
            노무법인 가온은 <span className="text-trust-blue">해결합니다.</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            노무 사건 발생 시 즉각 대응하고
            <br />
            최적의 결과를 이끌어냅니다.
          </p>

          {/* Hero Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            {[
              { value: "92", unit: "%", label: "승소율" },
              { value: "24", unit: "시간", label: "초동 대응" },
              { value: "70", unit: "%+", label: "합의 도출률" },
              { value: "2", unit: "급", label: "전문노무사팀" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-black text-primary-foreground">
                  {stat.value}<span className="text-trust-blue text-lg ml-1">{stat.unit}</span>
                </p>
                <p className="text-primary-foreground/60 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <button className="btn-primary text-lg px-10 py-5 animate-fade-up" style={{ animationDelay: "0.7s" }}>
            지금 상담하기
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ===== Why Different ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="badge-blue">● WHY GAON</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">가온이 다른 이유</h2>
              <p className="text-muted-foreground mt-3">노무 사건 전문 법인으로서의 차별화된 역량</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Shield,
                title: "AI 기반 판례 검색 시스템",
                desc: "최신 판례·결정례를 AI로 분석하여 가장 유리한 전략을 수립합니다",
                features: ["실시간 판례 분석", "유사 사건 매칭", "승소율 예측 지원"],
              },
              {
                icon: Users,
                title: "전담팀 체계적 운영체계",
                desc: "각 사건에 전담 노무사를 배정하여 집중적으로 대응합니다",
                features: ["전담노무사 배정", "사건별 대응 매뉴얼", "고객 전용 핫라인"],
              },
              {
                icon: Scale,
                title: "확실히 결과를 만듭니다",
                desc: "풍부한 경험과 전문성으로 최적의 결과를 도출합니다",
                features: ["실전 경험 풍부", "협상 전략 수립", "단계별 대응 체계"],
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="card-lift rounded-2xl p-8 bg-surface border border-border h-full">
                  <div className="w-14 h-14 rounded-xl bg-trust-blue-light flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-trust-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                        <CheckCircle className="w-4 h-4 text-trust-blue shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Case Types ===== */}
      <section className="section-light py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="badge-blue">● CASES</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">주요 대응 사건</h2>
              <p className="text-muted-foreground mt-3">노무 분야의 모든 사건에 대응합니다</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                icon: Scale,
                title: "노동 사건",
                items: ["부당해고 구제 신청", "노조/단체교섭 분쟁", "직장 내 괴롭힘·성희롱", "임금체불 분쟁", "산업재해 보상"],
              },
              {
                icon: AlertTriangle,
                title: "업무상 질병·산재보상",
                items: ["산업재해 신청 대행", "업무상 질병 인정 소송", "장해등급 이의신청", "요양급여 관련 분쟁", "산재보상 자문"],
              },
            ].map((category, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className="card-lift rounded-2xl p-8 bg-surface border border-border">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-trust-blue-light flex items-center justify-center">
                      <category.icon className="w-7 h-7 text-trust-blue" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {category.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-trust-blue shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Response Process ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="badge-blue">● PROCESS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">대응 프로세스</h2>
            <p className="text-muted-foreground">정교한 4단계로 최적의 결과를 만듭니다</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            {[
              { icon: Phone, title: "긴급접수", desc: "24시간 핫라인 접수" },
              { icon: FileText, title: "사건 분석", desc: "증거 확보 및 전략 수립" },
              { icon: Scale, title: "전략적 대응", desc: "최적 전략 실행" },
              { icon: Shield, title: "결과 도출", desc: "최선의 결과 확보" },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-trust-blue-light flex items-center justify-center mb-4 transition-all duration-300 hover:bg-trust-blue group">
                    <step.icon className="w-10 h-10 text-trust-blue transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1">{step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Results ===== */}
      <section className="section-light py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="badge-blue">● RESULTS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">실제 성과 사례</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
            {[
              { tag: "부당해고", title: "부당해고 구제신청", details: [["사건유형", "부당해고"], ["관할", "중앙노동위원회"], ["결과", "해고 무효 + 임금 보전"]], highlight: "88% 합리적 합의 달성" },
              { tag: "산재", title: "업무상 질병 산재신청", details: [["사건유형", "업무상 질병"], ["관할", "근로복지공단"], ["결과", "산재 인정"]], highlight: "합의금액 2,500만원" },
            ].map((c, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="card-lift rounded-2xl p-6 bg-surface border border-border">
                  <span className="badge-blue text-xs mb-4">{c.tag}</span>
                  <h3 className="text-lg font-bold text-foreground mb-4">{c.title}</h3>
                  <div className="space-y-2 mb-4">
                    {c.details.map(([label, value], j) => (
                      <div key={j} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-trust-blue-light text-center">
                    <p className="text-sm font-bold text-trust-blue">{c.highlight}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Success metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: 23, unit: "%", label: "평균 승소율" },
              { value: 18, unit: "%", label: "복직 달성률" },
              { value: 24, unit: "%", label: "합의 평균율" },
              { value: 1, unit: "인", label: "전담 노무사 배정" },
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="stat-card">
                  <CountUp end={stat.value} className="counter-value text-3xl" />
                  <span className="counter-unit text-lg">{stat.unit}</span>
                  <p className="text-xs text-muted-foreground mt-2">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="badge-blue">● REVIEWS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">실제 의뢰인 후기</h2>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { text: "부당해고 당했을 때 정말 막막했는데, 가온 노무사님이 차근차근 대응 전략을 세워주셔서 결국 복직할 수 있었습니다.", name: "이○○ 님", type: "부당해고 사건" },
              { text: "산재 신청이 반려됐을 때 포기할 뻔했는데, 이의신청을 도와주셔서 산재 인정을 받았습니다.", name: "김○○ 님", type: "산재 보상 사건" },
              { text: "임금체불 문제로 오랫동안 고민했는데, 빠르게 해결해 주셔서 감사합니다. 정말 전문가다운 대응이었습니다.", name: "박○○ 님", type: "임금체불 사건" },
              { text: "직장 내 괴롭힘으로 힘들었는데, 법적 대응부터 심리 상담 연결까지 케어해 주셔서 큰 힘이 됐습니다.", name: "최○○ 님", type: "직장 내 괴롭힘" },
              { text: "노동위원회 심판까지 동행해 주셔서 정말 든든했습니다. 혼자였으면 절대 못했을 거예요.", name: "정○○ 님", type: "노동위원회 사건" },
              { text: "급여 문제로 퇴사 후 연락드렸는데, 밀린 임금 전액을 받을 수 있게 도와주셨습니다.", name: "한○○ 님", type: "임금 분쟁" },
            ].map((review, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="testimonial-card h-full flex flex-col">
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map(j => <Star key={j} className="w-4 h-4 fill-trust-blue text-trust-blue" />)}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1">"{review.text}"</p>
                  <div className="mt-4 pt-3 border-t border-border">
                    <p className="text-sm font-semibold">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.type}</p>
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

export default CaseResponsePage;
