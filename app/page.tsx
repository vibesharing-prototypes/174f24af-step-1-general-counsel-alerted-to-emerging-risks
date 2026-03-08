"use client";

import React from "react";
import Link from "next/link";

const sections = [
  {
    heading: "Entry Points",
    steps: [
      {
        id: "A",
        title: "Boards Home (Near-Term Vision)",
        description: "GC opens the standard Boards system enhanced with the GRC Command Center panel.",
        href: "/superhero/boards-home",
      },
      {
        id: "A2",
        title: "Boards Home — Dark (Near-Term Vision)",
        description: "Dark-mode variant of the Boards system with GRC Command Center panel.",
        href: "/superhero/boards-dark",
      },
      {
        id: "B",
        title: "GRC Command Center (Full Vision)",
        description: "GC opens the full GRC Command Center — agents have detected emerging risks.",
        href: "/gc-commandcenter",
      },
    ],
  },
  {
    heading: "General Counsel — Detection & Assignment",
    steps: [
      {
        id: 1,
        title: "Review Detection Sources",
        description: "GC reviews what agents scanned and where the emerging risks originated.",
        href: "/superhero/reviewer",
      },
      {
        id: 2,
        title: "Assign Risk Owners",
        description: "GC assigns owners to each detected risk and kicks off investigation workflows.",
        href: "/superhero/coordinator",
      },
    ],
  },
  {
    heading: "Risk Owner & CRO",
    steps: [
      {
        id: 3,
        title: "Owner Investigation Notification",
        description: "Diana Reyes receives an email notification to investigate Taiwan Strait risk.",
        href: "/superhero/owner-investigation/notification?risk=risk-taiwan&owner=diana-reyes",
      },
      {
        id: 4,
        title: "Owner Investigation",
        description: "Risk owner investigates the risk, provides context, validates severity.",
        href: "/superhero/owner-investigation?risk=risk-taiwan&owner=diana-reyes",
      },
      {
        id: 5,
        title: "CRO Review",
        description: "Chief Risk Officer reviews the owner's findings and adds assessment.",
        href: "/superhero/cro-review?risk=risk-taiwan&owner=diana-reyes",
      },
    ],
  },
  {
    heading: "General Counsel — Drafting & Review",
    steps: [
      {
        id: 6,
        title: "Draft 10-K Risk Disclosures",
        description: "AI-assisted drafting of updated risk disclosure language for all 3 risks.",
        href: "/superhero/writer?risk=risk-taiwan&owner=diana-reyes",
      },
      {
        id: 7,
        title: "GC Notification — Draft Ready",
        description: "GC receives notification that the 10-K draft is ready for review.",
        href: "/superhero/gc-review/notification",
      },
      {
        id: 8,
        title: "GC Review & Feedback",
        description: "GC reviews the 10-K and ERM deck, then creates a Context Packet.",
        href: "/superhero/gc-review-feedback",
      },
      {
        id: 9,
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
        id: 10,
        title: "Diligent Data Room",
        description: "View the Context Packet and official documents in the Data Room.",
        href: "/superhero/data-room",
      },
      {
        id: 11,
        title: "Taiwan Strait — Detail",
        description: "Drill into the Taiwan Strait context packet files.",
        href: "/superhero/data-room/taiwan-strait",
      },
      {
        id: 12,
        title: "CEO Notification",
        description: "CEO receives consolidated notification for all undisclosed risks.",
        href: "/superhero/ceo-review/notification",
      },
      {
        id: 13,
        title: "CEO Approval",
        description: "CEO reviews disclosures, approves, and suggests additional committee routing.",
        href: "/superhero/ceo-review",
      },
      {
        id: "13b",
        title: "Approval Status",
        description: "CEO disclosure approval page with pipeline status, documents, AI verification, and risk cards.",
        href: "/superhero/approval-status",
      },
      {
        id: "13c",
        title: "Risk Impact Visualization",
        description: "AI-detected Taiwan Strait risk — supply chain dependency map, control coverage, and disclosure readiness.",
        href: "/superhero/risk-analysis",
      },
      {
        id: "13d",
        title: "Risk Gravity Map",
        description: "Cinematic visualization of financial exposure pulled toward major enterprise risks with scenario simulation.",
        href: "/superhero/risk-gravity",
      },
    ],
  },
  {
    heading: "Committee Review & Filing",
    steps: [
      {
        id: 14,
        title: "GC Mobile Notification — CEO Approved",
        description: "GC notified that CEO approved and wants additional committees to review.",
        href: "/superhero/gc-notification/ceo-approved",
      },
      {
        id: 15,
        title: "Board Director Reviews in Boards",
        description: "Board Director reviews 10-K risk factor update in Boards with GovernAI.",
        href: "/superhero/board-governance",
      },
      {
        id: 16,
        title: "GC — All Committee Members Reviewed",
        description: "GC sees all committee members reviewed, EDGAR filing package is ready.",
        href: "/superhero/gc-committee-complete",
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
            Prototype Navigation — Not Part of Demo
          </p>
          <h1 className="text-xl font-semibold text-[#f0f6fc]">
            GC Emerging Risk Response — Page Index
          </h1>
          <p className="text-sm text-[#8b949e] mt-2 leading-relaxed">
            Jump to any page in the prototype. Use this as a cheat sheet to skip
            ahead or revisit a specific step without clicking through the full flow.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8 space-y-8">
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

        <div className="pt-6 border-t border-[#21262d] text-center">
          <p className="text-xs text-[#484f58]">
            Prototype built with Next.js · Hosted on VibeSharing
          </p>
        </div>
      </main>
    </div>
  );
}
