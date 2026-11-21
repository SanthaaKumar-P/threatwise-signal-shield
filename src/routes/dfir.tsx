import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, StatusPill, SeverityBadge } from "@/components/ui-bits";
import { GripVertical } from "lucide-react";

export const Route = createFileRoute("/dfir")({
  head: () => ({ meta: [
    { title: "DFIR Timeline — ThreatZero Sentinel X" },
    { name: "description", content: "Interactive DFIR timeline reconstruction with MITRE tags and causal links." },
    { property: "og:title", content: "DFIR Timeline — ThreatZero Sentinel X" },
    { property: "og:description", content: "Interactive DFIR timeline reconstruction with MITRE tags and causal links." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
  component: () => <Page/>,
});

const events = [
  { t: "13:42:11", src: "SRV-BKP-14", desc: "vssadmin delete shadows /all", mitre: "T1490", sev:"high" as const },
  { t: "13:44:52", src: "AD-DC-01", desc: "TGT forged with KRBTGT hash", mitre: "T1558.001", sev:"critical" as const },
  { t: "13:47:03", src: "WKS-4482", desc: "SMB admin$ share touched", mitre: "T1021.002", sev:"high" as const },
  { t: "13:52:17", src: "WKS-4482", desc: "Cobalt Strike beacon injection", mitre: "T1055", sev:"critical" as const },
  { t: "13:58:44", src: "WKS-4482", desc: "TLS to 46.161.27.94:4444", mitre: "T1071.001", sev:"critical" as const },
  { t: "14:02:11", src: "PERIMETER", desc: "Auto-response BLOCK egress", mitre: "R-000", sev:"low" as const },
];

function Page(){
  return (
    <>
      <PageHeader eyebrow="Forensics · Reconstruction" title="DFIR Timeline Canvas"
        subtitle="Causal reconstruction · drag events · attach evidence · export to court-admissible report"
        actions={<><StatusPill label="Chain-of-Custody OK" tone="green"/><StatusPill label="Hashes verified" tone="cyan"/></>}/>
      <PageContainer>
        <Panel title="Investigation Canvas · INC-24518" accent="cyan">
          <div className="relative rounded-md border border-border/60 bg-[oklch(0.10_0.02_250)] p-4 grid-bg">
            <div className="relative pl-8">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/60 via-cyan-400/20 to-transparent"/>
              {events.map((e,i)=>(
                <div key={i} className="relative mb-4">
                  <span className="absolute -left-[22px] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-cyan-400/50 bg-background">
                    <span className={`h-1.5 w-1.5 rounded-full ${e.sev==="critical"?"bg-red-400":"bg-cyan-300"}`}/>
                  </span>
                  <div className="glass flex items-start gap-3 rounded-md p-3">
                    <GripVertical className="mt-0.5 h-4 w-4 text-muted-foreground"/>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] text-cyan-300">{e.t} UTC</span>
                        <span className="text-[11px] font-mono text-muted-foreground">{e.src}</span>
                        <SeverityBadge level={e.sev}/>
                        <span className="rounded border border-violet-500/40 bg-violet-500/10 px-1.5 py-0.5 font-mono text-[10px] text-violet-300">{e.mitre}</span>
                      </div>
                      <div className="mt-1 text-sm">{e.desc}</div>
                    </div>
                    <div className="text-[10px] font-mono text-muted-foreground">EV-778{20-i}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </PageContainer>
    </>
  );
}