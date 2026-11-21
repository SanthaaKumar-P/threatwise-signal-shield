import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, StatusPill } from "@/components/ui-bits";
import { Atom, Boxes, Layers, Sparkles, Users } from "lucide-react";
import type { ComponentType } from "react";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [
    { title: "Upcoming Features — ThreatZero Sentinel X" },
    { name: "description", content: "Roadmap: post-quantum security, AR cyber command, digital twin, autonomous multi-agent AI." },
    { property: "og:title", content: "Upcoming Features — ThreatZero Sentinel X" },
    { property: "og:description", content: "Roadmap: post-quantum security, AR cyber command, digital twin, autonomous multi-agent AI." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
  component: () => <Page/>,
});

function Page(){
  return (
    <>
      <PageHeader eyebrow="Research & Development" title="Upcoming Capabilities"
        subtitle="Roadmap items · not yet production · research preview"
        actions={<StatusPill label="R&D · Preview" tone="cyan"/>}/>
      <PageContainer>
        <div className="grid gap-4 xl:grid-cols-2">
          <Section eyebrow="Q1" title="Post-Quantum Security" icon={Atom}
            items={["Hybrid AES-256 + ML-KEM (Kyber) key exchange","ML-DSA (Dilithium) signature envelopes","Quantum-resistant evidence protection & audit trails","Automatic classical→PQ crypto migration engine"]}/>
          <Section eyebrow="Q2" title="AR Cyber Command Centre" icon={Boxes}
            items={["Immersive 3D cyber battlefield","Interactive holographic network visualisation","Threat path overlays projected in AR","Multi-operator situational awareness"]}/>
          <Section eyebrow="Q3" title="Digital Twin Security" icon={Layers}
            items={["Realtime enterprise infrastructure twin","Simulated attack propagation & what-if","Business impact & downtime forecasting","Continuous purple-team validation"]}/>
          <Section eyebrow="Q4" title="Autonomous Multi-Agent AI" icon={Users}
            items={["Detection · XDR Correlation · MITRE Intel Agents","Risk Assessment · Incident Response Agents","Evidence Protection · Executive Reporting Agents","AI SOC Copilot Agent · multi-agent handoff"]}/>
        </div>
      </PageContainer>
    </>
  );
}
function Section({eyebrow,title,items,icon:Icon}:{eyebrow:string;title:string;items:string[];icon:ComponentType<{className?:string}>}){
  return (
    <Panel accent="violet" title={title} subtitle={`Planned · ${eyebrow}`}
      actions={<StatusPill label="Not yet released" tone="amber"/>}>
      <div className="flex items-start gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-md border border-violet-400/40 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-violet-200"><Icon className="h-5 w-5"/></div>
        <ul className="flex-1 space-y-1.5 text-sm text-muted-foreground">
          {items.map(i => (<li key={i} className="flex gap-2"><Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300"/>{i}</li>))}
        </ul>
      </div>
    </Panel>
  );
}