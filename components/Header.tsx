"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentUser } from "@/lib/mock";

const nav = [
  { href: "/spots", label: "出店場所を探す" },
  { href: "/mypage", label: "マイページ" },
  { href: "/chat", label: "チャット" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-line">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/spots" className="flex items-center gap-2">
            <span className="text-xl">🚚</span>
            <span className="font-display font-black text-lg text-navy">
              KitchenBase
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                    active
                      ? "bg-blue-50 text-brand"
                      : "text-muted hover:text-ink hover:bg-paper"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right leading-tight">
            <p className="text-sm font-bold text-ink">{currentUser.name}</p>
            <p className="text-xs text-muted">{currentUser.genre}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-bold">
            {currentUser.name.slice(0, 1)}
          </div>
        </div>
      </div>

      {/* モバイル用ナビ */}
      <nav className="md:hidden flex items-center gap-1 px-5 pb-3 overflow-x-auto">
        {nav.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-bold ${
                active ? "bg-blue-50 text-brand" : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
