import type { Metadata } from "next";
import { SelectionForm } from "./SelectionForm";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { getAllGames } from "@/lib/sanity-pc/games";
import Image from "next/image";
import { SitePageSchemaJson } from "@/components/seo/SitePageSchemaJson";
import { metadataForSitePage } from "@/lib/sanity/siteSeoFetcher";

export async function generateMetadata(): Promise<Metadata> {
  return metadataForSitePage("seoPickerPage");
}

export default async function PidbirPage() {
  const gamesCatalog = await getAllGames();
  return (
    <>
      <SitePageSchemaJson pageId="seoPickerPage" />
      <div className="">
        <section className="relative py-[150px] lg:pb-30 mb-15 lg:mb-25 rounded-b-[40px] overflow-hidden">
          <div className="relative container-site">
            <div className="lg:hidden absolute top-[-150px] left-[-360px] w-[873px] h-[755px]">
              <Image
                src="/images/pidbir/decor-mob.webp"
                alt="Pidbir decor"
                width={873}
                height={755}
                className="object-cover"
              />
            </div>
            <div className="hidden lg:block absolute bottom-[-1143px] left-[-837px] xl:left-[-787px] w-[3375px] h-[1887px]">
              <Image
                src="/images/pidbir/shadows-desk.svg"
                alt="Pidbir shadows"
                width="3375"
                height="1887"
                className="object-cover"
              />
            </div>
            <div className="hidden lg:block absolute -z-10 top-[-160px] left-[-277px] w-[890px] h-[916px]">
              <Image
                src="/images/pidbir/decor-left-desk.webp"
                alt="Pidbir left decor"
                width="890"
                height="916"
                className="object-cover"
              />
            </div>
            <div className="hidden lg:block absolute -z-10 top-[-160px] right-[-327px] w-[871px] h-[640px]">
              <Image
                src="/images/pidbir/decor-right-desk.webp"
                alt="Pidbir right decor"
                width="871"
                height="640"
                className="object-cover"
              />
            </div>
            <Reveal>
              <SectionHeader
                kicker="Підбір · 30 секунд"
                title="Підберемо ПК за 30 секунд"
                subtitle="Покажемо реальні FPS у твоїх іграх та варіанти в твоєму бюджеті."
                titleClassName="mt-3 mb-5 lg:mt-7 lg:mb-10"
                subtitleClassName="lg:max-w-[398px]"
                className="mb-0 lg:max-w-[606px] lg:mx-auto"
                titleAs="h1"
              />
            </Reveal>
          </div>
        </section>
        <div className="container-site">
          <SelectionForm gamesCatalog={gamesCatalog} />
        </div>
      </div>
    </>
  );
}
