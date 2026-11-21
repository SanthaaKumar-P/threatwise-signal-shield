import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, StatusPill } from "@/components/ui-bits";
import { copilotThread } from "@/lib/mock";
import { useState } from "react";
import { Send, Sparkles, Zap, FileText, Shield, Grid3x3, Crown, ClipboardList } from "lucide-react";

export const Route = createFileRoute("/soc-copilot")({
  head: () => ({
    meta: [
      { title: "AI SOC Copilot — ThreatZero Sentinel X" },
      {
        name: "description",
        content: "Cyber-specialist AI assistant for analysts, incident responders and CISOs.",
      },
      { property: "og:title", content: "AI SOC Copilot — ThreatZero Sentinel X" },
      {
        property: "og:description",
        content: "Cyber-specialist AI assistant for analysts, incident responders and CISOs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <Page />,
});

const prompts = [
  { icon: Zap, label: "Explain Incident" },
  { icon: Grid3x3, label: "Explain MITRE Technique" },
  { icon: Shield, label: "Recommend Actions" },
  { icon: FileText, label: "Summarise Threat" },
  { icon: Crown, label: "Executive Summary" },
  { icon: ClipboardList, label: "Generate DFIR Report" },
  { icon: Sparkles, label: "Explain SHAP Output" },
];

function Page() {
  const [input, setInput] = useState("");
  return (
    <>
      <PageHeader
        eyebrow="AI · SOC Copilot"
        title="Sentinel Copilot"
        subtitle="Grounded on your telemetry · MITRE ATT&CK · NIST CSF · IOC feeds · playbooks"
        actions={
          <>
            <StatusPill label="Model · Sentinel-XL" tone="cyan" />
            <StatusPill label="RAG · Enabled" tone="cyan" />
          </>
        }
      />
      <PageContainer>
        <div className="grid gap-4 xl:grid-cols-12">
          <Panel
            className="xl:col-span-3"
            title="Fast Prompts"
            subtitle="One-tap analyst actions"
            accent="violet"
          >
            <div className="space-y-1.5">
              {prompts.map((p) => (
                <button
                  key={p.label}
                  className="flex w-full items-center gap-2.5 rounded-md border border-border/60 bg-background/40 px-3 py-2 text-left text-[12px] hover:border-cyan-400/40 hover:bg-cyan-500/5"
                >
                  <p.icon className="h-3.5 w-3.5 text-cyan-300" /> {p.label}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded border border-cyan-400/30 bg-cyan-400/5 p-3 text-[11px] text-muted-foreground">
              <div className="mb-1 font-mono text-cyan-300">CONTEXT</div>
              INC-24518 · Golden Ticket · AD-DC-01 · SEV-1
            </div>
          </Panel>

          <Panel
            className="xl:col-span-9"
            title="Conversation"
            subtitle="Grounded answers · citations from live telemetry"
          >
            <div className="flex flex-col gap-3">
              {copilotThread.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                  {m.role === "assistant" && (
                    <div className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-cyan-500/30 to-violet-600/30 border border-cyan-400/40 text-cyan-200">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-lg px-3.5 py-2.5 text-[13px] ${m.role === "user" ? "bg-cyan-500/15 text-cyan-100 border border-cyan-400/30" : "glass"}`}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: m.text
                          .replace(/\*\*(.+?)\*\*/g, '<b class="text-cyan-300">$1</b>')
                          .replace(
                            /`(.+?)`/g,
                            '<code class="font-mono text-violet-300 bg-violet-500/10 px-1 rounded">$1</code>',
                          ),
                      }}
                    />
                  </div>
                  {m.role === "user" && (
                    <div className="grid h-8 w-8 place-items-center rounded-md border border-border bg-muted/40 text-[10px] font-mono">
                      CO
                    </div>
                  )}
                </div>
              ))}
              <div className="flex gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-cyan-500/30 to-violet-600/30 border border-cyan-400/40 text-cyan-200">
                  <Sparkles className="h-4 w-4 blink" />
                </div>
                <div className="glass rounded-lg px-3.5 py-2.5 text-[12px] text-muted-foreground">
                  <span className="font-mono">Analysing 8 telemetry streams · 3 playbooks…</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 p-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Sentinel Copilot…"
                className="flex-1 bg-transparent px-2 py-1.5 text-sm outline-none"
              />
              <button className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500/20 border border-cyan-400/50 px-3 py-1.5 text-xs font-medium text-cyan-100 hover:bg-cyan-500/30">
                <Send className="h-3.5 w-3.5" /> Send
              </button>
            </div>
          </Panel>
        </div>
      </PageContainer>
    </>
  );
}
