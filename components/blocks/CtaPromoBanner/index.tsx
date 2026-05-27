import Link from "next/link";

type Button = {text?: string; href?: string};

/**
 * CtaPromoBanner — призов до дії з опціональним промокодом і дедлайном.
 * Cyan-фон як на головній (інверсний колір — чорний текст).
 */
export function CtaPromoBanner({
  title,
  promoText,
  promoCode,
  endDate,
  button,
}: {
  title: string;
  promoText?: string;
  promoCode?: string;
  endDate?: string;
  button?: Button;
}) {
  const ends = endDate ? new Date(endDate) : null;
  const endsLabel = ends
    ? ends.toLocaleDateString("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;
  const hasButton = button && button.text && button.href;

  return (
    <div className="container-site py-16 md:py-20">
      <section className="relative overflow-hidden rounded-[40px] bg-brand-primary py-14 md:py-20">
        <div
          aria-hidden
          className="absolute -top-[120px] -left-[120px] size-[420px] rounded-full bg-black/15 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-[160px] -right-[140px] size-[460px] rounded-full bg-black/20 blur-3xl"
        />

        <div className="relative container-prose text-center">
          <div className="text-[11px] uppercase tracking-[0.25em] text-black/70">
            Промо-акція
            <span className="ml-3 inline-block size-2 rounded-full bg-black align-middle" />
          </div>
          <h2 className="mt-3 font-display text-[28px] font-bold uppercase tracking-tight text-black md:text-[40px]">
            {title}
          </h2>
          {promoText ? (
            <p className="mx-auto mt-4 max-w-[480px] text-[14px] leading-[120%] text-black/80 lg:text-[15px]">
              {promoText}
            </p>
          ) : null}

          {promoCode ? (
            <div className="mt-6 inline-flex items-center gap-3 rounded-lg border-2 border-dashed border-black/40 bg-black/[0.06] px-5 py-3">
              <span className="text-[10px] uppercase tracking-widest text-black/60">
                Промокод
              </span>
              <span className="font-display text-[18px] font-bold tracking-wider text-black md:text-[22px]">
                {promoCode}
              </span>
            </div>
          ) : null}

          {endsLabel ? (
            <div className="mt-5 text-[12px] uppercase tracking-widest text-black/70">
              Дійсний до {endsLabel}
            </div>
          ) : null}

          {hasButton ? (
            <div className="mt-8">
              <Link
                href={button!.href!}
                className="inline-flex items-center justify-center rounded-lg bg-black px-8 py-4 text-sm font-bold uppercase tracking-wider text-brand-primary transition-colors hover:bg-black/85"
              >
                {button!.text}
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
