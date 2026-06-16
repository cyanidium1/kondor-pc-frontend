import type { Build, Faq } from "@/types/build";
import type { CatalogProductDetail } from "@/types/catalog";
import type { FaqSchemaItem } from "@/lib/seo/faqSchema";
import { DEFAULT_SOCIAL_IMAGE_URL, SITE_URL } from "@/lib/seo/constants";
import {
  ensureHttps,
  getSiteContacts,
  telegramHref,
} from "@/lib/sanity/siteContacts";

export async function organizationJsonLd(options?: { logoUrl?: string }) {
  const logoUrl = options?.logoUrl ?? DEFAULT_SOCIAL_IMAGE_URL;
  const contacts = await getSiteContacts().catch(() => null);
  const sameAs = [
    contacts?.instagramUrl ? ensureHttps(contacts.instagramUrl) : null,
    contacts?.telegramChatUrl ? ensureHttps(contacts.telegramChatUrl) : null,
    contacts?.youtubeUrl ? ensureHttps(contacts.youtubeUrl) : null,
    contacts?.telegram ? telegramHref(contacts.telegram) : null,
  ].filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kondor PC",
    url: SITE_URL,
    logo: logoUrl,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Київ",
      addressCountry: "UA",
    },
    ...(contacts?.phone ? { telephone: contacts.phone } : {}),
    ...(contacts?.email ? { email: contacts.email } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kondor PC",
    url: SITE_URL,
    inLanguage: "uk-UA",
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function productJsonLd(build: Build, imageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${build.name} — Ігровий ПК`,
    description: `Ігровий ПК з ${build.spec.cpu}, ${build.spec.gpu}, ${build.spec.ram}.`,
    image: imageUrl,
    brand: { "@type": "Brand", name: "Kondor PC" },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/pk/${build.slug}`,
      priceCurrency: "UAH",
      price: String(build.priceUah),
      availability:
        build.status === "in_stock"
          ? "https://schema.org/InStock"
          : build.status === "assemble_on_order"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function catalogProductJsonLd(
  item: CatalogProductDetail,
  options?: { imageUrl?: string },
) {
  const price = item.priceDiscount ?? item.price;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    ...(item.description ? { description: item.description } : {}),
    ...(options?.imageUrl ? { image: options.imageUrl } : {}),
    brand: { "@type": "Brand", name: "Kondor PC" },
    sku: item.id,
    category: item.category?.name,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/catalog/${item.slug}`,
      priceCurrency: "UAH",
      price: String(price),
      availability: item.preorder
        ? "https://schema.org/PreOrder"
        : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Kondor PC",
      },
    },
  };
}

export type { FaqSchemaItem } from "@/lib/seo/faqSchema";

export function faqPageJsonLd(
  items: Faq[] | FaqSchemaItem[],
): object | null {
  const mainEntity = items
    .filter((f) => f.question?.trim() && f.answer?.trim())
    .map((f) => ({
      "@type": "Question",
      name: f.question.trim(),
      acceptedAnswer: { "@type": "Answer", text: f.answer.trim() },
    }));

  if (mainEntity.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}

export function JsonLd({
  data,
}: {
  data: object | object[];
}) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
