import { Route, Routes } from "react-router-dom";
import LaborInfoCenterPage from "@/pages/LaborInfoCenterPage";
import LaborResourceArchivePage from "@/pages/LaborResourceArchivePage";
import InsightPostDetailPage from "@/pages/info-center/InsightPostDetailPage";
import ResourceDetailPage from "@/pages/info-center/ResourceDetailPage";

/** 노무 정보센터 하위 라우트 (HR 포스팅 · 자료실 · 상세) */
export default function InfoCenterRoutes() {
  return (
    <Routes>
      <Route index element={<LaborInfoCenterPage />} />
      <Route path="posts/:postId" element={<InsightPostDetailPage />} />
      <Route path="resources" element={<LaborResourceArchivePage />} />
      <Route path="resources/:resourceId" element={<ResourceDetailPage />} />
    </Routes>
  );
}
