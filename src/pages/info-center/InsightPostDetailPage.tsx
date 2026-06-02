/* ===== 노무 정보센터 — HR 포스팅 상세 ===== */
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock3, Eye, User } from "lucide-react";
import {
  getInsightPostById,
  getRelatedPosts,
  INSIGHT_CATEGORY_EN,
  INSIGHT_CATEGORY_LABEL,
  type InsightSection,
} from "@/data/insightPosts";

function ArticleBody({ sections }: { sections: InsightSection[] }) {
  return (
    <div className="space-y-5">
      {sections.map((section, i) => {
        switch (section.type) {
          case "heading":
            return (
              <h2 key={i} className="pt-2 text-lg font-bold text-navy md:text-xl">
                {section.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={i} className="text-[0.9375rem] leading-[1.75] text-muted-foreground md:text-base">
                {section.text}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="space-y-2 pl-5">
                {section.items.map((item) => (
                  <li key={item} className="list-disc text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div
                key={i}
                className="rounded-xl border border-trust-blue/20 bg-trust-blue-light/40 px-5 py-4 text-sm leading-relaxed text-foreground"
              >
                {section.text}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

const InsightPostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = postId ? getInsightPostById(postId) : undefined;

  if (!post) {
    return <Navigate to="/info-center" replace />;
  }

  const related = getRelatedPosts(post);

  return (
    <main>
      {/* 상단 헤더 */}
      <section className="border-b border-border/80 bg-background py-8 md:py-10">
        <div className="container mx-auto max-w-3xl px-4">
          <Link
            to="/info-center"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-trust-blue"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            HR 포스팅 목록
          </Link>

          <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-trust-blue/90">
            {INSIGHT_CATEGORY_EN[post.category]}
          </p>
          <h1 className="mt-2 text-xl font-black leading-snug text-navy md:text-2xl lg:text-3xl">{post.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <User className="h-3.5 w-3.5 opacity-60" />
              {post.author}
            </span>
            <time dateTime={post.date}>{post.date}</time>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3.5 w-3.5 opacity-60" />
              조회 {post.views.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5 opacity-60" />
              {post.readMin}분 읽기
            </span>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-[0.65rem] font-medium text-foreground">
              {INSIGHT_CATEGORY_LABEL[post.category]}
            </span>
          </div>
        </div>
      </section>

      {/* 본문 */}
      <section className="section-white py-10 md:py-14">
        <div className="container mx-auto max-w-3xl px-4">
          <ArticleBody sections={post.sections} />

          <div className="mt-12 rounded-xl border border-border/80 bg-muted/30 px-5 py-4 text-xs leading-relaxed text-muted-foreground">
            본 콘텐츠는 일반적인 정보 제공 목적이며, 개별 사업장의 법률 자문을 대체하지 않습니다. 구체적인
            의사결정 전 공인노무사와 상담하시기 바랍니다.
          </div>
        </div>
      </section>

      {/* 관련 글 */}
      {related.length > 0 && (
        <section className="border-t border-border/80 bg-background py-10 md:py-12">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">Related Insights</h2>
            <ul className="mt-5 divide-y divide-border/80">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/info-center/posts/${item.id}`}
                    className="group flex flex-col gap-1 py-4 transition hover:opacity-90"
                  >
                    <span className="text-[0.65rem] font-bold uppercase tracking-wider text-trust-blue/80">
                      {INSIGHT_CATEGORY_EN[item.category]}
                    </span>
                    <span className="text-sm font-semibold text-foreground group-hover:text-trust-blue md:text-base">
                      {item.title}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
};

export default InsightPostDetailPage;
