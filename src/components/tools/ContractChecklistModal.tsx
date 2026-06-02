import { useMemo, useState } from "react";
import { ClipboardCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { diagnoseContractChecklist } from "@/lib/laborDiagnostics";
import { CalculatorDisclaimer, CalculatorResultCard } from "@/components/tools/calculatorShared";

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

const CHECK_ITEMS = [
  { key: "hasWorkHours" as const, label: "근무시간 기재" },
  { key: "hasBreakTime" as const, label: "휴게시간 기재" },
  { key: "hasWages" as const, label: "임금(구성·계산·지급방법) 기재" },
  { key: "hasAnnualLeave" as const, label: "연차유급휴가 기재" },
];

export default function ContractChecklistModal({ open, onOpenChange }: Props) {
  const [checks, setChecks] = useState({
    hasWorkHours: false,
    hasBreakTime: false,
    hasWages: false,
    hasAnnualLeave: false,
  });

  const result = useMemo(() => diagnoseContractChecklist(checks), [checks]);

  const toggle = (key: keyof typeof checks) => {
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-navy">
            <ClipboardCheck className="h-5 w-5 text-trust-blue" />
            근로계약서 체크리스트
          </DialogTitle>
          <DialogDescription>근로기준법 제17조 필수 기재 항목 누락 여부를 점검합니다.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-3 rounded-xl border border-border/80 bg-muted/20 p-4">
            {CHECK_ITEMS.map((item) => (
              <div key={item.key} className="flex items-center gap-3">
                <Checkbox
                  id={item.key}
                  checked={checks[item.key]}
                  onCheckedChange={() => toggle(item.key)}
                />
                <Label htmlFor={item.key} className="cursor-pointer text-sm">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">점검 결과</p>
            <CalculatorResultCard
              label="점검 상태"
              value={result.complete ? "필수 항목 충족" : `누락 ${result.missingItems.length}건`}
              highlight={!result.complete}
            />

            {!result.complete && (
              <>
                <div className="rounded-xl border border-red-200/80 bg-red-50/50 p-4">
                  <p className="text-xs font-semibold text-red-800">누락 항목</p>
                  <ul className="mt-2 space-y-1">
                    {result.missingItems.map((item) => (
                      <li key={item} className="text-sm font-medium text-red-700">
                        · {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border/80 bg-slate-50/80 p-4">
                  <p className="text-xs font-semibold text-foreground">법적 리스크 안내</p>
                  <ul className="mt-2 space-y-2">
                    {result.risks.map((r) => (
                      <li key={r} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {result.complete && (
              <p className="rounded-xl border border-trust-blue/20 bg-trust-blue-light/40 px-4 py-3 text-sm text-muted-foreground">
                필수 기재 항목이 모두 포함된 것으로 확인되었습니다. 세부 조항(수습·해고 등)은 별도 검토를 권장합니다.
              </p>
            )}
          </div>

          <CalculatorDisclaimer />
        </div>
      </DialogContent>
    </Dialog>
  );
}
