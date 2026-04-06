/* ===== 노무법인 가온 - 멤버십 페이지 ===== */
import { Crown, CheckCircle, ArrowRight, Star, BookOpen, Calculator, BarChart3, FileText, Scale } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const MembershipPage = () => {
  return (
    <main>
      <section className="section-dark py-24">
        <div className="container mx-auto px-4 text-center">
          <span className="badge-blue bg-trust-blue/20 text-trust-blue animate-fade-up">● MEMBERSHIP</span>
          <h1 className="text-4xl md:text-5xl font-black mt-6 mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
            실시간으로 업데이트되는
            <br />
            <span className="text-trust-blue">노무·법령 정보</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 mb-10 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
            최신 판례, 법령 개정, 실무 가이드까지 놓치지 마세요.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            {[
              { icon: BookOpen, label: "법령 동향" },
              { icon: Scale, label: "판례 분석" },
              { icon: FileText, label: "실무 가이드" },
              { icon: BarChart3, label: "정책 변경" },
            ].map((tag) => (
              <div key={tag.label} className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground text-sm hover:bg-primary-foreground/10 transition-colors cursor-pointer">
                <tag.icon className="w-4 h-4" />
                {tag.label}
              </div>
            ))}
          </div>
          <button className="btn-primary text-lg px-10 py-5 animate-fade-up" style={{ animationDelay: "0.7s" }}>
            최신 소식 확인하기
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <section className="section-white py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">HR 포스팅 <span className="text-trust-blue">28</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "[노란봉투법] 개정 노조법 시행에 따른 경영 리스크, 어떻게 대응할 것인가?", date: "2026-03-10", views: 1550, tag: "법령 동향" },
              { title: "2026년 육아지원 제도 개편안 안내: 육아기 10시 출근제 및 지원금 인상", date: "2026-03-06", views: 1555, tag: "정책 변경" },
              { title: "[주4.5일제] '실근로시간 단축'과 정부 지원금 100% 활용법", date: "2026-03-05", views: 1549, tag: "실무 가이드" },
              { title: "2026년 최저임금 10,320원으로 인상, 우리 회사 급여구조 이대로 괜찮을까요?", date: "2026-03-05", views: 1548, tag: "정책 변경" },
              { title: "경영성과금, 퇴직금에 포함될까? 삼성전자 vs SK하이닉스 판결 비교", date: "2026-03-05", views: 1550, tag: "판례 분석" },
              { title: "직장 내 괴롭힘 금지법 강화, 2026년 사업주가 꼭 알아야 할 변경사항", date: "2026-03-04", views: 1420, tag: "법령 동향" },
            ].map((post, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="card-lift rounded-2xl overflow-hidden bg-surface border border-border cursor-pointer group h-full flex flex-col">
                  <div className="h-48 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center p-6">
                    <p className="text-primary-foreground/70 font-bold text-sm text-center line-clamp-3">{post.title}</p>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="badge-blue text-xs w-fit mb-3">{post.tag}</span>
                    <h3 className="text-sm font-bold text-foreground group-hover:text-trust-blue transition-colors line-clamp-2 flex-1">{post.title}</h3>
                    <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span>조회 {post.views.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light py-24">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <span className="badge-blue">● CALCULATOR</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
              공인노무사가 만든
              <br />
              <span className="text-trust-blue">정확한 실무계산기</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-10">
              급여·퇴직금·연차, 복잡한 계산을 실수 없이 자동화하세요.
            </p>
          </ScrollReveal>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { icon: Calculator, label: "급여계산" },
              { icon: Calculator, label: "퇴직금계산" },
              { icon: Calculator, label: "연차계산" },
              { icon: Calculator, label: "4대보험" },
            ].map((calc) => (
              <button key={calc.label} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border bg-surface text-sm font-medium text-foreground hover:border-trust-blue hover:text-trust-blue transition-all card-lift">
                <calc.icon className="w-4 h-4" />
                {calc.label}
              </button>
            ))}
          </div>
          <ScrollReveal>
            <button className="btn-primary text-lg px-10 py-5">
              실무계산기 모음 바로가기
              <ArrowRight className="w-5 h-5" />
            </button>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default MembershipPage;
