import type { Metadata } from "next";
import { Inter, Unbounded, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";
import { CartDrawer } from "@/components/cart/CartDrawer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kondor PC — Ігрові ПК під замовлення",
    template: "%s · Kondor PC",
  },
  description:
    "Готові ігрові ПК з реальними FPS, гарантією та доставкою Новою Поштою. Підбір під твої ігри та бюджет.",
  metadataBase: new URL("https://kondor-pc.ua"),
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "Kondor PC",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${inter.variable} ${unbounded.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <CartDrawer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
