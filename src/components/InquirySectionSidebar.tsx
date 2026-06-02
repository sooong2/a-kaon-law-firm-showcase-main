import { useEffect, useRef, type ReactNode } from "react";

const HEADER_OFFSET_PX = 88; // fixed header(72px) + 여백

type InquirySectionSidebarProps = {
  /** 상담 접수 양식 섹션 래퍼 ref — 이동 범위 기준 */
  sectionRef: React.RefObject<HTMLElement | null>;
  children: ReactNode;
};

/**
 * 데스크톱 우측 사이드바 — 상담 접수 양식 섹션 높이 안에서만
 * 스크롤에 따라 위·아래로 이동 (섹션 밖으로는 나가지 않음)
 */
const InquirySectionSidebar = ({ sectionRef, children }: InquirySectionSidebarProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const inner = innerRef.current;
      if (!section || !track || !inner) return;

      // 모바일·태블릿은 일반 흐름 (transform 해제)
      if (window.matchMedia("(max-width: 1023px)").matches) {
        inner.style.transform = "";
        return;
      }

      const sectionHeight = section.offsetHeight;
      const sidebarHeight = inner.offsetHeight;
      const maxTranslate = Math.max(0, sectionHeight - sidebarHeight);

      // 섹션 상단이 헤더 아래로 들어온 만큼 → 사이드바를 아래로 이동
      const sectionTopFromViewport = section.getBoundingClientRect().top;
      const scrolledPastTop = HEADER_OFFSET_PX - sectionTopFromViewport;
      const translateY = Math.max(0, Math.min(maxTranslate, scrolledPastTop));

      inner.style.transform = `translate3d(0, ${translateY}px, 0)`;
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    const observer = new ResizeObserver(updatePosition);
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (innerRef.current) observer.observe(innerRef.current);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
      observer.disconnect();
    };
  }, [sectionRef]);

  return (
    <aside ref={trackRef} className="relative hidden w-[280px] shrink-0 lg:block">
      <div ref={innerRef} className="space-y-4 will-change-transform">
        {children}
      </div>
    </aside>
  );
};

export default InquirySectionSidebar;
