/* ===== 노무법인 가온 - 노무사 소개 ===== */
import { GraduationCap, Briefcase, Award, Phone, Mail, ChevronDown } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import heroBanner from "@/assets/배너3.jpg";
import teamBg from "@/assets/1384.jpg";
import imgKim from "@/assets/김동훈노무사.png";
import imgLee from "@/assets/이현택노무사.png";
import imgLeeJ from "@/assets/이지현노무사.png";
import imgChoi from "@/assets/최사랑노무사.png";
import { AboutCoverHero, AboutSectionHeader, AboutCtaBanner, coverScrollSectionClass } from "./aboutShared";

type LawyerProfile = {
  id: string;
  name: string;
  role: string;
  photo: string;
  specialties: string[];
  summary: string;
  education: string[];
  career: string[];
  licenses: string[];
};

const lawyers: LawyerProfile[] = [
  {
    id: "kim",
    name: "김동훈",
    role: "대표 공인노무사",
    photo: imgKim,
    specialties: ["기업 노무 자문", "취업규칙·인사규정", "노동청 대응"],
    summary: "중소·중견기업 노무 체계 구축과 노동 분쟁 예방 분야 15년 이상의 실무 경험을 보유하고 있습니다.",
    education: ["고려대학교 경영학과 학사", "한국노동연구원 HRD 석사과정 수료"],
    career: [
      "現 노무법인 가온 대표 공인노무사",
      "前 ○○그룹 인사노무팀 노무 자문 (외부)",
      "前 대한노무사회 기업노무위원회 위원",
      "기업 취업규칙·인사제도 정비 200건+",
    ],
    licenses: ["공인노무사", "직업능력개발훈련교사"],
  },
  {
    id: "lee",
    name: "이현택",
    role: "공인노무사",
    photo: imgLee,
    specialties: ["기업 자문", "징계·해고", "노동 사건"],
    summary: "기업 자문과 노동 사건 대응을 병행하며, 징계·해고 절차 및 부당해고 분쟁에 특화된 자문을 제공합니다.",
    education: ["연세대학교 법학과 학사", "법무법인 ○○ 노동법 연수 수료"],
    career: [
      "現 노무법인 가온 공인노무사",
      "前 서울지방노동위원회 조정위원 보조",
      "前 ○○노무법인 기업자문팀 팀장",
      "부당해고·징계 분쟁 대응 150건+",
    ],
    licenses: ["공인노무사"],
  },
  {
    id: "leej",
    name: "이지현",
    role: "공인노무사",
    photo: imgLeeJ,
    specialties: ["급여·4대보험", "근로시간", "연말정산"],
    summary: "급여 산정, 4대보험 신고, 근로시간 관리 등 급여 실무 전반에 대한 정밀 자문과 아웃소싱을 담당합니다.",
    education: ["성균관대학교 경제학과 학사", "세무사 시험 2차 합격 (노무 연계)"],
    career: [
      "現 노무법인 가온 공인노무사",
      "前 ○○회계법인 HR 아웃소싱팀 자문",
      "前 중견 제조업체 급여·인사팀 실무 (10년)",
      "급여·4대보험 아웃소싱 기업 120곳+",
    ],
    licenses: ["공인노무사"],
  },
  {
    id: "choi",
    name: "최사랑",
    role: "공인노무사",
    photo: imgChoi,
    specialties: ["노동 사건", "임금체불", "직장 내 괴롭힘"],
    summary: "임금체불, 직장 내 괴롭힘, 노동청 조사 대응 등 분쟁·조사 영역에서 신속한 초동 대응을 지원합니다.",
    education: ["이화여자대학교 사회학과 학사", "고용노동부 노동법 교육과정 이수"],
    career: [
      "現 노무법인 가온 공인노무사",
      "前 ○○지방노동청 출신 노무사 (자문)",
      "前 근로복지공단 HR 컨설팅 참여",
      "노동청 조사·감독 대응 80건+",
    ],
    licenses: ["공인노무사", "산업안전보건교육기관 강사"],
  },
];

const strengths = [
  { title: "분야별 전문성", desc: "자문·급여·사건·조사 대응 등 영역별 전담 노무사가 협업합니다." },
  { title: "전담 배정 체계", desc: "고객사별 전담 노무사 1인이 단일 창구로 지속 소통합니다." },
  { title: "실무 중심 자문", desc: "법령 해석을 넘어 현장 적용 가능한 실행 방안을 제시합니다." },
  { title: "전문가 네트워크", desc: "변호사·세무사 등 유관 전문가와 연계해 복합 이슈에 대응합니다." },
];

function LawyerCard({ lawyer, index }: { lawyer: LawyerProfile; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const reversed = index % 2 === 1;

  return (
    <ScrollReveal delay={index * 80}>
      <article className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_16px_44px_-28px_rgba(15,23,42,0.15)]">
        <div className={`grid md:grid-cols-5 ${reversed ? "md:[direction:rtl]" : ""}`}>
          {/* 사진 */}
          <div className={`relative md:col-span-2 ${reversed ? "md:[direction:ltr]" : ""}`}>
            <div className="aspect-[4/5] max-h-[420px] overflow-hidden bg-slate-100 md:max-h-none md:min-h-full">
              <img src={lawyer.photo} alt={`${lawyer.name} ${lawyer.role}`} className="h-full w-full object-cover object-top" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-transparent" />
          </div>

          {/* 프로필 */}
          <div className={`flex flex-col justify-center p-6 md:col-span-3 md:p-8 lg:p-10 ${reversed ? "md:[direction:ltr]" : ""}`}>
            <div className="flex flex-wrap items-center gap-2">
              {lawyer.specialties.map((tag) => (
                <span key={tag} className="rounded-full bg-trust-blue-light px-3 py-1 text-xs font-semibold text-trust-blue">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="mt-4 text-2xl font-black text-navy md:text-3xl">{lawyer.name}</h3>
            <p className="mt-1 text-sm font-semibold text-trust-blue">{lawyer.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">{lawyer.summary}</p>

            <div className={`mt-6 space-y-5 ${expanded ? "block" : "hidden md:block"}`}>
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                  <GraduationCap className="h-4 w-4 text-trust-blue" />
                  학력
                </div>
                <ul className="space-y-1 pl-6">
                  {lawyer.education.map((e) => (
                    <li key={e} className="list-disc text-sm text-muted-foreground">
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                  <Briefcase className="h-4 w-4 text-trust-blue" />
                  주요 경력
                </div>
                <ul className="space-y-1 pl-6">
                  {lawyer.career.map((c) => (
                    <li key={c} className="list-disc text-sm text-muted-foreground">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                  <Award className="h-4 w-4 text-trust-blue" />
                  자격
                </div>
                <div className="flex flex-wrap gap-2 pl-6">
                  {lawyer.licenses.map((l) => (
                    <span key={l} className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-trust-blue md:hidden"
            >
              {expanded ? "접기" : "학력 · 경력 보기"}
              <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

const AboutLawyersPage = () => (
  <main className="relative">
    <AboutCoverHero
      badge="● PROFESSIONALS"
      title="공인노무사 팀"
      description={
        <>
          <p>현장 경험과 전문성을 갖춘 공인노무사가 기업의 든든한 노무 파트너가 됩니다.</p>
          <p className="mt-2">분야별 전담 체계로 자문·급여·사건·조사 대응까지 통합 지원합니다.</p>
        </>
      }
      heroImage={heroBanner}
      heroAlt="노무법인 가온 공인노무사"
    />

    <div className="relative z-10 bg-background">
    {/* 팀 소개 */}
    <section className={`section-white py-24 ${coverScrollSectionClass}`}>
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#3d83f5]/90">OUR TEAM</span>
            <h2 className="mt-2 text-3xl font-bold text-navy md:text-4xl">전담 공인노무사 체계</h2>
            <p className="mt-3 text-muted-foreground">
              고객사별 전담 노무사가 지속적으로 소통하며, 분야별 전문성을 바탕으로 맞춤 자문을 제공합니다.
            </p>
            <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                노무법인 가온의 공인노무사는 기업 자문, 급여·4대보험, 노동청 대응, 노동 사건 등 분야별 실무
                경험을 보유하고 있습니다.
              </p>
              <p>노무사·변호사·세무 전문가 네트워크와 협업하여 복합 이슈에도 통합 대응이 가능합니다.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="tel:070-1234-5678" className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:border-trust-blue/40">
                <Phone className="h-4 w-4 text-trust-blue" />
                070-1234-5678
              </a>
              <a href="mailto:gaon@gaonhr.com" className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-foreground transition hover:border-trust-blue/40">
                <Mail className="h-4 w-4 text-trust-blue" />
                gaon@gaonhr.com
              </a>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="overflow-hidden rounded-2xl border border-border shadow-[0_20px_50px_-30px_rgba(15,23,42,0.2)]">
              <img src={teamBg} alt="노무법인 가온 팀" className="h-full w-full object-cover" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>

    {/* 노무사 프로필 */}
    <section className="section-light py-24">
      <div className="container mx-auto px-4">
        <AboutSectionHeader eyebrow="MEMBERS" title="노무사 프로필" subtitle="각 분야의 전문성을 갖춘 공인노무사를 소개합니다." />
        <div className="mx-auto max-w-5xl space-y-8 md:space-y-12">
          {lawyers.map((lawyer, i) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* 팀 강점 */}
    <section
      className="py-24"
      style={{
        background: "linear-gradient(180deg, rgba(18,23,38,0.96) 0%, rgba(15,23,42,0.99) 100%)",
      }}
    >
      <div className="container mx-auto px-4">
        <AboutSectionHeader eyebrow="STRENGTHS" title="가온 노무사팀의 강점" dark />
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {strengths.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 70}>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
                <p className="text-[0.65rem] font-bold tracking-[0.18em] text-[#3d83f5]/90">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-bold text-primary-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/65">{s.desc}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>

    <AboutCtaBanner title="전문 노무사와 상담해 보세요" subtitle="기업 상황에 맞는 담당 노무사를 안내해 드립니다." ctaLabel="무료 상담 신청" />
    </div>
  </main>
);

export default AboutLawyersPage;
