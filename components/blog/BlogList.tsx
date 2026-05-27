"use client";
import { useRef } from "react";
import type { BlogPostPreview } from "@/types/blogPost";
import BlogCard from "./BlogCard";
import Pagination from "@/components/shared/Pagination";
import { useBlogArticlesPerPage } from "@/lib/useBlogArticlesPerPage";

interface BlogListProps {
  blogPosts: BlogPostPreview[];
}

export default function BlogList({ blogPosts }: BlogListProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemsPerPage = useBlogArticlesPerPage();

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <section className="container-site py-16 md:py-24">
        <p className="text-center text-muted-foreground">
          Скоро тут з'являться нові статті.
        </p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="container-site scroll-mt-24 py-16 md:py-24"
    >
      <Pagination
        items={blogPosts}
        useItemsPerPage={() => itemsPerPage}
        scrollTargetRef={sectionRef}
        renderItems={(currentItems) => (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {currentItems.map((post) => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        )}
      />
    </section>
  );
}
