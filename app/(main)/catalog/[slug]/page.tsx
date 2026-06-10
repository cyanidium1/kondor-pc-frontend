import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd, breadcrumbJsonLd, catalogProductJsonLd } from "@/lib/seo";

import { getItemBySlug, getCatalogItems } from "@/lib/sanity/fetchers";
import { urlFor } from "@/lib/sanity/image";
import { CatalogDetailView } from "./CatalogDetailView";
import { SimilarCatalogSection } from "./SimilarCatalogSection";
import { SimilarCatalogSkeleton } from "./SimilarCatalogSkeleton";
import { SITE_URL } from "@/lib/seo/constants";

export const revalidate = 60;

export async function generateStaticParams() {
  const items = await getCatalogItems();
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItemBySlug(slug);
  if (!item) return { title: "Не знайдено" };

  const ogImage = item.seoImage?.asset
    ? urlFor(item.seoImage).width(1200).height(630).fit("crop").url()
    : item.coloropts?.[0]?.photos?.[0]?.asset
      ? urlFor(item.coloropts[0].photos[0])
          .width(1200)
          .height(630)
          .fit("crop")
          .url()
      : undefined;

  const canonicalUrl = `${SITE_URL}/catalog/${slug}`;
  const title = item.seoTitle || item.name;
  const description =
    item.seoDescription ||
    item.description ||
    `${item.name} — купити в Kondor PC`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "uk-UA": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "uk_UA",
      siteName: "Kondor PC",
      url: canonicalUrl,
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function CatalogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getItemBySlug(slug);
  if (!item) notFound();

  const productImageUrl = item.seoImage?.asset
    ? urlFor(item.seoImage).width(1200).height(630).fit("crop").url()
    : item.coloropts?.[0]?.photos?.[0]?.asset
      ? urlFor(item.coloropts[0].photos[0]).width(1200).height(630).fit("crop").url()
      : undefined;

  return (
    <>
      <JsonLd
        data={[
          catalogProductJsonLd(item, { imageUrl: productImageUrl }),
          breadcrumbJsonLd([
            { name: "Головна", url: "/" },
            { name: "Каталог аксесуарів", url: "/catalog" },
            { name: item.name, url: `/catalog/${item.slug}` },
          ]),
        ]}
      />
      <CatalogDetailView item={item} />

      {item.category?.slug && (
        <Suspense fallback={<SimilarCatalogSkeleton />}>
          <SimilarCatalogSection
            slug={item.slug}
            categorySlug={item.category.slug}
          />
        </Suspense>
      )}
    </>
  );
}
