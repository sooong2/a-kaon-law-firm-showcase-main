/** 상담 문의 분류 — 추후 메일/DB 라우팅 키로 사용 */
export const INQUIRY_CATEGORIES = [
  { value: "starter", label: "기업 자문 · 소규모 사업장 (5~30인)" },
  { value: "professional", label: "기업 자문 · 성장 기업 (30~100인)" },
  { value: "enterprise", label: "기업 자문 · 중견·대기업 (100인 이상)" },
  { value: "labor-consulting", label: "노무 자문 관리" },
  { value: "payroll-outsourcing", label: "급여 · 4대보험 아웃소싱" },
  { value: "labor-dispute", label: "노동 사건 대응" },
  { value: "diagnosis", label: "셀프진단 결과 상담" },
  { value: "consulting-center", label: "컨설팅 센터 문의" },
  { value: "case-center", label: "사건 대응 센터 문의" },
  { value: "membership", label: "노무 정보센터 문의" },
  { value: "other", label: "기타 상담" },
] as const;

export type InquiryCategoryValue = (typeof INQUIRY_CATEGORIES)[number]["value"];

export const INQUIRY_CATEGORY_VALUES = INQUIRY_CATEGORIES.map((c) => c.value);

export function isInquiryCategory(value: string | null): value is InquiryCategoryValue {
  return INQUIRY_CATEGORY_VALUES.includes(value as InquiryCategoryValue);
}

export const EMPLOYEE_COUNT_OPTIONS = [
  { value: "under-5", label: "5인 미만" },
  { value: "5-30", label: "5~30인" },
  { value: "30-100", label: "30~100인" },
  { value: "100-300", label: "100~300인" },
  { value: "over-300", label: "300인 이상" },
  { value: "unknown", label: "확인 중 / 해당 없음" },
] as const;

export function getInquiryCategoryLabel(value: InquiryCategoryValue): string {
  return INQUIRY_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}
