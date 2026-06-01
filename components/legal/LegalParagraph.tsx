import {
  telegramHref,
  telegramLabel,
} from "@/lib/sanity/siteContacts";
import type { ReactNode } from "react";

const PLACEHOLDER_RE = /\{\{(seller|edrpou|email|telegram)\}\}/g;
const HAS_PLACEHOLDER_RE = /\{\{(seller|edrpou|email|telegram)\}\}/;

type PaymentSeller = { seller: string; edrpouOrRnokpp: string };
type SiteContactLinks = { email: string; telegram: string };

export function LegalParagraph({
  text,
  contactEmail,
  paymentSeller,
  siteContacts,
}: {
  text: string;
  contactEmail?: string | null;
  paymentSeller?: PaymentSeller | null;
  siteContacts?: SiteContactLinks | null;
}) {
  const email = contactEmail ?? siteContacts?.email;

  if (text.includes("{{email}}") && !email) {
    return (
      <p className="mb-3 text-muted-foreground">
        {text.replace(" на {{email}}", "").replace("{{email}}", "")}
      </p>
    );
  }

  if (text.includes("{{seller}}") && !paymentSeller) {
    return null;
  }

  if (
    text.includes("{{email}}") &&
    text.includes("{{telegram}}") &&
    !email &&
    !siteContacts?.telegram
  ) {
    return null;
  }

  if (!HAS_PLACEHOLDER_RE.test(text)) {
    return <p className="mb-3 text-muted-foreground">{text}</p>;
  }

  const segments = text.split(PLACEHOLDER_RE);
  const nodes: ReactNode[] = [];

  for (let i = 0; i < segments.length; i++) {
    if (i % 2 === 0) {
      if (segments[i]) nodes.push(segments[i]);
      continue;
    }

    const key = segments[i] as "seller" | "edrpou" | "email" | "telegram";
    const node = renderPlaceholder(key, {
      contactEmail: email,
      paymentSeller,
      siteContacts,
    });
    if (node) nodes.push(node);
  }

  if (nodes.length === 0) {
    return null;
  }

  return <p className="mb-3 text-muted-foreground">{nodes}</p>;
}

function renderPlaceholder(
  key: "seller" | "edrpou" | "email" | "telegram",
  ctx: {
    contactEmail?: string | null;
    paymentSeller?: PaymentSeller | null;
    siteContacts?: SiteContactLinks | null;
  },
): ReactNode | null {
  const linkClass =
    "font-medium text-foreground underline-offset-4 hover:underline";

  switch (key) {
    case "seller":
      return ctx.paymentSeller?.seller ?? null;
    case "edrpou":
      return ctx.paymentSeller?.edrpouOrRnokpp ?? null;
    case "email": {
      const email = ctx.contactEmail;
      if (!email) return null;
      return (
        <a href={`mailto:${email}`} className={linkClass}>
          {email}
        </a>
      );
    }
    case "telegram": {
      const telegram = ctx.siteContacts?.telegram;
      if (!telegram) return null;
      return (
        <a
          href={telegramHref(telegram)}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {telegramLabel(telegram)}
        </a>
      );
    }
  }
}
