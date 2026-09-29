import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
  Flag,
  MapPinned,
  MessageSquare,
  Store,
  TrendingUp,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  adminInvoices,
  inquiries,
  inquiryStatusMeta,
  listings,
  platformMonthly,
  reportedPosts,
  reviews,
  vendors,
} from "@/lib/admin-mock";
import { yen } from "@/lib/mock";
import { Card, CardTitle, PageHeader, Pill, Stat } from "@/components/ui";

export default function AdminDashboardPage() {
  const pendingVendors = vendors.filter((v) => v.status === "pending");
  const withdrawing = vendors.filter((v) => v.status === "withdrawing");
  const pendingReviews = reviews.filter((r) => r.status === "reviewing");
  const openInquiries = inquiries.filter((q) => q.status !== "closed");
  const overdue = adminInvoices.filter((i) => i.status === "overdue");
  const unpaidTotal = adminInvoices
    .filter((i) => i.status === "unpaid" || i.status === "overdue")
    .reduce((s, i) => s + i.amount, 0);
  const thisMonth = platformMonthly[platformMonthly.length - 1];
  const activeVendors = vendors.filter((v) => v.status === "active").length;
  const openListings = listings.filter((l) => l.status === "open");

  return (
    <div className="space-y-6">
      <PageHeader title="管理ダッシュボード" description="審査・問い合わせ・入金など、運営が対応すべき項目と全体の状況です。" />

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Stat icon={TrendingUp} label="今月の流通額" value={yen(thisMonth.gmv)} sub={`手数料収入 ${yen(thisMonth.feeRevenue)}`} accent />
        <Stat icon={Store} label="利用中の事業者" value={`${activeVendors} 社`} sub={`登録審査待ち ${pendingVendors.length} 社`} />
        <Stat icon={MapPinned} label="募集中の出店場所" value={`${openListings.length} 件`} sub={`応募審査待ち ${pendingReviews.length} 件`} />
        <Stat icon={Wallet} label="未入金" value={yen(unpaidTotal)} sub={`うち期限超過 ${overdue.length} 件`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card className="p-6">
          <CardTitle icon={AlertTriangle}>要対応タスク</CardTitle>
          <ul className="divide-y divide-line">
            <Task icon={Store} title="事業者の登録審査" count={pendingVendors.length} sub={pendingVendors.map((v) => v.name).join("、")} href="/admin/vendors" />
            <Task icon={ClipboardCheck} title="出店応募の審査" count={pendingReviews.length} sub="幕張ビーチフェス・中目黒ほか" href="/admin/reviews" />
            <Task icon={MessageSquare} title="未対応の問い合わせ" count={inquiries.filter((q) => q.status === "open").length} sub="決済・アカウントに関する問い合わせ" href="/admin/inquiries" />
            <Task icon={Wallet} title="入金期限を超過した請求" count={overdue.length} sub={overdue.map((i) => i.vendorName).join("、")} href="/admin/billing" />
            <Task icon={Flag} title="通報されたコミュニティ投稿" count={reportedPosts.length} sub="内容を確認し、非表示・警告を判断" href="/admin/announcements" />
            <Task icon={Store} title="退会申請" count={withdrawing.length} sub={withdrawing.map((v) => v.name).join("、")} href="/admin/vendors" />
          </ul>
        </Card>

        <Card className="p-6">
          <CardTitle
            icon={MessageSquare}
            action={
              <Link href="/admin/inquiries" className="text-sm font-bold text-brand">
                すべて見る
              </Link>
            }
          >
            最新の問い合わせ
          </CardTitle>
          <ul className="space-y-3">
            {openInquiries.map((q) => {
              const st = inquiryStatusMeta[q.status];
              return (
                <li key={q.id} className="rounded-xl bg-paper p-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-muted">{q.vendorName}</span>
                    <Pill bg={st.bg} fg={st.fg}>
                      {st.label}
                    </Pill>
                  </div>
                  <p className="text-sm font-bold text-ink">{q.subject}</p>
                  <p className="text-xs text-muted mt-1 line-clamp-1">{q.messages[q.messages.length - 1].text}</p>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <Card className="p-6">
        <CardTitle
          icon={MapPinned}
          action={
            <Link href="/admin/listings" className="text-sm font-bold text-brand">
              募集管理へ
            </Link>
          }
        >
          募集中の出店場所の充足状況
        </CardTitle>
        <ul className="space-y-4">
          {openListings.map((l) => {
            const pct = Math.min(100, Math.round((l.approved / l.capacity) * 100));
            return (
              <li key={l.id} className="grid sm:grid-cols-[260px_1fr_220px] gap-2 sm:gap-4 sm:items-center">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink truncate">{l.name}</p>
                  <p className="text-xs text-muted">
                    {l.date}　/　締切 {l.deadline}
                  </p>
                </div>
                <div className="h-2 rounded-full bg-paper overflow-hidden">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-muted whitespace-nowrap sm:text-right">
                  確定 <span className="font-bold text-ink">{l.approved}</span> / {l.capacity} 区画　応募 {l.applied}
                </p>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}

function Task({
  icon: Icon,
  title,
  count,
  sub,
  href,
}: {
  icon: LucideIcon;
  title: string;
  count: number;
  sub: string;
  href: string;
}) {
  return (
    <li>
      <Link href={href} className="py-3.5 flex items-center gap-4 group">
        <span className="w-10 h-10 rounded-xl bg-blue-50 text-brand flex items-center justify-center shrink-0">
          <Icon size={18} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-ink group-hover:text-brand">{title}</p>
          <p className="text-xs text-muted mt-0.5 truncate">{sub || "—"}</p>
        </div>
        <span
          className={`min-w-8 h-7 px-2 rounded-full text-sm font-bold flex items-center justify-center ${
            count > 0 ? "bg-navy text-white" : "bg-paper text-muted"
          }`}
        >
          {count}
        </span>
        <ArrowRight size={16} className="text-muted group-hover:text-brand" />
      </Link>
    </li>
  );
}
