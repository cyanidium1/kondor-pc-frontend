import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteBreadcrumbs } from "@/components/shared/RouteBreadcrumbs";
import { buildNav } from "@/components/layout/nav";
import { fetchLandingNavItems } from "@/lib/sanity/landingAdapter";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pidbirkyLinks, promoLinks] = await Promise.all([
    fetchLandingNavItems("dlya").catch(() => []),
    fetchLandingNavItems("promo").catch(() => []),
  ]);
  const nav = buildNav(pidbirkyLinks, promoLinks);

  return (
    <>
      <Header navItems={nav} />
      <main className="overflow-hidden">
        <RouteBreadcrumbs />
        {children}
      </main>
      <Footer navItems={nav} />
    </>
  );
}
