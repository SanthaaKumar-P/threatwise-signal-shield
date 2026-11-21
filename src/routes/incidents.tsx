import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, KPI, SeverityBadge, StatusPill, Bar } from "@/components/ui-bits";
import { incidents } from "@/lib/mock";
import { PlayCircle, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/incidents")({
  head: () => ({ meta: [
    { title: "Incident Response Centre — ThreatZero Sentinel X" },
    { name: "description", content: "Live incident queue with playbooks, containment and recovery progress." },
    { property: "og:title", content: "Incident Response Centre — ThreatZero Sentinel X" },
    { property: "og:description", content: "Live incident queue with playbooks, containment and recovery progress." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
  component: () => <Page/>,
});

function Page(){
  return (
    <>
      <PageHeader eyebrow="IR · Response Command" title="Incident Response Centre"
        subtitle="Playbook-driven autonomous & analyst-assisted response"
        actions={<><StatusPill label="MTTR · 6m 42s" tone="cyan"/><StatusPill label="Auto-Response ON" tone="green"/></>}/>
      <PageContainer>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          <KPI label="Open" value="7" tone="cyan"/>
          <KPI label="Critical" value="2" tone="red"/>
          <KPI label="High" value="2" tone="amber"/>
          <KPI label="Contained" value="18" tone="green" delta={12}/>
          <KPI label="MTTD" value="42s" tone="cyan" delta={-15}/>
          <KPI label="MTTR" value="6m" tone="cyan" delta={-9}/>
        </div>
        <Panel title="Incident Queue" accent="red">
          <div className="space-y-2">
            {incidents.map(r => (
              <div key={r.id} className="rounded-lg border border-border/60 bg-background/40 p-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[11px] text-cyan-300">{r.id}</span>
                  <SeverityBadge level={r.sev}/>
                  <span className="text-sm font-medium">{r.title}</span>
                  <span className="ml-auto text-[11px] font-mono text-muted-foreground">{r.owner} · {r.ago} ago</span>
                </div>
                <div className="mt-2 grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-muted-foreground">Playbook</div>
                    <div className="text-[12px] font-mono text-cyan-200">PB-{r.mitre[0].replace(".","")}-Response</div>
                  </div>
                  <div><Bar label="Containment" value={r.score>85?96:r.score>60?70:40} tone="green"/></div>
                  <div><Bar label="Recovery" value={r.score>85?52:r.score>60?28:12} tone="amber"/></div>
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-200"><ShieldCheck className="h-3 w-3"/> Contain</button>
                    <button className="inline-flex items-center gap-1.5 rounded-md border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 text-[11px] text-cyan-200"><PlayCircle className="h-3 w-3"/> Play</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </PageContainer>
    </>
  );
}