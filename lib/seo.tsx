import type { Build, Faq } from "@/types/build";
import { DEFAULT_SOCIAL_IMAGE_URL, SITE_URL } from "@/lib/seo/constants";

export function organizationJsonLd(options?: { logoUrl?: string }) {
  const logoUrl = options?.logoUrl ?? DEFAULT_SOCIAL_IMAGE_URL;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kondor PC",
    url: SITE_URL,
    logo: logoUrl,
    sameAs: [
      "https://instagram.com/kondor_pc",
      "https://t.me/kondor_pc",
      "https://youtube.com/@kondor-pc",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Київ",
      addressCountry: "UA",
    },
    telephone: "+380000000000",
    email: "info@kondor-pc.ua",
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

export function faqPageJsonLd(items: Faq[] | { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
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
