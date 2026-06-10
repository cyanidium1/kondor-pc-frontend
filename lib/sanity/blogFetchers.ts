/**
 * Blog server-side fetchers. Source: kondor-pc-admin Sanity (project `if6dzz62`).
 * Mirrors the pattern used by landingAdapter — tagged caches keep ISR coherent.
 */
import { cache } from "react";
import { SANITY_REVALIDATE_SECONDS } from "@/lib/sanity/revalidate";
import { contentClient } from "./contentClient";
import {
  ALL_BLOG_POSTS_QUERY,
  ALL_BLOG_POST_SLUGS_QUERY,
  BLOG_PAGE_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
} from "./blogQueries";
import type { BlogPost, BlogPostPreview, PageSeo } from "@/types/blogPost";

export const getAllBlogPosts = cache(async (): Promise<BlogPostPreview[]> => {
  const rows = await contentClient.fetch<BlogPostPreview[]>(
    ALL_BLOG_POSTS_QUERY,
    {},
    {
      next: { revalidate: SANITY_REVALIDATE_SECONDS, tags: ["blog:posts"] },
    },
  );
  return rows ?? [];
});

export async function getAllBlogPostSlugs(): Promise<string[]> {
  const rows = await contentClient.fetch<Array<{ slug: string }>>(
    ALL_BLOG_POST_SLUGS_QUERY,
    {},
    { next: { tags: ["blog:posts"] } },
  );
  return (rows ?? []).map((r) => r.slug).filter(Boolean);
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  return contentClient.fetch<BlogPost | null>(
    BLOG_POST_BY_SLUG_QUERY,
    { slug },
    {
      next: {
        revalidate: SANITY_REVALIDATE_SECONDS,
        tags: ["blog:posts", `blog:post:${slug}`],
      },
    },
  );
}

export async function getBlogPageSeo(): Promise<{ seo: PageSeo | null } | null> {
  return contentClient.fetch<{ seo: PageSeo | null } | null>(
    BLOG_PAGE_QUERY,
    {},
    {
      next: { revalidate: SANITY_REVALIDATE_SECONDS, tags: ["blog:page"] },
    },
  );
}
