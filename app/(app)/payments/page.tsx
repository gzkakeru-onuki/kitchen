"use client";

import { useState } from "react";
import {
  CircleCheck,
  CreditCard,
  Download,
  Landmark,
  Plus,
  Receipt,
  RotateCcw,
  Wallet,
} from "lucide-react";
import { invoices as initialInvoices, paymentMethods, yen } from "@/lib/mock";
import type { Invoice } from "@/lib/mock";
import { Card, CardTitle, PageHeader, Pill, Stat, btn } from "@/components/ui";
import PaymentModal from "@/components/PaymentModal";

const invoiceStatus: Record<Invoice["status"], { label: string; bg: string; fg: string }> = {
  unpaid: { label: "未払い", bg: "#DBEAFE", fg: "#1D4ED8" },
  paid: { label: "支払済み", bg: "#D1FAE5", fg: "#0F8A6B" },
  refunded: { label: "返金済み", bg: "#F1F5F9", fg: "#64748B" },
};

export default function PaymentsPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [paying, setPaying] = useState<Invoice | null>(null);

  const unpaid = invoices.filter((i) => i.status === "unpaid");
  const paidTotal = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="決済・請求" description="出店料のお支払い、請求書・領収書、お支払い方法を管理します。" />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat
          icon={Wallet}
          label="未払い金額"
          value={yen(unpaid.reduce((s, i) => s + i.amount, 0))}
          sub={`${unpaid.length} 件の請求`}
          accent
        />
        <Stat icon={Receipt} label="今年度の支払総額" value={yen(paidTotal)} sub="出店料＋システム利用料" />
        <Stat icon={RotateCcw} label="返金" value={`${invoices.filter((i) => i.status === "refunded").length} 件`} sub="キャンセル・中止による返金" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card className="p-6">
          <CardTitle icon={Receipt}>請求・支払い履歴</CardTitle>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="text-left text-xs text-muted border-b border-line">
                  <th className="py-2 font-bold">請求番号</th>
                  <th className="py-2 font-bold">出店場所 / 開催日</th>
                  <th className="py-2 font-bold text-right">金額</th>
                  <th className="py-2 font-bold">状態</th>
                  <th className="py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {invoices.map((inv) => {
                  const st = invoiceStatus[inv.status];
                  return (
                    <tr key={inv.id}>
                      <td className="py-3 text-muted whitespace-nowrap">{inv.id}</td>
                      <td className="py-3">
                        <p className="font-bold text-ink">{inv.spotName}</p>
                        <p className="text-xs text-muted">{inv.date}</p>
                      </td>
                      <td className="py-3 text-right font-bold text-ink whitespace-nowrap">{yen(inv.amount)}</td>
                      <td className="py-3">
                        <Pill bg={st.bg} fg={st.fg}>
                          {st.label}
                        </Pill>
                      </td>
                      <td className="py-3 text-right whitespace-nowrap">
                        {inv.status === "unpaid" ? (
                          <button onClick={() => setPaying(inv)} className={`${btn.primary} !px-3 !py-1.5 text-xs`}>
                            <CreditCard size={14} />
                            支払う
                          </button>
                        ) : (
                          <button className="inline-flex items-center gap-1 text-xs font-bold text-brand">
                            <Download size={14} />
                            {inv.status === "paid" ? "領収書" : "返金明細"}
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

        <Card className="p-6 h-fit">
          <CardTitle icon={CreditCard}>お支払い方法</CardTitle>
          <ul className="space-y-3 mb-4">
            {paymentMethods.map((pm) => {
              const Icon = pm.id === "pm1" ? CreditCard : Landmark;
              return (
                <li key={pm.id} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3">
                  <Icon size={18} className="text-brand" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-ink">{pm.label}</p>
                    <p className="text-xs text-muted">{pm.sub}</p>
                  </div>
                  {pm.default && (
                    <Pill bg="#D1FAE5" fg="#0F8A6B">
                      <CircleCheck size={12} />
                      既定
                    </Pill>
                  )}
                </li>
              );
            })}
          </ul>
          <button className={`${btn.secondary} w-full`}>
            <Plus size={18} />
            お支払い方法を追加
          </button>
          <p className="text-xs text-muted mt-4 leading-relaxed">
            インボイス登録番号の記載された領収書を発行できます。登録番号は「事業者情報」で設定してください。
          </p>
        </Card>
      </div>

      {paying && (
        <PaymentModal
          spotName={paying.spotName}
          fee={Math.round(paying.amount / 1.1)}
          onClose={() => setPaying(null)}
          onPaid={() =>
            setInvoices((prev) =>
              prev.map((i) =>
                i.id === paying.id ? { ...i, status: "paid", paidAt: "2026-09-24", method: "クレジットカード" } : i
              )
            )
          }
        />
      )}
    </div>
  );
}
