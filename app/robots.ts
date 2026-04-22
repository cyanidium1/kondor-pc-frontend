import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kondor-pc.ua";

export default function robots(): MetadataRoute.Robots {
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
  };
}
