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
    <div className="container-prose">
      <div className="py-[150px] lg:pb-30">
        <Reveal>
          <SectionHeader
            kicker="Підбір · 30 секунд"
            title="Підберемо ПК за 30 секунд"
            subtitle="Покажемо реальні FPS у твоїх іграх та варіанти в твоєму бюджеті."
            titleClassName="mt-3 mb-5"
            className="mb-0"
          />
        </Reveal>
      </div>
      <SelectionForm />
    </div>
  );
}
