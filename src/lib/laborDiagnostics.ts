/** 자가진단 도구 — 규칙 기반 로직 */

export type BusinessSize = "small" | "medium" | "large";
export type IndustryType = "manufacturing" | "service" | "it" | "construction" | "other";

export type SubsidyProgram = {
  id: string;
  name: string;
  description: string;
  recommended?: boolean;
};

export type SubsidyDiagnosisInput = {
  businessSize: BusinessSize;
  employeeCount: number;
  youthHiring: boolean;
  industry: IndustryType;
};

export type SubsidyDiagnosisResult = {
  valid: boolean;
  error?: string;
  programs: SubsidyProgram[];
  recommended: SubsidyProgram[];
};

const SUBSIDY_CATALOG: Record<string, Omit<SubsidyProgram, "recommended">> = {
  youthLeap: {
    id: "youth-leap",
    name: "청년일자리도약장려금",
    description: "15~34세 청년 정규직 채용 시 최대 960만 원(12개월) 지원. 고용보험 가입·6개월 이상 고용 유지가 요건입니다.",
  },
  youthDigital: {
    id: "youth-digital",
    name: "청년 디지털 일자리 지원",
    description: "IT·디지털 관련 직무 청년 채용 시 인건비 일부 지원. 정보통신·SW 업종에 유리합니다.",
  },
  smeEmployment: {
    id: "sme-employment",
    name: "중소기업 고용촉진 장려금",
    description: "10인 이상~100인 미만 중소기업의 신규 채용 시 인당 장려금 지원. 업종·지역별 차등 적용.",
  },
  microEmployment: {
    id: "micro-employment",
    name: "소규모 사업장 고용안정 장려금",
    description: "10인 미만 사업장의 정규직 전환·유지 시 소정의 장려금 지원 가능.",
  },
  workLifeBalance: {
    id: "work-life",
    name: "일·가정 양립 지원금(육아·근로시간 단축)",
    description: "육아기 근로시간 단축·재택근무 도입 등 일·가정 양립 제도 도입 시 지원.",
  },
  manufacturingSmart: {
    id: "mfg-smart",
    name: "스마트공장·제조혁신 지원",
    description: "제조업 디지털 전환·스마트공장 구축 시 설비·컨설팅 비용 지원.",
  },
  constructionSafety: {
    id: "construction-safety",
    name: "건설업 안전·고용 지원",
    description: "건설업 특화 안전관리·숙련인력 채용 연계 지원 프로그램.",
  },
  serviceTourism: {
    id: "service-tourism",
    name: "서비스·요식업 고용 지원",
    description: "서비스·요식업 신규 채용 및 근로시간 단축 도입 시 고용 지원금.",
  },
};

export function diagnoseSubsidy(input: SubsidyDiagnosisInput): SubsidyDiagnosisResult {
  if (!input.employeeCount || input.employeeCount < 1) {
    return { valid: false, error: "직원 수를 입력해 주세요.", programs: [], recommended: [] };
  }

  const programs: SubsidyProgram[] = [];

  if (input.youthHiring) {
    programs.push({ ...SUBSIDY_CATALOG.youthLeap, recommended: input.employeeCount < 100 });
    if (input.industry === "it") {
      programs.push({ ...SUBSIDY_CATALOG.youthDigital, recommended: true });
    }
  }

  if (input.employeeCount < 10) {
    programs.push({ ...SUBSIDY_CATALOG.microEmployment, recommended: input.businessSize === "small" });
  } else if (input.employeeCount < 100) {
    programs.push({ ...SUBSIDY_CATALOG.smeEmployment, recommended: true });
  }

  programs.push({ ...SUBSIDY_CATALOG.workLifeBalance, recommended: input.employeeCount >= 5 });

  switch (input.industry) {
    case "manufacturing":
      programs.push({ ...SUBSIDY_CATALOG.manufacturingSmart, recommended: input.employeeCount >= 10 });
      break;
    case "construction":
      programs.push({ ...SUBSIDY_CATALOG.constructionSafety, recommended: true });
      break;
    case "service":
      programs.push({ ...SUBSIDY_CATALOG.serviceTourism, recommended: input.employeeCount < 50 });
      break;
    default:
      break;
  }

  const unique = programs.filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i);
  const recommended = unique.filter((p) => p.recommended);

  return { valid: true, programs: unique, recommended };
}

export type TenureRange = "under3m" | "3to6m" | "6mto1y" | "1to3y" | "over3y";

export type DismissalRiskInput = {
  tenure: TenureRange;
  hasDiscipline: boolean;
  hasPriorWarning: boolean;
  hasWrittenNotice: boolean;
};

export type DismissalRiskResult = {
  valid: boolean;
  score: number;
  level: "low" | "medium" | "high";
  levelLabel: string;
  consultRecommended: boolean;
  factors: string[];
};

export function diagnoseDismissalRisk(input: DismissalRiskInput): DismissalRiskResult {
  let score = 20;
  const factors: string[] = [];

  const tenureScore: Record<TenureRange, number> = {
    under3m: 35,
    "3to6m": 25,
    "6mto1y": 15,
    "1to3y": 5,
    over3y: 0,
  };
  score += tenureScore[input.tenure];
  if (input.tenure === "under3m") factors.push("근속기간 3개월 미만 — 해고 제한·취업규칙 점검 필요");
  if (input.tenure === "3to6m") factors.push("단기 근속 — 정당한 해고 사유·절차 입증 부담");

  if (input.hasDiscipline) {
    score += 20;
    factors.push("징계 이력 존재 — 해고와 징계의 연계성·절차 정당성 검토 필요");
  } else {
    factors.push("징계 절차 없이 해고 시 정당성 다툼 가능성");
    score += 15;
  }

  if (!input.hasPriorWarning) {
    score += 15;
    factors.push("사전 경고·시정지시 없음 — 해고 정당성 약화 요인");
  }

  if (!input.hasWrittenNotice) {
    score += 20;
    factors.push("서면 통지 미이행 — 해고 무효·부당해고 분쟁 리스크");
  } else {
    score -= 5;
  }

  score = Math.min(100, Math.max(0, score));

  const level = score >= 70 ? "high" : score >= 45 ? "medium" : "low";
  const levelLabel = level === "high" ? "높음" : level === "medium" ? "보통" : "낮음";

  return {
    valid: true,
    score,
    level,
    levelLabel,
    consultRecommended: score >= 45,
    factors,
  };
}

export type FrequencyLevel = "none" | "sometimes" | "repeated";

export type HarassmentDiagnosisInput = {
  repeatability: FrequencyLevel;
  workRelated: boolean;
  mentalHarm: boolean;
  hierarchy: boolean;
};

export type HarassmentDiagnosisResult = {
  valid: boolean;
  likelihood: "low" | "medium" | "high";
  likelihoodLabel: string;
  recommendations: string[];
};

export function diagnoseHarassment(input: HarassmentDiagnosisInput): HarassmentDiagnosisResult {
  let points = 0;

  if (input.repeatability === "repeated") points += 40;
  else if (input.repeatability === "sometimes") points += 20;

  if (input.workRelated) points += 20;
  if (input.mentalHarm) points += 25;
  if (input.hierarchy) points += 15;

  const likelihood = points >= 65 ? "high" : points >= 35 ? "medium" : "low";
  const likelihoodLabel = likelihood === "high" ? "해당 가능성 높음" : likelihood === "medium" ? "주의 필요" : "낮음";

  const recommendations: string[] = [
    "사업장 내 괴롭힘 예방·신고·조사 절차 매뉴얼을 확인하세요.",
  ];

  if (likelihood !== "low") {
    recommendations.push("피해 사실을 날짜·내용·목격자 중심으로 기록해 두세요.");
    recommendations.push("사업주·인사 담당자에게 신고하고 조사 요청을 공식적으로 남기세요.");
  }
  if (likelihood === "high") {
    recommendations.push("노동청·고용노동부 상담 또는 공인노무사·변호사 초기 대응을 권장합니다.");
    recommendations.push("가해자와의 단독 면담·보볼 행위를 피하고, 필요 시 근무 배치 조정을 요청하세요.");
  } else if (likelihood === "medium") {
    recommendations.push("내부 조사 전 증거 보전(메신저·이메일·녹취 등 적법 범위)을 준비하세요.");
  }

  return { valid: true, likelihood, likelihoodLabel, recommendations };
}

export type ContractChecklistInput = {
  hasWorkHours: boolean;
  hasBreakTime: boolean;
  hasWages: boolean;
  hasAnnualLeave: boolean;
};

export type ContractChecklistResult = {
  valid: boolean;
  missingItems: string[];
  risks: string[];
  complete: boolean;
};

const CONTRACT_ITEMS = [
  { key: "hasWorkHours" as const, label: "근무시간", risk: "근로기준법 제17조 필수 기재 항목 누락 — 근로계약 무효·임금 분쟁 리스크" },
  { key: "hasBreakTime" as const, label: "휴게시간", risk: "휴게·휴일 미기재 시 연장·야간근로 및 휴일근로 수당 분쟁 가능" },
  { key: "hasWages" as const, label: "임금(구성·계산·지급방법)", risk: "임금 미기재는 근로계약법 위반 — 최저임금·통상임금 산정 분쟁" },
  { key: "hasAnnualLeave" as const, label: "연차유급휴가", risk: "연차 관련 조항 누락 시 연차 발생·사용·수당 분쟁 가능" },
];

export function diagnoseContractChecklist(input: ContractChecklistInput): ContractChecklistResult {
  const missingItems: string[] = [];
  const risks: string[] = [];

  for (const item of CONTRACT_ITEMS) {
    if (!input[item.key]) {
      missingItems.push(item.label);
      risks.push(item.risk);
    }
  }

  return {
    valid: true,
    missingItems,
    risks,
    complete: missingItems.length === 0,
  };
}
