"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Check, ChevronLeft, FileCheck2, KeyRound, Truck, Upload } from "lucide-react";
import { btn } from "@/components/ui";

const steps = [
  { label: "アカウント", icon: KeyRound },
  { label: "事業者情報", icon: Building2 },
  { label: "車両・メニュー", icon: Truck },
  { label: "許可証", icon: FileCheck2 },
];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const last = step === steps.length - 1;

  return (
    <main className="min-h-screen bg-paper px-5 py-10">
      <div className="max-w-xl mx-auto">
        <Link href="/login" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink mb-6">
          <ChevronLeft size={16} />
          ログイン画面へ戻る
        </Link>

        <div className="flex items-center gap-2 mb-2">
          <span className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center">
            <Truck size={18} />
          </span>
          <span className="font-display font-black text-lg text-navy">KitchenBase</span>
        </div>
        <h1 className="font-display font-black text-2xl text-ink mb-6">出店事業者の新規登録</h1>

        {/* ステッパー */}
        <ol className="grid grid-cols-4 gap-2 mb-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const current = i === step;
            return (
              <li key={s.label} className="flex flex-col items-center gap-1.5 text-center">
                <span
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    done ? "bg-teal text-white" : current ? "bg-brand text-white" : "bg-white border border-line text-muted"
                  }`}
                >
                  {done ? <Check size={18} /> : <Icon size={18} />}
                </span>
                <span className={`text-xs font-bold ${current ? "text-brand" : "text-muted"}`}>{s.label}</span>
              </li>
            );
          })}
        </ol>

        <div className="bg-white rounded-2xl border border-line p-6 space-y-5">
          {step === 0 && (
            <>
              <Field label="メールアドレス" placeholder="owner@example.com" type="email" />
              <Field label="パスワード" placeholder="8文字以上" type="password" />
              <Field label="パスワード（確認）" placeholder="もう一度入力" type="password" />
              <label className="flex items-start gap-2 text-sm text-muted">
                <input type="checkbox" className="mt-0.5 accent-brand" defaultChecked />
                利用規約・プライバシーポリシーに同意する
              </label>
            </>
          )}
          {step === 1 && (
            <>
              <Field label="事業者名（屋号・キッチンカー名）" placeholder="山田キッチン" />
              <Field label="代表者名" placeholder="山田 太郎" />
              <Field label="電話番号" placeholder="090-1234-5678" />
              <Field label="所在地" placeholder="東京都世田谷区〇〇 1-2-3" />
              <Field label="インボイス登録番号（任意）" placeholder="T1234567890123" />
            </>
          )}
          {step === 2 && (
            <>
              <Field label="車種" placeholder="軽トラック（移動販売車）" />
              <div className="grid grid-cols-3 gap-3">
                <Field label="全長(m)" placeholder="3.4" />
                <Field label="幅(m)" placeholder="1.5" />
                <Field label="高さ(m)" placeholder="2.5" />
              </div>
              <Field label="ジャンル" placeholder="クレープ・スイーツ" />
              <Field label="主なメニュー" placeholder="いちごカスタードクレープ、チョコバナナ…" />
            </>
          )}
          {step === 3 && (
            <>
              {["飲食店営業許可証", "食品衛生責任者証", "PL保険 加入証明（任意）"].map((d) => (
                <div key={d} className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-line px-4 py-4">
                  <span className="text-sm font-bold text-ink">{d}</span>
                  <button className="inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                    <Upload size={16} />
                    ファイルを選択
                  </button>
                </div>
              ))}
              <p className="text-xs text-muted leading-relaxed">
                書類は運営事務局が確認します（通常1〜2営業日）。確認中も出店場所の検索・応募は可能です。
              </p>
            </>
          )}

          <div className="flex gap-3 pt-2">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className={`${btn.secondary} flex-1`}>
                戻る
              </button>
            )}
            {last ? (
              <Link href="/dashboard" className={`${btn.primary} flex-1`}>
                登録して始める
              </Link>
            ) : (
              <button onClick={() => setStep(step + 1)} className={`${btn.primary} flex-1`}>
                次へ
              </button>
            )}
          </div>
        </div>
        <p className="text-center text-xs text-muted mt-4">※ デモのため、入力せずにそのまま進めます</p>
      </div>
    </main>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-ink mb-1.5">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}
