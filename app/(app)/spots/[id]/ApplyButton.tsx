"use client";

import { useState } from "react";
import Link from "next/link";
import { CircleCheck, Send, Truck } from "lucide-react";
import { businessProfile } from "@/lib/mock";
import { Modal, btn } from "@/components/ui";

export default function ApplyButton({
  spotName,
  closed,
}: {
  spotName: string;
  closed: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [menus, setMenus] = useState<string[]>(businessProfile.menu.slice(0, 2));

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

  function toggleMenu(m: string) {
    setMenus((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={`${btn.primary} w-full py-3.5`}>
        <Send size={18} />
        この場所に応募する
      </button>

      {open && (
        <Modal
          title={done ? undefined : "応募（エントリー）"}
          onClose={() => {
            setOpen(false);
            setDone(false);
          }}
        >
          {!done ? (
            <div className="space-y-5">
              <p className="text-sm text-muted leading-relaxed">「{spotName}」に応募します。</p>

              <div className="rounded-xl bg-paper p-4 text-sm">
                <p className="flex items-center gap-2 font-bold text-ink mb-1">
                  <Truck size={16} className="text-brand" />
                  登録車両
                </p>
                <p className="text-muted">{businessProfile.vehicle.type}</p>
                <p className="text-muted">{businessProfile.vehicle.size}</p>
              </div>

              <div>
                <p className="text-sm font-bold text-ink mb-2">提供予定メニュー</p>
                <div className="flex flex-wrap gap-2">
                  {businessProfile.menu.map((m) => {
                    const on = menus.includes(m);
                    return (
                      <button
                        key={m}
                        onClick={() => toggleMenu(m)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border transition ${
                          on ? "bg-blue-50 border-brand text-brand" : "border-line text-muted"
                        }`}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="block">
                <span className="block text-sm font-bold text-ink mb-1.5">運営への連絡事項（任意）</span>
                <textarea
                  rows={3}
                  placeholder="電源容量・搬入時間の希望など"
                  className="w-full rounded-xl border border-line px-4 py-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </label>

              <div className="flex gap-3">
                <button onClick={() => setOpen(false)} className={`${btn.secondary} flex-1`}>
                  キャンセル
                </button>
                <button onClick={() => setDone(true)} className={`${btn.primary} flex-1`}>
                  応募する
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-[#E0F5F4] text-teal flex items-center justify-center mb-4">
                <CircleCheck size={28} />
              </div>
              <h3 className="font-display font-bold text-lg text-ink mb-2">応募を受け付けました</h3>
              <p className="text-sm text-muted mb-5 leading-relaxed">
                審査結果は「応募・予約管理」とチャットでお知らせします。
              </p>
              <Link href="/entries" className={`${btn.primary} w-full`}>
                応募・予約管理で確認する
              </Link>
            </>
          )}
        </Modal>
      )}
    </>
  );
}
