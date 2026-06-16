/**
 * Article JSON-LD — ported from nbyg-front, branded for Kondor PC.
 */
import { DEFAULT_SOCIAL_IMAGE_URL, SITE_URL } from "@/lib/seo/constants";
import {
  ensureHttps,
  getSiteContacts,
  telegramHref,
} from "@/lib/sanity/siteContacts";

import type { BlogAuthor } from "@/types/blogPost";

interface ArticleSchemaProps {
  headline: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
  logoUrl?: string;
  author?: BlogAuthor | null;
}

export default async function ArticleSchema({
  headline,
  url,
  datePublished,
  dateModified,
  imageUrl,
  logoUrl = DEFAULT_SOCIAL_IMAGE_URL,
  author,
}: ArticleSchemaProps) {
  const contacts = await getSiteContacts().catch(() => null);
  const sameAs = [
    contacts?.instagramUrl ? ensureHttps(contacts.instagramUrl) : null,
    contacts?.telegramChatUrl ? ensureHttps(contacts.telegramChatUrl) : null,
    contacts?.youtubeUrl ? ensureHttps(contacts.youtubeUrl) : null,
    contacts?.telegram ? telegramHref(contacts.telegram) : null,
  ].filter((socialUrl): socialUrl is string => Boolean(socialUrl));

  const authorName = author?.name?.trim();
  const authorSchema = authorName
    ? {
        "@type": "Person" as const,
        name: authorName,
        ...(author?.profileUrl?.trim()
          ? { url: author.profileUrl.trim() }
          : {}),
      }
    : {
        "@type": "Organization" as const,
        name: "Kondor PC",
        url: SITE_URL,
        ...(sameAs.length > 0 ? { sameAs } : {}),
      };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    url,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: authorSchema,
    publisher: {
      "@type": "Organization",
      name: "Kondor PC",
      url: SITE_URL,
      ...(sameAs.length > 0 ? { sameAs } : {}),
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
