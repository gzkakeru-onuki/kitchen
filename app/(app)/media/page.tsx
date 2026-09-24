"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { articles, getSpot } from "@/lib/mock";
import type { Article } from "@/lib/mock";
import { PageHeader } from "@/components/ui";
import { SpotThumb } from "@/components/SpotIcon";

const cats: ("すべて" | Article["category"])[] = ["すべて", "開催レポート", "会場ガイド", "出店ノウハウ", "インタビュー"];

export default function MediaPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("すべて");
  const list = cat === "すべて" ? articles : articles.filter((a) => a.category === cat);
  const [featured, ...rest] = list;

  return (
    <div>
      <PageHeader
        title="開催情報・メディア"
        description="各開催場所のレポートや会場ガイド、出店に役立つノウハウを配信しています。"
      />

      <div className="flex gap-2 overflow-x-auto mb-6">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border transition ${
              cat === c ? "bg-navy text-white border-navy" : "bg-white text-muted border-line hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {featured && (
        <Link
          href={`/media/${featured.id}`}
          className="group grid md:grid-cols-2 bg-white rounded-2xl border border-line overflow-hidden mb-6 hover:shadow-lg transition"
        >
          <SpotThumb icon={featured.icon} color={featured.color} className="h-48 md:h-full min-h-48" size={72} />
          <div className="p-6 md:p-8">
            <p className="text-xs font-bold text-brand">{featured.category}</p>
            <h2 className="font-display font-black text-xl md:text-2xl text-ink mt-2 leading-snug group-hover:text-brand">
              {featured.title}
            </h2>
            <p className="text-muted mt-3 leading-relaxed">{featured.excerpt}</p>
            <Meta a={featured} />
          </div>
        </Link>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((a) => (
          <Link
            key={a.id}
            href={`/media/${a.id}`}
            className="group bg-white rounded-2xl border border-line overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition"
          >
            <SpotThumb icon={a.icon} color={a.color} className="h-32" size={40} />
            <div className="p-5">
              <p className="text-xs font-bold text-brand">{a.category}</p>
              <h3 className="font-display font-bold text-ink mt-1.5 leading-snug group-hover:text-brand">{a.title}</h3>
              <Meta a={a} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Meta({ a }: { a: Article }) {
  const spot = a.spotId ? getSpot(a.spotId) : undefined;
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted mt-4">
      <span>{a.date}</span>
      <span className="flex items-center gap-1">
        <Clock size={12} />
        {a.readMin}分で読める
      </span>
      {spot && (
        <span className="flex items-center gap-1">
          <MapPin size={12} />
          {spot.area}
        </span>
      )}
    </div>
  );
}
