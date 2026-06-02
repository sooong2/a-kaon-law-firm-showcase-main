import { CaseCategoryPage } from "./CaseCategoryPage";

const WrongfulDismissalPage = () => (
  <CaseCategoryPage
    content={{
      title: "부당해고",
      heroSubtitle: "해고의 정당성 검토부터 구제신청·소송까지 전문적으로 대응합니다.",
      overview:
        "부당해고 분쟁은 증거 확보와 절차 대응이 매우 중요합니다. 노무법인 가온은 해고 사유의 정당성, 절차적 하자, 구제신청 기한 등을 종합 검토하여 최적의 대응 전략을 수립합니다.",
      services: [
        "해고 통지 및 징계·해고 절차 적법성 검토",
        "구제신청 및 노동위원회 대응",
        "합의·조정 및 소송 전략 수립",
        "향후 재발 방지를 위한 인사규정 정비",
      ],
      process: ["사실관계·증거 파악", "법적 쟁점 분석", "대응 전략 수립", "노동위·법원 절차 대응"],
    }}
  />
);

export default WrongfulDismissalPage;
