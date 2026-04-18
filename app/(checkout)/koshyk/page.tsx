import type { Metadata } from "next";
import { CartView } from "./CartView";

export const metadata: Metadata = {
  title: "Кошик",
};

export default function KoshykPage() {
  return (
    <div className="container-site py-12 md:py-16">
      <h1 className="font-display mb-8 text-3xl font-bold md:text-4xl">
        Твій кошик
      </h1>
      <CartView />
    </div>
  );
}
