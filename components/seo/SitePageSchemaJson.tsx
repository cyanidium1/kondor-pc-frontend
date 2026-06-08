import { SchemaJsonFromUrl } from "@/components/seo/SchemaJsonFromUrl";
import type { SiteSeoPageId } from "@/lib/sanity/siteSeoConfig";
import { fetchSiteSeoByPageId } from "@/lib/sanity/siteSeoFetcher";

export async function SitePageSchemaJson({
  pageId,
}: {
  pageId: SiteSeoPageId;
}) {
  const seo = await fetchSiteSeoByPageId(pageId).catch(() => null);
  return <SchemaJsonFromUrl url={seo?.schemaJsonUrl} />;
}
