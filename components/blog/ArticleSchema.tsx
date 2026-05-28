/**
 * Article JSON-LD — ported from nbyg-front, branded for Kondor PC.
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kondor-pc.ua";

interface ArticleSchemaProps {
  headline: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
}

export default function ArticleSchema({
  headline,
  url,
  datePublished,
  dateModified,
  imageUrl,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: "Kondor PC",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Kondor PC",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/og/logo.png`,
      },
    },
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
