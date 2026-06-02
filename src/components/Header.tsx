/* ===== 노무법인 가온 - Header Component ===== */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/logo3.png";
import { Menu, X, Phone, User, ChevronDown } from "lucide-react";
import NavDropdown from "@/components/NavDropdown";
import {
  firmAboutLinks,
  enterpriseServiceLinks,
  enterpriseServiceParentPath,
  caseResponseLinks,
  caseResponseParentPath,
  laborInfoLinks,
  laborInfoParentPath,
  primaryNavLinks,
  isNavGroupActive,
} from "@/lib/siteNav";

type MobileSection = "firm" | "enterprise" | "cases" | "info" | null;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MobileSection>(null);
  const location = useLocation();

  const firmActive = isNavGroupActive(
    firmAboutLinks.map((l) => l.path),
    location.pathname,
  );
  const enterpriseActive =
    location.pathname === enterpriseServiceParentPath ||
    isNavGroupActive(
      enterpriseServiceLinks.map((l) => l.path),
      location.pathname,
    );
  const casesActive =
    location.pathname === caseResponseParentPath ||
    location.pathname === "/cases" ||
    isNavGroupActive(
      caseResponseLinks.map((l) => l.path),
      location.pathname,
    );
  const infoActive =
    location.pathname === laborInfoParentPath ||
    isNavGroupActive(
      laborInfoLinks.map((l) => l.path),
      location.pathname,
      location.search,
    );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
  }, [location.pathname, location.search]);

  const toggleMobileSection = (section: MobileSection) => {
    setMobileSection((prev) => (prev === section ? null : section));
  };

  const renderMobileDropdown = (
    section: MobileSection,
    label: string,
    items: { label: string; path: string }[],
    active: boolean,
    parentTo?: string,
  ) => (
    <div className="flex flex-col rounded-lg border border-border/80 bg-slate-50/50">
      {parentTo ? (
        <div className="flex items-center">
          <Link
            to={parentTo}
            className={`flex-1 px-4 py-3 text-sm font-medium ${active ? "text-trust-blue" : "text-foreground"}`}
          >
            {label}
          </Link>
          <button
            type="button"
            onClick={() => toggleMobileSection(section)}
            className={`shrink-0 px-3 py-3 ${active ? "text-trust-blue" : "text-foreground"}`}
            aria-label={`${label} 하위 메뉴`}
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileSection === section ? "rotate-180" : ""}`} aria-hidden />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => toggleMobileSection(section)}
          className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium ${
            active ? "text-trust-blue" : "text-foreground"
          }`}
        >
          {label}
          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${mobileSection === section ? "rotate-180" : ""}`} aria-hidden />
        </button>
      )}
      {mobileSection === section && (
        <div className="border-t border-border/80 bg-surface/90 px-2 pb-2 pt-1">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-surface py-2.5 shadow-lg backdrop-blur-md"
            : "bg-surface/95 py-3 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link to="/" className="group flex shrink-0 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105 lg:h-10 lg:w-10">
              <img src={logoImg} alt="노무법인 가온" className="h-9 w-9 object-contain lg:h-10 lg:w-10" width={40} height={40} />
            </div>
            <div className="hidden sm:block">
              <span className="text-base font-bold tracking-tight text-foreground lg:text-lg">노무법인</span>
              <span className="ml-1 text-base font-black text-trust-blue lg:text-lg">가온</span>
            </div>
          </Link>

          {/* Desktop Nav — xl 이상 전체 메뉴 */}
          <nav className="hidden items-center gap-0.5 xl:flex">
            <NavDropdown label="노무법인 가온" items={firmAboutLinks} isActive={firmActive} menuMinWidth="200px" />

            {primaryNavLinks.slice(0, 2).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link rounded-lg px-2.5 py-2 text-[0.8125rem] xl:px-3 xl:text-sm ${
                  location.pathname === item.path
                    ? "bg-trust-blue-light font-semibold text-trust-blue"
                    : "text-foreground hover:text-trust-blue"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <NavDropdown
              label="기업 서비스"
              items={enterpriseServiceLinks}
              isActive={enterpriseActive}
              menuMinWidth="260px"
              parentTo={enterpriseServiceParentPath}
            />
            <NavDropdown
              label="사건 대응"
              items={caseResponseLinks}
              isActive={casesActive}
              menuMinWidth="220px"
              parentTo={caseResponseParentPath}
            />

            {primaryNavLinks.slice(2).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link rounded-lg px-2.5 py-2 text-[0.8125rem] xl:px-3 xl:text-sm ${
                  location.pathname === item.path
                    ? "bg-trust-blue-light font-semibold text-trust-blue"
                    : "text-foreground hover:text-trust-blue"
                }`}
              >
                {item.label}
              </Link>
            ))}

            <NavDropdown
              label="노무 정보센터"
              items={laborInfoLinks}
              isActive={infoActive}
              menuMinWidth="220px"
              parentTo={laborInfoParentPath}
              menuAlignEnd
            />

            <Link
              to="/inquiry"
              className={`relative z-10 ml-1 rounded-lg px-4 py-2 text-[0.8125rem] font-semibold transition-all duration-300 xl:text-sm ${
                location.pathname === "/inquiry"
                  ? "bg-trust-blue text-primary-foreground shadow-md"
                  : "bg-trust-blue text-primary-foreground hover:opacity-90 hover:shadow-lg"
              }`}
            >
              상담문의
            </Link>
          </nav>

          <div className="hidden items-center gap-3 text-sm lg:flex xl:gap-4">
            <a href="tel:070-1234-5678" className="hidden items-center gap-1.5 text-muted-foreground transition-colors hover:text-trust-blue xl:flex">
              <Phone className="h-4 w-4" />
              <span className="hidden 2xl:inline">070-1234-5678</span>
            </a>
            <button type="button" className="hidden items-center gap-1.5 text-muted-foreground transition-colors hover:text-trust-blue sm:flex">
              <User className="h-4 w-4" />
              <span className="hidden 2xl:inline">로그인</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 transition-colors hover:bg-secondary xl:hidden"
              aria-label="메뉴 열기"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-secondary lg:hidden"
            aria-label="메뉴 열기"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile / Tablet Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 xl:hidden ${
            mobileOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="container mx-auto flex max-h-[calc(100vh-72px)] flex-col gap-1 overflow-y-auto border-t border-border px-4 py-4">
            {renderMobileDropdown("firm", "노무법인 가온", firmAboutLinks, firmActive)}

            {primaryNavLinks.slice(0, 2).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-trust-blue-light text-trust-blue"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {renderMobileDropdown("enterprise", "기업 서비스", enterpriseServiceLinks, enterpriseActive, enterpriseServiceParentPath)}
            {renderMobileDropdown("cases", "사건 대응", caseResponseLinks, casesActive, caseResponseParentPath)}

            {primaryNavLinks.slice(2).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "bg-trust-blue-light text-trust-blue"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {renderMobileDropdown("info", "노무 정보센터", laborInfoLinks, infoActive, laborInfoParentPath)}

            <Link
              to="/inquiry"
              className="rounded-lg bg-trust-blue px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
            >
              상담문의
            </Link>
          </nav>
        </div>
      </header>

      <div className="h-[72px]" />
    </>
  );
};

export default Header;
