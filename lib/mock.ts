// モックアップ用のダミーデータ（バックエンド接続なし）

export type ApplicationStatus =
  | "reviewing" // 審査中
  | "approved" // 承認（決済待ち）
  | "reserved" // 予約確定（決済済み）
  | "rejected"; // 見送り

export type SpotIcon = "building" | "anchor" | "shopping" | "tent" | "flower" | "factory";

export type Spot = {
  id: string;
  name: string;
  area: string;
  genre: string;
  date: string;
  fee: number;
  capacity: number;
  applied: number;
  icon: SpotIcon;
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
    icon: "building",
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
    icon: "anchor",
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
    icon: "shopping",
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
    icon: "tent",
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
    icon: "flower",
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
    icon: "factory",
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
  spotId: string;
  spotName: string;
  area: string;
  date: string;
  fee: number;
  status: ApplicationStatus;
  appliedAt: string;
  booth?: string; // 区画番号（承認後に確定）
  loadIn?: string; // 搬入時間
  payDeadline?: string; // 決済期限
  cancelDeadline?: string; // 無料キャンセル期限
};

export const applications: Application[] = [
  {
    id: "a1",
    spotId: "yokohama-bay",
    spotName: "みなとみらい海沿いイベント区画",
    area: "神奈川・横浜",
    date: "2026-10-18（土）〜19（日）",
    fee: 28000,
    status: "approved",
    appliedAt: "2026-09-20",
    booth: "B-03",
    loadIn: "8:00〜9:30",
    payDeadline: "2026-10-04",
    cancelDeadline: "2026-10-11",
  },
  {
    id: "a2",
    spotId: "shibuya-park",
    spotName: "渋谷リバーサイド広場",
    area: "東京・渋谷",
    date: "2026-10-12（土）",
    fee: 15000,
    status: "reserved",
    appliedAt: "2026-09-14",
    booth: "A-02",
    loadIn: "9:00〜10:00",
    cancelDeadline: "2026-10-05",
  },
  {
    id: "a3",
    spotId: "chiba-festival",
    spotName: "幕張ビーチフェス 出店エリア",
    area: "千葉・幕張",
    date: "2026-11-01（土）",
    fee: 35000,
    status: "reviewing",
    appliedAt: "2026-09-22",
  },
  {
    id: "a4",
    spotId: "saitama-mall",
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

export function yen(n: number): string {
  return "¥" + n.toLocaleString("ja-JP");
}

// ---------------------------------------------------------------
// 事業者アカウント（登録情報・管理）
// ---------------------------------------------------------------

export const businessProfile = {
  name: "山田キッチン",
  owner: "山田 太郎",
  email: "owner@yamada-kitchen.example",
  phone: "090-1234-5678",
  genre: "クレープ・スイーツ",
  address: "東京都世田谷区〇〇 1-2-3",
  invoiceNo: "T1234567890123",
  since: "2025-04-01",
  plan: "スタンダード",
  vehicle: {
    type: "軽トラック（移動販売車）",
    plate: "世田谷 480 あ 12-34",
    size: "全長 3.4m × 幅 1.5m × 高さ 2.5m",
    power: "発電機あり（1.6kVA）",
  },
  menu: ["いちごカスタードクレープ", "チョコバナナクレープ", "ツナチーズクレープ", "アイスカフェラテ"],
};

export type Permit = {
  id: string;
  name: string;
  issuer: string;
  expires: string;
  status: "valid" | "expiring" | "missing";
};

export const permits: Permit[] = [
  { id: "p1", name: "飲食店営業許可証", issuer: "世田谷保健所", expires: "2028-03-31", status: "valid" },
  { id: "p2", name: "食品衛生責任者証", issuer: "東京都食品衛生協会", expires: "無期限", status: "valid" },
  { id: "p3", name: "PL保険 加入証明", issuer: "〇〇損害保険", expires: "2026-10-31", status: "expiring" },
  { id: "p4", name: "神奈川県 営業許可証", issuer: "横浜市保健所", expires: "—", status: "missing" },
];

export const members = [
  { id: "m1", name: "山田 太郎", role: "オーナー", email: "owner@yamada-kitchen.example" },
  { id: "m2", name: "佐藤 花子", role: "スタッフ", email: "hanako@yamada-kitchen.example" },
];

// ---------------------------------------------------------------
// 決済・請求
// ---------------------------------------------------------------

export type Invoice = {
  id: string;
  spotName: string;
  date: string;
  amount: number; // 税込・システム利用料込
  status: "unpaid" | "paid" | "refunded";
  paidAt?: string;
  method?: string;
};

export const invoices: Invoice[] = [
  { id: "INV-2026-0918", spotName: "みなとみらい海沿いイベント区画", date: "2026-10-18", amount: 30800, status: "unpaid" },
  { id: "INV-2026-0911", spotName: "渋谷リバーサイド広場", date: "2026-10-12", amount: 16500, status: "paid", paidAt: "2026-09-15", method: "クレジットカード" },
  { id: "INV-2026-0822", spotName: "中目黒 さくらストリート", date: "2026-09-06", amount: 19800, status: "paid", paidAt: "2026-08-24", method: "クレジットカード" },
  { id: "INV-2026-0805", spotName: "川崎ものづくり広場", date: "2026-08-23", amount: 11000, status: "paid", paidAt: "2026-08-06", method: "銀行振込" },
  { id: "INV-2026-0719", spotName: "幕張ビーチフェス 出店エリア", date: "2026-08-02", amount: 38500, status: "refunded", paidAt: "2026-07-20", method: "クレジットカード" },
];

export const paymentMethods = [
  { id: "pm1", label: "VISA •••• 4242", sub: "有効期限 08/28", default: true },
  { id: "pm2", label: "銀行振込（請求書払い）", sub: "三井住友銀行 渋谷支店", default: false },
];

// ---------------------------------------------------------------
// 売上
// ---------------------------------------------------------------

export const monthlySales = [
  { month: "2026-04", label: "4月", sales: 382000, events: 5 },
  { month: "2026-05", label: "5月", sales: 514000, events: 7 },
  { month: "2026-06", label: "6月", sales: 298000, events: 4 },
  { month: "2026-07", label: "7月", sales: 621000, events: 8 },
  { month: "2026-08", label: "8月", sales: 705000, events: 9 },
  { month: "2026-09", label: "9月", sales: 468000, events: 6 },
];

export type SalesRecord = {
  id: string;
  date: string;
  spotName: string;
  sales: number;
  customers: number;
  fee: number; // 出店料（経費）
};

export const salesRecords: SalesRecord[] = [
  { id: "s1", date: "2026-09-20", spotName: "渋谷リバーサイド広場", sales: 96400, customers: 142, fee: 16500 },
  { id: "s2", date: "2026-09-14", spotName: "みなとみらい海沿いイベント区画", sales: 128000, customers: 181, fee: 30800 },
  { id: "s3", date: "2026-09-13", spotName: "みなとみらい海沿いイベント区画", sales: 104500, customers: 150, fee: 0 },
  { id: "s4", date: "2026-09-06", spotName: "中目黒 さくらストリート", sales: 72300, customers: 98, fee: 19800 },
  { id: "s5", date: "2026-09-03", spotName: "川崎ものづくり広場", sales: 38800, customers: 71, fee: 11000 },
  { id: "s6", date: "2026-09-01", spotName: "大宮ショッピングモール 屋外区画", sales: 28000, customers: 46, fee: 13200 },
];

// ---------------------------------------------------------------
// メディア（開催場所の情報配信）
// ---------------------------------------------------------------

export type Article = {
  id: string;
  category: "開催レポート" | "会場ガイド" | "出店ノウハウ" | "インタビュー";
  title: string;
  excerpt: string;
  spotId?: string;
  date: string;
  readMin: number;
  icon: SpotIcon;
  color: string;
  body: string[];
};

export const articles: Article[] = [
  {
    id: "yokohama-report",
    category: "開催レポート",
    title: "みなとみらい秋フェス出店レポート：2日間で来場1.2万人",
    excerpt: "海風の強い会場でテントをどう設営したか、売れ筋メニューの傾向など、出店者3組の声をまとめました。",
    spotId: "yokohama-bay",
    date: "2026-09-21",
    readMin: 6,
    icon: "anchor",
    color: "#0EA5A4",
    body: [
      "9月13日・14日に開催された「みなとみらい秋フェス」には、2日間で約1.2万人が来場しました。出店したキッチンカーは全10台。",
      "初日は午後から海風が強まり、テントの固定にウェイトを追加した出店者が多く見られました。次回以降は1脚あたり10kg以上のウェイト持参を推奨します。",
      "売れ筋は冷たいドリンクとテイクアウトしやすい軽食。客単価は平均820円で、前回比+12%となりました。",
    ],
  },
  {
    id: "shibuya-guide",
    category: "会場ガイド",
    title: "渋谷リバーサイド広場 会場ガイド：搬入動線と電源位置",
    excerpt: "搬入口から区画までのルート、電源盤の位置、近隣のゴミ集積所など、初出店前に押さえておきたいポイント。",
    spotId: "shibuya-park",
    date: "2026-09-10",
    readMin: 4,
    icon: "building",
    color: "#2563EB",
    body: [
      "搬入は広場北側の車両ゲートから。ゲートの高さ制限は3.0mです。",
      "電源盤は区画A列の奥に2カ所。1区画あたり1kVAまで利用できます。",
      "ゴミは各自持ち帰りが原則ですが、段ボールのみ指定集積所に出すことができます。",
    ],
  },
  {
    id: "rainy-day",
    category: "出店ノウハウ",
    title: "雨の日でも売上を落とさない、5つの工夫",
    excerpt: "屋根付き区画の選び方から、雨の日限定メニューの作り方まで。ベテラン出店者のノウハウを紹介します。",
    date: "2026-09-02",
    readMin: 5,
    icon: "tent",
    color: "#F59E0B",
    body: [
      "雨の日は来場者数が平均3割減りますが、滞在時間が長くなる傾向があります。",
      "温かいドリンクのセット販売や、持ち帰りやすい包装に切り替えることで客単価を上げた事例が多く見られます。",
    ],
  },
  {
    id: "interview-meguro",
    category: "インタビュー",
    title: "中目黒で行列をつくる「さくらベーグル」に聞く、SNS集客のコツ",
    excerpt: "出店前日の告知から当日のストーリー投稿まで。フォロワー1万人の出店者が実践する発信術。",
    spotId: "meguro-street",
    date: "2026-08-25",
    readMin: 7,
    icon: "flower",
    color: "#EC4899",
    body: [
      "出店が決まったらすぐに告知、前日に区画位置を投稿、当日は売り切れ状況をリアルタイムで発信する。この3ステップが基本です。",
    ],
  },
];

export function getArticle(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

// ---------------------------------------------------------------
// お知らせ・コミュニティ
// ---------------------------------------------------------------

export type Announcement = {
  id: string;
  kind: "重要" | "募集" | "システム" | "イベント";
  title: string;
  date: string;
  unread: boolean;
};

export const announcements: Announcement[] = [
  { id: "n1", kind: "重要", title: "10/18 みなとみらい出店の決済期限は10/4（土）です", date: "2026-09-23", unread: true },
  { id: "n2", kind: "募集", title: "11月の新規出店場所を3件追加しました（川崎・幕張ほか）", date: "2026-09-22", unread: true },
  { id: "n3", kind: "イベント", title: "出店者交流会（オンライン）を10/8に開催します", date: "2026-09-18", unread: false },
  { id: "n4", kind: "システム", title: "売上ダッシュボードにCSV出力機能を追加しました", date: "2026-09-10", unread: false },
];

export type Post = {
  id: string;
  author: string;
  genre: string;
  time: string;
  text: string;
  tags: string[];
  likes: number;
  comments: number;
  liked?: boolean;
  image?: { icon: SpotIcon; color: string };
};

export const posts: Post[] = [
  {
    id: "c1",
    author: "さくらベーグル",
    genre: "ベーグル・パン",
    time: "2時間前",
    text: "今週末は中目黒さくらストリートに出店します！秋限定のかぼちゃベーグルを初出しします。お近くの方ぜひ。",
    tags: ["中目黒", "新メニュー"],
    likes: 24,
    comments: 5,
    image: { icon: "flower", color: "#EC4899" },
  },
  {
    id: "c2",
    author: "港のタコス",
    genre: "メキシカン",
    time: "5時間前",
    text: "みなとみらいで隣だった皆さん、お疲れさまでした。風対策のウェイト、貸してくださった方ありがとうございました！",
    tags: ["みなとみらい"],
    likes: 41,
    comments: 12,
    liked: true,
  },
  {
    id: "c3",
    author: "カレー屋ハチ",
    genre: "カレー",
    time: "昨日",
    text: "発電機の騒音対策について、皆さんどうしてますか？防音ボックスを自作するか迷っています。",
    tags: ["質問", "設備"],
    likes: 9,
    comments: 18,
  },
];

export const suggestedVendors = [
  { name: "さくらベーグル", genre: "ベーグル・パン", followers: 1240 },
  { name: "港のタコス", genre: "メキシカン", followers: 860 },
  { name: "GREEN SMOOTHIE", genre: "ドリンク", followers: 530 },
];

export const unreadChatCount = 2;
