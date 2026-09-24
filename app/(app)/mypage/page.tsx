"use client";

import { useState } from "react";
import { applications as initialApps, statusMeta, yen, currentUser } from "@/lib/mock";
import type { Application } from "@/lib/mock";

export default function MyPage() {
  const [apps, setApps] = useState<Application[]>(initialApps);
  const [paying, setPaying] = useState<Application | null>(null);

  function completePayment(id: string) {
    setApps((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "reserved" } : a))
    );
    setPaying(null);
  }

  const active = apps.filter((a) => a.status !== "rejected").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display font-black text-2xl md:text-3xl text-ink">
          マイページ
        </h1>
        <p className="text-muted mt-1">
          {currentUser.name}（{currentUser.owner}）さんの応募状況・予約
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <Stat label="応募中・予約" value={`${active} 件`} />
        <Stat
          label="決済待ち"
          value={`${apps.filter((a) => a.status === "approved").length} 件`}
          accent
        />
        <Stat
          label="予約確定"
          value={`${apps.filter((a) => a.status === "reserved").length} 件`}
        />
      </div>

      <h2 className="font-display font-bold text-lg text-ink mb-4">応募一覧</h2>
      <div className="space-y-4">
        {apps.map((a) => {
          const meta = statusMeta[a.status];
          return (
            <div
              key={a.id}
              className="bg-white rounded-2xl border border-line p-5 md:flex md:items-center md:justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: meta.bg, color: meta.fg }}
                  >
                    {meta.label}
                  </span>
                  <span className="text-xs text-muted">応募日 {a.appliedAt}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-ink">
                  {a.spotName}
                </h3>
                <p className="text-sm text-muted">
                  {a.area}　/　{a.date}　/　出店料 {yen(a.fee)}
                </p>
              </div>

              <div className="mt-4 md:mt-0 shrink-0">
                {a.status === "approved" && (
                  <button
                    onClick={() => setPaying(a)}
                    className="w-full md:w-auto bg-brand hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition"
                  >
                    決済して予約を確定
                  </button>
                )}
                {a.status === "reserved" && (
                  <span className="inline-flex items-center gap-1.5 text-teal font-bold">
                    ✓ 予約確定・決済済み
                  </span>
                )}
                {a.status === "reviewing" && (
                  <span className="text-muted text-sm">審査結果をお待ちください</span>
                )}
                {a.status === "rejected" && (
                  <span className="text-slate-400 text-sm">また次回ご検討ください</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 決済モーダル */}
      {paying && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-5">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6">
            <h3 className="font-display font-bold text-lg text-ink mb-1">
              出店料のお支払い
            </h3>
            <p className="text-sm text-muted mb-5">{paying.spotName}</p>

            <div className="bg-paper rounded-xl p-4 mb-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted">出店料</span>
                <span className="text-ink">{yen(paying.fee)}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted">システム利用料</span>
                <span className="text-ink">{yen(Math.round(paying.fee * 0.1))}</span>
              </div>
              <div className="border-t border-line mt-2 pt-2 flex justify-between font-bold">
                <span className="text-ink">合計</span>
                <span className="text-ink">
                  {yen(paying.fee + Math.round(paying.fee * 0.1))}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-5">
              <div className="rounded-xl border border-line px-4 py-3 text-sm text-muted">
                💳 カード番号　•••• •••• •••• 4242
              </div>
              <p className="text-xs text-muted">
                ※ デモ用の決済画面です。実際の請求は発生しません。
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPaying(null)}
                className="flex-1 border border-line text-ink font-bold py-3 rounded-xl hover:bg-paper transition"
              >
                キャンセル
              </button>
              <button
                onClick={() => completePayment(paying.id)}
                className="flex-1 bg-brand hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
              >
                支払う
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent ? "bg-navy border-navy text-white" : "bg-white border-line"
      }`}
    >
      <p className={`text-sm ${accent ? "text-brandsoft" : "text-muted"}`}>
        {label}
      </p>
      <p className="font-display font-black text-2xl mt-1">{value}</p>
    </div>
  );
}
