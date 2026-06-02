import { Fragment, useEffect, useId, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import banner1 from "@/assets/banner1.jpg";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Settings2,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Users2,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

type ServiceKey =
  | "labor-system"
  | "hr-consulting"
  | "serious-accident"
  | "dispatch-consulting"
  | "esg"
  | "ministry-consulting";

type ServiceContent = {
  title: string;
  short: string;
  intro: string[];
  bullets: string[];
  recommended: string[];
};

type Metric = { label: string; value: string; sub?: string };
type ValueCard = { title: string; desc: string; Icon: React.ComponentType<{ className?: string }> };
type StepCard = { step: string; title: string; desc: string };

const CONTENT: Record<ServiceKey, ServiceContent> = {
  "labor-system": {
    title: "노무체계정비 컨설팅",
    short: "기업의 인사·노무 체계를 법적 기준에 맞게 정비하고 노무 리스크를 예방합니다.",
    intro: [
      "기업의 인사·노무 관리 체계를 근로기준법 및 관련 법령에 맞게 정비합니다.",
      "취업규칙, 근로계약서, 임금체계 등을 체계적으로 구축하여 노무 분쟁을 예방하고 안정적인 조직 운영을 지원합니다.",
      "또한 기업의 조직 구조와 운영 방식에 맞는 인사·노무 관리 기준을 정립하여 인사 운영의 효율성을 높이고, 법적 리스크를 사전에 예방할 수 있도록 지원합니다.",
    ],
    bullets: [
      "취업규칙 작성 및 정비",
      "근로계약서 및 각종 인사 서식 정비",
      "임금체계 및 급여 구조 설계",
      "인사·노무 규정 정비",
      "노무 리스크 진단",
    ],
    recommended: [
      "인사·노무 체계를 처음 구축하는 기업",
      "근로계약서나 취업규칙이 없는 기업",
      "노무 리스크가 우려되는 기업",
    ],
  },
  "hr-consulting": {
    title: "HR 컨설팅",
    short: "조직 운영에 맞는 HR 시스템을 설계하고 성과관리와 보상체계를 구축하여 기업 경쟁력을 강화합니다.",
    intro: [
      "기업의 인사제도는 조직 운영의 핵심 기반입니다.",
      "명확한 인사 기준이 없는 경우 평가의 공정성 문제가 발생하고 노무 분쟁으로 이어질 수 있습니다.",
      "노무법인 가온은 기업의 인사 구조를 분석하고 법적 기준에 맞는 HR 시스템을 설계합니다.",
      "성과평가, 보상체계, 조직문화 개선 등 전반적인 HR 시스템을 구축하여 지속 가능한 조직 운영을 지원합니다.",
    ],
    bullets: [
      "인사제도 설계",
      "성과평가 체계 구축",
      "보상체계 컨설팅",
      "조직문화 개선",
      "HR 제도 컨설팅",
    ],
    recommended: [
      "인사평가 제도가 없는 기업",
      "성과 중심 조직을 만들고 싶은 기업",
      "보상체계를 개선하려는 기업",
      "조직 운영 기준이 필요한 기업",
      "인사관리 체계를 정비하려는 기업",
    ],
  },
  "serious-accident": {
    title: "중대재해처벌법 대응",
    short: "안전보건관리 체계를 구축하고 법적 리스크를 예방합니다.",
    intro: [
      "중대재해처벌법에 대비하여 기업의 안전보건관리 체계를 구축하고 법적 리스크를 예방합니다.",
      "기업의 조직 구조와 사업장 특성을 고려하여 안전보건 관리 기준과 내부 관리 체계를 정비하고, 사고 예방 중심의 관리 시스템을 구축할 수 있도록 지원합니다.",
      "또한 안전보건관리 책임자의 역할 정립, 내부 보고 체계 구축, 위험 요소 점검 등 실질적인 관리 체계를 마련하여 중대재해 발생 가능성을 사전에 줄이고 기업의 법적 책임 리스크를 최소화할 수 있도록 컨설팅을 제공합니다.",
    ],
    bullets: [
      "안전보건관리체계 구축",
      "중대재해 대응 매뉴얼 구축",
      "정기 안전 점검 컨설팅",
      "산업재해 대응 자문",
      "법률 리스크 점검",
    ],
    recommended: ["제조업", "건설업", "산업현장 운영 기업"],
  },
  "dispatch-consulting": {
    title: "도급/파견 컨설팅",
    short: "불법파견 및 노무 리스크를 사전에 점검하고 적법 구조를 설계합니다.",
    intro: [
      "도급 및 파견 운영 과정에서 발생할 수 있는 불법파견 및 노무 리스크를 사전에 점검합니다.",
      "기업의 도급 및 파견 운영 구조를 분석하여 관련 법령에 부합하는 운영 체계를 설계하고, 계약서 및 현장 운영 방식의 적법성을 검토합니다.",
      "또한 불법파견 판단 기준에 따른 리스크 요소를 진단하고 운영 프로세스를 정비하여 기업이 안정적으로 도급·파견 인력을 운영할 수 있도록 전문 컨설팅을 제공합니다.",
    ],
    bullets: [
      "도급 구조 설계",
      "파견 운영 적법성 검토",
      "불법파견 리스크 진단",
      "계약서 및 운영 프로세스 점검",
      "노동청 대응 자문",
    ],
    recommended: ["협력업체 운영 기업", "파견 인력 활용 기업", "도급 구조가 있는 기업"],
  },
  esg: {
    title: "ESG 진단 및 구축",
    short: "ESG 기준에 맞는 근로환경과 지속가능 경영 체계를 구축합니다.",
    intro: [
      "ESG 기준에 맞는 근로환경과 기업의 지속가능 경영 체계를 구축합니다.",
      "기업의 환경, 사회, 지배구조 요소를 종합적으로 진단하고, 조직 운영에 적합한 ESG 관리 기준과 운영 체계를 마련할 수 있도록 지원합니다.",
      "또한 근로환경 개선, 조직 거버넌스 정비, ESG 전략 수립 등을 통해 기업의 지속가능 경영 기반을 강화하고 대외 신뢰도를 높일 수 있도록 컨설팅을 제공합니다.",
    ],
    bullets: ["ESG 진단", "근로환경 개선 컨설팅", "조직 거버넌스 체계 구축", "ESG 보고 대응", "ESG 전략 수립"],
    recommended: ["ESG 경영 도입 기업", "투자 유치 준비 기업", "기업 이미지 개선이 필요한 기업"],
  },
  "ministry-consulting": {
    title: "고용노동부 컨설팅",
    short: "노동청 조사·근로감독 대응을 위한 전문 컨설팅을 제공합니다.",
    intro: [
      "노동청 조사 및 근로감독 대응을 위한 전문 컨설팅을 제공합니다.",
      "근로감독, 노동청 조사, 임금 및 근로시간 관련 이슈 등 다양한 노무 리스크에 대비하여 기업이 적절하게 대응할 수 있도록 지원합니다.",
      "또한 관련 법령 기준에 맞는 인사·노무 관리 체계를 점검하고 필요한 서류 및 운영 절차를 정비하여 행정 처분 및 법적 분쟁 위험을 최소화할 수 있도록 컨설팅을 제공합니다.",
    ],
    bullets: ["노동청 조사 대응", "근로감독 대응", "임금체불 대응", "노동 분쟁 대응", "정부지원사업 연계"],
    recommended: ["노동청 조사 예정 기업", "근로감독 대상 기업", "노무 분쟁 발생 기업"],
  },
};

const DEFAULT_STEPS: StepCard[] = [
  { step: "01", title: "현황 파악", desc: "기업 상황과 이슈를 빠르게 정리합니다." },
  { step: "02", title: "리스크 진단", desc: "법적 쟁점과 위험 요인을 구조화합니다." },
  { step: "03", title: "개선 설계", desc: "기업에 맞는 대응·개선안을 제시합니다." },
  { step: "04", title: "실행 지원", desc: "문서·프로세스·대응을 함께 실행합니다." },
];

const HR_CORE_VALUES: ValueCard[] = [
  {
    title: "노무 리스크 예방",
    desc: "법적 기준에 맞는 인사체계를 구축하여 노무 분쟁 가능성을 최소화합니다.",
    Icon: ShieldCheck,
  },
  {
    title: "조직 운영 효율성",
    desc: "명확한 인사 기준을 통해 조직 운영 효율을 높입니다.",
    Icon: Settings2,
  },
  {
    title: "성과 기반 인사관리",
    desc: "성과 중심의 평가 시스템을 통해 조직 생산성을 높입니다.",
    Icon: Target,
  },
  {
    title: "기업 맞춤 설계",
    desc: "기업 규모와 업종에 맞는 맞춤형 HR 시스템을 설계합니다.",
    Icon: Sparkles,
  },
];

const HR_METRICS: Metric[] = [
  { label: "컨설팅 기업 만족도", value: "95%" },
  { label: "노무 분쟁 감소", value: "70%" },
  { label: "조직 생산성 개선", value: "40%" },
  { label: "인사제도 정비 기업", value: "100+", sub: "누적" },
];

const LABOR_SYSTEM_EFFECT_METRICS: Metric[] = [
  { label: "규정·서류 정비 이행률", value: "90%" },
  { label: "노무 리스크 사전 점검 만족도", value: "88%" },
  { label: "취업규칙 반영 적합도", value: "92%" },
  { label: "노무체계 정비 지원", value: "210+", sub: "누적" },
];

const MINISTRY_CONSULTING_EFFECT_METRICS: Metric[] = [
  { label: "조사·감독 대응 만족도", value: "94%" },
  { label: "행정처분 리스크 완화 체감", value: "76%" },
  { label: "필요 서류 정비 소요 단축", value: "45%" },
  { label: "노동청 대응 자문", value: "155+", sub: "누적" },
];

const ESG_EFFECT_METRICS: Metric[] = [
  { label: "ESG 진단·구축 만족도", value: "93%" },
  { label: "보고·공시 체계 정비율", value: "87%" },
  { label: "근로환경 개선 과제 도출", value: "74%" },
  { label: "ESG 컨설팅 기업", value: "125+", sub: "누적" },
];

const DISPATCH_CONSULTING_EFFECT_METRICS: Metric[] = [
  { label: "불법파견 리스크 진단 커버리지", value: "89%" },
  { label: "도급·파견 계약 점검 만족도", value: "91%" },
  { label: "현장 운영 기준 정비 이행", value: "83%" },
  { label: "도급·파견 자문 건수", value: "135+", sub: "누적" },
];

const SERIOUS_ACCIDENT_EFFECT_METRICS: Metric[] = [
  { label: "안전보건 점검·교육 이행률", value: "88%" },
  { label: "대응 매뉴얼·체계 구축 완료", value: "91%" },
  { label: "현장 안전 리스크 요인 감소", value: "73%" },
  { label: "안전 컨설팅 현장", value: "185+", sub: "누적" },
];

/** 중대재해처벌법 대응 — 주요 서비스 내용(문제 → 연결 → 서비스) 전용 데이터 */
const SERIOUS_ACCIDENT_KEY_ITEMS: {
  problem: string;
  stepLabel: string;
  serviceTitle: string;
  serviceBody: string;
  Icon: LucideIcon;
  /** 교체 예정 placeholder 배경 */
  imageSrc: string;
}[] = [
  {
    problem:
      "안전보건 관리 기준이\n정리되지 않으면\n산업재해 및 법적 리스크가 발생할 수 있습니다.",
    stepLabel: "01",
    serviceTitle: "안전보건관리체계 구축",
    serviceBody: "중대재해처벌법 기준에 맞는\n안전보건 관리 시스템 구축",
    Icon: Shield,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "중대재해 발생 시\n대응 체계가 없으면\n기업의 법적 책임이 확대될 수 있습니다.",
    stepLabel: "02",
    serviceTitle: "중대재해 대응 매뉴얼 구축",
    serviceBody: "사고 대응 절차와\n내부 보고 체계 정비",
    Icon: FileText,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "정기적인 안전 점검이 없으면\n잠재적 위험을\n사전에 발견하기 어렵습니다.",
    stepLabel: "03",
    serviceTitle: "정기 안전 점검 컨설팅",
    serviceBody: "사업장 안전 상태 점검\n위험 요소 사전 개선",
    Icon: CheckCircle,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "산업재해 발생 이후\n잘못된 대응은\n기업 책임을 더 크게 만들 수 있습니다.",
    stepLabel: "04",
    serviceTitle: "산업재해 대응 자문",
    serviceBody: "사고 대응\n노동청 대응\n재발 방지 전략 지원",
    Icon: AlertTriangle,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "안전보건 관리 체계가\n법적 기준에 맞지 않으면\n행정 처분 위험이 있습니다.",
    stepLabel: "05",
    serviceTitle: "법률 리스크 점검",
    serviceBody: "안전보건 관리 체계\n법적 기준 진단",
    Icon: BarChart3,
    imageSrc: "/placeholder.svg",
  },
  {
    problem:
      "현장 근로자와 관리자에게\n안전 교육이 충분히 이루어지지 않으면\n사고 발생 위험이 높아질 수 있습니다.",
    stepLabel: "06",
    serviceTitle: "안전보건 교육 프로그램",
    serviceBody: "관리자 및 근로자 대상\n맞춤형 안전 교육 지원",
    Icon: GraduationCap,
    imageSrc: "/placeholder.svg",
  },
];

/** 노무체계정비 컨설팅 — 주요 서비스 내용(중대재해 섹션과 동일 UI) */
const LABOR_SYSTEM_KEY_ITEMS: {
  problem: string;
  stepLabel: string;
  serviceTitle: string;
  serviceBody: string;
  Icon: LucideIcon;
  imageSrc: string;
}[] = [
  {
    problem: "취업규칙이나 인사 규정이\n법적 기준에 맞지 않으면\n노동 분쟁 발생 위험이 있습니다.",
    stepLabel: "01",
    serviceTitle: "취업규칙 작성 및 정비",
    serviceBody: "근로기준법 기준에 맞는\n취업규칙 및 인사 규정 정비",
    Icon: FileText,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "근로계약서와 인사 서식이\n체계적으로 관리되지 않으면\n법적 분쟁의 원인이 될 수 있습니다.",
    stepLabel: "02",
    serviceTitle: "근로계약서 및 인사 서식 정비",
    serviceBody: "표준 근로계약서 작성\n각종 인사 서식 체계 정비",
    Icon: ClipboardCheck,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "임금 체계와 급여 구조가\n명확하게 설계되지 않으면\n임금 분쟁이 발생할 수 있습니다.",
    stepLabel: "03",
    serviceTitle: "임금체계 및 급여 구조 설계",
    serviceBody: "직무와 조직에 맞는\n합리적인 급여 체계 구축",
    Icon: BarChart3,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "인사·노무 규정이\n기업 운영에 맞게 정리되지 않으면\n조직 관리에 혼선이 생길 수 있습니다.",
    stepLabel: "04",
    serviceTitle: "인사·노무 규정 정비",
    serviceBody: "기업 맞춤형\n인사 관리 규정 체계 구축",
    Icon: Settings2,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "노무 관리 체계가\n법적 기준에 맞지 않으면\n행정 처분 및 과태료 위험이 있습니다.",
    stepLabel: "05",
    serviceTitle: "노무 리스크 진단",
    serviceBody: "기업 인사·노무 관리 체계\n법적 기준 점검 및 개선",
    Icon: ShieldCheck,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "노무 이슈 발생 시\n적절한 대응이 이루어지지 않으면\n기업 리스크가 확대될 수 있습니다.",
    stepLabel: "06",
    serviceTitle: "노무 분쟁 대응 자문",
    serviceBody: "노동청 대응 지원\n노무 분쟁 예방 및 대응 자문",
    Icon: AlertTriangle,
    imageSrc: "/placeholder.svg",
  },
];

/** 노무체계정비 — 주요 서비스 하단 아치 RECOMMENDED 안내 문단 */
const LABOR_SYSTEM_ARCH_RECOMMENDED_INTRO =
  "인사·노무 체계를 정비하려는 기업, 노무 리스크 예방이 필요한 기업에 적합한 서비스입니다.";

/** 고용노동부 컨설팅 — 주요 서비스 내용(중대재해·노무체계정비와 동일 UI) */
const MINISTRY_CONSULTING_KEY_ITEMS: {
  problem: string;
  stepLabel: string;
  serviceTitle: string;
  serviceBody: string;
  Icon: LucideIcon;
  imageSrc: string;
}[] = [
  {
    problem: "고용노동부 조사나\n노동청 신고가 접수되면\n기업 대응이 어려울 수 있습니다.",
    stepLabel: "01",
    serviceTitle: "노동청 조사 대응",
    serviceBody: "노동청 조사 대응 지원\n기업 상황에 맞는 대응 전략 자문",
    Icon: Shield,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "근로감독이 진행될 경우\n관련 법규와 서류 준비가 미흡하면\n행정 처분 위험이 있습니다.",
    stepLabel: "02",
    serviceTitle: "근로감독 대응",
    serviceBody: "근로감독 대응 준비\n필요 서류 정비 및 대응 전략 지원",
    Icon: ClipboardCheck,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "임금 체불 문제가 발생하면\n기업 신뢰도 하락과 함께\n법적 분쟁으로 이어질 수 있습니다.",
    stepLabel: "03",
    serviceTitle: "임금체불 대응",
    serviceBody: "임금체불 문제 해결 지원\n분쟁 예방 및 대응 자문",
    Icon: AlertTriangle,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "노동 분쟁이 발생했을 때\n적절한 대응이 이루어지지 않으면\n기업 리스크가 확대될 수 있습니다.",
    stepLabel: "04",
    serviceTitle: "노동 분쟁 대응",
    serviceBody: "노동 분쟁 대응 전략 수립\n노동청 및 관련 기관 대응 지원",
    Icon: Users2,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "정부 지원 제도를\n제대로 활용하지 못하면\n기업 성장 기회를 놓칠 수 있습니다.",
    stepLabel: "05",
    serviceTitle: "정부지원사업 연계",
    serviceBody: "고용노동부 지원사업 안내\n기업 맞춤형 지원사업 연계",
    Icon: Sparkles,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "노동 관련 법규를\n지속적으로 관리하지 않으면\n예기치 않은 법적 문제가 발생할 수 있습니다.",
    stepLabel: "06",
    serviceTitle: "노동법 준수 점검",
    serviceBody: "기업 노무 관리 체계 점검\n노동법 준수 여부 진단 및 개선",
    Icon: CheckCircle,
    imageSrc: "/placeholder.svg",
  },
];

/** 고용노동부 컨설팅 — 주요 서비스 하단 아치 RECOMMENDED 안내 문단 */
const MINISTRY_CONSULTING_ARCH_RECOMMENDED_INTRO =
  "노동청 조사·근로감독 대응이 필요한 기업, 노동 관련 분쟁·이슈가 있는 기업에 적합한 서비스입니다.";

/** ESG 진단 및 구축 — 주요 서비스 내용(중대재해·노무체계정비와 동일 UI) */
const ESG_KEY_ITEMS: {
  problem: string;
  stepLabel: string;
  serviceTitle: string;
  serviceBody: string;
  Icon: LucideIcon;
  imageSrc: string;
}[] = [
  {
    problem: "기업의 ESG 현황을\n체계적으로 진단하지 않으면\n경영 리스크를 파악하기 어렵습니다.",
    stepLabel: "01",
    serviceTitle: "ESG 진단",
    serviceBody: "기업의 ESG 운영 현황 분석\n환경·사회·지배구조 수준 진단",
    Icon: BarChart3,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "근로환경이 체계적으로\n관리되지 않으면\n조직 생산성과 기업 이미지에 영향을 줄 수 있습니다.",
    stepLabel: "02",
    serviceTitle: "근로환경 개선 컨설팅",
    serviceBody: "근로환경 및 조직 문화 진단\n지속 가능한 근로환경 개선 지원",
    Icon: Users2,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "조직의 의사결정 구조가\n명확하게 정립되지 않으면\n지배구조 리스크가 발생할 수 있습니다.",
    stepLabel: "03",
    serviceTitle: "조직 거버넌스 체계 구축",
    serviceBody: "투명한 의사결정 구조 설계\n조직 거버넌스 체계 정비",
    Icon: Settings2,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "ESG 보고 요구가 증가하면서\n체계적인 대응이 없으면\n기업 신뢰도에 영향을 줄 수 있습니다.",
    stepLabel: "04",
    serviceTitle: "ESG 보고 대응",
    serviceBody: "ESG 관련 보고 대응 지원\n지속가능경영 보고 체계 정비",
    Icon: FileText,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "ESG 경영 전략이\n명확하게 수립되지 않으면\n지속가능한 성장 전략을 마련하기 어렵습니다.",
    stepLabel: "05",
    serviceTitle: "ESG 전략 수립",
    serviceBody: "기업 맞춤형 ESG 전략 설계\n지속가능 경영 방향 수립",
    Icon: Target,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "ESG 활동이\n체계적으로 관리되지 않으면\n기업 평판 리스크가 발생할 수 있습니다.",
    stepLabel: "06",
    serviceTitle: "ESG 실행 로드맵 구축",
    serviceBody: "ESG 실행 계획 수립\n단계별 실행 로드맵 설계",
    Icon: CheckCircle,
    imageSrc: "/placeholder.svg",
  },
];

/** ESG 진단 및 구축 — 주요 서비스 하단 아치 RECOMMENDED 안내 문단 */
const ESG_ARCH_RECOMMENDED_INTRO =
  "ESG 현황 진단·근로환경 개선이 필요한 기업, 지속가능경영 보고·전략 수립을 준비하는 기업에 적합한 서비스입니다.";

/** 도급/파견 컨설팅 — 주요 서비스 내용(중대재해·노무체계정비와 동일 UI) */
const DISPATCH_CONSULTING_KEY_ITEMS: {
  problem: string;
  stepLabel: string;
  serviceTitle: string;
  serviceBody: string;
  Icon: LucideIcon;
  imageSrc: string;
}[] = [
  {
    problem: "도급 구조가 명확하지 않으면\n불법파견으로 판단될 위험이\n발생할 수 있습니다.",
    stepLabel: "01",
    serviceTitle: "도급 구조 설계",
    serviceBody: "적법한 도급 운영 구조 설계\n기업 운영에 맞는 도급 체계 구축",
    Icon: Settings2,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "파견 인력 운영이\n법적 기준에 맞지 않으면\n행정 처분 위험이 있습니다.",
    stepLabel: "02",
    serviceTitle: "파견 운영 적법성 검토",
    serviceBody: "파견 인력 운영 방식 점검\n관련 법규 준수 여부 검토",
    Icon: ClipboardCheck,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "불법파견 여부를\n사전에 점검하지 않으면\n기업 법적 리스크가 확대될 수 있습니다.",
    stepLabel: "03",
    serviceTitle: "불법파견 리스크 진단",
    serviceBody: "현장 운영 방식 진단\n불법파견 위험 요소 분석",
    Icon: AlertTriangle,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "도급 및 파견 계약서가\n체계적으로 작성되지 않으면\n분쟁 발생 가능성이 높아집니다.",
    stepLabel: "04",
    serviceTitle: "계약서 및 운영 프로세스 점검",
    serviceBody: "도급·파견 계약서 검토\n운영 프로세스 체계 정비",
    Icon: FileText,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "노동청 조사나 감독이 진행될 경우\n적절한 대응 체계가 없으면\n기업 리스크가 커질 수 있습니다.",
    stepLabel: "05",
    serviceTitle: "노동청 대응 자문",
    serviceBody: "노동청 조사 대응 지원\n도급·파견 관련 대응 전략 자문",
    Icon: Shield,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "도급·파견 운영 기준이\n현장에서 명확히 관리되지 않으면\n지속적인 법적 문제가 발생할 수 있습니다.",
    stepLabel: "06",
    serviceTitle: "도급·파견 운영 체계 구축",
    serviceBody: "현장 운영 기준 정비\n지속적인 운영 관리 체계 구축",
    Icon: BarChart3,
    imageSrc: "/placeholder.svg",
  },
];

/** 도급/파견 컨설팅 — 주요 서비스 하단 아치 RECOMMENDED 안내 문단 */
const DISPATCH_CONSULTING_ARCH_RECOMMENDED_INTRO =
  "협력업체·파견 인력을 운영하는 기업, 불법파견·도급 구조 점검이 필요한 기업에 적합한 서비스입니다.";

/** HR 컨설팅 — 주요 서비스 내용(중대재해·노무체계정비와 동일 UI) */
const HR_CONSULTING_KEY_ITEMS: {
  problem: string;
  stepLabel: string;
  serviceTitle: string;
  serviceBody: string;
  Icon: LucideIcon;
  imageSrc: string;
}[] = [
  {
    problem: "인사평가 기준이\n명확하게 정립되지 않으면\n조직 내 공정성 문제가 발생할 수 있습니다.",
    stepLabel: "01",
    serviceTitle: "인사평가 제도 설계",
    serviceBody: "기업 특성에 맞는\n성과 평가 기준 설계",
    Icon: Target,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "성과 관리 체계가\n체계적으로 운영되지 않으면\n조직 성과 관리가 어려워질 수 있습니다.",
    stepLabel: "02",
    serviceTitle: "성과관리 시스템 구축",
    serviceBody: "성과 목표 설정 및\n체계적인 성과 관리 시스템 구축",
    Icon: BarChart3,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "보상 체계가\n성과와 연계되지 않으면\n구성원 동기 부여가 낮아질 수 있습니다.",
    stepLabel: "03",
    serviceTitle: "보상체계 설계",
    serviceBody: "성과 기반 보상 시스템\n합리적인 보상 구조 설계",
    Icon: Sparkles,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "조직문화와 업무 환경이\n체계적으로 관리되지 않으면\n조직 운영 효율이 떨어질 수 있습니다.",
    stepLabel: "04",
    serviceTitle: "조직문화 진단",
    serviceBody: "조직 구조 및 업무 환경 분석\n조직문화 개선 방향 제시",
    Icon: Users2,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "기업에 맞는 인사 제도가\n체계적으로 구축되지 않으면\n인사 운영에 혼선이 생길 수 있습니다.",
    stepLabel: "05",
    serviceTitle: "HR 제도 컨설팅",
    serviceBody: "기업 맞춤 인사 제도 설계\n인사 운영 체계 구축",
    Icon: Settings2,
    imageSrc: "/placeholder.svg",
  },
  {
    problem: "인재 관리 체계가\n명확하게 구축되지 않으면\n조직 경쟁력이 약화될 수 있습니다.",
    stepLabel: "06",
    serviceTitle: "인재관리 체계 구축",
    serviceBody: "핵심 인재 관리 전략 수립\n조직 성장 기반 인사 체계 설계",
    Icon: CheckCircle,
    imageSrc: "/placeholder.svg",
  },
];

/** HR 컨설팅 — 주요 서비스 하단 아치 RECOMMENDED 안내 문단 */
const HR_CONSULTING_ARCH_RECOMMENDED_INTRO =
  "인사평가·보상·조직문화 제도를 정비하려는 기업, 성과 기반 HR 체계가 필요한 기업에 적합한 서비스입니다.";

/** 중대재해처벌법 대응 — 주요 서비스 섹션 하단 추천 영역(아치 안 콘텐츠) */
const SERIOUS_ACCIDENT_RECOMMENDED_INTRO =
  "안전보건 관리 체계가 필요한 기업, 현장 운영 리스크가 있는 기업, 중대재해처벌법 대응이 필요한 기업에 적합한 서비스입니다.";

const SERIOUS_ACCIDENT_RECOMMENDED_LIST = [
  "제조업",
  "건설업",
  "산업현장 운영 기업",
  "협력업체 관리 기업",
  "안전관리 체계 점검이 필요한 기업",
] as const;

const HR_STEPS: StepCard[] = [
  { step: "01", title: "기업 현황 분석", desc: "현재 인사제도와 조직 구조를 분석합니다." },
  { step: "02", title: "리스크 진단", desc: "법적 리스크와 인사관리 문제를 진단합니다." },
  { step: "03", title: "개선 전략 설계", desc: "기업 맞춤 HR 전략을 설계합니다." },
  { step: "04", title: "제도 구축", desc: "인사평가, 보상체계 등을 구축합니다." },
  { step: "05", title: "실행 및 관리", desc: "실제 운영에 적용하고 지속 관리합니다." },
];

const TRUST_POINTS = [
  "공인노무사 직접 컨설팅",
  "기업 맞춤 노무 솔루션 제공",
  "다양한 기업 컨설팅 경험",
  "노동청 대응 및 노무 분쟁 경험",
] as const;

/** 모바일(< md): 2장 / md 이상: 3장 (트레일 복제 길이·슬라이드 계산에 사용) */
const INTRO_HIGHLIGHT_MQ = "(max-width: 767px)";

/** 서비스 소개 — 한눈에 보는 포인트(우측 카드, 뷰포트당 N장 노출·한 장씩 세로 슬라이드) */
const INTRO_HIGHLIGHT_POINTS = [
  { title: "리스크 예방", body: "기업 안전 리스크 사전 차단" },
  { title: "현장 실행", body: "현장 중심 안전관리 실행" },
  { title: "지속 관리", body: "지속적인 안전관리 체계 운영" },
  { title: "체계 구축", body: "중대재해 대응 체계 구축" },
  { title: "교육 지원", body: "현장 안전 교육 체계 지원" },
  { title: "리스크 진단", body: "안전 관리 위험 요소 사전 점검" },
] as const;

function getIntroPointsPerView(): 2 | 3 {
  if (typeof window === "undefined") return 3;
  return window.matchMedia(INTRO_HIGHLIGHT_MQ).matches ? 2 : 3;
}

/** DATA 도넛: "95%" → 95%만큼 링 채움, "100+" 등은 링 전체(100%) 강조 */
function parseMetricRingPercent(value: string): number {
  const t = value.trim();
  const pct = t.match(/^(\d+(?:\.\d+)?)%$/);
  if (pct) return Math.min(100, Math.max(0, parseFloat(pct[1])));
  if (/^\d+\+$/.test(t)) return 100;
  return 72;
}

function DataEffectMetricDonut({ metric, delayMs = 0 }: { metric: Metric; delayMs?: number }) {
  const reactId = useId();
  const gradId = useMemo(() => `data-ring-grad-${reactId.replace(/:/g, "")}`, [reactId]);
  const size = 172;
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = parseMetricRingPercent(metric.value);
  const targetOffset = c * (1 - pct / 100);
  const [dashOffset, setDashOffset] = useState(c);
  const caption = metric.sub
    ? metric.sub === "누적"
      ? "누적 지원 실적"
      : `${metric.sub} 기준`
    : "성과·만족도 지표";

  useEffect(() => {
    setDashOffset(c);
    const start = window.setTimeout(() => {
      setDashOffset(targetOffset);
    }, delayMs + 80);
    return () => window.clearTimeout(start);
  }, [metric.label, metric.value, c, targetOffset, delayMs]);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative mx-auto aspect-square w-full max-w-[180px] shrink-0">
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90" aria-hidden>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d83f5" />
              <stop offset="55%" stopColor="#5cadff" />
              <stop offset="100%" stopColor="#7ec8fa" />
            </linearGradient>
          </defs>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            className="stroke-neutral-900/12"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={dashOffset}
            style={{
              transition: "stroke-dashoffset 1.45s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 pb-3 pt-2 text-center">
          <p className="line-clamp-2 text-[10px] font-bold leading-snug text-foreground md:text-[11px]">{metric.label}</p>
          <p className="mt-2 text-[1.65rem] font-black leading-none tabular-nums text-foreground md:text-[1.85rem]">
            {metric.value}
          </p>
          <p
            className="mt-2 line-clamp-2 text-[10px] font-semibold leading-tight md:text-[11px]"
            style={{ color: "#3d83f5" }}
          >
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const key = slug as ServiceKey;
  const data = CONTENT[key];
  const isHr = key === "hr-consulting";
  const steps = isHr ? HR_STEPS : DEFAULT_STEPS;

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % steps.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [steps.length]);

  const [introPointsPerView, setIntroPointsPerView] = useState<2 | 3>(getIntroPointsPerView);
  const introHighlightCount = INTRO_HIGHLIGHT_POINTS.length;
  /** 카드 한 칸씩 이동: 카드 높이 + gap-2(0.5rem) */
  const introCardStepExpr =
    introPointsPerView === 2
      ? "((22rem - 1.5rem - 0.5rem) / 2 + 0.5rem)"
      : "((22rem - 1.5rem - 1rem) / 3 + 0.5rem)";
  const [introSlidePos, setIntroSlidePos] = useState(0);
  const [introSlideNoTrans, setIntroSlideNoTrans] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(INTRO_HIGHLIGHT_MQ);
    const sync = () => {
      const next = mq.matches ? 2 : 3;
      setIntroPointsPerView(next);
      setIntroSlidePos(0);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIntroSlidePos((p) => {
        if (p >= introHighlightCount) return p;
        return p + 1;
      });
    }, 4000);
    return () => window.clearInterval(id);
  }, [introHighlightCount]);

  const onIntroPointsTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== "transform") return;
    if (introSlidePos !== introHighlightCount) return;
    setIntroSlideNoTrans(true);
    setIntroSlidePos(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIntroSlideNoTrans(false));
    });
  };

  const introLoopPoints = useMemo(() => [...INTRO_HIGHLIGHT_POINTS, ...INTRO_HIGHLIGHT_POINTS], []);

  if (!data) return <Navigate to="/not-found" replace />;

  const heroChecks = isHr ? data.bullets : data.bullets.slice(0, 4);

  const darkKeyItems =
    key === "serious-accident"
      ? SERIOUS_ACCIDENT_KEY_ITEMS
      : key === "labor-system"
        ? LABOR_SYSTEM_KEY_ITEMS
        : key === "ministry-consulting"
          ? MINISTRY_CONSULTING_KEY_ITEMS
          : key === "esg"
            ? ESG_KEY_ITEMS
            : key === "dispatch-consulting"
              ? DISPATCH_CONSULTING_KEY_ITEMS
              : key === "hr-consulting"
                ? HR_CONSULTING_KEY_ITEMS
                : null;
  const useDarkKeyServiceLayout = darkKeyItems !== null;
  const archRecommendIntro =
    key === "serious-accident"
      ? SERIOUS_ACCIDENT_RECOMMENDED_INTRO
      : key === "labor-system"
        ? LABOR_SYSTEM_ARCH_RECOMMENDED_INTRO
        : key === "ministry-consulting"
          ? MINISTRY_CONSULTING_ARCH_RECOMMENDED_INTRO
          : key === "esg"
            ? ESG_ARCH_RECOMMENDED_INTRO
            : key === "dispatch-consulting"
              ? DISPATCH_CONSULTING_ARCH_RECOMMENDED_INTRO
              : key === "hr-consulting"
                ? HR_CONSULTING_ARCH_RECOMMENDED_INTRO
                : "";
  const archRecommendLines: readonly string[] | string[] =
    key === "serious-accident" ? SERIOUS_ACCIDENT_RECOMMENDED_LIST : data.recommended;

  const dataEffectSection: { title: string; metrics: Metric[] } | null =
    key === "hr-consulting"
      ? { title: "HR 컨설팅 효과", metrics: HR_METRICS }
      : key === "labor-system"
        ? { title: "노무체계정비 컨설팅 효과", metrics: LABOR_SYSTEM_EFFECT_METRICS }
        : key === "ministry-consulting"
          ? { title: "고용노동부 컨설팅 효과", metrics: MINISTRY_CONSULTING_EFFECT_METRICS }
          : key === "esg"
            ? { title: "ESG 진단 및 구축 효과", metrics: ESG_EFFECT_METRICS }
            : key === "dispatch-consulting"
              ? { title: "도급/파견 컨설팅 효과", metrics: DISPATCH_CONSULTING_EFFECT_METRICS }
              : key === "serious-accident"
                ? { title: "중대재해처벌법 대응 효과", metrics: SERIOUS_ACCIDENT_EFFECT_METRICS }
                : null;

  return (
    <main>
      {/* Hero */}
      <section className="section-white py-20 md:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <span className="badge-blue">● SERVICE</span>
              <h1 className="text-3xl md:text-5xl font-black text-foreground mt-5 leading-tight">{data.title}</h1>
              <p className="text-muted-foreground mt-5 leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
                {isHr
                  ? "조직 운영에 맞는 HR 시스템을 설계하고\n성과관리와 보상체계를 구축하여\n기업 경쟁력을 강화합니다."
                  : data.short}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 max-w-2xl mx-auto text-left">
                {heroChecks.map((t) => (
                  <div key={t} className="flex items-start gap-3 rounded-xl border border-border bg-surface/70 px-4 py-3">
                    <CheckCircle className="w-5 h-5 text-trust-blue mt-0.5 shrink-0" aria-hidden />
                    <p className="text-sm text-foreground leading-relaxed font-medium">{t}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/consulting" className="btn-primary text-base px-10 py-4">
                  무료 상담 신청
                  <ArrowRight className="w-5 h-5" aria-hidden />
                </Link>
                <Link to="/#services" className="btn-outline text-base px-10 py-4">
                  다른 서비스 보기
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 소개 */}
      <section className="section-light py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2 md:gap-12 items-start">
            <ScrollReveal>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">서비스 소개</h2>
                <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
                  {data.intro.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <div>
                <h3 className="text-lg font-bold text-foreground">한눈에 보는 포인트</h3>
                <div className="relative mt-4 h-[22rem] overflow-hidden rounded-2xl border border-border bg-surface p-3">
                  <div
                    className={`flex flex-col gap-2 ${introSlideNoTrans ? "" : "transition-transform duration-1000 ease-in-out motion-reduce:transition-none"}`}
                    style={{
                      /* 한 번에 카드 1장분만 위로 이동 (무한: INTRO_HIGHLIGHT_POINTS 길이만큼 이동 후 처음으로 스냅) */
                      transform: `translateY(calc(-1 * ${introSlidePos} * ${introCardStepExpr}))`,
                    }}
                    onTransitionEnd={onIntroPointsTransitionEnd}
                  >
                    {introLoopPoints.map((point, i) => (
                      <div
                        key={`${point.title}-${i}`}
                        className={`flex h-[calc((22rem-1.5rem-0.5rem)/2)] w-full shrink-0 items-center gap-3 rounded-xl px-4 py-3 shadow-sm md:h-[calc((22rem-1.5rem-1rem)/3)] md:gap-3 md:px-5 md:py-3.5 ${
                          i % 2 === 0 ? "bg-navy text-primary-foreground" : "bg-trust-blue text-primary-foreground"
                        }`}
                      >
                        <CheckCircle className="h-6 w-6 shrink-0 text-primary-foreground opacity-90 md:h-7 md:w-7" aria-hidden />
                        <div className="min-w-0 flex-1 space-y-1 text-left">
                          <p className="text-sm font-bold leading-tight md:text-base">[{point.title}]</p>
                          <p className="text-xs leading-snug text-primary-foreground/90 md:text-sm">{point.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 핵심 가치 (HR 컨설팅) */}
      {isHr ? (
        <section className="section-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-10">
                  <span className="badge-blue">● VALUE</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-4">핵심 가치</h2>
                </div>
              </ScrollReveal>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {HR_CORE_VALUES.map((v, i) => (
                  <ScrollReveal key={v.title} delay={i * 80}>
                    <div className="card-lift h-full rounded-2xl border border-border bg-surface p-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-trust-blue-light flex items-center justify-center">
                          <v.Icon className="h-5 w-5 text-trust-blue" aria-hidden />
                        </div>
                        <p className="text-sm font-bold text-foreground">{v.title}</p>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 주요 서비스 */}
      <section
        className={
          useDarkKeyServiceLayout
            ? /* 하단 추천 아치(to-[#050810]) 아래에 py로 #111827 띠가 보이지 않도록 pb 제거 */
              "relative overflow-hidden pt-16 pb-0 text-slate-100 md:pt-20"
            : "section-white py-16 md:py-20"
        }
        style={
          useDarkKeyServiceLayout
            ? { background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)" }
            : undefined
        }
      >
        {useDarkKeyServiceLayout ? (
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute -top-40 left-[10%] h-[min(28rem,90vw)] w-[min(28rem,90vw)] rounded-full bg-sky-500/[0.14] blur-[120px]" />
            <div className="absolute top-1/2 right-[-8%] h-[min(22rem,70vw)] w-[min(22rem,70vw)] -translate-y-1/2 rounded-full bg-blue-600/[0.11] blur-[100px]" />
            <div className="absolute bottom-[-25%] left-[28%] h-[18rem] w-[18rem] rounded-full bg-cyan-400/[0.07] blur-[88px]" />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
                backgroundSize: "52px 52px",
              }}
            />
          </div>
        ) : null}
        <div className={`container mx-auto px-4 ${useDarkKeyServiceLayout ? "relative z-10" : ""}`}>
          <div className={useDarkKeyServiceLayout ? "max-w-7xl mx-auto" : "max-w-5xl mx-auto"}>
            <ScrollReveal>
              <div className="text-center mb-10">
                <span
                  className={
                    useDarkKeyServiceLayout
                      ? "inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold tracking-wide text-sky-300"
                      : "badge-blue"
                  }
                >
                  ● KEY ITEMS
                </span>
                <h2
                  className={`text-2xl md:text-3xl font-bold mt-4 ${
                    useDarkKeyServiceLayout ? "text-white" : "text-foreground"
                  }`}
                >
                  주요 서비스 내용
                </h2>
              </div>
            </ScrollReveal>
            {darkKeyItems ? (
              <div className="grid grid-cols-1 gap-y-24 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20">
                {darkKeyItems.map((item, i) => {
                  const Icon = item.Icon;
                  return (
                    <ScrollReveal key={item.serviceTitle} delay={i * 90} className="h-full">
                      {/*
                        한 열 = 문제(작은 글라스) → 세로 연결선·글로우 아이콘 → 서비스(강조 카드)
                        ScrollReveal의 .reveal는 이미 fade + slide-up 적용
                      */}
                      <div className="flex h-full min-h-0 flex-col">
                        <div className="rounded-2xl border border-white/[0.12] bg-white/[0.08] px-5 py-4 shadow-[0_6px_28px_rgba(0,0,0,0.28)] backdrop-blur-[10px] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_36px_rgba(0,0,0,0.38)]">
                          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-sky-300/85">
                            <span className="text-slate-400/90">Problem</span>
                            <span className="text-white/25">/</span>
                            <span>문제 상황</span>
                          </div>
                          <p className="mt-2.5 text-[13px] leading-snug text-slate-200/95 whitespace-pre-line">
                            {item.problem}
                          </p>
                        </div>

                        <div className="flex shrink-0 flex-col items-center py-3" aria-hidden>
                          <div className="h-7 w-px bg-gradient-to-b from-white/30 via-sky-400/55 to-sky-400/35" />
                          <div className="relative my-2">
                            <div className="absolute inset-0 rounded-full bg-sky-400/35 blur-xl" />
                            <div className="relative flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full border border-sky-400/45 bg-gradient-to-br from-sky-400/30 via-sky-500/15 to-slate-900/90 text-sky-200 shadow-[0_0_32px_rgba(56,189,248,0.45),0_12px_28px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                              <Icon className="h-7 w-7" strokeWidth={2} />
                            </div>
                          </div>
                          <div className="h-7 w-px bg-gradient-to-b from-sky-400/35 via-sky-400/45 to-white/25" />
                        </div>

                        <div className="relative mt-auto flex min-h-[220px] flex-1 flex-col overflow-hidden rounded-[20px] border border-sky-400/22 bg-gradient-to-br from-sky-500/[0.18] via-white/[0.09] to-slate-950/95 shadow-[0_14px_48px_rgba(0,0,0,0.45)] backdrop-blur-[14px] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-sky-400/35 hover:shadow-[0_20px_56px_rgba(0,0,0,0.52)]">
                          <img
                            src={item.imageSrc}
                            alt=""
                            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.08]"
                            loading="lazy"
                          />
                          <div
                            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/55 to-slate-900/25"
                            aria-hidden
                          />
                          <Icon
                            className="pointer-events-none absolute -bottom-8 -right-6 h-[11rem] w-[11rem] text-white/[0.06]"
                            strokeWidth={1}
                            aria-hidden
                          />
                          <div className="relative z-[1] flex flex-1 flex-col p-6 md:p-7">
                            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-sky-300">
                              서비스
                            </p>
                            <p className="mt-3 text-[2.75rem] font-black leading-none tabular-nums tracking-tight text-sky-300 drop-shadow-[0_0_24px_rgba(56,189,248,0.4)] md:text-[3rem]">
                              {item.stepLabel}
                            </p>
                            <h3 className="mt-3 text-lg font-bold leading-snug text-white md:text-xl">
                              {item.serviceTitle}
                            </h3>
                            <p className="mt-3 max-w-none text-sm leading-relaxed text-slate-200/92 whitespace-pre-line">
                              {item.serviceBody}
                            </p>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {data.bullets.map((b, i) => (
                  <ScrollReveal key={b} delay={i * 80}>
                    <div className="card-lift group rounded-2xl p-6 bg-surface border border-border relative overflow-hidden hover:-translate-y-[3px] transition-transform duration-300">
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-trust-blue-light/70 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90"
                        aria-hidden
                      />
                      <p className="relative text-sm font-semibold text-foreground">{b}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </div>

        {useDarkKeyServiceLayout ? (
          <div className="relative z-10 mt-14 w-full min-w-0 md:mt-20">
            <div
              className="relative w-full min-w-0 overflow-hidden border-t border-sky-400/25 bg-gradient-to-b from-[#0b1222] via-[#080d18] to-[#050810] py-12 shadow-[0_-8px_48px_rgba(56,189,248,0.12),inset_0_1px_0_rgba(255,255,255,0.06)] sm:py-14 md:py-16"
              style={{
                /* 가로 50% + 세로 반경을 크게: 중앙은 올라가고 양쪽 끝은 내려가 더 깊은 돔(참고 이미지) 형태 */
                borderTopLeftRadius: "50% clamp(5.5rem, 22vw, 14rem)",
                borderTopRightRadius: "50% clamp(5.5rem, 22vw, 14rem)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sky-500/[0.14] via-transparent to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/45 to-transparent shadow-[0_0_24px_rgba(56,189,248,0.35)]"
                aria-hidden
              />
              <ScrollReveal>
                <div className="relative mx-auto max-w-2xl px-5 text-center sm:px-8 md:px-10">
                  <p className="text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-sky-300/90">
                    RECOMMENDED
                  </p>
                  <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
                    이런 기업에 추천합니다
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300/95 md:text-[0.9375rem]">
                    {archRecommendIntro}
                  </p>
                  <ul className="mx-auto mt-8 max-w-md space-y-3 text-left sm:mx-auto sm:max-w-lg">
                    {archRecommendLines.map((line) => (
                      <li
                        key={line}
                        className="flex items-start gap-3 text-sm text-slate-200/95 md:text-[0.9375rem]"
                      >
                        <span
                          className="mt-2 shrink-0 rounded-full bg-sky-400 h-1.5 w-1.5 shadow-[0_0_10px_rgba(56,189,248,0.65)]"
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        ) : null}
      </section>

      {/* 추천 — 중대재해·노무체계정비·고용노동부 컨설팅·도급/파견 컨설팅·HR 컨설팅·ESG 진단 및 구축은 주요 서비스 섹션 하단 아치에 통합됨 */}
      {!useDarkKeyServiceLayout ? (
        <section className="section-light py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-2 md:gap-12 items-start">
              <ScrollReveal>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">이런 기업에 추천합니다</h2>
                  <ul className="mt-6 space-y-3">
                    {data.recommended.map((r) => (
                      <li key={r} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-trust-blue/70" aria-hidden />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={140}>
                <div className="rounded-2xl p-7 border border-trust-blue/20 bg-trust-blue-light">
                  <h3 className="text-lg font-bold text-navy">빠른 상담이 필요한 상황</h3>
                  <p className="mt-3 text-sm text-navy/70 leading-relaxed">
                    조사 통보, 민원, 분쟁 조짐이 있다면 초기 대응이 핵심입니다. 지금 상황을 알려주시면 우선순위부터
                    정리해드립니다.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      ) : null}

      {/* 데이터 기반 효과 — RECOMMENDED(아치·추천 블록) 아래, PROCESS 위 */}
      {dataEffectSection ? (
        <section className="section-light py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <div className="text-center mb-10">
                  <span className="badge-blue">● DATA</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-4">{dataEffectSection.title}</h2>
                </div>
              </ScrollReveal>
              <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
                {dataEffectSection.metrics.map((m, i) => (
                  <ScrollReveal key={m.label} delay={i * 80}>
                    <div className="flex flex-col items-center justify-center py-2">
                      <DataEffectMetricDonut metric={m} delayMs={i * 80} />
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* 절차 */}
      <section className="section-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="badge-blue">● PROCESS</span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-4">서비스 진행 절차</h2>
              </div>
            </ScrollReveal>
            <div className="flex flex-col items-stretch md:flex-row md:items-stretch md:justify-center">
              {steps.map((s, i) => (
                <Fragment key={s.step}>
                  {i > 0 ? (
                    <div
                      className="flex shrink-0 items-center justify-center py-2 md:px-0.5 md:py-0 lg:px-1.5"
                      aria-hidden
                    >
                      <ChevronDown className="h-5 w-5 text-slate-300 md:hidden" strokeWidth={2.25} />
                      <ChevronRight className="hidden h-5 w-5 text-slate-300 md:block" strokeWidth={2.25} />
                    </div>
                  ) : null}
                  <ScrollReveal delay={i * 90} className="w-full min-w-0 flex-1 md:flex-[1_1_0%]">
                    <div
                      className={`flex h-full min-h-[11rem] flex-col rounded-lg border border-slate-100/90 border-t-4 bg-white px-3 pb-5 pt-4 text-center shadow-[0_4px_18px_rgba(15,23,42,0.08)] transition-[border-color] duration-500 ease-out motion-reduce:transition-none sm:min-h-0 sm:px-4 sm:pb-6 sm:pt-5 ${
                        i === activeStepIndex ? "border-t-trust-blue" : "border-t-slate-200"
                      }`}
                      aria-current={i === activeStepIndex ? "step" : undefined}
                    >
                      <p
                        className={`text-4xl font-black tabular-nums leading-none transition-colors duration-500 ease-out motion-reduce:transition-none sm:text-5xl ${
                          i === activeStepIndex ? "text-trust-blue" : "text-slate-300"
                        }`}
                      >
                        {Number.parseInt(s.step, 10)}
                      </p>
                      <p className="mt-2.5 text-xs font-semibold text-muted-foreground sm:mt-3 sm:text-sm">
                        {s.title}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/90 sm:mt-4">{s.desc}</p>
                    </div>
                  </ScrollReveal>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 신뢰도 섹션 */}
      <section className="section-light py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="badge-blue">● TRUST</span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-4">왜 노무법인 가온인가</h2>
              </div>
            </ScrollReveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {TRUST_POINTS.map((t, i) => (
                <ScrollReveal key={t} delay={i * 80}>
                  <div className="card-lift rounded-2xl border border-border bg-surface p-6 relative flex items-start gap-3 overflow-hidden">
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-trust-blue-light/60 via-transparent to-transparent"
                      aria-hidden
                    />
                    <Users2 className="relative h-5 w-5 shrink-0 text-trust-blue mt-0.5" aria-hidden />
                    <div className="relative min-w-0">
                      <p className="text-sm font-bold text-foreground">{t}</p>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {t === "공인노무사 직접 컨설팅"
                          ? "상황 파악부터 실행까지 직접 책임지고 진행합니다."
                          : t === "기업 맞춤 노무 솔루션 제공"
                            ? "업종·규모·운영 방식에 맞춘 최적안을 설계합니다."
                            : t === "다양한 기업 컨설팅 경험"
                              ? "현장에 맞는 실무형 기준과 문서 품질을 제공합니다."
                              : "조사·분쟁 단계에서도 일관된 대응 전략으로 지원합니다."}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 하단 CTA — 배너1을 은은한 배경으로만 사용 (섹션 높이·패딩 동일) */}
      <section className="section-dark relative overflow-hidden py-16 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-center"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--navy) / 0.88), hsl(var(--navy) / 0.88)), url(${banner1})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
          }}
          aria-hidden
        />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold">
              지금 바로 <span className="text-trust-blue">공인노무사</span>와 상담하세요
            </h2>
            <p className="mt-4 text-primary-foreground/60 max-w-xl mx-auto">
              기업 상황에 맞춘 최적의 방향을 안내드립니다.
            </p>
            <Link to="/consulting" className="btn-primary text-base px-12 py-5 mt-8 inline-flex">
              무료 상담 신청
              <ArrowRight className="w-5 h-5" aria-hidden />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

