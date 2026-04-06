/* ===== 노무법인 가온 - 컨설팅 센터 ===== */
import { Shield, FileText, Users, Scale, Building, Award, CheckCircle, ArrowRight, ChevronRight, Star } from "lucide-react";
import heroConsulting from "@/assets/hero-consulting.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const ConsultingPage = () => {
  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroConsulting} alt="컨설팅 센터" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <span className="badge-blue bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 backdrop-blur-sm animate-fade-up">
            ● EXPERT CONSULTING CENTER
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-6 mb-6 text-primary-foreground leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
            임시방편이 아닌
            <br />
            <span className="text-trust-blue">제대로 된 체계</span>가 필요하신가요?
          </h1>
          <p className="text-lg text-primary-foreground/70 mb-10 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            전문가가 직접 진단하고, 맞춤형 솔루션을 제시합니다
          </p>
          <button className="btn-primary text-lg px-10 py-5 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            컨설팅 영역 보기
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ===== Consulting Areas ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">전문 컨설팅 영역</h2>
              <p className="text-muted-foreground mt-3">사업장 특성과 니즈에 맞는 컨설팅을 선택하세요</p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: FileText, title: "노무체계정비 컨설팅", desc: "취업규칙, 근로계약서, 임금체계, 인사규정 등 노무 전반 정비", tag: "BEST" },
              { icon: Users, title: "HR 컨설팅", desc: "인사제도, 평가·보상체계, 조직문화 진단 및 개선 방안 제시" },
              { icon: Shield, title: "중대재해처벌법 대응", desc: "안전보건관리체계 구축 및 정기 점검·컴플라이언스 컨설팅" },
              { icon: Scale, title: "도급/파견 컨설팅", desc: "적법한 도급·파견 구조 설계 및 리스크 사전 점검" },
              { icon: Building, title: "ESG 진단 및 구축", desc: "ESG 기준에 맞는 근로환경 및 거버넌스 체계 구축 컨설팅" },
              { icon: Award, title: "고용노동부 컨설팅", desc: "정부지원사업 연계 및 근로감독 대응 전략 수립" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="card-lift rounded-2xl p-8 bg-surface border border-border h-full relative group cursor-pointer">
                  {item.tag && (
                    <span className="absolute top-4 right-4 badge-blue text-xs px-3 py-1">{item.tag}</span>
                  )}
                  <div className="w-14 h-14 rounded-xl bg-trust-blue-light flex items-center justify-center mb-6 transition-colors group-hover:bg-trust-blue">
                    <item.icon className="w-7 h-7 text-trust-blue transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  <button className="mt-6 text-sm font-semibold text-trust-blue flex items-center gap-1 group/btn">
                    자세히 보기
                    <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Consulting Process ===== */}
      <section className="section-light py-24">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">컨설팅 프로세스</h2>
            <p className="text-muted-foreground mb-16">4단계 체계적 프로세스로 최적의 결과를 만듭니다</p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { title: "무료 상담", items: ["현황 파악", "목표 설정"] },
              { title: "정밀 진단", items: ["리스크 분석", "문서 검토"] },
              { title: "맞춤 설계 & 실행", items: ["제도 설계", "직접 실행"] },
              { title: "지속 관리", items: ["정기 점검", "후속 지원"] },
            ].map((step, i) => (
              <ScrollReveal key={i} delay={i * 120}>
                <div className="card-lift rounded-2xl p-6 bg-surface border border-border text-center">
                  <div className="w-10 h-10 mx-auto rounded-xl bg-navy text-primary-foreground flex items-center justify-center font-bold text-sm mb-4">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-foreground mb-4">{step.title}</h4>
                  <ul className="space-y-2">
                    {step.items.map((item, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-center gap-2 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-trust-blue" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why Gaon Consulting ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">왜 가온 컨설팅인가?</h2>
              <p className="text-muted-foreground mt-3">풍부한 경험과 전문성으로 최고의 서비스를 제공합니다</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { num: "01", title: "전문직 통합 컨설팅 팀", desc: "노무사·변호사·세무사 등 전문가 팀이 종합적으로 자문합니다" },
              { num: "02", title: "AI 진단시스템 구축", desc: "최신 기술을 활용한 정밀 진단으로 정확한 리스크를 파악합니다" },
              { num: "03", title: "풍부한 컨설팅 경험", desc: "수백 개 기업의 컨설팅 노하우로 최적의 솔루션을 제공합니다" },
              { num: "04", title: "사후관리 지원", desc: "컨설팅 이후 정기적인 사후 관리와 지속 지원을 제공합니다" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="card-lift rounded-2xl p-6 bg-surface border border-border">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-trust-blue text-primary-foreground font-bold text-sm mb-4">{item.num}</span>
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Client Reviews ===== */}
      <section className="section-light py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">고객 후기</h2>
              <p className="text-muted-foreground mt-3">다양한 업종에서 검증된 컨설팅 성과입니다</p>
            </div>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { name: "㈜OO 인사팀", type: "제조업 / 직원 200명", text: "노무체계 전면 재정비를 통해 노사분쟁 리스크가 크게 줄었습니다. 체계적인 접근이 인상적이었습니다." },
              { name: "㈜OO 번역사무소", type: "서비스업 / 직원 40명", desc: "우리회사 사정에 맞는 맞춤형 솔루션을 제시해 주셔서 실질적인 도움이 되었습니다.", text: "우리회사 사정에 맞는 맞춤형 솔루션을 제시해 주셔서 실질적인 도움이 되었습니다." },
            ].map((review, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="testimonial-card flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-full bg-trust-blue-light flex items-center justify-center shrink-0">
                    <span className="text-trust-blue font-bold text-lg">{review.name[0]}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-foreground">{review.name}</h4>
                      <span className="text-xs text-muted-foreground">{review.type}</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">"{review.text}"</p>
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

export default ConsultingPage;
