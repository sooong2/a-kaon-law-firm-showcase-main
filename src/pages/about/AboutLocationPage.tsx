import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { AboutCtaBanner, AboutLocationActions, AboutPageLayout } from "./aboutShared";
import ScrollReveal from "@/components/ScrollReveal";

const AboutLocationPage = () => (
  <AboutPageLayout
    badge="● LOCATION"
    title="오시는 길"
    subtitle="노무법인 가온 사무소 위치 및 연락처 안내입니다."
    footer={
      <AboutCtaBanner
        title="노무 파트너, 가온과 함께하세요"
        subtitle="기업 규모와 상황에 맞는 자문 방향을 안내해 드립니다."
        parallax
      />
    }
  >
    <ScrollReveal>
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
        <div className="h-[320px] md:h-[400px]">
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
        <div className="grid gap-5 p-6 sm:grid-cols-2 md:p-8">
          {[
            { icon: MapPin, label: "주소", value: "서울특별시 강남구 테헤란로 142, 8층" },
            { icon: Phone, label: "대표 전화", value: "070-1234-5678", href: "tel:070-1234-5678" },
            { icon: Mail, label: "이메일", value: "gaon@gaonhr.com", href: "mailto:gaon@gaonhr.com" },
            { icon: Clock, label: "업무 시간", value: "평일 09:00 - 18:00 (주말/공휴일 휴무)" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-trust-blue-light">
                <item.icon className="h-5 w-5 text-trust-blue" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                {"href" in item && item.href ? (
                  <a href={item.href} className="text-sm text-muted-foreground hover:text-trust-blue">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
    <AboutLocationActions />
  </AboutPageLayout>
);

export default AboutLocationPage;
