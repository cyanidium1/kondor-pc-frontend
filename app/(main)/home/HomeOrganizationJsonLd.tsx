import { JsonLd, organizationJsonLd } from "@/lib/seo";
import { fetchSiteSeoByPageId } from "@/lib/sanity/siteSeoFetcher";
import { resolveOrganizationLogoUrl } from "@/lib/sanity/seoImage";

export async function HomeOrganizationJsonLd() {
  const homeSeo = await fetchSiteSeoByPageId("seoHomePage").catch(() => null);
  const organizationLogoUrl = resolveOrganizationLogoUrl(homeSeo);
  const organizationSchema = await organizationJsonLd({
    logoUrl: organizationLogoUrl,
  });
  return <JsonLd data={organizationSchema} />;
}
