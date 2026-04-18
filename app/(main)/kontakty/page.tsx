import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Building2,
  AtSign,
  Send,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Шоурум у Києві, Telegram, email, телефон. Щодня з 9:00 до 21:00. Ігрові ПК з гарантією до 3 років.",
};

export default function ContactsPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-site py-16 md:py-24 text-center">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Контакти
          </div>
          <h1 className="font-display text-4xl font-bold md:text-5xl">
            Контакти Kondor PC
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Щодня з 9:00 до 21:00 — відповідаємо у Telegram, по телефону або в
            шоурумі.
          </p>
        </div>
      </section>

      <section className="container-site py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Primary contacts */}
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="mb-4 text-[11px] uppercase tracking-wider text-muted-foreground">
                Контакти
              </div>
              <ul className="space-y-4">
                <ContactRow
                  icon={Phone}
                  label="Телефон"
                  value="+380 XX XXX XX XX"
                  href="tel:+380000000000"
                  note="щодня 9:00–21:00"
                />
                <ContactRow
                  icon={MessageSquare}
                  label="Telegram · Продаж"
                  value="@kondor_pc"
                  href="https://t.me/kondor_pc"
                  external
                />
                <ContactRow
                  icon={MessageSquare}
                  label="Telegram · Підтримка"
                  value="@kondor_support"
                  href="https://t.me/kondor_support"
                  external
                />
                <ContactRow
                  icon={Mail}
                  label="Email · Продаж"
                  value="sales@kondor-pc.ua"
                  href="mailto:sales@kondor-pc.ua"
                />
                <ContactRow
                  icon={Mail}
                  label="Email · Гарантія"
                  value="support@kondor-pc.ua"
                  href="mailto:support@kondor-pc.ua"
                />
                <ContactRow
                  icon={Mail}
                  label="Email · ФОП / ЮО"
                  value="legal@kondor-pc.ua"
                  href="mailto:legal@kondor-pc.ua"
                />
              </ul>
            </div>
          </div>

          {/* Showroom */}
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
                <MapPin className="size-3.5" /> Шоурум у Києві
              </div>
              <div className="font-display text-base font-semibold">
                [Адреса — буде заповнено]
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="size-4" strokeWidth={1.5} />
                Щодня 10:00–20:00
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Паркінг безкоштовний · Метро [станція, 5 хв]
              </div>
              <div
                aria-hidden
                className="mt-5 flex aspect-video items-center justify-center overflow-hidden rounded-md border border-border bg-background/60 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/40"
              >
                Google Maps · буде вставлено
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Перед візитом бажано зателефонувати або написати в Telegram —
                підготуємо для тебе демо потрібної збірки.
              </p>
            </div>

            <div className="rounded-lg border border-border bg-surface p-6">
              <div className="mb-4 text-[11px] uppercase tracking-wider text-muted-foreground">
                Соцмережі
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                <ExternalLink
                  icon={MessageSquare}
                  label="Telegram"
                  href="https://t.me/kondor_pc"
                />
                <ExternalLink
                  icon={AtSign}
                  label="Instagram"
                  href="https://instagram.com/kondor_pc"
                />
                <ExternalLink
                  icon={Send}
                  label="YouTube"
                  href="https://youtube.com/@kondor-pc"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="border-y border-border bg-surface/30">
        <div className="container-narrow py-16 md:py-20">
          <SectionHeader
            align="center"
            kicker="Зв'язатися"
            title="Напиши нам"
            subtitle="Залиш повідомлення — відповімо протягом робочої години."
          />
          <form className="space-y-4 rounded-lg border border-border bg-surface p-6">
            <div className="grid gap-1.5">
              <Label>Ім&apos;я</Label>
              <Input placeholder="Іван Петренко" />
            </div>
            <div className="grid gap-1.5">
              <Label>Телефон</Label>
              <Input placeholder="+380 95 000 00 00" />
            </div>
            <div className="grid gap-1.5">
              <Label>Повідомлення</Label>
              <textarea
                rows={4}
                placeholder="Опиши свій запит..."
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:border-ring focus-visible:outline-none"
              />
            </div>
            <Button type="button" size="lg" className="h-12 w-full px-6">
              Надіслати
            </Button>
            <p className="text-center text-[11px] uppercase tracking-wider text-muted-foreground">
              Форма у превью · реальна відправка підключається разом з
              email/Telegram інтеграціями
            </p>
          </form>
        </div>
      </section>

      {/* Legal */}
      <section className="container-site py-16 md:py-20">
        <SectionHeader
          kicker="Юридична інформація"
          title="Реквізити"
        />
        <div className="rounded-lg border border-border bg-surface p-6">
          <div className="flex items-start gap-3">
            <Building2
              className="mt-1 size-5 shrink-0 text-muted-foreground"
              strokeWidth={1.5}
            />
            <div className="grid gap-1 text-sm">
              <div>
                <span className="text-muted-foreground">Продавець: </span>
                <span className="font-medium">ФОП [ПІБ] / ТОВ [Назва]</span>
              </div>
              <div>
                <span className="text-muted-foreground">ЄДРПОУ/РНОКПП: </span>
                <span className="tabular font-medium">XXXXXXXX</span>
              </div>
              <div>
                <span className="text-muted-foreground">Юридична адреса: </span>
                <span>[Адреса]</span>
              </div>
              <div>
                <span className="text-muted-foreground">IBAN: </span>
                <span className="tabular">UA XX XXXXXX XXXXXXXXXXXXXXXXXXXXX</span>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4 text-sm">
            <Link
              href="/legal/publichna-oferta"
              className="text-muted-foreground underline underline-offset-4 transition hover:text-foreground"
            >
              Публічна оферта
            </Link>
            <Link
              href="/legal/politika-konfidentsiynosti"
              className="text-muted-foreground underline underline-offset-4 transition hover:text-foreground"
            >
              Політика конфіденційності
            </Link>
            <Link
              href="/legal/pravova-informatsiya"
              className="text-muted-foreground underline underline-offset-4 transition hover:text-foreground"
            >
              Правова інформація
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
  external,
  note,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  note?: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
        <Icon className="size-4.5" strokeWidth={1.5} />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="font-medium transition hover:opacity-80"
        >
          {value}
          {external && " ↗"}
        </a>
        {note && (
          <div className="text-xs text-muted-foreground">{note}</div>
        )}
      </div>
    </li>
  );
}

function ExternalLink({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-md border border-border bg-background/40 px-3 py-2 text-sm transition hover:border-white/20"
    >
      <Icon className="size-4" strokeWidth={1.5} />
      {label} ↗
    </a>
  );
}
