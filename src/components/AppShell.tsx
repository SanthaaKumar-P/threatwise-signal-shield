import { Link, useRouterState } from "@tanstack/react-router";
import {
  Shield, Radar, Brain, Cpu, Network, MessageSquareCode, Grid3x3,
  GaugeCircle, Siren, GitBranch, Lock, AudioLines, Globe2,
  Crown, FileBarChart2, Rocket, Bell, Search, User2, Activity,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const NAV = [
  { group: "Command", items: [
    { to: "/", label: "Mission Command", icon: GaugeCircle, code: "MC-01" },
    { to: "/executive", label: "Executive Dashboard", icon: Crown, code: "EX-01" },
  ]},
  { group: "Detect", items: [
    { to: "/threat-detection", label: "AI Threat Detection", icon: Radar, code: "AI-02" },
    { to: "/explainable-ai", label: "Explainable AI (SHAP)", icon: Brain, code: "XAI-03" },
    { to: "/threat-intel", label: "Threat Intelligence", icon: Globe2, code: "TI-04" },
  ]},
  { group: "Respond", items: [
    { to: "/edr", label: "Endpoint Detection", icon: Cpu, code: "EDR-05" },
    { to: "/xdr", label: "Extended Detection", icon: Network, code: "XDR-06" },
    { to: "/incidents", label: "Incident Response", icon: Siren, code: "IR-07" },
    { to: "/soc-copilot", label: "AI SOC Copilot", icon: MessageSquareCode, code: "AI-08" },
  ]},
  { group: "Intelligence", items: [
    { to: "/mitre", label: "MITRE ATT&CK", icon: Grid3x3, code: "MT-09" },
    { to: "/nist", label: "NIST CSF", icon: Shield, code: "NI-10" },
  ]},
  { group: "Forensics", items: [
    { to: "/dfir", label: "DFIR Timeline", icon: GitBranch, code: "DF-11" },
    { to: "/evidence", label: "Evidence Vault", icon: Lock, code: "EV-12" },
    { to: "/voxcrypt", label: "VoxCrypt", icon: AudioLines, code: "VX-13" },
  ]},
  { group: "Reporting", items: [
    { to: "/reports", label: "Report Generator", icon: FileBarChart2, code: "RP-14" },
    { to: "/roadmap", label: "Upcoming Features", icon: Rocket, code: "R&D" },
  ]},
];

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return <span className="font-mono text-xs text-muted-foreground">--:--:-- UTC</span>;
  const hh = now.toISOString().substring(11, 19);
  return <span className="font-mono text-xs text-muted-foreground tracking-wider">{hh} UTC</span>;
}

function Ticker() {
  const items = [
    "SEV-1 · APT29 lateral movement blocked · EU-WEST-01",
    "SEV-2 · Ransomware precursor · GOV-SEG-04 · contained",
    "IOC · 46.161.27.94 · Cobalt Strike beacon",
    "CVE-2025-31402 · Fortinet SSL-VPN · patch released",
    "MITRE T1059.001 · PowerShell abuse ↑ 34%",
    "SEV-3 · Suspicious OAuth grant · finance.corp",
    "Kill-chain interrupted at C2 stage · endpoint DEF-8842",
    "NIST Detect maturity ↑ to 4.2 / 5.0",
  ];
  const track = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border/60 bg-background/40 backdrop-blur">
      <div className="flex whitespace-nowrap ticker-track">
        {track.map((t, i) => (
          <div key={i} className="flex items-center gap-3 px-6 py-1.5 text-xs font-mono text-muted-foreground">
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${t.startsWith("SEV-1") ? "bg-cyber-red" : t.startsWith("SEV-2") ? "bg-cyber-amber" : "bg-cyber-cyan"}`} />
            <span>{t}</span>
            <span className="opacity-30">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="flex h-14 items-center gap-4 px-5">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-cyan-400/30 to-blue-600/30 border border-cyan-400/40">
                <Shield className="h-4 w-4 text-cyan-300" />
              </div>
              <div className="pulse-dot absolute -inset-0.5 rounded-md" />
            </div>
            <div className="leading-tight">
              <div className="text-[13px] font-semibold tracking-wide">
                THREATZERO <span className="neon-text">SENTINEL X</span>
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                AI Autonomous Cyber Defence Command
              </div>
            </div>
          </div>

          <div className="mx-6 hidden flex-1 md:block">
            <div className="relative max-w-xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search incidents · IOCs · MITRE techniques · assets…"
                className="h-9 w-full rounded-md bg-background/60 border border-border pl-9 pr-24 text-sm outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-muted/50 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">⌘K</kbd>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-md border border-cyber-green/40 bg-cyber-green/5 px-2.5 py-1 md:flex">
              <span className="h-2 w-2 rounded-full bg-cyber-green shadow-[0_0_10px_var(--cyber-green)]" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyber-green">DEFCON&nbsp;3 · Elevated</span>
            </div>
            <Clock />
            <button className="relative rounded-md border border-border p-2 hover:bg-muted/50">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-cyber-red px-1 text-[9px] font-bold text-white">7</span>
            </button>
            <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-2.5 py-1.5">
              <div className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-[10px] font-bold text-black">CO</div>
              <div className="leading-tight">
                <div className="text-xs font-semibold">Cmdr. Aarav Rao</div>
                <div className="text-[10px] font-mono text-muted-foreground">CLEARANCE · TS/SCI</div>
              </div>
            </div>
          </div>
        </div>
        <Ticker />
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="sticky top-[calc(3.5rem+30px)] hidden h-[calc(100vh-3.5rem-30px)] w-64 shrink-0 overflow-y-auto border-r border-border/60 bg-sidebar/60 backdrop-blur-xl lg:block">
          <nav className="p-3">
            {NAV.map((g) => (
              <div key={g.group} className="mb-4">
                <div className="mb-1.5 flex items-center gap-2 px-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                  <span>{g.group}</span>
                  <div className="divider-cyber flex-1" />
                </div>
                <ul className="space-y-0.5">
                  {g.items.map((it) => {
                    const active = pathname === it.to;
                    const Icon = it.icon;
                    return (
                      <li key={it.to}>
                        <Link
                          to={it.to}
                          className={`group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition ${
                            active
                              ? "bg-gradient-to-r from-cyan-500/20 to-transparent text-foreground shadow-[inset_2px_0_0_var(--cyber-cyan)]"
                              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                          }`}
                        >
                          <Icon className={`h-4 w-4 ${active ? "text-cyan-300" : ""}`} />
                          <span className="flex-1 truncate">{it.label}</span>
                          <span className="hidden font-mono text-[9px] opacity-40 group-hover:inline">{it.code}</span>
                          {active && <ChevronRight className="h-3 w-3 text-cyan-300" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            <div className="mt-6 rounded-lg border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-3">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-cyan-300">
                <Activity className="h-3.5 w-3.5" /> Autonomous Agents
              </div>
              <div className="mt-2 space-y-1 text-[11px]">
                {["Detection","Correlation","MITRE","Response","Reporting"].map((a)=>(
                  <div key={a} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{a}</span>
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyber-green shadow-[0_0_6px_var(--cyber-green)]" />
                      <span className="font-mono text-cyber-green">ONLINE</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-md border border-border/60 px-2.5 py-2 text-[10px] font-mono text-muted-foreground">
              <span>NODE · SOC-PRIMARY</span>
              <User2 className="h-3 w-3" />
            </div>
          </nav>
        </aside>

        {/* Main */}
        <main className="min-h-[calc(100vh-3.5rem-30px)] flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}