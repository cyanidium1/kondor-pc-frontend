export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kondor-pc.ua";

/** Host for UI copy (e.g. legal «на сайті example.com»). */
export function siteDisplayHost(url: string = SITE_URL): string {
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

/** Default share image — `app/opengraph-image.jpg` served by Next.js. */
export const DEFAULT_SOCIAL_IMAGE_URL = `${SITE_URL}/opengraph-image.jpg`;
