"use client";

import dynamic from "next/dynamic";
import type { FaqSection } from "@/types/blogPost";

const BlogFaq = dynamic(() => import("@/components/blog/BlogFaq"), {
  ssr: false,
});

export function LazyBlogFaq({
  faq,
  uniqueKey,
}: {
  faq: FaqSection;
  uniqueKey: string;
}) {
  return <BlogFaq faq={faq} uniqueKey={uniqueKey} />;
}
