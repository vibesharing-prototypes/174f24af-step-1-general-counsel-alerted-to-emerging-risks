"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { StakeholderFooter, PrototypeControlLink } from "../../StakeholderFooter";

const CEO_NAME = "Jennifer Walsh";
const CEO_EMAIL = "jennifer.walsh@company.com";
const APPROVAL_URL = "/now/agentic-hero/superhero/ceo-review";

function NotificationContent() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col">
      <div className="border-b-2 border-[#0ea5e9]/40 bg-[#e0f2fe] flex-shrink-0">
        <div className="border-b border-[#0ea5e9]/30 bg-[#bae6fd] px-4 py-2">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#0369a1]">Demo controls — not part of prototype</p>
        </div>
        <div className="px-4 py-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[#0369a1]">Prototype</span>
            <span className="text-sm font-semibold text-[#0c4a6e]">Part 2: Review & Approval</span>
          </div>
          <span className="rounded-full border-2 border-[#0c4a6e] bg-[#7dd3fc]/30 px-3 py-1 text-xs font-semibold text-[#0c4a6e]">
            Viewing as: {CEO_NAME} (CEO)
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <p className="text-center text-sm text-[#8b949e] mb-6">
            {CEO_NAME} receives this notification after the General Counsel finalizes the 10-K disclosure updates.
          </p>

          <div className="rounded-2xl border border-[#30363d] bg-[#161b22] overflow-hidden shadow-xl">
            <div className="border-b border-[#30363d] bg-[#0d1117] px-6 py-4">
              <div className="flex items-center gap-2 text-[#6e7681] text-xs mb-2">
                <span>From:</span>
                <span className="text-[#f0f6fc]">GRC Command Center &lt;noreply@diligent.com&gt;</span>
              </div>
              <div className="flex items-center gap-2 text-[#6e7681] text-xs mb-2">
                <span>To:</span>
                <span className="text-[#f0f6fc]">{CEO_NAME} &lt;{CEO_EMAIL}&gt;</span>
              </div>
              <div className="flex items-center gap-2 text-[#6e7681] text-xs">
                <span>Subject:</span>
                <span className="text-[#f0f6fc] font-medium">10-K disclosure updates ready for your approval</span>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-[#f0f6fc]">
                Hi Jennifer,
              </p>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                The General Counsel has completed the 10-K disclosure updates for emerging risks (Taiwan Strait, Vendor Breach, EU DMA). 
                The draft has been reviewed by risk owners, the CRO, and outside counsel. Your approval is required before routing to the audit committee.
              </p>
              <div className="rounded-xl border border-[#30363d] bg-[#0d1117] p-4">
                <p className="text-[10px] font-medium uppercase tracking-wider text-[#6e7681] mb-1">Document</p>
                <p className="text-sm font-semibold text-[#f0f6fc]">10-K Risk Factor Updates — FY2025</p>
                <p className="text-xs text-[#8b949e] mt-1">3 risk factors updated with team feedback incorporated</p>
              </div>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                Please review the document and approve or request changes. Upon approval, the disclosure will be routed to outside counsel for final review and then to the audit committee for sign-off.
              </p>
              <Link
                href={APPROVAL_URL}
                className="inline-flex items-center gap-2 rounded-lg border-2 border-[#ec4899] bg-[#ec4899]/10 px-5 py-2.5 text-sm font-semibold text-[#ec4899] hover:bg-[#ec4899]/20 transition-colors"
              >
                Review and approve
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-[#6e7681] mt-6">
            Click &quot;Review and approve&quot; to continue as {CEO_NAME} →
          </p>
        </div>
      </div>

      <StakeholderFooter label={`Continue as ${CEO_NAME} (CEO) to advance the workflow`}>
        <Link href="/now/agentic-hero/superhero/gc-review-feedback" className="text-sm text-[#6b7280] hover:text-[#374151]">
          ← Back to GC review
        </Link>
        <PrototypeControlLink href={APPROVAL_URL}>
          Review and approve as {CEO_NAME} →
        </PrototypeControlLink>
      </StakeholderFooter>
    </div>
  );
}

export default function CeoNotificationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117] flex items-center justify-center"><div className="h-8 w-8 border-2 border-[#58a6ff] border-t-transparent rounded-full animate-spin" /></div>}>
      <NotificationContent />
    </Suspense>
  );
}
