"use client";

import { useState } from "react";
import { Bookmark, Heart, Link2, Share2 } from "lucide-react";

export default function ShareBar() {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const base =
    "inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-bold transition";

  return (
    <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-2">
      <button
        onClick={() => setLiked(!liked)}
        className={`${base} ${liked ? "border-pink-200 bg-pink-50 text-pink-600" : "border-line text-muted"}`}
      >
        <Heart size={16} className={liked ? "fill-current" : ""} />
        参考になった
      </button>
      <button
        onClick={() => setSaved(!saved)}
        className={`${base} ${saved ? "border-brand bg-blue-50 text-brand" : "border-line text-muted"}`}
      >
        <Bookmark size={16} className={saved ? "fill-current" : ""} />
        保存
      </button>
      <button className={`${base} border-line text-muted`}>
        <Share2 size={16} />
        SNSでシェア
      </button>
      <button className={`${base} border-line text-muted`}>
        <Link2 size={16} />
        リンクをコピー
      </button>
    </div>
  );
}
