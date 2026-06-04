import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {
  buildSanityPageContext,
  getAllLandingPageSlugs,
  getLandingPageBySlug,
} from "@/lib/data/adapter";
import {LandingPageBody} from "@/components/landings/LandingPageBody";

// ISR. Promo pages can have `expiresAt` set in Sanity; expired ones drop
// out of `generateStaticParams` automatically (handled in fetchLandingSlugs).
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllLandingPageSlugs("promo");
  return slugs.map((slug) => ({slug}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const page = await getLandingPageBySlug(slug, "promo");
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

export default async function PromoLandingPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const page = await getLandingPageBySlug(slug, "promo");
  if (!page) notFound();
  const pageContext = buildSanityPageContext("promo", slug);
  return <LandingPageBody page={page} pageContext={pageContext} />;
}
