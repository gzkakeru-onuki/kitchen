"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CircleAlert, CircleCheck } from "lucide-react";
import { applications, invoices } from "@/lib/mock";
import { Card, PageHeader, btn } from "@/components/ui";

const reasons = [
  "出店の機会が少なかった",
  "他のサービスを利用することにした",
  "キッチンカー事業をやめる・休止する",
  "使い方がわかりにくかった",
  "その他",
];

export default function WithdrawPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [reason, setReason] = useState<string | null>(null);
  const [agreed, setAgreed] = useState(false);

  const activeEntries = applications.filter((a) => a.status !== "rejected").length;
  const unpaid = invoices.filter((i) => i.status === "unpaid").length;

  if (step === 3) {
    return (
      <Card className="max-w-xl p-8 text-center mx-auto">
        <div className="w-14 h-14 rounded-full bg-[#E0F5F4] text-teal flex items-center justify-center mx-auto mb-4">
          <CircleCheck size={30} />
        </div>
        <h1 className="font-display font-black text-xl text-ink mb-2">退会手続きが完了しました</h1>
        <p className="text-sm text-muted leading-relaxed mb-6">
          これまでKitchenBaseをご利用いただき、ありがとうございました。確認メールをお送りしました。
        </p>
        <Link href="/login" className={btn.primary}>
          ログイン画面へ
        </Link>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link href="/account" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink mb-5">
        <ChevronLeft size={16} />
        アカウント設定へ戻る
      </Link>
      <PageHeader title="退会手続き" description={`ステップ ${step} / 2`} />

      {step === 1 && (
        <Card className="p-6 space-y-5">
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900">
            <p className="flex items-center gap-2 font-bold mb-2">
              <CircleAlert size={16} />
              退会前にご確認ください
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>応募中・予約中の出店 {activeEntries} 件はすべてキャンセルされます</li>
              <li>未払いの請求が {unpaid} 件あります。退会前にお支払いが必要です</li>
              <li>売上データ・チャット履歴・コミュニティ投稿は削除されます</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold text-ink mb-2">退会の理由（任意）</p>
            <div className="space-y-2">
              {reasons.map((r) => (
                <label key={r} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm cursor-pointer">
                  <input type="radio" name="reason" checked={reason === r} onChange={() => setReason(r)} className="accent-brand" />
                  {r}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/account" className={`${btn.secondary} flex-1`}>
              やめる
            </Link>
            <button onClick={() => setStep(2)} className={`${btn.primary} flex-1`}>
              次へ
            </button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6 space-y-5">
          <p className="text-sm text-ink leading-relaxed">
            退会すると元に戻すことはできません。データのエクスポートが必要な場合は、先に「売上ダッシュボード」からCSVを出力してください。
          </p>
          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-red-600" />
            上記の内容を理解し、退会に同意します
          </label>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className={`${btn.secondary} flex-1`}>
              戻る
            </button>
            <button
              disabled={!agreed}
              onClick={() => setStep(3)}
              className={`${btn.danger} flex-1 disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              退会する
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}
