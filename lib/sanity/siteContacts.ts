import { contentClient } from "./contentClient";

export interface SiteContacts {
  email: string;
  telegram: string;
  phone: string;
}

const SITE_CONTACTS_QUERY = `
*[_type == "siteContacts" && _id == "siteContacts"][0]{
  email,
  telegram,
  phone
}
`;

const SITE_CONTACT_EMAIL_QUERY = `
*[_type == "siteContacts" && _id == "siteContacts"][0].email
`;

export async function getSiteContactEmailAndTelegram(): Promise<{
  email: string;
  telegram: string;
} | null> {
  const row = await contentClient.fetch<{
    email?: string;
    telegram?: string;
  } | null>(
    `*[_type == "siteContacts" && _id == "siteContacts"][0]{ email, telegram }`,
    {},
    {
      next: { revalidate: 3600, tags: ["sanity:siteContacts"] },
    },
  );

  if (!row?.email?.trim() || !row.telegram?.trim()) {
    return null;
  }

  return {
    email: row.email.trim(),
    telegram: row.telegram.trim(),
  };
}

export async function getSiteContactEmail(): Promise<string | null> {
  const email = await contentClient.fetch<string | null>(
    SITE_CONTACT_EMAIL_QUERY,
    {},
    {
      next: { revalidate: 3600, tags: ["sanity:siteContacts"] },
    },
  );

  const trimmed = email?.trim();
  return trimmed || null;
}

export async function getSiteContacts(): Promise<SiteContacts | null> {
  const row = await contentClient.fetch<SiteContacts | null>(
    SITE_CONTACTS_QUERY,
    {},
    {
      next: { revalidate: 3600, tags: ["sanity:siteContacts"] },
    },
  );

  if (!row?.email?.trim() || !row.telegram?.trim() || !row.phone?.trim()) {
    return null;
  }

  return {
    email: row.email.trim(),
    telegram: row.telegram.trim(),
    phone: row.phone.trim(),
  };
}

export function telegramHref(raw: string): string {
  const value = raw.trim();
  if (/^https?:\/\//i.test(value)) return value;
  const username = value.replace(/^@/, "");
  return `https://t.me/${username}`;
}

export function telegramLabel(raw: string): string {
  const value = raw.trim();
  if (value.startsWith("@")) return value;
  if (/^https?:\/\//i.test(value)) {
    const match = value.match(/(?:t\.me|telegram\.me)\/([\w\d_]+)/i);
    if (match?.[1]) return `@${match[1]}`;
  }
  return `@${value.replace(/^@/, "")}`;
}

export function phoneHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

/** +380XXXXXXXXX → +380 XX XXX XX XX */
export function formatPhoneDisplay(phone: string): string {
  const clean = phone.replace(/\s/g, "");
  if (!/^\+380\d{9}$/.test(clean)) return phone;
  return `+380 ${clean.slice(4, 6)} ${clean.slice(6, 9)} ${clean.slice(9, 11)} ${clean.slice(11)}`;
}
