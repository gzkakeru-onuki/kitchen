"use client";

import { useState } from "react";
import { chatThreads } from "@/lib/mock";
import type { ChatThread } from "@/lib/mock";

export default function ChatPage() {
  const [threads, setThreads] = useState<ChatThread[]>(chatThreads);
  const [activeId, setActiveId] = useState<string>(chatThreads[0].id);
  const [draft, setDraft] = useState("");

  const active = threads.find((t) => t.id === activeId)!;

  function send() {
    const text = draft.trim();
    if (!text) return;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeId
          ? {
              ...t,
              messages: [...t.messages, { from: "me", text, time: "今" }],
            }
          : t
      )
    );
    setDraft("");
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-black text-2xl md:text-3xl text-ink">
          チャット
        </h1>
        <p className="text-muted mt-1">運営事務局とのやり取り</p>
      </div>

      <div className="grid gap-5 md:grid-cols-[300px_1fr] bg-white rounded-2xl border border-line overflow-hidden">
        {/* スレッド一覧 */}
        <div className="border-b md:border-b-0 md:border-r border-line">
          {threads.map((t) => {
            const last = t.messages[t.messages.length - 1];
            const isActive = t.id === activeId;
            return (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`w-full text-left px-5 py-4 border-b border-line last:border-b-0 transition ${
                  isActive ? "bg-blue-50" : "hover:bg-paper"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold shrink-0">
                    運
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-ink text-sm truncate">
                      {t.subtitle}
                    </p>
                    <p className="text-xs text-muted truncate">{last.text}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* メッセージ */}
        <div className="flex flex-col h-[520px]">
          <div className="px-5 py-4 border-b border-line">
            <p className="font-bold text-ink">{active.title}</p>
            <p className="text-xs text-muted">{active.subtitle}</p>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-paper">
            {active.messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[75%]">
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.from === "me"
                        ? "bg-brand text-white rounded-br-sm"
                        : "bg-white border border-line text-ink rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                  <p
                    className={`text-[11px] text-muted mt-1 ${
                      m.from === "me" ? "text-right" : "text-left"
                    }`}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-line flex items-center gap-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="メッセージを入力"
              className="flex-1 rounded-xl border border-line px-4 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button
              onClick={send}
              className="bg-brand hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl transition shrink-0"
            >
              送信
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
