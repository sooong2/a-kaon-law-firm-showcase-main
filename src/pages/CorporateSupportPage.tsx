/* ===== 노무법인 가온 - 기업 지원 센터 ===== */
import { Shield, CheckCircle, ArrowRight, Calendar, FileText, Users, Briefcase, Clock, ChevronRight } from "lucide-react";
import heroCorporate from "@/assets/hero-corporate.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const CorporateSupportPage = () => {
  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroCorporate} alt="기업 지원" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <span className="badge-blue bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 backdrop-blur-sm animate-fade-up">
            ● Workplace Management Center
          </span>
          <h1 className="text-4xl md:text-5xl font-black mt-6 mb-6 text-primary-foreground leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
            노무는 가온에게,
            <br />
            대표님은 <span className="text-trust-blue">안심하고 사업하세요</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 mb-10 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            매달 체계적인 노무관리로 리스크를 원천 차단합니다
          </p>
          <button className="btn-primary text-lg px-10 py-5 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            상담 신청하기
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ===== Pain Points ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">이런 고민 있으신가요</h2>
              <p className="text-muted-foreground mt-3">많은 대표님들이 겪고 계신 고민입니다</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              "급여, 시간외 수당 문제가 생길 때 어떻게 대처해야 할지 모르겠다",
              "노동부 점검이 나오면 문제가 없는지 불안하다",
              "직원이 갑자기 퇴사해서 인수인계가 안 된다",
              "직장 내 괴롭힘·성희롱 사건이 발생했는데 어떻게 처리해야 하는지 모른다",
              "취업규칙이나 근로계약서가 제대로 되어있는지 확인이 필요하다",
              "노무사에게 맡기고 싶지만 비용이 부담된다",
            ].map((pain, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="card-lift rounded-xl p-5 bg-surface border border-border flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-trust-blue shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground leading-relaxed">{pain}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Monthly Management Timeline ===== */}
      <section className="section-light py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">매월 이렇게 관리해드립니다</h2>
              <p className="text-muted-foreground mt-3">매달 체계적인 프로세스로 완벽하게 관리합니다</p>
            </div>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { day: "매월 1일", title: "급여 체크 사항 안내", desc: "급여 산정 시 주의사항과 변경사항을 사전 안내합니다" },
              { day: "매월 5일", title: "급여명세서 발송", desc: "정확한 급여명세서를 작성하여 전 직원에게 발송합니다" },
              { day: "매월 10일", title: "4대보험 신고", desc: "입퇴사 및 변경사항에 따른 4대보험을 신속 처리합니다" },
              { day: "매월 15일", title: "월간 법률동향 발송", desc: "최신 노동법 개정사항 및 판례를 정리하여 발송합니다" },
              { day: "매월 20일", title: "사회보험료 계산 제공", desc: "정확한 사회보험료를 계산하여 안내합니다" },
              { day: "매월 말일", title: "월간 리포트 발송", desc: "한 달 동안의 노무관리 현황을 종합 보고합니다" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="flex gap-6 items-start group">
                  <div className="flex flex-col items-center">
                    <div className="timeline-dot">{i + 1}</div>
                    {i < 5 && <div className="w-0.5 h-12 bg-border mt-2" />}
                  </div>
                  <div className="card-lift rounded-xl p-5 bg-surface border border-border flex-1 group-hover:border-trust-blue/30">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge-blue text-xs">{item.day}</span>
                      <h4 className="font-bold text-foreground">{item.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">플랜 추천</h2>
              <p className="text-muted-foreground mt-3">기업 규모에 맞는 최적의 플랜을 선택하세요</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              {
                name: "STANDARD",
                price: "20",
                unit: "만원~",
                desc: "10인 이상 ~ 규모 중소기업에 최적",
                features: ["월 1회 전담노무사 자문 회의", "취업 규칙/규정 점검 및 정비", "급여 대장 검토 및 자문", "4대보험 신고 대행", "월간 리포트 발행", "채팅/이메일 상시 질의응답"],
                featured: false,
              },
              {
                name: "PREMIUM",
                price: "200",
                unit: "만원~",
                desc: "50인 이상 · 다사업장 · 복잡한 인사구조 대응",
                features: ["Standard의 모든 서비스 포함", "월 4회 이상 방문/화상 자문", "노무감사 및 컴플라이언스 관리", "HR/전략 컨설팅 + 근로감독 대응 포함", "전사 인사관리 시스템 운영 지원"],
                featured: true,
              },
            ].map((plan, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className={`pricing-card ${plan.featured ? "featured" : ""}`}>
                  <span className="text-xs font-bold text-trust-blue">{plan.name}</span>
                  <div className="mt-4 mb-2">
                    <span className="text-sm text-muted-foreground">월</span>
                    <span className="text-5xl font-black text-navy ml-1">{plan.price}</span>
                    <span className="text-lg font-bold text-trust-blue">{plan.unit}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-trust-blue shrink-0 mt-0.5" />
                        <span className="text-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={plan.featured ? "btn-primary w-full" : "btn-outline w-full"}>
                    상담 신청하기
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why Gaon ===== */}
      <section className="section-light py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">왜 가온인가요</h2>
              <p className="text-muted-foreground mt-3">대표님이 사업에만 집중할 수 있도록 가온이 지킵니다</p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              { num: "01", title: "AI 기반 리스크 관리", desc: "최신 AI 기술로 리스크를 사전 탐지합니다" },
              { num: "02", title: "종합 전문가 네트워크", desc: "노무사·변호사·세무사 통합 자문 체계 운영" },
              { num: "03", title: "전담 노무사 배정", desc: "한 분의 전담 노무사가 지속적으로 케어합니다" },
              { num: "04", title: "체계적인 관리 시스템", desc: "클라우드 기반 인사노무 자료 관리 시스템 제공" },
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
    </main>
  );
};

export default CorporateSupportPage;
