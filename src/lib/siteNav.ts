/** 사이트 공통 네비게이션 설정 */

export type NavLinkItem = {
  label: string;
  path: string;
};

export const firmAboutLinks: NavLinkItem[] = [
  { label: "사무소 소개", path: "/about/office" },
  { label: "노무사 소개", path: "/about/lawyers" },
  { label: "오시는 길", path: "/about/location" },
];

export const enterpriseServiceLinks: NavLinkItem[] = [
  { label: "컨설팅 센터", path: "/consulting" },
  { label: "노무 자문 관리", path: "/enterprise/labor-consulting" },
  { label: "급여 · 4대보험 아웃소싱", path: "/enterprise/payroll-outsourcing" },
  { label: "취업규칙 · 인사규정", path: "/enterprise/employment-rules" },
  { label: "노동청 대응", path: "/enterprise/labor-board" },
];

/** 기업 서비스 1차 메뉴 클릭 시 이동 (컨설팅 센터 페이지) */
export const enterpriseServiceParentPath = "/consulting";

export const caseResponseLinks: NavLinkItem[] = [
  { label: "사건 대응센터", path: "/case" },
  { label: "부당해고", path: "/cases/wrongful-dismissal" },
  { label: "임금체불", path: "/cases/wage-arrears" },
  { label: "직장 내 괴롭힘", path: "/cases/workplace-harassment" },
];

/** 사건 대응 1차 메뉴 클릭 시 이동 (사건 대응센터 페이지) */
export const caseResponseParentPath = "/case";

export const laborInfoLinks: NavLinkItem[] = [
  { label: "HR 포스팅", path: "/info-center" },
  { label: "자료실", path: "/info-center/resources" },
];

/** 노무 정보센터 1차 메뉴 클릭 시 이동 */
export const laborInfoParentPath = "/info-center";

export const primaryNavLinks: NavLinkItem[] = [
  { label: "셀프진단", path: "/diagnosis" },
  { label: "기업 지원", path: "/corporate" },
  { label: "실무도구", path: "/tools" },
];

/** 드롭다운 하위 경로 포함 활성 여부 */
export function isNavGroupActive(paths: string[], pathname: string, search = ""): boolean {
  const full = pathname + search;
  return paths.some((p) => {
    if (p.includes("?")) return full === p || full.startsWith(p.split("?")[0]);
    return pathname === p || pathname.startsWith(p + "/");
  });
}

export function getAllNavPaths(): string[] {
  return [
    ...firmAboutLinks,
    ...enterpriseServiceLinks,
    ...caseResponseLinks,
    ...laborInfoLinks,
    ...primaryNavLinks,
    { label: "상담문의", path: "/inquiry" },
    { label: "사건 대응", path: "/cases" },
  ].map((l) => l.path.split("?")[0].split("#")[0]);
}
