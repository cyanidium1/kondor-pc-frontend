import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllLandingPageSlugs,
  getLandingPageBySlug,
  resolvePageContext,
} from "@/lib/data/adapter";
import { BLOCKS } from "@/components/blocks";
import type { Section } from "@/lib/data/types";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllLandingPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLandingPageBySlug(slug);
  if (!page) return { title: "Не знайдено" };
  return {
    title: page.seo.title,
    description: page.seo.description,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      type: "website",
      locale: "uk_UA",
      images: page.seo.ogImage ? [{ url: page.seo.ogImage }] : undefined,
    },
  };
}

export default async function DlyaLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getLandingPageBySlug(slug);
  if (!page) notFound();

  const pageContext = await resolvePageContext(page.context);

  return (
    <>
      {page.sections.map((section: Section) => {
        const Block = BLOCKS[section._type];
        if (!Block) {
          if (process.env.NODE_ENV !== "production") {
            console.warn(
              `[dlya/${slug}] unknown block _type: ${section._type}`,
            );
          }
          return null;
        }
        const { _type, _key, anchor, ...rest } = section as Section & {
          anchor?: string;
        };
        void _type;
        const body = <Block {...rest} pageContext={pageContext} />;
        return anchor ? (
          <section key={_key} id={anchor} aria-label={anchor}>
            {body}
          </section>
        ) : (
          <div key={_key}>{body}</div>
        );
      })}
    </>
  );
}
