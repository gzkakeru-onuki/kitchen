"use client";

import { useState } from "react";
import { CalendarCheck, ChartColumn, Download, MapPinned, Percent, TrendingUp, Wallet } from "lucide-react";
import { listingPerformance, platformMonthly } from "@/lib/admin-mock";
import { yen } from "@/lib/mock";
import { Card, CardTitle, PageHeader, Stat, btn } from "@/components/ui";

const man = (n: number) => `${Math.round(n / 10000).toLocaleString()}万`;

export default function AdminReportsPage() {
  const [hover, setHover] = useState<number | null>(null);
  const cur = platformMonthly[platformMonthly.length - 1];
  const totalGmv = platformMonthly.reduce((s, m) => s + m.gmv, 0);
  const totalFee = platformMonthly.reduce((s, m) => s + m.feeRevenue, 0);
  const totalEvents = platformMonthly.reduce((s, m) => s + m.events, 0);
  const scaleMax = 10000000;
  const ticks = [0, 2500000, 5000000, 7500000, 10000000];
  const perfMax = Math.max(...listingPerformance.map((l) => l.gmv));
  const avgFill = Math.round(listingPerformance.reduce((s, l) => s + l.fillRate, 0) / listingPerformance.length);

  return (
    <div className="space-y-6">
      <PageHeader
        title="売上・手数料レポート"
        description="プラットフォーム全体の流通額、手数料収入、出店場所ごとの成績を確認します。"
        action={
          <div className="flex gap-2">
            <select className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold">
              <option>2026年度 上期</option>
              <option>2025年度 下期</option>
            </select>
            <button className={btn.secondary}>
              <Download size={18} />
              CSV
            </button>
          </div>
        }
      />

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Stat icon={TrendingUp} label="流通額（6か月）" value={yen(totalGmv)} sub={`今月 ${yen(cur.gmv)}`} accent />
        <Stat icon={Wallet} label="手数料収入" value={yen(totalFee)} sub="出店料＋システム利用料" />
        <Stat icon={CalendarCheck} label="出店件数" value={`${totalEvents} 件`} sub={`今月 ${cur.events} 件`} />
        <Stat icon={Percent} label="平均充足率" value={`${avgFill}%`} sub="確定区画 ÷ 募集区画" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="p-6">
          <CardTitle icon={ChartColumn}>月別の流通額</CardTitle>
          <div className="relative h-64 pl-14">
            {ticks.map((t) => (
              <div key={t} className="absolute left-14 right-0 border-t border-line" style={{ bottom: `${(t / scaleMax) * 100}%` }}>
                <span className="absolute -left-14 -translate-y-1/2 w-12 text-right text-[11px] text-muted whitespace-nowrap">{t === 0 ? "0" : man(t)}</span>
              </div>
            ))}
            <div className="absolute inset-0 left-14 flex items-end gap-3 sm:gap-5 px-2">
              {platformMonthly.map((m, i) => {
                const h = (m.gmv / scaleMax) * 100;
                return (
                  <div
                    key={m.label}
                    className="relative flex-1 h-full flex items-end justify-center"
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <div
                      className={`w-full max-w-12 rounded-t transition ${
                        i === platformMonthly.length - 1 ? "bg-brand" : hover === i ? "bg-brandsoft" : "bg-blue-200"
                      }`}
                      style={{ height: `${h}%` }}
                    />
                    {hover === i && (
                      <div
                        className="absolute z-10 whitespace-nowrap rounded-lg bg-navy text-white text-xs px-3 py-2 shadow-lg"
                        style={{ bottom: `calc(${h}% + 8px)` }}
                      >
                        <p className="font-bold">{m.label}</p>
                        <p>流通額 {yen(m.gmv)}</p>
                        <p className="text-[#B7C7D6]">手数料 {yen(m.feeRevenue)}　/　{m.events} 件</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-3 sm:gap-5 pl-16 pr-2 mt-2">
            {platformMonthly.map((m) => (
              <span key={m.label} className="flex-1 text-center text-xs text-muted">
                {m.label}
              </span>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <CardTitle icon={Wallet}>月別の手数料収入</CardTitle>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted border-b border-line">
                <th className="py-2 font-bold">月</th>
                <th className="py-2 font-bold text-right">手数料</th>
                <th className="py-2 font-bold text-right">料率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {platformMonthly.map((m) => (
                <tr key={m.label}>
                  <td className="py-2.5 text-ink">{m.label}</td>
                  <td className="py-2.5 text-right font-bold text-ink">{yen(m.feeRevenue)}</td>
                  <td className="py-2.5 text-right text-muted">{((m.feeRevenue / m.gmv) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Card className="p-6">
        <CardTitle icon={MapPinned}>出店場所別の成績</CardTitle>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-xs text-muted border-b border-line">
                <th className="py-2 font-bold">出店場所</th>
                <th className="py-2 font-bold text-right">開催</th>
                <th className="py-2 pl-6 font-bold">流通額</th>
                <th className="py-2 font-bold text-right">充足率</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {listingPerformance.map((l) => (
                <tr key={l.name}>
                  <td className="py-3 font-bold text-ink">{l.name}</td>
                  <td className="py-3 text-right text-ink">{l.events} 回</td>
                  <td className="py-3 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-paper overflow-hidden">
                        <div className="h-full rounded-full bg-brand" style={{ width: `${(l.gmv / perfMax) * 100}%` }} />
                      </div>
                      <span className="w-24 text-right text-ink whitespace-nowrap">{yen(l.gmv)}</span>
                    </div>
                  </td>
                  <td className={`py-3 text-right font-bold ${l.fillRate < 70 ? "text-amber-700" : "text-ink"}`}>{l.fillRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
