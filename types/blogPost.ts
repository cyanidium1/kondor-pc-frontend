/**
 * Blog types — ported from nbyg-front (preserved naming).
 * Data source: kondor-pc-admin Sanity project `if6dzz62`, document `blogPost` / `blogPage`.
 */

export type SanityReference = {
  _type: "reference";
  _ref: string;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x: number;
  y: number;
  height: number;
  width: number;
};

export type SanityImage = {
  _type: "image";
  asset: SanityReference;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  alt?: string;
};

export type PageSeo = {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[] | string;
  opengraphImage?: SanityImage;
  schemaJsonUrl?: string;
};

export type FaqSection = {
  _type: "faqSection";
  type: "faqSection";
  description?: string;
  items: Array<{
    _key?: string;
    question: string;
    answer: string;
    buttons?: string[];
  }>;
};

export type BlogPostContentBlock = {
  _key: string;
  _type: "block";
  style?: "h2" | "h3" | "h4" | "normal";
  children: Array<{
    _key: string;
    _type: "span";
    text: string;
    marks?: string[];
    link?: {
      href: string;
      blank?: boolean;
    };
  }>;
  markDefs?: Array<{
    _key: string;
    _type: "link";
    href: string;
    blank?: boolean;
  }>;
  listItem?: "bullet" | "number";
  level?: number;
};

export type BlogPostContentImage = {
  _key?: string;
  _type: "image";
  asset: SanityReference;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
  alt?: string;
  /** From GROQ: asset->metadata.dimensions (intrinsic size for next/image) */
  dimensions?: { width: number; height: number } | null;
};

export type BlogPostContentTable = {
  _key: string;
  _type: "table";
  rows?: Array<{
    cells?: string[];
  }>;
};

export type BlogPostContentGalleryItem = {
  _key: string;
  _type: "galleryItem";
  image?: BlogPostContentImage;
};

export type BlogPostContentGallerySection = {
  _key: string;
  _type: "gallerySection";
  items?: BlogPostContentGalleryItem[];
};

export type BlogPostContent =
  | BlogPostContentBlock
  | BlogPostContentImage
  | BlogPostContentTable
  | BlogPostContentGallerySection;

export type BlogPost = {
  heroTitle: string;
  heroDescription: string;
  heroDesktopImage: SanityImage;
  heroMobileImage: SanityImage;
  slug: string;
  content: BlogPostContent[];
  faq?: FaqSection | null;
  seo?: PageSeo | null;
  _createdAt?: string;
  _updatedAt?: string;
  heroImageUrl?: string | null;
};

export type BlogPostPreview = {
  heroTitle: string;
  heroDescription: string;
  heroMobileImage: SanityImage;
  slug: string;
  _createdAt?: string;
};
