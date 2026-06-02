/* ===== 노무법인 가온 - 노무 정보센터 · 자료실 ===== */
import { useMemo, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  Search,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import ScrollReveal from "@/components/ScrollReveal";
import {
  downloadLaborResource,
  getDownloadExtensionHint,
  LABOR_RESOURCES,
  RESOURCE_FILE_TYPE_LABEL,
  type LaborResource,
  type ResourceFileType,
} from "@/data/laborResources";

const CATEGORIES = [
  { id: "all", label: "전체" },
  { id: "form", label: "서식·양식" },
  { id: "guide", label: "가이드" },
  { id: "checklist", label: "체크리스트" },
  { id: "law", label: "법령 요약" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const FILE_TYPE_ICON: Record<ResourceFileType, typeof FileText> = {
  pdf: FileText,
  xlsx: FileSpreadsheet,
  docx: FileText,
  hwp: FileText,
};

const LaborResourceArchivePage = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return LABOR_RESOURCES.filter((r) => {
      const matchCategory = activeCategory === "all" || r.category === activeCategory;
      const matchSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleDownload = (item: LaborResource, e?: MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    downloadLaborResource(item);
    toast.success("다운로드가 시작되었습니다.", {
      description: `${item.title} (${getDownloadExtensionHint(item.fileType)})`,
    });
  };

  return (
    <main>
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(210 40% 97%) 100%)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-trust-blue/20 bg-trust-blue-light px-4 py-1.5 text-xs font-bold tracking-widest text-trust-blue">
              <FolderOpen className="h-3.5 w-3.5" />
              LABOR RESOURCE ARCHIVE
            </span>
            <h1 className="mt-5 text-3xl font-black text-navy md:text-4xl lg:text-5xl">노무 자료실</h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
              HR·노무 실무에 필요한 서식, 가이드, 체크리스트, 법령 요약 자료를
              <br className="hidden sm:block" />
              무료로 다운로드하실 수 있습니다.
            </p>
          </div>

          <ScrollReveal>
            <div className="mx-auto mt-10 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="자료명, 키워드로 검색 (예: 취업규칙, 급여, 4대보험)"
                  className="w-full rounded-2xl border border-border bg-surface py-4 pl-12 pr-4 text-sm shadow-sm outline-none transition focus:border-trust-blue/50 focus:ring-2 focus:ring-trust-blue/15"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div className="flex gap-1 rounded-xl bg-muted/50 p-1">
              <Link
                to="/info-center"
                className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                HR 포스팅
              </Link>
              <span className="rounded-lg bg-trust-blue px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm">
                자료실
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              총 <span className="font-bold text-trust-blue">{filteredResources.length}</span>건
            </p>
          </div>

          <ScrollReveal>
            <div className="mb-8 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-trust-blue text-primary-foreground shadow-md"
                      : "border border-border bg-surface text-muted-foreground hover:border-trust-blue/40 hover:text-trust-blue"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* 데스크톱: 테이블형 목록 */}
          <div className="hidden overflow-hidden rounded-2xl border border-border bg-surface md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-4">자료명</th>
                  <th className="hidden w-28 px-4 py-4 lg:table-cell">형식</th>
                  <th className="hidden w-24 px-4 py-4 xl:table-cell">용량</th>
                  <th className="hidden w-32 px-4 py-4 lg:table-cell">업데이트</th>
                  <th className="hidden w-24 px-4 py-4 xl:table-cell">다운로드</th>
                  <th className="w-32 px-6 py-4 text-center">받기</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-muted-foreground">
                      검색 조건에 맞는 자료가 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredResources.map((item) => {
                    const Icon = FILE_TYPE_ICON[item.fileType];
                    return (
                      <tr
                        key={item.id}
                        className="border-b border-border/60 transition-colors last:border-0 hover:bg-muted/20"
                      >
                        <td className="px-6 py-5">
                          <Link to={`/info-center/resources/${item.id}`} className="flex items-start gap-3 group">
                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-trust-blue-light">
                              <Icon className="h-5 w-5 text-trust-blue" strokeWidth={1.6} />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-foreground transition-colors group-hover:text-trust-blue">
                                {item.title}
                              </p>
                              <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{item.description}</p>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-md bg-muted px-2 py-0.5 text-[0.65rem] font-medium text-muted-foreground"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="hidden px-4 py-5 lg:table-cell">
                          <span className="rounded-md border border-border px-2 py-1 text-xs font-medium">
                            {RESOURCE_FILE_TYPE_LABEL[item.fileType]}
                          </span>
                        </td>
                        <td className="hidden px-4 py-5 text-muted-foreground xl:table-cell">{item.fileSize}</td>
                        <td className="hidden px-4 py-5 text-muted-foreground lg:table-cell">{item.updatedAt}</td>
                        <td className="hidden px-4 py-5 text-muted-foreground xl:table-cell">
                          {item.downloads.toLocaleString()}
                        </td>
                        <td className="px-6 py-5 text-center">
                          <button
                            type="button"
                            onClick={(e) => handleDownload(item, e)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-trust-blue px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-trust-blue/90"
                          >
                            <Download className="h-3.5 w-3.5" />
                            다운로드
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* 모바일: 카드형 목록 */}
          <div className="space-y-4 md:hidden">
            {filteredResources.length === 0 ? (
              <p className="py-12 text-center text-muted-foreground">검색 조건에 맞는 자료가 없습니다.</p>
            ) : (
              filteredResources.map((item, i) => {
                const Icon = FILE_TYPE_ICON[item.fileType];
                return (
                  <ScrollReveal key={item.id} delay={i * 40}>
                    <article className="card-lift rounded-2xl border border-border bg-surface p-5">
                      <Link to={`/info-center/resources/${item.id}`} className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-trust-blue-light">
                          <Icon className="h-5 w-5 text-trust-blue" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-md border border-border px-2 py-0.5 text-[0.65rem] font-medium">
                              {RESOURCE_FILE_TYPE_LABEL[item.fileType]}
                            </span>
                            <span className="text-[0.65rem] text-muted-foreground">{item.fileSize}</span>
                          </div>
                          <h3 className="mt-2 text-sm font-bold text-foreground">{item.title}</h3>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                              <span key={tag} className="rounded-md bg-muted px-2 py-0.5 text-[0.65rem] text-muted-foreground">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                      <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4">
                        <span className="text-[0.65rem] text-muted-foreground">
                          {item.updatedAt} · {item.downloads.toLocaleString()}회
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDownload(item)}
                          className="inline-flex items-center gap-1 rounded-lg bg-trust-blue px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                        >
                          <Download className="h-3.5 w-3.5" />
                          다운로드
                        </button>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })
            )}
          </div>

          <ScrollReveal>
            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-trust-blue/15 bg-trust-blue-light/50 p-6">
              <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-trust-blue" />
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">자료 이용 안내</p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>자료명을 클릭하면 상세 내용을 확인할 수 있습니다.</li>
                  <li>모든 자료는 HR·노무 실무 참고용이며, 개별 사업장 상황에 맞게 수정해 사용하세요.</li>
                  <li>법령 개정에 따라 내용이 달라질 수 있으니, 중요한 결정 전 전문가 상담을 권장합니다.</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-light py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-navy md:text-3xl">맞춤 규정·서식 작성이 필요하신가요?</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              자료실 양식을 기반으로 기업에 맞는 취업규칙·인사규정 정비도 도와드립니다.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/enterprise/employment-rules" className="btn-secondary inline-flex px-8 py-3">
                취업규칙 · 인사규정
              </Link>
              <Link to="/inquiry" className="btn-primary inline-flex px-10 py-4">
                무료 상담 신청
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default LaborResourceArchivePage;
