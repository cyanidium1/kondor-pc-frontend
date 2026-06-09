import type { CartItem } from "@/lib/cartStore";
import type { BuildSpecShort } from "@/types/build";

/** Групи опцій, які вже відображаються в `spec` (mock: ssd, Sanity: storage). */
const SPEC_COVERED_OPTION_GROUPS = new Set(["ram", "ssd", "storage"]);

function formatGpuLine(spec: BuildSpecShort): string {
  if (!spec.gpuVram || spec.gpu.toLowerCase().includes(spec.gpuVram.toLowerCase())) {
    return spec.gpu;
  }
  return `${spec.gpu} ${spec.gpuVram}`;
}

/** Рядки специфікації товару для замовлень (Telegram, KeyCRM, MonoPay). */
export function getCartItemSpecificationLines(item: CartItem): string[] {
  const lines: string[] = [];

  if (item.itemType === "build" && item.spec) {
    lines.push(`CPU: ${item.spec.cpu}`);
    lines.push(`GPU: ${formatGpuLine(item.spec)}`);
    const ramSpeed = item.spec.ramSpeed ? ` ${item.spec.ramSpeed} MHz` : "";
    lines.push(`RAM: ${item.spec.ram}${ramSpeed}`);
    lines.push(`Накопичувач: ${item.spec.storage}`);
  }

  if (item.colorName) {
    lines.push(`Колір: ${item.colorName}`);
  }

  item.options?.forEach((option) => {
    if (item.spec && SPEC_COVERED_OPTION_GROUPS.has(option.groupId)) {
      return;
    }
    lines.push(`${option.groupLabel}: ${option.optionLabel}`);
  });

  return lines;
}

/** Назва товару з повною специфікацією для CRM / MonoPay. */
export function formatCartItemOrderTitle(item: CartItem): string {
  const specs = getCartItemSpecificationLines(item);
  if (specs.length === 0) return item.name;
  return `${item.name} (${specs.join("; ")})`;
}
