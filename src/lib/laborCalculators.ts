import {
  addMonths,
  addYears,
  differenceInCalendarDays,
  differenceInMonths,
  format,
  isBefore,
  isValid,
  parseISO,
  set,
  startOfDay,
} from "date-fns";
import { ko } from "date-fns/locale";

/** 원화 포맷 */
export function formatKRW(amount: number): string {
  return `${Math.round(amount).toLocaleString("ko-KR")}원`;
}

export function parseDateInput(value: string): Date | null {
  if (!value) return null;
  const d = parseISO(value);
  return isValid(d) ? startOfDay(d) : null;
}

/** 근로기준법 제34조 — 1일 평균임금 × 30 × (근속일수 / 365) */
export type SeveranceInput = {
  hireDate: string;
  resignDate: string;
  /** 최근 3개월 월평균임금 (원) */
  monthlyAverageWage: number;
  bonusIncluded: boolean;
};

export type SeveranceResult = {
  valid: boolean;
  error?: string;
  totalServiceDays?: number;
  averageDailyWage?: number;
  averageMonthlyWage?: number;
  estimatedSeverance?: number;
  bonusNote?: string;
};

export function calculateSeverance(input: SeveranceInput): SeveranceResult {
  const hire = parseDateInput(input.hireDate);
  const resign = parseDateInput(input.resignDate);

  if (!hire || !resign) {
    return { valid: false, error: "입사일과 퇴사일을 입력해 주세요." };
  }

  if (isBefore(resign, hire)) {
    return { valid: false, error: "퇴사일은 입사일 이후여야 합니다." };
  }

  if (!input.monthlyAverageWage || input.monthlyAverageWage <= 0) {
    return { valid: false, error: "최근 3개월 평균임금을 입력해 주세요." };
  }

  // 근속일수: 입사일·퇴사일 모두 포함
  const totalServiceDays = differenceInCalendarDays(resign, hire) + 1;

  // 1일 평균임금 = 월평균임금 / 30 (실무·행정 해석 관행)
  const averageDailyWage = input.monthlyAverageWage / 30;
  const averageMonthlyWage = input.monthlyAverageWage;

  // 퇴직금 = 1일평균임금 × 30 × (근속일수 / 365)
  const estimatedSeverance = averageDailyWage * 30 * (totalServiceDays / 365);

  const bonusNote = input.bonusIncluded
    ? "입력하신 평균임금에 상여금이 포함된 것으로 계산했습니다."
    : "상여금이 미포함된 경우, 실제 평균임금 산정 시 정기 상여금을 3개월간 일할 가산해야 할 수 있습니다.";

  return {
    valid: true,
    totalServiceDays,
    averageDailyWage,
    averageMonthlyWage,
    estimatedSeverance,
    bonusNote,
  };
}

/** 근로기준법 제60조 — 연차유급휴가 */
export type AnnualLeaveInput = {
  hireDate: string;
  /** 기준일 (기본: 오늘) */
  referenceDate?: Date;
};

export type AnnualLeaveResult = {
  valid: boolean;
  error?: string;
  isUnderOneYear?: boolean;
  /** 1년 미만 구간에서 발생한 연차 */
  firstYearAccrued?: number;
  /** 1년 이상 근속 시 연간 발생 연차 */
  annualEntitlement?: number;
  /** 현재 사용 가능 (미사용 가정) */
  availableLeave?: number;
  nextAccrualDate?: Date;
  nextAccrualLabel?: string;
  completedMonths?: number;
  fullYears?: number;
};

export function calculateAnnualLeave(input: AnnualLeaveInput): AnnualLeaveResult {
  const hire = parseDateInput(input.hireDate);
  const today = startOfDay(input.referenceDate ?? new Date());

  if (!hire) {
    return { valid: false, error: "입사일을 입력해 주세요." };
  }

  if (isBefore(today, hire)) {
    return { valid: false, error: "입사일은 오늘 이전이어야 합니다." };
  }

  const monthsWorked = differenceInMonths(today, hire);

  // 1년(12개월) 미만: 매월 1일 발생, 최대 11일 (출근율 80% 이상 가정)
  if (monthsWorked < 12) {
    const firstYearAccrued = Math.min(monthsWorked, 11);
    const nextAccrualDate = addMonths(hire, monthsWorked + 1);
    const nextLabel =
      monthsWorked >= 11
        ? format(addMonths(hire, 12), "yyyy년 M월 d일", { locale: ko }) + " (1년 만근 시 15일)"
        : format(nextAccrualDate, "yyyy년 M월 d일", { locale: ko }) + " (1일 추가 발생)";

    return {
      valid: true,
      isUnderOneYear: true,
      firstYearAccrued,
      annualEntitlement: 0,
      availableLeave: firstYearAccrued,
      nextAccrualDate: monthsWorked >= 11 ? addMonths(hire, 12) : nextAccrualDate,
      nextAccrualLabel: nextLabel,
      completedMonths: monthsWorked,
      fullYears: 0,
    };
  }

  // 1년 이상: 15일 + 2년마다 1일 (최대 25일)
  let fullYears = differenceInMonths(today, hire) >= 12 ? Math.floor(monthsWorked / 12) : 0;

  // 아직 올해 입사기념일 전이면 1년 차감
  const anniversaryThisYear = set(hire, { year: today.getFullYear() });
  if (isBefore(today, anniversaryThisYear)) {
    fullYears = Math.max(1, fullYears - 1);
  } else {
    fullYears = Math.max(1, fullYears);
  }

  // 정확한 만근 연수: 입사기념일 기준
  let completedYears = today.getFullYear() - hire.getFullYear();
  const anniversaryPassed =
    today.getMonth() > hire.getMonth() ||
    (today.getMonth() === hire.getMonth() && today.getDate() >= hire.getDate());
  if (!anniversaryPassed) {
    completedYears -= 1;
  }
  completedYears = Math.max(1, completedYears);

  const annualEntitlement = Math.min(15 + Math.floor((completedYears - 1) / 2), 25);

  // 다음 연차 갱신일 = 다음 입사기념일
  let nextAnniversary = anniversaryThisYear;
  if (!isBefore(today, anniversaryThisYear)) {
    nextAnniversary = addYears(anniversaryThisYear, 1);
  }

  const nextYears = completedYears + 1;
  const nextEntitlement = Math.min(15 + Math.floor((nextYears - 1) / 2), 25);
  const entitlementIncrease = nextEntitlement > annualEntitlement;

  const nextAccrualLabel = entitlementIncrease
    ? `${format(nextAnniversary, "yyyy년 M월 d일", { locale: ko })} (연 ${nextEntitlement}일로 갱신)`
    : `${format(nextAnniversary, "yyyy년 M월 d일", { locale: ko })} (연차 갱신일)`;

  return {
    valid: true,
    isUnderOneYear: false,
    firstYearAccrued: 0,
    annualEntitlement,
    availableLeave: annualEntitlement,
    nextAccrualDate: nextAnniversary,
    nextAccrualLabel,
    completedMonths: monthsWorked,
    fullYears: completedYears,
  };
}

export const CALCULATOR_DISCLAIMER =
  "본 결과는 참고용이며 실제 법률 검토는 공인노무사 상담이 필요할 수 있습니다.";
