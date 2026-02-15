"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

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

const DiligentAgentIcon = () => (
  <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-auto">
    <path d="M20.1006 15.6877C20.0186 15.8056 19.9338 15.9211 19.8467 16.0364C19.5697 16.4006 19.2675 16.7474 18.9443 17.0706C17.5077 18.5072 15.6393 19.5107 13.5459 19.8596L6.03223 12.345L8.3877 9.98755H8.38965L8.39258 9.98462L20.1006 15.6877Z" fill="#D3222A"/>
    <path d="M20.0259 4.21263C21.1905 5.84672 21.8735 7.84495 21.8735 9.99974C21.8735 12.116 21.2194 14.0737 20.1011 15.6872L8.39209 9.98412L20.0259 4.21263Z" fill="#EE312E"/>
    <path d="M13.5454 19.8581C13.0018 19.9504 12.4428 19.9997 11.8735 19.9997H3.69971L4.89307 13.4802L6.03174 12.3445L13.5454 19.8581Z" fill="#AF292E"/>
    <path d="M7.40379 10.0005L4.93727 11.2296L3.69979 13.7003L2.46653 11.2296L0 10.0005L2.46653 8.76302L3.69979 6.29649L3.71242 6.31754L4.93727 8.76302L7.40379 10.0005Z" fill="#1E1E1E"/>
    <path d="M13.5435 0.141312C16.0395 0.559546 18.2228 1.90387 19.7261 3.80733C19.8311 3.94057 19.9311 4.07423 20.0259 4.2126L8.39209 9.98409H8.38623L6.04443 7.63936L13.5435 0.141312Z" fill="#D3222A"/>
    <path d="M11.8735 0C12.4429 2.15682e-05 12.9997 0.0482901 13.5435 0.140625L6.04443 7.63965L4.88232 6.47754L3.69971 0H11.8735Z" fill="#AF292E"/>
    <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
    <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
    <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
    <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
    <path d="M9.66016 9.99998L4.55273 15.1064V12.9785L7.53223 9.99998L4.55273 6.59471V4.89256L9.66016 9.99998Z" fill="#F8F8FA"/>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Risk assignment data                                               */
/* ------------------------------------------------------------------ */

const RISK_DATA: Record<string, { name: string; severity: string; summary: string; aiAnalysis: string; disclosureRec: string }> = {
  "risk-taiwan": {
    name: "Taiwan Strait Geopolitical Tensions",
    severity: "Critical",
    summary: "Escalating tensions in the Taiwan Strait may disrupt semiconductor supply chain. 47% of chip suppliers have Taiwan-based operations.",
    aiAnalysis: `Based on analysis of 2,847 news items, 186 supply chain records, and cross-reference with current 10-K disclosures:

CURRENT STATE:
• 47% of semiconductor suppliers have Taiwan-based manufacturing
• 23% of annual chip procurement flows through Taiwan facilities
• Current 10-K mentions "general supply chain risks" but no geographic specificity

RISK FACTORS:
• Recent military exercises increased shipping disruption risk by 340%
• Insurance costs for Taiwan-sourced components up 67% YoY
• Lead times extended 2-4 weeks for Taiwan-manufactured chips

RECOMMENDATION: Add specific language addressing semiconductor supply concentration in Taiwan region and potential impact of geopolitical disruption on operations.`,
    disclosureRec: "Add specific language to 10-K Item 1A Risk Factors addressing semiconductor supply concentration in Taiwan region and potential impact of geopolitical disruption on operations.",
  },
  "risk-vendor": {
    name: "Critical Vendor Cybersecurity Breach",
    severity: "High",
    summary: "CloudSecure Inc. ransomware incident affects 3 data processing agreements with 2.3M customer records.",
    aiAnalysis: `Based on vendor intelligence and incident reports:

CURRENT STATE:
• CloudSecure Inc. reported ransomware incident affecting 3 of our DPAs
• 2.3M customer records potentially exposed
• Current 10-K has general cybersecurity risk factors

RECOMMENDATION: Assess materiality for potential 8-K; update 10-K Risk Factors with vendor-specific concentration risk.`,
    disclosureRec: "Assess materiality for potential 8-K filing; update 10-K Risk Factors with vendor concentration and third-party breach exposure.",
  },
  "risk-dma": {
    name: "EU Digital Markets Act Enforcement",
    severity: "High",
    summary: "EC enforcement actions against 3 peer companies. Our EU operations (23% of revenue) may face similar scrutiny.",
    aiAnalysis: `Based on regulatory watch and peer analysis:

CURRENT STATE:
• EC enforcement actions against 3 peer companies in our sector
• Our EU operations represent 23% of revenue
• Current 10-K has general regulatory risk factors

RECOMMENDATION: Add DMA-specific risk factor; consider geographic revenue disclosure update.`,
    disclosureRec: "Add EU Digital Markets Act-specific risk factor to 10-K Item 1A; consider updating geographic revenue disclosure.",
  },
};

const OWNER_DATA: Record<string, { name: string; title: string; avatarUrl: string }> = {
  "diana-reyes": { name: "Diana Reyes", title: "VP Supply Chain", avatarUrl: "https://randomuser.me/api/portraits/med/women/44.jpg" },
  "marcus-webb": { name: "Marcus Webb", title: "CISO", avatarUrl: "https://i.pravatar.cc/150?u=marcus-webb" },
  "james-park": { name: "James Park", title: "Chief Compliance Officer", avatarUrl: "https://i.pravatar.cc/150?u=james-park" },
};

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
  component?: React.ReactNode;
};

type Step = "welcome" | "context" | "severity" | "disclosure" | "complete";

function OwnerInvestigationContent() {
  const searchParams = useSearchParams();
  const riskId = searchParams?.get("risk") || "risk-taiwan";
  const ownerId = searchParams?.get("owner") || "diana-reyes";

  const risk = RISK_DATA[riskId] || RISK_DATA["risk-taiwan"];
  const owner = OWNER_DATA[ownerId] || OWNER_DATA["diana-reyes"];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("welcome");
  const [isLoading, setIsLoading] = useState(false);
  const [userContext, setUserContext] = useState("");
  const [severityChoice, setSeverityChoice] = useState<"agree" | "upgrade" | "downgrade" | null>(null);
  const [disclosureConfirmed, setDisclosureConfirmed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: "1",
        role: "assistant",
        content: `Hi ${owner.name}, you've been assigned to investigate a risk that requires your domain expertise. The General Counsel needs your input before proceeding to draft 10-K disclosure updates.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      }]);
    }
  }, [owner.name]);

  // Add AI analysis message after welcome
  useEffect(() => {
    if (messages.length !== 1) return;
    const timer = setTimeout(() => {
      setMessages(prev => {
        if (prev.length !== 1) return prev;
        return [...prev, {
          id: "2",
          role: "assistant",
          content: `Here's the risk you've been assigned and the AI analysis for your review:`,
          timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
          component: (
            <div className="mt-3 space-y-3">
              <div className="rounded-xl border border-[#30363d] bg-[#0d1117] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-[#f0f6fc]">{risk.name}</h4>
                  <span className="rounded-full border border-[#da3633]/50 bg-[#da3633]/20 px-2 py-0.5 text-[10px] font-medium text-[#da3633]">{risk.severity}</span>
                </div>
                <p className="text-xs text-[#8b949e] mb-3">{risk.summary}</p>
                <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-3">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[#6e7681] mb-2">AI Analysis</p>
                  <pre className="text-xs text-[#8b949e] whitespace-pre-wrap font-mono leading-relaxed">{risk.aiAnalysis}</pre>
                </div>
              </div>
              <p className="text-xs text-[#8b949e]">Please review the analysis above. I'll ask you a few questions to complete your investigation.</p>
            </div>
          ),
        }];
      });
      setStep("context");
      scrollToBottom();
    }, 800);
    return () => clearTimeout(timer);
  }, [messages.length, risk]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed && step !== "severity" && step !== "disclosure") return;

    if (step === "context") {
      setMessages(prev => [...prev, {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      }]);
      setUserContext(trimmed);
      setInput("");
      setIsLoading(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: "Thank you for that context. I've added it to the risk analysis. Next, the AI assessed this risk as CRITICAL. Based on your domain expertise, do you agree with this severity assessment?",
          timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
          component: (
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                { value: "agree" as const, label: "Agree with CRITICAL" },
                { value: "upgrade" as const, label: "Should be higher" },
                { value: "downgrade" as const, label: "Should be lower" },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleSeveritySelect(opt.value)}
                  className="rounded-lg border border-[#30363d] bg-[#21262d] px-4 py-2 text-xs font-medium text-[#f0f6fc] hover:border-[#58a6ff]/50 hover:bg-[#58a6ff]/10 transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ),
        }]);
        setStep("severity");
        setIsLoading(false);
        scrollToBottom();
      }, 1000);
    }
  };

  const handleSeveritySelect = (choice: "agree" | "upgrade" | "downgrade") => {
    setSeverityChoice(choice);
    const labels = { agree: "Agree with CRITICAL", upgrade: "Should be higher", downgrade: "Should be lower" };
    setMessages(prev => [...prev, {
      id: `u-${Date.now()}`,
      role: "user",
      content: labels[choice],
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    }]);
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: "Got it. Finally, please confirm the disclosure recommendation. Diligent AI suggests the following update for the 10-K:",
        timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        component: (
          <div className="mt-3 space-y-3">
            <div className="rounded-xl border border-[#58a6ff]/30 bg-[#58a6ff]/5 p-4">
              <p className="text-xs text-[#f0f6fc]">{risk.disclosureRec}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDisclosureConfirm}
                className="rounded-lg bg-[#3fb950] px-4 py-2 text-xs font-medium text-[#0d1117] hover:bg-[#56d364] transition-colors"
              >
                Confirm recommendation
              </button>
              <button
                onClick={handleDisclosureReject}
                className="rounded-lg border border-[#30363d] bg-[#21262d] px-4 py-2 text-xs font-medium text-[#8b949e] hover:border-[#da3633]/50 hover:bg-[#da3633]/10 hover:text-[#ff7b72] transition-colors"
              >
                Request changes
              </button>
            </div>
          </div>
        ),
      }]);
      setStep("disclosure");
      setIsLoading(false);
      scrollToBottom();
    }, 600);
  };

  const handleDisclosureConfirm = () => {
    setDisclosureConfirmed(true);
    setMessages(prev => [...prev, {
      id: `u-${Date.now()}`,
      role: "user",
      content: "Confirm recommendation",
      timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    }]);
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: "Investigation complete. Your input has been added to the risk analysis. The General Counsel will proceed to draft the 10-K disclosure update. Once all owners complete their investigations, the workflow continues to drafting.",
        timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        component: (
          <div className="mt-3 rounded-xl border border-[#3fb950]/30 bg-[#3fb950]/5 p-4">
            <div className="flex items-center gap-2 text-[#3fb950] mb-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span className="text-sm font-medium">Investigation submitted</span>
            </div>
            <p className="text-xs text-[#8b949e]">Thank you for your contribution. The GC will be notified.</p>
          </div>
        ),
      }]);
      setStep("complete");
      setIsLoading(false);
      scrollToBottom();
    }, 800);
  };

  const handleDisclosureReject = () => {
    const ts = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setMessages(prev => [...prev,
      {
        id: `u-${Date.now()}`,
        role: "user",
        content: "Request changes",
        timestamp: ts,
      },
      {
        id: `a-${Date.now() + 1}`,
        role: "assistant",
        content: "I've flagged your request for changes. The General Counsel will review and may reach out for clarification. You can add a note below if you'd like to specify what should be revised.",
        timestamp: ts,
        component: (
          <div className="mt-3">
            <textarea
              placeholder="Describe what changes you'd recommend..."
              className="w-full rounded-lg border border-[#30363d] bg-[#161b22] px-3 py-2 text-xs text-[#f0f6fc] placeholder-[#484f58] focus:border-[#58a6ff] focus:outline-none resize-none"
              rows={3}
            />
            <button
              onClick={() => {
                setMessages(prev => [...prev, {
                  id: `a-${Date.now()}`,
                  role: "assistant",
                  content: "Your feedback has been submitted. The GC will review before drafting.",
                  timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
                }]);
                setStep("complete");
              }}
              className="mt-2 rounded-lg bg-[#58a6ff] px-4 py-2 text-xs font-medium text-white hover:bg-[#79c0ff]"
            >
              Submit feedback
            </button>
          </div>
        ),
      },
    ]);
    scrollToBottom();
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col">
      {/* Meta-Prototype-Info blue banner with actor indicator */}
      <div className="border-b-2 border-[#0ea5e9]/40 bg-[#e0f2fe] flex-shrink-0">
        <div className="border-b border-[#0ea5e9]/30 bg-[#bae6fd] px-4 py-2">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#0369a1]">Demo controls — not part of prototype</p>
        </div>
        <div className="px-4 py-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[#0369a1]">Prototype</span>
            <span className="text-sm font-semibold text-[#0c4a6e]">Risk Owner Investigation (chat view)</span>
          </div>
          <span className="rounded-full border-2 border-[#0c4a6e] bg-[#7dd3fc]/30 px-3 py-1 text-xs font-semibold text-[#0c4a6e]">
            Viewing as: {owner.name} (Risk Owner)
          </span>
        </div>
      </div>

      {/* Header - GRC Command Center */}
      <div className="border-b border-[#30363d] bg-[#161b22] flex-shrink-0">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <DiligentLogo className="h-7 w-auto" />
                <span className="text-sm font-semibold text-[#f0f6fc]">GRC Command Center</span>
              </div>
              <span className="rounded-full border border-[#3fb950]/40 bg-[#3fb950]/10 px-2 py-0.5 text-[10px] font-medium text-[#3fb950]">
                Risk Owner: {owner.name}
              </span>
            </div>
            <Link href="/step-1" className="text-xs text-[#8b949e] hover:text-[#f0f6fc]">
              Command Center
            </Link>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white flex-shrink-0 p-0.5">
              <DiligentAgentIcon />
            </div>
            <span className="text-xs font-medium uppercase tracking-wider text-[#6e7681]">Risk Investigation</span>
          </div>

          <div className="space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
              >
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white p-1">
                    <DiligentAgentIcon />
                  </div>
                )}
                {msg.role === "user" && (
                  <img
                    src={owner.avatarUrl}
                    alt={owner.name}
                    className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div className={cn("flex-1 min-w-0", msg.role === "user" && "flex justify-end")}>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-3 max-w-[85%]",
                      msg.role === "user"
                        ? "bg-[#30363d] rounded-br-md"
                        : "border border-[#30363d] bg-[#161b22] rounded-bl-md"
                    )}
                  >
                    <p className="text-sm text-[#f0f6fc] whitespace-pre-wrap">{msg.content}</p>
                    {msg.component}
                    <p className="mt-2 text-[10px] text-[#6e7681]">{msg.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white p-1">
                  <DiligentAgentIcon />
                </div>
                <div className="rounded-2xl rounded-bl-md border border-[#30363d] bg-[#161b22] px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#58a6ff] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-2 w-2 rounded-full bg-[#58a6ff] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-2 w-2 rounded-full bg-[#58a6ff] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Blue footer - show when investigation complete */}
      {step === "complete" && (
        <div className="border-t-2 border-[#0ea5e9] bg-[#0c4a6e] flex-shrink-0">
          <div className="border-t border-[#0ea5e9]/30 bg-[#0369a1]/50 px-4 py-3">
            <div className="mx-auto max-w-4xl flex items-center justify-between flex-wrap gap-3">
              <p className="text-[10px] font-medium uppercase tracking-widest text-[#7dd3fc]">
                Switch to next actor in workflow
              </p>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem("croReview", JSON.stringify({
                      riskId,
                      ownerId,
                      ownerName: owner.name,
                      riskName: risk.name,
                      userContext,
                      severityChoice,
                      disclosureConfirmed,
                    }));
                  }
                  router.push(`/now/agentic-hero/superhero/cro-review?risk=${riskId}&owner=${ownerId}`);
                }}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#0c4a6e] hover:bg-[#7dd3fc] transition-colors"
              >
                Continue to Chief Risk Officer view →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input - show when awaiting text input */}
      {step === "context" && (
        <div className="border-t border-[#30363d] bg-[#0d1117] p-4 flex-shrink-0">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-[#30363d] bg-[#161b22] p-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white flex-shrink-0 p-1.5">
                  <DiligentAgentIcon />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Add context from your domain expertise..."
                  className="flex-1 bg-transparent text-sm text-[#f0f6fc] placeholder-[#484f58] focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
                    input.trim() && !isLoading ? "bg-[#58a6ff] text-white hover:bg-[#79c0ff]" : "bg-[#21262d] text-[#484f58]"
                  )}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="mt-2 text-center text-[10px] text-[#484f58]">
              The system will ask you to review the AI analysis, add context, and validate recommendations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OwnerInvestigationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117] flex items-center justify-center"><div className="h-8 w-8 border-2 border-[#58a6ff] border-t-transparent rounded-full animate-spin" /></div>}>
      <OwnerInvestigationContent />
    </Suspense>
  );
}
