/**
 * GROQ queries for the blog.
 * Ported from nbyg-front — preserve original names and projections so the
 * shape returned matches what the components consume.
 * Source: kondor-pc-admin (project `if6dzz62`, dataset `production`).
 */

const groq = (strings: TemplateStringsArray, ...values: unknown[]) =>
  strings.reduce(
    (acc, str, i) => acc + str + (i < values.length ? String(values[i]) : ""),
    "",
  );

export const BLOG_PAGE_QUERY = groq`*[_type == "blogPage"][0]{
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;

export const ALL_BLOG_POSTS_QUERY = groq`*[_type == "blogPost"] | order(_createdAt desc){
  heroTitle,
  heroDescription,
  "heroMobileImage": heroMobileImage{
    ...,
    "alt": alt
  },
  "slug": slug.current,
  _createdAt
}`;

export const ALL_BLOG_POST_SLUGS_QUERY = groq`*[_type == "blogPost" && defined(slug.current)]{
  "slug": slug.current
}`;

export const BLOG_POST_BY_SLUG_QUERY = groq`*[
  _type == "blogPost" &&
  slug.current == $slug
][0]{
  heroTitle,
  heroDescription,
  "heroDesktopImage": heroDesktopImage{
    ...,
    "alt": alt
  },
  "heroMobileImage": heroMobileImage{
    ...,
    "alt": alt
  },
  "slug": slug.current,
  _createdAt,
  _updatedAt,
  "heroImageUrl": heroDesktopImage.asset->url,
  content[]{
    ...,
    _type == "block" => {
      ...,
      children[]{
        ...,
        marks[]
      }
    },
    _type == "image" => {
      _key,
      _type,
      asset,
      crop,
      hotspot,
      alt,
      "dimensions": asset->metadata.dimensions
    },
    _type == "gallerySection" => {
      _key,
      _type,
      items[]{
        _key,
        _type,
        image{
          _type,
          asset,
          crop,
          hotspot,
          alt,
          "dimensions": asset->metadata.dimensions
        }
      }
    },
    _type == "table" => {
      _key,
      _type,
      rows[]{
        cells[]
      }
    },
    markDefs[]{
      ...,
      _type == "link" => {
        _key,
        _type,
        href,
        blank
      }
    }
  },
  faq{
    _type,
    "type": _type,
    description,
    items[]{
      _key,
      question,
      answer,
      buttons
    }
  },
  seo{
    metaTitle,
    metaDescription,
    keywords,
    "opengraphImage": opengraphImage{
      ...,
      "alt": alt
    },
    "schemaJsonUrl": schemaJson.asset->url
  }
}`;
