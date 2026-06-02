import { useMemo, useState } from "react";
import { Scale } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { diagnoseDismissalRisk, type TenureRange } from "@/lib/laborDiagnostics";
import {
  CalculatorDisclaimer,
  CalculatorField,
  CalculatorResultCard,
} from "@/components/tools/calculatorShared";

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

export default function DismissalRiskModal({ open, onOpenChange }: Props) {
  const [tenure, setTenure] = useState<TenureRange>("1to3y");
  const [hasDiscipline, setHasDiscipline] = useState(false);
  const [hasPriorWarning, setHasPriorWarning] = useState(false);
  const [hasWrittenNotice, setHasWrittenNotice] = useState(false);

  const result = useMemo(
    () => diagnoseDismissalRisk({ tenure, hasDiscipline, hasPriorWarning, hasWrittenNotice }),
    [tenure, hasDiscipline, hasPriorWarning, hasWrittenNotice],
  );

  const scoreColor =
    result.level === "high" ? "text-red-600" : result.level === "medium" ? "text-amber-600" : "text-trust-blue";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-navy">
            <Scale className="h-5 w-5 text-trust-blue" />
            해고 리스크 진단
          </DialogTitle>
          <DialogDescription>해고 절차·근속기간 등을 기준으로 분쟁 리스크를 점검합니다.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <CalculatorField label="근속기간">
            <Select value={tenure} onValueChange={(v) => setTenure(v as TenureRange)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under3m">3개월 미만</SelectItem>
                <SelectItem value="3to6m">3~6개월</SelectItem>
                <SelectItem value="6mto1y">6개월~1년</SelectItem>
                <SelectItem value="1to3y">1~3년</SelectItem>
                <SelectItem value="over3y">3년 이상</SelectItem>
              </SelectContent>
            </Select>
          </CalculatorField>

          <div className="space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4">
            {[
              { id: "discipline", label: "징계 절차 진행 이력 있음", checked: hasDiscipline, set: setHasDiscipline },
              { id: "warning", label: "해고 전 사전 경고·시정지시 있음", checked: hasPriorWarning, set: setHasPriorWarning },
              { id: "written", label: "해고(예고) 서면 통지 완료", checked: hasWrittenNotice, set: setHasWrittenNotice },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <Checkbox id={item.id} checked={item.checked} onCheckedChange={(v) => item.set(v === true)} />
                <Label htmlFor={item.id} className="cursor-pointer text-sm">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">진단 결과</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <CalculatorResultCard
                label="해고 리스크 점수"
                value={<span className={scoreColor}>{result.score}점</span>}
                highlight
              />
              <CalculatorResultCard label="리스크 수준" value={result.levelLabel} />
              <CalculatorResultCard
                label="노무사 상담 권장"
                value={result.consultRecommended ? "권장" : "선택"}
                highlight={result.consultRecommended}
              />
            </div>
            <ul className="space-y-2 rounded-xl border border-border/80 bg-slate-50/80 p-4">
              {result.factors.map((f) => (
                <li key={f} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-trust-blue" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <CalculatorDisclaimer />
        </div>
      </DialogContent>
    </Dialog>
  );
}
