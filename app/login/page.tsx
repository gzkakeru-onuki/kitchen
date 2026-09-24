"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* 左：ブランドパネル */}
      <div className="md:w-1/2 bg-navy text-white px-8 py-14 md:px-16 md:py-0 md:flex md:flex-col md:justify-center">
        <div className="max-w-md">
          <p className="text-brandsoft font-bold tracking-widest text-sm mb-6">
            KITCHENBASE
          </p>
          <h1 className="font-display font-black text-3xl md:text-4xl leading-snug mb-6">
            キッチンカー事業者のための
            <br />
            出店ポータル
          </h1>
          <p className="text-[#B7C7D6] leading-relaxed">
            出店場所の検索・応募から、可否の確認・予約・決済、運営とのやり取りまで。
            出店に必要な手続きを、ひとつのアプリにまとめました。
          </p>
          <ul className="mt-8 space-y-3 text-[#D5E3EE]">
            <li>・出店場所をエリアや日程で検索・応募</li>
            <li>・出店可否の確認、予約とオンライン決済</li>
            <li>・運営事務局とのチャット</li>
          </ul>
        </div>
      </div>

      {/* 右：フォーム */}
      <div className="md:w-1/2 flex items-center justify-center px-6 py-14 md:py-0">
        <div className="w-full max-w-sm">
          <div className="inline-flex mb-4 rounded-full bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1">
            モックアップ（デモ用）
          </div>

          <div className="flex bg-paper rounded-xl p-1 mb-8 border border-line">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                mode === "login"
                  ? "bg-white text-brand shadow-sm"
                  : "text-muted"
              }`}
            >
              ログイン
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                mode === "register"
                  ? "bg-white text-brand shadow-sm"
                  : "text-muted"
              }`}
            >
              新規登録
            </button>
          </div>

          <div className="space-y-5">
            {mode === "register" && (
              <Field label="事業者名（キッチンカー名）" placeholder="山田キッチン" />
            )}
            <Field label="メールアドレス" placeholder="owner@example.com" type="email" />
            <Field label="パスワード" placeholder="••••••••" type="password" />
            {mode === "register" && (
              <Field label="パスワード（確認）" placeholder="••••••••" type="password" />
            )}

            <Link
              href="/spots"
              className="block text-center bg-brand hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition"
            >
              {mode === "login" ? "ログイン" : "登録して始める"}
            </Link>

            <p className="text-center text-xs text-muted">
              ※ デモのため、入力せずにそのまま進めます
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
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
