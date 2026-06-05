"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TechButton } from "@/components/shared/TechButton";
import Image from "next/image";
import { ChassisArt } from "@/components/brand/ChassisArt";
import { SKU_ACCENTS } from "@/lib/sku-accents";
import { useCartStore, lineKey as cartLineKey } from "@/lib/cartStore";
import {
  orderSchema,
  type OrderFormValues,
  type DeliveryMethod,
  type PaymentMethod,
} from "@/lib/validations/order";
import { formatPrice, formatInstallment } from "@/lib/format";
import type { NpBranch, NpCity } from "@/lib/nova-poshta/types";
import { cn } from "@/lib/utils";
import {
  Truck,
  Package,
  MapPin,
  CreditCard,
  Wallet,
  Building2,
  Bitcoin,
  Banknote,
} from "lucide-react";

const DELIVERY_OPTIONS: {
  value: DeliveryMethod;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  note: string;
}[] = [
  {
    value: "np_branch",
    icon: Package,
    title: "Нова Пошта — відділення",
    note: "Безкоштовно · 1–3 дні",
  },
  {
    value: "np_courier",
    icon: Truck,
    title: "Нова Пошта — кур'єр",
    note: "200–400 ₴ · 1–2 дні",
  },
  {
    value: "self_pickup",
    icon: MapPin,
    title: "Самовивіз з шоуруму",
    note: "Безкоштовно · за попереднім записом",
  },
];

const PAYMENT_OPTIONS: {
  value: PaymentMethod;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  note?: string;
  group?: "main" | "other";
}[] = [
  {
    value: "cod",
    icon: Package,
    title: "Оплата при отриманні на НП",
    note: "Комісія НП: 2% + 20 ₴",
    group: "main",
  },
  {
    value: "monopay",
    icon: CreditCard,
    title: "Карта (MonoPay)",
    note: "Комісія сервісу 1.3%",
    group: "main",
  },
  {
    value: "monobank_parts",
    icon: Wallet,
    title: "Частинами Monobank",
    note: "4 платежі без %",
    group: "main",
  },
  {
    value: "privat_parts",
    icon: Wallet,
    title: "Частинами ПриватБанк",
    note: "до 9 платежів",
    group: "main",
  },
  {
    value: "pumb_parts",
    icon: Wallet,
    title: "Частинами ПУМБ",
    note: "до 12 місяців",
    group: "main",
  },
  {
    value: "iban_individual",
    icon: Banknote,
    title: "Безготівковий (IBAN)",
    note: "Менеджер надішле рахунок",
    group: "other",
  },
  {
    value: "iban_business",
    icon: Building2,
    title: "Для ФОП / ЮО",
    note: "Рахунок, договір, УПД",
    group: "other",
  },
  {
    value: "crypto",
    icon: Bitcoin,
    title: "Криптовалюта",
    note: "USDT / BTC / ETH",
    group: "other",
  },
];

export function CheckoutView() {
  const cartHydrated = useCartStore((s) => s.hydrated);
  const { items: cartItems, totalUah, clear } = useCartStore();
  const router = useRouter();
  const cartTotal = totalUah();

  const [cityQuery, setCityQuery] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [cityOptions, setCityOptions] = useState<NpCity[]>([]);
  const [cityLoading, setCityLoading] = useState(false);
  const [branches, setBranches] = useState<NpBranch[]>([]);
  const [branchesLoading, setBranchesLoading] = useState(false);
  const [branchQuery, setBranchQuery] = useState("");
  const [branchOpen, setBranchOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    mode: "onBlur",
    defaultValues: {
      customerPhone: "+380",
      deliveryMethod: "np_branch",
      paymentMethod: "monobank_parts",
    },
  });

  const deliveryMethod = watch("deliveryMethod");
  const paymentMethod = watch("paymentMethod");
  const cityRef = watch("deliveryCityRef");

  useEffect(() => {
    const q = cityQuery.trim();
    if (q.length < 1) {
      setCityOptions([]);
      setCityLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setCityLoading(true);
      try {
        const res = await fetch(
          `/api/nova-poshta/settlements?q=${encodeURIComponent(q)}&limit=10`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("settlements failed");
        const data = (await res.json()) as NpCity[];
        setCityOptions(Array.isArray(data) ? data : []);
      } catch {
        if (!controller.signal.aborted) setCityOptions([]);
      } finally {
        if (!controller.signal.aborted) setCityLoading(false);
      }
    }, 300);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [cityQuery]);

  useEffect(() => {
    if (!cityRef) {
      setBranches([]);
      setBranchesLoading(false);
      return;
    }

    const controller = new AbortController();
    (async () => {
      setBranchesLoading(true);
      try {
        const res = await fetch(
          `/api/nova-poshta/warehouses?cityRef=${encodeURIComponent(cityRef)}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("warehouses failed");
        const data = (await res.json()) as NpBranch[];
        setBranches(Array.isArray(data) ? data : []);
      } catch {
        if (!controller.signal.aborted) setBranches([]);
      } finally {
        if (!controller.signal.aborted) setBranchesLoading(false);
      }
    })();

    return () => controller.abort();
  }, [cityRef]);

  useEffect(() => {
    setBranchQuery("");
    setBranchOpen(false);
  }, [cityRef]);

  const filteredBranches = useMemo(() => {
    const q = branchQuery.trim().toLowerCase();
    if (!cityRef || branchesLoading || q.length < 1) return [];

    const digits = q.replace(/\D/g, "");
    return branches
      .filter((br) => {
        if (digits && br.number === digits) return true;
        if (br.number.toLowerCase().includes(q)) return true;
        if (br.address.toLowerCase().includes(q)) return true;
        return false;
      })
      .slice(0, 15);
  }, [branchQuery, branches, branchesLoading, cityRef]);

  const codDisabled = deliveryMethod === "self_pickup";

  useEffect(() => {
    if (paymentMethod === "cod" && codDisabled) {
      setValue("paymentMethod", "monobank_parts");
    }
  }, [codDisabled, paymentMethod, setValue]);

  async function onSubmit(values: OrderFormValues) {
    const orderNumber = `UA-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${String(Math.floor(Math.random() * 9000 + 1000))}`;
    // Stub: real server action will create Sanity Order + notify KeyCRM/Telegram/Sheets.
    console.log("[order:stub]", {
      orderNumber,
      ...values,
      items: cartItems,
      totalUah: cartTotal,
    });
    clear();
    router.push(
      `/oformlennya/uspikh?order=${orderNumber}&payment=${values.paymentMethod}`,
    );
  }

  if (!cartHydrated) {
    return (
      <div
        className="grid gap-8 md:grid-cols-[1fr_340px]"
        aria-busy="true"
        aria-label="Завантаження оформлення"
      >
        <div className="space-y-10">
          <div className="h-48 animate-pulse rounded-lg bg-muted/20" />
          <div className="h-64 animate-pulse rounded-lg bg-muted/20" />
          <div className="h-72 animate-pulse rounded-lg bg-muted/20" />
        </div>
        <div className="h-80 animate-pulse rounded-lg bg-muted/20" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface p-10 text-center">
        <div className="font-display text-xl font-bold">Кошик порожній</div>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Додай збірку в кошик, щоб оформити замовлення.
        </p>
        <Link
          href="/pk"
          className={cn(buttonVariants({ variant: "default" }), "mt-6")}
        >
          У каталог →
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-8 md:grid-cols-[1fr_340px]"
    >
      <div className="space-y-10">
        {/* 1 · CONTACT */}
        <section className="rounded-lg border border-border bg-surface p-6">
          <SectionNumber n="1" title="Твої контакти" />
          <div className="mt-5 space-y-4">
            <Field
              label="Ім'я та прізвище"
              error={errors.customerName?.message}
            >
              <Input
                placeholder="Іван Петренко"
                {...register("customerName")}
              />
            </Field>
            <Field
              label="Телефон"
              hint="Менеджер зателефонує для підтвердження"
              error={errors.customerPhone?.message}
            >
              <Input
                placeholder="+380 95 000 00 00"
                {...register("customerPhone")}
              />
            </Field>
            <Field
              label="Email"
              hint="Надішлемо номер замовлення та трек-номер"
              error={errors.customerEmail?.message}
            >
              <Input
                type="email"
                placeholder="you@example.com"
                {...register("customerEmail")}
              />
            </Field>
          </div>
        </section>

        {/* 2 · DELIVERY */}
        <section className="rounded-lg border border-border bg-surface p-6">
          <SectionNumber n="2" title="Доставка" />
          <div className="mt-5 space-y-3">
            {DELIVERY_OPTIONS.map((opt) => {
              const active = deliveryMethod === opt.value;
              return (
                <label
                  key={opt.value}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-md border p-4 transition",
                    active
                      ? "border-foreground bg-surface-elevated"
                      : "border-border hover:border-white/20",
                  )}
                >
                  <input
                    type="radio"
                    value={opt.value}
                    className="sr-only"
                    {...register("deliveryMethod")}
                  />
                  <div
                    className={cn(
                      "mt-0.5 flex size-5 items-center justify-center rounded-full border-2 transition",
                      active
                        ? "border-foreground"
                        : "border-muted-foreground/40",
                    )}
                  >
                    {active && (
                      <div className="size-2 rounded-full bg-foreground" />
                    )}
                  </div>
                  <opt.icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{opt.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {opt.note}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Cascading fields */}
          {deliveryMethod !== "self_pickup" && (
            <div className="mt-5 space-y-4">
              <Field label="Місто" error={errors.deliveryCity?.message}>
                <div className="relative">
                  <Input
                    placeholder="Почни вводити — з'явиться підказка"
                    value={cityQuery}
                    onChange={(e) => {
                      setCityQuery(e.target.value);
                      setCityOpen(true);
                      setValue("deliveryCity", e.target.value);
                      setValue("deliveryCityRef", "");
                      setValue("deliveryBranchNumber", "");
                      setBranchQuery("");
                    }}
                    onFocus={() => setCityOpen(true)}
                    onBlur={() => setTimeout(() => setCityOpen(false), 150)}
                    autoComplete="off"
                  />
                  {cityOpen && cityLoading && (
                    <p className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md border border-border bg-popover px-3 py-2 text-xs text-muted-foreground shadow-lg">
                      Шукаємо міста…
                    </p>
                  )}
                  {cityOpen &&
                    !cityLoading &&
                    cityQuery.trim().length > 0 &&
                    cityOptions.length === 0 && (
                      <p className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md border border-border bg-popover px-3 py-2 text-xs text-muted-foreground shadow-lg">
                        Нічого не знайдено
                      </p>
                    )}
                  {cityOpen && !cityLoading && cityOptions.length > 0 && (
                    <ul className="absolute left-0 right-0 top-full z-10 mt-1 max-h-64 overflow-y-auto rounded-md border border-border bg-popover shadow-lg">
                      {cityOptions.map((c) => (
                        <li key={c.ref}>
                          <button
                            type="button"
                            className="block w-full px-3 py-2 text-left text-sm hover:bg-accent"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              setCityQuery(c.name);
                              setCityOpen(false);
                              setValue("deliveryCity", c.name, {
                                shouldValidate: true,
                              });
                              setValue("deliveryCityRef", c.ref);
                              setValue("deliveryBranchNumber", "");
                              setBranchQuery("");
                            }}
                          >
                            <span className="font-medium">{c.name}</span>
                            <span className="ml-2 text-xs text-muted-foreground">
                              {c.region}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Field>

              {deliveryMethod === "np_branch" && (
                <Field
                  label="Відділення Нової Пошти"
                  error={errors.deliveryBranchNumber?.message}
                >
                  <input type="hidden" {...register("deliveryBranchNumber")} />
                  <div className="relative">
                    <Input
                      placeholder={
                        cityRef
                          ? "Номер відділення, поштомату або адреса"
                          : "Спершу оберіть місто"
                      }
                      value={branchQuery}
                      disabled={!cityRef || branchesLoading}
                      onChange={(e) => {
                        setBranchQuery(e.target.value);
                        setBranchOpen(true);
                        setValue("deliveryBranchNumber", "");
                      }}
                      onFocus={() => {
                        if (cityRef && !branchesLoading) setBranchOpen(true);
                      }}
                      onBlur={() => setTimeout(() => setBranchOpen(false), 150)}
                      autoComplete="off"
                    />
                    {branchOpen && branchesLoading && (
                      <p className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md border border-border bg-popover px-3 py-2 text-xs text-muted-foreground shadow-lg">
                        Завантажуємо відділення…
                      </p>
                    )}
                    {branchOpen &&
                      !branchesLoading &&
                      cityRef &&
                      branchQuery.trim().length > 0 &&
                      filteredBranches.length === 0 && (
                        <p className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md border border-border bg-popover px-3 py-2 text-xs text-muted-foreground shadow-lg">
                          Нічого не знайдено
                        </p>
                      )}
                    {branchOpen &&
                      !branchesLoading &&
                      filteredBranches.length > 0 && (
                        <ul className="absolute left-0 right-0 top-full z-10 mt-1 max-h-64 overflow-y-auto rounded-md border border-border bg-popover shadow-lg">
                          {filteredBranches.map((br) => (
                            <li key={br.ref}>
                              <button
                                type="button"
                                className="block w-full px-3 py-2 text-left text-sm hover:bg-accent"
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => {
                                  setBranchQuery(br.address);
                                  setBranchOpen(false);
                                  setValue("deliveryBranchNumber", br.number, {
                                    shouldValidate: true,
                                  });
                                }}
                              >
                                {br.address}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                </Field>
              )}

              {deliveryMethod === "np_courier" && (
                <Field
                  label="Адреса доставки"
                  error={errors.deliveryAddress?.message}
                >
                  <Input
                    placeholder="Вулиця, будинок, квартира"
                    {...register("deliveryAddress")}
                  />
                </Field>
              )}
            </div>
          )}
        </section>

        {/* 3 · PAYMENT */}
        <section className="rounded-lg border border-border bg-surface p-6">
          <SectionNumber n="3" title="Спосіб оплати" />
          <div className="mt-5 space-y-3">
            {PAYMENT_OPTIONS.filter((o) => o.group === "main").map((opt) => {
              const active = paymentMethod === opt.value;
              const disabled = opt.value === "cod" && codDisabled;
              return (
                <label
                  key={opt.value}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-md border p-4 transition",
                    active
                      ? "border-foreground bg-surface-elevated"
                      : "border-border hover:border-white/20",
                    disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  <input
                    type="radio"
                    value={opt.value}
                    disabled={disabled}
                    className="sr-only"
                    {...register("paymentMethod")}
                  />
                  <div
                    className={cn(
                      "mt-0.5 flex size-5 items-center justify-center rounded-full border-2 transition",
                      active
                        ? "border-foreground"
                        : "border-muted-foreground/40",
                    )}
                  >
                    {active && (
                      <div className="size-2 rounded-full bg-foreground" />
                    )}
                  </div>
                  <opt.icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">{opt.title}</div>
                    {opt.note && (
                      <div className="text-xs text-muted-foreground">
                        {opt.note}
                      </div>
                    )}
                    {opt.value === "monobank_parts" && (
                      <div className="tabular mt-1 text-xs text-muted-foreground">
                        {formatInstallment(cartTotal, 4)}
                      </div>
                    )}
                    {opt.value === "monopay" && (
                      <div className="tabular mt-1 text-xs text-muted-foreground">
                        Підсумок з комісією:{" "}
                        <span className="font-semibold text-foreground">
                          {formatPrice(Math.round(cartTotal * 1.013))}
                        </span>
                      </div>
                    )}
                    {opt.value === "cod" && codDisabled && (
                      <div className="mt-1 text-xs text-destructive">
                        Недоступно при самовивозі
                      </div>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
          <div className="mt-4 text-[11px] uppercase tracking-wider text-muted-foreground">
            ─── Інші способи ───
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {PAYMENT_OPTIONS.filter((o) => o.group === "other").map((opt) => {
              const active = paymentMethod === opt.value;
              return (
                <label
                  key={opt.value}
                  className={cn(
                    "flex cursor-pointer items-start gap-2 rounded-md border p-3 text-xs transition",
                    active
                      ? "border-foreground bg-surface-elevated"
                      : "border-border hover:border-white/20",
                  )}
                >
                  <input
                    type="radio"
                    value={opt.value}
                    className="sr-only"
                    {...register("paymentMethod")}
                  />
                  <opt.icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{opt.title}</div>
                    {opt.note && (
                      <div className="text-[11px] text-muted-foreground">
                        {opt.note}
                      </div>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        {/* 4 · CONFIRM */}
        <section className="rounded-lg border border-border bg-surface p-6">
          <SectionNumber n="4" title="Готовий?" />
          <div className="mt-5 space-y-4">
            <Field label="Коментар до замовлення" hint="Не обов'язково">
              <textarea
                {...register("customerComment")}
                rows={3}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:border-ring focus-visible:outline-none"
                placeholder="Побажання, деталі, зручний час дзвінка..."
              />
            </Field>

            <label className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="checkbox"
                {...register("consent")}
                className="mt-0.5 size-4 shrink-0 rounded border-border"
              />
              <span className="text-muted-foreground">
                Погоджуюсь з умовами{" "}
                <Link
                  href="/legal/publichna-oferta"
                  className="text-foreground underline underline-offset-4"
                >
                  публічної оферти
                </Link>{" "}
                та{" "}
                <Link
                  href="/legal/politika-konfidentsiynosti"
                  className="text-foreground underline underline-offset-4"
                >
                  політикою конфіденційності
                </Link>
              </span>
            </label>
            {errors.consent?.message && (
              <div className="text-xs text-destructive">
                {errors.consent.message}
              </div>
            )}

            <TechButton
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Оформлюємо..." : "Підтвердити замовлення"}
            </TechButton>
            <p className="text-center text-[11px] uppercase tracking-wider text-muted-foreground">
              Гарантія 12 міс · Повернення 14 днів · Доставка НП безкоштовно
            </p>
          </div>
        </section>
      </div>

      {/* SUMMARY */}
      <aside className="h-fit space-y-4 rounded-lg border border-border bg-surface p-5 md:sticky md:top-20">
        <div className="mb-2 text-[11px] uppercase tracking-wider text-muted-foreground">
          Твоє замовлення
        </div>
        <ul className="space-y-3">
          {cartItems.map((item) => {
            const isBuild = item.itemType === "build";
            const key = cartLineKey({
              slug: item.slug,
              options: item.options,
              colorCode: item.colorCode,
            });
            const imageSrc = item.image;
            return (
              <li
                key={key}
                className="flex items-start gap-3"
                style={
                  isBuild
                    ? {
                        ["--sku" as string]:
                          SKU_ACCENTS[item.slug as keyof typeof SKU_ACCENTS],
                      }
                    : undefined
                }
              >
                <div className="relative size-12 shrink-0 overflow-hidden rounded-md">
                  {isBuild && (
                    <ChassisArt
                      compact
                      className="absolute inset-0 size-full"
                    />
                  )}
                  {imageSrc && (
                    <Image
                      src={imageSrc}
                      alt=""
                      fill
                      sizes="48px"
                      className="relative z-10 object-cover"
                      unoptimized={!isBuild}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-sm font-bold uppercase">
                    {item.name}
                  </div>
                  {item.colorName && (
                    <div className="mt-0.5 text-[10px] text-muted-foreground">
                      Колір: {item.colorName}
                    </div>
                  )}
                  {item.options && item.options.length > 0 && (
                    <ul className="mt-0.5 text-[10px] text-muted-foreground">
                      {item.options.map((o) => (
                        <li key={o.groupId}>
                          {o.groupLabel}: {o.optionLabel}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.quantity > 1 && (
                    <div className="text-xs text-muted-foreground">
                      × {item.quantity}
                    </div>
                  )}
                </div>
                <div className="tabular shrink-0 text-sm font-semibold">
                  {formatPrice(item.unitPriceUah * item.quantity)}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="space-y-1.5 border-t border-border pt-4 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Товарів на</span>
            <span className="tabular">{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Доставка</span>
            <span>Безкоштовно</span>
          </div>
        </div>
        <div className="border-t border-border pt-3">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
            До сплати
          </div>
          <div className="tabular font-heading text-3xl font-bold">
            {paymentMethod === "monopay"
              ? formatPrice(Math.round(cartTotal * 1.013))
              : formatPrice(cartTotal)}
          </div>
          {paymentMethod === "monobank_parts" && (
            <div className="tabular mt-1 text-xs text-muted-foreground">
              {formatInstallment(cartTotal, 4)} Monobank без %
            </div>
          )}
        </div>
      </aside>
    </form>
  );
}

function SectionNumber({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="tabular flex size-8 items-center justify-center rounded-md border border-border bg-background font-display text-sm font-bold">
        {n}
      </div>
      <h2 className="font-display text-xl font-bold">{title}</h2>
    </div>
  );
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
