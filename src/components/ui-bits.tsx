import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="relative border-b border-border/60 px-6 py-6 md:px-8">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_var(--cyber-cyan)]" />
              {eyebrow}
            </div>
          )}
          <h1 className="text-[26px] font-semibold tracking-tight md:text-[30px]">{title}</h1>
          {subtitle && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export function Panel({
  title,
  subtitle,
  actions,
  children,
  className = "",
  accent,
}: {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  accent?: "cyan" | "red" | "amber" | "green" | "violet";
}) {
  const accentColor = {
    cyan: "from-cyan-400/50",
    red: "from-red-500/50",
    amber: "from-amber-400/50",
    green: "from-emerald-400/50",
    violet: "from-violet-400/50",
  }[accent ?? "cyan"];
  return (
    <section className={`glass relative overflow-hidden rounded-lg ${className}`}>
      {accent && (
        <div
          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r via-transparent to-transparent ${accentColor}`}
        />
      )}
      {(title || actions) && (
        <header className="flex items-start justify-between gap-3 border-b border-border/50 px-4 py-3">
          <div>
            {title && (
              <h3 className="text-[13px] font-semibold uppercase tracking-wider">{title}</h3>
            )}
            {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 text-xs">{actions}</div>}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function KPI({
  label,
  value,
  delta,
  tone = "cyan",
  suffix,
  hint,
}: {
  label: string;
  value: string | number;
  delta?: number;
  tone?: "cyan" | "red" | "green" | "amber" | "violet";
  suffix?: string;
  hint?: string;
}) {
  const toneClass = {
    cyan: "text-cyan-300",
    red: "text-red-400",
    green: "text-emerald-400",
    amber: "text-amber-300",
    violet: "text-violet-300",
  }[tone];
  const barClass = {
    cyan: "from-cyan-400/60 to-transparent",
    red: "from-red-500/60 to-transparent",
    green: "from-emerald-400/60 to-transparent",
    amber: "from-amber-400/60 to-transparent",
    violet: "from-violet-400/60 to-transparent",
  }[tone];
  return (
    <div className="glass relative overflow-hidden rounded-lg p-4">
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${barClass}`} />
      <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
        <span>{label}</span>
        {delta !== undefined && (
          <span
            className={`inline-flex items-center gap-0.5 ${delta >= 0 ? "text-emerald-400" : "text-red-400"}`}
          >
            {delta >= 0 ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className={`text-[26px] font-semibold tracking-tight ${toneClass}`}>{value}</span>
        {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
      </div>
      {hint && <div className="mt-1 text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function SeverityBadge({
  level,
}: {
  level: "critical" | "high" | "medium" | "low" | "info";
}) {
  const map = {
    critical: "border-red-500/50 bg-red-500/10 text-red-300",
    high: "border-amber-500/50 bg-amber-500/10 text-amber-300",
    medium: "border-yellow-500/40 bg-yellow-500/10 text-yellow-200",
    low: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    info: "border-slate-500/40 bg-slate-500/10 text-slate-300",
  }[level];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${map}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${level === "critical" ? "bg-red-400 blink" : level === "high" ? "bg-amber-400" : level === "medium" ? "bg-yellow-300" : level === "low" ? "bg-cyan-300" : "bg-slate-300"}`}
      />
      {level}
    </span>
  );
}

export function StatusPill({
  label,
  tone = "green",
}: {
  label: string;
  tone?: "green" | "amber" | "red" | "cyan" | "slate";
}) {
  const map = {
    green: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    red: "border-red-500/50 bg-red-500/10 text-red-300",
    cyan: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    slate: "border-slate-500/40 bg-slate-500/10 text-slate-300",
  }[tone];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider ${map}`}
    >
      {label}
    </span>
  );
}

export function Ring({
  value,
  label,
  tone = "cyan",
}: {
  value: number;
  label: string;
  tone?: "cyan" | "green" | "amber" | "red";
}) {
  const color = {
    cyan: "var(--cyber-cyan)",
    green: "var(--cyber-green)",
    amber: "var(--cyber-amber)",
    red: "var(--cyber-red)",
  }[tone];
  const size = 132,
    stroke = 10,
    r = (size - stroke) / 2,
    c = 2 * Math.PI * r;
  return (
    <div className="relative grid place-items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          stroke="oklch(0.30 0.03 250)"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * value) / 100}
          fill="none"
          style={{
            filter: `drop-shadow(0 0 8px ${color})`,
            transition: "stroke-dashoffset 1s ease",
          }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center leading-tight">
          <div className="text-[26px] font-semibold" style={{ color }}>
            {value}%
          </div>
          <div className="mt-0.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Bar({
  value,
  tone = "cyan",
  label,
}: {
  value: number;
  tone?: "cyan" | "green" | "amber" | "red" | "violet";
  label?: string;
}) {
  const color = {
    cyan: "var(--cyber-cyan)",
    green: "var(--cyber-green)",
    amber: "var(--cyber-amber)",
    red: "var(--cyber-red)",
    violet: "var(--cyber-violet)",
  }[tone];
  return (
    <div>
      {label && (
        <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{label}</span>
          <span className="font-mono">{value}%</span>
        </div>
      )}
      <div className="h-1.5 overflow-hidden rounded-full bg-muted/50">
        <div
          className="h-full rounded-full"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}, transparent 140%)`,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
    </div>
  );
}

export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="space-y-5 p-5 md:p-6">{children}</div>;
}
