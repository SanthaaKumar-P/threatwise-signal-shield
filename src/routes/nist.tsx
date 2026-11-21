import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, KPI, Ring, Bar, StatusPill } from "@/components/ui-bits";
import { nist, departments } from "@/lib/mock";

export const Route = createFileRoute("/nist")({
  head: () => ({
    meta: [
      { title: "NIST CSF Maturity — ThreatZero Sentinel X" },
      {
        name: "description",
        content:
          "NIST Cybersecurity Framework maturity, department readiness and posture over time.",
      },
      { property: "og:title", content: "NIST CSF Maturity — ThreatZero Sentinel X" },
      {
        property: "og:description",
        content:
          "NIST Cybersecurity Framework maturity, department readiness and posture over time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <Page />,
});

function Page() {
  const overall = (nist.reduce((a, b) => a + b.score, 0) / nist.length).toFixed(1);
  return (
    <>
      <PageHeader
        eyebrow="Governance · Compliance"
        title="NIST Cybersecurity Framework"
        subtitle="Enterprise maturity across Identify · Protect · Detect · Respond · Recover"
        actions={
          <>
            <StatusPill label="Version · CSF 2.0" tone="cyan" />
            <StatusPill label="Audit-Ready" tone="green" />
          </>
        }
      />
      <PageContainer>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          <KPI label="Overall Maturity" value={overall} suffix="/5" tone="cyan" delta={5} />
          {nist.map((f) => (
            <KPI
              key={f.fn}
              label={f.fn}
              value={f.score.toFixed(1)}
              suffix="/5"
              delta={Math.round((f.score - f.prev) * 10)}
              tone={
                f.fn === "Detect"
                  ? "green"
                  : f.fn === "Respond"
                    ? "amber"
                    : f.fn === "Recover"
                      ? "violet"
                      : "cyan"
              }
            />
          ))}
        </div>
        <div className="grid gap-4 xl:grid-cols-12">
          <Panel className="xl:col-span-4" title="Function Rings" accent="cyan">
            <div className="grid grid-cols-2 gap-4">
              {nist.map((f) => (
                <div key={f.fn} className="flex flex-col items-center">
                  <Ring
                    value={Math.round(f.score * 20)}
                    label={f.fn}
                    tone={f.fn === "Detect" ? "green" : f.fn === "Respond" ? "amber" : "cyan"}
                  />
                </div>
              ))}
            </div>
          </Panel>
          <Panel
            className="xl:col-span-8"
            title="Department Readiness"
            subtitle="Risk index + incident volume"
            accent="violet"
          >
            <ul className="space-y-3">
              {departments.map((d) => (
                <li key={d.name} className="grid grid-cols-[160px_1fr_auto] items-center gap-4">
                  <div>
                    <div className="text-sm font-medium">{d.name}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">
                      {d.incidents} incidents · trend {d.trend > 0 ? "+" : ""}
                      {d.trend}%
                    </div>
                  </div>
                  <Bar
                    value={100 - d.risk}
                    tone={d.risk > 65 ? "red" : d.risk > 50 ? "amber" : "green"}
                    label="Readiness"
                  />
                  <span
                    className={`font-mono text-sm ${d.risk > 65 ? "text-red-300" : d.risk > 50 ? "text-amber-300" : "text-emerald-300"}`}
                  >
                    {d.risk}
                    <span className="text-[10px] opacity-70">/100</span>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel
            className="xl:col-span-12"
            title="Sub-category Coverage"
            subtitle="Sampled from 108 controls"
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {(
                [
                  ["ID.AM · Asset Management", "94"],
                  ["PR.AC · Identity", "88"],
                  ["PR.DS · Data Security", "76"],
                  ["DE.AE · Anomalies", "92"],
                  ["DE.CM · Continuous Monitoring", "96"],
                  ["RS.RP · Response Planning", "82"],
                  ["RS.CO · Communications", "74"],
                  ["RC.RP · Recovery Planning", "70"],
                ] as const
              ).map(([n, v]) => (
                <div key={n} className="glass rounded-lg p-3">
                  <div className="text-[11px] font-mono text-cyan-300">{n}</div>
                  <div className="mt-1 text-xl font-semibold">{v}%</div>
                  <div className="mt-1.5 h-1 rounded-full bg-muted/50 overflow-hidden">
                    <div
                      className="h-full"
                      style={{
                        width: `${v}%`,
                        background: "var(--cyber-cyan)",
                        boxShadow: "0 0 6px var(--cyber-cyan)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </PageContainer>
    </>
  );
}
