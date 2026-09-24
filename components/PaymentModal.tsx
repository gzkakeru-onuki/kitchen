"use client";

import { useState } from "react";
import { CircleCheck, CreditCard, Landmark, Lock } from "lucide-react";
import { paymentMethods, yen } from "@/lib/mock";
import { Modal, btn } from "@/components/ui";

export default function PaymentModal({
  spotName,
  fee,
  onClose,
  onPaid,
}: {
  spotName: string;
  fee: number;
  onClose: () => void;
  onPaid: () => void;
}) {
  const [method, setMethod] = useState(paymentMethods[0].id);
  const [done, setDone] = useState(false);
  const systemFee = Math.round(fee * 0.1);

  if (done) {
    return (
      <Modal onClose={onClose}>
        <div className="w-12 h-12 rounded-full bg-[#E0F5F4] text-teal flex items-center justify-center mb-4">
          <CircleCheck size={28} />
        </div>
        <h3 className="font-display font-bold text-lg text-ink mb-2">お支払いが完了しました</h3>
        <p className="text-sm text-muted mb-5 leading-relaxed">
          予約が確定しました。領収書は「決済・請求」からダウンロードできます。
        </p>
        <button onClick={onClose} className={`${btn.primary} w-full`}>
          閉じる
        </button>
      </Modal>
    );
  }

  return (
    <Modal title="出店料のお支払い" onClose={onClose}>
      <p className="text-sm text-muted -mt-2 mb-5">{spotName}</p>

      <div className="bg-paper rounded-xl p-4 mb-5 text-sm">
        <div className="flex justify-between mb-2">
          <span className="text-muted">出店料</span>
          <span className="text-ink">{yen(fee)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-muted">システム利用料（10%）</span>
          <span className="text-ink">{yen(systemFee)}</span>
        </div>
        <div className="border-t border-line mt-2 pt-2 flex justify-between font-bold">
          <span className="text-ink">合計（税込）</span>
          <span className="text-ink">{yen(fee + systemFee)}</span>
        </div>
      </div>

      <p className="text-sm font-bold text-ink mb-2">お支払い方法</p>
      <div className="space-y-2 mb-5">
        {paymentMethods.map((pm) => {
          const Icon = pm.id === "pm1" ? CreditCard : Landmark;
          const on = method === pm.id;
          return (
            <label
              key={pm.id}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition ${
                on ? "border-brand bg-blue-50" : "border-line"
              }`}
            >
              <input
                type="radio"
                name="pm"
                checked={on}
                onChange={() => setMethod(pm.id)}
                className="accent-brand"
              />
              <Icon size={18} className="text-brand" />
              <span className="flex-1">
                <span className="block text-sm font-bold text-ink">{pm.label}</span>
                <span className="block text-xs text-muted">{pm.sub}</span>
              </span>
            </label>
          );
        })}
      </div>

      <p className="flex items-center gap-1.5 text-xs text-muted mb-5">
        <Lock size={12} />
        デモ用の決済画面です。実際の請求は発生しません。
      </p>

      <div className="flex gap-3">
        <button onClick={onClose} className={`${btn.secondary} flex-1`}>
          キャンセル
        </button>
        <button
          onClick={() => {
            setDone(true);
            onPaid();
          }}
          className={`${btn.primary} flex-1`}
        >
          支払う
        </button>
      </div>
    </Modal>
  );
}
