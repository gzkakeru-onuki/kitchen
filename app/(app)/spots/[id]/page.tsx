import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  ChevronLeft,
  Info,
  MapPin,
  MessageSquare,
  Newspaper,
  Users,
} from "lucide-react";
import { articles, getSpot, spots, yen } from "@/lib/mock";
import { SpotThumb } from "@/components/SpotIcon";
import ApplyButton from "./ApplyButton";

export function generateStaticParams() {
  return spots.map((s) => ({ id: s.id }));
}

export default function SpotDetailPage({ params }: { params: { id: string } }) {
  const spot = getSpot(params.id);
  if (!spot) notFound();

  const remaining = Math.max(spot.capacity - spot.applied, 0);
  const closed = remaining === 0;
  const related = articles.filter((a) => a.spotId === spot.id);

  return (
    <div>
      <Link
        href="/spots"
        className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink mb-5"
      >
        <ChevronLeft size={16} />
        出店場所一覧へ戻る
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* 左：詳細 */}
        <div className="space-y-6">
          <SpotThumb
            icon={spot.icon}
            color={spot.color}
            className="h-52 rounded-2xl"
            size={72}
          />

          <div>
            <span className="text-xs font-bold text-brand bg-blue-50 px-2.5 py-1 rounded-full">
              {spot.genre}
            </span>
            <h1 className="font-display font-black text-2xl md:text-3xl text-ink mt-3">
              {spot.name}
            </h1>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-muted mt-2">
              <span className="flex items-center gap-1.5">
                <MapPin size={16} />
                {spot.area}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays size={16} />
                {spot.date}
              </span>
            </div>
          </div>

          <p className="text-ink leading-relaxed">{spot.description}</p>

          <div className="bg-white rounded-2xl border border-line p-5">
            <h2 className="font-display font-bold text-lg text-ink mb-3">
              出店場所の情報
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {spot.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-2 bg-paper rounded-xl px-4 py-3 text-sm font-bold text-ink"
                >
                  <Info size={16} className="text-brand shrink-0" />
                  {h}
                </div>
              ))}
            </div>
          </div>

          {related.length > 0 && (
            <div className="bg-white rounded-2xl border border-line p-5">
              <h2 className="flex items-center gap-2 font-display font-bold text-lg text-ink mb-3">
                <Newspaper size={18} className="text-brand" />
                この会場の記事
              </h2>
              <ul className="divide-y divide-line">
                {related.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/media/${a.id}`}
                      className="block py-3 hover:text-brand"
                    >
                      <p className="text-xs font-bold text-brand">{a.category}</p>
                      <p className="font-bold text-sm mt-0.5">{a.title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 右：応募カード */}
        <div>
          <div className="bg-white rounded-2xl border border-line p-6 lg:sticky lg:top-24">
            <div className="flex items-baseline justify-between mb-4">
              <span className="text-muted text-sm">出店料</span>
              <span className="font-display font-black text-2xl text-ink">
                {yen(spot.fee)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted">募集区画</span>
              <span className="font-bold text-ink">{spot.capacity} 区画</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted flex items-center gap-1">
                <Users size={14} />
                応募数
              </span>
              <span className="font-bold text-ink">{spot.applied} 件</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-5">
              <span className="text-muted">残り</span>
              <span className={`font-bold ${closed ? "text-slate-400" : "text-teal"}`}>
                {closed ? "受付終了" : `${remaining} 区画`}
              </span>
            </div>

            <ApplyButton spotName={spot.name} closed={closed} />

            <p className="text-xs text-muted mt-3 leading-relaxed">
              応募後、運営事務局の審査を経て出店可否をご連絡します。承認後にオンライン決済で予約が確定します。
            </p>
            <Link
              href="/chat"
              className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-brand"
            >
              <MessageSquare size={16} />
              出店前に運営へ質問する
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
