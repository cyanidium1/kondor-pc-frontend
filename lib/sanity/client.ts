import { createClient } from "@sanity/client";

/**
 * Sanity client pointed at the legacy Kondor Devices dataset.
 * Reads are public — the peripherals catalog is served directly from this project.
 * Project ID/dataset are public config; we embed defaults so the site runs
 * without env setup, but env vars override for future migrations.
 */
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "qmszlzqu",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: true,
  perspective: "published",
});
