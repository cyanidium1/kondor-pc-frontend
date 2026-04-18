import {
  Cpu,
  Gpu,
  MemoryStick,
  HardDrive,
  CircuitBoard,
  Fan,
  Plug,
  Package,
  MonitorPlay,
  Shield,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Build, ComponentCategory } from "@/types/build";

const ICON: Record<ComponentCategory, LucideIcon> = {
  cpu: Cpu,
  gpu: Gpu,
  ram: MemoryStick,
  ssd: HardDrive,
  hdd: HardDrive,
  motherboard: CircuitBoard,
  cooling: Fan,
  psu: Plug,
  case: Package,
  os: MonitorPlay,
};

const CATEGORY_LABEL: Record<ComponentCategory, string> = {
  cpu: "Процесор",
  gpu: "Відеокарта",
  ram: "Оперативна пам'ять",
  ssd: "Накопичувач SSD",
  hdd: "Жорсткий диск HDD",
  motherboard: "Материнська плата",
  cooling: "Охолодження",
  psu: "Блок живлення",
  case: "Корпус",
  os: "Операційна система",
};

function warrantyLabel(months: number): string {
  if (months >= 9999) return "Необмежено";
  if (months >= 12) return `${Math.floor(months / 12)} р.`;
  return `${months} міс.`;
}

export function ComponentList({ build }: { build: Build }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
      {build.components.map((c, i) => {
        const Icon = ICON[c.category];
        return (
          <div
            key={`${c.category}-${i}`}
            className="grid gap-3 p-5 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-6"
          >
            <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-1.5">
              <div className="flex size-10 items-center justify-center rounded-md bg-background ring-1 ring-inset ring-white/5">
                <Icon className="size-5 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground md:whitespace-nowrap">
                {CATEGORY_LABEL[c.category]}
              </div>
            </div>
            <div className="min-w-0">
              <div className="font-display text-lg font-semibold leading-tight">
                {c.displayName}
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {c.humanDescription}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 self-start rounded-md border border-border bg-background/50 px-2.5 py-1 text-xs text-muted-foreground">
              <Shield className="size-3.5" strokeWidth={2} />
              <span className="font-medium text-foreground">
                {warrantyLabel(c.warrantyMonths)}
              </span>
              <span>гарантії</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
