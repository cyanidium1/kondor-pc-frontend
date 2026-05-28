import { Suspense } from "react";
import type { Metadata } from "next";
import BlogHero from "@/components/blog/BlogHero";
import BlogList from "@/components/blog/BlogList";
import BlogBreadcrumbs from "@/components/blog/BlogBreadcrumbs";
import { getAllBlogPosts, getBlogPageSeo } from "@/lib/sanity/blogFetchers";
import { buildBlogMetadata } from "@/lib/sanity/blogSeo";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getBlogPageSeo().catch(() => null);
  return buildBlogMetadata({ seo: pageData?.seo ?? null, path: "/blog" });
}

const crumbs = [
  { label: "Головна", href: "/" },
  { label: "Блог", href: "/blog" },
];

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();

  return (
    <>
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
