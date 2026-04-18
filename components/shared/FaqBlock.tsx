import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/types/build";

export function FaqBlock({
  items,
  className,
}: {
  items: Faq[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <Accordion
      className={`divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface ${className ?? ""}`}
    >
      {items.map((f) => (
        <AccordionItem key={f.key} value={f.key} className="border-0 px-5">
          <AccordionTrigger className="text-left hover:no-underline [&_svg]:text-muted-foreground">
            <span className="text-base font-medium">{f.question}</span>
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
            {f.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
