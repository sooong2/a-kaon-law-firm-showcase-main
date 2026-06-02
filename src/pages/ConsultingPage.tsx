/* ===== 노무법인 가온 - 컨설팅 센터 ===== */
import { Link } from "react-router-dom";
import { Shield, FileText, Users, Scale, Building, Award, CheckCircle, ArrowRight, ChevronRight, Star } from "lucide-react";
import heroHandshake from "@/assets/악수.jpg";
import heroHome from "@/assets/hero-home.jpg";
import heroCase from "@/assets/hero-case.jpg";
import heroCorporate from "@/assets/hero-corporate.jpg";
import ScrollReveal from "@/components/ScrollReveal";

const ConsultingPage = () => {
  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="relative min-h-[550px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroHandshake} alt="컨설팅 센터" className="w-full h-full object-cover" />
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
              {
                icon: FileText,
                title: "노무체계정비 컨설팅",
                desc: "취업규칙, 근로계약서, 임금체계, 인사규정 등 노무 전반 정비",
                tag: "BEST",
                to: "/service/labor-system",
              },
              {
                icon: Users,
                title: "HR 컨설팅",
                desc: "인사제도, 평가·보상체계, 조직문화 진단 및 개선 방안 제시",
                to: "/service/hr-consulting",
              },
              {
                icon: Shield,
                title: "중대재해처벌법 대응",
                desc: "안전보건관리체계 구축 및 정기 점검·컴플라이언스 컨설팅",
                to: "/service/serious-accident",
              },
              {
                icon: Scale,
                title: "도급/파견 컨설팅",
                desc: "적법한 도급·파견 구조 설계 및 리스크 사전 점검",
                to: "/service/dispatch-consulting",
              },
              {
                icon: Building,
                title: "ESG 진단 및 구축",
                desc: "ESG 기준에 맞는 근로환경 및 거버넌스 체계 구축 컨설팅",
                to: "/service/esg",
              },
              {
                icon: Award,
                title: "고용노동부 컨설팅",
                desc: "정부지원사업 연계 및 근로감독 대응 전략 수립",
                to: "/service/ministry-consulting",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.to} delay={i * 80}>
                <div className="card-lift relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface group">
                  {/** 카드 하단 블루 그라데이션 (장식) */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#3d83f5]/20 via-sky-400/10 to-transparent mix-blend-multiply"
                    aria-hidden
                  />
                  <div className="relative z-10 flex flex-1 flex-col p-8">
                    {item.tag && (
                      <span className="absolute top-4 right-4 badge-blue text-xs px-3 py-1">{item.tag}</span>
                    )}
                    <div className="w-14 h-14 rounded-xl bg-trust-blue-light flex items-center justify-center mb-6 transition-colors group-hover:bg-trust-blue">
                      <item.icon className="w-7 h-7 text-trust-blue transition-colors group-hover:text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                    <Link
                      to={item.to}
                      className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-trust-blue transition-colors hover:text-trust-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-trust-blue/40 focus-visible:ring-offset-2 rounded-sm group/btn"
                    >
                      자세히 보기
                      <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" aria-hidden />
                    </Link>
                  </div>
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

          {(() => {
            const steps = [
              { no: "01", title: "무료 상담", items: ["현황 파악", "목표 설정"] },
              { no: "02", title: "정밀 진단", items: ["리스크 분석", "문서 검토"] },
              { no: "03", title: "맞춤 설계 & 실행", items: ["제도 설계", "직접 실행"] },
              { no: "04", title: "지속 관리", items: ["정기 점검", "후속 지원"] },
            ];

            return (
              <div className="mx-auto max-w-6xl">
                {/** 데스크톱/태블릿: 4열 + 연결 라인(화살표 느낌) */}
                <div className="relative hidden md:grid md:grid-cols-4 md:gap-10">
                  {steps.map((step, i) => (
                    <ScrollReveal key={step.no} delay={i * 120}>
                      <div className="relative min-w-0 text-left">
                        {/** 상단 바(고정 높이): 01 + 단계명 + 화살표 (텍스트와 겹치지 않도록 분리) */}
                        <div className="relative flex h-12 items-center gap-3 pr-10">
                          <span className="text-xs font-semibold tracking-widest text-muted-foreground">{step.no}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-[#3d83f5]" aria-hidden />
                          <span className="min-w-0 truncate text-sm font-semibold text-foreground">{step.title}</span>

                          {/** 진행 화살표 (마지막 제외) */}
                          {i !== steps.length - 1 && (
                            <div className="pointer-events-none absolute right-0 top-1/2 flex w-32 -translate-y-1/2 items-center justify-end">
                              <span className="h-[2px] w-full bg-gradient-to-r from-[#3d83f5]/25 via-[#3d83f5]/55 to-[#3d83f5]/55" />
                              <span className="-ml-1 h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-[#3d83f5]/55" />
                            </div>
                          )}
                        </div>

                        {/** 본문: 기존 내용 그대로(아이템 리스트) */}
                        <div className="mt-3">
                          <h4 className="text-lg font-bold leading-tight text-[#3d6fa8]">{step.items[0]}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.items[1]}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>

                {/** 모바일: 세로 스택 (좌측 포인트 + 연결선) */}
                <div className="md:hidden">
                  <div className="mx-auto max-w-xl">
                    {steps.map((step, i) => (
                      <ScrollReveal key={step.no} delay={i * 100}>
                        <div className="relative pl-10 pb-8 text-left">
                          {/** 세로 연결선 (마지막 제외) */}
                          {i !== steps.length - 1 && (
                            <div className="pointer-events-none absolute left-[0.9rem] top-6 h-full w-px bg-border/70" aria-hidden />
                          )}
                          <div className="pointer-events-none absolute left-3 top-1.5 h-3 w-3 rounded-full bg-[#3d83f5]" aria-hidden />

                          <p className="text-xs font-semibold tracking-widest text-muted-foreground">{step.no}</p>
                          <p className="mt-1 text-sm font-semibold text-foreground">{step.title}</p>

                          <div className="mt-4 rounded-2xl border border-border bg-surface p-5 card-lift">
                            <h4 className="text-base font-bold text-[#3d6fa8] leading-snug">
                              {step.items[0]}
                            </h4>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                              {step.items[1]}
                            </p>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
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
          <div className="grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
            {[
              { num: "01", title: "전문직 통합 컨설팅 팀", desc: "노무사·변호사·세무사 등 전문가 팀이 종합적으로 자문합니다", img: heroCorporate },
              { num: "02", title: "AI 진단시스템 구축", desc: "최신 기술을 활용한 정밀 진단으로 정확한 리스크를 파악합니다", img: heroHome },
              { num: "03", title: "풍부한 컨설팅 경험", desc: "수백 개 기업의 컨설팅 노하우로 최적의 솔루션을 제공합니다", img: heroHandshake },
              { num: "04", title: "사후관리 지원", desc: "컨설팅 이후 정기적인 사후 관리와 지속 지원을 제공합니다", img: heroCase },
            ].map((item, i) => (
              <ScrollReveal key={item.num} delay={i * 100}>
                <article className="card-lift group relative overflow-hidden rounded-3xl border border-border bg-surface min-h-[240px] sm:min-h-[260px]">
                  {/** 배경 이미지 (추후 교체용: 지금은 임시 이미지) */}
                  <img
                    src={item.img}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    aria-hidden
                  />

                  {/** 오버레이: 사이트 톤에 맞게 네이비/블루 계열로 통일 */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/55 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-0 bg-black/10" aria-hidden />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(61,131,245,0.25),transparent_55%)]" aria-hidden />

                  {/** 콘텐츠 */}
                  <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-7">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/12 text-white font-bold text-sm backdrop-blur-sm ring-1 ring-white/15">
                        {item.num}
                      </span>
                      <h3 className="min-w-0 text-lg sm:text-xl font-bold text-white leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-[0.9375rem] leading-relaxed text-white/80 break-keep">
                      {item.desc}
                    </p>
                  </div>
                </article>
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
              <span className="badge-blue">● REVIEWS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">실제 사용자 후기</h2>
              <p className="text-muted-foreground mt-3">1,000여 기업이 가온과 함께하고 있습니다</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                stars: 5,
                text: "급여 관련 문제가 생길 때마다 빠르게 대응해주셔서 큰 도움이 됩니다. 매달 리포트도 꼼꼼하게 보내주세요.",
                name: "김○○ 대표",
                company: "IT 스타트업 / 직원 30명",
              },
              {
                stars: 5,
                text: "노무 리스크 진단 후 취업규칙을 전면 개정했는데, 직원들 만족도가 크게 올라갔습니다.",
                name: "박○○ 인사팀장",
                company: "제조업 / 직원 150명",
              },
              {
                stars: 5,
                text: "중대재해처벌법 대응이 막막했는데, 가온에서 체계적으로 안내해주셔서 안심이 됩니다.",
                name: "이○○ 대표",
                company: "건설업 / 직원 80명",
              },
              {
                stars: 5,
                text: "사건이 생겼을 때 정말 빠르게 움직여 주셨어요. 24시간 핫라인이 있어서 마음이 든든합니다.",
                name: "최○○ 대표",
                company: "유통업 / 직원 45명",
              },
              {
                stars: 5,
                text: "노무법인 여러 곳과 비교했는데, 가온이 가장 체계적이고 보고서 품질이 좋습니다.",
                name: "정○○ 경영지원팀장",
                company: "서비스업 / 직원 200명",
              },
              {
                stars: 5,
                text: "매월 정기 자문으로 인사 관리에 자신감이 생겼습니다. 항상 감사합니다.",
                name: "한○○ 대표",
                company: "마케팅 에이전시 / 직원 25명",
              },
            ].map((review, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="testimonial-card h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-trust-blue text-trust-blue" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1">"{review.text}"</p>
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-foreground">{review.name}</p>
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

export default ConsultingPage;
