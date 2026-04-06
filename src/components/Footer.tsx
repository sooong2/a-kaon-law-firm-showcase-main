/* ===== 노무법인 가온 - Footer Component ===== */
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer>
      {/* ===== Contact & Map Section ===== */}
      <section className="section-white py-20" id="contact">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              노무법인 가온 <span className="text-trust-blue">CONTACT</span>
            </h2>
            <p className="text-muted-foreground mt-3">편하게 문의해 주세요</p>
          </div>

          {/* Contact buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="tel:070-1234-5678" className="btn-primary">
              <Phone className="w-5 h-5" />
              전화 상담
            </a>
            <a href="mailto:gaon@gaonhr.com" className="btn-outline">
              <Mail className="w-5 h-5" />
              이메일 문의
            </a>
            <button className="btn-navy">
              <Clock className="w-5 h-5" />
              상담 예약
            </button>
          </div>

          {/* Map + Info grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.2!2d127.028!3d37.4979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca159000000:0x0!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDthYztl6TrnoDroZwgMTQy!5e0!3m2!1sko!2skr!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="오시는 길"
              />
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center gap-6 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-trust-blue-light flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-trust-blue" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">주소</p>
                  <p className="text-muted-foreground text-sm">서울특별시 강남구 테헤란로 142, 8층</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-trust-blue-light flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-trust-blue" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">대표 전화</p>
                  <p className="text-muted-foreground text-sm">T. 070-1234-5678</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-trust-blue-light flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-trust-blue" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">이메일</p>
                  <p className="text-muted-foreground text-sm">M. gaon@gaonhr.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-trust-blue-light flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-trust-blue" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">업무 시간</p>
                  <p className="text-muted-foreground text-sm">평일 09:00 - 18:00 (주말/공휴일 휴무)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Bottom Footer ===== */}
      <div className="section-dark py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-trust-blue flex items-center justify-center">
                <span className="text-primary-foreground font-black text-sm">가</span>
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
