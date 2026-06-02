import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { calculateAnnualLeave } from "@/lib/laborCalculators";
import {
  CalculatorDisclaimer,
  CalculatorField,
  CalculatorResultCard,
} from "@/components/tools/calculatorShared";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AnnualLeaveCalculatorModal({ open, onOpenChange }: Props) {
  const [hireDate, setHireDate] = useState("");

  const result = useMemo(() => calculateAnnualLeave({ hireDate }), [hireDate]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-navy">
            <CalendarDays className="h-5 w-5 text-trust-blue" />
            연차 계산기
          </DialogTitle>
          <DialogDescription>
            근로기준법 제60조 기준 — 1년 미만 월 1일(최대 11일), 1년 이상 15일+(2년마다 1일, 최대 25일)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <CalculatorField
            label="입사일"
            htmlFor="annual-hire"
            hint="출근율 80% 이상을 충족한다고 가정하여 산출합니다."
          >
            <Input
              id="annual-hire"
              type="date"
              value={hireDate}
              onChange={(e) => setHireDate(e.target.value)}
            />
          </CalculatorField>

          {result.valid ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">계산 결과</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <CalculatorResultCard
                  label="1년 미만 발생 연차"
                  value={result.isUnderOneYear ? `${result.firstYearAccrued}일` : "— (1년 이상)"}
                />
                <CalculatorResultCard
                  label="1년 이상 발생 연차"
                  value={result.isUnderOneYear ? "— (1년 미만)" : `${result.annualEntitlement}일`}
                />
                <CalculatorResultCard
                  label="현재 사용 가능 연차"
                  value={`${result.availableLeave}일`}
                  highlight
                />
                <CalculatorResultCard label="다음 연차 발생일" value={result.nextAccrualLabel ?? "—"} />
              </div>
              <p className="text-xs text-muted-foreground">
                {result.isUnderOneYear
                  ? `입사 후 ${result.completedMonths}개월 경과 (1년 미만 구간)`
                  : `만 ${result.fullYears}년 근속 기준 · 미사용 연차는 차감하지 않았습니다`}
              </p>
            </div>
          ) : (
            hireDate && (
              <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{result.error}</p>
            )
          )}

          <CalculatorDisclaimer />
        </div>
      </DialogContent>
    </Dialog>
  );
}
