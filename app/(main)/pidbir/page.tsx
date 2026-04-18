import type { Metadata } from "next";
import { SelectionForm } from "./SelectionForm";

export const metadata: Metadata = {
  title: "Підбір ПК за 30 секунд",
  description:
    "Обери свої ігри та бюджет — покажемо 3–5 підходящих збірок з реальними FPS.",
};

export default function PidbirPage() {
  return (
    <div className="container-prose py-16 md:py-24">
      <div className="mb-10 text-center">
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Підбір · 30 секунд
        </div>
        <h1 className="font-display text-4xl font-bold md:text-5xl">
          Підберемо ПК за 30 секунд
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Покажемо реальні FPS у твоїх іграх та варіанти в твоєму бюджеті.
        </p>
      </div>
      <SelectionForm />
    </div>
  );
}
