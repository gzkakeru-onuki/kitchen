"use client";

import { useState } from "react";
import { CircleCheck, FileText, Paperclip, Send, Store, UserRound } from "lucide-react";
import { inquiries as initial, inquiryStatusMeta, replyTemplates } from "@/lib/admin-mock";
import type { Inquiry } from "@/lib/admin-mock";
import { PageHeader, Pill, btn } from "@/components/ui";

const filters: { key: "all" | Inquiry["status"]; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "open", label: "未対応" },
  { key: "progress", label: "対応中" },
  { key: "closed", label: "完了" },
];

export default function AdminInquiriesPage() {
  const [list, setList] = useState<Inquiry[]>(initial);
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const [activeId, setActiveId] = useState(initial[1].id);
  const [draft, setDraft] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);

  const shown = filter === "all" ? list : list.filter((q) => q.status === filter);
  const active = list.find((q) => q.id === activeId)!;

  function patch(id: string, p: Partial<Inquiry>) {
    setList((prev) => prev.map((q) => (q.id === id ? { ...q, ...p } : q)));
  }

  function send() {
    const text = draft.trim();
    if (!text) return;
    patch(active.id, {
      messages: [...active.messages, { from: "ops", text, time: "今" }],
      status: active.status === "open" ? "progress" : active.status,
      assignee: active.assignee ?? "鈴木",
    });
    setDraft("");
  }

  return (
    <div>
      <PageHeader title="問い合わせ対応" description="事業者からのチャット問い合わせに返信し、担当者と対応状況を管理します。" />

      <div className="grid lg:grid-cols-[320px_1fr] bg-white rounded-2xl border border-line overflow-hidden">
        <div className="border-b lg:border-b-0 lg:border-r border-line">
          <div className="flex gap-1 p-2 border-b border-line overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold ${
                  filter === f.key ? "bg-blue-50 text-brand" : "text-muted hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="max-h-64 lg:max-h-[560px] overflow-y-auto">
            {shown.map((q) => {
              const st = inquiryStatusMeta[q.status];
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveId(q.id)}
                  className={`w-full text-left px-4 py-3.5 border-b border-line last:border-b-0 ${
                    q.id === activeId ? "bg-blue-50" : "hover:bg-paper"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-bold text-ink truncate">{q.vendorName}</span>
                    <Pill bg={st.bg} fg={st.fg}>
                      {st.label}
                    </Pill>
                  </div>
                  <p className="text-xs text-muted truncate">
                    {q.category}　/　{q.subject}
                  </p>
                  <p className="text-[11px] text-muted mt-1">{q.updatedAt}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col h-[620px]">
          <div className="px-5 py-3 border-b border-line flex flex-wrap items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-brand flex items-center justify-center">
              <Store size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-ink">{active.vendorName}</p>
              <p className="text-xs text-muted truncate">
                {active.category}　/　{active.subject}
              </p>
            </div>
            <label className="flex items-center gap-1.5 text-xs text-muted">
              <UserRound size={14} />
              <select
                value={active.assignee ?? ""}
                onChange={(e) => patch(active.id, { assignee: e.target.value || undefined })}
                className="rounded-lg border border-line bg-white px-2 py-1.5 text-xs text-ink"
              >
                <option value="">未割当</option>
                <option value="鈴木">鈴木</option>
                <option value="高橋">高橋</option>
              </select>
            </label>
            {active.status !== "closed" ? (
              <button onClick={() => patch(active.id, { status: "closed" })} className={`${btn.secondary} !px-3 !py-1.5 text-xs`}>
                <CircleCheck size={14} />
                完了にする
              </button>
            ) : (
              <Pill bg="#D1FAE5" fg="#0F8A6B">
                完了
              </Pill>
            )}
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-paper">
            {active.messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "ops" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[75%]">
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.from === "ops" ? "bg-navy text-white rounded-br-sm" : "bg-white border border-line text-ink rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                  <p className={`text-[11px] text-muted mt-1 ${m.from === "ops" ? "text-right" : "text-left"}`}>
                    {m.from === "ops" ? "運営" : active.vendorName}　{m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {showTemplates && (
            <div className="border-t border-line bg-white px-4 py-3 space-y-2">
              {replyTemplates.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setDraft(t);
                    setShowTemplates(false);
                  }}
                  className="block w-full text-left text-xs text-ink rounded-lg border border-line px-3 py-2 hover:border-brand"
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          <div className="px-4 py-3 border-t border-line flex items-center gap-2">
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              aria-label="定型文"
              className={`p-2.5 rounded-xl hover:bg-paper ${showTemplates ? "text-brand" : "text-muted"}`}
            >
              <FileText size={20} />
            </button>
            <button aria-label="ファイルを添付" className="p-2.5 rounded-xl text-muted hover:bg-paper hover:text-ink">
              <Paperclip size={20} />
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) send();
              }}
              placeholder="返信を入力"
              className="flex-1 min-w-0 rounded-xl border border-line px-4 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <button onClick={send} aria-label="送信" className={`${btn.primary} !px-4 shrink-0`}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
