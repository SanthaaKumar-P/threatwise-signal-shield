import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, KPI, Bar, StatusPill } from "@/components/ui-bits";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar, PolarAngleAxis, Line, LineChart } from "recharts";

export const Route = createFileRoute("/threat-detection")({
  head: () => ({ meta: [
    { title: "AI Threat Detection — ThreatZero Sentinel X" },
    { name: "description", content: "Random Forest and XGBoost live detection with confusion matrix, ROC and model health." },
    { property: "og:title", content: "AI Threat Detection — ThreatZero Sentinel X" },
    { property: "og:description", content: "Random Forest and XGBoost live detection with confusion matrix, ROC and model health." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
  component: () => <Page />,
});

const roc = Array.from({length: 21}, (_,i)=>{ const x=i/20; return { fpr: x, tpr: Math.min(1, Math.pow(x, 0.35)) }; });
const history = Array.from({length: 30}, (_,i)=>({ t:`T-${29-i}`, rf: 60 + Math.round(30*Math.sin(i/3)+i*0.4), xgb: 65 + Math.round(28*Math.cos(i/3.5)+i*0.5) }));
const cm = [[4821, 42, 6, 1],[38, 3902, 24, 5],[9, 21, 2711, 18],[2, 4, 12, 1988]];
const labels = ["Benign","Recon","Exploit","C2"];

function Page() {
  return (
    <>
      <PageHeader eyebrow="Machine Learning · Detection Engine" title="AI Threat Detection Engine" subtitle="Ensemble ML pipeline · Random Forest × XGBoost · SHAP-explained"
        actions={<><StatusPill label="Models · Healthy" tone="green" /><StatusPill label="Drift · 0.03" tone="cyan" /></>}
      />
      <PageContainer>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
          <KPI label="Precision" value="0.987" delta={1} tone="cyan" />
          <KPI label="Recall" value="0.972" delta={2} tone="green" />
          <KPI label="F1 Score" value="0.979" delta={1} tone="green" />
          <KPI label="AUC" value="0.994" delta={0} tone="violet" />
          <KPI label="False Positive" value="0.4%" delta={-15} tone="amber" />
          <KPI label="Inference" value="8ms" delta={-4} tone="cyan" />
        </div>

        <div className="grid gap-4 xl:grid-cols-12">
          <Panel className="xl:col-span-4" title="Random Forest" subtitle="500 trees · depth 24" accent="cyan"
            actions={<StatusPill label="ONLINE" tone="green" />}>
            <ModelCard acc={98.7} conf={0.94} preds="1,284,391" />
          </Panel>
          <Panel className="xl:col-span-4" title="XGBoost" subtitle="800 boosters · η 0.06" accent="violet"
            actions={<StatusPill label="ONLINE" tone="green" />}>
            <ModelCard acc={98.2} conf={0.96} preds="1,284,391" tone="violet" />
          </Panel>
          <Panel className="xl:col-span-4" title="Ensemble Vote" subtitle="Weighted soft voting" accent="green"
            actions={<StatusPill label="ARMED" tone="green" />}>
            <ModelCard acc={99.1} conf={0.98} preds="1,284,391" tone="green" />
          </Panel>

          <Panel className="xl:col-span-8" title="Prediction History · 30 windows" subtitle="Attack probability per model">
            <div className="h-[260px]">
              <ResponsiveContainer>
                <AreaChart data={history}>
                  <defs>
                    <linearGradient id="hrf" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--cyber-cyan)" stopOpacity={0.5}/><stop offset="100%" stopColor="var(--cyber-cyan)" stopOpacity={0}/></linearGradient>
                    <linearGradient id="hxgb" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--cyber-violet)" stopOpacity={0.5}/><stop offset="100%" stopColor="var(--cyber-violet)" stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="t"/><YAxis/><Tooltip/>
                  <Area dataKey="rf" stroke="var(--cyber-cyan)" fill="url(#hrf)" strokeWidth={2}/>
                  <Area dataKey="xgb" stroke="var(--cyber-violet)" fill="url(#hxgb)" strokeWidth={2}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel className="xl:col-span-4" title="ROC Curve" subtitle="AUC · 0.994">
            <div className="h-[260px]">
              <ResponsiveContainer>
                <LineChart data={roc}>
                  <CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="fpr" tickFormatter={(v)=>v.toFixed(1)}/><YAxis tickFormatter={(v)=>v.toFixed(1)}/><Tooltip/>
                  <Line dataKey="tpr" stroke="var(--cyber-cyan)" dot={false} strokeWidth={2.5}/>
                  <Line dataKey="fpr" stroke="oklch(0.50 0.03 250 / 0.6)" dot={false} strokeDasharray="4 4"/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel className="xl:col-span-6" title="Confusion Matrix" subtitle="Last 24h · normalized on rows">
            <div className="grid grid-cols-[auto_repeat(4,1fr)] gap-1 text-center">
              <div />
              {labels.map(l=><div key={l} className="py-1 text-[10px] font-mono uppercase text-muted-foreground">{l}</div>)}
              {cm.map((row, i)=>(
                <MatrixRow key={i} row={row} label={labels[i]} idx={i} />
              ))}
            </div>
          </Panel>

          <Panel className="xl:col-span-6" title="Model Health" subtitle="Live drift · latency · memory">
            <div className="grid grid-cols-2 gap-3">
              <HealthTile label="Data Drift" value="0.03 KL" tone="cyan" />
              <HealthTile label="Concept Drift" value="stable" tone="green" />
              <HealthTile label="Memory" value="6.4 GB / 16" tone="cyan" />
              <HealthTile label="Throughput" value="18.2k /s" tone="green" />
              <HealthTile label="GPU Util" value="62%" tone="amber" />
              <HealthTile label="Retrain ETA" value="03:14:22" tone="violet" />
            </div>
            <div className="mt-4 space-y-2">
              <Bar label="Feature integrity" value={98} tone="cyan"/>
              <Bar label="Label pipeline" value={94} tone="green"/>
              <Bar label="Backtest agreement" value={91} tone="violet"/>
            </div>
          </Panel>
        </div>
      </PageContainer>
    </>
  );
}

function MatrixRow({ row, label, idx }: { row: number[]; label: string; idx: number }) {
  const total = row.reduce((a,b)=>a+b,0);
  return (
    <>
      <div className="grid place-items-center text-[10px] font-mono uppercase text-muted-foreground">{label}</div>
      {row.map((v, j) => {
        const pct = v/total;
        const bg = idx===j ? `oklch(0.86 0.17 200 / ${0.15 + pct*0.6})` : `oklch(0.68 0.24 22 / ${pct * 0.9 + 0.05})`;
        return <div key={j} className="rounded p-2 font-mono text-[11px]" style={{background:bg}}>
          {v.toLocaleString()}
          <div className="text-[9px] opacity-70">{(pct*100).toFixed(1)}%</div>
        </div>;
      })}
    </>
  );
}

function ModelCard({ acc, conf, preds, tone = "cyan" }: { acc: number; conf: number; preds: string; tone?: "cyan"|"violet"|"green" }) {
  const color = tone === "violet" ? "var(--cyber-violet)" : tone === "green" ? "var(--cyber-green)" : "var(--cyber-cyan)";
  return (
    <div>
      <div className="h-[140px] relative">
        <ResponsiveContainer>
          <RadialBarChart innerRadius="65%" outerRadius="100%" data={[{v: acc, fill: color}]} startAngle={220} endAngle={-40}>
            <PolarAngleAxis type="number" domain={[0,100]} tick={false}/>
            <RadialBar dataKey="v" background={{fill:"oklch(0.28 0.03 250 / 0.6)"}} cornerRadius={12}/>
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="text-center">
            <div className="text-2xl font-semibold" style={{color}}>{acc}%</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Accuracy</div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-center">
        <div className="rounded border border-border/60 p-2"><div className="text-sm font-semibold">{conf}</div><div className="text-[9px] font-mono uppercase text-muted-foreground">Confidence</div></div>
        <div className="rounded border border-border/60 p-2"><div className="text-sm font-semibold">{preds}</div><div className="text-[9px] font-mono uppercase text-muted-foreground">Predictions 24h</div></div>
      </div>
    </div>
  );
}
function HealthTile({label,value,tone}:{label:string;value:string;tone:"cyan"|"green"|"amber"|"violet"}){
  const color = { cyan:"text-cyan-300", green:"text-emerald-300", amber:"text-amber-300", violet:"text-violet-300" }[tone];
  return <div className="rounded border border-border/60 p-3"><div className="text-[10px] font-mono uppercase text-muted-foreground">{label}</div><div className={`mt-1 text-lg font-semibold ${color}`}>{value}</div></div>;
}