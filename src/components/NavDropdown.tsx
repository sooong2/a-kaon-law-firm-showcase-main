import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import type { NavLinkItem } from "@/lib/siteNav";

type NavDropdownProps = {
  label: string;
  items: NavLinkItem[];
  isActive: boolean;
  menuMinWidth?: string;
  /** 설정 시 라벨 클릭 → 해당 페이지 (드롭다운은 유지) */
  parentTo?: string;
  /** true면 드롭다운을 트리거 오른쪽 기준 정렬 (우측 인접 버튼과 겹침 방지) */
  menuAlignEnd?: boolean;
};

function isMenuItemActive(itemPath: string, pathname: string, search: string): boolean {
  const [path, query] = itemPath.split("?");

  if (query) {
    const param = query.split("=")[1];
    return pathname === path && search.includes(param);
  }

  if (pathname !== path) return false;

  // /info-center(HR 포스팅) — 자료실 하위 경로에서는 비활성
  if (path === "/info-center" && pathname.startsWith("/info-center/resources")) {
    return false;
  }

  // /info-center/resources(자료실)
  if (path === "/info-center/resources") {
    return pathname.startsWith("/info-center/resources");
  }

  // /consulting — enterprise 하위 경로가 아닐 때만 컨설팅 센터 항목 활성
  if (path === "/consulting" && pathname.startsWith("/enterprise/")) {
    return false;
  }

  // /case — cases 하위 경로가 아닐 때만 사건 대응센터 항목 활성
  if (path === "/case" && pathname.startsWith("/cases")) {
    return false;
  }

  return true;
}

const NavDropdown = ({
  label,
  items,
  isActive,
  menuMinWidth = "240px",
  parentTo,
  menuAlignEnd = false,
}: NavDropdownProps) => {
  const location = useLocation();

  const triggerClass = `flex items-center gap-0.5 rounded-lg px-2.5 py-2 text-[0.8125rem] transition-colors xl:gap-1 xl:px-3 xl:text-sm ${
    isActive ? "font-semibold text-trust-blue" : "text-foreground hover:text-trust-blue"
  }`;

  return (
    <div className="relative group">
      <div className={`flex items-center rounded-lg ${isActive ? "bg-trust-blue-light" : "hover:bg-slate-50/80"}`}>
        {parentTo ? (
          <Link to={parentTo} className={`${triggerClass} pl-2.5 pr-0.5 xl:pl-3`}>
            {label}
          </Link>
        ) : (
          <button type="button" className={triggerClass} aria-expanded="false" aria-haspopup="true">
            {label}
          </button>
        )}
        <span className={`pointer-events-none pr-2 py-2 ${isActive ? "text-trust-blue" : "text-foreground"}`} aria-hidden>
          <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
        </span>
      </div>

      {/* hover 브릿지 + 메뉴 — pt-2 구간 클릭·호버 유지 */}
      <div
        className={`pointer-events-none absolute top-full z-[100] pt-2 opacity-0 invisible transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 ${
          menuAlignEnd ? "right-0" : "left-0"
        }`}
        role="menu"
      >
        <div
          className="rounded-xl border border-border/90 bg-surface py-2 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.22)] ring-1 ring-slate-900/5"
          style={{ minWidth: menuMinWidth }}
        >
          {items.map((item) => {
            const active = isMenuItemActive(item.path, location.pathname, location.search);

            return (
              <Link
                key={item.path}
                to={item.path}
                role="menuitem"
                className={`relative z-[1] block px-4 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-trust-blue-light text-trust-blue"
                    : "text-foreground hover:bg-slate-50 hover:text-trust-blue"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NavDropdown;
