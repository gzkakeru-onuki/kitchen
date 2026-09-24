"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  FileCheck2,
  KeyRound,
  Mail,
  Pencil,
  Plus,
  Trash2,
  Truck,
  Upload,
  UserMinus,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { businessProfile as p, members, permits } from "@/lib/mock";
import type { Permit } from "@/lib/mock";
import { Card, CardTitle, PageHeader, Pill, btn } from "@/components/ui";

type Tab = "profile" | "vehicle" | "documents" | "members" | "security";

const tabs: { key: Tab; label: string; icon: LucideIcon }[] = [
  { key: "profile", label: "事業者情報", icon: Building2 },
  { key: "vehicle", label: "車両・メニュー", icon: Truck },
  { key: "documents", label: "許可証・書類", icon: FileCheck2 },
  { key: "members", label: "メンバー管理", icon: Users },
  { key: "security", label: "ログイン・退会", icon: KeyRound },
];

const permitStatus: Record<Permit["status"], { label: string; bg: string; fg: string; icon: LucideIcon }> = {
  valid: { label: "有効", bg: "#D1FAE5", fg: "#0F8A6B", icon: CircleCheck },
  expiring: { label: "期限間近", bg: "#FEF3C7", fg: "#92660A", icon: CircleAlert },
  missing: { label: "未登録", bg: "#FEE2E2", fg: "#B91C1C", icon: CircleAlert },
};

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <div>
      <PageHeader title="事業者情報・アカウント" description="登録情報、出店に必要な書類、メンバーやログイン情報を管理します。" />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="flex lg:flex-col gap-1 overflow-x-auto bg-white border border-line rounded-2xl p-2 h-fit">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2.5 whitespace-nowrap px-3 py-2.5 rounded-lg text-sm font-bold text-left transition ${
                  tab === t.key ? "bg-blue-50 text-brand" : "text-muted hover:text-ink hover:bg-paper"
                }`}
              >
                <Icon size={18} />
                {t.label}
              </button>
            );
          })}
        </nav>

        <div className="space-y-6 min-w-0">
          {tab === "profile" && (
            <Card className="p-6">
              <CardTitle icon={Building2} action={<EditButton />}>
                事業者情報
              </CardTitle>
              <InfoList
                rows={[
                  ["事業者名（屋号）", p.name],
                  ["代表者名", p.owner],
                  ["ジャンル", p.genre],
                  ["所在地", p.address],
                  ["電話番号", p.phone],
                  ["メールアドレス", p.email],
                  ["インボイス登録番号", p.invoiceNo],
                  ["ご利用プラン", p.plan],
                  ["登録日", p.since],
                ]}
              />
            </Card>
          )}

          {tab === "vehicle" && (
            <>
              <Card className="p-6">
                <CardTitle icon={Truck} action={<EditButton />}>
                  車両情報
                </CardTitle>
                <InfoList
                  rows={[
                    ["車種", p.vehicle.type],
                    ["ナンバー", p.vehicle.plate],
                    ["サイズ", p.vehicle.size],
                    ["電源", p.vehicle.power],
                  ]}
                />
              </Card>
              <Card className="p-6">
                <CardTitle
                  icon={UtensilsCrossed}
                  action={
                    <button className="inline-flex items-center gap-1 text-sm font-bold text-brand">
                      <Plus size={16} />
                      追加
                    </button>
                  }
                >
                  提供メニュー
                </CardTitle>
                <ul className="divide-y divide-line">
                  {p.menu.map((m) => (
                    <li key={m} className="py-3 flex items-center justify-between text-sm">
                      <span className="text-ink font-bold">{m}</span>
                      <button aria-label="編集" className="p-1.5 text-muted hover:text-ink">
                        <Pencil size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </Card>
            </>
          )}

          {tab === "documents" && (
            <Card className="p-6">
              <CardTitle
                icon={FileCheck2}
                action={
                  <button className={`${btn.secondary} !py-2 text-sm`}>
                    <Upload size={16} />
                    書類をアップロード
                  </button>
                }
              >
                許可証・書類
              </CardTitle>
              <p className="text-sm text-muted mb-4">
                出店場所によって必要な許可証が異なります。運営が確認後、「有効」になります。
              </p>
              <ul className="divide-y divide-line">
                {permits.map((d) => {
                  const st = permitStatus[d.status];
                  const Icon = st.icon;
                  return (
                    <li key={d.id} className="py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex-1">
                        <p className="font-bold text-ink text-sm">{d.name}</p>
                        <p className="text-xs text-muted">
                          {d.issuer}　/　有効期限 {d.expires}
                        </p>
                      </div>
                      <Pill bg={st.bg} fg={st.fg}>
                        <Icon size={12} />
                        {st.label}
                      </Pill>
                      {d.status !== "valid" && (
                        <button className="inline-flex items-center gap-1 text-sm font-bold text-brand">
                          <Upload size={14} />
                          {d.status === "missing" ? "登録" : "更新"}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}

          {tab === "members" && (
            <Card className="p-6">
              <CardTitle
                icon={Users}
                action={
                  <button className={`${btn.secondary} !py-2 text-sm`}>
                    <Mail size={16} />
                    メンバーを招待
                  </button>
                }
              >
                メンバー管理
              </CardTitle>
              <p className="text-sm text-muted mb-4">
                スタッフを招待すると、出店スケジュールの確認やチャットを共有できます（決済・退会はオーナーのみ）。
              </p>
              <ul className="divide-y divide-line">
                {members.map((m) => (
                  <li key={m.id} className="py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-brand flex items-center justify-center font-bold">
                      {m.name.slice(0, 1)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-ink">{m.name}</p>
                      <p className="text-xs text-muted truncate">{m.email}</p>
                    </div>
                    <Pill bg={m.role === "オーナー" ? "#E0E7FF" : "#F1F5F9"} fg={m.role === "オーナー" ? "#3730A3" : "#475569"}>
                      {m.role}
                    </Pill>
                    {m.role !== "オーナー" && (
                      <button aria-label="削除" className="p-1.5 text-muted hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {tab === "security" && (
            <>
              <Card className="p-6">
                <CardTitle icon={KeyRound}>ログイン情報</CardTitle>
                <ul className="divide-y divide-line">
                  {[
                    ["メールアドレス", p.email],
                    ["パスワード", "最終変更 2026-05-12"],
                    ["二段階認証", "SMS認証 有効"],
                  ].map(([k, v]) => (
                    <li key={k} className="py-3 flex items-center justify-between gap-3 text-sm">
                      <div>
                        <p className="font-bold text-ink">{k}</p>
                        <p className="text-muted">{v}</p>
                      </div>
                      <button className="inline-flex items-center gap-1 font-bold text-brand">
                        変更
                        <ChevronRight size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-6 border-red-200">
                <CardTitle icon={UserMinus}>退会</CardTitle>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  退会すると、応募中・予約中の出店はすべてキャンセルされ、売上データや投稿は閲覧できなくなります。
                </p>
                <Link href="/account/withdraw" className="inline-flex items-center gap-2 text-sm font-bold text-red-600">
                  退会手続きへ進む
                  <ChevronRight size={16} />
                </Link>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoList({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="divide-y divide-line">
      {rows.map(([k, v]) => (
        <div key={k} className="py-3 grid sm:grid-cols-[180px_1fr] gap-1 text-sm">
          <dt className="text-muted">{k}</dt>
          <dd className="text-ink font-bold">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function EditButton() {
  return (
    <button className="inline-flex items-center gap-1 text-sm font-bold text-brand">
      <Pencil size={14} />
      編集
    </button>
  );
}
