import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CalendarCheck,
  ChartColumn,
  Clock,
  CreditCard,
  MapPin,
  Megaphone,
  MessageSquare,
  Newspaper,
  Search,
  TrendingUp,
} from "lucide-react";
import {
  announcements,
  applications,
  articles,
  businessProfile,
  monthlySales,
  permits,
  statusMeta,
  unreadChatCount,
  yen,
} from "@/lib/mock";
import { Card, CardTitle, PageHeader, Pill, Stat, btn } from "@/components/ui";
import { SpotThumb } from "@/components/SpotIcon";

export default function DashboardPage() {
  const reserved = applications.filter((a) => a.status === "reserved");
  const approved = applications.filter((a) => a.status === "approved");
  const reviewing = applications.filter((a) => a.status === "reviewing");
  const thisMonth = monthlySales[monthlySales.length - 1];
  const lastMonth = monthlySales[monthlySales.length - 2];
  const diff = Math.round(((thisMonth.sales - lastMonth.sales) / lastMonth.sales) * 100);
  const permitAlerts = permits.filter((p) => p.status !== "valid");

  return (
    <div className="space-y-6">
      <PageHeader
        title={`こんにちは、${businessProfile.name}さん`}
        description="出店予定・やることリスト・売上の概況です。"
        action={
          <Link href="/spots" className={btn.primary}>
            <Search size={18} />
            出店場所を探す
          </Link>
        }
      />

      {/* KPI */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Stat icon={ChartColumn} label="今月の売上" value={yen(thisMonth.sales)} sub={`前月比 ${diff > 0 ? "+" : ""}${diff}%`} accent />
        <Stat icon={CalendarCheck} label="予約確定" value={`${reserved.length} 件`} sub="今後の出店予定" />
        <Stat icon={CreditCard} label="決済待ち" value={`${approved.length} 件`} sub="期限内にお支払いください" />
        <Stat icon={Clock} label="審査中" value={`${reviewing.length} 件`} sub="結果はチャットで通知" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* やること */}
        <Card className="p-6">
          <CardTitle icon={AlertTriangle}>対応が必要なこと</CardTitle>
          <ul className="divide-y divide-line">
            {approved.map((a) => (
              <TodoRow
                key={a.id}
                icon={CreditCard}
                title={`「${a.spotName}」の出店料をお支払いください`}
                sub={`決済期限 ${a.payDeadline}　/　${yen(a.fee)}`}
                href="/payments"
                cta="決済へ"
              />
            ))}
            {unreadChatCount > 0 && (
              <TodoRow
                icon={MessageSquare}
                title={`運営からの未読メッセージが ${unreadChatCount} 件あります`}
                sub="出店条件や区画についてのご連絡"
                href="/chat"
                cta="確認"
              />
            )}
            {permitAlerts.map((p) => (
              <TodoRow
                key={p.id}
                icon={AlertTriangle}
                title={
                  p.status === "expiring"
                    ? `${p.name} の有効期限が近づいています`
                    : `${p.name} が未登録です`
                }
                sub={p.status === "expiring" ? `有効期限 ${p.expires}` : "神奈川県内の出店に必要です"}
                href="/account"
                cta="更新"
              />
            ))}
          </ul>
        </Card>

        {/* 次回の出店 */}
        <Card className="p-6">
          <CardTitle
            icon={CalendarCheck}
            action={
              <Link href="/entries" className="text-sm font-bold text-brand">
                すべて見る
              </Link>
            }
          >
            出店スケジュール
          </CardTitle>
          <ul className="space-y-3">
            {applications
              .filter((a) => a.status !== "rejected")
              .map((a) => {
                const meta = statusMeta[a.status];
                return (
                  <li key={a.id} className="rounded-xl bg-paper p-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-bold text-muted">{a.date}</span>
                      <Pill bg={meta.bg} fg={meta.fg}>
                        {meta.label}
                      </Pill>
                    </div>
                    <p className="font-bold text-ink text-sm">{a.spotName}</p>
                    <p className="flex items-center gap-1 text-xs text-muted mt-1">
                      <MapPin size={12} />
                      {a.area}
                      {a.booth && `　区画 ${a.booth}`}
                    </p>
                  </li>
                );
              })}
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 売上ミニ */}
        <Card className="p-6">
          <CardTitle
            icon={TrendingUp}
            action={
              <Link href="/sales" className="text-sm font-bold text-brand">
                ダッシュボードへ
              </Link>
            }
          >
            売上推移（直近6か月）
          </CardTitle>
          <MiniBars />
        </Card>

        {/* お知らせ */}
        <Card className="p-6">
          <CardTitle
            icon={Megaphone}
            action={
              <Link href="/community" className="text-sm font-bold text-brand">
                すべて見る
              </Link>
            }
          >
            運営からのお知らせ
          </CardTitle>
          <ul className="divide-y divide-line">
            {announcements.map((n) => (
              <li key={n.id} className="py-3 flex items-start gap-3">
                <span
                  className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.unread ? "bg-brand" : "bg-transparent"}`}
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink">{n.title}</p>
                  <p className="text-xs text-muted mt-0.5">
                    {n.kind}　/　{n.date}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* メディア */}
      <Card className="p-6">
        <CardTitle
          icon={Newspaper}
          action={
            <Link href="/media" className="text-sm font-bold text-brand">
              記事一覧
            </Link>
          }
        >
          開催情報・メディア
        </CardTitle>
        <div className="grid gap-4 sm:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <Link
              key={a.id}
              href={`/media/${a.id}`}
              className="group rounded-xl border border-line overflow-hidden hover:shadow-md transition"
            >
              <SpotThumb icon={a.icon} color={a.color} className="h-24" size={32} />
              <div className="p-4">
                <p className="text-xs font-bold text-brand">{a.category}</p>
                <p className="text-sm font-bold text-ink mt-1 leading-snug group-hover:text-brand">
                  {a.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

function TodoRow({
  icon: Icon,
  title,
  sub,
  href,
  cta,
}: {
  icon: typeof CreditCard;
  title: string;
  sub: string;
  href: string;
  cta: string;
}) {
  return (
    <li className="py-3.5 flex items-center gap-4">
      <span className="w-10 h-10 rounded-xl bg-blue-50 text-brand flex items-center justify-center shrink-0">
        <Icon size={18} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-ink">{title}</p>
        <p className="text-xs text-muted mt-0.5">{sub}</p>
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-sm font-bold text-brand whitespace-nowrap"
      >
        {cta}
        <ArrowRight size={14} />
      </Link>
    </li>
  );
}

function MiniBars() {
  const max = Math.max(...monthlySales.map((m) => m.sales));
  return (
    <div className="flex items-end gap-3 h-40">
      {monthlySales.map((m, i) => (
        <div key={m.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
          <div
            className={`w-full max-w-10 rounded-t ${i === monthlySales.length - 1 ? "bg-brand" : "bg-blue-200"}`}
            style={{ height: `${(m.sales / max) * 100}%` }}
            title={`${m.label} ${yen(m.sales)}`}
          />
          <span className="text-xs text-muted">{m.label}</span>
        </div>
      ))}
    </div>
  );
}
