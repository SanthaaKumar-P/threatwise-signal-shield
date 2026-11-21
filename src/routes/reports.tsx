import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageContainer, Panel, StatusPill } from "@/components/ui-bits";
import {
  FileText,
  Crown,
  ShieldCheck,
  Grid3x3,
  Shield,
  Siren,
  Fingerprint,
  Download,
} from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Report Generator — ThreatZero Sentinel X" },
      {
        name: "description",
        content: "Generate SOC, executive, incident, DFIR, compliance and MITRE reports.",
      },
      { property: "og:title", content: "Report Generator — ThreatZero Sentinel X" },
      {
        property: "og:description",
        content: "Generate SOC, executive, incident, DFIR, compliance and MITRE reports.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <Page />,
});

const kinds = [
  { icon: ShieldCheck, name: "SOC Report", desc: "Operational overview · alerts · KPIs" },
  { icon: Crown, name: "Executive Report", desc: "Boardroom · risk · financial impact" },
  { icon: Siren, name: "Incident Report", desc: "Per-incident narrative · impact · actions" },
  { icon: Fingerprint, name: "DFIR Report", desc: "Court-admissible forensic timeline" },
  { icon: Shield, name: "Compliance Report", desc: "SOC2 · ISO · NIST · HIPAA" },
  { icon: Grid3x3, name: "MITRE Report", desc: "Coverage · TTPs · adversary map" },
  { icon: FileText, name: "NIST Report", desc: "CSF maturity · function scores" },
];

function Page() {
  return (
    <>
      <PageHeader
        eyebrow="Reporting"
        title="Report Generator"
        subtitle="One-click enterprise-grade reports · PDF · JSON · CSV"
        actions={<StatusPill label="Templates · v4" tone="cyan" />}
      />
      <PageContainer>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {kinds.map((k) => (
            <Panel key={k.name} title={k.name}>
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-md border border-cyan-400/40 bg-cyan-500/10 text-cyan-300">
                  <k.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 text-sm text-muted-foreground">{k.desc}</div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["PDF", "JSON", "CSV"].map((f) => (
                  <button
                    key={f}
                    className="inline-flex items-center gap-1 rounded-md border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-1 text-[11px] text-cyan-200 hover:bg-cyan-500/20"
                  >
                    <Download className="h-3 w-3" /> {f}
                  </button>
                ))}
              </div>
            </Panel>
          ))}
        </div>
      </PageContainer>
    </>
  );
}
