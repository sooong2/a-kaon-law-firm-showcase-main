/* ===== 노무법인 가온 - Footer Component ===== */
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo3.png";

const Footer = () => {
  return (
    <footer>
      <div className="section-dark py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                <img src={logoImg} alt="노무법인 가온" className="h-8 w-8 object-contain" width={32} height={32} />
              </div>
              <span className="font-bold">노무법인 가온</span>
            </div>
            <div className="text-center md:text-left opacity-70">
              <p>노무법인 가온 대표 | 김가온 공인노무사</p>
              <p className="mt-1">
                T. 070-1234-5678 | M. gaon@gaonhr.com | 사업자. 123-45-67890 | 주소. 서울특별시 강남구 테헤란로 142, 8층
              </p>
            </div>
            <div className="flex gap-4 opacity-70">
              <Link to="/" className="hover:opacity-100 transition-opacity">이용약관</Link>
              <Link to="/" className="hover:opacity-100 transition-opacity font-semibold">개인정보처리방침</Link>
            </div>
          </div>
          <div className="text-center mt-6 text-xs opacity-50">
            Copyright © 2026 노무법인 가온 All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
