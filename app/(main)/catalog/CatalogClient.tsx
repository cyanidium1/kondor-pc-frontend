"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { TechButton } from "@/components/shared/TechButton";
import { CatalogCard } from "@/components/catalog/CatalogCard";
import { formatUah } from "@/lib/format";
import {
  groupProducts,
  groupEffectivePrice,
  groupHasAvailability,
  groupHasDiscount,
  groupCategorySlug,
  groupName,
} from "@/lib/catalog/group";
import type {
  CategorySummary,
  CatalogProductGroup,
  CatalogProductListItem,
} from "@/types/catalog";

/**
 * Number of grouped product cards revealed at a time as the user scrolls
 * toward the bottom sentinel. Keeps first paint snappy + avoids mounting
 * hundreds of cards at once when the catalog grows.
 */
const REVEAL_BATCH = 12;

type Availability = "in-stock" | "pre-order";
type SortKey =
  | "default"
  | "price_asc"
  | "price_desc"
  | "discount"
  | "name_asc"
  | "name_desc";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "default", label: "За замовчуванням" },
  { value: "price_asc", label: "Від дешевих" },
  { value: "price_desc", label: "Від дорогих" },
  { value: "discount", label: "Зі знижкою спершу" },
  { value: "name_asc", label: "Назва А → Я" },
  { value: "name_desc", label: "Назва Я → А" },
];

export function CatalogClient({
  categories,
  items,
}: {
  categories: CategorySummary[];
  items: CatalogProductListItem[];
}) {
  // Collapse variant-level items into visual product groups. Filter + sort +
  // paginate operate on the grouped list so pagination counts reflect what the
  // user actually sees.
  const groups = useMemo(() => groupProducts(items), [items]);

  // Compute price bounds from the grouped list (cheapest variant per group).
  const [priceMin, priceMax] = useMemo(() => {
    if (groups.length === 0) return [0, 5000];
    const prices = groups.map(groupEffectivePrice);
    return [
      Math.max(0, Math.floor(Math.min(...prices) / 100) * 100),
      Math.ceil(Math.max(...prices) / 100) * 100,
    ];
  }, [groups]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    priceMin,
    priceMax,
  ]);
  const [availability, setAvailability] = useState<Availability[]>([
    "in-stock",
    "pre-order",
  ]);
  const [sort, setSort] = useState<SortKey>("default");
  // Number of cards currently revealed across both primary + secondary lists.
  // Grows by REVEAL_BATCH each time the bottom sentinel enters the viewport.
  const [visibleCount, setVisibleCount] = useState(REVEAL_BATCH);
  const sentinelRef = useRef<HTMLDivElement>(null);

  function toggleCategory(slug: string) {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }

  function toggleAvailability(v: Availability) {
    setAvailability((prev) =>
      prev.includes(v) ? prev.filter((a) => a !== v) : [...prev, v],
    );
  }

  const filtered: CatalogProductGroup[] = useMemo(() => {
    let res = groups.slice();

    if (selectedCategories.length > 0) {
      res = res.filter((g) => {
        const slug = groupCategorySlug(g);
        return slug ? selectedCategories.includes(slug) : false;
      });
    }

    res = res.filter((g) => {
      const p = groupEffectivePrice(g);
      return p >= priceRange[0] && p <= priceRange[1];
    });

    if (availability.length > 0 && availability.length < 2) {
      const kind = availability[0];
      res = res.filter((g) => groupHasAvailability(g, kind));
    }

    switch (sort) {
      case "price_asc":
        res.sort((a, b) => groupEffectivePrice(a) - groupEffectivePrice(b));
        break;
      case "price_desc":
        res.sort((a, b) => groupEffectivePrice(b) - groupEffectivePrice(a));
        break;
      case "discount":
        res.sort(
          (a, b) => Number(groupHasDiscount(b)) - Number(groupHasDiscount(a)),
        );
        break;
      case "name_asc":
        res.sort((a, b) => groupName(a).localeCompare(groupName(b), "uk"));
        break;
      case "name_desc":
        res.sort((a, b) => groupName(b).localeCompare(groupName(a), "uk"));
        break;
    }

    return res;
  }, [groups, selectedCategories, priceRange, availability, sort]);

  const activeFilters =
    selectedCategories.length +
    (priceRange[0] > priceMin || priceRange[1] < priceMax ? 1 : 0) +
    (availability.length !== 2 ? 1 : 0);
  const hasFilters = activeFilters > 0;

  /**
   * `primary` = groups matching the active filters (or ALL groups when no
   * filters). `secondary` = everything else, revealed after `primary` is
   * exhausted, under an "Інші товари" divider. De-duped by group key so a
   * product never appears in both sections.
   */
  const secondary: CatalogProductGroup[] = useMemo(() => {
    if (!hasFilters) return [];
    const primaryKeys = new Set(filtered.map((g) => g.key));
    const rest = groups.filter((g) => !primaryKeys.has(g.key));
    // Secondary uses the same sort as primary so the two sections read
    // consistently after the divider.
    switch (sort) {
      case "price_asc":
        rest.sort((a, b) => groupEffectivePrice(a) - groupEffectivePrice(b));
        break;
      case "price_desc":
        rest.sort((a, b) => groupEffectivePrice(b) - groupEffectivePrice(a));
        break;
      case "discount":
        rest.sort(
          (a, b) => Number(groupHasDiscount(b)) - Number(groupHasDiscount(a)),
        );
        break;
      case "name_asc":
        rest.sort((a, b) => groupName(a).localeCompare(groupName(b), "uk"));
        break;
      case "name_desc":
        rest.sort((a, b) => groupName(b).localeCompare(groupName(a), "uk"));
        break;
    }
    return rest;
  }, [groups, filtered, hasFilters, sort]);

  const renderedPrimary = filtered.slice(0, visibleCount);
  const renderedSecondary =
    visibleCount > filtered.length
      ? secondary.slice(0, visibleCount - filtered.length)
      : [];
  const totalAvailable = filtered.length + secondary.length;
  const totalRendered = renderedPrimary.length + renderedSecondary.length;
  const hasMore = totalRendered < totalAvailable;
  const showDivider = hasFilters && renderedSecondary.length > 0;

  // Reset visible window whenever filters/sort change — no stale cards from a
  // previous filter leak into the new view.
  useEffect(() => {
    setVisibleCount(REVEAL_BATCH);
  }, [selectedCategories, priceRange, availability, sort]);

  // Infinite scroll: bump the window when the sentinel enters the viewport.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisibleCount((v) => v + REVEAL_BATCH);
        }
      },
      // Pre-load one screen early so the feed feels continuous.
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, totalAvailable]);

  function resetAll() {
    setSelectedCategories([]);
    setPriceRange([priceMin, priceMax]);
    setAvailability(["in-stock", "pre-order"]);
  }

  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]">
      <aside className="z-10 h-fit space-y-6 rounded-lg border border-border bg-surface/95 p-5 backdrop-blur-md md:sticky md:top-[calc(var(--header-h,64px)+16px)]">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Фільтри
          </Label>
          {activeFilters > 0 && (
            <button
              type="button"
              onClick={resetAll}
              className="text-xs text-muted-foreground transition hover:text-foreground"
            >
              Скинути
            </button>
          )}
        </div>

        {/* Categories */}
        <div>
          <Label className="mb-2 block text-[11px] uppercase tracking-wider text-muted-foreground">
            Тип
          </Label>
          <ul className="space-y-1.5">
            {categories.map((cat) => {
              const active = selectedCategories.includes(cat.slug);
              return (
                <li key={cat.id}>
                  <label className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-sm transition hover:bg-accent/50">
                    <Checkbox
                      checked={active}
                      onCheckedChange={() => toggleCategory(cat.slug)}
                    />
                    <span className="flex-1">{cat.name}</span>
                    <span className="tabular text-[10px] text-muted-foreground">
                      {cat.itemsCount}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Price */}
        <div>
          <Label className="mb-2 block text-[11px] uppercase tracking-wider text-muted-foreground">
            Ціна
          </Label>
          <div className="tabular mt-1 flex items-baseline justify-between text-sm">
            <span className="font-semibold">{formatUah(priceRange[0])} ₴</span>
            <span className="text-muted-foreground">—</span>
            <span className="font-semibold">{formatUah(priceRange[1])} ₴</span>
          </div>
          <Slider
            className="mt-3"
            min={priceMin}
            max={priceMax}
            step={100}
            value={priceRange}
            onValueChange={(v) => {
              if (Array.isArray(v))
                setPriceRange([v[0], v[1]] as [number, number]);
            }}
          />
        </div>

        {/* Availability */}
        <div>
          <Label className="mb-2 block text-[11px] uppercase tracking-wider text-muted-foreground">
            Наявність
          </Label>
          <div className="space-y-1.5">
            <label className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-sm transition hover:bg-accent/50">
              <Checkbox
                checked={availability.includes("in-stock")}
                onCheckedChange={() => toggleAvailability("in-stock")}
              />
              <span>В наявності</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-sm transition hover:bg-accent/50">
              <Checkbox
                checked={availability.includes("pre-order")}
                onCheckedChange={() => toggleAvailability("pre-order")}
              />
              <span>Передзамовлення</span>
            </label>
          </div>
        </div>

        {/* Sort */}
        <div>
          <Label className="mb-2 block text-[11px] uppercase tracking-wider text-muted-foreground">
            Сортування
          </Label>
          <Select
            value={sort}
            onValueChange={(v) => {
              if (v) setSort(v as SortKey);
            }}
          >
            <SelectTrigger className="h-9 w-full">
              <SelectValue>
                {SORTS.find((s) => s.value === sort)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {SORTS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </aside>

      <div>
        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Знайдено:{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>
            {hasFilters && (
              <>
                {" "}із {groups.length}
              </>
            )}
          </div>
        </div>

        {filtered.length === 0 && !hasFilters ? (
          // Truly empty catalog — no filters, no groups. Keep a gentle state.
          <div className="rounded-lg border border-border bg-surface p-10 text-center">
            <div className="font-display text-xl font-bold">
              Каталог порожній
            </div>
          </div>
        ) : filtered.length === 0 && hasFilters ? (
          // Filtered view with zero matches — still show a reset CTA, then
          // continue with "Інші товари" below so the user is never at a dead
          // end.
          <>
            <div className="rounded-lg border border-border bg-surface p-8 text-center">
              <div className="font-display text-lg font-bold">
                За такими критеріями нічого не знайдено
              </div>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Спробуй скинути фільтри або розширити діапазон цін.
              </p>
              <div className="mt-4 flex justify-center">
                <TechButton onClick={resetAll} size="sm">
                  Скинути фільтри
                </TechButton>
              </div>
            </div>
            {secondary.length > 0 && (
              <>
                <OtherProductsDivider />
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {renderedSecondary.map((group) => (
                    <CatalogCard key={group.key} group={group} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {renderedPrimary.map((group) => (
                <CatalogCard key={group.key} group={group} />
              ))}
            </div>

            {showDivider && (
              <>
                <OtherProductsDivider />
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {renderedSecondary.map((group) => (
                    <CatalogCard key={group.key} group={group} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Infinite-scroll sentinel. Always rendered when more content is
            available, with a small spinner so the user sees that loading is in
            flight. The IntersectionObserver in the effect above watches this
            node and grows the visible window in batches. */}
        {hasMore && (
          <div
            ref={sentinelRef}
            className="mt-8 flex items-center justify-center py-6 text-muted-foreground"
            aria-live="polite"
          >
            <Loader2 className="size-4 animate-spin" strokeWidth={2} />
            <span className="ml-2 text-xs uppercase tracking-wider">
              Завантажуємо більше
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Soft divider between the primary filter results and the "everything else"
 * feed. Only rendered when filters are active AND primary is exhausted AND
 * there are other products to show.
 */
function OtherProductsDivider() {
  return (
    <div className="my-10 flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Інші товари, які можуть сподобатись
      </div>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

