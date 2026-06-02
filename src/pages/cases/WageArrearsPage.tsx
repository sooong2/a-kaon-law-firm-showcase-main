import { CaseCategoryPage } from "./CaseCategoryPage";

const WageArrearsPage = () => (
  <CaseCategoryPage
    content={{
      title: "임금체불",
      heroSubtitle: "미지급 임금·퇴직금·수당 회수를 위한 체계적 대응을 지원합니다.",
      overview:
        "임금체불은 단순 미지급 여부뿐 아니라 임금 구성, 근로시간, 수당 산정 방식까지 함께 검토해야 합니다. 정확한 체불 범위 산정과 신속한 회수 전략을 제안합니다.",
      services: [
        "임금·퇴직금·수당 체불 여부 분석",
        "임금명세서·근로계약서 검토",
        "진정·소송 등 법적 구제 절차 지원",
        "향후 급여 체계 정비 자문",
      ],
      process: ["임금 자료 검토", "체불 금액 산정", "협의·진정 대응", "분쟁 해결 및 정산"],
    }}
  />
);

export default WageArrearsPage;
