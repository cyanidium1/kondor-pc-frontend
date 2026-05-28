import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kondor-pc.ua";

/**
 * Pre-launch posture: site is fully built but NOT for indexing yet.
 *
 * `disallow: "/"` tells well-behaved crawlers (Google, Bing, Yandex) to skip
 * everything. Combined with `<meta name="robots" content="noindex,nofollow">`
 * in the root layout, this gives belt-and-braces protection against early
 * indexation while we finalize content and gather customer testimonials.
 *
 * The sitemap reference is still emitted — search engines fetch it lazily,
 * and on the day we flip to indexable we just relax the disallow here and
 * Google already knows the full URL graph.
 *
 * To go live, replace the `pre-launch` block below with the `live` block
 * (kept inline for ease of diff review).
 */
export default function robots(): MetadataRoute.Robots {
  const PRE_LAUNCH = true;

  if (PRE_LAUNCH) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
      sitemap: `${BASE_URL}/sitemap.xml`,
      host: BASE_URL,
    };
  }

  // live (flip PRE_LAUNCH to false to enable):
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/oformlennya",
          "/oformlennya/uspikh",
          "/styleguide",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
