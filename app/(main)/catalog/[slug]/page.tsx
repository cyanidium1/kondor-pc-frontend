import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";

import {
  getItemBySlug,
  getSimilarItems,
  getCatalogItems,
} from "@/lib/sanity/fetchers";
import { urlFor } from "@/lib/sanity/image";
import { CatalogCard } from "@/components/catalog/CatalogCard";
import { CatalogDetailView } from "./CatalogDetailView";

export const revalidate = 600;

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

  return {
    title: item.seoTitle || item.name,
    description:
      item.seoDescription ||
      item.description ||
      `${item.name} — купити в Kondor PC`,
    openGraph: ogImage ? { images: [{ url: ogImage }] } : undefined,
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

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container-site pb-4 pt-6 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Головна
        </Link>
        <ChevronRight className="mx-1 inline size-3" />
        <Link href="/catalog" className="hover:text-foreground">
          Аксесуари
        </Link>
        {item.category && (
          <>
            <ChevronRight className="mx-1 inline size-3" />
            <Link
              href={`/catalog?cat=${item.category.slug}`}
              className="hover:text-foreground"
            >
              {item.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="mx-1 inline size-3" />
        <span className="text-foreground">{item.name}</span>
      </div>

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
              З цієї ж категорії
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {similar.slice(0, 4).map((s) => (
              <CatalogCard key={s.id} item={s} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
