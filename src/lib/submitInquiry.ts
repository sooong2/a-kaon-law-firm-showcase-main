import type { InquiryCategoryValue } from "@/lib/inquiryOptions";

/** 상담 문의 폼 payload — WordPress / Supabase 등 백엔드 연동 시 그대로 사용 */
export type InquiryPayload = {
  category: InquiryCategoryValue;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  employeeCount?: string;
  subject?: string;
  message: string;
  submittedAt: string;
};

/**
 * 상담 문의 전송
 * TODO: WordPress Contact Form 7, Supabase Edge Function, Resend 등으로 교체
 */
export async function submitInquiry(data: Omit<InquiryPayload, "submittedAt">): Promise<void> {
  const payload: InquiryPayload = {
    ...data,
    submittedAt: new Date().toISOString(),
  };

  // 개발 단계: 콘솔에 분류별 payload 출력 (연동 전 확인용)
  if (import.meta.env.DEV) {
    console.info("[Inquiry submitted]", payload);
  }

  // 연동 전 목업 지연
  await new Promise((resolve) => setTimeout(resolve, 600));

  // 추후 실제 API 호출 예시:
  // await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
}
