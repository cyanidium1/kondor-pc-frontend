"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  customBuildSchema,
  type CustomBuildValues,
} from "@/lib/validations/order";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { formatUah } from "@/lib/format";
import { useState } from "react";

const TASKS = [
  { value: "gaming", label: "Геймінг" },
  { value: "gaming_stream", label: "Геймінг + стрім" },
  { value: "work", label: "Робота (монтаж, 3D)" },
  { value: "universal", label: "Універсальний ПК" },
  { value: "other", label: "Щось інше" },
] as const;

const TIMES = [
  { value: "10-14", label: "10–14" },
  { value: "14-18", label: "14–18" },
  { value: "18-21", label: "18–21" },
  { value: "any", label: "Будь-який" },
] as const;

const CHANNELS = [
  { value: "telegram", label: "Telegram" },
  { value: "viber", label: "Viber" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Дзвінок" },
] as const;

export function CustomBuildForm() {
  const router = useRouter();
  const [budgetRange, setBudgetRange] = useState<[number, number]>([40, 80]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CustomBuildValues>({
    resolver: zodResolver(customBuildSchema),
    defaultValues: {
      customerPhone: "+380",
      budgetMin: 40000,
      budgetMax: 80000,
      task: "gaming",
      preferredTime: "any",
      channel: "telegram",
    },
  });

  const task = watch("task");
  const preferredTime = watch("preferredTime");
  const channel = watch("channel");

  async function onSubmit(values: CustomBuildValues) {
    const orderNumber = `UA-CB-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(Math.random() * 9000 + 1000)}`;
    console.log("[custom-build:stub]", { orderNumber, ...values });
    router.push(`/oformlennya/uspikh?order=${orderNumber}&payment=iban_individual`);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Budget */}
      <div className="rounded-lg border border-border bg-surface p-6">
        <Label className="mb-2 block">Приблизний бюджет</Label>
        <div className="tabular mb-3 flex items-baseline justify-between text-sm">
          <span className="font-semibold">{formatUah(budgetRange[0] * 1000)} ₴</span>
          <span className="text-muted-foreground">—</span>
          <span className="font-semibold">{formatUah(budgetRange[1] * 1000)} ₴</span>
        </div>
        <Slider
          min={20}
          max={200}
          step={5}
          value={budgetRange}
          onValueChange={(v) => {
            if (!Array.isArray(v)) return;
            const next: [number, number] = [v[0], v[1]];
            setBudgetRange(next);
            setValue("budgetMin", next[0] * 1000);
            setValue("budgetMax", next[1] * 1000);
          }}
        />
      </div>

      {/* Task */}
      <div className="rounded-lg border border-border bg-surface p-6">
        <Label className="mb-3 block">Основна задача</Label>
        <div className="grid gap-2 sm:grid-cols-2">
          {TASKS.map((t) => {
            const active = task === t.value;
            return (
              <label
                key={t.value}
                className={cn(
                  "cursor-pointer rounded-md border p-3 text-sm transition",
                  active
                    ? "border-foreground bg-surface-elevated"
                    : "border-border hover:border-white/20",
                )}
              >
                <input
                  type="radio"
                  value={t.value}
                  className="sr-only"
                  {...register("task")}
                />
                {t.label}
              </label>
            );
          })}
        </div>
      </div>

      {/* Games + Wishes */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-surface p-6">
          <Label className="mb-2 block">Які ігри або програми?</Label>
          <textarea
            rows={4}
            placeholder="Гратиму в CS2, іноді буду монтажити в Premiere..."
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:border-ring focus-visible:outline-none"
            {...register("games")}
          />
        </div>
        <div className="rounded-lg border border-border bg-surface p-6">
          <Label className="mb-2 block">Особливі побажання</Label>
          <textarea
            rows={4}
            placeholder="Хочу білий корпус з RGB, тихий, компактний..."
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:border-ring focus-visible:outline-none"
            {...register("wishes")}
          />
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-lg border border-border bg-surface p-6">
        <Label className="mb-4 block">Твій контакт</Label>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-1.5">
            <Label className="text-xs text-muted-foreground">Ім&apos;я</Label>
            <Input placeholder="Іван Петренко" {...register("customerName")} />
            {errors.customerName && (
              <p className="text-xs text-destructive">
                {errors.customerName.message}
              </p>
            )}
          </div>
          <div className="grid gap-1.5">
            <Label className="text-xs text-muted-foreground">Телефон</Label>
            <Input placeholder="+380 95 000 00 00" {...register("customerPhone")} />
            {errors.customerPhone && (
              <p className="text-xs text-destructive">
                {errors.customerPhone.message}
              </p>
            )}
          </div>
          <div className="grid gap-1.5 md:col-span-2">
            <Label className="text-xs text-muted-foreground">Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              {...register("customerEmail")}
            />
            {errors.customerEmail && (
              <p className="text-xs text-destructive">
                {errors.customerEmail.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <Label className="mb-2 block text-xs text-muted-foreground">
              Зручний час дзвінка
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {TIMES.map((t) => (
                <label
                  key={t.value}
                  className={cn(
                    "tabular cursor-pointer rounded-md border px-3 py-1.5 text-xs transition",
                    preferredTime === t.value
                      ? "border-foreground bg-surface-elevated"
                      : "border-border hover:border-white/20",
                  )}
                >
                  <input
                    type="radio"
                    value={t.value}
                    className="sr-only"
                    {...register("preferredTime")}
                  />
                  {t.label}
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label className="mb-2 block text-xs text-muted-foreground">
              Месенджер для звʼязку
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {CHANNELS.map((c) => (
                <label
                  key={c.value}
                  className={cn(
                    "cursor-pointer rounded-md border px-3 py-1.5 text-xs transition",
                    channel === c.value
                      ? "border-foreground bg-surface-elevated"
                      : "border-border hover:border-white/20",
                  )}
                >
                  <input
                    type="radio"
                    value={c.value}
                    className="sr-only"
                    {...register("channel")}
                  />
                  {c.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full px-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Надсилаємо..." : "Надіслати заявку →"}
      </Button>
      <p className="text-center text-[11px] uppercase tracking-wider text-muted-foreground">
        Натискаючи кнопку, ти погоджуєшся з{" "}
        <Link href="/legal/politika-konfidentsiynosti" className="underline underline-offset-4">
          політикою конфіденційності
        </Link>
      </p>
    </form>
  );
}
