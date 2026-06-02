/* ===== 노무법인 가온 - 상담 문의 ===== */
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Mail, Phone, Shield } from "lucide-react";
import heroHandshake from "@/assets/악수.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import InquirySectionSidebar from "@/components/InquirySectionSidebar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EMPLOYEE_COUNT_OPTIONS,
  INQUIRY_CATEGORIES,
  INQUIRY_CATEGORY_VALUES,
  isInquiryCategory,
  type InquiryCategoryValue,
} from "@/lib/inquiryOptions";
import { submitInquiry } from "@/lib/submitInquiry";

const inquiryFormSchema = z.object({
  category: z.enum(INQUIRY_CATEGORY_VALUES as [InquiryCategoryValue, ...InquiryCategoryValue[]], {
    required_error: "상담 구분을 선택해 주세요.",
  }),
  companyName: z.string().trim().min(1, "회사명(또는 사업장명)을 입력해 주세요."),
  contactName: z.string().trim().min(1, "담당자명을 입력해 주세요."),
  phone: z
    .string()
    .trim()
    .min(1, "연락처를 입력해 주세요.")
    .regex(/^[\d\-+\s()]+$/, "올바른 연락처 형식을 입력해 주세요."),
  email: z.string().trim().email("올바른 이메일 주소를 입력해 주세요."),
  employeeCount: z.string().optional(),
  subject: z.string().trim().optional(),
  message: z.string().trim().min(10, "문의 내용을 10자 이상 입력해 주세요."),
  privacyAgreed: z.boolean().refine((val) => val === true, {
    message: "개인정보 수집·이용에 동의해 주세요.",
  }),
});

type InquiryFormValues = z.infer<typeof inquiryFormSchema>;

const defaultValues: InquiryFormValues = {
  category: "other",
  companyName: "",
  contactName: "",
  phone: "",
  email: "",
  employeeCount: "",
  subject: "",
  message: "",
  privacyAgreed: false,
};

const InquiryPage = () => {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const categoryParam = searchParams.get("category");
  const formSectionRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues,
  });

  const selectedCategory = watch("category");
  const privacyAgreed = watch("privacyAgreed");

  useEffect(() => {
    if (isInquiryCategory(categoryParam)) {
      setValue("category", categoryParam);
    }
  }, [categoryParam, setValue]);

  const onSubmit = async (values: InquiryFormValues) => {
    try {
      await submitInquiry({
        category: values.category,
        companyName: values.companyName,
        contactName: values.contactName,
        phone: values.phone,
        email: values.email,
        employeeCount: values.employeeCount || undefined,
        subject: values.subject || undefined,
        message: values.message,
      });

      setSubmitted(true);
      toast.success("상담 문의가 접수되었습니다.", {
        description: "담당자가 확인 후 빠르게 연락드리겠습니다.",
      });
    } catch {
      toast.error("문의 접수에 실패했습니다.", {
        description: "잠시 후 다시 시도해 주시거나 전화로 문의해 주세요.",
      });
    }
  };

  const handleReset = () => {
    reset(defaultValues);
    setSubmitted(false);
    if (isInquiryCategory(categoryParam)) {
      setValue("category", categoryParam);
    }
  };

  /** 우측(데스크톱) / 상단(모바일) 연락 안내 */
  const inquirySidebar = (
    <>
      <div className="rounded-2xl border border-border/90 bg-card p-5 shadow-sm sm:p-6">
        <h3 className="text-sm font-bold text-navy">빠른 연락</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <a
            href="tel:070-1234-5678"
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-slate-50/50 p-3 text-sm transition-colors hover:border-trust-blue/30 hover:bg-trust-blue-light/40 lg:border-0 lg:bg-transparent lg:p-0 lg:hover:bg-transparent"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-trust-blue-light">
              <Phone className="h-4 w-4 text-trust-blue" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">대표 전화</p>
              <p className="font-semibold text-foreground">070-1234-5678</p>
            </div>
          </a>
          <a
            href="mailto:gaon@gaonhr.com"
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-slate-50/50 p-3 text-sm transition-colors hover:border-trust-blue/30 hover:bg-trust-blue-light/40 lg:border-0 lg:bg-transparent lg:p-0 lg:hover:bg-transparent"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-trust-blue-light">
              <Mail className="h-4 w-4 text-trust-blue" />
            </div>
            <div className="min-w-0 break-all">
              <p className="text-xs text-muted-foreground">이메일</p>
              <p className="font-semibold text-foreground">gaon@gaonhr.com</p>
            </div>
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-[#3d83f5]/20 bg-gradient-to-br from-sky-50/80 to-white p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-trust-blue" />
          <div>
            <h3 className="text-sm font-bold text-navy">전문 노무사 상담</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-[0.8125rem]">
              접수된 문의는 상담 구분에 따라 담당 공인노무사가 검토합니다.
              긴급 노동 사건은 전화 상담을 권장드립니다.
            </p>
          </div>
        </div>
      </div>

      <p className="px-1 text-center text-xs leading-relaxed text-muted-foreground lg:text-left">
        평일 09:00 – 18:00 운영 (주말·공휴일 휴무)
        <br />
        접수 후 영업일 기준 1~2일 내 회신드립니다.
      </p>
    </>
  );

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[320px] items-center overflow-hidden sm:min-h-[400px] md:min-h-[480px]">
        <div className="absolute inset-0">
          <img src={heroHandshake} alt="상담 문의" className="h-full w-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-12 text-center sm:py-16">
          <span className="badge-blue animate-fade-up border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm">
            ● INQUIRY
          </span>
          <h1 className="animate-fade-up text-3xl font-black leading-tight text-primary-foreground sm:text-4xl md:text-5xl" style={{ animationDelay: "0.15s" }}>
            상담 문의
          </h1>
          <p className="animate-fade-up mx-auto mt-4 max-w-xl px-1 text-sm text-primary-foreground/75 sm:mt-5 sm:text-base md:text-lg" style={{ animationDelay: "0.3s" }}>
            기업 규모와 문의 유형에 맞춰 담당 노무사가
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            신속하게 연락드립니다.
          </p>
        </div>
      </section>

      {/* Form + Sticky Sidebar */}
      <section className="section-light py-10 sm:py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          {/* 모바일·태블릿: 폼 위 연락 안내 */}
          <aside className="mb-8 space-y-4 lg:hidden">{inquirySidebar}</aside>

          {/*
            데스크톱: flex + stretch 로 우측 컬럼 높이 = 폼 높이
            → sticky 요소가 섹션(양식) 범위 안에서만 위·아래로 따라 이동
          */}
          <div ref={formSectionRef} className="flex flex-col lg:flex-row lg:items-stretch lg:gap-10">
            <ScrollReveal className="min-w-0 flex-1">
              <div className="rounded-2xl border border-border/90 bg-card p-5 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.12)] sm:p-6 md:p-10">
                {submitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-trust-blue-light">
                      <CheckCircle2 className="h-8 w-8 text-trust-blue" />
                    </div>
                    <h2 className="text-2xl font-bold text-navy">문의가 접수되었습니다</h2>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      영업일 기준 1~2일 내 담당자가 연락드립니다.
                      <br />
                      긴급한 사안은 전화로 먼저 문의해 주세요.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      <button type="button" onClick={handleReset} className="btn-outline px-6 py-3 text-sm">
                        추가 문의하기
                      </button>
                      <Link to="/" className="btn-primary px-6 py-3 text-sm">
                        홈으로
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-6 border-b border-border/80 pb-5 sm:mb-8 sm:pb-6">
                      <h2 className="text-xl font-bold text-navy sm:text-2xl">상담 접수 양식</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        아래 항목을 작성해 주시면 문의 유형별로 담당 부서에서 확인합니다.
                        <br className="hidden sm:block" />
                        <span className="text-xs text-muted-foreground/80">* 표시는 필수 입력 항목입니다.</span>
                      </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6" noValidate>
                      {/* 상담 구분 */}
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-foreground">
                          상담 구분 <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={selectedCategory}
                          onValueChange={(value) => setValue("category", value as InquiryCategoryValue, { shouldValidate: true })}
                        >
                          <SelectTrigger id="category" className="h-11 rounded-lg border-border/90">
                            <SelectValue placeholder="상담 구분을 선택해 주세요" />
                          </SelectTrigger>
                          <SelectContent>
                            {INQUIRY_CATEGORIES.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.category ? <p className="text-xs text-destructive">{errors.category.message}</p> : null}
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">
                            회사명 / 사업장명 <span className="text-destructive">*</span>
                          </Label>
                          <Input id="companyName" placeholder="예) 주식회사 ○○○" className="h-11 rounded-lg" {...register("companyName")} />
                          {errors.companyName ? <p className="text-xs text-destructive">{errors.companyName.message}</p> : null}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactName">
                            담당자명 <span className="text-destructive">*</span>
                          </Label>
                          <Input id="contactName" placeholder="홍길동" className="h-11 rounded-lg" {...register("contactName")} />
                          {errors.contactName ? <p className="text-xs text-destructive">{errors.contactName.message}</p> : null}
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            연락처 <span className="text-destructive">*</span>
                          </Label>
                          <Input id="phone" type="tel" placeholder="010-0000-0000" className="h-11 rounded-lg" {...register("phone")} />
                          {errors.phone ? <p className="text-xs text-destructive">{errors.phone.message}</p> : null}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            이메일 <span className="text-destructive">*</span>
                          </Label>
                          <Input id="email" type="email" placeholder="example@company.com" className="h-11 rounded-lg" {...register("email")} />
                          {errors.email ? <p className="text-xs text-destructive">{errors.email.message}</p> : null}
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="employeeCount">근로자 수 (선택)</Label>
                          <Select
                            value={watch("employeeCount") || undefined}
                            onValueChange={(value) => setValue("employeeCount", value)}
                          >
                            <SelectTrigger id="employeeCount" className="h-11 rounded-lg border-border/90">
                              <SelectValue placeholder="규모를 선택해 주세요" />
                            </SelectTrigger>
                            <SelectContent>
                              {EMPLOYEE_COUNT_OPTIONS.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">문의 제목 (선택)</Label>
                          <Input id="subject" placeholder="예) 취업규칙 정비 상담" className="h-11 rounded-lg" {...register("subject")} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          문의 내용 <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          rows={6}
                          placeholder="현재 상황과 필요하신 지원 범위를 자유롭게 작성해 주세요."
                          className="min-h-[160px] resize-y rounded-lg"
                          {...register("message")}
                        />
                        {errors.message ? <p className="text-xs text-destructive">{errors.message.message}</p> : null}
                      </div>

                      {/* 개인정보 동의 */}
                      <div className="rounded-xl border border-border/80 bg-slate-50/80 p-3.5 sm:p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="privacyAgreed"
                            checked={privacyAgreed}
                            onCheckedChange={(checked) =>
                              setValue("privacyAgreed", checked === true, { shouldValidate: true })
                            }
                            className="mt-1 h-5 w-5 shrink-0"
                          />
                          <div className="space-y-1">
                            <Label htmlFor="privacyAgreed" className="cursor-pointer font-semibold text-foreground">
                              개인정보 수집·이용 동의 <span className="text-destructive">*</span>
                            </Label>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                              상담 접수 및 답변을 위해 성명, 연락처, 이메일, 문의 내용을 수집·이용합니다.
                              수집된 정보는 상담 목적 외 사용되지 않으며, 상담 완료 후 관련 법령에 따라 보관·파기됩니다.
                            </p>
                          </div>
                        </div>
                        {errors.privacyAgreed ? <p className="mt-2 text-xs text-destructive">{errors.privacyAgreed.message}</p> : null}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full justify-center py-3.5 text-sm sm:py-4 sm:text-base disabled:opacity-60"
                      >
                        {isSubmitting ? "접수 중..." : "상담 문의 접수하기"}
                        {!isSubmitting ? <ArrowRight className="h-4 w-4" /> : null}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </ScrollReveal>

            <InquirySectionSidebar sectionRef={formSectionRef}>
              {inquirySidebar}
            </InquirySectionSidebar>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InquiryPage;
