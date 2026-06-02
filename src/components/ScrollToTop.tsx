import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/** 라우트 변경 시 항상 뷰포트 상단으로 스크롤 (SPA에서 이전 페이지 스크롤 위치가 유지되는 문제 방지) */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
