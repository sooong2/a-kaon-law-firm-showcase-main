/* ===== 노무법인 가온 - Header Component ===== */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, User } from "lucide-react";

const navItems = [
  { label: "노무법인 가온", path: "/" },
  { label: "스마트 진단 센터", path: "/diagnosis" },
  { label: "기업 지원 센터", path: "/corporate" },
  { label: "컨설팅 센터", path: "/consulting" },
  { label: "사건 대응 센터", path: "/case" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ===== Sticky Header ===== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-surface shadow-lg backdrop-blur-md border-b border-border py-3"
            : "bg-surface/95 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <span className="text-primary-foreground font-black text-lg">가</span>
            </div>
            <div>
              <span className="text-foreground font-bold text-lg tracking-tight">노무법인</span>
              <span className="text-trust-blue font-black text-lg ml-1">가온</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link px-4 py-2 rounded-lg ${
                  location.pathname === item.path
                    ? "text-trust-blue font-semibold bg-trust-blue-light"
                    : "text-foreground hover:text-trust-blue"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/membership"
              className="ml-2 px-6 py-2.5 rounded-lg bg-navy text-primary-foreground font-semibold text-sm transition-all duration-300 hover:bg-navy-light hover:shadow-lg"
            >
              멤버십
            </Link>
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4 text-sm">
            <a href="tel:070-1234-5678" className="flex items-center gap-1.5 text-muted-foreground hover:text-trust-blue transition-colors">
              <Phone className="w-4 h-4" />
              <span>070-1234-5678</span>
            </a>
            <button className="flex items-center gap-1.5 text-muted-foreground hover:text-trust-blue transition-colors">
              <User className="w-4 h-4" />
              <span>로그인</span>
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1 border-t border-border">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-trust-blue bg-trust-blue-light"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/membership"
              className="px-4 py-3 rounded-lg text-sm font-semibold bg-navy text-primary-foreground text-center mt-2"
            >
              멤버십
            </Link>
          </nav>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[72px]" />
    </>
  );
};

export default Header;
