import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, KPI, SeverityBadge, StatusPill } from "@/components/ui-bits";
import { iocs, threatActors } from "@/lib/mock";

export const Route = createFileRoute("/threat-intel")({
  head: () => ({ meta: [
    { title: "Threat Intelligence — ThreatZero Sentinel X" },
    { name: "description", content: "IOC database, threat actors, malware and CVE intelligence." },
    { property: "og:title", content: "Threat Intelligence — ThreatZero Sentinel X" },
    { property: "og:description", content: "IOC database, threat actors, malware and CVE intelligence." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
  component: () => <Page/>,
});

function Page(){
  return (
    <>
      <PageHeader eyebrow="TI · Adversary Intelligence" title="Threat Intelligence Fabric"
        subtitle="Ingesting 42 curated feeds · MISP · OTX · CERT-IN · vendor intel · dark-web sensors"
        actions={<><StatusPill label="Feeds · 42" tone="cyan"/><StatusPill label="Enrichment · Live" tone="green"/></>}/>
      <PageContainer>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          <KPI label="IOCs" value="2.14M" tone="cyan"/>
          <KPI label="New / 24h" value="18,204" tone="cyan" delta={12}/>
          <KPI label="Actors" value="428" tone="violet"/>
          <KPI label="Malware Families" value="1,041" tone="amber"/>
          <KPI label="CVEs Tracked" value="6,381" tone="cyan"/>
          <KPI label="Critical CVEs" value="27" tone="red"/>
        </div>
        <div className="grid gap-4 xl:grid-cols-12">
          <Panel className="xl:col-span-8" title="Indicators of Compromise" accent="cyan">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    <th className="py-2 pr-3">Type</th><th className="pr-3">Indicator</th><th className="pr-3">Tag</th><th className="pr-3">Sightings</th><th className="pr-3">First Seen</th><th>Sev</th>
                  </tr>
                </thead>
                <tbody>
                  {iocs.map(i => (
                    <tr key={i.value} className="border-b border-border/30 last:border-0 hover:bg-muted/20">
                      <td className="py-2.5 pr-3"><span className="rounded border border-cyan-500/40 bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300">{i.type}</span></td>
                      <td className="pr-3 font-mono text-[12px] text-cyan-200">{i.value}</td>
                      <td className="pr-3 text-[12px]">{i.tag}</td>
                      <td className="pr-3 font-mono">{i.sightings}</td>
                      <td className="pr-3 font-mono text-[11px] text-muted-foreground">{i.first}</td>
                      <td><SeverityBadge level={i.sev}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
          <Panel className="xl:col-span-4" title="Active Campaigns" accent="red">
            <ul className="space-y-2 text-[12px]">
              {threatActors.filter(a=>a.active).map(a => (
                <li key={a.name} className="rounded border border-border/60 p-2.5">
                  <div className="flex items-center justify-between"><span className="font-semibold">{a.name}</span><span className="font-mono text-[10px] text-red-300">{a.ttps} TTPs</span></div>
                  <div className="text-[11px] text-muted-foreground">{a.origin} · {a.focus}</div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </PageContainer>
    </>
  );
}