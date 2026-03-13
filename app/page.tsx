"use client";

import React from "react";
import Link from "next/link";

const sections = [
  {
    heading: "Story Flow A — Boards Workflow",
    steps: [
      {
        id: "A1",
        title: "Boards Home",
        description: "GC opens Boards and sees the GRC Command Center detect emerging risks in real-time.",
        href: "/superhero/boards-home",
      },
      {
        id: "A2",
        title: "Assign Risk Owners (Boards)",
        description: "GC assigns recommended risk owners directly from the Boards right rail.",
        href: "/superhero/boards-assign",
      },
      {
        id: "A3",
        title: "Risk Owners Notified (Boards)",
        description: "Confirmation that risk owners have been notified — GC's job is done for now.",
        href: "/superhero/boards-status",
      },
    ],
  },
  {
    heading: "Story Flow B — GRC Command Center",
    steps: [
      {
        id: "B1",
        title: "GRC Command Center",
        description: "Full-vision GRC Command Center — agents detect risks, GC assigns owners in one step.",
        href: "/gc-commandcenter",
      },
      {
        id: "B2",
        title: "Risk Owners Notified (Command Center)",
        description: "Post-assignment status page — risk owners notified and AI-guided interviews underway.",
        href: "/gc-commandcenter/status",
      },
    ],
  },
  {
    heading: "Risk Owner Investigation",
    steps: [
      {
        id: "C1",
        title: "Owner Notification Email",
        description: "Diana Reyes receives an email notification to investigate Taiwan Strait risk.",
        href: "/superhero/owner-investigation/notification?risk=risk-taiwan&owner=diana-reyes",
      },
      {
        id: "C2",
        title: "Owner Investigation Interview",
        description: "Risk owner provides context, validates severity, and confirms existing controls.",
        href: "/superhero/owner-investigation?risk=risk-taiwan&owner=diana-reyes",
      },
    ],
  },
  {
    heading: "CRO — AI Risk Essentials",
    steps: [
      {
        id: "D1",
        title: "AI Risk Essentials",
        description: "CRO dashboard — AI-discovered risks, toaster alert that Diana Reyes submitted her interview.",
        href: "/superhero/risk-discovery",
      },
      {
        id: "D2",
        title: "AI Risk Essentials (Light Mode)",
        description: "Light-mode variant of the AI Risk Essentials dashboard.",
        href: "/superhero/risk-discovery-dark",
      },
      {
        id: "D3",
        title: "CRO Review — Diana Reyes Interview",
        description: "CRO reviews Diana Reyes' investigation findings for Taiwan Strait risk.",
        href: "/superhero/cro-review?risk=risk-taiwan&owner=diana-reyes",
      },
    ],
  },
  {
    heading: "AI Risk Impact Simulator",
    steps: [
      {
        id: "E1",
        title: "Simulator Home",
        description: "AI Risk Impact Simulator landing — Taiwan Strait cascade analysis across 6 dimensions.",
        href: "/superhero/risk-analysis",
      },
      {
        id: "E2",
        title: "Gravity Map",
        description: "Visualize how major risks pull financial exposure into their orbit with scenario simulation.",
        href: "/superhero/risk-gravity",
      },
      {
        id: "E3",
        title: "Risk Shockwave",
        description: "Animated propagation from geopolitical signal to disclosure — 37 min across 5 functions.",
        href: "/superhero/risk-shockwave",
      },
      {
        id: "E4",
        title: "Risk Pipeline",
        description: "Full traceability from signal detection to GC decision across 7 stages.",
        href: "/superhero/risk-pipeline",
      },
    ],
  },
  {
    heading: "General Counsel — Drafting & Review",
    steps: [
      {
        id: "F1",
        title: "Review Detection Sources",
        description: "GC reviews what agents scanned and where the emerging risks originated.",
        href: "/superhero/reviewer",
      },
      {
        id: "F2",
        title: "Assign Risk Owners (Legacy)",
        description: "GC assigns owners to each detected risk and kicks off investigation workflows.",
        href: "/superhero/coordinator",
      },
      {
        id: "F3",
        title: "Draft 10-K Risk Disclosures",
        description: "AI-assisted drafting of updated risk disclosure language for all 3 risks.",
        href: "/superhero/writer?risk=risk-taiwan&owner=diana-reyes",
      },
      {
        id: "F4",
        title: "GC Notification — Draft Ready",
        description: "GC receives notification that the 10-K draft is ready for review.",
        href: "/superhero/gc-review/notification",
      },
      {
        id: "F5",
        title: "GC Review & Feedback",
        description: "GC reviews the 10-K and ERM deck, then creates a Context Packet.",
        href: "/superhero/gc-review-feedback",
      },
      {
        id: "F6",
        title: "Context Packet",
        description: "Build a Context Packet with peer filings, transcripts, news, and Q&A prep.",
        href: "/superhero/context-packet",
      },
    ],
  },
  {
    heading: "Data Room & CEO Approval",
    steps: [
      {
        id: "G1",
        title: "Diligent Data Room",
        description: "View the Context Packet and official documents in the Data Room.",
        href: "/superhero/data-room",
      },
      {
        id: "G2",
        title: "Taiwan Strait — Detail",
        description: "Drill into the Taiwan Strait context packet files.",
        href: "/superhero/data-room/taiwan-strait",
      },
      {
        id: "G3",
        title: "CEO Notification",
        description: "CEO receives consolidated notification for all undisclosed risks.",
        href: "/superhero/ceo-review/notification",
      },
      {
        id: "G4",
        title: "CEO Approval",
        description: "CEO reviews disclosures, approves, and suggests additional committee routing.",
        href: "/superhero/ceo-review",
      },
      {
        id: "G5",
        title: "Approval Status",
        description: "CEO disclosure approval page with pipeline status, documents, AI verification.",
        href: "/superhero/approval-status",
      },
    ],
  },
  {
    heading: "Committee Review & Filing",
    steps: [
      {
        id: "H1",
        title: "GC Mobile Notification — CEO Approved",
        description: "GC notified that CEO approved and wants additional committees to review.",
        href: "/superhero/gc-notification/ceo-approved",
      },
      {
        id: "H2",
        title: "Board Director Reviews in Boards",
        description: "Board Director reviews 10-K risk factor update in Boards with GovernAI.",
        href: "/superhero/board-governance",
      },
      {
        id: "H3",
        title: "GC — All Committee Members Reviewed",
        description: "GC sees all committee members reviewed, EDGAR filing package is ready.",
        href: "/superhero/gc-committee-complete",
      },
    ],
  },
  {
    heading: "Other Entry Points",
    steps: [
      {
        id: "Z1",
        title: "Boards Home — Dark Variant",
        description: "Dark-mode variant of the Boards system with GRC Command Center panel.",
        href: "/superhero/boards-dark",
      },
    ],
  },
];

export default function PrototypeIndex() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <header className="border-b border-[#21262d] bg-[#161b22]">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full bg-[#30363d] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#c9d1d9]">
              Dark Mode
            </span>
            <Link
              href="/light"
              className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-[#8b949e] hover:bg-white/20 hover:text-[#f0f6fc] transition-colors"
            >
              Switch to Light Mode →
            </Link>
          </div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#8b949e] mb-2">
            Diligent Prototype — For illustrative and alignment purposes
          </p>
          <h1 className="text-xl font-semibold text-[#f0f6fc]">
            Enterprise Risk Governance — Prototype Index
          </h1>
          <p className="text-sm text-[#8b949e] mt-2 leading-relaxed">
            Jump to any page in the prototype. Two story flows begin at the top — Boards
            workflow and GRC Command Center — then converge at the Risk Owner investigation.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8 space-y-8">
        {/* Teams Simulation — top of page */}
        <div>
          <Link
            href="/teams"
            className="block rounded-xl border border-[#6264A7]/40 bg-[#6264A7]/10 p-5 hover:bg-[#6264A7]/20 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#6264A7] flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="inline-flex items-center rounded-full bg-[#6264A7]/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6264A7]">New</span>
                </div>
                <h3 className="text-base font-semibold text-[#f0f6fc] group-hover:text-[#6264A7] transition-colors">Microsoft Teams Simulation — Full ERG Workflow</h3>
                <p className="text-xs text-[#8b949e] mt-1 leading-relaxed">8-step end-to-end workflow inside Teams — risk detection, owner interviews, CRO assessment, GC disclosure drafting, CEO/CFO certification, committee review, and EDGAR filing via chat with Diligent AI agents.</p>
              </div>
            </div>
          </Link>
          <Link
            href="/slack"
            className="block rounded-xl border border-[#4A154B]/40 bg-[#4A154B]/10 p-5 hover:bg-[#4A154B]/20 transition-all group mt-3"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#4A154B] flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M14.5 2c-1.1 0-2 .9-2 2v3.5h3.5c1.1 0 2-.9 2-2s-.9-2-2-2h-1.5z" /><path d="M2 9.5c0 1.1.9 2 2 2h3.5V8H4c-1.1 0-2 .9-2 2z" /><path d="M9.5 22c1.1 0 2-.9 2-2v-3.5H8c-1.1 0-2 .9-2 2s.9 2 2 2h1.5z" /><path d="M22 14.5c0-1.1-.9-2-2-2h-3.5V16H20c1.1 0 2-.9 2-2z" /></svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="inline-flex items-center rounded-full bg-[#4A154B]/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#9B59B6]">New</span>
                </div>
                <h3 className="text-base font-semibold text-[#f0f6fc] group-hover:text-[#9B59B6] transition-colors">Slack Simulation — Full ERG Workflow</h3>
                <p className="text-xs text-[#8b949e] mt-1 leading-relaxed">Same 8-step workflow inside Slack — channels, DMs, Block Kit cards, and the Diligent Risk Agent app working alongside your team.</p>
              </div>
            </div>
          </Link>
        </div>

        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#6e7681] mb-3">
              {section.heading}
            </h2>
            <div className="rounded-lg border border-[#30363d] bg-[#161b22] divide-y divide-[#21262d] overflow-hidden">
              {section.steps.map((step) => (
                <Link
                  key={step.id}
                  href={step.href}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#21262d] transition-colors group"
                >
                  <span className="flex-shrink-0 h-7 w-7 rounded-full bg-[#21262d] flex items-center justify-center text-xs font-medium text-[#8b949e] group-hover:bg-[#30363d] transition-colors">
                    {step.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[#f0f6fc] group-hover:text-[#58a6ff] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#6e7681] mt-0.5 truncate">{step.description}</p>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#484f58"
                    strokeWidth="2"
                    className="flex-shrink-0 group-hover:stroke-[#58a6ff] transition-colors"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-4 text-center">
          <p className="text-xs text-[#484f58]">
            Prototype built with Next.js · Hosted on VibeSharing
          </p>
        </div>
      </main>
    </div>
  );
}
