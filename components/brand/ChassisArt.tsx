import { cn } from "@/lib/utils";

/**
 * Stylised PC tower art — used until the client delivers real chassis PNGs.
 * Pulls accent color from the surrounding CSS `--sku` scope.
 */
export function ChassisArt({
  className,
  label,
  compact = false,
}: {
  className?: string;
  label?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-md border border-border bg-background/60",
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(from var(--sku) l c h / 0.35), transparent 70%)",
        }}
      />
      <svg
        viewBox="0 0 300 400"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "relative drop-shadow-[0_18px_40px_rgba(0,0,0,0.5)]",
          compact ? "h-[60%]" : "h-[75%]",
        )}
      >
        <defs>
          <linearGradient id="case-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.22 0.008 265)" />
            <stop offset="100%" stopColor="oklch(0.12 0.012 265)" />
          </linearGradient>
          <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.15 0 0)" stopOpacity="0.4" />
            <stop offset="60%" stopColor="oklch(0.08 0 0)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="oklch(0.06 0 0)" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="fan-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--sku)" stopOpacity="0.95" />
            <stop offset="60%" stopColor="var(--sku)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--sku)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base shadow */}
        <ellipse cx="150" cy="390" rx="110" ry="6" fill="black" opacity="0.4" />

        {/* Case body */}
        <rect
          x="38"
          y="24"
          width="224"
          height="356"
          rx="10"
          fill="url(#case-body)"
          stroke="oklch(1 0 0 / 0.06)"
          strokeWidth="1.5"
        />

        {/* Top bezel */}
        <rect x="38" y="24" width="224" height="14" rx="10" fill="oklch(0.09 0 0)" />
        {/* Bottom bezel */}
        <rect x="38" y="366" width="224" height="14" rx="10" fill="oklch(0.09 0 0)" />

        {/* Main glass panel */}
        <rect x="52" y="46" width="150" height="312" rx="4" fill="url(#glass)" />
        <rect x="52" y="46" width="150" height="312" rx="4" fill="none" stroke="oklch(1 0 0 / 0.1)" />

        {/* Interior ambient accent glow */}
        <rect
          x="58"
          y="52"
          width="138"
          height="300"
          rx="2"
          fill="var(--sku)"
          opacity="0.08"
        />

        {/* GPU block */}
        <rect x="64" y="160" width="128" height="26" rx="3" fill="oklch(0.10 0 0)" stroke="oklch(1 0 0 / 0.08)" />
        <rect x="66" y="162" width="6" height="22" rx="1" fill="var(--sku)" opacity="0.9" />
        <rect x="76" y="162" width="6" height="22" rx="1" fill="oklch(0.25 0 0)" />
        <text x="100" y="178" fill="oklch(0.55 0 0)" fontSize="8" fontFamily="monospace" letterSpacing="0.05em">GPU</text>

        {/* Two RGB fans */}
        {[95, 155].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy={260} r={30} fill="url(#fan-glow)" />
            <circle cx={cx} cy={260} r={26} fill="oklch(0.08 0 0)" />
            <circle cx={cx} cy={260} r={26} fill="none" stroke="var(--sku)" strokeWidth="2.5" opacity="0.9" />
            <circle cx={cx} cy={260} r={4} fill="oklch(0.2 0 0)" stroke="var(--sku)" strokeOpacity="0.6" />
            {[0, 72, 144, 216, 288].map((deg) => (
              <path
                key={deg}
                d={`M ${cx} ${260} L ${cx + Math.cos((deg * Math.PI) / 180) * 22} ${
                  260 + Math.sin((deg * Math.PI) / 180) * 22
                }`}
                stroke="oklch(0.25 0 0)"
                strokeWidth="1"
              />
            ))}
          </g>
        ))}

        {/* CPU cooler hint at top */}
        <rect x="76" y="78" width="104" height="48" rx="4" fill="oklch(0.11 0 0)" stroke="oklch(1 0 0 / 0.06)" />
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1={80 + i * 17}
            y1={82}
            x2={80 + i * 17}
            y2={122}
            stroke="oklch(0.2 0 0)"
            strokeWidth="1"
          />
        ))}

        {/* Right panel (mesh/io) */}
        <rect x="206" y="42" width="52" height="316" rx="3" fill="oklch(0.11 0 0)" />
        <circle cx="232" cy="52" r="2" fill="var(--sku)" opacity="0.85" />
        <circle cx="232" cy="60" r="1.5" fill="oklch(0.5 0 0)" />
        {/* I/O hints */}
        {Array.from({ length: 12 }).map((_, i) => (
          <rect
            key={i}
            x="214"
            y={100 + i * 14}
            width="36"
            height="1.5"
            fill="oklch(0.22 0 0)"
          />
        ))}

        {/* Top RGB strip */}
        <rect x="52" y="46" width="150" height="3" fill="var(--sku)" opacity="0.55" />
      </svg>

      {label && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50">
          {label}
        </div>
      )}
    </div>
  );
}
