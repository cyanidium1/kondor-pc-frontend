import type { Metadata } from "next";
import { SelectionForm } from "./SelectionForm";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeader } from "@/components/shared/SectionHeader";

export const metadata: Metadata = {
  title: "Підбір ПК за 30 секунд",
  description:
    "Обери свої ігри та бюджет — покажемо 3–5 підходящих збірок з реальними FPS.",
};

export default function PidbirPage() {
  return (
    <div className="">
      <div className="container-prose py-[150px] lg:pb-30 mb-15 lg:mb-25">
        <Reveal>
          <SectionHeader
            kicker="Підбір · 30 секунд"
            title="Підберемо ПК за 30 секунд"
            subtitle="Покажемо реальні FPS у твоїх іграх та варіанти в твоєму бюджеті."
            titleClassName="mt-3 mb-5 lg:mt-7 lg:mb-10"
            subtitleClassName="lg:max-w-[398px]"
            className="mb-0 lg:max-w-[606px]"
          />
        </Reveal>
      </div>
      <div className="container-site">
        <SelectionForm />
      </div>
    </div>
  );
}
