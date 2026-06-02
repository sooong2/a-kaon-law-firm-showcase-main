import { useMemo, useState } from "react";
import { Landmark } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { diagnoseSubsidy, type BusinessSize, type IndustryType } from "@/lib/laborDiagnostics";
import {
  CalculatorDisclaimer,
  CalculatorField,
  CalculatorResultCard,
} from "@/components/tools/calculatorShared";

type Props = { open: boolean; onOpenChange: (open: boolean) => void };

export default function SubsidyDiagnosisModal({ open, onOpenChange }: Props) {
  const [businessSize, setBusinessSize] = useState<BusinessSize>("small");
  const [employeeCount, setEmployeeCount] = useState("");
  const [youthHiring, setYouthHiring] = useState(false);
  const [industry, setIndustry] = useState<IndustryType>("service");

  const result = useMemo(
    () =>
      diagnoseSubsidy({
        businessSize,
        employeeCount: Number(employeeCount.replace(/[^\d]/g, "")) || 0,
        youthHiring,
        industry,
      }),
    [businessSize, employeeCount, youthHiring, industry],
  );

  const hasInput = employeeCount.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-navy">
            <Landmark className="h-5 w-5 text-trust-blue" />
            정부지원금 진단
          </DialogTitle>
          <DialogDescription>사업장 정보를 입력하면 신청 가능 지원사업을 추천합니다.</DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <CalculatorField label="사업장 규모">
            <Select value={businessSize} onValueChange={(v) => setBusinessSize(v as BusinessSize)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">소규모 (10인 미만)</SelectItem>
                <SelectItem value="medium">중소기업 (10~299인)</SelectItem>
                <SelectItem value="large">중견·대기업 (300인 이상)</SelectItem>
              </SelectContent>
            </Select>
          </CalculatorField>

          <CalculatorField label="직원 수" htmlFor="subsidy-employees">
            <Input
              id="subsidy-employees"
              inputMode="numeric"
              placeholder="예: 25"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(e.target.value.replace(/[^\d]/g, ""))}
            />
          </CalculatorField>

          <CalculatorField label="업종">
            <Select value={industry} onValueChange={(v) => setIndustry(v as IndustryType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manufacturing">제조업</SelectItem>
                <SelectItem value="service">서비스·요식업</SelectItem>
                <SelectItem value="it">IT·정보통신</SelectItem>
                <SelectItem value="construction">건설업</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
          </CalculatorField>

          <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-muted/30 px-4 py-3">
            <Checkbox id="subsidy-youth" checked={youthHiring} onCheckedChange={(v) => setYouthHiring(v === true)} />
            <Label htmlFor="subsidy-youth" className="cursor-pointer text-sm">
              최근 1년 내 청년(15~34세) 채용 또는 채용 예정
            </Label>
          </div>

          {result.valid && hasInput ? (
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">진단 결과</p>
              <CalculatorResultCard
                label="추천 지원사업"
                value={`${result.recommended.length}건`}
                highlight
              />
              {result.recommended.length > 0 && (
                <div className="space-y-2">
                  {result.recommended.map((p) => (
                    <div key={p.id} className="rounded-xl border border-trust-blue/25 bg-trust-blue-light/30 p-4">
                      <p className="text-sm font-bold text-navy">{p.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{p.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {result.programs.length > result.recommended.length && (
                <>
                  <p className="text-xs font-semibold text-muted-foreground">기타 신청 가능 지원금</p>
                  <ul className="space-y-2">
                    {result.programs
                      .filter((p) => !p.recommended)
                      .map((p) => (
                        <li key={p.id} className="rounded-lg border border-border/80 bg-slate-50/80 px-4 py-3 text-sm">
                          <span className="font-semibold text-foreground">{p.name}</span>
                          <p className="mt-1 text-xs text-muted-foreground">{p.description}</p>
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </div>
          ) : (
            hasInput && !result.valid && (
              <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{result.error}</p>
            )
          )}

          <CalculatorDisclaimer />
        </div>
      </DialogContent>
    </Dialog>
  );
}
