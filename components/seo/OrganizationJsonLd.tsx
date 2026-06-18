import { JsonLd, organizationJsonLd } from "@/lib/seo";
import { fetchSiteSeoByPageId } from "@/lib/sanity/siteSeoFetcher";
import { resolveOrganizationLogoUrl } from "@/lib/sanity/seoImage";

export async function OrganizationJsonLd() {
  const homeSeo = await fetchSiteSeoByPageId("seoHomePage").catch(() => null);
  const logoUrl = resolveOrganizationLogoUrl(homeSeo);
  const organizationSchema = await organizationJsonLd({ logoUrl });
  return <JsonLd data={organizationSchema} />;
}
