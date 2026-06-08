import { fetchSchemaJsonLd } from "@/lib/sanity/schemaJson";
import { JsonLd } from "@/lib/seo";
import type { PageSeo } from "@/types/blogPost";

export async function SchemaJsonFromUrl({ url }: { url?: string | null }) {
  const data = await fetchSchemaJsonLd(url);
  if (!data) return null;
  return <JsonLd data={data} />;
}

export async function SchemaJsonFromSeo({
  seo,
}: {
  seo?: PageSeo | null;
}) {
  return <SchemaJsonFromUrl url={seo?.schemaJsonUrl} />;
}
