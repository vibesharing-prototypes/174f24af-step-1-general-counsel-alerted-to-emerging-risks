"use client";

import React, { useState } from "react";
import { StakeholderFooter, PrototypeControlLink } from "../StakeholderFooter";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StageItem {
  label: string;
  value?: string;
  status?: "complete" | "active" | "missing" | "pending" | "ai";
}

interface Stage {
  id: number;
  title: string;
  icon: string;
  color: string;
  glow: string;
  bg: string;
  border: string;
  inputs: string[];
  transformation: string;
  outputs: StageItem[];
  status: "complete" | "active" | "pending";
  aiAssisted: boolean;
}

interface Evidence {
  id: string;
  title: string;
  type: string;
  stage: number;
  summary: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const STAGES: Stage[] = [
  {
    id: 1,
    title: "External Signal Detection",
    icon: "radar",
    color: "#f87171",
    glow: "#ef4444",
    bg: "#450a0a",
    border: "#7f1d1d",
    inputs: ["Global news feeds", "Regulatory filings", "Geopolitical intelligence"],
    transformation: "AI monitors 14,000+ sources and correlates signals to enterprise risk taxonomy",
    outputs: [
      { label: "Geopolitical escalation in Taiwan Strait", status: "complete" },
      { label: "Material change in risk environment flagged", status: "complete" },
      { label: "Signal confidence", value: "92%", status: "ai" },
    ],
    status: "complete",
    aiAssisted: true,
  },
  {
    id: 2,
    title: "Internal Exposure Mapping",
    icon: "map",
    color: "#fb923c",
    glow: "#f97316",
    bg: "#431407",
    border: "#9a3412",
    inputs: ["Supplier database", "BOM analysis", "Revenue attribution models"],
    transformation: "AI maps external signal to internal dependency graph and calculates exposure",
    outputs: [
      { label: "Taiwan semiconductor suppliers identified", value: "47%", status: "complete" },
      { label: "Product X revenue exposure", value: "$950M", status: "complete" },
      { label: "Product Y revenue exposure", value: "$850M", status: "complete" },
      { label: "Total impacted revenue", value: "$1.8B", status: "complete" },
    ],
    status: "complete",
    aiAssisted: true,
  },
  {
    id: 3,
    title: "Control Review",
    icon: "shield",
    color: "#fbbf24",
    glow: "#f59e0b",
    bg: "#422006",
    border: "#92400e",
    inputs: ["Enterprise control registry", "Risk mitigation database"],
    transformation: "AI evaluates existing controls against the identified exposure",
    outputs: [
      { label: "Inventory buffer (90 days)", value: "Active", status: "active" },
      { label: "Geopolitical monitoring", value: "Active", status: "active" },
      { label: "Secondary supplier", value: "Missing", status: "missing" },
    ],
    status: "complete",
    aiAssisted: true,
  },
  {
    id: 4,
    title: "Risk Owner Validation",
    icon: "user",
    color: "#34d399",
    glow: "#22c55e",
    bg: "#052e16",
    border: "#065f46",
    inputs: ["Risk owner assignment", "Domain expertise"],
    transformation: "Risk owner provides human context, validates AI assessment, confirms severity",
    outputs: [
      { label: "Owner: Chief Supply Chain Officer", status: "complete" },
      { label: "Response: Secondary suppliers exist but require 60–90 day qualification", status: "complete" },
      { label: "Severity confirmed", value: "Critical", status: "complete" },
    ],
    status: "complete",
    aiAssisted: false,
  },
  {
    id: 5,
    title: "Governance Escalation",
    icon: "alert",
    color: "#60a5fa",
    glow: "#3b82f6",
    bg: "#1e3a5f",
    border: "#1e40af",
    inputs: ["Validated risk assessment", "Committee routing rules"],
    transformation: "System determines appropriate governance committees and triggers escalation",
    outputs: [
      { label: "Enterprise risk committee alert", value: "Triggered", status: "complete" },
      { label: "Board committee review recommended", status: "complete" },
      { label: "Audit committee notification", value: "Queued", status: "pending" },
    ],
    status: "complete",
    aiAssisted: true,
  },
  {
    id: 6,
    title: "Disclosure Assessment",
    icon: "file",
    color: "#a78bfa",
    glow: "#8b5cf6",
    bg: "#2e1065",
    border: "#5b21b6",
    inputs: ["Risk analysis package", "Peer filings database", "SEC guidelines"],
    transformation: "AI drafts disclosure language and benchmarks against peer filings",
    outputs: [
      { label: "10-Q / 10-K risk disclosure identified", status: "complete" },
      { label: "AI draft disclosure language", value: "Generated", status: "ai" },
      { label: "Peer benchmarking: Apple, Nvidia, AMD", value: "2 of 3 disclosed", status: "complete" },
    ],
    status: "complete",
    aiAssisted: true,
  },
  {
    id: 7,
    title: "GC Decision Layer",
    icon: "gavel",
    color: "#f0abfc",
    glow: "#d946ef",
    bg: "#4a044e",
    border: "#86198f",
    inputs: ["Complete risk & disclosure package", "GC judgment"],
    transformation: "General Counsel reviews full evidence chain and makes final determination",
    outputs: [
      { label: "Monitor only", value: "—", status: "pending" },
      { label: "Escalate and disclose", value: "Recommended", status: "active" },
      { label: "Escalate and investigate further", value: "—", status: "pending" },
    ],
    status: "active",
    aiAssisted: false,
  },
];

const EVIDENCE: Evidence[] = [
  {
    id: "ev-1",
    title: "Geopolitical Alert — Taiwan Strait",
    type: "Intelligence Report",
    stage: 1,
    summary: "Reuters, AP, and defense intelligence sources flagged escalating military posturing near Taiwan. AI correlated with prior TSMC supply disruption patterns.",
  },
  {
    id: "ev-2",
    title: "Supplier Concentration Report",
    type: "Internal Analysis",
    stage: 2,
    summary: "47% of critical semiconductor components sourced from Taiwan-based manufacturers. Two product lines depend entirely on TSMC-fabricated chips.",
  },
  {
    id: "ev-3",
    title: "Control Gap Analysis",
    type: "Risk Assessment",
    stage: 3,
    summary: "Preventive and detective controls partially cover exposure. No qualified secondary supplier exists — qualification timeline is 60–90 days.",
  },
  {
    id: "ev-4",
    title: "Risk Owner Response — CSCO",
    type: "Stakeholder Input",
    stage: 4,
    summary: "\"Secondary suppliers exist in Vietnam and South Korea but require full qualification. Inventory buffer extended to 90 days as interim mitigation.\"",
  },
  {
    id: "ev-5",
    title: "Peer Filing Benchmark",
    type: "Competitive Intelligence",
    stage: 6,
    summary: "Apple and Nvidia have disclosed Taiwan Strait supply chain exposure in recent 10-K filings. AMD disclosure is pending. Delayed disclosure may signal governance weakness.",
  },
];

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function StageIcon({ icon, color, size = 16 }: { icon: string; color: string; size?: number }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (icon) {
    case "radar": return <svg {...p}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" /></svg>;
    case "map": return <svg {...p}><path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" /><path d="M8 2v16" /><path d="M16 6v16" /></svg>;
    case "shield": return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
    case "user": return <svg {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
    case "alert": return <svg {...p}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
    case "file": return <svg {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>;
    case "gavel": return <svg {...p}><path d="M14.5 2v6.5L18 12l-7 7-3.5-3.5L14.5 2z" /><path d="M2 22l5.5-5.5" /><path d="M7.5 10L12 5.5" /></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="10" /></svg>;
  }
}

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */

function DiligentLogo({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 222 222" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z" />
      <path fill="#AF292E" d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z" />
      <path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z" />
    </svg>
  );
}

function StatusLabel({ status }: { status?: string }) {
  const cfg: Record<string, { color: string; bg: string; border: string; label: string }> = {
    complete: { color: "#34d399", bg: "#052e16", border: "#065f46", label: "Complete" },
    active: { color: "#22c55e", bg: "#052e16", border: "#065f46", label: "Active" },
    missing: { color: "#f87171", bg: "#450a0a", border: "#7f1d1d", label: "Gap" },
    pending: { color: "#fbbf24", bg: "#422006", border: "#92400e", label: "Pending" },
    ai: { color: "#a78bfa", bg: "#2e1065", border: "#5b21b6", label: "AI" },
  };
  const c = cfg[status ?? "pending"] ?? cfg.pending;
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
      style={{ color: c.color, background: c.bg, border: `1px solid ${c.border}` }}
    >
      {c.label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage Card                                                         */
/* ------------------------------------------------------------------ */

function StageCard({
  stage,
  isSelected,
  onSelect,
  isLast,
}: {
  stage: Stage;
  isSelected: boolean;
  onSelect: () => void;
  isLast: boolean;
}) {
  return (
    <div className="flex">
      {/* Left: Timeline column */}
      <div className="flex flex-col items-center mr-5 flex-shrink-0">
        {/* Icon circle */}
        <button
          onClick={onSelect}
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border-2 transition-all cursor-pointer"
          style={{
            borderColor: isSelected ? stage.glow : stage.border,
            background: stage.bg,
            boxShadow: isSelected ? `0 0 20px ${stage.glow}30` : "none",
          }}
        >
          <StageIcon icon={stage.icon} color={stage.color} size={18} />
        </button>
        {/* Connecting line */}
        {!isLast && (
          <div className="w-0.5 flex-1 my-1" style={{ background: `linear-gradient(to bottom, ${stage.glow}40, ${stage.glow}10)` }} />
        )}
      </div>

      {/* Right: Card content */}
      <div
        className="flex-1 rounded-xl border p-4 mb-4 transition-all cursor-pointer"
        onClick={onSelect}
        style={{
          borderColor: isSelected ? stage.glow : "#30363d",
          background: isSelected ? "#161b22" : "#0d111780",
          boxShadow: isSelected ? `0 0 30px ${stage.glow}10` : "none",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-extrabold tabular-nums" style={{ color: stage.color }}>
              STAGE {stage.id}
            </span>
            <h3 className="text-sm font-bold text-[#f0f6fc]">{stage.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {stage.aiAssisted && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#2e1065] border border-[#5b21b6] px-2 py-0.5 text-[9px] font-bold text-[#a78bfa] uppercase">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg>
                AI
              </span>
            )}
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase"
              style={{
                color: stage.status === "complete" ? "#34d399" : stage.status === "active" ? "#60a5fa" : "#8b949e",
                background: stage.status === "complete" ? "#052e16" : stage.status === "active" ? "#1e3a5f" : "#21262d",
                border: `1px solid ${stage.status === "complete" ? "#065f46" : stage.status === "active" ? "#1e40af" : "#30363d"}`,
              }}
            >
              {stage.status === "complete" ? "Done" : stage.status === "active" ? "In Review" : "Queued"}
            </span>
          </div>
        </div>

        {/* Transformation row */}
        <div className="rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2 mb-3">
          <span className="text-[10px] font-semibold text-[#6e7681] uppercase mr-2">Process:</span>
          <span className="text-[11px] text-[#8b949e]">{stage.transformation}</span>
        </div>

        {/* Inputs and Outputs in two columns */}
        <div className="grid grid-cols-2 gap-3">
          {/* Inputs */}
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-[#484f58] mb-1.5">Inputs</div>
            <div className="space-y-1">
              {stage.inputs.map((inp, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#484f58" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                  <span className="text-[11px] text-[#6e7681]">{inp}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Outputs */}
          <div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-[#484f58] mb-1.5">Outputs</div>
            <div className="space-y-1.5">
              {stage.outputs.map((out, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <StatusLabel status={out.status} />
                  <span className="text-[11px] text-[#c9d1d9] flex-1 min-w-0 truncate">{out.label}</span>
                  {out.value && <span className="text-[11px] font-bold text-[#f0f6fc] flex-shrink-0">{out.value}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Decision Panel                                                     */
/* ------------------------------------------------------------------ */

function DecisionPanel({ decision, setDecision }: { decision: string | null; setDecision: (d: string) => void }) {
  const options = [
    { id: "monitor", label: "Monitor Only", desc: "Continue monitoring — no disclosure action at this time", color: "#fbbf24", bg: "#422006", border: "#92400e" },
    { id: "disclose", label: "Escalate & Disclose", desc: "Recommend disclosure in upcoming 10-Q filing", color: "#22c55e", bg: "#052e16", border: "#065f46" },
    { id: "investigate", label: "Escalate & Investigate", desc: "Further investigation required before disclosure decision", color: "#60a5fa", bg: "#1e3a5f", border: "#1e40af" },
  ];

  return (
    <div className="rounded-xl border border-[#86198f] bg-[#161b22] p-5 mb-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-7 w-7 rounded-lg bg-[#4a044e] border border-[#86198f] flex items-center justify-center">
          <StageIcon icon="gavel" color="#f0abfc" size={14} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#f0f6fc]">GC Decision</h3>
          <p className="text-[10px] text-[#6e7681]">AI recommends: Escalate & Disclose</p>
        </div>
      </div>

      <div className="space-y-2 mb-5">
        {options.map((opt) => {
          const sel = decision === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setDecision(opt.id)}
              className="w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-all"
              style={{
                borderColor: sel ? opt.color : "#30363d",
                background: sel ? opt.bg : "#0d1117",
              }}
            >
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: sel ? opt.color : "#484f58" }}
              >
                {sel && <div className="w-2 h-2 rounded-full" style={{ background: opt.color }} />}
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold" style={{ color: sel ? opt.color : "#c9d1d9" }}>{opt.label}</div>
                <div className="text-[11px] text-[#6e7681]">{opt.desc}</div>
              </div>
              {opt.id === "disclose" && (
                <span className="text-[9px] font-bold uppercase rounded-full px-2 py-0.5 bg-[#052e16] border border-[#065f46] text-[#34d399]">
                  Recommended
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Draft disclosure */}
      <div className="mb-5">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#a78bfa] mb-2">AI Draft Disclosure</div>
        <blockquote className="rounded-lg border-l-[3px] border-[#7c3aed] bg-[#2e1065]/30 px-4 py-3">
          <p className="text-[12px] text-[#c4b5fd] leading-relaxed italic">
            &ldquo;Escalating geopolitical tensions in the Taiwan Strait could disrupt semiconductor supply chains
            that support several of our products and may impact manufacturing timelines,
            component availability, and associated revenue.&rdquo;
          </p>
        </blockquote>
      </div>

      {/* Peer comparison */}
      <div className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-2">Peer Disclosure Status</div>
      <div className="space-y-1.5">
        {[
          { name: "Apple", status: "Disclosed", color: "#22c55e" },
          { name: "Nvidia", status: "Disclosed", color: "#22c55e" },
          { name: "AMD", status: "Pending", color: "#fbbf24" },
        ].map((p) => (
          <div key={p.name} className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2">
            <span className="text-xs font-semibold text-[#f0f6fc]">{p.name}</span>
            <span className="text-[10px] font-bold" style={{ color: p.color }}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Evidence Drawer                                                    */
/* ------------------------------------------------------------------ */

function EvidenceDrawer({ evidence, selectedStage }: { evidence: Evidence[]; selectedStage: number }) {
  const [open, setOpen] = useState(false);
  const filtered = evidence.filter((e) => e.stage === selectedStage);
  const shown = open ? evidence : filtered;

  return (
    <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          <h3 className="text-xs font-bold text-[#f0f6fc]">Evidence Chain</h3>
          <span className="text-[10px] text-[#6e7681]">{evidence.length} artifacts</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-[10px] font-semibold text-[#58a6ff] hover:text-[#79c0ff] transition-colors"
        >
          {open ? "Show stage only" : "Show all evidence"}
        </button>
      </div>

      {shown.length === 0 ? (
        <p className="text-xs text-[#484f58] text-center py-3">No evidence artifacts for this stage</p>
      ) : (
        <div className="space-y-2">
          {shown.map((ev) => {
            const stageData = STAGES.find((s) => s.id === ev.stage);
            return (
              <div key={ev.id} className="rounded-lg border border-[#21262d] bg-[#0d1117] p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase"
                    style={{
                      color: stageData?.color ?? "#8b949e",
                      background: stageData?.bg ?? "#21262d",
                      border: `1px solid ${stageData?.border ?? "#30363d"}`,
                    }}
                  >
                    Stage {ev.stage}
                  </span>
                  <span className="text-[10px] font-bold text-[#f0f6fc]">{ev.title}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-semibold text-[#484f58] uppercase">{ev.type}</span>
                </div>
                <p className="text-[11px] text-[#8b949e] leading-relaxed">{ev.summary}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RiskPipelinePage() {
  const [selectedStage, setSelectedStage] = useState(7);
  const [decision, setDecision] = useState<string | null>("disclose");

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col">
      <div className="flex-1">
        {/* ========================================================== */}
        {/*  HEADER                                                     */}
        {/* ========================================================== */}
        <header className="border-b border-[#21262d] bg-[#161b22]">
          <div className="max-w-[1400px] mx-auto px-6 py-5">
            <div className="flex items-center gap-3 mb-3">
              <DiligentLogo size={28} />
              <h1 className="text-lg font-bold text-[#f0f6fc] tracking-tight">Risk-to-Disclosure Pipeline</h1>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              From external signal to disclosure-ready governance workflow — full traceability across 7 stages
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-[#5b21b6] bg-[#2e1065]/40 px-3 py-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /></svg>
                <span className="text-[10px] font-semibold text-[#6e7681] uppercase">AI Confidence</span>
                <span className="text-xs font-extrabold text-[#a78bfa]">92%</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#7f1d1d] bg-[#450a0a]/40 px-3 py-1.5">
                <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Urgency</span>
                <span className="text-xs font-extrabold text-[#f87171]">Critical</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-1.5">
                <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Responsible</span>
                <span className="text-xs font-extrabold text-[#f0f6fc]">General Counsel</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#065f46] bg-[#052e16]/40 px-3 py-1.5">
                <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Pipeline</span>
                <span className="text-xs font-extrabold text-[#34d399]">6 of 7 complete</span>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================== */}
        {/*  MAIN CONTENT                                               */}
        {/* ========================================================== */}
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex gap-6">
            {/* Left: Pipeline stages */}
            <div className="flex-1 min-w-0">
              {STAGES.map((stage, i) => (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  isSelected={selectedStage === stage.id}
                  onSelect={() => setSelectedStage(stage.id)}
                  isLast={i === STAGES.length - 1}
                />
              ))}
            </div>

            {/* Right: Decision + Evidence */}
            <div className="w-[380px] flex-shrink-0 space-y-5">
              <DecisionPanel decision={decision} setDecision={setDecision} />
              <EvidenceDrawer evidence={EVIDENCE} selectedStage={selectedStage} />
            </div>
          </div>
        </div>
      </div>

      <StakeholderFooter label="Prototype navigation — Risk-to-Disclosure Pipeline">
        <PrototypeControlLink href="/superhero/risk-shockwave">
          View Risk Shockwave →
        </PrototypeControlLink>
      </StakeholderFooter>
    </div>
  );
}
