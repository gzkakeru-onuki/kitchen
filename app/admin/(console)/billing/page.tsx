"use client";

import { useState } from "react";
import { Banknote, BellRing, Download, Landmark, Receipt, RotateCcw, TriangleAlert, Wallet } from "lucide-react";
import { adminInvoices as initial, invoiceStatusMeta, settlements } from "@/lib/admin-mock";
import type { AdminInvoice } from "@/lib/admin-mock";
import { yen } from "@/lib/mock";
import { Card, CardTitle, Modal, PageHeader, Pill, Stat, btn } from "@/components/ui";

const tabs: { key: "all" | AdminInvoice["status"]; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "unpaid", label: "未入金" },
  { key: "overdue", label: "期限超過" },
  { key: "paid", label: "入金済み" },
  { key: "refunded", label: "返金済み" },
];

export default function AdminBillingPage() {
  const [list, setList] = useState<AdminInvoice[]>(initial);
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("all");
  const [refunding, setRefunding] = useState<AdminInvoice | null>(null);
  const [reminded, setReminded] = useState<string[]>([]);

  const filtered = tab === "all" ? list : list.filter((i) => i.status === tab);
  const sum = (s: AdminInvoice["status"][]) => list.filter((i) => s.includes(i.status)).reduce((a, i) => a + i.amount, 0);
  const feeTotal = list.filter((i) => i.status === "paid").reduce((a, i) => a + i.fee, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="入金・精算管理"
        description="事業者からの出店料の入金状況、督促・返金、会場オーナーへの精算を管理します。"
        action={
          <button className={btn.secondary}>
            <Download size={18} />
            会計用CSV出力
          </button>
        }
      />

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Stat icon={Wallet} label="入金済み（今月）" value={yen(sum(["paid"]))} sub={`うち手数料 ${yen(feeTotal)}`} accent />
        <Stat icon={Receipt} label="未入金" value={yen(sum(["unpaid"]))} sub="期限内" />
        <Stat icon={TriangleAlert} label="期限超過" value={yen(sum(["overdue"]))} sub={`${list.filter((i) => i.status === "overdue").length} 件`} />
        <Stat icon={RotateCcw} label="返金済み" value={yen(sum(["refunded"]))} sub="中止・キャンセル" />
      </div>

      <Card className="p-6">
        <CardTitle icon={Receipt}>事業者への請求</CardTitle>
        <div className="flex gap-1 overflow-x-auto mb-4 bg-paper rounded-xl p-1 w-fit max-w-full">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition ${
                tab === t.key ? "bg-white text-brand shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-xs text-muted border-b border-line">
                <th className="py-2 font-bold">請求番号</th>
                <th className="py-2 font-bold">事業者 / 出店場所</th>
                <th className="py-2 font-bold text-right">金額</th>
                <th className="py-2 font-bold">支払期限</th>
                <th className="py-2 font-bold">状態</th>
                <th className="py-2" />
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((i) => {
                const st = invoiceStatusMeta[i.status];
                return (
                  <tr key={i.id}>
                    <td className="py-3 text-muted whitespace-nowrap">{i.id}</td>
                    <td className="py-3">
                      <p className="font-bold text-ink">{i.vendorName}</p>
                      <p className="text-xs text-muted">{i.listingName}</p>
                    </td>
                    <td className="py-3 text-right font-bold text-ink whitespace-nowrap">{yen(i.amount)}</td>
                    <td className="py-3 text-muted whitespace-nowrap">{i.due}</td>
                    <td className="py-3">
                      <Pill bg={st.bg} fg={st.fg}>
                        {st.label}
                      </Pill>
                    </td>
                    <td className="py-3 text-right whitespace-nowrap">
                      {(i.status === "unpaid" || i.status === "overdue") &&
                        (reminded.includes(i.id) ? (
                          <span className="text-xs text-muted">督促済み</span>
                        ) : (
                          <button
                            onClick={() => setReminded((p) => [...p, i.id])}
                            className="inline-flex items-center gap-1 text-xs font-bold text-brand"
                          >
                            <BellRing size={14} />
                            督促を送る
                          </button>
                        ))}
                      {i.status === "paid" && (
                        <button onClick={() => setRefunding(i)} className="inline-flex items-center gap-1 text-xs font-bold text-muted hover:text-red-600">
                          <RotateCcw size={14} />
                          返金
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <CardTitle icon={Landmark}>会場オーナーへの精算</CardTitle>
        <ul className="divide-y divide-line">
          {settlements.map((s) => (
            <li key={s.id} className="py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex-1">
                <p className="text-sm font-bold text-ink">{s.owner}</p>
                <p className="text-xs text-muted">{s.listingName}</p>
              </div>
              <p className="text-sm font-bold text-ink">{yen(s.amount)}</p>
              <p className="text-xs text-muted whitespace-nowrap">振込予定日 {s.due}</p>
              <Pill bg={s.status === "振込済み" ? "#D1FAE5" : "#DBEAFE"} fg={s.status === "振込済み" ? "#0F8A6B" : "#1D4ED8"}>
                {s.status === "振込済み" ? <Banknote size={12} /> : null}
                {s.status}
              </Pill>
            </li>
          ))}
        </ul>
      </Card>

      {refunding && (
        <Modal title="返金処理" onClose={() => setRefunding(null)}>
          <p className="text-sm text-muted mb-4">
            {refunding.vendorName} ／ {refunding.listingName}
          </p>
          <div className="bg-paper rounded-xl p-4 mb-4 text-sm flex justify-between">
            <span className="text-muted">返金額</span>
            <span className="font-bold text-ink">{yen(refunding.amount)}</span>
          </div>
          <label className="block mb-5">
            <span className="block text-sm font-bold text-ink mb-1.5">返金理由</span>
            <select className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm">
              <option>イベント中止（荒天）</option>
              <option>事業者都合のキャンセル（期限内）</option>
              <option>運営都合</option>
            </select>
          </label>
          <div className="flex gap-3">
            <button onClick={() => setRefunding(null)} className={`${btn.secondary} flex-1`}>
              キャンセル
            </button>
            <button
              onClick={() => {
                setList((prev) => prev.map((x) => (x.id === refunding.id ? { ...x, status: "refunded" } : x)));
                setRefunding(null);
              }}
              className={`${btn.danger} flex-1`}
            >
              返金を実行
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
