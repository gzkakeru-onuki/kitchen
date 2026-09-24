"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChartColumn,
  Download,
  Plus,
  ReceiptText,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { monthlySales, salesRecords as initialRecords, yen } from "@/lib/mock";
import type { SalesRecord } from "@/lib/mock";
import { Card, CardTitle, Modal, PageHeader, Stat, btn } from "@/components/ui";

export default function SalesPage() {
  const [records, setRecords] = useState<SalesRecord[]>(initialRecords);
  const [adding, setAdding] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  const thisMonth = monthlySales[monthlySales.length - 1];
  const totalSales = records.reduce((s, r) => s + r.sales, 0);
  const totalFee = records.reduce((s, r) => s + r.fee, 0);
  const totalCustomers = records.reduce((s, r) => s + r.customers, 0);
  const avgTicket = Math.round(totalSales / totalCustomers);

  // 出店場所別の売上（今月）
  const bySpot = Object.entries(
    records.reduce<Record<string, number>>((acc, r) => {
      acc[r.spotName] = (acc[r.spotName] ?? 0) + r.sales;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);
  const spotMax = bySpot[0]?.[1] ?? 1;

  const max = Math.max(...monthlySales.map((m) => m.sales));
  const ticks = [0, 250000, 500000, 750000];
  const scaleMax = 750000;

  return (
    <div className="space-y-6">
      <PageHeader
        title="売上ダッシュボード"
        description="出店ごとの売上を記録し、月次の推移や出店場所別の成績を確認できます。"
        action={
          <div className="flex gap-2">
            <button className={btn.secondary}>
              <Download size={18} />
              CSV出力
            </button>
            <button onClick={() => setAdding(true)} className={btn.primary}>
              <Plus size={18} />
              売上を記録
            </button>
          </div>
        }
      />

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Stat icon={ChartColumn} label="今月の売上" value={yen(totalSales)} sub={`${records.length} 回の出店`} accent />
        <Stat icon={Wallet} label="出店料（経費）" value={yen(totalFee)} sub={`粗利 ${yen(totalSales - totalFee)}`} />
        <Stat icon={Users} label="来客数" value={`${totalCustomers.toLocaleString()} 人`} sub="今月合計" />
        <Stat icon={ReceiptText} label="平均客単価" value={yen(avgTicket)} sub="売上 ÷ 来客数" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* 月次推移 */}
        <Card className="p-6">
          <CardTitle icon={TrendingUp}>月別売上の推移</CardTitle>
          <div className="relative h-64 pl-12">
            {/* グリッド */}
            {ticks.map((t) => (
              <div
                key={t}
                className="absolute left-12 right-0 border-t border-line"
                style={{ bottom: `${(t / scaleMax) * 100}%` }}
              >
                <span className="absolute -left-12 -translate-y-1/2 w-10 text-right text-[11px] text-muted">
                  {t === 0 ? "0" : `${t / 10000}万`}
                </span>
              </div>
            ))}
            <div className="absolute inset-0 left-12 flex items-end gap-3 sm:gap-5 px-2">
              {monthlySales.map((m, i) => {
                const isLast = i === monthlySales.length - 1;
                return (
                  <div
                    key={m.month}
                    className="relative flex-1 h-full flex items-end justify-center cursor-default"
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <div
                      className={`w-full max-w-12 rounded-t transition ${
                        isLast ? "bg-brand" : hover === i ? "bg-brandsoft" : "bg-blue-200"
                      }`}
                      style={{ height: `${(m.sales / scaleMax) * 100}%` }}
                    />
                    {hover === i && (
                      <div
                        className="absolute z-10 whitespace-nowrap rounded-lg bg-navy text-white text-xs px-3 py-2 shadow-lg"
                        style={{ bottom: `calc(${(m.sales / scaleMax) * 100}% + 8px)` }}
                      >
                        <p className="font-bold">{m.label}</p>
                        <p>{yen(m.sales)}</p>
                        <p className="text-[#B7C7D6]">出店 {m.events} 回</p>
                      </div>
                    )}
                    {m.sales === max && hover !== i && (
                      <span
                        className="absolute text-[11px] font-bold text-ink"
                        style={{ bottom: `calc(${(m.sales / scaleMax) * 100}% + 4px)` }}
                      >
                        {Math.round(m.sales / 10000)}万
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-3 sm:gap-5 pl-14 pr-2 mt-2">
            {monthlySales.map((m) => (
              <span key={m.month} className="flex-1 text-center text-xs text-muted">
                {m.label}
              </span>
            ))}
          </div>
        </Card>

        {/* 出店場所別 */}
        <Card className="p-6">
          <CardTitle icon={ChartColumn}>出店場所別の売上（今月）</CardTitle>
          <ul className="space-y-4">
            {bySpot.map(([name, v]) => (
              <li key={name}>
                <div className="flex justify-between gap-3 text-sm mb-1.5">
                  <span className="text-ink font-bold truncate">{name}</span>
                  <span className="text-ink whitespace-nowrap">{yen(v)}</span>
                </div>
                <div className="h-2 rounded-full bg-paper overflow-hidden">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${(v / spotMax) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 明細 */}
      <Card className="p-6">
        <CardTitle icon={CalendarDays}>出店ごとの売上明細（{thisMonth.label}）</CardTitle>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left text-xs text-muted border-b border-line">
                <th className="py-2 font-bold">日付</th>
                <th className="py-2 font-bold">出店場所</th>
                <th className="py-2 font-bold text-right">売上</th>
                <th className="py-2 font-bold text-right">来客数</th>
                <th className="py-2 font-bold text-right">客単価</th>
                <th className="py-2 font-bold text-right">出店料</th>
                <th className="py-2 font-bold text-right">粗利</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {records.map((r) => (
                <tr key={r.id}>
                  <td className="py-3 text-muted whitespace-nowrap">{r.date}</td>
                  <td className="py-3 font-bold text-ink">{r.spotName}</td>
                  <td className="py-3 text-right text-ink">{yen(r.sales)}</td>
                  <td className="py-3 text-right text-ink">{r.customers}</td>
                  <td className="py-3 text-right text-ink">{yen(Math.round(r.sales / r.customers))}</td>
                  <td className="py-3 text-right text-muted">{yen(r.fee)}</td>
                  <td className="py-3 text-right font-bold text-ink">{yen(r.sales - r.fee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {adding && (
        <AddSalesModal
          onClose={() => setAdding(false)}
          onAdd={(r) => {
            setRecords((prev) => [r, ...prev]);
            setAdding(false);
          }}
        />
      )}
    </div>
  );
}

function AddSalesModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (r: SalesRecord) => void;
}) {
  const [spotName, setSpotName] = useState("渋谷リバーサイド広場");
  const [sales, setSales] = useState("85000");
  const [customers, setCustomers] = useState("120");
  const input =
    "w-full rounded-xl border border-line px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100";

  return (
    <Modal title="売上を記録" onClose={onClose}>
      <div className="space-y-4">
        <label className="block">
          <span className="block text-sm font-bold text-ink mb-1.5">出店場所</span>
          <input value={spotName} onChange={(e) => setSpotName(e.target.value)} className={input} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-sm font-bold text-ink mb-1.5">売上（円）</span>
            <input value={sales} onChange={(e) => setSales(e.target.value)} inputMode="numeric" className={input} />
          </label>
          <label className="block">
            <span className="block text-sm font-bold text-ink mb-1.5">来客数</span>
            <input value={customers} onChange={(e) => setCustomers(e.target.value)} inputMode="numeric" className={input} />
          </label>
        </div>
        <p className="text-xs text-muted">POSレジ連携（Square / Airレジ）で自動取り込みにも対応予定です。</p>
        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className={`${btn.secondary} flex-1`}>
            キャンセル
          </button>
          <button
            onClick={() =>
              onAdd({
                id: `s${Date.now()}`,
                date: "2026-09-24",
                spotName,
                sales: Number(sales) || 0,
                customers: Math.max(Number(customers) || 1, 1),
                fee: 0,
              })
            }
            className={`${btn.primary} flex-1`}
          >
            記録する
          </button>
        </div>
      </div>
    </Modal>
  );
}
