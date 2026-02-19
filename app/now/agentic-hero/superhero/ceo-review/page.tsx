"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StakeholderFooter, PrototypeControlLink } from "../StakeholderFooter";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function DiligentLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 222 222" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z"/>
        <path fill="#AF292E" d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z"/>
        <path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z"/>
      </g>
    </svg>
  );
}

const CEO_AVATAR_URL = "https://i.pravatar.cc/150?u=ceo-jennifer-walsh";
const CEO_NAME = "Jennifer Walsh";

const DRAFT_PREVIEW = `Semiconductor Supply Chain and Geopolitical Risks

We face risks related to semiconductor supply chain concentration and geopolitical exposure. Approximately 47% of our chip suppliers have Taiwan-based operations. Escalating tensions in the Taiwan Strait may disrupt our semiconductor supply chain, extend lead times, and materially impact our ability to source critical components.

We are pursuing supplier diversification initiatives, including evaluation of alternative sourcing regions (Vietnam noted in Q3 board materials); however, qualification of alternative suppliers typically requires 12-18 months.

[Additional risk factor updates for Vendor Breach and EU DMA included in full document.]`;

export default function CeoApprovalPage() {
  const [approved, setApproved] = useState<boolean | null>(null);
  const [showRequestChanges, setShowRequestChanges] = useState(false);

  const handleApprove = () => {
    setApproved(true);
  };

  const handleRequestChanges = () => {
    setShowRequestChanges(true);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col">
      <div className="border-b-2 border-[#0ea5e9]/40 bg-[#e0f2fe] flex-shrink-0">
        <div className="border-b border-[#0ea5e9]/30 bg-[#bae6fd] px-4 py-2">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#0369a1]">Demo controls — not part of prototype</p>
        </div>
        <div className="px-4 py-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[#0369a1]">Prototype</span>
            <span className="text-sm font-semibold text-[#0c4a6e]">Part 2: CEO Approval</span>
          </div>
          <span className="rounded-full border-2 border-[#0c4a6e] bg-[#7dd3fc]/30 px-3 py-1 text-xs font-semibold text-[#0c4a6e]">
            Viewing as: {CEO_NAME} (CEO)
          </span>
        </div>
      </div>

      {/* Mini browser — CEO sees a single page to approve or request changes */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-2xl rounded-xl border border-[#30363d] bg-white shadow-2xl shadow-black/40 overflow-hidden flex flex-col" style={{ minHeight: "520px", maxHeight: "85vh" }}>
          {/* Browser chrome: traffic lights + address bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-[#e5e7eb] bg-[#f3f4f6]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex items-center gap-2 rounded-lg bg-white border border-[#e5e7eb] px-3 py-1.5">
              <svg className="w-3.5 h-3.5 text-[#3fb950] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-[11px] text-[#6b7280] truncate">
                https://grc.diligent.com/approvals/10k-fy2025
              </span>
            </div>
          </div>

          {/* Page header with Diligent logo */}
          <div className="border-b border-[#e5e7eb] bg-white px-6 py-4 flex items-center justify-between flex-shrink-0">
            <DiligentLogo className="h-7 w-auto" />
            <span className="text-xs text-[#6b7280]">10-K Approval</span>
          </div>

          {/* Page content — approval view or confirmation (both in white canvas) */}
          <div className="flex-1 overflow-y-auto bg-[#fafafa] min-h-0">
            <div className="max-w-xl mx-auto p-6 space-y-6">
              {approved ? (
                /* Confirmation — appears in same white canvas */
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d1fae5] mb-4">
                    <svg className="w-8 h-8 text-[#059669]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h1 className="text-xl font-semibold text-[#111827] mb-2">Approved</h1>
                  <p className="text-sm text-[#6b7280] mb-6 max-w-md">
                    The 10-K disclosure updates have been approved. Routing to outside counsel for final review, then to the audit committee for sign-off.
                  </p>
                  <p className="text-sm text-[#9ca3af]">
                    You can close this window.
                  </p>
                </div>
              ) : (
                <>
                  {/* Approval status: GC done, CEO current, next steps */}
                  <div className="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-sm">
                    <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wider mb-3">Approval status</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d1fae5] px-2.5 py-1 text-xs font-medium text-[#065f46]">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        General Counsel approved
                      </span>
                      <span className="text-[#9ca3af]">→</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dbeafe] border border-[#3b82f6]/30 px-2.5 py-1 text-xs font-medium text-[#1e40af]">
                        CEO approval (you)
                      </span>
                      <span className="text-[#9ca3af]">→</span>
                      <span className="text-xs text-[#9ca3af]">Outside counsel</span>
                      <span className="text-[#9ca3af]">→</span>
                      <span className="text-xs text-[#9ca3af]">Audit committee</span>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-lg font-semibold text-[#111827]">Approve 10-K disclosure updates</h1>
                    <p className="text-sm text-[#6b7280] mt-1">Review the document and approve or request changes</p>
                  </div>

                  <div className="rounded-lg border border-[#e5e7eb] bg-white overflow-hidden shadow-sm">
                    <div className="border-b border-[#e5e7eb] px-4 py-2.5 bg-[#f9fafb]">
                      <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wider">10-K Risk Factor Updates — FY2025</p>
                    </div>
                    <div className="p-4 max-h-64 overflow-y-auto">
                      <pre className="text-sm text-[#374151] whitespace-pre-wrap font-sans leading-relaxed">{DRAFT_PREVIEW}</pre>
                    </div>
                  </div>

                  {showRequestChanges ? (
                    <div className="rounded-lg border border-[#f59e0b]/40 bg-[#fffbeb] p-4">
                      <p className="text-sm font-medium text-[#92400e] mb-2">Request changes</p>
                      <p className="text-xs text-[#6b7280] mb-4">
                        In the full prototype, this would open a form to send feedback to the General Counsel. For this demo, you can approve to continue the flow.
                      </p>
                      <button
                        onClick={() => setShowRequestChanges(false)}
                        className="text-xs text-[#2563eb] hover:underline"
                      >
                        ← Back to approval
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-3 pt-2">
                      <button
                        onClick={handleRequestChanges}
                        className="rounded-lg border border-[#d1d5db] bg-white px-4 py-2 text-sm font-medium text-[#6b7280] hover:border-[#f59e0b] hover:text-[#d97706]"
                      >
                        Request changes
                      </button>
                      <button
                        onClick={handleApprove}
                        className="rounded-lg bg-[#10b981] px-4 py-2 text-sm font-medium text-white hover:bg-[#059669]"
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <StakeholderFooter label="Continue as CEO to complete the workflow">
        <Link href="/now/agentic-hero/superhero/ceo-review/notification" className="text-sm text-[#6b7280] hover:text-[#374151]">
          ← Back to email
        </Link>
        <PrototypeControlLink href="/now/agentic-hero/superhero/gc-notification/ceo-approved">
          Continue to GC&apos;s flow →
        </PrototypeControlLink>
      </StakeholderFooter>
    </div>
  );
}
