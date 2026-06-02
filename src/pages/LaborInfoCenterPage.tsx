/* ===== 노무법인 가온 - 노무 정보센터 (HR 포스팅) ===== */
import { useMemo } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { ArrowUpRight, Clock3, Eye } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { INSIGHT_CATEGORY_EN, INSIGHT_POSTS, type InsightPost } from "@/data/insightPosts";

const CATEGORIES = [
  { id: "all", label: "전체" },
  { id: "labor-law", label: "노동법" },
  { id: "subsidy", label: "정부지원금" },
  { id: "hr", label: "인사관리" },
  { id: "payroll", label: "급여/4대보험" },
  { id: "precedent", label: "판례사례" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

const categoryFromParam = (param: string | null): CategoryId => {
  if (!param) return "all";
  const map: Record<string, CategoryId> = {
    "labor-law": "labor-law",
    precedent: "precedent",
    subsidy: "subsidy",
    hr: "hr",
    payroll: "payroll",
  };
  return map[param] ?? "all";
};

function InsightCard({ post, index }: { post: InsightPost; index: number }) {
  return (
    <ScrollReveal delay={index * 50}>
      <Link
        to={`/info-center/posts/${post.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-surface transition-all duration-300 hover:border-trust-blue/30 hover:shadow-[0_16px_40px_-24px_rgba(15,23,42,0.18)]"
      >
        <div className="relative flex h-[4.5rem] items-end bg-gradient-to-br from-navy via-[#1a2744] to-navy-light px-5 pb-4 md:h-[5rem]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(255,255,255,0.15) 8px, rgba(255,255,255,0.15) 9px)",
            }}
            aria-hidden
          />
          <p className="relative text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary-foreground/75">
            {INSIGHT_CATEGORY_EN[post.category]}
          </p>
        </div>

        <div className="flex flex-1 flex-col p-5 pt-4">
          <h3 className="line-clamp-2 min-h-[2.75rem] text-[0.9375rem] font-bold leading-[1.45] text-foreground transition-colors group-hover:text-trust-blue md:min-h-[3rem] md:text-base md:leading-[1.5]">
            {post.title}
          </h3>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] text-muted-foreground md:text-xs">
              <time dateTime={post.date}>{post.date}</time>
              <span className="hidden text-border sm:inline" aria-hidden>
                |
              </span>
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3 w-3 shrink-0 opacity-60" strokeWidth={1.75} />
                조회 {post.views.toLocaleString()}
              </span>
              <span className="hidden text-border sm:inline" aria-hidden>
                |
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock3 className="h-3 w-3 shrink-0 opacity-60" strokeWidth={1.75} />
                {post.readMin}분 읽기
              </span>
            </div>
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-trust-blue"
              strokeWidth={1.75}
            />
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

const LaborInfoCenterPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = categoryFromParam(searchParams.get("category"));

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return INSIGHT_POSTS;
    return INSIGHT_POSTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  if (searchParams.get("category") === "resources") {
    return <Navigate to="/info-center/resources" replace />;
  }

  const setCategory = (id: CategoryId) => {
    if (id === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: id });
    }
  };

  return (
    <main>
      <section className="border-b border-border/80 bg-background py-10 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-trust-blue/90">
              Insights Center
            </span>
            <h1 className="mt-3 text-2xl font-black leading-tight text-navy md:text-3xl">
              노무·인사 전문 인사이트
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
              최신 노동법·정부지원금·판례·인사노무 정보를
              <br className="hidden sm:block" />
              공인노무사 관점의 분석 콘텐츠로 제공합니다.
            </p>
          </div>
        </div>
      </section>

      <section className="section-white py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-6 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-1 rounded-lg border border-border/80 bg-muted/30 p-1">
              <span className="rounded-md bg-navy px-4 py-2 text-xs font-semibold tracking-wide text-primary-foreground">
                HR 포스팅
              </span>
              <Link
                to="/info-center/resources"
                className="rounded-md px-4 py-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
              >
                자료실
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              총 <span className="font-semibold text-foreground">{filteredPosts.length}</span>건
            </p>
          </div>

          <ScrollReveal>
            <div className="mb-10 flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all md:px-4 md:py-2 md:text-sm ${
                    activeCategory === cat.id
                      ? "bg-navy text-primary-foreground"
                      : "border border-border bg-surface text-muted-foreground hover:border-navy/30 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {filteredPosts.map((post, i) => (
              <InsightCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LaborInfoCenterPage;
