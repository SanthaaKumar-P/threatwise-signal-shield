import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, StatusPill, SeverityBadge } from "@/components/ui-bits";
import { mitreTactics, mitreHeat, threatActors } from "@/lib/mock";

export const Route = createFileRoute("/mitre")({
  head: () => ({ meta: [
    { title: "MITRE ATT&CK Command — ThreatZero Sentinel X" },
    { name: "description", content: "Interactive ATT&CK Navigator with heatmap, techniques and threat actor mapping." },
    { property: "og:title", content: "MITRE ATT&CK Command — ThreatZero Sentinel X" },
    { property: "og:description", content: "Interactive ATT&CK Navigator with heatmap, techniques and threat actor mapping." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
  component: () => <Page/>,
});

function Page(){
  return (
    <>
      <PageHeader eyebrow="Adversary Intelligence" title="MITRE ATT&CK Command Centre"
        subtitle="212 / 244 techniques covered · 87% enterprise matrix coverage · Live behavioural mapping"
        actions={<><StatusPill label="Matrix · Enterprise v15" tone="cyan"/><StatusPill label="Auto-Map · ON" tone="green"/></>}
      />
      <PageContainer>
        <Panel title="Coverage Heatmap" subtitle="Detections observed per tactic in last 7d" accent="violet">
          <div className="overflow-x-auto">
            <div className="min-w-[820px]">
              <div className="grid" style={{gridTemplateColumns: `160px repeat(8, minmax(70px,1fr))`}}>
                <div/>
                {Array.from({length:8}).map((_,i)=><div key={`th-${i}`} className="pb-2 text-center text-[10px] font-mono uppercase text-muted-foreground">T{i+1}</div>)}
                {mitreTactics.map((t, r) => (
                  <HeatRow key={t} tactic={t} row={mitreHeat[r]} />
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <div className="grid gap-4 xl:grid-cols-12">
          <Panel className="xl:col-span-7" title="Top Techniques · this week" accent="cyan">
            <div className="grid grid-cols-2 gap-2">
              {([
                ["T1059.001","PowerShell","428", "critical"],
                ["T1071.001","Web C2","312", "high"],
                ["T1558.001","Golden Ticket","74","critical"],
                ["T1490","Inhibit Recovery","62","high"],
                ["T1021.002","SMB Admin$","51","high"],
                ["T1078","Valid Accounts","44","medium"],
                ["T1046","Network Service Scan","39","low"],
                ["T1548.003","Sudo Abuse","28","medium"],
              ] as const).map(([id,name,c,s]) => (
                <div key={id} className="glass rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-cyan-300 text-sm">{id}</span>
                    <SeverityBadge level={s}/>
                  </div>
                  <div className="mt-1 text-[13px] font-medium">{name}</div>
                  <div className="mt-1 text-[10px] font-mono text-muted-foreground">{c} detections</div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel className="xl:col-span-5" title="Threat Actor Behaviour" subtitle="TTPs mapped to your environment" accent="red">
            <ul className="space-y-2">
              {threatActors.map(a => (
                <li key={a.name} className="rounded border border-border/60 p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{a.name}</span>
                    <StatusPill label={a.active?"active":"dormant"} tone={a.active?"red":"slate"}/>
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">{a.origin} · {a.focus}</div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted/50">
                    <div className="h-full" style={{width:`${Math.min(100, a.ttps*1.6)}%`, background:"var(--cyber-red)", boxShadow:"0 0 6px var(--cyber-red)"}}/>
                  </div>
                  <div className="mt-1 flex justify-between text-[10px] font-mono text-muted-foreground"><span>Overlap</span><span>{a.ttps} TTPs</span></div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </PageContainer>
    </>
  );
}

function HeatRow({ tactic, row }: { tactic: string; row: number[] }){
  return (
    <>
      <div className="flex items-center pr-2 text-[11px] text-cyan-300 font-mono">{tactic}</div>
      {row.map((v, c) => {
        const bg = v===0?"oklch(0.24 0.03 250 / 0.4)": `oklch(0.86 0.17 200 / ${0.15 + v*0.18})`;
        return <div key={c} className="m-0.5 grid h-9 place-items-center rounded font-mono text-[10px]" style={{background:bg, boxShadow: v>=3?"0 0 8px oklch(0.86 0.17 200 / 0.4)":"none"}}>{v>0?v:"·"}</div>;
      })}
    </>
  );
}