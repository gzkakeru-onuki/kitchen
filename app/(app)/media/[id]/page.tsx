import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft, Clock, MapPin } from "lucide-react";
import { articles, getArticle, getSpot, yen } from "@/lib/mock";
import { SpotThumb } from "@/components/SpotIcon";
import { btn } from "@/components/ui";
import ShareBar from "./ShareBar";

export function generateStaticParams() {
  return articles.map((a) => ({ id: a.id }));
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = getArticle(params.id);
  if (!article) notFound();
  const spot = article.spotId ? getSpot(article.spotId) : undefined;

  return (
    <div className="max-w-3xl">
      <Link
        href="/media"
        className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink mb-5"
      >
        <ChevronLeft size={16} />
        記事一覧へ戻る
      </Link>

      <SpotThumb icon={article.icon} color={article.color} className="h-56 rounded-2xl" size={80} />

      <p className="text-sm font-bold text-brand mt-6">{article.category}</p>
      <h1 className="font-display font-black text-2xl md:text-3xl text-ink mt-2 leading-snug">{article.title}</h1>
      <div className="flex items-center gap-4 text-sm text-muted mt-3">
        <span>{article.date}</span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {article.readMin}分
        </span>
      </div>

      <div className="mt-8 space-y-5 text-ink leading-loose">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <ShareBar />

      {spot && (
        <div className="mt-8 bg-white rounded-2xl border border-line p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <SpotThumb icon={spot.icon} color={spot.color} className="w-full sm:w-24 h-20 rounded-xl" size={32} />
          <div className="flex-1">
            <p className="text-xs font-bold text-muted">この記事の会場</p>
            <p className="font-bold text-ink">{spot.name}</p>
            <p className="flex items-center gap-1 text-sm text-muted">
              <MapPin size={14} />
              {spot.area}　/　次回 {spot.date}　/　{yen(spot.fee)}
            </p>
          </div>
          <Link href={`/spots/${spot.id}`} className={btn.primary}>
            出店を検討する
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
