import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {
  buildSanityPageContext,
  getAllLandingPageSlugs,
  getLandingPageBySlug,
} from "@/lib/data/adapter";
import {LandingPageBody} from "@/components/landings/LandingPageBody";
import {buildLandingMetadata} from "@/lib/sanity/landingSeo";

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
  return buildLandingMetadata({seo: page.seo, path: `/promo/${slug}`});
}

function PromoExpiredBanner() {
  return (
    <div
      role="status"
      className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-200"
    >
      Подія завершилась. Інформація нижче залишена для довідки.
    </div>
  );
}

export default async function PromoLandingPage({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;
  const page = await getLandingPageBySlug(slug, "promo");
  if (!page) notFound();

  const isExpired =
    page.expiresAt != null && new Date(page.expiresAt).getTime() <= Date.now();

  const pageContext = buildSanityPageContext("promo", slug);

  return (
    <>
      {isExpired ? <PromoExpiredBanner /> : null}
      <LandingPageBody page={page} pageContext={pageContext} />
    </>
  );
}
