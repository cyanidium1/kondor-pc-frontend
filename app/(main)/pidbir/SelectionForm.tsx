"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TechButton } from "@/components/shared/TechButton";
import { GameTile } from "@/components/brand/GameTile";
import { GAMES } from "@/lib/mock/games";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Plus } from "lucide-react";

const BUDGET_BUCKETS = [
  { label: "До 25 000 ₴", value: "0-25", note: "~$600" },
  { label: "25–50 000 ₴", value: "25-50", note: "$600–1200" },
  { label: "50–80 000 ₴", value: "50-80", note: "$1200–1900" },
  { label: "80 000 ₴+", value: "80-200", note: "$1900+" },
];

const RESOLUTIONS = [
  { value: "fullhd", label: "Full HD" },
  { value: "2k", label: "2K" },
  { value: "4k", label: "4K" },
];

const POPULAR_GAMES = GAMES.filter((g) => g.isPopular).slice(0, 8);

export function SelectionForm() {
  const router = useRouter();
  const [games, setGames] = useState<string[]>([]);
  const [otherOpen, setOtherOpen] = useState(false);
  const [other, setOther] = useState("");
  const [budget, setBudget] = useState<string | null>(null);
  const [showRefine, setShowRefine] = useState(false);
  const [resolution, setResolution] = useState<string | null>(null);

  const canSubmit = games.length > 0 && budget !== null;

  function toggleGame(slug: string) {
    setGames((curr) => {
      if (curr.includes(slug)) return curr.filter((s) => s !== slug);
      if (curr.length >= 3) return curr;
      return [...curr, slug];
    });
  }

  function submit() {
    if (!canSubmit) return;
    const params = new URLSearchParams();
    params.set("games", games.join(","));
    if (budget) params.set("budget", budget);
    if (resolution) params.set("resolution", resolution);
    if (other.trim()) params.set("other", other.trim());
    router.push(`/pidbir/rezultat?${params.toString()}`);
  }

  return (
    <div className="space-y-12">
      {/* GAMES */}
      <section>
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-bold">У що ти граєш?</h2>
          <div className="text-xs text-muted-foreground">
            Обрано: {games.length}/3
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {POPULAR_GAMES.map((g) => {
            const active = games.includes(g.slug);
            const disabled = !active && games.length >= 3;
            return (
              <button
                key={g.slug}
                type="button"
                onClick={() => toggleGame(g.slug)}
                disabled={disabled}
                className={cn(
                  "group relative overflow-hidden rounded-lg border transition",
                  active
                    ? "border-foreground ring-2 ring-foreground/40"
                    : "border-border hover:border-white/25",
                  disabled && "opacity-40",
                )}
                aria-pressed={active}
              >
                <GameTile
                  slug={g.slug}
                  name={g.name}
                  ukrName={g.ukrName}
                  heavy={g.isSystemHeavy}
                  coverImageUrl={g.coverImageUrl}
                  className="aspect-[4/3] w-full"
                />
                <div className="absolute right-2 top-2">
                  {active ? (
                    <div className="flex size-6 items-center justify-center rounded-full bg-foreground text-background">
                      <Check className="size-3.5" strokeWidth={3} />
                    </div>
                  ) : (
                    <div className="size-6 rounded-full border border-white/50 bg-black/30 backdrop-blur" />
                  )}
                </div>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setOtherOpen((v) => !v)}
            className={cn(
              "relative flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-center transition",
              otherOpen
                ? "border-foreground bg-surface-elevated"
                : "border-border bg-surface hover:border-white/25",
            )}
          >
            <Plus className="size-5 text-muted-foreground" strokeWidth={1.5} />
            <span className="font-medium">Інша гра</span>
          </button>
        </div>
        {otherOpen && (
          <div className="mt-4 max-w-md">
            <Input
              placeholder="Напиши назву гри — передамо менеджеру"
              value={other}
              onChange={(e) => setOther(e.target.value)}
            />
          </div>
        )}
      </section>

      {/* BUDGET */}
      <section>
        <div className="mb-5">
          <h2 className="font-display text-2xl font-bold">Який твій бюджет?</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {BUDGET_BUCKETS.map((b) => {
            const active = budget === b.value;
            return (
              <button
                key={b.value}
                type="button"
                onClick={() => setBudget(b.value)}
                className={cn(
                  "tabular rounded-lg border p-4 text-left transition",
                  active
                    ? "border-foreground bg-surface-elevated"
                    : "border-border bg-surface hover:border-white/20",
                )}
              >
                <div className="font-display text-lg font-bold">{b.label}</div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {b.note}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* REFINE */}
      <section>
        <button
          type="button"
          onClick={() => setShowRefine((v) => !v)}
          className="flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ChevronDown
            className={cn("size-4 transition", showRefine && "rotate-180")}
          />
          Уточнити (не обов&apos;язково)
        </button>
        {showRefine && (
          <div className="mt-5 space-y-5">
            <div>
              <Label className="mb-2 block">Для якого монітора підбираєш?</Label>
              <div className="flex flex-wrap gap-2">
                {RESOLUTIONS.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() =>
                      setResolution(resolution === r.value ? null : r.value)
                    }
                    className={cn(
                      buttonVariants({
                        variant: resolution === r.value ? "default" : "outline",
                        size: "sm",
                      }),
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SUBMIT */}
      <div className="sticky bottom-4 rounded-xl border border-border bg-surface/95 p-4 backdrop-blur md:static md:bg-transparent md:p-0">
        <TechButton
          type="button"
          size="lg"
          className="w-full"
          disabled={!canSubmit}
          onClick={submit}
        >
          {canSubmit
            ? "Показати збірки"
            : games.length === 0
              ? "Обери хоча б одну гру"
              : "Обери бюджет"}
        </TechButton>
      </div>
    </div>
  );
}
