"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import { cn } from "@/lib/utils";
import type {
  CategorySummary,
  CatalogProductListItem,
} from "@/types/catalog";

const PAGE_SIZE = 12;

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

function effectivePrice(i: CatalogProductListItem): number {
  return typeof i.priceDiscount === "number" && i.priceDiscount < i.price
    ? i.priceDiscount
    : i.price;
}

export function CatalogClient({
  categories,
  items,
}: {
  categories: CategorySummary[];
  items: CatalogProductListItem[];
}) {
  // Compute price bounds from data.
  const [priceMin, priceMax] = useMemo(() => {
    if (items.length === 0) return [0, 5000];
    const prices = items.map(effectivePrice);
    return [
      Math.max(0, Math.floor(Math.min(...prices) / 100) * 100),
      Math.ceil(Math.max(...prices) / 100) * 100,
    ];
  }, [items]);

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
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLDivElement>(null);

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

  const filtered = useMemo(() => {
    let res = items.slice();

    if (selectedCategories.length > 0) {
      res = res.filter(
        (i) => i.category && selectedCategories.includes(i.category.slug),
      );
    }

    res = res.filter((i) => {
      const p = effectivePrice(i);
      return p >= priceRange[0] && p <= priceRange[1];
    });

    if (availability.length > 0 && availability.length < 2) {
      if (availability[0] === "in-stock") {
        res = res.filter((i) => !i.preorder);
      } else {
        res = res.filter((i) => !!i.preorder);
      }
    }

    switch (sort) {
      case "price_asc":
        res.sort((a, b) => effectivePrice(a) - effectivePrice(b));
        break;
      case "price_desc":
        res.sort((a, b) => effectivePrice(b) - effectivePrice(a));
        break;
      case "discount": {
        const pct = (i: CatalogProductListItem) =>
          typeof i.priceDiscount === "number" && i.priceDiscount < i.price
            ? (i.price - i.priceDiscount) / i.price
            : 0;
        res.sort((a, b) => pct(b) - pct(a));
        break;
      }
      case "name_asc":
        res.sort((a, b) => a.name.localeCompare(b.name, "uk"));
        break;
      case "name_desc":
        res.sort((a, b) => b.name.localeCompare(a.name, "uk"));
        break;
    }

    return res;
  }, [items, selectedCategories, priceRange, availability, sort]);

  const activeFilters =
    selectedCategories.length +
    (priceRange[0] > priceMin || priceRange[1] < priceMax ? 1 : 0) +
    (availability.length !== 2 ? 1 : 0);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // Reset to page 1 whenever filter/sort state changes.
  useEffect(() => {
    setPage(1);
  }, [selectedCategories, priceRange, availability, sort]);

  // Clamp page when totalPages shrinks below current page.
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

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

      <div ref={resultsRef}>
        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Знайдено:{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            із {items.length}
          </div>
          {filtered.length > PAGE_SIZE && (
            <div className="tabular text-xs">
              Сторінка{" "}
              <span className="font-semibold text-foreground">{page}</span> із{" "}
              {Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))}
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-border bg-surface p-10 text-center">
            <div className="font-display text-xl font-bold">
              За такими критеріями нічого не знайдено
            </div>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Спробуй скинути фільтри або розширити діапазон цін.
            </p>
            <div className="mt-5 flex justify-center">
              <TechButton onClick={resetAll} size="sm">
                Скинути фільтри
              </TechButton>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {paged.map((item) => (
                <CatalogCard key={item.id} item={item} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={(p) => {
                  setPage(p);
                  // Scroll the results column back to top — matches Condor UX.
                  if (resultsRef.current) {
                    const offset =
                      resultsRef.current.getBoundingClientRect().top +
                      window.scrollY -
                      96;
                    window.scrollTo({ top: offset, behavior: "smooth" });
                  }
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Numbered pagination with prev/next. Collapses into
 *   1 … 4 5 [6] 7 8 … 12
 * patterns once total pages exceed ~7 so the bar stays compact.
 */
function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  const pages = useMemo(() => buildPageList(page, totalPages), [page, totalPages]);

  return (
    <nav
      aria-label="Пагінація"
      className="mt-10 flex flex-wrap items-center justify-center gap-1.5"
    >
      <button
        type="button"
        aria-label="Попередня сторінка"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className={cn(
          "flex size-9 items-center justify-center rounded-md border border-border bg-surface/60 transition",
          "hover:border-white/25 hover:bg-surface disabled:pointer-events-none disabled:opacity-40",
        )}
      >
        <ChevronLeft className="size-4" strokeWidth={2} />
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="tabular flex size-9 items-center justify-center text-xs text-muted-foreground"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-label={`Сторінка ${p}`}
            aria-current={p === page}
            onClick={() => onChange(p)}
            className={cn(
              "tabular flex size-9 items-center justify-center rounded-md text-sm font-medium transition",
              p === page
                ? "border border-foreground bg-foreground text-background"
                : "border border-border bg-surface/60 hover:border-white/25 hover:bg-surface",
            )}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="Наступна сторінка"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className={cn(
          "flex size-9 items-center justify-center rounded-md border border-border bg-surface/60 transition",
          "hover:border-white/25 hover:bg-surface disabled:pointer-events-none disabled:opacity-40",
        )}
      >
        <ChevronRight className="size-4" strokeWidth={2} />
      </button>
    </nav>
  );
}

function buildPageList(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const out: (number | "…")[] = [1];
  const near = new Set([page - 1, page, page + 1]);
  for (let p = 2; p <= totalPages - 1; p++) {
    if (near.has(p)) out.push(p);
    else if (out[out.length - 1] !== "…") out.push("…");
  }
  out.push(totalPages);
  return out;
}
