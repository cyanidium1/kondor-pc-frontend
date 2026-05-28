import type { Metadata } from "next";
import { getAllBuilds } from "@/lib/sanity-pc/builds";
import { getAllGames } from "@/lib/sanity-pc/games";
import { CatalogClient } from "./CatalogClient";
import ArrowIcon from "@/components/icons/ArrowIcon";
import { TechButtonLink } from "@/components/shared/TechButton";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Каталог ігрових ПК",
  description:
    "Каталог ігрових ПК у Києві: 8 перевірених збірок від 20 000 до 200 000 ₴.",
};

export default async function CatalogPage() {
  const [builds, games] = await Promise.all([getAllBuilds(), getAllGames()]);

  return (
    <section className="relative container-site pt-8 lg:pt-12 pb-12 lg:pb-16">
      <div className="absolute -z-10 top-[-223px] lg:top-[-154px] left-[-860px] lg:left-[-160px] w-[1929px] h-[2007px]">
        <Image
          src="/images/pk/shadows.svg"
          alt="PK background"
          width="1929"
          height="2007"
          className="object-cover"
        />
      </div>
      <div className="mb-8 flex flex-wrap md:flex-nowrap items-end justify-between gap-4">
        <div className="mb-5 md:mb-0">
          <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Каталог
          </div>
          <h1 className="py-2 font-display text-[24px] font-bold md:text-5xl">
            ІГРОВІ ПК
          </h1>
          <p className="mt-2 text-[14px] leading-[120%] text-muted-foreground">
            {builds.length} перевірених збірок у всіх цінових категоріях
          </p>
        </div>
        <TechButtonLink
          href="/pidbir"
          variant="white"
          size="sm"
          className="w-full md:max-w-[411px] h-7.5 px-2 font-heading text-[10px] lg:text-[13px] font-medium leading-none tracking-normal"
        >
          <span>Не знаєш, що обрати? Пройди підбір</span>
          <ArrowIcon className="inline-block size-4 mb-0.5 ml-1" />
        </TechButtonLink>
      </div>

      <CatalogClient builds={builds} games={games} />
    </section>
  );
}
