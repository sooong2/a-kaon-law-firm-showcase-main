import { useMemo, useState } from "react";
import { ShieldAlert } from "lucide-react";
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
import { diagnoseHarassment, type FrequencyLevel } from "@/lib/laborDiagnostics";
import {
  CalculatorDisclaimer,
  CalculatorField,
  CalculatorResultCard,
} from "@/components/tools/calculatorShared";

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

export default function HarassmentDiagnosisModal({ open, onOpenChange }: Props) {
  const [repeatability, setRepeatability] = useState<FrequencyLevel>("sometimes");
  const [workRelated, setWorkRelated] = useState(true);
  const [mentalHarm, setMentalHarm] = useState(false);
  const [hierarchy, setHierarchy] = useState(false);

  const result = useMemo(
    () => diagnoseHarassment({ repeatability, workRelated, mentalHarm, hierarchy }),
    [repeatability, workRelated, mentalHarm, hierarchy],
  );

  const likelihoodColor =
    result.likelihood === "high" ? "text-red-600" : result.likelihood === "medium" ? "text-amber-600" : "text-trust-blue";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-navy">
            <ShieldAlert className="h-5 w-5 text-trust-blue" />
            직장 내 괴롭힘 진단
          </DialogTitle>
          <DialogDescription>직장 내 괴롭힘 예방법 기준으로 해당 가능성을 점검합니다.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <CalculatorField label="반복성">
            <Select value={repeatability} onValueChange={(v) => setRepeatability(v as FrequencyLevel)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음 / 1회성</SelectItem>
                <SelectItem value="sometimes">가끔 (2~3회)</SelectItem>
                <SelectItem value="repeated">반복적 (지속·반복)</SelectItem>
              </SelectContent>
            </Select>
          </CalculatorField>

          <div className="space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4">
            {[
              { id: "work", label: "업무와 관련된 행위", checked: workRelated, set: setWorkRelated },
              { id: "mental", label: "정신적 피해(불안·수면장애 등) 경험", checked: mentalHarm, set: setMentalHarm },
              { id: "hierarchy", label: "상하관계(상사·부하) 존재", checked: hierarchy, set: setHierarchy },
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
            <CalculatorResultCard
              label="직장 내 괴롭힘 해당 가능성"
              value={<span className={likelihoodColor}>{result.likelihoodLabel}</span>}
              highlight
            />
            <div className="rounded-xl border border-border/80 bg-slate-50/80 p-4">
              <p className="text-xs font-semibold text-foreground">권장 대응 방법</p>
              <ul className="mt-3 space-y-2">
                {result.recommendations.map((r) => (
                  <li key={r} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-trust-blue" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <CalculatorDisclaimer />
        </div>
      </DialogContent>
    </Dialog>
  );
}
