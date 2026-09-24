import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpot, spots, yen } from "@/lib/mock";
import ApplyButton from "./ApplyButton";

export function generateStaticParams() {
  return spots.map((s) => ({ id: s.id }));
}

export default function SpotDetailPage({ params }: { params: { id: string } }) {
  const spot = getSpot(params.id);
  if (!spot) notFound();

  const remaining = Math.max(spot.capacity - spot.applied, 0);
  const closed = remaining === 0;

  return (
    <div>
      <Link
        href="/spots"
        className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink mb-5"
      >
        ← 出店場所一覧へ戻る
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* 左：詳細 */}
        <div className="space-y-6">
          <div
            className="h-52 rounded-2xl flex items-center justify-center text-7xl"
            style={{ background: `${spot.color}18` }}
          >
            {spot.emoji}
          </div>

          <div>
            <span className="text-xs font-bold text-brand bg-blue-50 px-2.5 py-1 rounded-full">
              {spot.genre}
            </span>
            <h1 className="font-display font-black text-2xl md:text-3xl text-ink mt-3">
              {spot.name}
            </h1>
            <p className="text-muted mt-1">
              {spot.area}　/　{spot.date}
            </p>
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
                  className="bg-paper rounded-xl px-4 py-3 text-sm font-bold text-ink"
                >
                  {h}
                </div>
              ))}
            </div>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
