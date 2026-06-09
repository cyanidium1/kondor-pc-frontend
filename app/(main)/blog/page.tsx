import { Suspense } from "react";
import type { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero";
import BlogList from "@/components/blog/BlogList";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import { getAllBlogPosts, getBlogPageSeo } from "@/lib/sanity/blogFetchers";
import { SchemaJsonFromSeo } from "@/components/seo/SchemaJsonFromUrl";
import { buildBlogMetadata } from "@/lib/sanity/blogSeo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;
  const pageParam = Number.parseInt(params.page ?? "1", 10);
  const isPaginatedPage = Number.isFinite(pageParam) && pageParam > 1;

  const pageData = await getBlogPageSeo().catch(() => null);
  const metadata = buildBlogMetadata({ seo: pageData?.seo ?? null, path: "/blog" });
  if (!isPaginatedPage) return metadata;

  return {
    ...metadata,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}

const crumbs = [
  { label: "Головна", href: "/" },
  { label: "Блог", href: "/blog" },
];

export default async function BlogPage() {
  const [blogPosts, pageData] = await Promise.all([
    getAllBlogPosts(),
    getBlogPageSeo().catch(() => null),
  ]);

  return (
    <>
      <SchemaJsonFromSeo
        seo={pageData?.seo ?? null}
        excludeTypes={["BreadcrumbList"]}
      />
      <JsonLd
        data={breadcrumbJsonLd(crumbs.map((c) => ({ name: c.label, url: c.href })))}
      />
      <BlogBreadcrumbs crumbs={crumbs} />
      <BlogHero />
      <Suspense fallback={null}>
        <BlogList blogPosts={blogPosts} />
      </Suspense>
    </>
  );
}
