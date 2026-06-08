import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleHero from "@/components/blog/ArticleHero";
import ContentSection from "@/components/blog/ContentSection";
import BlogFaq from "@/components/blog/BlogFaq";
import RecommendedPostsDesktop from "@/components/blog/RecommendedPostsDesktop";
import RecommendedPostsMobile from "@/components/blog/RecommendedPostsMobile";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import ArticleSchema from "@/components/blog/ArticleSchema";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import {
  getAllBlogPostSlugs,
  getAllBlogPosts,
  getBlogPostBySlug,
} from "@/lib/sanity/blogFetchers";
import { SchemaJsonFromSeo } from "@/components/seo/SchemaJsonFromUrl";
import { blogCanonicalUrl, buildBlogMetadata } from "@/lib/sanity/blogSeo";
import { resolveOrganizationLogoUrl } from "@/lib/sanity/seoImage";

export const revalidate = 60;
export const dynamicParams = true;

interface ArticlePageProps {
  params: Promise<{ article: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogPostSlugs();
  return slugs.map((slug) => ({ article: slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { article } = await params;
  const post = await getBlogPostBySlug(article).catch(() => null);
  if (!post) return { title: "Стаття не знайдена" };
  return buildBlogMetadata({
    seo: post.seo ?? null,
    path: `/blog/${post.slug}`,
    defaultTitle: post.heroTitle,
    defaultDescription: post.heroDescription,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { article } = await params;

  const [currentArticle, blogPosts] = await Promise.all([
    getBlogPostBySlug(article),
    getAllBlogPosts(),
  ]);

  if (!currentArticle) {
    notFound();
  }

  const { heroTitle, slug } = currentArticle;
  const recommended = blogPosts.filter((p) => p.slug !== slug);

  const crumbs = [
    { label: "Головна", href: "/" },
    { label: "Блог", href: "/blog" },
    { label: heroTitle, href: `/blog/${slug}` },
  ];

  const publisherLogoUrl = resolveOrganizationLogoUrl(currentArticle.seo);

  return (
    <>
      <SchemaJsonFromSeo seo={currentArticle.seo} />
      <JsonLd
        data={breadcrumbJsonLd(
          crumbs.map((c) => ({ name: c.label, url: c.href })),
        )}
      />
      {currentArticle._createdAt && (
        <ArticleSchema
          headline={heroTitle}
          url={blogCanonicalUrl(`/blog/${slug}`)}
          datePublished={currentArticle._createdAt}
          dateModified={currentArticle._updatedAt}
          imageUrl={currentArticle.heroImageUrl ?? undefined}
          logoUrl={publisherLogoUrl}
        />
      )}
      <Suspense fallback={null}>
        <BlogBreadcrumbs crumbs={crumbs} />
        <ArticleHero article={currentArticle} />
        <div className="container-site lg:flex lg:gap-12">
          <div className="min-w-0 flex-1">
            {currentArticle.content && currentArticle.content.length > 0 && (
              <ContentSection article={currentArticle} />
            )}
            {currentArticle.faq && (
              <BlogFaq
                faq={currentArticle.faq}
                uniqueKey={`blog-${currentArticle.slug}-faq`}
              />
            )}
          </div>
          <div className="hidden w-80 shrink-0 lg:block">
            <RecommendedPostsDesktop
              posts={recommended}
              uniqueKey={`blog-${currentArticle.slug}-recommended-desktop`}
            />
          </div>
        </div>
        <div className="lg:hidden">
          <RecommendedPostsMobile
            posts={recommended}
            uniqueKey={`blog-${currentArticle.slug}-recommended-mobile`}
          />
        </div>
      </Suspense>
    </>
  );
}
