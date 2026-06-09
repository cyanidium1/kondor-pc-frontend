import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd, breadcrumbJsonLd, catalogProductJsonLd } from "@/lib/seo";

import {
  getItemBySlug,
  getSimilarItems,
  getCatalogItems,
} from "@/lib/sanity/fetchers";
import { urlFor } from "@/lib/sanity/image";
import { CatalogCard } from "@/components/catalog/CatalogCard";
import { groupProducts } from "@/lib/catalog/group";
import { CatalogDetailView } from "./CatalogDetailView";
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

  const similar = item.category?.slug
    ? await getSimilarItems(item.slug, item.category.slug)
    : [];
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
      {/* Suspense boundary required because CatalogDetailView calls
          useSearchParams() — Next's prerender needs this to bail out safely. */}
      <Suspense fallback={null}>
        <CatalogDetailView item={item} />
      </Suspense>

      {similar.length > 0 && (
        <section className="container-site py-12 md:py-16">
          <div className="mb-6">
            <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Схожі товари
            </div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              З ЦІЄЇ Ж КАТЕГОРІЇ
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {groupProducts(similar)
              .slice(0, 4)
              .map((g) => (
                <CatalogCard key={g.key} group={g} />
              ))}
          </div>
        </section>
      )}
    </>
  );
}
