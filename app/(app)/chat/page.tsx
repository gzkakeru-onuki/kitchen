"use client";

import { useState } from "react";
import { Headset, MessageSquarePlus, Paperclip, Send } from "lucide-react";
import { chatThreads } from "@/lib/mock";
import type { ChatThread } from "@/lib/mock";
import { Modal, PageHeader, btn } from "@/components/ui";

const categories = ["出店場所について", "決済・請求について", "アカウントについて", "その他"];

export default function ChatPage() {
  const [threads, setThreads] = useState<ChatThread[]>(chatThreads);
  const [activeId, setActiveId] = useState<string>(chatThreads[0].id);
  const [draft, setDraft] = useState("");
  const [unread, setUnread] = useState<string[]>(["t1", "t2"]);
  const [creating, setCreating] = useState(false);
  const [category, setCategory] = useState(categories[0]);

  const active = threads.find((t) => t.id === activeId)!;

  function send() {
    const text = draft.trim();
    if (!text) return;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeId
          ? { ...t, messages: [...t.messages, { from: "me", text, time: "今" }] }
          : t
      )
    );
    setDraft("");
  }

  function open(id: string) {
    setActiveId(id);
    setUnread((prev) => prev.filter((x) => x !== id));
  }

  function createThread() {
    const id = `t${Date.now()}`;
    setThreads((prev) => [
      {
        id,
        title: "運営事務局",
        subtitle: category,
        messages: [
          {
            from: "ops",
            text: "お問い合わせありがとうございます。内容をご入力ください。担当者より順次ご返信します（平日 10:00〜18:00）。",
            time: "今",
          },
        ],
      },
      ...prev,
    ]);
    setActiveId(id);
    setCreating(false);
  }

  return (
    <div>
      <PageHeader
        title="運営チャット"
        description="出店場所・決済・アカウントなど、運営事務局へのお問い合わせ"
        action={
          <button onClick={() => setCreating(true)} className={btn.primary}>
            <MessageSquarePlus size={18} />
            新しい問い合わせ
          </button>
        }
      />

      <div className="grid md:grid-cols-[300px_1fr] bg-white rounded-2xl border border-line overflow-hidden">
        {/* スレッド一覧 */}
        <div className="border-b md:border-b-0 md:border-r border-line max-h-60 md:max-h-none overflow-y-auto">
          {threads.map((t) => {
            const last = t.messages[t.messages.length - 1];
            const isActive = t.id === activeId;
            const isUnread = unread.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => open(t.id)}
                className={`w-full text-left px-5 py-4 border-b border-line last:border-b-0 transition ${
                  isActive ? "bg-blue-50" : "hover:bg-paper"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center shrink-0">
                    <Headset size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-bold text-ink text-sm truncate">{t.subtitle}</p>
                      <span className="text-[11px] text-muted shrink-0">{last.time}</span>
                    </div>
                    <p className={`text-xs truncate ${isUnread ? "text-ink font-bold" : "text-muted"}`}>
                      {last.text}
                    </p>
                  </div>
                  {isUnread && <span className="w-2 h-2 rounded-full bg-brand shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* メッセージ */}
        <div className="flex flex-col h-[520px]">
          <div className="px-5 py-4 border-b border-line flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center">
              <Headset size={16} />
            </div>
            <div>
              <p className="font-bold text-ink">{active.title}</p>
              <p className="text-xs text-muted">{active.subtitle}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-paper">
            {active.messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
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
                  <p className={`text-[11px] text-muted mt-1 ${m.from === "me" ? "text-right" : "text-left"}`}>
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-line flex items-center gap-2">
            <button aria-label="ファイルを添付" className="p-2.5 rounded-xl text-muted hover:bg-paper hover:text-ink">
              <Paperclip size={20} />
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) send();
              }}
              placeholder="メッセージを入力"
              className="flex-1 min-w-0 rounded-xl border border-line px-4 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button onClick={send} aria-label="送信" className={`${btn.primary} !px-4 shrink-0`}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {creating && (
        <Modal title="新しい問い合わせ" onClose={() => setCreating(false)}>
          <p className="text-sm font-bold text-ink mb-2">お問い合わせ種別</p>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`text-sm font-bold px-3 py-2.5 rounded-xl border transition ${
                  category === c ? "border-brand bg-blue-50 text-brand" : "border-line text-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <button onClick={createThread} className={`${btn.primary} w-full`}>
            チャットを開始
          </button>
        </Modal>
      )}
    </div>
  );
}
