/* ===== 노무 정보센터 — 자료 상세 ===== */
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, FileSpreadsheet, FileText, ListChecks } from "lucide-react";
import { toast } from "sonner";
import {
  downloadLaborResource,
  getDownloadExtensionHint,
  getLaborResourceById,
  RESOURCE_CATEGORY_LABEL,
  RESOURCE_FILE_TYPE_LABEL,
  type ResourceFileType,
} from "@/data/laborResources";

const FILE_TYPE_ICON: Record<ResourceFileType, typeof FileText> = {
  pdf: FileText,
  xlsx: FileSpreadsheet,
  docx: FileText,
  hwp: FileText,
};

const ResourceDetailPage = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const resource = resourceId ? getLaborResourceById(resourceId) : undefined;

  if (!resource) {
    return <Navigate to="/info-center/resources" replace />;
  }

  const Icon = FILE_TYPE_ICON[resource.fileType];
  const extHint = getDownloadExtensionHint(resource.fileType);

  const handleDownload = () => {
    downloadLaborResource(resource);
    toast.success("다운로드가 시작되었습니다.", {
      description: `${resource.title} (${extHint})`,
    });
  };

  return (
    <main>
      <section className="border-b border-border/80 bg-background py-8 md:py-10">
        <div className="container mx-auto max-w-3xl px-4">
          <Link
            to="/info-center/resources"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-trust-blue"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            자료실 목록
          </Link>

          <div className="mt-5 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-trust-blue-light">
              <Icon className="h-6 w-6 text-trust-blue" strokeWidth={1.6} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-muted px-2 py-0.5 text-[0.65rem] font-semibold text-foreground">
                  {RESOURCE_CATEGORY_LABEL[resource.category]}
                </span>
                <span className="rounded-md border border-border px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground">
                  {RESOURCE_FILE_TYPE_LABEL[resource.fileType]}
                </span>
              </div>
              <h1 className="mt-2 text-xl font-black leading-snug text-navy md:text-2xl">{resource.title}</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{resource.description}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-5 text-xs text-muted-foreground">
            <span>업데이트 {resource.updatedAt}</span>
            <span>용량 {resource.fileSize}</span>
            <span>다운로드 {resource.downloads.toLocaleString()}회</span>
            <span>제공 형식: {extHint}</span>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="btn-primary mt-6 inline-flex px-8 py-3.5 text-sm"
          >
            <Download className="h-4 w-4" />
            자료 다운로드
          </button>
        </div>
      </section>

      <section className="section-white py-10 md:py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">
            <ListChecks className="h-4 w-4" />
            포함 내용
          </h2>
          <ul className="mt-4 space-y-2">
            {resource.preview.map((line) => (
              <li key={line} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-trust-blue" />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl border border-border/80 bg-muted/20 p-5">
            <p className="text-xs font-semibold text-foreground">미리보기</p>
            <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-muted-foreground">
              {resource.contents.join("\n")}
            </pre>
          </div>

          <div className="mt-8 rounded-xl border border-trust-blue/15 bg-trust-blue-light/40 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
            PDF·Excel·Word 표기 자료는 데모 환경에서 각각 HTML, CSV, TXT 형식으로 제공됩니다. 실제 서비스
            연동 시 원본 파일 형식으로 다운로드됩니다.
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResourceDetailPage;
