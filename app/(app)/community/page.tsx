"use client";

import { useState } from "react";
import {
  Bell,
  CalendarDays,
  Hash,
  Heart,
  ImagePlus,
  Megaphone,
  MessageCircle,
  Settings2,
  Share2,
  UserPlus,
  Users,
} from "lucide-react";
import { announcements as initialNotices, businessProfile, posts as initialPosts, suggestedVendors } from "@/lib/mock";
import type { Announcement, Post } from "@/lib/mock";
import { Card, CardTitle, PageHeader, Pill, btn } from "@/components/ui";
import { SpotThumb } from "@/components/SpotIcon";

const kindColor: Record<Announcement["kind"], { bg: string; fg: string }> = {
  重要: { bg: "#FEE2E2", fg: "#B91C1C" },
  募集: { bg: "#DBEAFE", fg: "#1D4ED8" },
  イベント: { bg: "#D1FAE5", fg: "#0F8A6B" },
  システム: { bg: "#F1F5F9", fg: "#475569" },
};

export default function CommunityPage() {
  const [tab, setTab] = useState<"news" | "timeline">("news");
  const [notices, setNotices] = useState<Announcement[]>(initialNotices);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [draft, setDraft] = useState("");
  const [following, setFollowing] = useState<string[]>(["港のタコス"]);

  function like(id: string) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p))
    );
  }

  function publish() {
    if (!draft.trim()) return;
    setPosts((prev) => [
      {
        id: `c${Date.now()}`,
        author: businessProfile.name,
        genre: businessProfile.genre,
        time: "たった今",
        text: draft.trim(),
        tags: [],
        likes: 0,
        comments: 0,
      },
      ...prev,
    ]);
    setDraft("");
  }

  const unread = notices.filter((n) => n.unread).length;

  return (
    <div>
      <PageHeader title="お知らせ・コミュニティ" description="運営からのお知らせと、出店者同士の情報交換の場です。" />

      <div className="flex gap-1 mb-6 bg-white border border-line rounded-xl p-1 w-fit">
        <TabButton active={tab === "news"} onClick={() => setTab("news")} icon={Megaphone}>
          お知らせ
          {unread > 0 && <span className="ml-1 opacity-70">{unread}</span>}
        </TabButton>
        <TabButton active={tab === "timeline"} onClick={() => setTab("timeline")} icon={Users}>
          コミュニティ
        </TabButton>
      </div>

      {tab === "news" ? (
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Card className="p-6">
            <CardTitle
              icon={Bell}
              action={
                <button
                  onClick={() => setNotices((prev) => prev.map((n) => ({ ...n, unread: false })))}
                  className="text-sm font-bold text-brand"
                >
                  すべて既読にする
                </button>
              }
            >
              運営からのお知らせ
            </CardTitle>
            <ul className="divide-y divide-line">
              {notices.map((n) => (
                <li
                  key={n.id}
                  onClick={() =>
                    setNotices((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))
                  }
                  className="py-4 flex items-start gap-3 cursor-pointer"
                >
                  <span className={`mt-2 w-2 h-2 rounded-full shrink-0 ${n.unread ? "bg-brand" : "bg-transparent"}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Pill bg={kindColor[n.kind].bg} fg={kindColor[n.kind].fg}>
                        {n.kind}
                      </Pill>
                      <span className="text-xs text-muted">{n.date}</span>
                    </div>
                    <p className={`text-sm ${n.unread ? "font-bold text-ink" : "text-ink"}`}>{n.title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 h-fit">
            <CardTitle icon={Settings2}>通知設定</CardTitle>
            <ul className="space-y-3 text-sm">
              {["新しい出店場所の募集", "審査結果・予約の変更", "運営チャットの返信", "コミュニティのいいね・コメント"].map(
                (label, i) => (
                  <li key={label} className="flex items-center justify-between gap-3">
                    <span className="text-ink">{label}</span>
                    <Toggle defaultOn={i < 3} />
                  </li>
                )
              )}
            </ul>
            <p className="text-xs text-muted mt-4">メール・LINE・プッシュ通知で受け取れます。</p>
          </Card>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            {/* 投稿フォーム */}
            <Card className="p-5">
              <div className="flex gap-3">
                <Avatar name={businessProfile.name} />
                <div className="flex-1">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={2}
                    placeholder="出店情報や新メニュー、他の出店者への質問をシェアしましょう"
                    className="w-full resize-none rounded-xl border border-line px-4 py-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-1 text-muted">
                      <button aria-label="画像を追加" className="p-2 rounded-lg hover:bg-paper hover:text-ink">
                        <ImagePlus size={18} />
                      </button>
                      <button aria-label="出店予定を添付" className="p-2 rounded-lg hover:bg-paper hover:text-ink">
                        <CalendarDays size={18} />
                      </button>
                      <button aria-label="タグ" className="p-2 rounded-lg hover:bg-paper hover:text-ink">
                        <Hash size={18} />
                      </button>
                    </div>
                    <button onClick={publish} className={`${btn.primary} !py-2`}>
                      投稿する
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {posts.map((p) => (
              <Card key={p.id} className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name={p.author} />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-ink text-sm">{p.author}</p>
                    <p className="text-xs text-muted">
                      {p.genre}　/　{p.time}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-ink leading-relaxed">{p.text}</p>
                {p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs font-bold text-brand">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
                {p.image && (
                  <SpotThumb icon={p.image.icon} color={p.image.color} className="h-40 rounded-xl mt-3" size={48} />
                )}
                <div className="flex items-center gap-5 mt-4 pt-3 border-t border-line text-sm text-muted">
                  <button
                    onClick={() => like(p.id)}
                    className={`flex items-center gap-1.5 font-bold ${p.liked ? "text-pink-600" : "hover:text-ink"}`}
                  >
                    <Heart size={16} className={p.liked ? "fill-current" : ""} />
                    {p.likes}
                  </button>
                  <button className="flex items-center gap-1.5 font-bold hover:text-ink">
                    <MessageCircle size={16} />
                    {p.comments}
                  </button>
                  <button className="flex items-center gap-1.5 font-bold hover:text-ink">
                    <Share2 size={16} />
                    シェア
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <CardTitle icon={UserPlus}>おすすめの出店者</CardTitle>
              <ul className="space-y-3">
                {suggestedVendors.map((v) => {
                  const on = following.includes(v.name);
                  return (
                    <li key={v.name} className="flex items-center gap-3">
                      <Avatar name={v.name} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-ink truncate">{v.name}</p>
                        <p className="text-xs text-muted">
                          {v.genre}　/　フォロワー {v.followers.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setFollowing((prev) => (on ? prev.filter((x) => x !== v.name) : [...prev, v.name]))
                        }
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                          on ? "border-line text-muted" : "border-brand text-brand"
                        }`}
                      >
                        {on ? "フォロー中" : "フォロー"}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Card>
            <Card className="p-5">
              <CardTitle icon={Hash}>人気のタグ</CardTitle>
              <div className="flex flex-wrap gap-2">
                {["みなとみらい", "新メニュー", "雨対策", "設備", "中目黒", "電源", "仕込み"].map((t) => (
                  <span key={t} className="text-xs font-bold text-brand bg-blue-50 px-3 py-1.5 rounded-full">
                    #{t}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Bell;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${
        active ? "bg-brand text-white" : "text-muted hover:text-ink"
      }`}
    >
      <Icon size={16} />
      {children}
    </button>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-blue-100 text-brand flex items-center justify-center font-bold shrink-0">
      {name.slice(0, 1)}
    </div>
  );
}

function Toggle({ defaultOn }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className={`relative w-10 h-6 rounded-full transition shrink-0 ${on ? "bg-brand" : "bg-slate-300"}`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition ${on ? "left-[18px]" : "left-0.5"}`}
      />
    </button>
  );
}
