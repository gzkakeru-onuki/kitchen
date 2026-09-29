"use client";

import {
  ChartColumn,
  ClipboardCheck,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  Newspaper,
  MapPinned,
  Store,
  Wallet,
} from "lucide-react";
import Shell from "@/components/Shell";
import type { NavGroup } from "@/components/Shell";
import { adminInvoices, adminUser, inquiries, reportedPosts, reviews, vendors } from "@/lib/admin-mock";

const pendingVendors = vendors.filter((v) => v.status === "pending" || v.status === "withdrawing").length;
const pendingReviews = reviews.filter((r) => r.status === "reviewing").length;
const openInquiries = inquiries.filter((q) => q.status === "open").length;
const overdue = adminInvoices.filter((i) => i.status === "overdue").length;

const groups: NavGroup[] = [
  {
    label: "",
    items: [{ href: "/admin", label: "管理ダッシュボード", icon: LayoutDashboard }],
  },
  {
    label: "事業者・出店",
    items: [
      { href: "/admin/vendors", label: "事業者管理", icon: Store, badge: pendingVendors },
      { href: "/admin/listings", label: "出店場所・募集管理", icon: MapPinned },
      { href: "/admin/reviews", label: "応募審査・予約", icon: ClipboardCheck, badge: pendingReviews },
      { href: "/admin/billing", label: "入金・精算管理", icon: Wallet, badge: overdue },
    ],
  },
  {
    label: "コミュニケーション",
    items: [
      { href: "/admin/inquiries", label: "問い合わせ対応", icon: MessageSquare, badge: openInquiries },
      { href: "/admin/media", label: "メディア記事管理", icon: Newspaper },
      { href: "/admin/announcements", label: "お知らせ・コミュニティ", icon: Megaphone, badge: reportedPosts.length },
    ],
  },
  {
    label: "分析",
    items: [{ href: "/admin/reports", label: "売上・手数料レポート", icon: ChartColumn }],
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <Shell
      groups={groups}
      homeHref="/admin"
      bellHref="/admin/inquiries"
      hasUnread={openInquiries > 0}
      consoleLabel="運営管理コンソール"
      user={{ name: adminUser.name, sub: adminUser.role, href: "/admin" }}
      logoutHref="/admin/login"
    >
      {children}
    </Shell>
  );
}
