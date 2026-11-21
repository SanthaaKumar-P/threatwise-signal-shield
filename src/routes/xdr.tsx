import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, SeverityBadge, StatusPill } from "@/components/ui-bits";
import { Network, Mail, Cloud, Users, Server, Shield, Globe2, Waypoints } from "lucide-react";

export const Route = createFileRoute("/xdr")({
  head: () => ({ meta: [
    { title: "Extended Detection & Response — ThreatZero Sentinel X" },
    { name: "description", content: "Cross-surface XDR correlation with unified incident graph and attack flow." },
    { property: "og:title", content: "Extended Detection & Response — ThreatZero Sentinel X" },
    { property: "og:description", content: "Cross-surface XDR correlation with unified incident graph and attack flow." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
  component: () => <Page/>,
});

const surfaces = [
  { n: "Network", icon: Network, events: 18240, corr: 44 },
  { n: "Endpoint", icon: Server, events: 24102, corr: 71 },
  { n: "Identity", icon: Users, events: 8422, corr: 62 },
  { n: "Email", icon: Mail, events: 3018, corr: 12 },
  { n: "Cloud", icon: Cloud, events: 15602, corr: 38 },
  { n: "Firewall", icon: Shield, events: 41209, corr: 28 },
  { n: "DNS", icon: Globe2, events: 9821, corr: 22 },
  { n: "VPN", icon: Waypoints, events: 4402, corr: 8 },
];

type Node = { id: string; x: number; y: number; label: string; mitre: string; sev: "critical"|"high"|"medium" };
const graph: Node[] = [
  { id:"init", x: 80, y: 160, label: "Initial Access · Spear-phish", mitre:"T1566.001", sev:"critical" },
  { id:"exec", x: 240, y: 100, label: "Execution · Macro", mitre:"T1204.002", sev:"high" },
  { id:"pers", x: 240, y: 220, label: "Persistence · Sched Task", mitre:"T1053.005", sev:"medium" },
  { id:"cred", x: 420, y: 100, label: "Credential · Golden Ticket", mitre:"T1558.001", sev:"critical" },
  { id:"lat",  x: 420, y: 220, label: "Lateral · SMB Admin$", mitre:"T1021.002", sev:"critical" },
  { id:"c2",   x: 600, y: 160, label: "C2 · Cobalt Strike", mitre:"T1071.001", sev:"critical" },
  { id:"exfil",x: 760, y: 160, label: "Exfil · HTTPS", mitre:"T1041", sev:"high" },
];
const edges: Array<[string,string]> = [["init","exec"],["init","pers"],["exec","cred"],["pers","lat"],["cred","lat"],["cred","c2"],["lat","c2"],["c2","exfil"]];

function Page(){
  return (
    <>
      <PageHeader eyebrow="XDR · Cross-Surface Correlation" title="Extended Detection & Response" subtitle="Correlating 124,821 events / min across 8 telemetry sources into unified incidents"
        actions={<><StatusPill label="Correlator · v9.4" tone="cyan"/><StatusPill label="Graph · GPU" tone="cyan"/></>}
      />
      <PageContainer>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
          {surfaces.map(s => (
            <div key={s.n} className="glass rounded-lg p-3">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase text-muted-foreground"><span>{s.n}</span><s.icon className="h-3 w-3"/></div>
              <div className="mt-1 text-lg font-semibold text-cyan-300">{s.events.toLocaleString()}</div>
              <div className="text-[10px] font-mono text-muted-foreground">{s.corr} correlated</div>
              <div className="mt-1.5 h-1 rounded-full bg-muted/50 overflow-hidden"><div className="h-full" style={{width:`${Math.min(100,s.corr*1.4)}%`, background:"var(--cyber-cyan)", boxShadow:"0 0 6px var(--cyber-cyan)"}}/></div>
            </div>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-12">
          <Panel className="xl:col-span-8" title="Unified Incident · INC-24518" subtitle="Attack flow graph · 7 stages · 24 events fused" accent="red">
            <div className="rounded-md border border-border/60 bg-[oklch(0.10_0.02_250)]">
              <svg viewBox="0 0 860 320" className="h-[320px] w-full">
                <defs>
                  <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L10,5 L0,10 Z" fill="oklch(0.86 0.17 200 / 0.7)"/>
                  </marker>
                </defs>
                {edges.map(([a,b],i)=>{ const A=graph.find(g=>g.id===a)!; const B=graph.find(g=>g.id===b)!;
                  return <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="oklch(0.86 0.17 200 / 0.45)" strokeWidth="1.2" strokeDasharray="4 3" markerEnd="url(#arr)">
                      <animate attributeName="stroke-dashoffset" values="0;-14" dur="1.6s" repeatCount="indefinite"/>
                    </line>; })}
                {graph.map(n => {
                  const color = n.sev==="critical"?"var(--cyber-red)":n.sev==="high"?"var(--cyber-amber)":"var(--cyber-cyan)";
                  return <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r="26" fill="oklch(0.14 0.02 250)" stroke={color} strokeWidth="1.4" style={{filter:`drop-shadow(0 0 10px ${color})`}}/>
                    <text x={n.x} y={n.y+3} textAnchor="middle" fontSize="9" fontFamily="monospace" fill={color}>{n.mitre}</text>
                    <text x={n.x} y={n.y+42} textAnchor="middle" fontSize="10" fill="oklch(0.85 0.02 230)">{n.label}</text>
                  </g>;
                })}
              </svg>
            </div>
          </Panel>
          <Panel className="xl:col-span-4" title="Incident Snapshot" accent="cyan">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Severity</span><SeverityBadge level="critical"/></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Threat Score</span><span className="font-mono text-red-300">96 / 100</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Affected Assets</span><span className="font-mono">4 hosts · 1 identity</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Kill Chain</span><span className="font-mono text-amber-300">Actions on Objectives</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Origin</span><span className="font-mono">RU · TOR relay</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Auto-Response</span><span className="font-mono text-emerald-300">Contained</span></div>
            </div>
            <div className="mt-4 grid gap-2 text-[11px]">
              <div className="rounded border border-border/60 p-2"><div className="font-mono text-cyan-300">Playbook · PB-AD-Golden-Ticket</div><div className="text-muted-foreground">14 steps · 9 complete · ETA 6m</div></div>
              <div className="rounded border border-border/60 p-2"><div className="font-mono text-cyan-300">Related Incidents</div><div className="text-muted-foreground">INC-24512 · INC-24509</div></div>
            </div>
          </Panel>
        </div>
      </PageContainer>
    </>
  );
}