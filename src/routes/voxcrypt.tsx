import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, StatusPill } from "@/components/ui-bits";
import { FileText, KeyRound, AudioLines, Radio, UserCheck, ScanLine, Unlock } from "lucide-react";

export const Route = createFileRoute("/voxcrypt")({
  head: () => ({ meta: [
    { title: "VoxCrypt — ThreatZero Sentinel X" },
    { name: "description", content: "Secure evidence communication via AES + adaptive audio steganography." },
    { property: "og:title", content: "VoxCrypt — ThreatZero Sentinel X" },
    { property: "og:description", content: "Secure evidence communication via AES + adaptive audio steganography." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ]}),
  component: () => <Page/>,
});

const steps = [
  { icon: FileText, label: "Incident Evidence", desc: "Artefacts sealed for transport" },
  { icon: KeyRound, label: "AES-256 Encryption", desc: "Session key wrapped with HSM key" },
  { icon: AudioLines, label: "Adaptive Steganography", desc: "Payload embedded into masked audio" },
  { icon: Radio, label: "Secure Transmission", desc: "Signed carrier delivered over channel" },
  { icon: UserCheck, label: "Receiver Auth", desc: "MFA + biometric attestation" },
  { icon: ScanLine, label: "Auto Extraction", desc: "Steg-resistant demux recovers cipher" },
  { icon: Unlock, label: "Auto Decryption", desc: "Payload decrypted · integrity re-verified" },
];

function Page(){
  return (
    <>
      <PageHeader eyebrow="Covert · Evidence Transport" title="VoxCrypt Pipeline"
        subtitle="Encrypted, steganographic evidence exchange for defence-grade communications"
        actions={<><StatusPill label="Channel · SECURE" tone="green"/><StatusPill label="Steg Detect · 0" tone="cyan"/></>}/>
      <PageContainer>
        <Panel title="Workflow" accent="violet">
          <div className="relative">
            <div className="hidden md:block absolute left-6 right-6 top-9 h-px bg-gradient-to-r from-cyan-400/20 via-violet-400/40 to-cyan-400/20"/>
            <ol className="grid gap-4 md:grid-cols-7">
              {steps.map((s, i) => (
                <li key={s.label} className="relative">
                  <div className="glass rounded-lg p-3 text-center">
                    <div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full border border-cyan-400/40 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-200 pulse-dot">
                      <s.icon className="h-5 w-5"/>
                    </div>
                    <div className="text-[11px] font-mono text-cyan-300">STEP {i+1}</div>
                    <div className="mt-1 text-[13px] font-semibold">{s.label}</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Panel>
        <div className="grid gap-4 xl:grid-cols-2">
          <Panel title="Carrier · adaptive audio" subtitle="Live spectrogram · masking headroom 18 dB">
            <Spectrogram/>
          </Panel>
          <Panel title="Transmission Log" subtitle="Signed handoffs">
            <ul className="divide-y divide-border/40 text-[12px] font-mono">
              {["14:03:11 · Payload sealed · SHA-256 9f2c…a41b","14:03:12 · Embedded 4.2 MB @ -32dB PSD","14:03:14 · Carrier signed (Ed25519)","14:03:15 · Sent → HQ-VAULT-01","14:03:17 · Recipient MFA + biometric OK","14:03:18 · Extract complete · 0 errors","14:03:19 · Decrypt verified · integrity OK"].map((l,i)=>(
                <li key={i} className="py-2 text-muted-foreground"><span className="text-cyan-300">→</span> {l}</li>
              ))}
            </ul>
          </Panel>
        </div>
      </PageContainer>
    </>
  );
}
function Spectrogram(){
  const bars = Array.from({length: 96}, (_,i)=> 20 + Math.round(60*Math.abs(Math.sin(i/4))*Math.abs(Math.cos(i/9))));
  return (
    <div className="flex h-[180px] items-end gap-[2px] rounded-md border border-border/60 bg-[oklch(0.10_0.02_250)] p-2">
      {bars.map((h,i)=>(<div key={i} className="flex-1 rounded-t" style={{height:`${h}%`, background:`linear-gradient(180deg, oklch(0.86 0.17 200), oklch(0.60 0.22 280 / 0.4))`, boxShadow:"0 0 4px oklch(0.86 0.17 200 / 0.5)"}}/>))}
    </div>
  );
}