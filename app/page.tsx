"use client";

import React from "react";
import Link from "next/link";

const sections = [
  {
    heading: "General Counsel",
    steps: [
      {
        id: 1,
        title: "GC Alerted to Emerging Risks",
        description: "Command Center — agents have detected new risks not captured in Board materials or filings.",
        href: "/gc-commandcenter",
      },
      {
        id: 2,
        title: "Review Detection Sources",
        description: "GC reviews what agents scanned and where the emerging risks originated.",
        href: "/superhero/reviewer",
      },
      {
        id: 3,
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
        id: 4,
        title: "Owner Investigation Notification",
        description: "Diana Reyes receives an email notification to investigate Taiwan Strait risk.",
        href: "/superhero/owner-investigation/notification?risk=risk-taiwan&owner=diana-reyes",
      },
      {
        id: 5,
        title: "Owner Investigation",
        description: "Risk owner investigates the risk, provides context, validates severity.",
        href: "/superhero/owner-investigation?risk=risk-taiwan&owner=diana-reyes",
      },
      {
        id: 6,
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
        id: 7,
        title: "Draft 10-K Risk Disclosures",
        description: "AI-assisted drafting of updated risk disclosure language for all 3 risks.",
        href: "/superhero/writer",
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
        description: "CEO reviews and approves all disclosures.",
        href: "/superhero/ceo-review",
      },
    ],
  },
  {
    heading: "Finalize",
    steps: [
      {
        id: 14,
        title: "EDGAR Approval",
        description: "GC approves EDGAR submission in Command Center after CEO approval.",
        href: "/gc-commandcenter?ceo_approved=1",
      },
      {
        id: 15,
        title: "GC Post-Review",
        description: "Disclosure in legal review — review feedback, finalize, route to CEO.",
        href: "/gc-post-review",
      },
    ],
  },
];

export default function PrototypeIndex() {
  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827]">
      <header className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <p className="text-xs font-medium uppercase tracking-widest text-[#6b7280] mb-2">
            Prototype Navigation — Not Part of Demo
          </p>
          <h1 className="text-xl font-semibold text-[#111827]">
            GC Emerging Risk Response — Page Index
          </h1>
          <p className="text-sm text-[#6b7280] mt-2 leading-relaxed">
            Jump to any page in the prototype. Use this as a cheat sheet to skip
            ahead or revisit a specific step without clicking through the full flow.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8 space-y-8">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] mb-3">
              {section.heading}
            </h2>
            <div className="rounded-lg border border-[#e5e7eb] bg-white divide-y divide-[#f3f4f6] overflow-hidden">
              {section.steps.map((step) => (
                <Link
                  key={step.id}
                  href={step.href}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#f9fafb] transition-colors group"
                >
                  <span className="flex-shrink-0 h-7 w-7 rounded-full bg-[#f3f4f6] flex items-center justify-center text-xs font-medium text-[#6b7280] group-hover:bg-[#e5e7eb] transition-colors">
                    {step.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[#111827] group-hover:text-[#2563eb] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#9ca3af] mt-0.5 truncate">{step.description}</p>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#d1d5db"
                    strokeWidth="2"
                    className="flex-shrink-0 group-hover:stroke-[#2563eb] transition-colors"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-6 border-t border-[#e5e7eb] text-center">
          <p className="text-xs text-[#d1d5db]">
            Prototype built with Next.js · Hosted on VibeSharing
          </p>
        </div>
      </main>
    </div>
  );
}
