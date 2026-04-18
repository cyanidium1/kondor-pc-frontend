import type { Metadata } from "next";
import Link from "next/link";
import { BUILDS } from "@/lib/mock/builds";
import { CatalogClient } from "./CatalogClient";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Каталог ігрових ПК",
  description:
    "Каталог ігрових ПК у Києві: 8 перевірених збірок від 20 000 до 200 000 ₴.",
};

export default function CatalogPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Каталог
          </div>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Ігрові ПК
          </h1>
          <p className="mt-2 text-muted-foreground">
            {BUILDS.length} перевірених збірок у всіх цінових категоріях
          </p>
        </div>
        <Link
          href="/pidbir"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Не знаєш, що обрати? Пройди підбір →
        </Link>
      </div>

      <CatalogClient builds={BUILDS} />
    </div>
  );
}
