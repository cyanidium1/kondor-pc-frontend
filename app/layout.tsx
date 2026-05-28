import type { Metadata } from "next";
import { Montserrat, Unbounded } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ScrollToTopButton } from "@/components/shared/ScrollToTopButton";
import { CartDrawer } from "@/components/cart/CartDrawer";

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const zenterSP = localFont({
  src: "../public/fonts/ZenterSPDemo.woff2",
  variable: "--font-display",
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
  // Pre-launch: hard-block all crawlers. Flip together with robots.ts when
  // we go live. See app/robots.ts for the launch checklist.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
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
      className={`${montserrat.variable} ${unbounded.variable} ${zenterSP.variable}`}
    >
      <body>
        {children}
        <CartDrawer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
