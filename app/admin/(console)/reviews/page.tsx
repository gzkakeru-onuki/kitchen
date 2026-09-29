"use client";

import { useState } from "react";
import { CalendarDays, Check, MessageSquareText, Store, UtensilsCrossed, X } from "lucide-react";
import { listings, reviews as initialReviews } from "@/lib/admin-mock";
import type { Review } from "@/lib/admin-mock";
import { Card, Modal, PageHeader, Pill, btn } from "@/components/ui";

const statusMeta: Record<Review["status"], { label: string; bg: string; fg: string }> = {
  reviewing: { label: "審査待ち", bg: "#FEF3C7", fg: "#92660A" },
  approved: { label: "承認済み", bg: "#D1FAE5", fg: "#0F8A6B" },
  rejected: { label: "見送り", bg: "#F1F5F9", fg: "#64748B" },
};

export default function AdminReviewsPage() {
  const [list, setList] = useState<Review[]>(initialReviews);
  const [listing, setListing] = useState("all");
  const [status, setStatus] = useState<"all" | Review["status"]>("reviewing");
  const [approving, setApproving] = useState<Review | null>(null);
  const [rejecting, setRejecting] = useState<Review | null>(null);
  const [booth, setBooth] = useState("");

  const filtered = list.filter(
    (r) => (listing === "all" || r.listingId === listing) && (status === "all" || r.status === status)
  );

  function decide(id: string, patch: Partial<Review>) {
    setList((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  const select =
    "rounded-xl border border-line bg-white px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <div>
      <PageHeader
        title="応募審査・予約"
        description="事業者からの応募を審査し、出店の可否と区画を決定します。承認すると事業者に決済依頼が通知されます。"
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <select value={listing} onChange={(e) => setListing(e.target.value)} className={select}>
          <option value="all">すべての出店場所</option>
          {listings.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className={select}>
          <option value="all">すべての状態</option>
          <option value="reviewing">審査待ち</option>
          <option value="approved">承認済み</option>
          <option value="rejected">見送り</option>
        </select>
        <p className="sm:ml-auto self-center text-sm text-muted">
          <span className="font-bold text-ink">{filtered.length}</span> 件
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((r) => {
          const st = statusMeta[r.status];
          const l = listings.find((x) => x.id === r.listingId);
          return (
            <Card key={r.id} className="p-5 flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-2">
                <Pill bg={st.bg} fg={st.fg}>
                  {st.label}
                  {r.booth && `　区画 ${r.booth}`}
                </Pill>
                <span className="text-xs text-muted">応募日 {r.appliedAt}</span>
              </div>
              <p className="flex items-center gap-2 font-display font-bold text-lg text-ink">
                <Store size={18} className="text-brand" />
                {r.vendorName}
                <span className="text-xs font-normal text-muted">{r.genre}</span>
              </p>
              <p className="flex items-center gap-1.5 text-sm text-muted mt-1">
                <CalendarDays size={14} />
                {r.listingName}（{l?.date}）
              </p>

              <div className="mt-3 rounded-xl bg-paper p-3 text-sm space-y-2 flex-1">
                <p className="flex items-start gap-2 text-ink">
                  <UtensilsCrossed size={14} className="mt-1 text-muted shrink-0" />
                  {r.menu.join("、")}
                </p>
                {r.note && (
                  <p className="flex items-start gap-2 text-ink">
                    <MessageSquareText size={14} className="mt-1 text-muted shrink-0" />
                    {r.note}
                  </p>
                )}
              </div>

              {l && (
                <p className="text-xs text-muted mt-3">
                  この会場の枠：確定 {l.approved} / {l.capacity} 区画（応募 {l.applied} 件）
                </p>
              )}

              {r.status === "reviewing" && (
                <div className="flex gap-2 mt-4">
                  <button onClick={() => setRejecting(r)} className={`${btn.secondary} flex-1`}>
                    <X size={18} />
                    見送り
                  </button>
                  <button
                    onClick={() => {
                      setBooth("");
                      setApproving(r);
                    }}
                    className={`${btn.primary} flex-1`}
                  >
                    <Check size={18} />
                    承認
                  </button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      {filtered.length === 0 && <p className="text-center text-muted py-16">該当する応募はありません。</p>}

      {approving && (
        <Modal title="出店を承認" onClose={() => setApproving(null)}>
          <p className="text-sm text-muted mb-4">
            {approving.vendorName} ／ {approving.listingName}
          </p>
          <label className="block mb-4">
            <span className="block text-sm font-bold text-ink mb-1.5">区画番号</span>
            <input
              value={booth}
              onChange={(e) => setBooth(e.target.value)}
              placeholder="A-04"
              className="w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
            <label className="block">
              <span className="block font-bold text-ink mb-1.5">搬入時間</span>
              <input defaultValue="8:00〜9:30" className="w-full rounded-xl border border-line px-4 py-2.5" />
            </label>
            <label className="block">
              <span className="block font-bold text-ink mb-1.5">決済期限</span>
              <input defaultValue="2026-10-10" className="w-full rounded-xl border border-line px-4 py-2.5" />
            </label>
          </div>
          <p className="text-xs text-muted mb-5">承認すると、事業者へ請求書の発行とチャット・メールでの通知が行われます。</p>
          <div className="flex gap-3">
            <button onClick={() => setApproving(null)} className={`${btn.secondary} flex-1`}>
              キャンセル
            </button>
            <button
              onClick={() => {
                decide(approving.id, { status: "approved", booth: booth || "未定" });
                setApproving(null);
              }}
              className={`${btn.primary} flex-1`}
            >
              承認して通知
            </button>
          </div>
        </Modal>
      )}

      {rejecting && (
        <Modal title="今回は見送り" onClose={() => setRejecting(null)}>
          <p className="text-sm text-muted mb-4">
            {rejecting.vendorName} ／ {rejecting.listingName}
          </p>
          <label className="block mb-5">
            <span className="block text-sm font-bold text-ink mb-1.5">事業者へのメッセージ</span>
            <textarea
              rows={3}
              defaultValue="今回は同ジャンルの応募が多く、見送りとさせていただきました。またのご応募をお待ちしております。"
              className="w-full rounded-xl border border-line px-4 py-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <div className="flex gap-3">
            <button onClick={() => setRejecting(null)} className={`${btn.secondary} flex-1`}>
              キャンセル
            </button>
            <button
              onClick={() => {
                decide(rejecting.id, { status: "rejected" });
                setRejecting(null);
              }}
              className={`${btn.primary} flex-1`}
            >
              送信して確定
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
