import { cache } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { buildNav } from "@/components/layout/nav";
import { fetchLandingNavItems } from "@/lib/sanity/landingAdapter";

const loadNav = cache(async () => {
  const [pidbirkyLinks, promoLinks] = await Promise.all([
    fetchLandingNavItems("dlya").catch(() => []),
    fetchLandingNavItems("promo").catch(() => []),
  ]);
  return buildNav(pidbirkyLinks, promoLinks);
});

export async function HeaderWithNav() {
  const nav = await loadNav();
  return <Header navItems={nav} />;
}

export async function FooterWithNav() {
  const nav = await loadNav();
  return <Footer navItems={nav} />;
}
