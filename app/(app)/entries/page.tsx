"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Check,
  CircleX,
  Clock,
  CreditCard,
  MapPin,
  MessageSquare,
  Search,
  Truck,
} from "lucide-react";
import { applications as initialApps, statusMeta, yen } from "@/lib/mock";
import type { Application, ApplicationStatus } from "@/lib/mock";
import { Card, Modal, PageHeader, Pill, btn } from "@/components/ui";
import PaymentModal from "@/components/PaymentModal";

const tabs: { key: "all" | ApplicationStatus; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "reviewing", label: "審査中" },
  { key: "approved", label: "承認・決済待ち" },
  { key: "reserved", label: "予約確定" },
  { key: "rejected", label: "見送り" },
];

const steps = ["応募", "審査", "承認", "決済", "予約確定"];

function stepIndex(s: ApplicationStatus) {
  if (s === "reviewing") return 1;
  if (s === "approved") return 3;
  if (s === "reserved") return 4;
  return -1;
}

export default function EntriesPage() {
  const [apps, setApps] = useState<Application[]>(initialApps);
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("all");
  const [paying, setPaying] = useState<Application | null>(null);
  const [detail, setDetail] = useState<Application | null>(null);
  const [cancelTarget, setCancelTarget] = useState<Application | null>(null);

  const list = tab === "all" ? apps : apps.filter((a) => a.status === tab);

  function setStatus(id: string, status: ApplicationStatus) {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  return (
    <div>
      <PageHeader
        title="応募・予約管理"
        description="応募した出店場所の審査状況、出店可否、予約内容を確認できます。"
        action={
          <Link href="/spots" className={btn.secondary}>
            <Search size={18} />
            出店場所を探す
          </Link>
        }
      />

      <div className="flex gap-1 overflow-x-auto mb-5 bg-white border border-line rounded-xl p-1 w-fit max-w-full">
        {tabs.map((t) => {
          const count = t.key === "all" ? apps.length : apps.filter((a) => a.status === t.key).length;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition ${
                tab === t.key ? "bg-brand text-white" : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
              <span className="ml-1.5 opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {list.map((a) => {
          const meta = statusMeta[a.status];
          const idx = stepIndex(a.status);
          return (
            <Card key={a.id} className="p-5">
              <div className="md:flex md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <Pill bg={meta.bg} fg={meta.fg}>
                      {meta.label}
                    </Pill>
                    <span className="text-xs text-muted">応募日 {a.appliedAt}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-ink">{a.spotName}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {a.area}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      {a.date}
                    </span>
                    <span>出店料 {yen(a.fee)}</span>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex flex-wrap gap-2 shrink-0">
                  {a.status === "approved" && (
                    <button onClick={() => setPaying(a)} className={btn.primary}>
                      <CreditCard size={18} />
                      決済して予約を確定
                    </button>
                  )}
                  {(a.status === "approved" || a.status === "reserved") && (
                    <button onClick={() => setDetail(a)} className={btn.secondary}>
                      予約詳細
                    </button>
                  )}
                  {a.status === "reviewing" && (
                    <button onClick={() => setCancelTarget(a)} className={btn.secondary}>
                      応募を取り下げる
                    </button>
                  )}
                  {a.status === "rejected" && (
                    <Link href="/spots" className={btn.secondary}>
                      他の場所を探す
                    </Link>
                  )}
                </div>
              </div>

              {/* 進捗 */}
              {idx >= 0 ? (
                <ol className="mt-5 pt-4 border-t border-line grid grid-cols-5 gap-2">
                  {steps.map((s, i) => {
                    const done = i < idx || (i === idx && a.status === "reserved");
                    const current = i === idx && a.status !== "reserved";
                    return (
                      <li key={s} className="flex flex-col items-center gap-1.5 text-center">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            done
                              ? "bg-teal text-white"
                              : current
                              ? "bg-brand text-white"
                              : "bg-paper text-muted border border-line"
                          }`}
                        >
                          {done ? <Check size={14} /> : current ? <Clock size={14} /> : i + 1}
                        </span>
                        <span className={`text-[11px] font-bold ${current ? "text-brand" : "text-muted"}`}>
                          {s}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="mt-4 pt-4 border-t border-line flex items-center gap-2 text-sm text-muted">
                  <CircleX size={16} />
                  今回は出店を見送りとなりました。理由はチャットでご確認いただけます。
                </p>
              )}
            </Card>
          );
        })}
        {list.length === 0 && (
          <p className="text-center text-muted py-16">該当する応募はありません。</p>
        )}
      </div>

      {paying && (
        <PaymentModal
          spotName={paying.spotName}
          fee={paying.fee}
          onClose={() => setPaying(null)}
          onPaid={() => setStatus(paying.id, "reserved")}
        />
      )}

      {detail && (
        <Modal title="予約詳細" onClose={() => setDetail(null)}>
          <p className="font-bold text-ink mb-4">{detail.spotName}</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm mb-5">
            <dt className="text-muted">開催日</dt>
            <dd className="text-ink font-bold">{detail.date}</dd>
            <dt className="text-muted">区画</dt>
            <dd className="text-ink font-bold">{detail.booth}</dd>
            <dt className="text-muted">搬入時間</dt>
            <dd className="text-ink font-bold flex items-center gap-1.5">
              <Truck size={14} />
              {detail.loadIn}
            </dd>
            {detail.payDeadline && (
              <>
                <dt className="text-muted">決済期限</dt>
                <dd className="text-ink font-bold">{detail.payDeadline}</dd>
              </>
            )}
            <dt className="text-muted">無料キャンセル</dt>
            <dd className="text-ink font-bold">{detail.cancelDeadline} まで</dd>
          </dl>
          <div className="flex flex-col gap-2">
            <Link href="/chat" className={btn.secondary}>
              <MessageSquare size={18} />
              運営に問い合わせる
            </Link>
            <button
              onClick={() => {
                setCancelTarget(detail);
                setDetail(null);
              }}
              className="text-sm font-bold text-red-600 py-2"
            >
              予約をキャンセルする
            </button>
          </div>
        </Modal>
      )}

      {cancelTarget && (
        <Modal
          title={cancelTarget.status === "reviewing" ? "応募の取り下げ" : "予約のキャンセル"}
          onClose={() => setCancelTarget(null)}
        >
          <p className="text-sm text-muted leading-relaxed mb-5">
            「{cancelTarget.spotName}」の
            {cancelTarget.status === "reviewing" ? "応募を取り下げます。" : "予約をキャンセルします。"}
            {cancelTarget.status === "reserved" &&
              `${cancelTarget.cancelDeadline} までのキャンセルは出店料を全額返金します。`}
          </p>
          <div className="flex gap-3">
            <button onClick={() => setCancelTarget(null)} className={`${btn.secondary} flex-1`}>
              戻る
            </button>
            <button
              onClick={() => {
                setApps((prev) => prev.filter((a) => a.id !== cancelTarget.id));
                setCancelTarget(null);
              }}
              className={`${btn.danger} flex-1`}
            >
              確定する
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
