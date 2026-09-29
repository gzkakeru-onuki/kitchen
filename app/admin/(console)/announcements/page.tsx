"use client";

import { useState } from "react";
import { EyeOff, Flag, Megaphone, Send, ShieldCheck, TriangleAlert } from "lucide-react";
import { announcements } from "@/lib/mock";
import type { Announcement } from "@/lib/mock";
import { reportedPosts } from "@/lib/admin-mock";
import { Card, CardTitle, PageHeader, Pill, btn } from "@/components/ui";

const kinds: Announcement["kind"][] = ["重要", "募集", "イベント", "システム"];

type Sent = { id: string; kind: Announcement["kind"]; title: string; date: string; target: string; openRate: number };

const initialSent: Sent[] = announcements.map((a, i) => ({
  id: a.id,
  kind: a.kind,
  title: a.title,
  date: a.date,
  target: i === 0 ? "みなとみらい 承認済み事業者（8社）" : "全事業者（124社）",
  openRate: [100, 72, 58, 41][i] ?? 0,
}));

export default function AdminAnnouncementsPage() {
  const [sent, setSent] = useState<Sent[]>(initialSent);
  const [kind, setKind] = useState<Announcement["kind"]>("募集");
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("全事業者（124社）");
  const [channels, setChannels] = useState<string[]>(["アプリ内", "メール"]);
  const [reports, setReports] = useState(reportedPosts.map((r) => ({ ...r, resolved: "" })));

  function send() {
    if (!title.trim()) return;
    setSent((prev) => [{ id: `n${Date.now()}`, kind, title: title.trim(), date: "2026-09-29", target, openRate: 0 }, ...prev]);
    setTitle("");
  }

  const input =
    "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <div className="space-y-6">
      <PageHeader title="お知らせ・コミュニティ" description="事業者へのお知らせ配信と、コミュニティ投稿の監視を行います。" />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <Card className="p-6 h-fit">
          <CardTitle icon={Send}>お知らせを配信</CardTitle>
          <div className="space-y-4">
            <div>
              <span className="block text-sm font-bold text-ink mb-1.5">種別</span>
              <div className="flex flex-wrap gap-2">
                {kinds.map((k) => (
                  <button
                    key={k}
                    onClick={() => setKind(k)}
                    className={`text-sm font-bold px-3 py-1.5 rounded-full border ${
                      kind === k ? "border-brand bg-blue-50 text-brand" : "border-line text-muted"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
            <label className="block">
              <span className="block text-sm font-bold text-ink mb-1.5">件名</span>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="12月の出店場所を追加しました" className={input} />
            </label>
            <label className="block">
              <span className="block text-sm font-bold text-ink mb-1.5">本文</span>
              <textarea rows={4} className={input} />
            </label>
            <label className="block">
              <span className="block text-sm font-bold text-ink mb-1.5">配信対象</span>
              <select value={target} onChange={(e) => setTarget(e.target.value)} className={input}>
                <option>全事業者（124社）</option>
                <option>東京エリアの事業者（58社）</option>
                <option>神奈川エリアの事業者（31社）</option>
                <option>幕張ビーチフェス 応募者（21社）</option>
                <option>書類不備のある事業者（6社）</option>
              </select>
            </label>
            <div>
              <span className="block text-sm font-bold text-ink mb-1.5">配信チャネル</span>
              <div className="flex flex-wrap gap-4 text-sm">
                {["アプリ内", "メール", "LINE", "プッシュ通知"].map((c) => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={channels.includes(c)}
                      onChange={() => setChannels((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]))}
                      className="accent-brand"
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className={`${btn.secondary} flex-1`}>予約配信</button>
              <button onClick={send} className={`${btn.primary} flex-1`}>
                <Send size={16} />
                今すぐ配信
              </button>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <CardTitle icon={Megaphone}>配信履歴</CardTitle>
            <ul className="divide-y divide-line">
              {sent.map((s) => (
                <li key={s.id} className="py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Pill>{s.kind}</Pill>
                    <span className="text-xs text-muted">{s.date}</span>
                  </div>
                  <p className="text-sm font-bold text-ink">{s.title}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-muted flex-1 truncate">{s.target}</span>
                    <div className="w-24 h-1.5 rounded-full bg-paper overflow-hidden">
                      <div className="h-full bg-brand rounded-full" style={{ width: `${s.openRate}%` }} />
                    </div>
                    <span className="text-xs text-muted w-16 text-right">開封 {s.openRate}%</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <CardTitle icon={Flag}>通報されたコミュニティ投稿</CardTitle>
            <ul className="space-y-3">
              {reports.map((r) => (
                <li key={r.id} className="rounded-xl border border-line p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Pill bg="#FEE2E2" fg="#B91C1C">
                      <TriangleAlert size={12} />
                      {r.reason}
                    </Pill>
                    <span className="text-xs text-muted">
                      通報 {r.reports} 件　/　{r.time}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-muted">{r.author}</p>
                  <p className="text-sm text-ink mt-0.5">{r.text}</p>
                  {r.resolved ? (
                    <p className="mt-3 text-xs font-bold text-teal">{r.resolved}</p>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-3">
                      <button
                        onClick={() => setReports((p) => p.map((x) => (x.id === r.id ? { ...x, resolved: "非表示にしました" } : x)))}
                        className={`${btn.danger} !px-3 !py-1.5 text-xs`}
                      >
                        <EyeOff size={14} />
                        非表示
                      </button>
                      <button
                        onClick={() => setReports((p) => p.map((x) => (x.id === r.id ? { ...x, resolved: "投稿者に警告を送信しました" } : x)))}
                        className={`${btn.secondary} !px-3 !py-1.5 text-xs`}
                      >
                        <TriangleAlert size={14} />
                        警告を送る
                      </button>
                      <button
                        onClick={() => setReports((p) => p.map((x) => (x.id === r.id ? { ...x, resolved: "問題なしとして処理しました" } : x)))}
                        className={`${btn.secondary} !px-3 !py-1.5 text-xs`}
                      >
                        <ShieldCheck size={14} />
                        問題なし
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
