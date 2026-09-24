"use client";

import { useState } from "react";
import Link from "next/link";

export default function ApplyButton({
  spotName,
  closed,
}: {
  spotName: string;
  closed: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  if (closed) {
    return (
      <button
        disabled
        className="w-full bg-slate-100 text-slate-400 font-bold py-3.5 rounded-xl cursor-not-allowed"
      >
        受付を終了しました
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full bg-brand hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition"
      >
        この場所に応募する
      </button>

      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-5">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6">
            {!done ? (
              <>
                <h3 className="font-display font-bold text-lg text-ink mb-2">
                  応募内容の確認
                </h3>
                <p className="text-sm text-muted mb-5 leading-relaxed">
                  「{spotName}」に応募（エントリー）します。よろしいですか？
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setOpen(false)}
                    className="flex-1 border border-line text-ink font-bold py-3 rounded-xl hover:bg-paper transition"
                  >
                    キャンセル
                  </button>
                  <button
                    onClick={() => setDone(true)}
                    className="flex-1 bg-brand hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
                  >
                    応募する
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-teal-50 text-teal flex items-center justify-center text-2xl mb-4">
                  ✓
                </div>
                <h3 className="font-display font-bold text-lg text-ink mb-2">
                  応募を受け付けました
                </h3>
                <p className="text-sm text-muted mb-5 leading-relaxed">
                  審査結果はマイページとチャットでお知らせします。
                </p>
                <Link
                  href="/mypage"
                  className="block text-center bg-brand hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
                >
                  マイページで確認する
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
