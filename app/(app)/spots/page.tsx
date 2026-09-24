"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bookmark, CalendarDays, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { spots, yen } from "@/lib/mock";
import { SpotThumb } from "@/components/SpotIcon";
import { PageHeader } from "@/components/ui";

const areas = ["すべて", "東京・渋谷", "東京・目黒", "神奈川・横浜", "神奈川・川崎", "埼玉・大宮", "千葉・幕張"];
const genres = ["すべて", "オフィス街", "観光・海沿い", "商業施設", "フェス・音楽", "商店街"];

export default function SpotsPage() {
  const [keyword, setKeyword] = useState("");
  const [area, setArea] = useState("すべて");
  const [genre, setGenre] = useState("すべて");
  const [openOnly, setOpenOnly] = useState(false);
  const [saved, setSaved] = useState<string[]>(["yokohama-bay"]);

  function toggleSave(id: string) {
    setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const filtered = useMemo(() => {
    return spots.filter((s) => {
      const kw =
        keyword.trim() === "" ||
        s.name.includes(keyword) ||
        s.area.includes(keyword) ||
        s.genre.includes(keyword);
      const a = area === "すべて" || s.area === area;
      const g = genre === "すべて" || s.genre === genre;
      const o = !openOnly || s.applied < s.capacity;
      return kw && a && g && o;
    });
  }, [keyword, area, genre, openOnly]);

  return (
    <div>
      <PageHeader
        title="出店場所を探す"
        description="出店したい場所を検索し、応募（エントリー）できます。"
      />

      {/* 検索・絞り込み */}
      <div className="bg-white rounded-2xl border border-line p-5 mb-6">
        <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
          <div>
            <label className="block text-xs font-bold text-muted mb-1.5">
              キーワード
            </label>
            <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="エリア名・場所名で検索"
              className="w-full rounded-xl border border-line pl-10 pr-4 py-2.5 focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            </div>
          </div>
          <Select label="エリア" value={area} onChange={setArea} options={areas} />
          <Select label="ジャンル" value={genre} onChange={setGenre} options={genres} />
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-line text-sm">
          <span className="inline-flex items-center gap-1.5 font-bold text-muted">
            <SlidersHorizontal size={16} />
            条件
          </span>
          <label className="inline-flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={openOnly}
              onChange={(e) => setOpenOnly(e.target.checked)}
              className="w-4 h-4 accent-brand"
            />
            受付中のみ表示
          </label>
          <span className="inline-flex items-center gap-1.5 text-muted">
            <Bookmark size={16} />
            保存済み {saved.length} 件
          </span>
        </div>
      </div>

      <p className="text-sm text-muted mb-4">
        <span className="font-bold text-ink">{filtered.length}</span> 件の出店場所
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => (
          <Link
            key={s.id}
            href={`/spots/${s.id}`}
            className="group relative bg-white rounded-2xl border border-line overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            <SpotThumb icon={s.icon} color={s.color} />
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleSave(s.id);
              }}
              aria-label="保存"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-muted hover:text-brand"
            >
              <Bookmark
                size={18}
                className={saved.includes(s.id) ? "fill-brand text-brand" : ""}
              />
            </button>
            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-brand bg-blue-50 px-2.5 py-1 rounded-full">
                  {s.genre}
                </span>
                {s.applied >= s.capacity ? (
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    受付終了
                  </span>
                ) : (
                  <span className="text-xs font-bold text-teal bg-[#E0F5F4] px-2.5 py-1 rounded-full">
                    受付中
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-lg text-ink leading-snug group-hover:text-brand transition">
                {s.name}
              </h3>
              <div className="text-sm text-muted mt-2 space-y-1">
                <p className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {s.area}
                </p>
                <p className="flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  {s.date}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
                <div>
                  <p className="text-xs text-muted">出店料</p>
                  <p className="font-bold text-ink">{yen(s.fee)}</p>
                </div>
                <p className="text-xs text-muted">
                  残り {Math.max(s.capacity - s.applied, 0)} 区画
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted">
          条件に合う出店場所が見つかりませんでした。
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="md:w-44">
      <label className="block text-xs font-bold text-muted mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line px-4 py-2.5 bg-white focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
