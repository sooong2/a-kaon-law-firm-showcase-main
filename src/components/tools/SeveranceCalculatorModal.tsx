import { useMemo, useState } from "react";
import { Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { calculateSeverance, formatKRW } from "@/lib/laborCalculators";
import {
  CalculatorDisclaimer,
  CalculatorField,
  CalculatorResultCard,
} from "@/components/tools/calculatorShared";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SeveranceCalculatorModal({ open, onOpenChange }: Props) {
  const [hireDate, setHireDate] = useState("");
  const [resignDate, setResignDate] = useState("");
  const [monthlyWage, setMonthlyWage] = useState("");
  const [bonusIncluded, setBonusIncluded] = useState(true);

  const result = useMemo(
    () =>
      calculateSeverance({
        hireDate,
        resignDate,
        monthlyAverageWage: Number(monthlyWage.replace(/,/g, "")) || 0,
        bonusIncluded,
      }),
    [hireDate, resignDate, monthlyWage, bonusIncluded],
  );

  const handleWageChange = (value: string) => {
    const digits = value.replace(/[^\d]/g, "");
    setMonthlyWage(digits ? Number(digits).toLocaleString("ko-KR") : "");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-navy">
            <Wallet className="h-5 w-5 text-trust-blue" />
            퇴직금 계산기
          </DialogTitle>
          <DialogDescription>
            근로기준법 제34조 기준 — 1일 평균임금 × 30일 × (총 근속일수 ÷ 365)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <CalculatorField label="입사일" htmlFor="severance-hire">
              <Input
                id="severance-hire"
                type="date"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
              />
            </CalculatorField>
            <CalculatorField label="퇴사일" htmlFor="severance-resign">
              <Input
                id="severance-resign"
                type="date"
                value={resignDate}
                onChange={(e) => setResignDate(e.target.value)}
              />
            </CalculatorField>
          </div>

          <CalculatorField
            label="최근 3개월 평균임금"
            htmlFor="severance-wage"
            hint="퇴직일 이전 3개월 임금 총액을 3으로 나눈 월평균액 (원)"
          >
            <div className="relative">
              <Input
                id="severance-wage"
                inputMode="numeric"
                placeholder="예: 3,500,000"
                value={monthlyWage}
                onChange={(e) => handleWageChange(e.target.value)}
                className="pr-10"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                원
              </span>
            </div>
          </CalculatorField>

          <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-muted/30 px-4 py-3">
            <Checkbox
              id="severance-bonus"
              checked={bonusIncluded}
              onCheckedChange={(v) => setBonusIncluded(v === true)}
            />
            <Label htmlFor="severance-bonus" className="cursor-pointer text-sm leading-snug">
              상여금 포함 (정기·연 1회 이상 상여금을 3개월 평균임금에 반영)
            </Label>
          </div>

          {result.valid ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">계산 결과</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <CalculatorResultCard label="총 근속일수" value={`${result.totalServiceDays!.toLocaleString()}일`} />
                <CalculatorResultCard label="평균임금 (월)" value={formatKRW(result.averageMonthlyWage!)} />
                <CalculatorResultCard
                  label="예상 퇴직금"
                  value={formatKRW(result.estimatedSeverance!)}
                  highlight
                />
              </div>
              <p className="text-xs text-muted-foreground">{result.bonusNote}</p>
            </div>
          ) : (
            hireDate &&
            resignDate &&
            monthlyWage && (
              <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{result.error}</p>
            )
          )}

          <CalculatorDisclaimer />
        </div>
      </DialogContent>
    </Dialog>
  );
}
