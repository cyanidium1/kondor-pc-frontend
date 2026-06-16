import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleHero from "@/components/blog/ArticleHero";
import ContentSection from "@/components/blog/ContentSection";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import ArticleSchema from "@/components/blog/ArticleSchema";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import {
  getAllBlogPostSlugs,
  getBlogPostBySlug,
} from "@/lib/sanity/blogFetchers";
import { SchemaJsonFromSeo } from "@/components/seo/SchemaJsonFromUrl";
import { pageCanonicalUrl, buildPageMetadata } from "@/lib/sanity/pageSeo";
import { resolveOrganizationLogoUrl } from "@/lib/sanity/seoImage";
import BlogFaq from "@/components/blog/BlogFaq";
import {
  RecommendedPostsAside,
  RecommendedPostsRail,
} from "./RecommendedPostsSection";
import { RecommendedAsideSkeleton } from "./RecommendedPostsSkeleton";

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
  return buildPageMetadata({
    seo: post.seo ?? null,
    path: `/blog/${post.slug}`,
    defaultTitle: post.heroTitle,
    defaultDescription: post.heroDescription,
    openGraphType: "article",
    publishedTime: post._createdAt,
    modifiedTime: post._updatedAt ?? post._createdAt,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { article } = await params;
  const currentArticle = await getBlogPostBySlug(article);

  if (!currentArticle) {
    notFound();
  }

  const { heroTitle, slug } = currentArticle;

  const crumbs = [
    { label: "Головна", href: "/" },
    { label: "Блог", href: "/blog" },
    { label: heroTitle, href: `/blog/${slug}` },
  ];

  const publisherLogoUrl = resolveOrganizationLogoUrl(currentArticle.seo);
  const uniqueKey = `blog-${slug}`;

  return (
    <>
      <Suspense fallback={null}>
        <SchemaJsonFromSeo
          seo={currentArticle.seo}
          excludeTypes={["Article", "BreadcrumbList", "FAQPage"]}
        />
      </Suspense>
      <JsonLd
        data={breadcrumbJsonLd(
          crumbs.map((c) => ({ name: c.label, url: c.href })),
        )}
      />
      {currentArticle._createdAt && (
        <ArticleSchema
          headline={heroTitle}
          url={pageCanonicalUrl(`/blog/${slug}`)}
          datePublished={currentArticle._createdAt}
          dateModified={currentArticle._updatedAt}
          imageUrl={currentArticle.heroImageUrl ?? undefined}
          logoUrl={publisherLogoUrl}
        />
      )}
      <BlogBreadcrumbs crumbs={crumbs} />
      <ArticleHero article={currentArticle} />
      <div className="container-site lg:flex lg:gap-12">
        <div className="min-w-0 flex-1">
          {currentArticle.content && currentArticle.content.length > 0 && (
            <ContentSection article={currentArticle} />
          )}
          {currentArticle.customFaq && currentArticle.customFaq.length > 0 && (
            <BlogFaq
              items={currentArticle.customFaq}
              uniqueKey={`${uniqueKey}-faq`}
            />
          )}
        </div>
        <Suspense fallback={<RecommendedAsideSkeleton />}>
          <RecommendedPostsAside slug={slug} uniqueKey={uniqueKey} />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <RecommendedPostsRail slug={slug} uniqueKey={uniqueKey} />
      </Suspense>
    </>
  );
}
