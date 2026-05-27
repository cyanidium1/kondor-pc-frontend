/**
 * Convert Sanity Portable Text → our simplified ContentNode[] format.
 *
 * Frontend blocks (TextBlock, ImageTextSplit, FaqAccordion) consume
 * ContentNode[]. Sanity Studio stores Portable Text. This is the adapter
 * layer — blocks stay agnostic to the data source.
 *
 * Supported PT features:
 *   - block styles: normal, h2, h3, blockquote → ContentNode types
 *   - listItem: 'bullet' | 'number' → grouped into list nodes
 *   - decorators: 'strong', 'em' → inline marks
 *   - annotations: 'link' (href + newTab) → inline links
 *
 * NOT supported (silently dropped):
 *   - inline images (would need a different shape)
 *   - custom annotations (buildLink, etc.) — render as plain text
 */
import type {ContentNode, InlineNode} from "@/lib/data/types/content";

type PtSpan = {
  _type: "span";
  _key?: string;
  text: string;
  marks?: string[];
};

type PtBlock = {
  _type: "block";
  _key?: string;
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
  children?: PtSpan[];
  markDefs?: Array<{_key: string; _type: string; href?: string; newTab?: boolean}>;
};

type PtArray = Array<PtBlock | {_type: string; [k: string]: unknown}>;

function spansToInlines(
  spans: PtSpan[] | undefined,
  markDefs: PtBlock["markDefs"] = [],
): InlineNode[] {
  if (!spans) return [];
  const linkDefs = new Map(markDefs.filter((m) => m._type === "link").map((m) => [m._key, m]));
  return spans
    .filter((s) => s && s._type === "span")
    .map((s) => {
      const marks = s.marks ?? [];
      const linkKey = marks.find((m) => linkDefs.has(m));
      if (linkKey) {
        const def = linkDefs.get(linkKey)!;
        return {
          type: "link",
          text: s.text,
          href: def.href ?? "#",
          external: !!def.newTab,
        } as InlineNode;
      }
      return {
        type: "text",
        text: s.text,
        bold: marks.includes("strong") || undefined,
        italic: marks.includes("em") || undefined,
      } as InlineNode;
    });
}

export function portableTextToContent(pt: PtArray | undefined): ContentNode[] {
  if (!pt || !Array.isArray(pt) || pt.length === 0) return [];

  const out: ContentNode[] = [];
  let currentList: {ordered: boolean; items: InlineNode[][]} | null = null;

  const flushList = () => {
    if (currentList) {
      out.push({
        type: "list",
        ordered: currentList.ordered,
        items: currentList.items,
      });
      currentList = null;
    }
  };

  for (const node of pt) {
    if (node._type !== "block") continue;
    const block = node as PtBlock;

    // List items collect into a single list node
    if (block.listItem) {
      const ordered = block.listItem === "number";
      if (!currentList || currentList.ordered !== ordered) {
        flushList();
        currentList = {ordered, items: []};
      }
      currentList.items.push(spansToInlines(block.children, block.markDefs));
      continue;
    }

    // Anything else closes any open list
    flushList();

    const inlines = spansToInlines(block.children, block.markDefs);
    const text = inlines
      .map((n) => (n.type === "text" || n.type === "link" ? n.text : ""))
      .join("");

    switch (block.style) {
      case "h2":
        out.push({type: "h2", text});
        break;
      case "h3":
        out.push({type: "h3", text});
        break;
      case "blockquote":
        out.push({type: "quote", text});
        break;
      case "normal":
      default:
        out.push({type: "p", children: inlines});
        break;
    }
  }

  flushList();
  return out;
}

/**
 * Plain-text extractor for Portable Text — strips formatting.
 * Used for FAQ answer rendering in JSON-LD (Schema.org Question.answer.text)
 * and for the simple <details> body when the existing FaqAccordion expects
 * a string `answer`.
 */
export function portableTextToPlain(pt: PtArray | undefined): string {
  if (!pt || !Array.isArray(pt)) return "";
  return pt
    .filter((n) => n._type === "block")
    .map((n) => {
      const b = n as PtBlock;
      return (b.children ?? [])
        .filter((s) => s._type === "span")
        .map((s) => s.text)
        .join("");
    })
    .join("\n\n")
    .trim();
}
