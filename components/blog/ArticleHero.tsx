import Image from "next/image";
import { preload } from "react-dom";
import type { BlogPost } from "@/types/blogPost";
import { blogHeroDesktopUrl, blogHeroLcpUrl } from "@/lib/blog/heroImage";

interface HeroProps {
  article: BlogPost;
}

export default function ArticleHero({ article }: HeroProps) {
  const { heroTitle, heroDescription, heroMobileImage, heroDesktopImage } =
    article;

  const lcpImage = heroMobileImage?.asset
    ? heroMobileImage
    : heroDesktopImage?.asset
      ? heroDesktopImage
      : null;

  const lcpSrc = lcpImage ? blogHeroLcpUrl(lcpImage) : null;
  if (lcpSrc) {
    preload(lcpSrc, { as: "image", fetchPriority: "high" });
  }

  const showDedicatedMobile =
    Boolean(heroMobileImage?.asset) && Boolean(heroDesktopImage?.asset);

  return (
    <section className="relative overflow-hidden border-b border-border">
      {lcpSrc && (
        <Image
          src={lcpSrc}
          fill
          alt={lcpImage?.alt || heroTitle}
          sizes="100vw"
          quality={80}
          className={
            showDedicatedMobile
              ? "-z-20 object-cover md:hidden"
              : "-z-20 object-cover"
          }
          priority
        />
      )}
      {heroDesktopImage?.asset && showDedicatedMobile && (
        <Image
          src={blogHeroDesktopUrl(heroDesktopImage)}
          fill
          alt={heroDesktopImage?.alt || heroTitle}
          sizes="100vw"
          quality={80}
          className="-z-20 hidden object-cover md:block"
          fetchPriority="low"
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
