import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, StatusPill, SeverityBadge } from "@/components/ui-bits";
import { shapFeatures } from "@/lib/mock";
import { BarChart, Bar as RBar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { Brain, Zap } from "lucide-react";

export const Route = createFileRoute("/explainable-ai")({
  head: () => ({ meta: [
    { title: "Explainable AI (SHAP) — ThreatZero Sentinel X" },
    { name: "description", content: "SHAP feature contributions and natural language explanations behind every AI decision." },
  ]}),
  component: () => <Page />,
});

function Page() {
  const data = shapFeatures.map(f => ({ ...f, abs: Math.abs(f.contribution) }));
  return (
    <>
      <PageHeader eyebrow="Trust · Interpretability" title="Explainable AI · SHAP Insight" subtitle="Every prediction explained in feature and natural language form"
        actions={<><StatusPill label="Model · Ensemble v4.2" tone="cyan" /><StatusPill label="Confidence 0.96" tone="green" /></>}
      />
      <PageContainer>
        <div className="grid gap-4 xl:grid-cols-12">
          <Panel className="xl:col-span-4" title="Prediction" subtitle="INC-24518 · Golden Ticket forgery" accent="red">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase text-muted-foreground">Class</div>
                <div className="text-lg font-semibold text-red-300">ATTACK · Credential Access</div>
              </div>
              <SeverityBadge level="critical" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="rounded border border-border/60 p-3"><div className="text-[10px] font-mono uppercase text-muted-foreground">Probability</div><div className="text-2xl font-semibold text-red-300">96%</div></div>
              <div className="rounded border border-border/60 p-3"><div className="text-[10px] font-mono uppercase text-muted-foreground">Baseline</div><div className="text-2xl font-semibold text-cyan-300">4%</div></div>
            </div>
            <div className="mt-4 rounded border border-cyan-400/30 bg-cyan-400/5 p-3 text-[12px]">
              <div className="mb-1.5 flex items-center gap-1.5 font-mono text-cyan-300"><Zap className="h-3 w-3"/> AI EXPLANATION</div>
              <p className="leading-relaxed text-muted-foreground">
                The model flagged this event as an <span className="text-red-300 font-medium">attack</span> primarily because of <span className="text-cyan-300">27 failed login attempts within 90 seconds</span>, an <span className="text-cyan-300">abnormal packet size (4.8σ above baseline)</span>, and traffic to a <span className="text-cyan-300">suspicious port (4444)</span>. Combined with unusual user-agent entropy and low ASN reputation, prediction confidence reached <span className="text-red-300 font-semibold">0.96</span>.
              </p>
            </div>
          </Panel>

          <Panel className="xl:col-span-8" title="SHAP Feature Contributions" subtitle="Positive → toward attack · Negative → toward benign" accent="cyan">
            <div className="h-[300px]">
              <ResponsiveContainer>
                <BarChart data={data} layout="vertical" margin={{left: 100}}>
                  <XAxis type="number" domain={[-0.2, 0.5]} tickFormatter={(v)=>v.toFixed(2)}/>
                  <YAxis dataKey="name" type="category" width={180} tick={{fontSize:11, fill:"oklch(0.75 0.02 230)"}}/>
                  <Tooltip formatter={(v: number)=>v.toFixed(3)}/>
                  <RBar dataKey="contribution" radius={[4,4,4,4]}>
                    {data.map((f, i) => <Cell key={i} fill={f.contribution >= 0 ? "var(--cyber-red)" : "var(--cyber-cyan)"}/> )}
                  </RBar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel className="xl:col-span-8" title="Waterfall Analysis" subtitle="From baseline to final prediction">
            <Waterfall data={data}/>
          </Panel>

          <Panel className="xl:col-span-4" title="Feature Values" subtitle="At time of prediction">
            <ul className="divide-y divide-border/40">
              {shapFeatures.map(f => (
                <li key={f.name} className="flex items-center justify-between gap-2 py-2 text-[12px]">
                  <span className="font-mono text-cyan-300">{f.name}</span>
                  <span className="font-mono text-muted-foreground">{f.value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2 rounded border border-violet-500/30 bg-violet-500/5 p-2.5 text-[11px] text-violet-200">
              <Brain className="h-3.5 w-3.5"/> Explanation generated using TreeSHAP on ensemble output.
            </div>
          </Panel>
        </div>
      </PageContainer>
    </>
  );
}

function Waterfall({ data }: { data: Array<{ name: string; contribution: number }> }) {
  const base = 0.04;
  let running = base;
  const rows = data.map(d => { const start = running; running += d.contribution; return { name: d.name, start, end: running, c: d.contribution }; });
  const min = 0, max = 1;
  const scale = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground"><span>Baseline · {(base*100).toFixed(0)}%</span><span>Final · {(running*100).toFixed(0)}%</span></div>
      {rows.map((r,i)=>(
        <div key={i} className="flex items-center gap-3 text-[11px]">
          <span className="w-56 truncate font-mono text-cyan-300">{r.name}</span>
          <div className="relative h-4 flex-1 rounded bg-muted/30">
            <div className="absolute h-full rounded" style={{
              left: `${Math.min(scale(r.start), scale(r.end))}%`,
              width: `${Math.abs(scale(r.end) - scale(r.start))}%`,
              background: r.c >= 0 ? "linear-gradient(90deg, var(--cyber-red), transparent 140%)" : "linear-gradient(90deg, var(--cyber-cyan), transparent 140%)",
              boxShadow: r.c >= 0 ? "0 0 8px var(--cyber-red)" : "0 0 8px var(--cyber-cyan)"
            }}/>
          </div>
          <span className={`w-14 text-right font-mono ${r.c>=0?"text-red-300":"text-cyan-300"}`}>{r.c>=0?"+":""}{(r.c*100).toFixed(1)}%</span>
        </div>
      ))}
      <div className="mt-2 flex items-center gap-3 border-t border-border/60 pt-2 text-[11px]">
        <span className="w-56 font-semibold">Prediction</span>
        <div className="relative h-4 flex-1 rounded bg-muted/30">
          <div className="absolute inset-y-0 left-0 rounded" style={{width:`${scale(running)}%`, background:"linear-gradient(90deg, var(--cyber-red), var(--cyber-amber))"}}/>
        </div>
        <span className="w-14 text-right font-mono font-semibold text-red-300">{(running*100).toFixed(0)}%</span>
      </div>
    </div>
  );
}