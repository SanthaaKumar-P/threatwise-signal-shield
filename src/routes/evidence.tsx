import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, KPI, StatusPill } from "@/components/ui-bits";
import { evidence } from "@/lib/mock";
import { Download, Lock, ShieldCheck, Fingerprint } from "lucide-react";

export const Route = createFileRoute("/evidence")({
  head: () => ({ meta: [
    { title: "Digital Evidence Vault — ThreatZero Sentinel X" },
    { name: "description", content: "AES-256 encrypted evidence vault with hash integrity and chain of custody." },
  ]}),
  component: () => <Page/>,
});

function Page(){
  return (
    <>
      <PageHeader eyebrow="Forensics · Custody" title="Digital Evidence Vault"
        subtitle="AES-256-GCM at rest · WORM write-once storage · Court-admissible chain of custody"
        actions={<><StatusPill label="Vault · SEALED" tone="green"/><StatusPill label="HSM Key · Active" tone="cyan"/></>}/>
      <PageContainer>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <KPI label="Artefacts" value="12,481" tone="cyan"/>
          <KPI label="Total Size" value="41.2 TB" tone="cyan"/>
          <KPI label="Integrity Check" value="100%" tone="green"/>
          <KPI label="Pending Approval" value="4" tone="amber"/>
        </div>
        <Panel title="Latest Evidence" accent="cyan">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-left text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 pr-3">ID</th><th className="pr-3">Artefact</th><th className="pr-3">Size</th><th className="pr-3">Hash</th><th className="pr-3">Collected</th><th className="pr-3">Chain</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {evidence.map(e => (
                  <tr key={e.id} className="border-b border-border/30 last:border-0 hover:bg-muted/20">
                    <td className="py-2.5 pr-3 font-mono text-[11px] text-cyan-300">{e.id}</td>
                    <td className="pr-3 font-mono text-[11px]"><Lock className="mr-1 inline h-3 w-3 text-emerald-300"/>{e.name}</td>
                    <td className="pr-3 font-mono text-[11px] text-muted-foreground">{e.size}</td>
                    <td className="pr-3 font-mono text-[10px] text-cyan-300"><Fingerprint className="mr-1 inline h-3 w-3"/>{e.hash}</td>
                    <td className="pr-3 text-[11px]">{e.by}<div className="text-[10px] font-mono text-muted-foreground">{e.ts}</div></td>
                    <td className="pr-3"><div className="flex items-center gap-1 font-mono text-[11px] text-emerald-300"><ShieldCheck className="h-3 w-3"/>{e.chain} handoffs</div></td>
                    <td><button className="inline-flex items-center gap-1 rounded border border-cyan-500/40 bg-cyan-500/10 px-2 py-1 text-[11px] text-cyan-200"><Download className="h-3 w-3"/> Secure DL</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </PageContainer>
    </>
  );
}