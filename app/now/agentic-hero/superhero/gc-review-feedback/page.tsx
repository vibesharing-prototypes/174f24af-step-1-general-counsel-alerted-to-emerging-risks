"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LeftRail } from "../LeftRail";
import { StakeholderFooter, PrototypeControlButton } from "../StakeholderFooter";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const GC_AVATAR_URL = "https://randomuser.me/api/portraits/med/women/65.jpg";

// Highlight colors per comment (Word/Docs style)
const HIGHLIGHT_COLORS: Record<string, string> = {
  "1": "bg-[#fef08a]/60 border-b-2 border-[#eab308]",      // Diana - yellow
  "2": "bg-[#93c5fd]/60 border-b-2 border-[#3b82f6]",      // Rachel - blue
  "3": "bg-[#d8b4fe]/60 border-b-2 border-[#a855f7]",     // Davis Polk - purple
};
const COMMENT_BORDER_COLORS: Record<string, string> = {
  "1": "border-l-[#eab308]",
  "2": "border-l-[#3b82f6]",
  "3": "border-l-[#a855f7]",
};

type FeedbackItem = {
  id: string;
  from: string;
  role: string;
  avatarUrl: string;
  originalText: string;
  replacementText: string;
  suggestion: string;
  status: "pending" | "accepted" | "declined";
};

const TEAM_FEEDBACK: FeedbackItem[] = [
  {
    id: "1",
    from: "Diana Reyes",
    role: "VP Supply Chain",
    avatarUrl: "https://randomuser.me/api/portraits/med/women/44.jpg",
    originalText: "evaluation of alternative sourcing regions as discussed at the board level",
    replacementText: "evaluation of alternative sourcing regions as discussed at the board level (Vietnam noted in Q3 materials)",
    suggestion: "Add explicit mention of Vietnam as diversification target from Q3 board materials.",
    status: "pending",
  },
  {
    id: "2",
    from: "Rachel Green",
    role: "VP Risk Management",
    avatarUrl: "https://randomuser.me/api/portraits/med/women/32.jpg",
    originalText: "impact",
    replacementText: "materially impact",
    suggestion: "Consider adding 'materially' before 'impact' to align with CRO assessment severity.",
    status: "pending",
  },
  {
    id: "3",
    from: "Davis Polk",
    role: "Outside Counsel",
    avatarUrl: "https://randomuser.me/api/portraits/med/men/52.jpg",
    originalText: "qualification of alternative suppliers",
    replacementText: "qualification of alternative suppliers typically requires 12-18 months",
    suggestion: "We recommend including the 12-18 month qualification timeline for alternative suppliers.",
    status: "pending",
  },
];

type DocPart = { type: "text"; content: string } | { type: "highlight"; commentId: string };
const DOC_PARTS: DocPart[] = [
  { type: "text", content: "Semiconductor Supply Chain and Geopolitical Risks\n\nWe face risks related to semiconductor supply chain concentration and geopolitical exposure. Approximately 47% of our chip suppliers have Taiwan-based operations. Escalating tensions in the Taiwan Strait may disrupt our semiconductor supply chain, extend lead times, and " },
  { type: "highlight", commentId: "2" },
  { type: "text", content: " our ability to source critical components.\n\nWe are pursuing supplier diversification initiatives, including " },
  { type: "highlight", commentId: "1" },
  { type: "text", content: "; however, " },
  { type: "highlight", commentId: "3" },
  { type: "text", content: "." },
];

function GcReviewFeedbackContent() {
  const router = useRouter();
  const [feedback, setFeedback] = useState<FeedbackItem[]>(TEAM_FEEDBACK);
  const [finalized, setFinalized] = useState(false);
  const [showPolicyManagerUpsell, setShowPolicyManagerUpsell] = useState(false);

  const pendingCount = feedback.filter((f) => f.status === "pending").length;
  const allResolved = pendingCount === 0;

  const handleAccept = (id: string) => {
    setFeedback((prev) => prev.map((f) => (f.id === id ? { ...f, status: "accepted" as const } : f)));
  };
  const handleDecline = (id: string) => {
    setFeedback((prev) => prev.map((f) => (f.id === id ? { ...f, status: "declined" as const } : f)));
  };

  const handleFinalize = () => {
    setFinalized(true);
    router.push("/now/agentic-hero/superhero/ceo-review/notification");
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
            <span className="text-sm font-semibold text-[#0c4a6e]">Part 2: Review & Approval</span>
          </div>
          <span className="rounded-full border-2 border-[#0c4a6e] bg-[#7dd3fc]/30 px-3 py-1 text-xs font-semibold text-[#0c4a6e]">
            Viewing as: General Counsel
          </span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <LeftRail actorLabel="General Counsel" activeWorkflowStep="Review Feedback" />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="border-b border-[#30363d] bg-[#161b22] px-6 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <img src={GC_AVATAR_URL} alt="GC" className="h-8 w-8 rounded-full object-cover" />
              <div>
                <h1 className="text-lg font-semibold text-[#f0f6fc]">Review team feedback</h1>
                <p className="text-xs text-[#8b949e]">Edits, corrections, and additions from your team</p>
              </div>
            </div>
            <Link href="/now/agentic-hero/superhero/interstitial" className="text-xs text-[#8b949e] hover:text-[#f0f6fc]">
              ← Part 1 summary
            </Link>
          </div>

          <div className="flex-1 flex overflow-hidden min-h-0">
            {/* Document with inline highlights */}
            <div className="flex-1 overflow-y-auto min-w-0">
              <div className="max-w-2xl mx-auto p-6">
                <h2 className="text-xs font-medium text-[#6e7681] uppercase tracking-wider mb-3">10-K Draft — suggested edits</h2>
                <div className="rounded-lg border border-[#30363d] bg-[#0d1117] p-5 min-h-[280px]">
                  <p className="text-sm text-[#c9d1d9] leading-relaxed font-sans">
                    {DOC_PARTS.map((part, i) => {
                      if (part.type === "text") return <span key={i}>{part.content}</span>;
                      const item = feedback.find((f) => f.id === part.commentId)!;
                      const displayText = item.status === "accepted" ? item.replacementText : item.originalText;
                      const isPending = item.status === "pending";
                      return (
                        <span
                          key={i}
                          className={cn(
                            "rounded-sm px-0.5 cursor-default",
                            isPending && HIGHLIGHT_COLORS[part.commentId],
                            item.status === "accepted" && "bg-[#3fb950]/30 border-b-2 border-[#3fb950]",
                            item.status === "declined" && "bg-transparent border-transparent"
                          )}
                          title={item.from}
                        >
                          {item.status === "declined" ? (
                            <span className="line-through opacity-60">{displayText}</span>
                          ) : (
                            displayText
                          )}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Comments sidebar — Word/Docs style */}
            <div className="w-[340px] flex-shrink-0 border-l border-[#30363d] bg-[#161b22] overflow-y-auto">
              <div className="p-4">
                <h2 className="text-xs font-medium text-[#6e7681] uppercase tracking-wider mb-3">
                  Comments ({pendingCount} pending)
                </h2>
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "rounded-lg border border-l-4 p-3 transition-colors",
                        COMMENT_BORDER_COLORS[item.id],
                        item.status === "accepted" && "border-[#3fb950]/40 bg-[#3fb950]/5 border-l-[#3fb950]",
                        item.status === "declined" && "border-[#30363d] bg-[#0d1117]/50 opacity-60 border-l-[#30363d]",
                        item.status === "pending" && "border-[#30363d] bg-[#0d1117]/30"
                      )}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <img src={item.avatarUrl} alt={item.from} className="h-8 w-8 rounded-full object-cover flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-[#f0f6fc]">{item.from}</p>
                          <p className="text-[11px] text-[#8b949e]">{item.role}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#6e7681] mb-2 font-mono bg-[#21262d] px-2 py-1 rounded border-l-2 border-[#30363d]">
                        &ldquo;{item.originalText}&rdquo;
                      </p>
                      <p className="text-sm text-[#c9d1d9] leading-relaxed mb-3">{item.suggestion}</p>
                      {item.status === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAccept(item.id)}
                            className="rounded bg-[#3fb950] px-2.5 py-1 text-[11px] font-medium text-[#0d1117] hover:bg-[#46c35a]"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleDecline(item.id)}
                            className="rounded border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-[11px] font-medium text-[#8b949e] hover:border-[#6e7681] hover:text-[#f0f6fc]"
                          >
                            Decline
                          </button>
                        </div>
                      ) : (
                        <span className={cn("text-[11px] font-medium", item.status === "accepted" ? "text-[#3fb950]" : "text-[#8b949e]")}>
                          {item.status === "accepted" ? "✓ Accepted" : "Declined"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                {/* In-situ: Policy upload for Vietnam third parties → Policy Manager upsell */}
                <div className="mt-4 rounded-lg border border-[#30363d] bg-[#0d1117] p-3">
                  <h4 className="text-[11px] font-medium text-[#8b949e] mb-2">Supporting policy</h4>
                  <p className="text-[12px] text-[#8b949e] mb-2">
                    Attach policy for Vietnam-affiliated third parties to support the disclosure.
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => setShowPolicyManagerUpsell(true)}
                      className="flex w-full items-center gap-2 rounded-lg border border-[#30363d] bg-[#21262d] px-3 py-2 text-left text-xs text-[#f0f6fc] hover:border-[#58a6ff]/50 transition-colors"
                    >
                      <span>📄</span>
                      <span>Upload from desktop</span>
                      <span className="ml-auto text-[10px] text-[#6e7681]">.doc</span>
                    </button>
                    <button
                      onClick={() => setShowPolicyManagerUpsell(true)}
                      className="flex w-full items-center gap-2 rounded-lg border border-[#30363d] bg-[#21262d] px-3 py-2 text-left text-xs text-[#f0f6fc] hover:border-[#58a6ff]/50 transition-colors"
                    >
                      <span>📁</span>
                      <span>Browse SharePoint</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 border-t border-[#30363d] bg-[#161b22] px-6 py-4 flex items-center justify-between">
            <p className="text-xs text-[#8b949e]">
              {allResolved ? "All feedback resolved. Ready to send to CEO." : `Resolve ${pendingCount} more to finalize.`}
            </p>
            <button
              onClick={handleFinalize}
              disabled={!allResolved}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                allResolved ? "bg-[#3fb950] text-[#0d1117] hover:bg-[#46c35a]" : "bg-[#21262d] text-[#484f58] cursor-not-allowed"
              )}
            >
              Finalize and send to CEO
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <StakeholderFooter label="Continue as General Counsel to advance the workflow">
        <PrototypeControlButton onClick={handleFinalize} disabled={!allResolved}>
          Finalize and send to CEO →
        </PrototypeControlButton>
      </StakeholderFooter>

      {/* In-situ Policy Manager upsell — appears when GC tries to upload policy for Vietnam third parties */}
      {showPolicyManagerUpsell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowPolicyManagerUpsell(false)}>
          <div
            className="max-w-md rounded-2xl border border-[#30363d] bg-[#161b22] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#58a6ff]/20">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#f0f6fc]">Try Policy Manager</h3>
                <p className="text-xs text-[#8b949e]">Instead of static uploads</p>
              </div>
            </div>
            <p className="text-sm text-[#c9d1d9] leading-relaxed mb-5">
              Before you upload a Word doc or browse SharePoint—consider Policy Manager. Automate drafting, approval chains, attestation, and version control instead of managing static files.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPolicyManagerUpsell(false)}
                className="flex-1 rounded-lg border border-[#30363d] bg-[#21262d] px-4 py-2.5 text-sm font-medium text-[#8b949e] hover:border-[#6e7681] hover:text-[#f0f6fc] transition-colors"
              >
                Continue with upload
              </button>
              <button
                onClick={() => setShowPolicyManagerUpsell(false)}
                className="flex-1 rounded-lg bg-[#58a6ff] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#79c0ff] transition-colors"
              >
                Try Policy Manager
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GcReviewFeedbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117] flex items-center justify-center"><div className="h-8 w-8 border-2 border-[#58a6ff] border-t-transparent rounded-full animate-spin" /></div>}>
      <GcReviewFeedbackContent />
    </Suspense>
  );
}
