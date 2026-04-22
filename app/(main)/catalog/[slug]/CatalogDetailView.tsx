"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Check,
  FileText,
  Download,
  Info,
  Play,
  Expand,
} from "lucide-react";
import { TechButton } from "@/components/shared/TechButton";
import {
  AddToCartAnimation,
  FLY_DURATION_MS,
} from "@/components/cart/AddToCartAnimation";
import { useCartStore } from "@/lib/cartStore";
import { urlFor } from "@/lib/sanity/image";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CatalogProductDetail, ColorVariant } from "@/types/catalog";

import "yet-another-react-lightbox/styles.css";

// Dynamic import — lightbox only loads when user opens it.
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

function youtubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (u.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
  } catch {}
  return null;
}

export function CatalogDetailView({ item }: { item: CatalogProductDetail }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { add, openDrawer } = useCartStore();

  const variants = item.coloropts || [];
  const initialColorParam = searchParams.get("color");
  const initialIdx = Math.max(
    0,
    variants.findIndex(
      (v) => v.color.toLowerCase() === (initialColorParam || "").toLowerCase(),
    ),
  );
  const [variantIdx, setVariantIdx] = useState<number>(
    initialIdx >= 0 ? initialIdx : 0,
  );
  const [photoIdx, setPhotoIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeVariant: ColorVariant | undefined = variants[variantIdx];
  const photos = useMemo(
    () => activeVariant?.photos ?? [],
    [activeVariant],
  );

  const hasDiscount =
    typeof item.priceDiscount === "number" && item.priceDiscount < item.price;
  const finalPrice = hasDiscount ? item.priceDiscount! : item.price;
  const discountPct = hasDiscount
    ? Math.round(((item.price - item.priceDiscount!) / item.price) * 100)
    : 0;

  // Pre-compute high-quality URLs for all photos of the active variant so
  // switching via thumbnails is instant (all <Image> layers are already in the DOM).
  const photoUrls = useMemo(
    () =>
      photos.map((p) =>
        p?.asset
          ? {
              main: urlFor(p).width(1600).height(1600).fit("crop").quality(90).url(),
              thumb: urlFor(p).width(300).height(300).fit("crop").quality(85).url(),
              full: urlFor(p).width(2400).fit("max").quality(92).url(),
              alt: p.alt || "",
            }
          : null,
      ),
    [photos],
  );

  const thumbUrl = photoUrls[photoIdx]?.thumb;

  const [animationKey, setAnimationKey] = useState<number | null>(null);
  const [startPos, setStartPos] = useState<{ top: number; left: number } | null>(
    null,
  );
  const [justAdded, setJustAdded] = useState(false);

  const ytEmbed = item.video?.url ? youtubeEmbed(item.video.url) : null;

  function setVariant(idx: number) {
    setVariantIdx(idx);
    setPhotoIdx(0);
    const color = variants[idx]?.color;
    const url = new URL(window.location.href);
    if (color) url.searchParams.set("color", color);
    else url.searchParams.delete("color");
    router.replace(url.pathname + url.search, { scroll: false });
  }

  function triggerFly(e: React.MouseEvent<HTMLButtonElement>) {
    if (!thumbUrl) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setStartPos({
      top: rect.top + rect.height / 2 - 30,
      left: rect.left + rect.width / 2 - 30,
    });
    setAnimationKey(Date.now());
  }

  function addToCart(e: React.MouseEvent<HTMLButtonElement>) {
    // Open drawer immediately so the user is already in the cart flow.
    openDrawer();
    triggerFly(e);
    // Commit the item when the thumbnail lands in the cart anchor —
    // visually it "arrives" inside the already-open drawer.
    window.setTimeout(() => {
      add({
        itemType: "accessory",
        slug: item.slug,
        name: item.name,
        priceUah: item.price,
        unitPriceUah: finalPrice,
        image: thumbUrl,
        colorCode: activeVariant?.code,
        colorName: activeVariant?.color,
      });
      setJustAdded(true);
      window.setTimeout(() => setJustAdded(false), 1500);
    }, FLY_DURATION_MS);
  }

  function buyNow() {
    add({
      itemType: "accessory",
      slug: item.slug,
      name: item.name,
      priceUah: item.price,
      unitPriceUah: finalPrice,
      image: thumbUrl,
      colorCode: activeVariant?.code,
      colorName: activeVariant?.color,
    });
    router.push("/oformlennya");
  }

  // Accent used only for the swatch background in the badge, not as page --sku
  // (many variants are dark/black and would render TechButton text invisible).
  const badgeAccent = item.badge?.hex || activeVariant?.hex || undefined;

  return (
    <>
      <section className="container-site pb-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Gallery */}
          <div>
            <div className="card-frame-md group relative aspect-square overflow-hidden bg-surface/40">
              {photoUrls.length > 0 ? (
                <>
                  {/* All photos stacked — opacity transition for instant switching */}
                  {photoUrls.map((u, i) => {
                    if (!u) return null;
                    const visible = i === photoIdx;
                    return (
                      <Image
                        key={u.main}
                        src={u.main}
                        alt={visible ? u.alt || item.name : ""}
                        fill
                        sizes="(min-width: 1024px) 640px, 90vw"
                        quality={90}
                        priority={i === 0}
                        className={cn(
                          "absolute inset-0 object-cover",
                          "transition-opacity duration-300 ease-out",
                          visible ? "opacity-100" : "opacity-0 pointer-events-none",
                        )}
                      />
                    );
                  })}
                  {/* Click layer — opens lightbox */}
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    aria-label="Відкрити на весь екран"
                    className="absolute inset-0 z-[5] cursor-zoom-in"
                  />
                  {/* Zoom hint — always visible, brighter on hover */}
                  <div className="pointer-events-none absolute right-4 bottom-4 z-[6] flex size-8 items-center justify-center rounded-full border border-white/15 bg-background/70 opacity-70 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                    <Expand className="size-3.5" strokeWidth={2} />
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
                  Без фото
                </div>
              )}
              {hasDiscount && (
                <span className="absolute left-4 top-4 z-10 rounded-sm bg-foreground px-2 py-0.5 text-xs font-bold text-background">
                  −{discountPct}%
                </span>
              )}
              {item.badge && (
                <span
                  className="absolute right-4 top-4 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black"
                  style={{ background: badgeAccent || "#ffc857" }}
                >
                  {item.badge.text}
                </span>
              )}
              {photos.length > 1 && (
                <div className="tabular pointer-events-none absolute bottom-4 left-4 z-10 rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
                  {photoIdx + 1} / {photos.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {photoUrls.map((u, i) => {
                  if (!u) return null;
                  return (
                    <button
                      key={u.thumb + i}
                      type="button"
                      onClick={() => setPhotoIdx(i)}
                      aria-label={`Фото ${i + 1}`}
                      aria-current={i === photoIdx}
                      className={cn(
                        "relative aspect-square overflow-hidden rounded-md border transition-all duration-200",
                        i === photoIdx
                          ? "border-foreground ring-2 ring-foreground/30"
                          : "border-border opacity-70 hover:border-white/25 hover:opacity-100",
                      )}
                    >
                      <Image
                        src={u.thumb}
                        alt=""
                        fill
                        sizes="120px"
                        quality={85}
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            {item.category && (
              <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                {item.category.name}
              </div>
            )}
            <h1 className="font-display text-3xl font-bold uppercase tracking-wide md:text-5xl">
              {item.name}
            </h1>

            {item.description && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            )}

            {/* Color picker */}
            {variants.length > 0 && (
              <div className="rounded-md border border-border bg-surface/60 p-4">
                <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                  Колір ·{" "}
                  <span className="text-foreground">
                    {activeVariant?.color}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v, i) => {
                    const active = i === variantIdx;
                    return (
                      <button
                        key={(v.code ?? "") + i}
                        type="button"
                        onClick={() => setVariant(i)}
                        aria-label={v.color}
                        className={cn(
                          "relative flex items-center gap-2 rounded-full border px-2 py-1 transition",
                          active
                            ? "border-foreground bg-surface-elevated"
                            : "border-border hover:border-white/25",
                        )}
                      >
                        <span
                          className="size-4 rounded-full ring-1 ring-white/20"
                          style={{ background: v.hex || "#999" }}
                        />
                        <span className="text-[11px] font-medium">
                          {v.color}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <div className="font-display tabular text-4xl font-bold">
                {formatPrice(finalPrice)}
              </div>
              {hasDiscount && (
                <div className="tabular text-base text-muted-foreground line-through">
                  {formatPrice(item.price)}
                </div>
              )}
            </div>

            {/* Preorder notice */}
            {item.preorder && (
              <div className="flex gap-2 rounded-md border border-border bg-surface/60 p-3 text-xs text-muted-foreground">
                <Info className="size-4 shrink-0 text-foreground" />
                <div>
                  <span className="font-medium text-foreground">
                    Передзамовлення
                  </span>
                  {item.preordertext ? ` · ${item.preordertext}` : null}
                </div>
              </div>
            )}

            {/* CTAs — single add, no qty; qty is managed inside the cart drawer. */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <TechButton size="lg" className="flex-1" onClick={buyNow}>
                Купити зараз
              </TechButton>
              <TechButton
                size="lg"
                className="flex-1"
                style={{ ["--tech-accent" as string]: "oklch(1 0 0 / 0.35)" }}
                onClick={addToCart}
              >
                {justAdded ? (
                  <>
                    <Check className="mr-1 size-4" strokeWidth={2.5} />
                    Додано
                  </>
                ) : (
                  "Додати в кошик"
                )}
              </TechButton>
            </div>

            {/* Manual / Driver chips */}
            {(item.manual || item.driver) && (
              <div className="flex flex-wrap gap-2">
                {item.manual && (
                  <a
                    href={item.manual}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs uppercase tracking-wider text-muted-foreground transition hover:border-white/25 hover:text-foreground"
                  >
                    <FileText className="size-3.5" />
                    Інструкція
                  </a>
                )}
                {item.driver && (
                  <a
                    href={item.driver}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs uppercase tracking-wider text-muted-foreground transition hover:border-white/25 hover:text-foreground"
                  >
                    <Download className="size-3.5" />
                    Драйвер
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Specs + Complect */}
      {(item.chars?.length > 0 || item.complect?.length > 0) && (
        <section className="border-t border-border bg-surface/30">
          <div className="container-site py-12 md:py-16">
            <div className="grid gap-10 md:grid-cols-2">
              {item.chars?.length > 0 && (
                <div>
                  <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                    Характеристики
                  </div>
                  <h2 className="mb-6 font-display text-2xl font-bold">
                    Технічні деталі
                  </h2>
                  <dl className="divide-y divide-border overflow-hidden rounded-md border border-border bg-surface">
                    {item.chars.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-start justify-between gap-4 px-4 py-3 text-sm"
                      >
                        <dt className="text-muted-foreground">{c.name}</dt>
                        <dd className="tabular text-right font-medium">
                          {c.char}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {item.complect?.length > 0 && (
                <div>
                  <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                    Що в коробці
                  </div>
                  <h2 className="mb-6 font-display text-2xl font-bold">
                    Комплектація
                  </h2>
                  <ul className="space-y-2">
                    {item.complect.map((c, i) => {
                      const iconUrl = c.icon?.asset
                        ? urlFor(c.icon)
                            .width(96)
                            .height(96)
                            .fit("max")
                            .quality(95)
                            .url()
                        : undefined;
                      return (
                        <li
                          key={i}
                          className="flex items-center gap-3 rounded-md border border-border bg-surface/80 px-3 py-2 text-sm"
                        >
                          <div className="relative flex size-8 shrink-0 items-center justify-center">
                            {iconUrl ? (
                              // Sanity icons are dark glyphs on transparent bg.
                              // `brightness(0) invert(1)` converts any shape to
                              // pure white silhouette so they read on dark UI.
                              <Image
                                src={iconUrl}
                                alt=""
                                width={28}
                                height={28}
                                className="size-7 object-contain [filter:brightness(0)_invert(1)]"
                                unoptimized
                              />
                            ) : null}
                          </div>
                          <span className="flex-1">{c.name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Video */}
      {ytEmbed && (
        <section className="border-t border-border">
          <div className="container-site py-12 md:py-16">
            <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Відео
            </div>
            <h2 className="mb-6 font-display text-2xl font-bold">
              Як це виглядає
            </h2>
            <div className="aspect-video overflow-hidden rounded-md border border-border bg-surface">
              <iframe
                src={ytEmbed}
                title={`${item.name} — відео`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </section>
      )}

      {/* Non-YouTube video fallback */}
      {!ytEmbed && item.video?.url && (
        <section className="border-t border-border">
          <div className="container-site py-8 md:py-12">
            <a
              href={item.video.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm transition hover:border-white/25"
            >
              <Play className="size-4" />
              Дивитись відео
            </a>
          </div>
        </section>
      )}

      {animationKey !== null && startPos && thumbUrl && (
        <AddToCartAnimation
          animationKey={animationKey}
          startPos={startPos}
          image={thumbUrl}
        />
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={photoIdx}
        on={{
          view: ({ index: i }) => setPhotoIdx(i),
        }}
        slides={photoUrls
          .filter((u): u is NonNullable<typeof u> => u !== null)
          .map((u) => ({ src: u.full, alt: u.alt }))}
        animation={{ fade: 250, swipe: 200 }}
        carousel={{ finite: false }}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: { backgroundColor: "rgba(4, 6, 10, 0.94)" },
        }}
      />
    </>
  );
}
