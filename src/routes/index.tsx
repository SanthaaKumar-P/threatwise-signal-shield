import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PageHeader,
  PageContainer,
  Panel,
  KPI,
  Ring,
  Bar,
  SeverityBadge,
  StatusPill,
} from "@/components/ui-bits";
import { incidents, threatFeed, geoPoints, killChain, timeline } from "@/lib/mock";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import {
  Activity,
  Shield,
  Radar,
  Cpu,
  Server,
  AlertTriangle,
  ArrowRight,
  Zap,
  Satellite,
  Waypoints,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mission Command Centre — ThreatZero Sentinel X" },
      {
        name: "description",
        content:
          "Realtime cyber defence readiness, threat map, incidents, and MITRE kill chain telemetry.",
      },
      { property: "og:title", content: "Mission Command Centre — ThreatZero Sentinel X" },
      {
        property: "og:description",
        content:
          "Realtime cyber defence readiness, threat map, incidents, and MITRE kill chain telemetry.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MissionCommand,
});

function MissionCommand() {
  return (
    <>
      <PageHeader
        eyebrow="Mission Command · Node SOC-Primary"
        title="Global Defence Posture"
        subtitle="Autonomous agents monitoring 48,214 endpoints across 6 regions · Last sync 4s ago"
        actions={
          <>
            <StatusPill label="Autonomous · Armed" tone="green" />
            <StatusPill label="Realtime · 12ms" tone="cyan" />
            <button className="rounded-md border border-cyan-400/50 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-200 hover:bg-cyan-400/20">
              Launch War Room
            </button>
          </>
        }
      />
      <PageContainer>
        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
          <KPI
            label="Defence Readiness"
            value="94"
            suffix="/100"
            delta={2}
            tone="cyan"
            hint="Above threshold"
          />
          <KPI
            label="Cyber Risk Index"
            value="38"
            suffix="/100"
            delta={-6}
            tone="green"
            hint="Trending down"
          />
          <KPI label="Threat Level" value="ELEV." tone="amber" hint="DEFCON 3" />
          <KPI label="Critical Assets" value="1,284" delta={0} tone="cyan" hint="All monitored" />
          <KPI label="Endpoints" value="48,214" delta={1} tone="cyan" hint="99.8% agent health" />
          <KPI
            label="MITRE Coverage"
            value="87"
            suffix="%"
            delta={4}
            tone="violet"
            hint="212 / 244 techniques"
          />
          <KPI
            label="NIST Readiness"
            value="4.0"
            suffix="/5"
            delta={5}
            tone="green"
            hint="Maturity ↑"
          />
          <KPI
            label="Active Incidents"
            value="7"
            delta={-12}
            tone="red"
            hint="2 critical · auto-contained"
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-12">
          {/* Threat map */}
          <Panel
            className="xl:col-span-8"
            title="Global Threat Map"
            subtitle="Live adversary origins · last 15 minutes"
            accent="cyan"
            actions={<StatusPill label="LIVE" tone="cyan" />}
          >
            <div className="relative overflow-hidden rounded-md border border-border/60 bg-[oklch(0.10_0.02_250)] scan-line">
              <svg viewBox="0 0 500 300" className="h-[320px] w-full">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="oklch(0.55 0.08 220 / 0.15)"
                      strokeWidth="0.4"
                    />
                  </pattern>
                  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="oklch(0.60 0.15 220 / 0.35)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
                <rect width="500" height="300" fill="url(#grid)" />
                <ellipse cx="250" cy="150" rx="240" ry="140" fill="url(#glow)" />
                {/* stylised continents */}
                <g
                  fill="oklch(0.30 0.05 220 / 0.55)"
                  stroke="oklch(0.60 0.10 220 / 0.5)"
                  strokeWidth="0.6"
                >
                  <path d="M40,120 q20,-30 60,-30 q40,0 55,20 q20,20 -10,50 q-30,30 -60,10 q-30,-20 -45,-50z" />
                  <path d="M110,170 q30,-10 60,20 q20,30 -10,60 q-40,30 -60,-10 q-20,-40 10,-70z" />
                  <path d="M155,120 q40,-30 90,-20 q60,15 55,50 q-10,45 -80,30 q-70,-20 -65,-60z" />
                  <path d="M260,150 q50,-40 120,-20 q60,20 40,60 q-30,50 -110,30 q-70,-20 -50,-70z" />
                  <path d="M380,140 q40,-20 80,10 q30,30 -10,60 q-40,30 -70,0 q-30,-30 0,-70z" />
                  <path d="M410,230 q30,-10 45,10 q10,20 -20,30 q-30,10 -35,-15 q-5,-20 10,-25z" />
                </g>
                {/* arcs */}
                {geoPoints.slice(0, 6).map((p, i) => (
                  <path
                    key={i}
                    d={`M ${p.x} ${p.y} Q 250 40 ${170 + i * 8} 200`}
                    stroke="oklch(0.86 0.17 200 / 0.5)"
                    strokeWidth="0.8"
                    fill="none"
                    strokeDasharray="4 3"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;-40"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </path>
                ))}
                {/* dots */}
                {geoPoints.map((p, i) => {
                  const color =
                    p.sev === "critical"
                      ? "oklch(0.68 0.24 22)"
                      : p.sev === "high"
                        ? "oklch(0.82 0.17 75)"
                        : p.sev === "medium"
                          ? "oklch(0.86 0.17 200)"
                          : "oklch(0.78 0.19 155)";
                  return (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="9" fill={color} opacity="0.15">
                        <animate
                          attributeName="r"
                          values="4;14;4"
                          dur="2.4s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.4;0;0.4"
                          dur="2.4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="2.5"
                        fill={color}
                        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                      />
                      <text
                        x={p.x + 6}
                        y={p.y - 4}
                        fontSize="7"
                        fill="oklch(0.90 0.02 220)"
                        fontFamily="monospace"
                      >
                        {p.label}
                      </text>
                    </g>
                  );
                })}
                {/* HQ marker */}
                <g>
                  <circle
                    cx="380"
                    cy="215"
                    r="4"
                    fill="oklch(0.86 0.17 200)"
                    style={{ filter: "drop-shadow(0 0 10px var(--cyber-cyan))" }}
                  />
                  <text
                    x="386"
                    y="230"
                    fontSize="7"
                    fill="var(--cyber-cyan)"
                    fontFamily="monospace"
                  >
                    SOC-PRIMARY
                  </text>
                </g>
              </svg>
              <div className="absolute left-3 top-3 flex gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-cyber-red" /> CRIT
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-cyber-amber" /> HIGH
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-cyber-cyan" /> MED
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-cyber-green" /> LOW
                </span>
              </div>
              <div className="absolute right-3 top-3 rounded border border-border/60 bg-background/70 px-2 py-1 text-[10px] font-mono">
                THREATS · 2,481 / hr
              </div>
            </div>
          </Panel>

          {/* Readiness rings */}
          <Panel
            className="xl:col-span-4"
            title="Readiness Matrix"
            subtitle="Operational posture · past 24h"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2">
                <Ring value={94} label="Defence" tone="cyan" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Ring value={87} label="MITRE Cov" tone="green" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Ring value={80} label="NIST" tone="amber" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Ring value={62} label="Risk Index" tone="red" />
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <Bar label="Identity Protection" value={91} tone="cyan" />
              <Bar label="Endpoint Hardening" value={84} tone="green" />
              <Bar label="Network Segmentation" value={76} tone="amber" />
              <Bar label="Data Protection" value={69} tone="violet" />
            </div>
          </Panel>

          {/* Threat timeline */}
          <Panel
            className="xl:col-span-8"
            title="Threat Timeline · 24h"
            subtitle="Detections / Blocked / Critical"
            accent="violet"
            actions={
              <div className="flex gap-3 text-[10px] font-mono text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-cyan-400" /> DETECT
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-emerald-400" /> BLOCK
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-sm bg-red-400" /> CRIT
                </span>
              </div>
            }
          >
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeline}>
                  <defs>
                    <linearGradient id="gc" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyber-cyan)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--cyber-cyan)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gb" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyber-green)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--cyber-green)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gr" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyber-red)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--cyber-red)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="h" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="detections"
                    stroke="var(--cyber-cyan)"
                    fill="url(#gc)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="blocked"
                    stroke="var(--cyber-green)"
                    fill="url(#gb)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="critical"
                    stroke="var(--cyber-red)"
                    fill="url(#gr)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          {/* Kill chain */}
          <Panel
            className="xl:col-span-4"
            title="Cyber Kill Chain"
            subtitle="Progression interception"
            accent="red"
          >
            <ul className="space-y-2.5">
              {killChain.map((s, i) => (
                <li key={s.stage} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded border border-border font-mono text-[10px] text-muted-foreground">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="mb-0.5 flex items-center justify-between text-[11px]">
                      <span className="font-medium">{s.stage}</span>
                      <span className="font-mono text-muted-foreground">{s.value}% blocked</span>
                    </div>
                    <Bar value={s.value} tone={s.tone} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded border border-red-500/30 bg-red-500/5 p-3 text-[11px]">
              <div className="flex items-center gap-1.5 font-mono text-red-300">
                <AlertTriangle className="h-3 w-3" /> INTERCEPT · Stage 6 (C2)
              </div>
              <div className="mt-1 text-muted-foreground">
                Beacon to 46.161.27.94 blocked by AI response agent at 14:02:11 UTC.
              </div>
            </div>
          </Panel>

          {/* Incidents */}
          <Panel
            className="xl:col-span-8"
            title="Active Incidents"
            subtitle="Auto-correlated by XDR engine"
            actions={
              <Link
                to="/incidents"
                className="inline-flex items-center gap-1 text-cyan-300 hover:underline"
              >
                Open queue <ArrowRight className="h-3 w-3" />
              </Link>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    <th className="py-2 pr-3">ID</th>
                    <th className="pr-3">Sev</th>
                    <th className="pr-3">Incident</th>
                    <th className="pr-3">Asset</th>
                    <th className="pr-3">MITRE</th>
                    <th className="pr-3">Owner</th>
                    <th className="pr-3">Status</th>
                    <th className="pr-3">Score</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  {incidents.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-border/30 last:border-0 hover:bg-muted/20"
                    >
                      <td className="py-2.5 pr-3 font-mono text-[11px] text-cyan-300">{r.id}</td>
                      <td className="pr-3">
                        <SeverityBadge level={r.sev} />
                      </td>
                      <td className="pr-3">{r.title}</td>
                      <td className="pr-3 font-mono text-[11px] text-muted-foreground">
                        {r.asset}
                      </td>
                      <td className="pr-3">
                        <div className="flex flex-wrap gap-1">
                          {r.mitre.map((m) => (
                            <span
                              key={m}
                              className="rounded bg-violet-500/10 px-1.5 py-0.5 font-mono text-[10px] text-violet-300 border border-violet-500/30"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="pr-3 text-muted-foreground">{r.owner}</td>
                      <td className="pr-3">
                        <StatusPill
                          label={r.status}
                          tone={
                            r.status === "Contained" ||
                            r.status === "Blocked" ||
                            r.status === "Isolated"
                              ? "green"
                              : r.status === "Investigating" || r.status === "Analysing"
                                ? "amber"
                                : "cyan"
                          }
                        />
                      </td>
                      <td className="pr-3 font-mono">{r.score}</td>
                      <td className="font-mono text-[11px] text-muted-foreground">{r.ago}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          {/* Live feed */}
          <Panel
            className="xl:col-span-4"
            title="Live Threat Feed"
            subtitle="Signal · IP · Signature · Severity"
            actions={
              <span className="flex items-center gap-1 text-[10px] font-mono text-cyber-green">
                <span className="h-1.5 w-1.5 rounded-full bg-cyber-green blink" /> STREAMING
              </span>
            }
          >
            <div className="max-h-[320px] space-y-1.5 overflow-y-auto pr-1">
              {threatFeed.map((t, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded border border-border/40 bg-background/40 px-2 py-1.5 font-mono text-[11px]"
                >
                  <span className="text-muted-foreground">{t.ts}</span>
                  <div className="truncate">
                    <span className="text-cyan-300">{t.src}</span>
                    <span className="ml-2 text-muted-foreground">[{t.country}]</span>
                    <div className="truncate text-[10px] text-muted-foreground">{t.sig}</div>
                  </div>
                  <SeverityBadge level={t.sev} />
                </div>
              ))}
            </div>
          </Panel>

          {/* Network topology */}
          <Panel
            className="xl:col-span-8"
            title="Network Topology"
            subtitle="Segmented protection zones"
            accent="cyan"
          >
            <NetworkTopology />
          </Panel>

          {/* Executive summary */}
          <Panel
            className="xl:col-span-4"
            title="Executive Summary"
            subtitle="AI generated · 14:03 UTC"
            accent="violet"
          >
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              Overall posture <span className="text-cyan-300 font-semibold">STRONG</span>. Two SEV-1
              events (INC-24518, INC-24512) were auto-contained without human intervention.
              Adversary activity from <span className="font-mono">RU/CN/IR</span> up{" "}
              <span className="text-red-300">+34%</span> vs 7-day baseline. Ransomware precursor
              blocked on <span className="font-mono">SRV-BKP-14</span>; backup integrity verified.
              Recommend elevating <span className="text-amber-300">DEFCON to 2</span> if C2 attempts
              persist beyond 14:30 UTC.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded border border-border/60 p-2">
                <div className="text-lg font-semibold text-cyan-300">2</div>
                <div className="text-[10px] font-mono uppercase text-muted-foreground">SEV-1</div>
              </div>
              <div className="rounded border border-border/60 p-2">
                <div className="text-lg font-semibold text-amber-300">3</div>
                <div className="text-[10px] font-mono uppercase text-muted-foreground">SEV-2</div>
              </div>
              <div className="rounded border border-border/60 p-2">
                <div className="text-lg font-semibold text-emerald-300">100%</div>
                <div className="text-[10px] font-mono uppercase text-muted-foreground">
                  Auto-Resp
                </div>
              </div>
            </div>
            <Link
              to="/executive"
              className="mt-4 flex items-center justify-center gap-1 rounded-md border border-cyan-400/40 bg-cyan-400/10 py-2 text-xs font-medium text-cyan-200 hover:bg-cyan-400/20"
            >
              Open Executive Dashboard <ArrowRight className="h-3 w-3" />
            </Link>
          </Panel>

          {/* Quick modules */}
          <div className="xl:col-span-12 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {[
              { icon: Radar, label: "AI Detection", to: "/threat-detection", tone: "cyan" },
              { icon: Cpu, label: "EDR", to: "/edr", tone: "cyan" },
              { icon: Waypoints, label: "XDR", to: "/xdr", tone: "violet" },
              { icon: Shield, label: "NIST CSF", to: "/nist", tone: "green" },
              { icon: Satellite, label: "Threat Intel", to: "/threat-intel", tone: "amber" },
              { icon: Zap, label: "SOC Copilot", to: "/soc-copilot", tone: "cyan" },
            ].map(({ icon: Icon, label, to }) => (
              <Link
                key={to}
                to={to}
                className="glass flex items-center gap-3 rounded-lg p-3 transition hover:border-cyan-400/40"
              >
                <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30">
                  <Icon className="h-4 w-4 text-cyan-300" />
                </span>
                <div className="text-sm">
                  <div className="font-medium">{label}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">OPERATIONAL</div>
                </div>
                <ArrowRight className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </>
  );
}

function NetworkTopology() {
  const zones = [
    { name: "DMZ", x: 120, y: 60, count: 42, tone: "amber" },
    { name: "Core", x: 340, y: 90, count: 128, tone: "cyan" },
    { name: "Finance VLAN", x: 560, y: 70, count: 84, tone: "cyan" },
    { name: "Cloud · AWS", x: 640, y: 190, count: 214, tone: "green" },
    { name: "OT / SCADA", x: 400, y: 220, count: 61, tone: "red" },
    { name: "Remote / VPN", x: 180, y: 210, count: 91, tone: "amber" },
  ];
  const links: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [3, 2],
  ];
  const color = (t: string) =>
    t === "red"
      ? "var(--cyber-red)"
      : t === "amber"
        ? "var(--cyber-amber)"
        : t === "green"
          ? "var(--cyber-green)"
          : "var(--cyber-cyan)";
  return (
    <div className="relative overflow-hidden rounded-md border border-border/60 bg-[oklch(0.10_0.02_250)]">
      <svg viewBox="0 0 760 300" className="h-[280px] w-full">
        <defs>
          <pattern id="grid2" width="24" height="24" patternUnits="userSpaceOnUse">
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="oklch(0.55 0.08 220 / 0.12)"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>
        <rect width="760" height="300" fill="url(#grid2)" />
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={zones[a].x}
            y1={zones[a].y}
            x2={zones[b].x}
            y2={zones[b].y}
            stroke="oklch(0.60 0.10 220 / 0.5)"
            strokeWidth="1"
            strokeDasharray="4 4"
          >
            <animate
              attributeName="stroke-dashoffset"
              values="0;-40"
              dur="4s"
              repeatCount="indefinite"
            />
          </line>
        ))}
        {zones.map((z, i) => (
          <g key={i}>
            <circle cx={z.x} cy={z.y} r="34" fill={color(z.tone)} opacity="0.06" />
            <circle
              cx={z.x}
              cy={z.y}
              r="26"
              fill="oklch(0.15 0.02 250)"
              stroke={color(z.tone)}
              strokeWidth="1.2"
            />
            <text
              x={z.x}
              y={z.y - 2}
              textAnchor="middle"
              fontSize="10"
              fill={color(z.tone)}
              fontFamily="monospace"
            >
              {z.name}
            </text>
            <text
              x={z.x}
              y={z.y + 11}
              textAnchor="middle"
              fontSize="8"
              fill="oklch(0.75 0.02 230)"
              fontFamily="monospace"
            >
              {z.count} nodes
            </text>
          </g>
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-around border-t border-border/60 bg-background/60 py-1.5 text-[10px] font-mono text-muted-foreground">
        <span>THROUGHPUT · 4.28 Gbps</span>
        <span>ANOMALY SCORE · 0.14</span>
        <span>BLOCKED · 1,204 /min</span>
        <span>LATENCY · 12ms</span>
      </div>
    </div>
  );
}
