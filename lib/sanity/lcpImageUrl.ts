/** Smaller Sanity CDN URL for above-the-fold LCP frames (mobile 4G). */
export function lcpImageUrl(src: string, width = 960): string {
  if (!src.includes("cdn.sanity.io")) return src;
  try {
    const u = new URL(src);
    u.searchParams.set("w", String(width));
    u.searchParams.set("q", "80");
    return u.toString();
  } catch {
    return src;
  }
}
