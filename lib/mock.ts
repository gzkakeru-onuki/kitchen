// モックアップ用のダミーデータ（バックエンド接続なし）

export type ApplicationStatus =
  | "reviewing" // 審査中
  | "approved" // 承認（決済待ち）
  | "reserved" // 予約確定（決済済み）
  | "rejected"; // 見送り

export type Spot = {
  id: string;
  name: string;
  area: string;
  genre: string;
  date: string;
  fee: number;
  capacity: number;
  applied: number;
  emoji: string;
  color: string;
  description: string;
  highlights: string[];
};

export const spots: Spot[] = [
  {
    id: "shibuya-park",
    name: "渋谷リバーサイド広場",
    area: "東京・渋谷",
    genre: "オフィス街",
    date: "2026-10-12（土）",
    fee: 15000,
    capacity: 6,
    applied: 4,
    emoji: "🏙️",
    color: "#2563EB",
    description:
      "平日ランチと週末イベントで賑わう再開発エリアの中央広場。オフィスワーカーとファミリー層が中心で、ランチ・スイーツ系のキッチンカーと相性が良い立地です。",
    highlights: ["想定来場 3,000名/日", "電源あり（1kVA）", "給排水なし"],
  },
  {
    id: "yokohama-bay",
    name: "みなとみらい海沿いイベント区画",
    area: "神奈川・横浜",
    genre: "観光・海沿い",
    date: "2026-10-18（土）〜19（日）",
    fee: 28000,
    capacity: 10,
    applied: 7,
    emoji: "⚓",
    color: "#0EA5A4",
    description:
      "観光客と地元ファミリーが集まる海沿いのイベント区画。2日間開催で回遊性が高く、ドリンク・軽食からがっつり系まで幅広く出店実績があります。",
    highlights: ["2日間開催", "電源あり（2kVA）", "テント設営可"],
  },
  {
    id: "saitama-mall",
    name: "大宮ショッピングモール 屋外区画",
    area: "埼玉・大宮",
    genre: "商業施設",
    date: "2026-10-25（土）",
    fee: 12000,
    capacity: 4,
    applied: 1,
    emoji: "🛍️",
    color: "#7C3AED",
    description:
      "駅直結モールの屋外催事スペース。買い物帰りのファミリー層が多く、スイーツ・ドリンク系の回転が見込めます。搬入動線が整備され初出店でも安心です。",
    highlights: ["想定来場 5,000名/日", "電源あり（1.5kVA）", "屋根あり区画"],
  },
  {
    id: "chiba-festival",
    name: "幕張ビーチフェス 出店エリア",
    area: "千葉・幕張",
    genre: "フェス・音楽",
    date: "2026-11-01（土）",
    fee: 35000,
    capacity: 12,
    applied: 9,
    emoji: "🎪",
    color: "#F59E0B",
    description:
      "音楽フェス併設の大型出店エリア。若年層中心で客単価が高く、映える・シェアされるメニューが強い会場です。集客力は随一。",
    highlights: ["想定来場 8,000名", "電源あり（3kVA）", "前日搬入可"],
  },
  {
    id: "meguro-street",
    name: "中目黒 さくらストリート",
    area: "東京・目黒",
    genre: "商店街",
    date: "2026-11-08（土）",
    fee: 18000,
    capacity: 5,
    applied: 3,
    emoji: "🌸",
    color: "#EC4899",
    description:
      "感度の高い層が集まる人気エリアの週末マルシェ。こだわり食材・クラフト系のメニューと好相性。SNS発信力のある出店者を歓迎しています。",
    highlights: ["想定来場 2,000名/日", "電源あり（1kVA）", "給排水なし"],
  },
  {
    id: "kawasaki-plant",
    name: "川崎ものづくり広場",
    area: "神奈川・川崎",
    genre: "オフィス街",
    date: "2026-11-15（土）",
    fee: 10000,
    capacity: 6,
    applied: 0,
    emoji: "🏭",
    color: "#0891B2",
    description:
      "工場・オフィスが集まるエリアの昼どき出店。ボリューム系ランチの需要が高く、リピーターがつきやすい穴場スポットです。",
    highlights: ["想定来場 1,500名/日", "電源あり（2kVA）", "駐車スペース広め"],
  },
];

export function getSpot(id: string): Spot | undefined {
  return spots.find((s) => s.id === id);
}

export type Application = {
  id: string;
  spotName: string;
  area: string;
  date: string;
  fee: number;
  status: ApplicationStatus;
  appliedAt: string;
};

export const applications: Application[] = [
  {
    id: "a1",
    spotName: "みなとみらい海沿いイベント区画",
    area: "神奈川・横浜",
    date: "2026-10-18（土）〜19（日）",
    fee: 28000,
    status: "approved",
    appliedAt: "2026-09-20",
  },
  {
    id: "a2",
    spotName: "渋谷リバーサイド広場",
    area: "東京・渋谷",
    date: "2026-10-12（土）",
    fee: 15000,
    status: "reserved",
    appliedAt: "2026-09-14",
  },
  {
    id: "a3",
    spotName: "幕張ビーチフェス 出店エリア",
    area: "千葉・幕張",
    date: "2026-11-01（土）",
    fee: 35000,
    status: "reviewing",
    appliedAt: "2026-09-22",
  },
  {
    id: "a4",
    spotName: "大宮ショッピングモール 屋外区画",
    area: "埼玉・大宮",
    date: "2026-08-30（土）",
    fee: 12000,
    status: "rejected",
    appliedAt: "2026-08-10",
  },
];

export const statusMeta: Record<
  ApplicationStatus,
  { label: string; bg: string; fg: string }
> = {
  reviewing: { label: "審査中", bg: "#FEF3C7", fg: "#92660A" },
  approved: { label: "承認・決済待ち", bg: "#DBEAFE", fg: "#1D4ED8" },
  reserved: { label: "予約確定", bg: "#D1FAE5", fg: "#0F8A6B" },
  rejected: { label: "今回は見送り", bg: "#F1F5F9", fg: "#64748B" },
};

export type ChatThread = {
  id: string;
  title: string;
  subtitle: string;
  messages: { from: "me" | "ops"; text: string; time: string }[];
};

export const chatThreads: ChatThread[] = [
  {
    id: "t1",
    title: "運営事務局",
    subtitle: "みなとみらい海沿いイベント区画",
    messages: [
      { from: "ops", text: "この度はご応募ありがとうございます。出店を承認いたしました。決済のお手続きをお願いします。", time: "9/21 10:20" },
      { from: "me", text: "ありがとうございます！電源は2kVAとのことですが、延長ケーブルの持参は必要でしょうか？", time: "9/21 10:32" },
      { from: "ops", text: "はい、20m程度のケーブルをご持参ください。区画は入口から3番目になります。", time: "9/21 10:40" },
    ],
  },
  {
    id: "t2",
    title: "運営事務局",
    subtitle: "幕張ビーチフェス 出店エリア",
    messages: [
      { from: "ops", text: "ご応募を受け付けました。現在審査中です。結果は9/28頃までにご連絡します。", time: "9/22 15:05" },
      { from: "me", text: "承知しました。よろしくお願いいたします。", time: "9/22 15:12" },
    ],
  },
  {
    id: "t3",
    title: "運営事務局",
    subtitle: "渋谷リバーサイド広場",
    messages: [
      { from: "ops", text: "当日はお疲れさまでした！次回開催もぜひご検討ください。", time: "9/15 18:00" },
    ],
  },
];

export const currentUser = {
  name: "山田キッチン",
  owner: "山田 太郎",
  genre: "クレープ・スイーツ",
};

export function yen(n: number): string {
  return "¥" + n.toLocaleString("ja-JP");
}
