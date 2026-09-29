"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Ban,
  CircleAlert,
  CircleCheck,
  Clock,
  Download,
  FileCheck2,
  MessageSquare,
  RotateCcw,
  Search,
  Star,
  UserCheck,
  UserMinus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { vendors as initialVendors, vendorStatusMeta } from "@/lib/admin-mock";
import type { Vendor, VendorStatus } from "@/lib/admin-mock";
import { yen } from "@/lib/mock";
import { Card, Modal, PageHeader, Pill, btn } from "@/components/ui";

const tabs: { key: "all" | VendorStatus; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "pending", label: "登録審査中" },
  { key: "active", label: "利用中" },
  { key: "suspended", label: "利用停止" },
  { key: "withdrawing", label: "退会申請" },
];

const docMeta: Record<Vendor["docs"][number]["status"], { label: string; bg: string; fg: string; icon: LucideIcon }> = {
  ok: { label: "確認済み", bg: "#D1FAE5", fg: "#0F8A6B", icon: CircleCheck },
  review: { label: "確認待ち", bg: "#DBEAFE", fg: "#1D4ED8", icon: Clock },
  expiring: { label: "期限間近", bg: "#FEF3C7", fg: "#92660A", icon: CircleAlert },
  missing: { label: "未提出", bg: "#FEE2E2", fg: "#B91C1C", icon: CircleAlert },
};

export default function AdminVendorsPage() {
  const [list, setList] = useState<Vendor[]>(initialVendors);
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("all");
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = list.filter(
    (v) => (tab === "all" || v.status === tab) && (q === "" || v.name.includes(q) || v.owner.includes(q) || v.genre.includes(q))
  );
  const selected = list.find((v) => v.id === selectedId) ?? null;

  function update(id: string, patch: Partial<Vendor>) {
    setList((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  }

  return (
    <div>
      <PageHeader
        title="事業者管理"
        description="出店事業者の登録審査、書類確認、利用停止、退会処理を行います。"
        action={
          <button className={btn.secondary}>
            <Download size={18} />
            CSV出力
          </button>
        }
      />

      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
        <div className="flex gap-1 overflow-x-auto bg-white border border-line rounded-xl p-1 w-fit max-w-full">
          {tabs.map((t) => {
            const count = t.key === "all" ? list.length : list.filter((v) => v.status === t.key).length;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition ${
                  tab === t.key ? "bg-brand text-white" : "text-muted hover:text-ink"
                }`}
              >
                {t.label}
                <span className="ml-1.5 opacity-70">{count}</span>
              </button>
            );
          })}
        </div>
        <div className="relative md:ml-auto md:w-72">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="事業者名・代表者・ジャンル"
            className="w-full rounded-xl border border-line bg-white pl-10 pr-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead className="bg-paper">
              <tr className="text-left text-xs text-muted">
                <th className="px-5 py-3 font-bold">事業者</th>
                <th className="px-5 py-3 font-bold">エリア</th>
                <th className="px-5 py-3 font-bold">状態</th>
                <th className="px-5 py-3 font-bold">書類</th>
                <th className="px-5 py-3 font-bold text-right">出店回数</th>
                <th className="px-5 py-3 font-bold text-right">評価</th>
                <th className="px-5 py-3 font-bold">登録日</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((v) => {
                const st = vendorStatusMeta[v.status];
                const issues = v.docs.filter((d) => d.status !== "ok").length;
                return (
                  <tr key={v.id} onClick={() => setSelectedId(v.id)} className="cursor-pointer hover:bg-paper">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-brand flex items-center justify-center font-bold shrink-0">
                          {v.name.slice(0, 1)}
                        </div>
                        <div>
                          <p className="font-bold text-ink whitespace-nowrap">{v.name}</p>
                          <p className="text-xs text-muted whitespace-nowrap">
                            {v.owner}　/　{v.genre}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-muted whitespace-nowrap">{v.area}</td>
                    <td className="px-5 py-3.5">
                      <Pill bg={st.bg} fg={st.fg}>
                        {st.label}
                      </Pill>
                    </td>
                    <td className="px-5 py-3.5">
                      {issues === 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-teal">
                          <CircleCheck size={14} />
                          確認済み
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700">
                          <CircleAlert size={14} />
                          要確認 {issues}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right text-ink">{v.entries}</td>
                    <td className="px-5 py-3.5 text-right text-ink">{v.rating ? v.rating.toFixed(1) : "—"}</td>
                    <td className="px-5 py-3.5 text-muted whitespace-nowrap">{v.registeredAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="text-center text-muted py-12">該当する事業者はいません。</p>}
      </Card>

      {selected && (
        <Modal title={selected.name} onClose={() => setSelectedId(null)}>
          <div className="flex items-center gap-2 -mt-2 mb-4">
            <Pill bg={vendorStatusMeta[selected.status].bg} fg={vendorStatusMeta[selected.status].fg}>
              {vendorStatusMeta[selected.status].label}
            </Pill>
            {selected.rating > 0 && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-muted">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                {selected.rating.toFixed(1)}
              </span>
            )}
          </div>

          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm mb-5">
            <dt className="text-muted">代表者</dt>
            <dd className="text-ink font-bold">{selected.owner}</dd>
            <dt className="text-muted">ジャンル</dt>
            <dd className="text-ink font-bold">{selected.genre}</dd>
            <dt className="text-muted">エリア</dt>
            <dd className="text-ink font-bold">{selected.area}</dd>
            <dt className="text-muted">累計出店</dt>
            <dd className="text-ink font-bold">
              {selected.entries} 回　/　売上 {yen(selected.gmv)}
            </dd>
          </dl>

          <p className="flex items-center gap-2 text-sm font-bold text-ink mb-2">
            <FileCheck2 size={16} className="text-brand" />
            提出書類
          </p>
          <ul className="divide-y divide-line border border-line rounded-xl mb-5">
            {selected.docs.map((d, i) => {
              const m = docMeta[d.status];
              const Icon = m.icon;
              return (
                <li key={d.name} className="flex items-center gap-3 px-4 py-3 text-sm">
                  <span className="flex-1 text-ink">{d.name}</span>
                  <Pill bg={m.bg} fg={m.fg}>
                    <Icon size={12} />
                    {m.label}
                  </Pill>
                  {d.status === "review" && (
                    <button
                      onClick={() =>
                        update(selected.id, {
                          docs: selected.docs.map((x, j) => (j === i ? { ...x, status: "ok" } : x)),
                        })
                      }
                      className="text-xs font-bold text-brand"
                    >
                      承認
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col gap-2">
            {selected.status === "pending" && (
              <>
                <button onClick={() => update(selected.id, { status: "active" })} className={btn.primary}>
                  <UserCheck size={18} />
                  登録を承認する
                </button>
                <button className={btn.secondary}>
                  <RotateCcw size={18} />
                  書類の再提出を依頼
                </button>
              </>
            )}
            {selected.status === "active" && (
              <button onClick={() => update(selected.id, { status: "suspended" })} className={btn.secondary}>
                <Ban size={18} />
                利用を停止する
              </button>
            )}
            {selected.status === "suspended" && (
              <button onClick={() => update(selected.id, { status: "active" })} className={btn.primary}>
                <RotateCcw size={18} />
                利用を再開する
              </button>
            )}
            {selected.status === "withdrawing" && (
              <button
                onClick={() => {
                  setList((prev) => prev.filter((v) => v.id !== selected.id));
                  setSelectedId(null);
                }}
                className={btn.danger}
              >
                <UserMinus size={18} />
                退会を承認する
              </button>
            )}
            <Link href="/admin/inquiries" className={btn.secondary}>
              <MessageSquare size={18} />
              メッセージを送る
            </Link>
          </div>
        </Modal>
      )}
    </div>
  );
}
