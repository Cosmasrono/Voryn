"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Loader2,
  ChevronDown,
  Phone,
  Minimize2,
} from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED = [
  "What loans do you offer?",
  "How does graduation work for new clients?",
  "Tell me about the Asset & Equipment Loan",
  "How does Voryn Chama work?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Habari! 👋 I'm **Vori**, your Voryn Capital assistant. I can help you find the right loan (including our starter Biashara loan, group Chamas, and productive asset & equipment loans), explain how new clients graduate with trust, or guide you through applying. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── scroll to bottom on new messages ── */
  useEffect(() => {
    if (open && !minimised) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, minimised]);

  /* ── focus input when chat opens ── */
  useEffect(() => {
    if (open && !minimised) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setUnread(0);
    }
  }, [open, minimised]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMsg: Message = { role: "user", content: text.trim() };
      const history = [...messages, userMsg];
      setMessages(history);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        const data = await res.json();
        const reply: Message = {
          role: "assistant",
          content: data.content || data.error || "Sorry, something went wrong.",
        };
        setMessages((prev) => [...prev, reply]);
        if (!open || minimised) setUnread((n) => n + 1);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Sorry, I'm having trouble connecting. Please call us on **+254 722 473 078** or try again.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, open, minimised]
  );

  /* ── parse markdown with bold and links ── */
  const renderContent = (text: string) => {
    // Match markdown links [label](url) and bold **text**
    const tokens = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
    return tokens.map((token, i) => {
      if (token.startsWith("**") && token.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold text-navy-900">
            {token.slice(2, -2)}
          </strong>
        );
      }
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        return (
          <a
            key={i}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="font-medium text-gold-600 underline hover:text-gold-700"
          >
            {label}
          </a>
        );
      }
      return <span key={i}>{token}</span>;
    });
  };

  return (
    <>
      {/* ── Floating button ── */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
        {/* Unread badge bubble */}
        {!open && unread > 0 && (
          <div className="animate-bounce rounded-full bg-gold-500 px-3 py-1 text-xs font-bold text-navy-900 shadow-lg">
            {unread} new message{unread > 1 ? "s" : ""}
          </div>
        )}

        <button
          id="chat-toggle-btn"
          onClick={() => {
            setOpen((v) => !v);
            setMinimised(false);
            setUnread(0);
          }}
          aria-label={open ? "Close chat" : "Open chat with Vori"}
          className={`group relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
            open
              ? "bg-navy-800 hover:bg-navy-700"
              : "bg-gold-500 hover:bg-gold-400 hover:scale-110"
          }`}
        >
          {/* Pulse ring - only when closed */}
          {!open && (
            <>
              <span className="absolute inset-0 rounded-full bg-gold-500 opacity-30 animate-ping" />
              <span className="absolute inset-[-6px] rounded-full border-2 border-gold-500/30" />
            </>
          )}
          {open ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-navy-900" />
          )}
        </button>
      </div>

      {/* ── Chat window ── */}
      <div
        className={`fixed bottom-24 right-6 z-[99] w-[min(380px,calc(100vw-3rem))] rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right ${
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-90 opacity-0 pointer-events-none"
        }`}
        style={{ maxHeight: "min(600px, calc(100vh - 8rem))" }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-navy-800 to-navy-900 px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-navy-900 shadow-md">
              <Bot className="h-5 w-5" />
              {/* Online indicator */}
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-navy-800 bg-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none text-white">Vori</p>
              <p className="mt-0.5 text-[0.65rem] text-emerald-400">Online · Voryn Capital</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <a
              href="tel:+254722473078"
              title="Call us"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-silver-400 transition-colors hover:bg-white/10 hover:text-gold-400"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              onClick={() => setMinimised((v) => !v)}
              title={minimised ? "Expand" : "Minimise"}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-silver-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              {minimised ? (
                <ChevronDown className="h-4 w-4 rotate-180" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => setOpen(false)}
              title="Close"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-silver-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div
          className={`overflow-hidden bg-white transition-all duration-300 ${
            minimised ? "max-h-0" : "max-h-[420px]"
          }`}
        >
          {/* Messages */}
          <div className="flex flex-col gap-3 overflow-y-auto p-4" style={{ maxHeight: "340px" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    msg.role === "assistant"
                      ? "bg-gold-500 text-navy-900"
                      : "bg-navy-700 text-white"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="h-3.5 w-3.5" />
                  ) : (
                    <User className="h-3.5 w-3.5" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "assistant"
                      ? "rounded-bl-none bg-silver-100 text-navy-800"
                      : "rounded-br-none bg-navy-700 text-white"
                  }`}
                >
                  {renderContent(msg.content)}
                </div>
              </div>
            ))}

            {/* Loading dots */}
            {loading && (
              <div className="flex items-end gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-500 text-navy-900">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-none bg-silver-100 px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-silver-400 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-silver-400 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-silver-400 [animation-delay:300ms]" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested prompts - only on first message */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-1.5 px-4 pb-3">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-navy-200 bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700 transition-colors hover:bg-navy-100 hover:border-navy-300"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-silver-200 bg-white px-3 py-2.5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about loans, eligibility…"
                disabled={loading}
                className="flex-1 rounded-full border border-silver-200 bg-silver-100 px-4 py-2 text-sm text-navy-800 placeholder-silver-400 outline-none transition-colors focus:border-navy-300 focus:bg-white disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                id="chat-send-btn"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-900 shadow transition-all hover:bg-gold-400 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </form>
            <p className="mt-1.5 text-center text-[0.6rem] text-silver-400">
              Powered by Voryn Capital AI · <span className="text-gold-600 font-medium">Not financial advice</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
