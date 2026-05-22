import type { Metadata } from "next";
import { getAllCategories, getCatalogItems } from "@/lib/sanity/fetchers";
import { CatalogClient } from "./CatalogClient";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Каталог аксесуарів — клавіатури, миші, поверхні",
  description:
    "Ігрові клавіатури, миші, ігрові поверхні, комплекти кейкапів. Доставка НП, гарантія 12 міс.",
};

// Revalidate the whole listing every 5 minutes — aligns with fetcher-level cache.
export const revalidate = 300;

export default async function CatalogPage() {
  const [categories, items] = await Promise.all([
    getAllCategories(),
    getCatalogItems(),
  ]);

  return (
    <div className="relative container-site py-12 md:py-16">
      <div className="absolute -z-10 top-[-223px] lg:top-[-154px] left-[-860px] lg:left-[-160px] w-[1929px] h-[2007px]">
        <Image
          src="/images/pk/shadows.svg"
          alt="PK background"
          width="1929"
          height="2007"
          className="object-cover"
        />
      </div>
      <div className="mb-8">
        <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Аксесуари
        </div>
        <h1 className="font-display text-[24px] font-bold md:text-5xl">
          Клавіатури, миші, поверхні
        </h1>
        <p className="mt-4 max-w-2xl text-[14px] lg:text-[16px] leading-[120%] text-muted-foreground">
          Клавіатури, миші, ігрові поверхні та кейкапи — все, що потрібно для
          робочого місця навколо твого ПК.
        </p>
      </div>

      <CatalogClient categories={categories} items={items} />
    </div>
  );
}
