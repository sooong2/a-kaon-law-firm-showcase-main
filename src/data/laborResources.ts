/** 노무 자료실 — 자료 데이터 및 다운로드 콘텐츠 생성 */
import { downloadFile } from "@/lib/downloadFile";

export type ResourceCategory = "form" | "guide" | "checklist" | "law";
export type ResourceFileType = "pdf" | "xlsx" | "docx" | "hwp";

export const RESOURCE_CATEGORY_LABEL: Record<ResourceCategory, string> = {
  form: "서식·양식",
  guide: "가이드",
  checklist: "체크리스트",
  law: "법령 요약",
};

export const RESOURCE_FILE_TYPE_LABEL: Record<ResourceFileType, string> = {
  pdf: "PDF",
  xlsx: "Excel",
  docx: "Word",
  hwp: "HWP",
};

export type LaborResource = {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  fileType: ResourceFileType;
  fileSize: string;
  updatedAt: string;
  downloads: number;
  tags: string[];
  /** 상세 페이지 미리보기 */
  preview: string[];
  /** 다운로드 파일에 포함할 본문 */
  contents: string[];
};

export const LABOR_RESOURCES: LaborResource[] = [
  {
    id: "employment-rules-template",
    title: "취업규칙 작성 가이드 및 표준 양식",
    description: "10인 이상 사업장 필수 취업규칙 작성 시 참고할 수 있는 항목별 가이드와 표준 양식입니다.",
    category: "form",
    fileType: "docx",
    fileSize: "1.2 MB",
    updatedAt: "2026-03-01",
    downloads: 2840,
    tags: ["취업규칙", "필수"],
    preview: ["취업규칙 필수 기재 13개 항목", "근로시간·휴게·휴일 조항 샘플", "징계·해고 절차 조항"],
    contents: [
      "【취업규칙 작성 가이드 및 표준 양식】",
      "제공: 노무법인 가온",
      "",
      "■ 필수 기재 항목",
      "1. 근로시간  2. 휴게시간  3. 휴일  4. 연차유급휴가",
      "5. 임금  6. 제수당  7. 퇴직금  8. 복리후생",
      "9. 교육  10. 안전·보건  11. 징계  12. 해고  13. 기타",
      "",
      "■ 근로시간 조항 (샘플)",
      "1. 근로시간은 1일 8시간, 1주 40시간을 원칙으로 한다.",
      "2. 연장·휴일·야간근로는 근로기준법에 따른다.",
      "",
      "※ 본 양식은 참고용이며, 사업장 규모·업종에 맞게 수정하세요.",
    ],
  },
  {
    id: "labor-contract-template",
    title: "근로계약서 표준 서식 (기간·무기한)",
    description: "기간제·무기한 근로계약서 양식과 필수 기재사항 체크리스트를 포함합니다.",
    category: "form",
    fileType: "docx",
    fileSize: "856 KB",
    updatedAt: "2026-02-28",
    downloads: 3120,
    tags: ["근로계약", "필수"],
    preview: ["기간제·무기한 계약서 양식", "필수 기재 8항목 체크리스트"],
    contents: [
      "【근로계약서 표준 서식】",
      "",
      "■ 필수 기재사항",
      "- 임금(구성·계산·지급방법)",
      "- 근로시간",
      "- 휴일·연차",
      "- 취업장소·업무 내용",
      "",
      "■ 기간제 계약서 (샘플)",
      "근로계약기간: ____년 __월 __일 ~ ____년 __월 __일",
      "근무장소: ________________",
      "업무내용: ________________",
    ],
  },
  {
    id: "payroll-checklist",
    title: "급여·명세서 점검 체크리스트",
    description: "매월 급여 정산 전 확인해야 할 통상임금·수당·공제 항목을 정리한 체크리스트입니다.",
    category: "checklist",
    fileType: "xlsx",
    fileSize: "420 KB",
    updatedAt: "2026-02-25",
    downloads: 1950,
    tags: ["급여", "명세서"],
    preview: ["통상임금 포함 여부", "연장·야간·휴일수당", "공제 항목 적법성"],
    contents: [
      "항목,확인,비고",
      "기본급 최저임금 충족,□,",
      "식대·교통비 임금성 검토,□,",
      "연장근로수당 산정,□,",
      "야간·휴일수당 산정,□,",
      "4대보험 공제,□,",
      "소득세·지방세 공제,□,",
      "임금명세서 교부,□,",
    ],
  },
  {
    id: "overtime-guide",
    title: "연장·휴일·야간근로 수당 계산 가이드",
    description: "2026년 기준 연장·휴일·야간근로 수당 산정 방법과 실무 FAQ를 정리했습니다.",
    category: "guide",
    fileType: "pdf",
    fileSize: "2.1 MB",
    updatedAt: "2026-02-20",
    downloads: 2680,
    tags: ["근로시간", "수당"],
    preview: ["연장근로 50% 가산", "휴일근로 50%/100%", "야간근로 50% 가산"],
    contents: [
      "【연장·휴일·야간근로 수당 계산 가이드】",
      "",
      "■ 연장근로: 통상시급 × 1.5",
      "■ 휴일근로: 8시간 이내 1.5 / 초과 2.0",
      "■ 야간근로(22~06시): 통상시급 × 0.5 추가",
      "",
      "※ 통상임금 범위에 각종 수당 포함 여부를 반드시 확인하세요.",
    ],
  },
  {
    id: "labor-board-prep",
    title: "노동청 조사 대비 자체 점검표",
    description: "조사·감독 전 사업장에서 스스로 점검할 수 있는 항목별 자체 점검표입니다.",
    category: "checklist",
    fileType: "xlsx",
    fileSize: "380 KB",
    updatedAt: "2026-02-18",
    downloads: 1420,
    tags: ["노동청", "점검"],
    preview: ["근로계약·명세서", "근로시간 기록", "취업규칙 게시"],
    contents: [
      "점검항목,확인,담당,완료일",
      "근로계약서 전원 작성,□,,",
      "임금명세서 교부,□,,",
      "근로시간 기록 유지,□,,",
      "취업규칙 게시·신고,□,,",
      "4대보험 신고,□,,",
    ],
  },
  {
    id: "annual-leave-guide",
    title: "연차·휴가 운영 실무 가이드",
    description: "연차 발생·사용·소멸, 대체휴가, 연차수당 정산 등 연차 운영 실무를 정리했습니다.",
    category: "guide",
    fileType: "pdf",
    fileSize: "1.8 MB",
    updatedAt: "2026-02-15",
    downloads: 2210,
    tags: ["연차", "휴가"],
    preview: ["연차 발생 기준", "촉진·소멸 절차", "연차수당 정산"],
    contents: ["【연차·휴가 운영 실무 가이드】", "", "■ 1년 미만: 1개월 개근 시 1일", "■ 1년 이상: 15일 (2년마다 1일 가산, 최대 25일)", "■ 연차 촉진·소멸: 근로기준법 제61조 절차 준수"],
  },
  {
    id: "insurance-report-guide",
    title: "4대보험 취득·상실·변동 신고 가이드",
    description: "입·퇴사·보수 변경 시 4대보험 신고 절차와 주의사항을 단계별로 안내합니다.",
    category: "guide",
    fileType: "pdf",
    fileSize: "1.5 MB",
    updatedAt: "2026-02-10",
    downloads: 1890,
    tags: ["4대보험", "신고"],
    preview: ["입사 취득 신고", "퇴사 상실 신고", "보수 변경 신고"],
    contents: ["【4대보험 신고 가이드】", "", "■ 취득: 입사일 14일 이내", "■ 상실: 퇴사일 다음날 ~ 14일 이내", "■ 보수 변경: 해당 월 15일까지"],
  },
  {
    id: "min-wage-summary",
    title: "2026년 최저임금·통상임금 법령 요약",
    description: "2026년 최저임금 인상과 통상임금 판단 기준 변경사항을 요약 정리했습니다.",
    category: "law",
    fileType: "pdf",
    fileSize: "980 KB",
    updatedAt: "2026-01-05",
    downloads: 3560,
    tags: ["최저임금", "법령"],
    preview: ["2026년 최저임금 10,320원", "통상임금 판단 기준"],
    contents: ["【2026년 최저임금·통상임금 요약】", "", "■ 최저임금: 시간당 10,320원", "■ 월 환산(209시간): 2,156,880원", "■ 통상임금: 정기·일률·고정적으로 지급되는 임금"],
  },
  {
    id: "disciplinary-procedure",
    title: "징계·해고 절차 서식 모음",
    description: "징계의결서, 해고예고통지, 징계위원회 회의록 등 절차별 서식을 모았습니다.",
    category: "form",
    fileType: "hwp",
    fileSize: "1.1 MB",
    updatedAt: "2026-01-28",
    downloads: 1680,
    tags: ["징계", "해고"],
    preview: ["징계의결서", "해고예고통지서", "징계위원회 회의록"],
    contents: ["【징계·해고 절차 서식 모음】", "", "1. 징계의결서", "2. 해고예고통지서 (30일 전)", "3. 징계위원회 회의록", "4. 소명 기회 부여 통지"],
  },
  {
    id: "harassment-prevention",
    title: "직장 내 괴롭힘 예방·대응 매뉴얼",
    description: "예방 교육, 신고·조사 절차, 재발 방지 조치 등 사업주 의무사항을 정리했습니다.",
    category: "guide",
    fileType: "pdf",
    fileSize: "2.4 MB",
    updatedAt: "2026-01-20",
    downloads: 1340,
    tags: ["괴롭힘", "예방"],
    preview: ["예방 교육", "신고·조사 절차", "재발 방지"],
    contents: ["【직장 내 괴롭힘 예방·대응 매뉴얼】", "", "■ 예방 교육: 연 1회 이상", "■ 신고 접수 후 7일 내 조사 착수", "■ 조사 결과 조치 및 재발 방지"],
  },
  {
    id: "subsidy-checklist",
    title: "2026년 고용·인력 지원금 체크리스트",
    description: "주요 고용·인력 지원 제도별 신청 요건과 준비 서류를 한눈에 확인할 수 있습니다.",
    category: "checklist",
    fileType: "xlsx",
    fileSize: "510 KB",
    updatedAt: "2026-03-05",
    downloads: 980,
    tags: ["지원금", "고용"],
    preview: ["청년·장년 고용", "육아·일·가정", "주4.5일제"],
    contents: [
      "제도명,신청요건,준비서류,신청기한",
      "청년일자리,만 15~34세,사업자등록·4대보험,상시",
      "육아기단축,8세 이하 자녀,신청서·증빙,고용24",
      "주4.5일제,실근로시간 단축,협약·동의서,별도 공고",
    ],
  },
  {
    id: "labor-law-amendment",
    title: "2026년 노동법 주요 개정사항 요약",
    description: "올해 시행·예정된 노동 관련 법령 개정 핵심 내용을 사업주 관점에서 요약했습니다.",
    category: "law",
    fileType: "pdf",
    fileSize: "1.3 MB",
    updatedAt: "2026-03-08",
    downloads: 2450,
    tags: ["법령", "개정"],
    preview: ["노조법 개정", "최저임금", "육아지원"],
    contents: ["【2026년 노동법 주요 개정사항】", "", "■ 노조법(노란봉투법) 시행", "■ 최저임금 10,320원", "■ 육아지원 제도 개편"],
  },
];

export function getLaborResourceById(id: string): LaborResource | undefined {
  return LABOR_RESOURCES.find((r) => r.id === id);
}

function sanitizeFilename(title: string) {
  return title.replace(/[/\\?%*:|"<>]/g, "_").slice(0, 80);
}

function buildTextContent(resource: LaborResource) {
  return [
    resource.title,
    "=".repeat(Math.min(resource.title.length, 40)),
    "",
    `카테고리: ${RESOURCE_CATEGORY_LABEL[resource.category]}`,
    `업데이트: ${resource.updatedAt}`,
    `제공: 노무법인 가온 (https://gaonhr.com)`,
    "",
    resource.description,
    "",
    "--- 본문 ---",
    "",
    ...resource.contents,
    "",
    "---",
    "본 자료는 HR·노무 실무 참고용입니다. 개별 사업장 상황에 맞게 수정해 사용하세요.",
    "© 노무법인 가온",
  ].join("\n");
}

function buildHtmlGuide(resource: LaborResource) {
  const body = resource.contents.map((line) => `<p>${line.replace(/</g, "&lt;")}</p>`).join("\n");
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>${resource.title} | 노무법인 가온</title>
  <style>
    body { font-family: "Apple SD Gothic Neo", "Malgun Gothic", sans-serif; max-width: 720px; margin: 40px auto; padding: 0 24px; color: #1e293b; line-height: 1.7; }
    h1 { font-size: 1.35rem; border-bottom: 2px solid #3d83f5; padding-bottom: 12px; }
    .meta { color: #64748b; font-size: 0.875rem; margin-bottom: 24px; }
    p { margin: 0.5em 0; white-space: pre-wrap; }
    footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 0.75rem; color: #94a3b8; }
  </style>
</head>
<body>
  <h1>${resource.title}</h1>
  <p class="meta">${RESOURCE_CATEGORY_LABEL[resource.category]} · ${resource.updatedAt} · 노무법인 가온</p>
  <p>${resource.description}</p>
  ${body}
  <footer>본 자료는 HR·노무 실무 참고용입니다. © 노무법인 가온</footer>
</body>
</html>`;
}

/** 자료 유형에 맞는 실제 다운로드 파일 생성 */
export function downloadLaborResource(resource: LaborResource) {
  const base = sanitizeFilename(resource.title);

  switch (resource.fileType) {
    case "xlsx": {
      const csv = "\uFEFF" + resource.contents.join("\n");
      downloadFile(csv, `${base}.csv`, "text/csv;charset=utf-8");
      break;
    }
    case "pdf": {
      const html = buildHtmlGuide(resource);
      downloadFile(html, `${base}.html`, "text/html;charset=utf-8");
      break;
    }
    case "docx":
    case "hwp": {
      const text = "\uFEFF" + buildTextContent(resource);
      downloadFile(text, `${base}.txt`, "text/plain;charset=utf-8");
      break;
    }
    default: {
      downloadFile(buildTextContent(resource), `${base}.txt`, "text/plain;charset=utf-8");
    }
  }
}

/** 다운로드 시 안내 문구 (확장자) */
export function getDownloadExtensionHint(fileType: ResourceFileType): string {
  switch (fileType) {
    case "xlsx":
      return "CSV (Excel에서 열기)";
    case "pdf":
      return "HTML (브라우저·인쇄)";
    case "docx":
    case "hwp":
      return "TXT";
    default:
      return "파일";
  }
}
