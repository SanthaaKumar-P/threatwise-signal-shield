export const incidents = [
  { id: "INC-24518", title: "APT29 lateral movement · Golden Ticket forgery", sev: "critical" as const, mitre: ["T1558.001","T1021.002"], asset: "AD-DC-01 · EU-WEST", owner: "Team Nightshade", status: "Contained", score: 96, ago: "3m" },
  { id: "INC-24512", title: "Cobalt Strike beacon · C2 exfil attempt", sev: "critical" as const, mitre: ["T1071.001","T1041"], asset: "WKS-4482 · Finance", owner: "SOC L2 · Priya", status: "Investigating", score: 91, ago: "11m" },
  { id: "INC-24509", title: "Suspicious OAuth grant · O365 tenant admin", sev: "high" as const, mitre: ["T1550.001"], asset: "id.corp / user 8834", owner: "IR · Marcus", status: "Blocked", score: 82, ago: "26m" },
  { id: "INC-24501", title: "Ransomware precursor · shadow copy deletion", sev: "high" as const, mitre: ["T1490"], asset: "SRV-BKP-14", owner: "SOC L3", status: "Isolated", score: 78, ago: "48m" },
  { id: "INC-24487", title: "Unusual privilege escalation · sudo pipe", sev: "medium" as const, mitre: ["T1548.003"], asset: "LNX-EDGE-22", owner: "Threat Hunter", status: "Analysing", score: 63, ago: "1h" },
  { id: "INC-24476", title: "DNS tunneling detected · 3.1kbps sustained", sev: "medium" as const, mitre: ["T1071.004"], asset: "NET-CORE-DNS-01", owner: "Auto-Response", status: "Contained", score: 59, ago: "1h" },
  { id: "INC-24462", title: "Anomalous SMB · admin$ share touch", sev: "low" as const, mitre: ["T1021.002"], asset: "WKS-2210", owner: "SOC L1", status: "Closed", score: 32, ago: "2h" },
];

export const threatFeed = [
  { ts: "14:02:11", src: "185.220.101.44", country: "RU", sig: "T1190 · Exploit Public-App", sev: "critical" as const },
  { ts: "14:01:58", src: "45.153.160.140", country: "CN", sig: "T1110.001 · Password Bruteforce", sev: "high" as const },
  { ts: "14:01:47", src: "192.42.116.16", country: "NL", sig: "T1046 · Network Scan", sev: "medium" as const },
  { ts: "14:01:31", src: "146.70.117.58", country: "IR", sig: "T1071.001 · Web C2", sev: "high" as const },
  { ts: "14:01:22", src: "141.98.10.63", country: "LT", sig: "T1595 · Recon Sweep", sev: "low" as const },
  { ts: "14:01:04", src: "80.66.83.29", country: "RU", sig: "T1078 · Valid Account", sev: "high" as const },
  { ts: "14:00:52", src: "162.247.74.204", country: "US", sig: "T1027 · Obfuscation", sev: "medium" as const },
  { ts: "14:00:33", src: "23.106.34.44", country: "SG", sig: "T1105 · Ingress Tool", sev: "critical" as const },
];

export const geoPoints: Array<{ x: number; y: number; sev: "critical"|"high"|"medium"|"low"; label: string }> = [
  { x: 250, y: 128, sev: "critical", label: "Moscow" },
  { x: 132, y: 152, sev: "high", label: "London" },
  { x: 105, y: 148, sev: "medium", label: "Dublin" },
  { x: 155, y: 168, sev: "medium", label: "Berlin" },
  { x: 310, y: 155, sev: "critical", label: "Tehran" },
  { x: 345, y: 145, sev: "high", label: "Almaty" },
  { x: 402, y: 170, sev: "critical", label: "Beijing" },
  { x: 388, y: 210, sev: "high", label: "Bengaluru" },
  { x: 50, y: 195, sev: "high", label: "Washington" },
  { x: 88, y: 220, sev: "medium", label: "Bogota" },
  { x: 442, y: 195, sev: "medium", label: "Tokyo" },
  { x: 460, y: 275, sev: "low", label: "Sydney" },
  { x: 168, y: 245, sev: "medium", label: "Lagos" },
];

export const killChain = [
  { stage: "Recon", value: 100, tone: "cyan" as const },
  { stage: "Weaponize", value: 92, tone: "cyan" as const },
  { stage: "Deliver", value: 78, tone: "amber" as const },
  { stage: "Exploit", value: 46, tone: "amber" as const },
  { stage: "Install", value: 22, tone: "red" as const },
  { stage: "C2", value: 8, tone: "red" as const },
  { stage: "Actions", value: 2, tone: "red" as const },
];

export const timeline = Array.from({ length: 24 }, (_, i) => ({
  h: `${String(i).padStart(2,"0")}:00`,
  detections: 40 + Math.round(60 * Math.sin(i / 3) + 40 * Math.cos(i / 5) + i * 3),
  blocked: 30 + Math.round(50 * Math.sin(i / 3.2 + 1) + 30 * Math.cos(i / 4) + i * 2.4),
  critical: Math.max(0, Math.round(6 * Math.sin(i / 4) + 5 + (i > 15 ? i - 15 : 0))),
}));

export const mitreTactics = [
  "Initial Access","Execution","Persistence","Priv. Escalation","Defense Evasion",
  "Credential Access","Discovery","Lateral Movement","Collection","C2","Exfiltration","Impact",
];
// heat 0-4 per tactic per column (mock)
export const mitreHeat: number[][] = mitreTactics.map((_, i) =>
  Array.from({ length: 8 }, (_, j) => (i * 7 + j * 3 + (i === 4 || i === 7 ? 6 : 0)) % 5)
);

export const endpoints = [
  { id: "SRV-DC-01", type: "AD Controller", os: "Windows Server 2022", cpu: 42, mem: 61, procs: 218, risk: 78, status: "at-risk" as const, ip: "10.4.1.11" },
  { id: "SRV-BKP-14", type: "Backup Server", os: "Ubuntu 24.04", cpu: 18, mem: 44, procs: 141, risk: 92, status: "compromised" as const, ip: "10.4.6.14" },
  { id: "WKS-4482", type: "Analyst Laptop", os: "Windows 11 Pro", cpu: 71, mem: 82, procs: 305, risk: 88, status: "isolated" as const, ip: "10.9.22.42" },
  { id: "LNX-EDGE-22", type: "Edge Node", os: "Debian 12", cpu: 22, mem: 39, procs: 92, risk: 46, status: "monitoring" as const, ip: "10.2.0.22" },
  { id: "IOT-CAM-118", type: "IoT Camera", os: "Embedded", cpu: 12, mem: 28, procs: 14, risk: 34, status: "healthy" as const, ip: "10.7.44.118" },
  { id: "MIL-RAD-04", type: "Radar Node", os: "Hardened Linux", cpu: 39, mem: 55, procs: 68, risk: 12, status: "healthy" as const, ip: "10.20.1.4" },
  { id: "WKS-2210", type: "Finance WKST", os: "Windows 11", cpu: 27, mem: 34, procs: 187, risk: 52, status: "at-risk" as const, ip: "10.9.4.10" },
];

export const shapFeatures = [
  { name: "failed_login_attempts", contribution: +0.38, value: "27 in 90s" },
  { name: "packet_size_anomaly_score", contribution: +0.24, value: "4.8σ" },
  { name: "dst_port", contribution: +0.17, value: "4444" },
  { name: "user_agent_entropy", contribution: +0.09, value: "6.2" },
  { name: "geo_asn_reputation", contribution: +0.07, value: "malicious" },
  { name: "session_duration", contribution: -0.05, value: "long" },
  { name: "tls_version", contribution: -0.03, value: "TLS 1.3" },
];

export const nist = [
  { fn: "Identify", score: 4.1, prev: 3.6, color: "var(--cyber-cyan)" },
  { fn: "Protect", score: 3.8, prev: 3.4, color: "var(--cyber-blue)" },
  { fn: "Detect", score: 4.4, prev: 3.9, color: "var(--cyber-green)" },
  { fn: "Respond", score: 3.9, prev: 3.2, color: "var(--cyber-amber)" },
  { fn: "Recover", score: 3.5, prev: 3.0, color: "var(--cyber-violet)" },
];

export const departments = [
  { name: "Finance", risk: 62, incidents: 14, trend: -8 },
  { name: "R&D", risk: 74, incidents: 21, trend: 12 },
  { name: "Operations", risk: 41, incidents: 6, trend: -3 },
  { name: "HR", risk: 33, incidents: 2, trend: -12 },
  { name: "Executive", risk: 58, incidents: 4, trend: 5 },
  { name: "Field Ops", risk: 69, incidents: 11, trend: 9 },
];

export const iocs = [
  { type: "IP", value: "185.220.101.44", tag: "TOR exit · APT29", sightings: 148, first: "2025-07-11", sev: "critical" as const },
  { type: "SHA-256", value: "9f2c…a41b", tag: "Cobalt Strike beacon", sightings: 62, first: "2025-07-18", sev: "critical" as const },
  { type: "Domain", value: "cdn-static-updates[.]top", tag: "Fake update C2", sightings: 44, first: "2025-07-14", sev: "high" as const },
  { type: "URL", value: "hxxps://pay.reset-2fa[.]com", tag: "Credential phish", sightings: 33, first: "2025-07-20", sev: "high" as const },
  { type: "Email", value: "notify@secure-dhl[.]net", tag: "Business email compromise", sightings: 18, first: "2025-07-21", sev: "medium" as const },
  { type: "CVE", value: "CVE-2025-31402", tag: "Fortinet SSL-VPN", sightings: 502, first: "2025-07-09", sev: "critical" as const },
];

export const threatActors = [
  { name: "APT29 · Cozy Bear", origin: "Russia (SVR)", focus: "Gov · Diplomatic", ttps: 42, active: true },
  { name: "APT41 · Winnti", origin: "China (MSS)", focus: "Health · Telecom", ttps: 38, active: true },
  { name: "Lazarus", origin: "DPRK (RGB)", focus: "Finance · Crypto", ttps: 51, active: true },
  { name: "OilRig · APT34", origin: "Iran (MOIS)", focus: "Energy · Defence", ttps: 27, active: true },
  { name: "FIN7", origin: "Criminal", focus: "Retail · Hospitality", ttps: 33, active: false },
];

export const evidence = [
  { id: "EV-77821", name: "memdump_wks4482_2025-07-25.raw", size: "8.4 GB", hash: "SHA-256 · 9c31…e2a4", by: "Priya S.", ts: "14:11", chain: 4 },
  { id: "EV-77820", name: "srv-bkp-14_disk_image.dd", size: "512 GB", hash: "SHA-256 · 44a1…9b02", by: "Marcus D.", ts: "13:58", chain: 3 },
  { id: "EV-77819", name: "pcap_c2_beacon_15min.pcapng", size: "1.2 GB", hash: "SHA-256 · f7d8…22c1", by: "Auto-IR", ts: "13:42", chain: 5 },
  { id: "EV-77818", name: "adfs_authlogs_export.jsonl", size: "268 MB", hash: "SHA-256 · 33b0…afe9", by: "Aarav R.", ts: "13:20", chain: 2 },
];

export const copilotThread = [
  { role: "user" as const, text: "Explain incident INC-24518 for the CISO." },
  { role: "assistant" as const, text: "INC-24518 shows a **Golden Ticket** forgery on AD-DC-01 originating from Team Nightshade region EU-WEST. Attacker acquired KRBTGT-equivalent access (T1558.001), then attempted lateral movement to file servers via SMB admin shares (T1021.002). Confidence 0.96. Blast radius: 4 domain hosts, 1 file share. Auto-containment isolated 3 endpoints; recommend forced KRBTGT rotation ×2, invalidate all TGTs, and hunt for persistence via Skeleton Key." },
  { role: "user" as const, text: "Recommend response actions." },
  { role: "assistant" as const, text: "1) Rotate KRBTGT password twice, 10h apart. 2) Force-logoff all sessions, invalidate Kerberos tickets. 3) Quarantine AD-DC-01 to management VLAN. 4) Hunt DCSync (event 4662) across last 30 days. 5) Trigger playbook `PB-AD-Golden-Ticket-Response` (steps 1-14). 6) Notify CERT-IN & legal per SOP 4.2." },
];