"use client";

import {
  CalendarCheck,
  ChartColumn,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  Search,
  Settings,
  Users,
} from "lucide-react";
import Shell from "@/components/Shell";
import type { NavGroup } from "@/components/Shell";
import { announcements, businessProfile, unreadChatCount } from "@/lib/mock";

const unreadNotices = announcements.filter((a) => a.unread).length;

const groups: NavGroup[] = [
  {
    label: "",
    items: [{ href: "/dashboard", label: "ホーム", icon: LayoutDashboard }],
  },
  {
    label: "出店",
    items: [
      { href: "/spots", label: "出店場所を探す", icon: Search },
      { href: "/entries", label: "応募・予約管理", icon: CalendarCheck },
      { href: "/payments", label: "決済・請求", icon: CreditCard },
    ],
  },
  {
    label: "経営",
    items: [{ href: "/sales", label: "売上ダッシュボード", icon: ChartColumn }],
  },
  {
    label: "コミュニケーション",
    items: [
      { href: "/chat", label: "運営チャット", icon: MessageSquare, badge: unreadChatCount },
      { href: "/media", label: "開催情報・メディア", icon: Newspaper },
      { href: "/community", label: "お知らせ・コミュニティ", icon: Users, badge: unreadNotices },
    ],
  },
  {
    label: "設定",
    items: [{ href: "/account", label: "事業者情報・アカウント", icon: Settings }],
  },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Shell
      groups={groups}
      homeHref="/dashboard"
      bellHref="/community"
      hasUnread={unreadNotices > 0}
      user={{ name: businessProfile.name, sub: businessProfile.genre, href: "/account" }}
    >
      {children}
    </Shell>
  );
}
