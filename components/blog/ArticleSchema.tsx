/**
 * Article JSON-LD — ported from nbyg-front, branded for Kondor PC.
 */
import { DEFAULT_SOCIAL_IMAGE_URL, SITE_URL } from "@/lib/seo/constants";

interface ArticleSchemaProps {
  headline: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
  logoUrl?: string;
}

export default function ArticleSchema({
  headline,
  url,
  datePublished,
  dateModified,
  imageUrl,
  logoUrl = DEFAULT_SOCIAL_IMAGE_URL,
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
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Kondor PC",
      logo: {
        "@type": "ImageObject",
        url: logoUrl,
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
