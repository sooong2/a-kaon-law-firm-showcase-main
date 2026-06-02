/** HR 포스팅 — 인사이트 센터 콘텐츠 데이터 */

export type InsightPostCategory = "labor-law" | "subsidy" | "hr" | "payroll" | "precedent";

export const INSIGHT_CATEGORY_LABEL: Record<InsightPostCategory, string> = {
  "labor-law": "노동법",
  subsidy: "정부지원금",
  hr: "인사관리",
  payroll: "급여/4대보험",
  precedent: "판례사례",
};

export const INSIGHT_CATEGORY_EN: Record<InsightPostCategory, string> = {
  "labor-law": "LABOR LAW",
  subsidy: "GOV SUPPORT",
  hr: "HR MANAGEMENT",
  payroll: "PAYROLL",
  precedent: "CASE REVIEW",
};

export type InsightSection =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string };

export type InsightPost = {
  id: string;
  title: string;
  date: string;
  views: number;
  readMin: number;
  category: InsightPostCategory;
  author: string;
  summary: string;
  sections: InsightSection[];
};

export const INSIGHT_POSTS: InsightPost[] = [
  {
    id: "yellow-envelope-union-risk",
    title: "[노란봉투법] 개정 노조법 시행에 따른 경영 리스크, 어떻게 대응할 것인가?",
    date: "2026-03-10",
    views: 1550,
    readMin: 5,
    category: "labor-law",
    author: "김동훈 공인노무사",
    summary: "개정 노조법 시행 이후 사용자·경영책임자에 대한 책임 범위가 확대되고 있습니다. 사전 점검 항목과 대응 우선순위를 정리했습니다.",
    sections: [
      { type: "paragraph", text: "2026년 개정 노조법(일명 노란봉투법) 시행으로 노조 활동 보호 범위와 사용자 책임이 강화되면서, 경영진·인사 담당자의 대응 부담이 커지고 있습니다. 분쟁 발생 이후 대응만으로는 늦을 수 있어, 사전 예방 체계를 갖추는 것이 중요합니다." },
      { type: "heading", text: "1. 개정 핵심 쟁점" },
      { type: "list", items: ["노조 활동 시간·장소에 대한 보장 범위 확대", "쟁의행위 관련 사용자·경영책임자 책임 강화", "부당노동행위 입증·구제 절차 변화", "하청·협력사 노조 교섭·연대 책임 이슈"] },
      { type: "heading", text: "2. 기업이 우선 점검할 항목" },
      { type: "list", items: ["취업규칙·단체협약상 노조 활동 관련 조항 정비", "노조 설립·활동 대응 매뉴얼 및 교육 실시 여부", "징계·인사·보수 결정 시 노조법 위반 소지 검토", "하청·용역 구조에서 사용자 책임 범위 파악"] },
      { type: "callout", text: "노무법인 가온은 노조 설립 초기부터 교섭·쟁의 대응까지 단계별 자문을 제공합니다. 내부 규정 정비와 함께 경영진·인사 담당자 교육을 병행하는 것을 권장합니다." },
    ],
  },
  {
    id: "childcare-support-2026",
    title: "2026년 육아지원 제도 개편안 안내: 육아기 10시 출근제 및 지원금 인상",
    date: "2026-03-06",
    views: 1555,
    readMin: 4,
    category: "subsidy",
    author: "이지현 공인노무사",
    summary: "육아기 근로시간 단축·10시 출근제 등 2026년 개편 내용과 기업 적용 시 유의사항을 정리했습니다.",
    sections: [
      { type: "paragraph", text: "2026년 육아지원 정책은 근로자의 일·가정 양립을 강화하는 방향으로 개편되었습니다. 기업은 제도 도입 여부뿐 아니라, 급여·근로시간·4대보험 처리 방식까지 함께 검토해야 합니다." },
      { type: "heading", text: "주요 개편 내용" },
      { type: "list", items: ["육아기 10시 출근제 도입 확대 및 지원금 인상", "육아휴직·육아기 근로시간 단축 사용률 제고를 위한 인센티브", "중소기업 대상 육아지원 비용 지원 확대"] },
      { type: "heading", text: "기업 적용 시 체크포인트" },
      { type: "list", items: ["취업규칙·인사규정에 육아 관련 제도 반영", "단축근로 시 통상임금·수당 산정 기준 확인", "지원금 신청 요건·서류·기한 사전 점검"] },
    ],
  },
  {
    id: "4-5-day-subsidy",
    title: "[주4.5일제] '실근로시간 단축'과 정부 지원금 100% 활용법",
    date: "2026-03-05",
    views: 1549,
    readMin: 4,
    category: "subsidy",
    author: "이지현 공인노무사",
    summary: "주4.5일제 도입 시 지원금 신청 요건과 근로시간·급여 조정 시 주의할 점을 안내합니다.",
    sections: [
      { type: "paragraph", text: "주4.5일제는 단순히 휴무일을 늘리는 것이 아니라, 실근로시간 단축과 임금 유지·감액 여부, 교대·탄력 근로와의 관계를 종합적으로 검토해야 합니다." },
      { type: "heading", text: "지원금 활용 3단계" },
      { type: "list", items: ["① 현행 근로시간·교대체계 분석 및 단축 가능 범위 산정", "② 근로자 동의·단체협약·취업규칙 정비", "③ 고용노동부 지원금 신청 및 사후 보고 의무 이행"] },
      { type: "callout", text: "지원금 요건을 충족하지 못하면 향후 노동청 조사·임금 체불 분쟁으로 이어질 수 있습니다. 도입 전 노무 진단을 권장합니다." },
    ],
  },
  {
    id: "minimum-wage-2026",
    title: "2026년 최저임금 10,320원으로 인상, 우리 회사 급여구조 이대로 괜찮을까요?",
    date: "2026-03-05",
    views: 1548,
    readMin: 3,
    category: "payroll",
    author: "이지현 공인노무사",
    summary: "2026년 최저임금 인상에 따른 통상임금·수당 구조 점검 포인트를 정리했습니다.",
    sections: [
      { type: "paragraph", text: "최저임금은 기본급만이 아니라 해당 월의 총 소정근로시간으로 나눈 금액이 기준을 충족해야 합니다. 식대·교통비 등이 임금성 수당인지 여부가 쟁점이 됩니다." },
      { type: "heading", text: "급여구조 점검 체크리스트" },
      { type: "list", items: ["기본급 + 고정 수당 합산이 최저임금 이상인지", "주휴·연장·야간·휴일수당 산정 기준 통상임금 반영", "최저임금 미달 시 소급·가산금 부담 가능성"] },
    ],
  },
  {
    id: "performance-bonus-retirement",
    title: "경영성과금, 퇴직금에 포함될까? 삼성전자 vs SK하이닉스 판결 비교",
    date: "2026-03-05",
    views: 1550,
    readMin: 6,
    category: "precedent",
    author: "이현택 공인노무사",
    summary: "경영성과금의 임금성·퇴직금 산입 여부를 둘러싼 대법원 판결 흐름과 기업 대응 방향을 비교 분석합니다.",
    sections: [
      { type: "paragraph", text: "경영성과금·PS·RSU 등 다양한 보상 체계가 도입되면서, 퇴직금 산정 임금 범위와 통상임금 해당 여부가 반복적으로 쟁점이 되고 있습니다." },
      { type: "heading", text: "판결 비교 핵심" },
      { type: "list", items: ["지급 주기·산정 방식·경영성과 연동 여부", "규정·약정상 임금·퇴직금 산입 명시 여부", "실질적 고정성·예측 가능성 유무"] },
      { type: "heading", text: "기업 실무 제언" },
      { type: "paragraph", text: "보상 규정·취업규칙·단체협약을 통합 검토하고, 신규 제도 도입 시 퇴직금·4대보험 영향을 사전 시뮬레이션하는 것이 바람직합니다." },
    ],
  },
  {
    id: "workplace-harassment-2026",
    title: "직장 내 괴롭힘 금지법 강화, 2026년 사업주가 꼭 알아야 할 변경사항",
    date: "2026-03-04",
    views: 1420,
    readMin: 5,
    category: "labor-law",
    author: "최사랑 공인노무사",
    summary: "직장 내 괴롭힘 예방·조사·재발 방지 의무 강화 내용과 사업주 대응 절차를 안내합니다.",
    sections: [
      { type: "paragraph", text: "직장 내 괴롭힘 금지법 강화로 사업주는 예방 교육, 신고 접수, 사실 조사, 조치, 재발 방지까지 일련의 절차를 문서화·이행해야 합니다." },
      { type: "heading", text: "2026년 강화 포인트" },
      { type: "list", items: ["예방 교육 대상·주기·기록 보관 의무", "신고·조사 절차의 객관성·기한 준수", "피해자 보호·가해자 징계 시 절차적 정당성"] },
      { type: "callout", text: "조사 과정의 하자는 이후 부당징계·손해배상 분쟁으로 확대될 수 있습니다. 초기 대응 매뉴얼을 반드시 갖추세요." },
    ],
  },
  {
    id: "promotion-evaluation-risks",
    title: "승진·인사평가 제도 도입 시 반드시 점검해야 할 노무 리스크",
    date: "2026-03-03",
    views: 1380,
    readMin: 4,
    category: "hr",
    author: "김동훈 공인노무사",
    summary: "승진·인사평가 제도 설계 시 차별·불이익·징계 연계 리스크를 줄이는 방법을 정리했습니다.",
    sections: [
      { type: "paragraph", text: "인사평가·승진 제도는 경영 효율화 도구이지만, 기준의 불명확성·절차 미비는 부당해고·차별 분쟁으로 이어질 수 있습니다." },
      { type: "heading", text: "제도 설계 시 필수 요건" },
      { type: "list", items: ["평가 항목·배점·등급 기준의 객관성·공정성", "평가자 교육 및 이의신청·재평가 절차", "평가 결과와 징계·해고·보수 연계 시 근거 명확화"] },
    ],
  },
  {
    id: "social-insurance-report-omission",
    title: "4대보험 신고 누락, 어떤 불이익이 발생할까?",
    date: "2026-03-02",
    views: 1290,
    readMin: 3,
    category: "payroll",
    author: "이지현 공인노무사",
    summary: "4대보험 취득·상실·보수 변경 신고 누락 시 가산금·소급 부담 등 불이익을 정리했습니다.",
    sections: [
      { type: "paragraph", text: "입·퇴사·휴직·복직, 보수 변경 등 발생 사유별 신고 기한을 놓치면 가산금과 함께 근로자 권리 분쟁으로 이어질 수 있습니다." },
      { type: "heading", text: "유형별 불이익" },
      { type: "list", items: ["취득 신고 지연 → 보험료 추징·가산금", "상실 신고 누락 → 불필요한 보험료 부담", "보수 변경 미신고 → 산재·고용보험 급여 산정 오류"] },
      { type: "callout", text: "월 1회 급여·인사 변경 사항을 4대보험 신고 체크리스트와 연동해 관리하는 것을 권장합니다." },
    ],
  },
];

export function getInsightPostById(id: string): InsightPost | undefined {
  return INSIGHT_POSTS.find((p) => p.id === id);
}

export function getRelatedPosts(post: InsightPost, limit = 3): InsightPost[] {
  return INSIGHT_POSTS.filter((p) => p.id !== post.id && p.category === post.category).slice(0, limit);
}
