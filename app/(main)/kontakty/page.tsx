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
import ArrowIcon from "@/components/icons/ArrowIcon";
import MarqueeLine from "@/components/shared/MarqueeLine";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Шоурум у Києві, Telegram, email, телефон. Щодня з 9:00 до 21:00. Ігрові ПК з гарантією до 3 років.",
};

export default function ContactsPage() {
  return (
    <>
      <section className="rounded-b-[40px] overflow-hidden">
        <div className="relative container-site pt-[50px] pb-[67px] lg:pt-[86px] lg:pb-[62px]">
          <div className="absolute -z-30 top-[170px] lg:top-[50px] right-[-64px] lg:right-[-190px] w-[322px] lg:w-[640px] h-[322px] lg:h-[640px]">
            <Image
              src="/images/garantiya/pc.webp"
              alt="PC"
              width="469"
              height="469"
              className="object-cover w-[322px] lg:w-[640px] h-auto"
            />
          </div>
          <div className="hidden lg:block absolute -z-20 bottom-[-182px] right-[-256px] w-[632px] h-[632px]">
            <Image
              src="/images/garantiya/right-mask.webp"
              alt="Steps right shadow desk"
              width="632"
              height="632"
              className="object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -z-10 bottom-[-276px] right-[-675px] w-[735px] h-[735px]">
            <Image
              src="/images/garantiya/steps-right-shadow-desk.svg"
              alt="Steps right shadow desk"
              width="735"
              height="735"
              className="object-cover"
            />
          </div>
          <div className="absolute -z-40 bottom-[-278px] left-[-541px] lg:bottom-[-598px] lg:left-[-771px] w-[1131px] h-[954px]">
            <Image
              src="/images/garantiya/steps-shadows.svg"
              alt="Steps shadows"
              width="1131"
              height="954"
              className="object-cover"
            />
          </div>
          <SectionHeader
            kicker="Контакти"
            title="Контакти Kondor PC"
            subtitle="Щодня з 9:00 до 21:00 — відповідаємо у Telegram та по телефону."
            titleAs="h1"
            className="mb-[67px] lg:text-[62px]"
            titleClassName="mt-3 mb-5 lg:mt-7 lg:mb-10 max-w-[328px] lg:max-w-none"
            subtitleClassName="lg:max-w-[406px] max-w-[328px] lg:max-w-none"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              {/* Primary contacts */}
              <div className="space-y-4 h-auto">
                <div className="rounded-lg border border-border bg-surface pt-6 px-6 pb-[41px] h-auto">
                  <div className="mb-4 text-[11px] uppercase tracking-wider text-muted-foreground">
                    Контакти
                  </div>
                  <ul className="space-y-4">
                    <ContactRow
                      icon={Phone}
                      label="Телефон"
                      value="+380 63 363 10 66"
                      href="tel:+380633631066"
                      note="щодня 9:00–21:00"
                    />
                    <ContactRow
                      icon={MessageSquare}
                      label="Telegram · Продаж"
                      value="@kondor_pc_admin"
                      href="https://t.me/kondor_pc_admin"
                      external
                    />

                    <ContactRow
                      icon={Mail}
                      label="Email · Продаж"
                      value="sales@kondor-pc.ua"
                      href="mailto:sales@kondor-pc.ua"
                    />
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-surface p-6 md:py-8.25 lg:py-6.25">
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
            {/* Contact form */}
            <div className="">
              <form className="space-y-3.5 rounded-lg border border-border bg-surface p-6">
                <div className="grid gap-1">
                  <Label className="text-[14px]">Ім&apos;я</Label>
                  <Input placeholder="Іван Петренко" className="text-[14px]" />
                </div>
                <div className="grid gap-1">
                  <Label className="text-[14px]">Телефон</Label>
                  <Input
                    placeholder="+380 95 000 00 00"
                    className="text-[14px]"
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="text-[14px]">Повідомлення</Label>
                  <textarea
                    rows={4}
                    placeholder="Опиши свій запит..."
                    className="w-full h-[98px] rounded-md border border-border bg-background px-3 py-2 text-[14px] focus-visible:border-ring focus-visible:outline-none"
                  />
                </div>
                <Button
                  type="button"
                  size="lg"
                  variant="default"
                  className="h-12 w-full px-6 rounded-none normal-case font-body text-[14px] leading-[120%] font-medium tracking-normal"
                >
                  Надіслати
                </Button>
                <p className="text-center text-[14px] leading-[120%] font-light text-muted-foreground">
                  Залиш повідомлення — відповімо протягом робочої години.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <MarqueeLine />

      {/* Legal */}

      <section className="container-site py-[92px] lg:pt-30 lg:pb-7">
        <SectionHeader kicker="Юридична інформація" title="Реквізити" />
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
                <span className="tabular">
                  UA XX XXXXXX XXXXXXXXXXXXXXXXXXXXX
                </span>
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
        {note && <div className="text-xs text-muted-foreground">{note}</div>}
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
      data-size="sm"
      data-variant="white"
      className="tech-btn font-heading uppercase text-center h-10 w-full px-3 text-[14px] md:text-[9px] lg:text-[14px] leading-[120%] font-normal tracking-normal"
    >
      <span aria-hidden className="tech-btn__edge" />
      <span aria-hidden className="tech-btn__fill" />
      <span className="relative inline-flex items-center">
        <span>{label}</span>
        <ArrowIcon className="size-5 -rotate-45" />
      </span>
    </a>
  );
}
