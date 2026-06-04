import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {
  buildSanityPageContext,
  getAllLandingPageSlugs,
  getLandingPageBySlug,
  resolvePageContext,
} from "@/lib/data/adapter";
import {LandingPageBody} from "@/components/landings/LandingPageBody";

// ISR. Sanity webhook will revalidate by tag later (Sprint 3).
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllLandingPageSlugs("dlya");
  return slugs.map((slug) => ({slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const page = await getLandingPageBySlug(slug, "dlya");
  if (!page) return {title: "Не знайдено"};
  return {
    title: page.seo.title,
    description: page.seo.description,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      type: "website",
      locale: "uk_UA",
      images: page.seo.ogImage ? [{url: page.seo.ogImage}] : undefined,
    },
  };
}

export default async function DlyaLandingPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const page = await getLandingPageBySlug(slug, "dlya");
  if (!page) notFound();

  // Mock-driven pages keep their original (game/use_case) context.
  // Sanity-driven pages get a minimal context derived from the slug.
  const pageContext = page.context
    ? await resolvePageContext(page.context)
    : buildSanityPageContext("dlya", slug);

  return <LandingPageBody page={page} pageContext={pageContext} />;
}
