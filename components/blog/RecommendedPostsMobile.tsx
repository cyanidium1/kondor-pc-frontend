import type { BlogPostPreview } from "@/types/blogPost";
import BlogCard from "./BlogCard";

interface RecommendedPostsMobileProps {
  posts: BlogPostPreview[];
  uniqueKey: string;
}

export default function RecommendedPostsMobile({
  posts,
  uniqueKey,
}: RecommendedPostsMobileProps) {
  if (!posts || posts.length === 0) return null;
  const recommendedPosts = posts.slice(0, 6);

  return (
    <section className="container-site py-16">
      <h2 className="mb-6 font-display text-[22px] font-bold uppercase leading-[120%] text-foreground lg:text-[32px]">
        Читайте також
      </h2>
      <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0">
        {recommendedPosts.map((post) => (
          <div
            key={`${uniqueKey}-${post.slug}`}
            className="w-[82%] shrink-0 snap-start sm:w-auto"
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}
