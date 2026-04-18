import type { Metadata } from "next";
import { CheckoutView } from "./CheckoutView";

export const metadata: Metadata = {
  title: "Оформлення замовлення",
};

export default function OformlennyaPage() {
  return (
    <div className="container-site py-10 md:py-14">
      <h1 className="font-display mb-8 text-3xl font-bold md:text-4xl">
        Оформлення замовлення
      </h1>
      <CheckoutView />
    </div>
  );
}
