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
      className={`divide-y divide-border overflow-hidden rounded-lg border border-border gap-2 ${className ?? ""}`}
    >
      {items.map((f) => (
        <AccordionItem key={f.key} value={f.key} className="border-0">
          <AccordionTrigger className="text-left hover:no-underline [&_svg]:text-muted-foreground bg-white text-black p-5">
            <span className="text-[12px] font-medium leading-[120%]">
              {f.question}
            </span>
          </AccordionTrigger>
          <AccordionContent className="p-5 mt-0.5 text-[12px] leading-[120%] text-black bg-white rounded-[8px]">
            {f.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
