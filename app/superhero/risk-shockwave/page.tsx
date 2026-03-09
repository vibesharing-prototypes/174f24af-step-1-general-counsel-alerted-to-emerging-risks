"use client";

import React, { useState, useEffect, useCallback } from "react";
import { StakeholderFooter, PrototypeControlLink } from "../StakeholderFooter";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface WaveOutput {
  label: string;
  value: string;
  status?: "active" | "missing" | "pending" | "complete";
}

interface Wave {
  id: number;
  title: string;
  color: string;
  glowColor: string;
  bgColor: string;
  borderColor: string;
  timestamp: string;
  elapsed: string;
  outputs: WaveOutput[];
}

const WAVES: Wave[] = [
  {
    id: 1,
    title: "Supply Chain Exposure Identified",
    color: "#f87171",
    glowColor: "#ef4444",
    bgColor: "#450a0a",
    borderColor: "#7f1d1d",
    timestamp: "08:43 UTC",
    elapsed: "+0 min",
    outputs: [
      { label: "Taiwan semiconductor suppliers flagged", value: "47% concentration", status: "complete" },
      { label: "Production dependency detected", value: "$1.8B exposed", status: "complete" },
    ],
  },
  {
    id: 2,
    title: "Operational Impact Analysis",
    color: "#fb923c",
    glowColor: "#f97316",
    bgColor: "#431407",
    borderColor: "#9a3412",
    timestamp: "08:51 UTC",
    elapsed: "+8 min",
    outputs: [
      { label: "Product X manufacturing risk", value: "$950M", status: "complete" },
      { label: "Product Y manufacturing risk", value: "$850M", status: "complete" },
      { label: "Inventory coverage remaining", value: "63 days", status: "active" },
    ],
  },
  {
    id: 3,
    title: "Control Evaluation Layer",
    color: "#fbbf24",
    glowColor: "#f59e0b",
    bgColor: "#422006",
    borderColor: "#92400e",
    timestamp: "09:02 UTC",
    elapsed: "+19 min",
    outputs: [
      { label: "Inventory buffer control", value: "Active", status: "active" },
      { label: "Geopolitical monitoring", value: "Active", status: "active" },
      { label: "Secondary supplier control", value: "Missing", status: "missing" },
    ],
  },
  {
    id: 4,
    title: "Risk Governance Action",
    color: "#60a5fa",
    glowColor: "#3b82f6",
    bgColor: "#1e3a5f",
    borderColor: "#1e40af",
    timestamp: "09:14 UTC",
    elapsed: "+31 min",
    outputs: [
      { label: "Risk owner notified", value: "CSCO", status: "complete" },
      { label: "Enterprise risk committee alert", value: "Triggered", status: "complete" },
      { label: "Scenario modeling initiated", value: "Running", status: "pending" },
    ],
  },
  {
    id: 5,
    title: "Disclosure Assessment",
    color: "#a78bfa",
    glowColor: "#8b5cf6",
    bgColor: "#2e1065",
    borderColor: "#5b21b6",
    timestamp: "09:20 UTC",
    elapsed: "+37 min",
    outputs: [
      { label: "Potential 10-Q / 10-K risk disclosure", value: "Flagged", status: "complete" },
      { label: "AI drafted disclosure language", value: "Generated", status: "complete" },
      { label: "GC review initiated", value: "Pending", status: "pending" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Shared Components                                                  */
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

function StatusDot({ status }: { status?: string }) {
  const color =
    status === "active" || status === "complete"
      ? "#22c55e"
      : status === "missing"
        ? "#ef4444"
        : "#f59e0b";
  return <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />;
}

/* ------------------------------------------------------------------ */
/*  Concentric Ring Visualization                                      */
/* ------------------------------------------------------------------ */

function ShockwaveRings({
  activeWave,
  onSelectWave,
}: {
  activeWave: number;
  onSelectWave: (id: number) => void;
}) {
  const CX = 400;
  const CY = 280;
  const BASE_R = 40;
  const RING_STEP = 48;

  return (
    <svg viewBox="0 0 800 560" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {WAVES.map((w) => (
          <React.Fragment key={w.id}>
            <radialGradient id={`sw-grad-${w.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={w.glowColor} stopOpacity="0.15" />
              <stop offset="100%" stopColor={w.glowColor} stopOpacity="0" />
            </radialGradient>
            <filter id={`sw-glow-${w.id}`}>
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </React.Fragment>
        ))}
        <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#7f1d1d" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0d1117" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle background grid */}
      <pattern id="sw-grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#21262d" strokeWidth="0.4" strokeOpacity="0.3" />
      </pattern>
      <rect width="800" height="560" fill="url(#sw-grid)" />

      {/* Wave rings — outer to inner for layering */}
      {[...WAVES].reverse().map((w) => {
        const r = BASE_R + w.id * RING_STEP;
        const isReached = w.id <= activeWave;
        const isActive = w.id === activeWave;
        return (
          <g
            key={w.id}
            onClick={() => onSelectWave(w.id)}
            className="cursor-pointer"
          >
            {/* Glow fill */}
            {isReached && (
              <circle
                cx={CX}
                cy={CY}
                r={r + 20}
                fill={`url(#sw-grad-${w.id})`}
                opacity={isActive ? 1 : 0.4}
              />
            )}

            {/* Ring band */}
            <circle
              cx={CX}
              cy={CY}
              r={r}
              fill="none"
              stroke={w.glowColor}
              strokeWidth={isActive ? 2.5 : isReached ? 1.5 : 0.5}
              strokeOpacity={isReached ? (isActive ? 0.9 : 0.4) : 0.12}
              strokeDasharray={isReached ? "none" : "4 8"}
              filter={isActive ? `url(#sw-glow-${w.id})` : undefined}
            />

            {/* Wave label — positioned on right side of ring */}
            <g transform={`translate(${CX + r + 8}, ${CY - r * 0.15})`}>
              <rect
                x="0"
                y="-10"
                width={w.title.length * 6.2 + 24}
                height="22"
                rx="4"
                fill={isReached ? w.bgColor : "#161b22"}
                fillOpacity={isReached ? 0.9 : 0.6}
                stroke={isReached ? w.borderColor : "#30363d"}
                strokeWidth={isActive ? 1.5 : 0.5}
              />
              <text
                x="6"
                y="4"
                fill={isReached ? w.color : "#484f58"}
                fontSize="10"
                fontWeight={isActive ? "800" : "600"}
                letterSpacing="0.3"
              >
                {w.id}. {w.title}
              </text>
            </g>

            {/* Elapsed time — positioned on left side of ring */}
            {isReached && (
              <g transform={`translate(${CX - r - 48}, ${CY + r * 0.15})`}>
                <text
                  x="0"
                  y="0"
                  fill={w.color}
                  fontSize="9"
                  fontWeight="700"
                  textAnchor="end"
                  opacity={0.7}
                >
                  {w.elapsed}
                </text>
              </g>
            )}

            {/* Animated selection ring */}
            {isActive && (
              <circle
                cx={CX}
                cy={CY}
                r={r + 6}
                fill="none"
                stroke={w.glowColor}
                strokeWidth={1}
                strokeDasharray="6 6"
                strokeOpacity={0.4}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${CX} ${CY}`}
                  to={`360 ${CX} ${CY}`}
                  dur="30s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        );
      })}

      {/* Core event */}
      <circle cx={CX} cy={CY} r={BASE_R} fill="url(#core-grad)" />
      <circle cx={CX} cy={CY} r={BASE_R} fill="none" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.6" />
      <circle cx={CX} cy={CY} r={BASE_R * 0.55} fill="#7f1d1d" fillOpacity="0.5" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.3" />

      {/* Core label */}
      <text x={CX} y={CY - 8} textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="800" letterSpacing="1">
        EVENT
      </text>
      <text x={CX} y={CY + 6} textAnchor="middle" fill="#f0f6fc" fontSize="9" fontWeight="700">
        Taiwan Strait
      </text>
      <text x={CX} y={CY + 18} textAnchor="middle" fill="#8b949e" fontSize="7" fontWeight="600">
        Jan 12 · 08:43 UTC
      </text>

      {/* Pulse animation on core */}
      {activeWave >= 1 && (
        <>
          <circle cx={CX} cy={CY} r={BASE_R} fill="none" stroke="#ef4444" strokeWidth="1" strokeOpacity="0">
            <animate attributeName="r" from={`${BASE_R}`} to={`${BASE_R + 25}`} dur="2s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail Panel                                                       */
/* ------------------------------------------------------------------ */

function WaveDetailPanel({ wave }: { wave: Wave }) {
  return (
    <div
      className="rounded-xl border p-5 transition-all duration-300"
      style={{ borderColor: wave.borderColor, background: "#161b22" }}
    >
      {/* Wave header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="h-9 w-9 rounded-lg flex items-center justify-center text-sm font-extrabold"
          style={{ background: wave.bgColor, color: wave.color, border: `1px solid ${wave.borderColor}` }}
        >
          {wave.id}
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#f0f6fc]">{wave.title}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-semibold" style={{ color: wave.color }}>{wave.timestamp}</span>
            <span className="text-[10px] text-[#6e7681]">{wave.elapsed}</span>
          </div>
        </div>
      </div>

      {/* Outputs */}
      <div className="space-y-2">
        {wave.outputs.map((o, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-[#21262d] bg-[#0d1117] px-3.5 py-2.5"
          >
            <StatusDot status={o.status} />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[#c9d1d9]">{o.label}</div>
            </div>
            <span className="text-xs font-bold text-[#f0f6fc] flex-shrink-0">{o.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Playback Controls                                                  */
/* ------------------------------------------------------------------ */

function PlaybackControls({
  activeWave,
  isPlaying,
  onPlay,
  onPause,
  onStep,
  onReset,
}: {
  activeWave: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: (dir: number) => void;
  onReset: () => void;
}) {
  const btnCls =
    "h-9 rounded-lg border border-[#30363d] bg-[#161b22] px-3 text-xs font-semibold text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#f0f6fc] transition-colors flex items-center gap-1.5";

  return (
    <div className="flex items-center gap-2">
      <button className={btnCls} onClick={onReset}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
        Reset
      </button>
      <button className={btnCls} onClick={() => onStep(-1)} disabled={activeWave <= 0}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" /></svg>
        Prev
      </button>
      {isPlaying ? (
        <button className={btnCls} onClick={onPause}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
          Pause
        </button>
      ) : (
        <button className={btnCls} onClick={onPlay}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          Play
        </button>
      )}
      <button className={btnCls} onClick={() => onStep(1)} disabled={activeWave >= 5}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>
        Next
      </button>

      {/* Progress dots */}
      <div className="ml-3 flex items-center gap-1.5">
        {WAVES.map((w) => (
          <div
            key={w.id}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: w.id === activeWave ? 20 : 8,
              background: w.id <= activeWave ? w.glowColor : "#30363d",
              opacity: w.id <= activeWave ? 1 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Wave counter */}
      <span className="ml-2 text-[11px] text-[#6e7681] font-medium tabular-nums">
        Wave {activeWave} / {WAVES.length}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RiskShockwavePage() {
  const [activeWave, setActiveWave] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = useCallback(
    (dir: number) => {
      setActiveWave((prev) => Math.max(0, Math.min(WAVES.length, prev + dir)));
    },
    [],
  );

  useEffect(() => {
    if (!isPlaying) return;
    if (activeWave >= WAVES.length) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => step(1), 1800);
    return () => clearTimeout(timer);
  }, [isPlaying, activeWave, step]);

  const handlePlay = () => {
    if (activeWave >= WAVES.length) setActiveWave(0);
    setIsPlaying(true);
  };

  const currentWave = WAVES.find((w) => w.id === activeWave) ?? null;

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
              <h1 className="text-lg font-bold text-[#f0f6fc] tracking-tight">Enterprise Risk Shockwave</h1>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              Event detected → impact propagation across supply chain, operations, governance, and disclosure
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#0d1117] px-3.5 py-2">
                <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Signal → Governance</span>
                <span className="text-sm font-extrabold text-[#60a5fa]">31 min</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#0d1117] px-3.5 py-2">
                <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Signal → Disclosure</span>
                <span className="text-sm font-extrabold text-[#a78bfa]">37 min</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#0d1117] px-3.5 py-2">
                <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Functions Impacted</span>
                <span className="text-sm font-extrabold text-[#fbbf24]">5</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#0d1117] px-3.5 py-2">
                <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Total Exposure</span>
                <span className="text-sm font-extrabold text-[#f87171]">$1.8B</span>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================== */}
        {/*  MAIN CONTENT                                               */}
        {/* ========================================================== */}
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          {/* Playback controls */}
          <div className="mb-5 flex items-center justify-between">
            <PlaybackControls
              activeWave={activeWave}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={() => setIsPlaying(false)}
              onStep={step}
              onReset={() => {
                setIsPlaying(false);
                setActiveWave(0);
              }}
            />
          </div>

          <div className="flex gap-6">
            {/* Left: Shockwave visualization */}
            <div className="flex-1 min-w-0">
              <div className="rounded-xl border border-[#30363d] bg-[#0d1117] p-2 mb-5">
                <ShockwaveRings
                  activeWave={activeWave}
                  onSelectWave={(id) => {
                    setIsPlaying(false);
                    setActiveWave(id);
                  }}
                />
              </div>

              {/* AI Insight Card */}
              {activeWave >= 5 && (
                <div className="rounded-xl border border-[#5b21b6] bg-[#2e1065]/30 p-5 flex items-start gap-4 transition-all duration-500">
                  <div className="h-10 w-10 rounded-xl bg-[#2e1065] border border-[#7c3aed] flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#c4b5fd] mb-1">Diligent AI Analysis Complete</h3>
                    <p className="text-sm text-[#8b949e] leading-relaxed">
                      AI detected and analyzed a material governance risk in <span className="font-bold text-[#a78bfa]">37 minutes</span>.
                      The shockwave propagated from geopolitical signal detection through supply chain analysis, operational impact
                      assessment, control evaluation, governance escalation, and disclosure recommendation — all before the first
                      business meeting of the day.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Detail Panel */}
            <div className="w-[340px] flex-shrink-0 space-y-4">
              {/* Event Details */}
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-3">Origin Event</div>
                <div className="rounded-lg border border-[#7f1d1d] bg-[#450a0a]/40 p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-pulse" />
                    <span className="text-xs font-bold text-[#f87171]">GEOPOLITICAL ESCALATION</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#f0f6fc] mb-1">Taiwan Strait — Semiconductor Risk</h4>
                  <p className="text-xs text-[#8b949e] leading-relaxed">
                    Detected Jan 12 at 08:43 UTC. Escalating military posturing threatens 47% of critical semiconductor supply chain.
                  </p>
                </div>

                {/* Affected Systems */}
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-2">Affected Teams</div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {["Supply Chain", "Manufacturing", "Risk Mgmt", "Legal / GC", "Board Governance"].map((t) => (
                    <span
                      key={t}
                      className="inline-flex rounded-full border border-[#30363d] bg-[#0d1117] px-2.5 py-1 text-[10px] font-medium text-[#8b949e]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Escalation & Disclosure State */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2">
                    <span className="text-[11px] text-[#8b949e]">Escalation State</span>
                    <span className="text-[11px] font-bold" style={{ color: activeWave >= 4 ? "#22c55e" : activeWave >= 1 ? "#fbbf24" : "#484f58" }}>
                      {activeWave >= 4 ? "Committee Alerted" : activeWave >= 1 ? "In Progress" : "Awaiting Signal"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2">
                    <span className="text-[11px] text-[#8b949e]">Disclosure State</span>
                    <span className="text-[11px] font-bold" style={{ color: activeWave >= 5 ? "#a78bfa" : activeWave >= 1 ? "#fbbf24" : "#484f58" }}>
                      {activeWave >= 5 ? "GC Review Initiated" : activeWave >= 1 ? "Pending" : "Not Started"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2">
                    <span className="text-[11px] text-[#8b949e]">Active Controls</span>
                    <span className="text-[11px] font-bold" style={{ color: activeWave >= 3 ? "#22c55e" : "#484f58" }}>
                      {activeWave >= 3 ? "2 of 3" : "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Wave Detail */}
              {currentWave && <WaveDetailPanel wave={currentWave} />}

              {/* Timeline progress */}
              {activeWave === 0 && (
                <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 text-center">
                  <p className="text-sm text-[#6e7681]">
                    Press <span className="font-bold text-[#c9d1d9]">Play</span> or <span className="font-bold text-[#c9d1d9]">Next</span> to begin the shockwave propagation
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <StakeholderFooter label="Prototype navigation — Enterprise Risk Shockwave">
        <PrototypeControlLink href="/superhero/risk-gravity">
          View Risk Gravity Map →
        </PrototypeControlLink>
      </StakeholderFooter>
    </div>
  );
}
