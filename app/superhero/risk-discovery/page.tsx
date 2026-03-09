"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StakeholderFooter, PrototypeControlLink } from "../StakeholderFooter";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface RiskCard {
  id: string;
  title: string;
  source: string;
  category: string;
  severity: "Critical" | "High" | "Medium";
  description: string;
  isNew: boolean;
  aiGenerated: boolean;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const RISKS: RiskCard[] = [
  {
    id: "taiwan",
    title: "Taiwan Strait Geopolitical Tensions — Semiconductor Supply Chain Disruption",
    source: "Reuters, TSMC filings, defense intelligence",
    category: "Supply Chain Disruption",
    severity: "Critical",
    description:
      "Escalating military posturing in the Taiwan Strait creates material risk to semiconductor supply chains. Approximately 47% of critical chip suppliers operate in Taiwan. Disruption could impact $1.8B in annual product revenue across two major product lines.",
    isNew: true,
    aiGenerated: true,
  },
  {
    id: "vendor",
    title: "Critical Vendor Cybersecurity Breach — CloudSecure Inc. Ransomware Incident",
    source: "CloudSecure Inc. disclosure, internal vendor monitoring",
    category: "Cybersecurity / Data Privacy",
    severity: "High",
    description:
      "CloudSecure Inc. (primary data processing vendor) disclosed a ransomware incident affecting customer data pipelines. They process customer PII under 3 of our data processing agreements. Elevated per CRO assessment; added to Top 5 risk register.",
    isNew: true,
    aiGenerated: true,
  },
  {
    id: "eu-dma",
    title: "EU Digital Markets Act Enforcement Pattern — Regulatory Compliance Exposure",
    source: "EC enforcement filings, peer 10-K analysis",
    category: "Regulatory Compliance",
    severity: "High",
    description:
      "EC initiated enforcement actions against 3 companies in our sector for DMA non-compliance. Pattern analysis suggests our EU operations may face similar scrutiny. Potential fines up to 10% of global turnover.",
    isNew: true,
    aiGenerated: true,
  },
  {
    id: "ai-reg",
    title: "AI Regulatory Compliance — EU AI Act Implementation Uncertainty",
    source: "EU regulatory filings, peer disclosures",
    category: "Technology Regulation",
    severity: "Medium",
    description:
      "EU AI Act enforcement timeline creates uncertainty for AI product launches. Compliance assessment is incomplete. Peer companies have begun disclosing AI regulatory risk in 10-K filings.",
    isNew: false,
    aiGenerated: true,
  },
  {
    id: "climate",
    title: "SEC Climate Disclosure Requirements — Reporting Readiness Gap",
    source: "SEC rule filings, internal readiness audit",
    category: "ESG / Reporting",
    severity: "Medium",
    description:
      "New SEC climate disclosure rules require Scope 1 and 2 emissions reporting. Internal audit identified gaps in data collection and assurance processes. Compliance deadline within 18 months.",
    isNew: false,
    aiGenerated: true,
  },
  {
    id: "rates",
    title: "Interest Rate Sensitivity — Refinancing Exposure in Current Rate Environment",
    source: "Fed minutes, internal treasury analysis",
    category: "Financial Risk",
    severity: "Medium",
    description:
      "Current rate environment increases refinancing costs for $2.3B in maturing debt instruments. Treasury analysis indicates 40bps spread widening may impact capital allocation strategy.",
    isNew: false,
    aiGenerated: false,
  },
];

const SEVERITY_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  Critical: { text: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  High: { text: "#d97706", bg: "#fffbeb", border: "#fde68a" },
  Medium: { text: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
};

/* ------------------------------------------------------------------ */
/*  Diligent Logo                                                      */
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

/* ------------------------------------------------------------------ */
/*  Left Icon Sidebar (dark, narrow — matches Diligent product)        */
/* ------------------------------------------------------------------ */

function IconSidebar() {
  const icons = [
    { id: "home", active: false, el: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
    { id: "grc", active: true, el: <span className="text-[11px] font-extrabold">G</span> },
    { id: "chart", active: false, el: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg> },
    { id: "board", active: false, el: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg> },
    { id: "chat", active: false, el: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
    { id: "help", active: false, el: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
  ];

  return (
    <div className="w-12 bg-[#1a1a2e] flex flex-col items-center py-3 gap-1 flex-shrink-0">
      {/* Hamburger */}
      <button className="h-9 w-9 flex items-center justify-center text-[#9ca3af] hover:text-white rounded-lg hover:bg-white/10">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
      </button>
      {/* Diligent mark */}
      <div className="h-9 w-9 flex items-center justify-center my-1">
        <DiligentLogo size={20} />
      </div>
      {/* Separator */}
      <div className="w-6 h-px bg-white/10 my-1" />
      {/* Nav icons */}
      {icons.map((ic) => (
        <button
          key={ic.id}
          className={`h-9 w-9 flex items-center justify-center rounded-lg transition-colors ${
            ic.active
              ? "bg-[#ef4444] text-white"
              : "text-[#9ca3af] hover:text-white hover:bg-white/10"
          }`}
        >
          {ic.el}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Sparkle Icon                                                    */
/* ------------------------------------------------------------------ */

function AISparkle({ size = 16, color = "#6b7280" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Risk Card Component                                                */
/* ------------------------------------------------------------------ */

function RiskCardItem({ risk }: { risk: RiskCard }) {
  const sc = SEVERITY_COLORS[risk.severity];
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 flex flex-col hover:shadow-md transition-shadow relative">
      {/* Top row: AI sparkle + category badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="relative">
          {risk.aiGenerated && (
            <button
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
              className="flex items-center justify-center"
            >
              <AISparkle size={18} color="#9ca3af" />
            </button>
          )}
          {tooltipOpen && (
            <div className="absolute left-0 bottom-full mb-2 z-10 w-48 rounded-lg bg-[#1f2937] text-white text-[11px] px-3 py-2 shadow-lg">
              This result was created with the help of AI.
              <div className="absolute left-4 top-full w-2 h-2 bg-[#1f2937] transform rotate-45 -translate-y-1" />
            </div>
          )}
        </div>
        <span
          className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold border"
          style={{ color: sc.text, background: sc.bg, borderColor: sc.border }}
        >
          {risk.category}
        </span>
      </div>

      {/* New badge */}
      {risk.isNew && (
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex rounded-full bg-[#ef4444] text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
            New
          </span>
          <span
            className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border"
            style={{ color: sc.text, background: sc.bg, borderColor: sc.border }}
          >
            {risk.severity}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-sm font-semibold text-[#2563eb] leading-snug mb-1 hover:underline cursor-pointer">
        {risk.title}
      </h3>

      {/* Source */}
      <p className="text-[11px] text-[#6b7280] mb-3">{risk.source}</p>

      {/* Description */}
      <p className="text-[12px] text-[#4b5563] leading-relaxed flex-1 mb-4">
        {risk.description.length > 220 ? risk.description.slice(0, 220) + "..." : risk.description}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-3 border-t border-[#f3f4f6]">
        <button className="flex items-center gap-1.5 text-[12px] text-[#374151] font-medium hover:text-[#111827] transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
          Edit details
        </button>
        <button className="flex items-center gap-1.5 text-[12px] text-[#374151] font-medium hover:text-[#111827] transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Quick add
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RiskDiscoveryPage() {
  const [filter, setFilter] = useState<"all" | "new">("all");
  const displayed = filter === "new" ? RISKS.filter((r) => r.isNew) : RISKS;

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Icon Sidebar */}
        <IconSidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Top nav bar */}
          <div className="h-12 bg-white border-b border-[#e5e7eb] flex items-center justify-between px-4 flex-shrink-0">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
              <span className="text-sm font-medium text-[#111827]">Label</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
            <button className="h-8 w-8 rounded-full bg-[#f3f4f6] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 px-8 py-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[12px] text-[#6b7280] mb-4">
              <span className="hover:text-[#2563eb] cursor-pointer">AI Risk Essentials</span>
              <span>›</span>
              <span className="hover:text-[#2563eb] cursor-pointer">Risk Identification</span>
              <span>›</span>
            </div>

            {/* Title */}
            <div className="flex items-center gap-3 mb-2">
              <Link href="/superhero/boards-home" className="text-[#374151] hover:text-[#111827]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              </Link>
              <h1 className="text-xl font-bold text-[#111827]">AI risk discovery</h1>
            </div>
            <p className="text-sm text-[#6b7280] mb-6 ml-8">
              Risks identified from company filings, news, and regulatory sources that may require disclosure review.
            </p>

            {/* Stats banner */}
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-5 mb-8">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-sm font-bold text-[#111827]">Risks identified</h2>
              </div>
              <p className="text-[12px] text-[#6b7280] mb-4">
                Source information from Moody&apos;s, 10-K reports, regulatory filings, and real-time news intelligence
              </p>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <div className="text-[11px] text-[#9ca3af] font-medium mb-0.5">Discovered risks</div>
                  <div className="text-lg font-bold text-[#111827]">98,120 risks</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#9ca3af] font-medium mb-0.5">Companies</div>
                  <div className="text-lg font-bold text-[#111827]">2,755 companies</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#9ca3af] font-medium mb-0.5">Industries</div>
                  <div className="text-lg font-bold text-[#111827]">64</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#9ca3af] font-medium mb-0.5">Data last updated</div>
                  <div className="text-lg font-bold text-[#111827]">18 Feb 2026</div>
                </div>
              </div>
            </div>

            {/* Risk suggestions header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-[#111827]">
                Risk suggestions <span className="text-[#6b7280] font-normal">({displayed.length})</span>
              </h2>
              <div className="flex items-center gap-3">
                {/* Search bar */}
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  <input
                    type="text"
                    placeholder="Search risks..."
                    className="h-9 w-56 rounded-lg border border-[#d1d5db] bg-white pl-9 pr-3 text-sm text-[#374151] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb]"
                  />
                </div>
                {/* Filter buttons */}
                <div className="flex items-center rounded-lg border border-[#d1d5db] overflow-hidden">
                  <button
                    onClick={() => setFilter("all")}
                    className={`h-9 px-3 text-[12px] font-medium transition-colors ${
                      filter === "all" ? "bg-[#111827] text-white" : "bg-white text-[#374151] hover:bg-[#f3f4f6]"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("new")}
                    className={`h-9 px-3 text-[12px] font-medium transition-colors border-l border-[#d1d5db] ${
                      filter === "new" ? "bg-[#111827] text-white" : "bg-white text-[#374151] hover:bg-[#f3f4f6]"
                    }`}
                  >
                    New
                    <span className="ml-1 inline-flex items-center justify-center rounded-full bg-[#ef4444] text-white text-[9px] font-bold h-4 w-4">
                      3
                    </span>
                  </button>
                </div>
                {/* Filter chip */}
                <button className="flex items-center gap-1.5 h-9 rounded-lg border border-[#d1d5db] bg-white px-3 text-[12px] font-medium text-[#374151] hover:bg-[#f3f4f6]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                  Filter
                  <span className="inline-flex items-center justify-center rounded-full bg-[#e5e7eb] text-[#374151] text-[9px] font-bold h-4 w-4">3</span>
                </button>
              </div>
            </div>

            {/* Risk card grid */}
            <div className="grid grid-cols-3 gap-5 mb-8">
              {displayed.map((risk) => (
                <RiskCardItem key={risk.id} risk={risk} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between text-[12px] text-[#6b7280] pb-6">
              <span>1–{displayed.length} of {displayed.length}</span>
              <div className="flex items-center gap-1">
                <button className="h-8 w-8 rounded-lg border border-[#d1d5db] bg-white flex items-center justify-center text-[#9ca3af]" disabled>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button className="h-8 w-8 rounded-lg bg-[#111827] text-white flex items-center justify-center text-[12px] font-bold">1</button>
                <button className="h-8 w-8 rounded-lg border border-[#d1d5db] bg-white flex items-center justify-center text-[#374151] hover:bg-[#f3f4f6] text-[12px]">2</button>
                <button className="h-8 w-8 rounded-lg border border-[#d1d5db] bg-white flex items-center justify-center text-[#374151] hover:bg-[#f3f4f6] text-[12px]">3</button>
                <span className="px-1">…</span>
                <button className="h-8 w-8 rounded-lg border border-[#d1d5db] bg-white flex items-center justify-center text-[#374151] hover:bg-[#f3f4f6] text-[12px]">23</button>
                <button className="h-8 w-8 rounded-lg border border-[#d1d5db] bg-white flex items-center justify-center text-[#374151] hover:bg-[#f3f4f6]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StakeholderFooter label="Prototype navigation — AI Risk Discovery (Diligent product view)">
        <PrototypeControlLink href="/superhero/risk-discovery-dark">
          View in Dark Mode →
        </PrototypeControlLink>
        <PrototypeControlLink href="/superhero/reviewer">
          Continue to Review Sources →
        </PrototypeControlLink>
      </StakeholderFooter>
    </div>
  );
}
