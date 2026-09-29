"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Copy, Eye, MapPin, Pencil, Plus, Users } from "lucide-react";
import { listings as initialListings, listingStatusMeta } from "@/lib/admin-mock";
import type { Listing } from "@/lib/admin-mock";
import { yen } from "@/lib/mock";
import { Card, Modal, PageHeader, Pill, btn } from "@/components/ui";

export default function AdminListingsPage() {
  const [list, setList] = useState<Listing[]>(initialListings);
  const [editing, setEditing] = useState<Listing | "new" | null>(null);

  function setStatus(id: string, status: Listing["status"]) {
    setList((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  return (
    <div>
      <PageHeader
        title="出店場所・募集管理"
        description="出店場所の登録、募集枠・出店料・締切の設定、募集の公開や締切を行います。"
        action={
          <button onClick={() => setEditing("new")} className={btn.primary}>
            <Plus size={18} />
            新しい募集を作成
          </button>
        }
      />

      <div className="grid gap-4">
        {list.map((l) => {
          const st = listingStatusMeta[l.status];
          const pct = Math.min(100, Math.round((l.approved / l.capacity) * 100));
          return (
            <Card key={l.id} className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Pill bg={st.bg} fg={st.fg}>
                      {st.label}
                    </Pill>
                    <span className="text-xs text-muted">応募締切 {l.deadline}</span>
                  </div>
                  <p className="font-display font-bold text-lg text-ink">{l.name}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {l.area}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      {l.date}
                    </span>
                    <span>出店料 {yen(l.fee)}</span>
                  </div>
                </div>

                <div className="lg:w-64">
                  <div className="flex justify-between text-xs text-muted mb-1.5">
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      応募 {l.applied} 件
                    </span>
                    <span>
                      確定 <span className="font-bold text-ink">{l.approved}</span> / {l.capacity} 区画
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-paper overflow-hidden">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
                  <Link href="/admin/reviews" className={`${btn.secondary} !px-3 !py-2 text-sm`}>
                    応募を審査
                  </Link>
                  <button onClick={() => setEditing(l)} aria-label="編集" className={`${btn.secondary} !px-3 !py-2`}>
                    <Pencil size={16} />
                  </button>
                  <button aria-label="複製" className={`${btn.secondary} !px-3 !py-2`}>
                    <Copy size={16} />
                  </button>
                  {l.status === "draft" && (
                    <button onClick={() => setStatus(l.id, "open")} className={`${btn.primary} !px-3 !py-2 text-sm`}>
                      <Eye size={16} />
                      公開
                    </button>
                  )}
                  {l.status === "open" && (
                    <button onClick={() => setStatus(l.id, "closed")} className={`${btn.secondary} !px-3 !py-2 text-sm`}>
                      募集を締め切る
                    </button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {editing && (
        <ListingForm
          initial={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSave={(l) => {
            setList((prev) => (prev.some((x) => x.id === l.id) ? prev.map((x) => (x.id === l.id ? l : x)) : [l, ...prev]));
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function ListingForm({
  initial,
  onClose,
  onSave,
}: {
  initial: Listing | null;
  onClose: () => void;
  onSave: (l: Listing) => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [area, setArea] = useState(initial?.area ?? "");
  const [date, setDate] = useState(initial?.date ?? "");
  const [fee, setFee] = useState(String(initial?.fee ?? ""));
  const [capacity, setCapacity] = useState(String(initial?.capacity ?? ""));
  const [deadline, setDeadline] = useState(initial?.deadline ?? "");
  const input =
    "w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <Modal title={initial ? "募集内容の編集" : "新しい募集を作成"} onClose={onClose}>
      <div className="space-y-4">
        <label className="block">
          <span className="block text-sm font-bold text-ink mb-1.5">出店場所名</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="お台場 冬のイルミネーション広場" className={input} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-bold text-ink mb-1.5">エリア</span>
            <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="東京・お台場" className={input} />
          </label>
          <label className="block">
            <span className="block text-sm font-bold text-ink mb-1.5">開催日</span>
            <input value={date} onChange={(e) => setDate(e.target.value)} placeholder="2026-12-12" className={input} />
          </label>
          <label className="block">
            <span className="block text-sm font-bold text-ink mb-1.5">出店料（円）</span>
            <input value={fee} onChange={(e) => setFee(e.target.value)} inputMode="numeric" className={input} />
          </label>
          <label className="block">
            <span className="block text-sm font-bold text-ink mb-1.5">募集区画数</span>
            <input value={capacity} onChange={(e) => setCapacity(e.target.value)} inputMode="numeric" className={input} />
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-bold text-ink mb-1.5">応募締切</span>
          <input value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="2026-11-20" className={input} />
        </label>
        <label className="block">
          <span className="block text-sm font-bold text-ink mb-1.5">設備・条件</span>
          <textarea rows={2} placeholder="電源あり（2kVA）、給排水なし、テント設営可" className={input} />
        </label>
        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className={`${btn.secondary} flex-1`}>
            キャンセル
          </button>
          <button
            onClick={() =>
              onSave({
                id: initial?.id ?? `l${Date.now()}`,
                name: name || "（無題の出店場所）",
                area,
                date,
                fee: Number(fee) || 0,
                capacity: Math.max(Number(capacity) || 1, 1),
                applied: initial?.applied ?? 0,
                approved: initial?.approved ?? 0,
                status: initial?.status ?? "draft",
                deadline: deadline || "—",
              })
            }
            className={`${btn.primary} flex-1`}
          >
            {initial ? "保存" : "下書き保存"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
