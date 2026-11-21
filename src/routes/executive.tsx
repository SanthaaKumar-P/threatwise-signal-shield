import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, KPI, Ring, Bar, StatusPill } from "@/components/ui-bits";
import { departments } from "@/lib/mock";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Download, FileJson } from "lucide-react";

export const Route = createFileRoute("/executive")({
  head: () => ({
    meta: [
      { title: "Executive Dashboard — ThreatZero Sentinel X" },
      {
        name: "description",
        content: "Boardroom-grade cyber risk, business impact and compliance overview.",
      },
      { property: "og:title", content: "Executive Dashboard — ThreatZero Sentinel X" },
      {
        property: "og:description",
        content: "Boardroom-grade cyber risk, business impact and compliance overview.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <Page />,
});

const trend = Array.from({ length: 30 }, (_, i) => ({
  d: `D${i + 1}`,
  risk: 55 - i * 0.3 + 6 * Math.sin(i / 3),
  impact: 42 - i * 0.4 + 4 * Math.cos(i / 4),
}));

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Boardroom · Executive Insight"
        title="Executive Cyber Command"
        subtitle="Financial impact · Risk · Compliance · Departmental posture"
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-100 hover:bg-cyan-500/20">
              <Download className="h-3.5 w-3.5" /> Export PDF
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-violet-500/40 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-100 hover:bg-violet-500/20">
              <FileJson className="h-3.5 w-3.5" /> Export JSON
            </button>
          </>
        }
      />
      <PageContainer>
        <div className="grid gap-4 xl:grid-cols-12">
          <Panel className="xl:col-span-4" title="Organisation Risk Score" accent="red">
            <div className="flex items-center gap-6">
              <Ring value={38} label="Risk" tone="green" />
              <div className="flex-1 space-y-2">
                <Bar label="Financial Exposure" value={42} tone="amber" />
                <Bar label="Operational Risk" value={31} tone="green" />
                <Bar label="Regulatory" value={22} tone="green" />
                <Bar label="Reputational" value={48} tone="amber" />
              </div>
            </div>
            <div className="mt-4 rounded border border-emerald-500/30 bg-emerald-500/5 p-3 text-[12px] text-emerald-200">
              Risk index down <b>11%</b> WoW. Investment in identity hardening is paying off.
            </div>
          </Panel>
          <Panel className="xl:col-span-8" title="Risk & Business Impact · 30 days" accent="cyan">
            <div className="h-[220px]">
              <ResponsiveContainer>
                <AreaChart data={trend}>
                  <defs>
                    <linearGradient id="er" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyber-red)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--cyber-red)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="ei" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--cyber-cyan)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--cyber-cyan)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="d" />
                  <YAxis />
                  <Tooltip />
                  <Area dataKey="risk" stroke="var(--cyber-red)" fill="url(#er)" strokeWidth={2} />
                  <Area
                    dataKey="impact"
                    stroke="var(--cyber-cyan)"
                    fill="url(#ei)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>
          <div className="xl:col-span-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            <KPI label="Est. Loss Avoided" value="$4.28M" delta={22} tone="green" />
            <KPI label="Cyber Insurance Δ" value="-14%" tone="cyan" />
            <KPI label="Compliance" value="98.2%" tone="cyan" hint="SOC2 · ISO 27001 · HIPAA" />
            <KPI label="Board Rating" value="A+" tone="green" hint="Q3 audit" />
          </div>
          <Panel className="xl:col-span-7" title="Departmental Posture" accent="violet">
            <ul className="space-y-3">
              {departments.map((d) => (
                <li key={d.name} className="grid grid-cols-[160px_1fr_60px] items-center gap-4">
                  <div className="text-sm font-medium">{d.name}</div>
                  <Bar
                    value={100 - d.risk}
                    tone={d.risk > 65 ? "red" : d.risk > 50 ? "amber" : "green"}
                  />
                  <span className="text-right font-mono text-sm">{100 - d.risk}%</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel className="xl:col-span-5" title="Top Recommendations" accent="cyan">
            <ol className="space-y-2 text-[13px]">
              {[
                "Rotate KRBTGT & enforce Kerberos armor across all DCs.",
                "Accelerate MFA rollout in R&D (91% → 100%) within 30 days.",
                "Segment OT/SCADA VLAN from corporate directory.",
                "Increase evidence vault retention to 7 years (regulatory).",
                "Approve budget for post-quantum key exchange pilot (Q4).",
              ].map((r, i) => (
                <li key={i} className="flex gap-2">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-cyan-500/20 border border-cyan-400/40 text-[11px] font-mono text-cyan-200">
                    {i + 1}
                  </span>
                  {r}
                </li>
              ))}
            </ol>
          </Panel>
          <div className="xl:col-span-12 flex flex-wrap gap-2">
            {[
              "SOC 2 Type II · PASS",
              "ISO 27001 · PASS",
              "HIPAA · PASS",
              "PCI-DSS · PASS",
              "GDPR · IN-SCOPE",
              "NIST 800-53 · PASS",
              "CERT-IN · REPORTING",
            ].map((c) => (
              <StatusPill key={c} label={c} tone={c.includes("PASS") ? "green" : "cyan"} />
            ))}
          </div>
        </div>
      </PageContainer>
    </>
  );
}
