import { CaseCategoryPage } from "./CaseCategoryPage";

const WorkplaceHarassmentPage = () => (
  <CaseCategoryPage
    content={{
      title: "직장 내 괴롭힘",
      heroSubtitle: "직장 내 괴롭힘·성희롱 사건 조사부터 재발 방지까지 지원합니다.",
      overview:
        "직장 내 괴롭힘 사건은 신속한 사실 확인과 절차적 대응이 핵심입니다. 피해자·사업주 모두의 입장에서 법적 기준에 맞는 조사·징계·예방 체계를 함께 설계합니다.",
      services: [
        "사건 접수 및 사실관계 조사 지원",
        "징계·인사조치 절차 자문",
        "노동청·수사기관 대응",
        "예방 교육 및 내부 규정 정비",
      ],
      process: ["초기 상담 및 증거 확보", "조사·보고 체계 수립", "조치·징계 절차 진행", "재발 방지 대책 마련"],
    }}
  />
);

export default WorkplaceHarassmentPage;
