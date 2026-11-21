import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, KPI, StatusPill, Bar } from "@/components/ui-bits";
import { endpoints } from "@/lib/mock";
import { Cpu, HardDrive, Shield, Zap, Terminal, Package, Camera } from "lucide-react";
import { useState, type ComponentType } from "react";

export const Route = createFileRoute("/edr")({
  head: () => ({ meta: [
    { title: "Endpoint Detection & Response — ThreatZero Sentinel X" },
    { name: "description", content: "Endpoint telemetry, process behaviour, one-click isolation and forensic collection." },
    { property: "og:title", content: "Endpoint Detection & Response — ThreatZero Sentinel X" },
    { property: "og:description", content: "Endpoint telemetry, process behaviour, one-click isolation and forensic collection." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
  component: () => <Page/>,
});

const statusTone = { healthy: "green", monitoring: "cyan", "at-risk": "amber", isolated: "slate", compromised: "red" } as const;

function Page() {
  const [sel, setSel] = useState(endpoints[1]);
  return (
    <>
      <PageHeader eyebrow="EDR · Endpoint Command" title="Endpoint Detection & Response" subtitle="48,214 protected endpoints · 99.8% agent health · Autonomous containment enabled"
        actions={<><StatusPill label="Sensors · Online" tone="green"/><StatusPill label="Response · Automatic" tone="cyan"/></>}
      />
      <PageContainer>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          <KPI label="Servers" value="1,284" tone="cyan"/>
          <KPI label="Laptops" value="24,109" tone="cyan"/>
          <KPI label="Workstations" value="21,842" tone="cyan"/>
          <KPI label="IoT" value="712" tone="amber"/>
          <KPI label="Military" value="267" tone="violet"/>
          <KPI label="Compromised" value="2" tone="red" delta={-33}/>
        </div>
        <div className="grid gap-4 xl:grid-cols-12">
          <Panel className="xl:col-span-7" title="Endpoint Fleet" subtitle="Filtered · high-risk first">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60 text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    <th className="py-2 pr-3">Host</th><th className="pr-3">Type</th><th className="pr-3">OS</th><th className="pr-3">CPU</th><th className="pr-3">MEM</th><th className="pr-3">Procs</th><th className="pr-3">Risk</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map(e => (
                    <tr key={e.id} onClick={()=>setSel(e)} className={`cursor-pointer border-b border-border/30 last:border-0 hover:bg-muted/20 ${sel.id===e.id ? "bg-cyan-500/10" : ""}`}>
                      <td className="py-2.5 pr-3 font-mono text-[11px] text-cyan-300">{e.id}<div className="text-[10px] text-muted-foreground">{e.ip}</div></td>
                      <td className="pr-3">{e.type}</td>
                      <td className="pr-3 text-muted-foreground">{e.os}</td>
                      <td className="pr-3 font-mono">{e.cpu}%</td>
                      <td className="pr-3 font-mono">{e.mem}%</td>
                      <td className="pr-3 font-mono">{e.procs}</td>
                      <td className="pr-3"><div className="flex items-center gap-2"><span className={`h-1.5 w-1.5 rounded-full ${e.risk>75?"bg-red-400":e.risk>50?"bg-amber-400":"bg-emerald-400"}`}/><span className="font-mono">{e.risk}</span></div></td>
                      <td><StatusPill label={e.status} tone={statusTone[e.status]}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel className="xl:col-span-5" title={`Endpoint · ${sel.id}`} subtitle={`${sel.type} · ${sel.os}`} accent={sel.risk>75?"red":sel.risk>50?"amber":"cyan"}>
            <div className="grid grid-cols-3 gap-2">
              <Meter icon={Cpu} label="CPU" value={sel.cpu}/>
              <Meter icon={HardDrive} label="MEM" value={sel.mem}/>
              <Meter icon={Terminal} label="RISK" value={sel.risk} tone={sel.risk>75?"red":"amber"}/>
            </div>
            <div className="mt-4">
              <div className="mb-2 text-[10px] font-mono uppercase text-muted-foreground">Suspicious Behaviour</div>
              <ul className="space-y-1.5 text-[12px]">
                {[
                  { t: "powershell.exe -enc <b64>", tag: "T1059.001" },
                  { t: "rundll32 → svchost injection", tag: "T1055" },
                  { t: "vssadmin delete shadows /all", tag: "T1490" },
                  { t: "outbound TCP 46.161.27.94:4444", tag: "T1071.001" },
                ].map((r,i)=>(
                  <li key={i} className="flex items-center justify-between rounded border border-border/40 bg-background/40 px-2 py-1.5 font-mono">
                    <span className="truncate text-cyan-300">{r.t}</span>
                    <span className="rounded border border-violet-500/40 bg-violet-500/10 px-1.5 py-0.5 text-[10px] text-violet-300">{r.tag}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Action icon={Shield} label="Isolate Endpoint" tone="red"/>
              <Action icon={Zap} label="Kill Process" tone="amber"/>
              <Action icon={Package} label="Memory Dump"/>
              <Action icon={Camera} label="Collect Evidence"/>
            </div>
          </Panel>

          <Panel className="xl:col-span-12" title="Behavioural Anomaly Score · fleet-wide" subtitle="Live process, network, identity signals fused">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {(["Process","Network","Identity","Memory"] as const).map((k,i)=>(
                <div key={k}><Bar label={k} value={[62,78,44,55][i]} tone={(["cyan","amber","green","violet"] as const)[i]}/></div>
              ))}
            </div>
          </Panel>
        </div>
      </PageContainer>
    </>
  );
}
function Meter({icon:Icon,label,value,tone="cyan"}:{icon:ComponentType<{className?:string}>;label:string;value:number;tone?:"cyan"|"red"|"amber"}){
  const c = { cyan:"text-cyan-300", red:"text-red-300", amber:"text-amber-300" }[tone];
  return <div className="rounded border border-border/60 p-3">
    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-muted-foreground"><Icon className="h-3 w-3"/> {label}</div>
    <div className={`mt-1 text-xl font-semibold ${c}`}>{value}%</div>
    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted/50"><div className="h-full" style={{width:`${value}%`, background: tone==="red"?"var(--cyber-red)":tone==="amber"?"var(--cyber-amber)":"var(--cyber-cyan)"}}/></div>
  </div>;
}
function Action({icon:Icon,label,tone="cyan"}:{icon:ComponentType<{className?:string}>;label:string;tone?:"cyan"|"red"|"amber"}){
  const border = tone==="red"?"border-red-500/50 text-red-200 hover:bg-red-500/10":tone==="amber"?"border-amber-500/50 text-amber-200 hover:bg-amber-500/10":"border-cyan-500/50 text-cyan-200 hover:bg-cyan-500/10";
  return <button className={`flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs font-medium ${border}`}><Icon className="h-3.5 w-3.5"/> {label}</button>;
}