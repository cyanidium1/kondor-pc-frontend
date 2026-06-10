import RecommendedPostsDesktop from "@/components/blog/RecommendedPostsDesktop";
import RecommendedPostsMobile from "@/components/blog/RecommendedPostsMobile";
import { getAllBlogPosts } from "@/lib/sanity/blogFetchers";

export async function RecommendedPostsAside({
  slug,
  uniqueKey,
}: {
  slug: string;
  uniqueKey: string;
}) {
  const blogPosts = await getAllBlogPosts();
  const recommended = blogPosts.filter((p) => p.slug !== slug);
  if (recommended.length === 0) return null;

  return (
    <div className="hidden w-80 shrink-0 lg:block">
      <RecommendedPostsDesktop
        posts={recommended}
        uniqueKey={`${uniqueKey}-recommended-desktop`}
      />
    </div>
  );
}

export async function RecommendedPostsRail({
  slug,
  uniqueKey,
}: {
  slug: string;
  uniqueKey: string;
}) {
  const blogPosts = await getAllBlogPosts();
  const recommended = blogPosts.filter((p) => p.slug !== slug);
  if (recommended.length === 0) return null;

  return (
    <div className="lg:hidden">
      <RecommendedPostsMobile
        posts={recommended}
        uniqueKey={`${uniqueKey}-recommended-mobile`}
      />
    </div>
  );
}
