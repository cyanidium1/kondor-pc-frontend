import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAddonItems } from "@/lib/sanity/fetchers";
import { CatalogCard } from "./CatalogCard";
import { SectionHeader } from "@/components/shared/SectionHeader";

/**
 * Server component — fetches the global `showonaddons` pool from Sanity
 * and renders a 4-up grid. Mirrors legacy Kondor Devices behavior:
 * "accessories" is a single curated pool, not per-PC references.
 */
export async function AccessoriesRail({
  title = "Зібрати з ПК",
  subtitle = "Аксесуари під твоє робоче місце — клавіатура, миша, поверхня.",
  limit = 4,
}: {
  title?: string;
  subtitle?: string;
  limit?: number;
}) {
  const addons = await getAddonItems();
  if (!addons || addons.length === 0) return null;

  const items = addons.slice(0, limit);

  return (
    <section className="border-y border-border bg-surface/30">
      <div className="container-site py-12 md:py-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <SectionHeader kicker="Аксесуари" title={title} subtitle={subtitle} />
          <Link
            href="/catalog"
            className="group/link inline-flex items-center gap-1 text-sm uppercase tracking-wider text-muted-foreground transition hover:text-foreground"
          >
            Весь каталог
            <ArrowRight className="size-3.5 transition group-hover/link:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <CatalogCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
