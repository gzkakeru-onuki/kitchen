"use client";

import { useState } from "react";
import { Eye, ImagePlus, Pencil, Plus, Trash2 } from "lucide-react";
import { articles, spots } from "@/lib/mock";
import type { Article } from "@/lib/mock";
import { Card, Modal, PageHeader, Pill, btn } from "@/components/ui";
import { SpotThumb } from "@/components/SpotIcon";

type Row = Pick<Article, "id" | "title" | "category" | "date" | "icon" | "color" | "spotId"> & {
  status: "published" | "scheduled" | "draft";
  views: number;
};

const initialRows: Row[] = [
  { id: "odaiba-preview", title: "12月開催「お台場 冬のイルミネーション広場」出店者募集のお知らせ", category: "会場ガイド", date: "2026-10-01", icon: "building", color: "#7C3AED", status: "scheduled", views: 0 },
  ...articles.map((a, i) => ({
    id: a.id,
    title: a.title,
    category: a.category,
    date: a.date,
    icon: a.icon,
    color: a.color,
    spotId: a.spotId,
    status: "published" as const,
    views: [1840, 1210, 2630, 980][i] ?? 0,
  })),
  { id: "winter-menu", title: "冬の売れ筋メニュー特集（下書き）", category: "出店ノウハウ", date: "—", icon: "tent", color: "#F59E0B", status: "draft", views: 0 },
];

const statusMeta: Record<Row["status"], { label: string; bg: string; fg: string }> = {
  published: { label: "公開中", bg: "#D1FAE5", fg: "#0F8A6B" },
  scheduled: { label: "予約投稿", bg: "#DBEAFE", fg: "#1D4ED8" },
  draft: { label: "下書き", bg: "#F1F5F9", fg: "#475569" },
};

const categories: Article["category"][] = ["開催レポート", "会場ガイド", "出店ノウハウ", "インタビュー"];

export default function AdminMediaPage() {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [editing, setEditing] = useState<Row | "new" | null>(null);

  return (
    <div>
      <PageHeader
        title="メディア記事管理"
        description="開催レポートや会場ガイドなど、事業者向けに配信する記事を作成・公開します。"
        action={
          <button onClick={() => setEditing("new")} className={btn.primary}>
            <Plus size={18} />
            記事を作成
          </button>
        }
      />

      <Card className="overflow-hidden">
        <ul className="divide-y divide-line">
          {rows.map((r) => {
            const st = statusMeta[r.status];
            const spot = spots.find((s) => s.id === r.spotId);
            return (
              <li key={r.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <SpotThumb icon={r.icon} color={r.color} className="w-full sm:w-28 h-20 rounded-xl shrink-0" size={28} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <Pill bg={st.bg} fg={st.fg}>
                      {st.label}
                    </Pill>
                    <span className="text-xs font-bold text-brand">{r.category}</span>
                    {spot && <span className="text-xs text-muted">会場：{spot.name}</span>}
                  </div>
                  <p className="font-bold text-ink leading-snug">{r.title}</p>
                  <p className="flex items-center gap-3 text-xs text-muted mt-1">
                    <span>{r.status === "scheduled" ? `公開予定 ${r.date}` : r.date}</span>
                    {r.status === "published" && (
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {r.views.toLocaleString()} 閲覧
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => setEditing(r)} aria-label="編集" className={`${btn.secondary} !px-3 !py-2`}>
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => setRows((prev) => prev.filter((x) => x.id !== r.id))}
                    aria-label="削除"
                    className={`${btn.secondary} !px-3 !py-2 hover:!text-red-600`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>

      {editing && (
        <Editor
          initial={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSave={(r) => {
            setRows((prev) => (prev.some((x) => x.id === r.id) ? prev.map((x) => (x.id === r.id ? r : x)) : [r, ...prev]));
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function Editor({ initial, onClose, onSave }: { initial: Row | null; onClose: () => void; onSave: (r: Row) => void }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState<Article["category"]>(initial?.category ?? "開催レポート");
  const [spotId, setSpotId] = useState(initial?.spotId ?? "");
  const input =
    "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100";

  function save(status: Row["status"]) {
    const spot = spots.find((s) => s.id === spotId);
    onSave({
      id: initial?.id ?? `a${Date.now()}`,
      title: title || "（無題の記事）",
      category,
      spotId: spotId || undefined,
      date: status === "draft" ? "—" : "2026-09-29",
      icon: spot?.icon ?? initial?.icon ?? "tent",
      color: spot?.color ?? initial?.color ?? "#2563EB",
      status,
      views: initial?.views ?? 0,
    });
  }

  return (
    <Modal title={initial ? "記事を編集" : "記事を作成"} onClose={onClose}>
      <div className="space-y-4">
        <button className="w-full h-28 rounded-xl border border-dashed border-line flex flex-col items-center justify-center gap-1 text-sm text-muted hover:border-brand hover:text-brand">
          <ImagePlus size={22} />
          カバー画像をアップロード
        </button>
        <label className="block">
          <span className="block text-sm font-bold text-ink mb-1.5">タイトル</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={input} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-bold text-ink mb-1.5">カテゴリ</span>
            <select value={category} onChange={(e) => setCategory(e.target.value as Article["category"])} className={input}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-bold text-ink mb-1.5">関連する会場</span>
            <select value={spotId} onChange={(e) => setSpotId(e.target.value)} className={input}>
              <option value="">なし</option>
              {spots.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-bold text-ink mb-1.5">本文</span>
          <textarea rows={6} placeholder="本文を入力" className={input} />
        </label>
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <button onClick={() => save("draft")} className={`${btn.secondary} flex-1`}>
            下書き保存
          </button>
          <button onClick={() => save("scheduled")} className={`${btn.secondary} flex-1`}>
            予約投稿
          </button>
          <button onClick={() => save("published")} className={`${btn.primary} flex-1`}>
            公開する
          </button>
        </div>
      </div>
    </Modal>
  );
}
