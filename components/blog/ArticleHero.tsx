import Image from "next/image";
import type { BlogPost } from "@/types/blogPost";
import { contentImageUrl } from "@/lib/sanity/contentClient";

interface HeroProps {
  article: BlogPost;
}

export default function ArticleHero({ article }: HeroProps) {
  const { heroTitle, heroDescription, heroMobileImage, heroDesktopImage } =
    article;

  return (
    <section className="relative overflow-hidden border-b border-border">
      {heroMobileImage?.asset && (
        <Image
          src={contentImageUrl(heroMobileImage).width(960).auto("format").url()}
          fill
          alt={heroMobileImage?.alt || heroTitle}
          sizes="100vw"
          className="-z-20 object-cover md:hidden"
          priority
          fetchPriority="high"
        />
      )}
      {heroDesktopImage?.asset && (
        <Image
          src={contentImageUrl(heroDesktopImage).width(1920).auto("format").url()}
          fill
          alt={heroDesktopImage?.alt || heroTitle}
          sizes="100vw"
          className="-z-20 hidden object-cover md:block"
          priority
          fetchPriority="high"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/55 to-black/85" />
      <div className="container-site py-20 md:py-28 lg:py-32">
        <h1 className="max-w-[980px] font-display text-[28px] font-bold uppercase leading-[110%] text-foreground md:text-[44px] lg:text-[56px]">
          {heroTitle}
        </h1>
        {heroDescription && (
          <p className="mt-5 max-w-[760px] whitespace-pre-line text-[14px] leading-[150%] text-foreground/85 md:text-[16px]">
            {heroDescription}
          </p>
        )}
      </div>
    </section>
  );
}
