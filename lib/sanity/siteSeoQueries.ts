const groq = (strings: TemplateStringsArray, ...values: unknown[]) =>
  strings.reduce(
    (acc, str, i) => acc + str + (i < values.length ? String(values[i]) : ""),
    "",
  );

export const SEO_SETTINGS_PROJECTION = `{
  metaTitle,
  metaDescription,
  keywords,
  "opengraphImage": opengraphImage{
    ...,
    "alt": alt
  },
  "schemaJsonUrl": schemaJson.asset->url
}`;

/** Fetch SEO block from a site singleton by fixed document _id. */
export const SITE_SEO_BY_DOCUMENT_ID = groq`
*[_id == $documentId][0]{
  seo${SEO_SETTINGS_PROJECTION}
}`;
