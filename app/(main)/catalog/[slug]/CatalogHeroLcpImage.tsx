import Image from "next/image";

/** Server-rendered LCP frame — paints before gallery client JS. */
export function CatalogHeroLcpImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="card-frame-md relative aspect-square w-full overflow-hidden bg-surface/40">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 640px, 90vw"
        quality={80}
        priority
        className="object-cover"
      />
    </div>
  );
}
