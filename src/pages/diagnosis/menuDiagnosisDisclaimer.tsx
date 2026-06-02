/** 진단 선택 카드 전용 페이지 하단 고지 (문구만 요청본과 동일) */
export const MENU_DIAGNOSIS_DISCLAIMER =
  "본 진단은 입력된 정보를 바탕으로 제공되는 참고용 결과이며, 실제 법률 판단 및 행정 대응은 공인노무사 상담을 통해 확인하시기 바랍니다.";

export function MenuDiagnosisDisclaimerBlock() {
  return (
    <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/90 px-4 py-4 text-center text-xs leading-relaxed text-muted-foreground md:text-sm">
      {MENU_DIAGNOSIS_DISCLAIMER}
    </p>
  );
}
