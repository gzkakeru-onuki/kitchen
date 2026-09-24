"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarCheck,
  ChartColumn,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Newspaper,
  Search,
  Settings,
  Truck,
  Users,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { announcements, businessProfile, unreadChatCount } from "@/lib/mock";

type NavItem = { href: string; label: string; icon: LucideIcon; badge?: number };

const unreadNotices = announcements.filter((a) => a.unread).length;

const groups: { label: string; items: NavItem[] }[] = [
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
  const pathname = usePathname();
  const [drawer, setDrawer] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const nav = (
    <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
      {groups.map((g) => (
        <div key={g.label || "root"}>
          {g.label && (
            <p className="px-3 mb-1.5 text-[11px] font-bold tracking-wider text-[#7F93A7]">
              {g.label}
            </p>
          )}
          <ul className="space-y-0.5">
            {g.items.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setDrawer(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition ${
                      active
                        ? "bg-brand text-white"
                        : "text-[#C4D2DF] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={18} strokeWidth={2} />
                    <span className="flex-1 whitespace-nowrap">{item.label}</span>
                    {!!item.badge && (
                      <span
                        className={`min-w-5 h-5 px-1.5 rounded-full text-[11px] flex items-center justify-center ${
                          active ? "bg-white text-brand" : "bg-brandsoft text-navy"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  const sidebar = (
    <div className="flex h-full flex-col bg-navy text-white">
      <div className="h-16 px-5 flex items-center justify-between border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
            <Truck size={18} />
          </span>
          <span className="font-display font-black text-lg">KitchenBase</span>
        </Link>
        <button
          className="lg:hidden p-2 -mr-2 text-[#C4D2DF]"
          onClick={() => setDrawer(false)}
          aria-label="メニューを閉じる"
        >
          <X size={20} />
        </button>
      </div>
      {nav}
      <div className="border-t border-white/10 p-3">
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-[#C4D2DF] hover:bg-white/10 hover:text-white"
        >
          <LogOut size={18} />
          ログアウト
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-paper">
      {/* デスクトップ：固定サイドバー */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-[280px] z-30">{sidebar}</aside>

      {/* モバイル：ドロワー */}
      {drawer && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <aside className="absolute inset-y-0 left-0 w-[280px]">{sidebar}</aside>
        </div>
      )}

      <div className="lg:pl-[280px]">
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-line">
          <div className="h-full px-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                className="lg:hidden p-2 -ml-2 text-ink"
                onClick={() => setDrawer(true)}
                aria-label="メニューを開く"
              >
                <Menu size={22} />
              </button>
              <span className="lg:hidden font-display font-black text-navy">KitchenBase</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/community"
                className="relative p-2 rounded-lg text-muted hover:bg-paper hover:text-ink"
                aria-label="お知らせ"
              >
                <Bell size={20} />
                {unreadNotices > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
                )}
              </Link>
              <Link href="/account" className="flex items-center gap-3">
                <div className="hidden sm:block text-right leading-tight">
                  <p className="text-sm font-bold text-ink">{businessProfile.name}</p>
                  <p className="text-xs text-muted">{businessProfile.genre}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-bold">
                  {businessProfile.name.slice(0, 1)}
                </div>
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-5 py-8">{children}</main>
      </div>
    </div>
  );
}
