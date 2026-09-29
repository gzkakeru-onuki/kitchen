// 運営管理（管理者）側のダミーデータ（バックエンド接続なし）

export const adminUser = { name: "鈴木 運営", role: "運営事務局 管理者" };

// ---------------------------------------------------------------
// 事業者管理
// ---------------------------------------------------------------

export type VendorStatus = "pending" | "active" | "suspended" | "withdrawing";

export type Vendor = {
  id: string;
  name: string;
  owner: string;
  genre: string;
  area: string;
  status: VendorStatus;
  registeredAt: string;
  entries: number; // 累計出店回数
  gmv: number; // 累計売上（申告ベース）
  docs: { name: string; status: "ok" | "review" | "missing" | "expiring" }[];
  rating: number;
};

export const vendors: Vendor[] = [
  {
    id: "v1",
    name: "山田キッチン",
    owner: "山田 太郎",
    genre: "クレープ・スイーツ",
    area: "東京・世田谷",
    status: "active",
    registeredAt: "2025-04-01",
    entries: 42,
    gmv: 2988000,
    docs: [
      { name: "飲食店営業許可証", status: "ok" },
      { name: "食品衛生責任者証", status: "ok" },
      { name: "PL保険 加入証明", status: "expiring" },
    ],
    rating: 4.8,
  },
  {
    id: "v2",
    name: "さくらベーグル",
    owner: "桜井 美咲",
    genre: "ベーグル・パン",
    area: "東京・目黒",
    status: "active",
    registeredAt: "2025-06-12",
    entries: 31,
    gmv: 2140000,
    docs: [
      { name: "飲食店営業許可証", status: "ok" },
      { name: "食品衛生責任者証", status: "ok" },
      { name: "PL保険 加入証明", status: "ok" },
    ],
    rating: 4.9,
  },
  {
    id: "v3",
    name: "港のタコス",
    owner: "Carlos 田中",
    genre: "メキシカン",
    area: "神奈川・横浜",
    status: "active",
    registeredAt: "2025-09-03",
    entries: 18,
    gmv: 1320000,
    docs: [
      { name: "飲食店営業許可証", status: "ok" },
      { name: "食品衛生責任者証", status: "ok" },
      { name: "PL保険 加入証明", status: "ok" },
    ],
    rating: 4.6,
  },
  {
    id: "v4",
    name: "GREEN SMOOTHIE",
    owner: "緑川 翔",
    genre: "ドリンク",
    area: "千葉・船橋",
    status: "pending",
    registeredAt: "2026-09-27",
    entries: 0,
    gmv: 0,
    docs: [
      { name: "飲食店営業許可証", status: "review" },
      { name: "食品衛生責任者証", status: "review" },
      { name: "PL保険 加入証明", status: "missing" },
    ],
    rating: 0,
  },
  {
    id: "v5",
    name: "カレー屋ハチ",
    owner: "八木 健",
    genre: "カレー",
    area: "埼玉・川口",
    status: "pending",
    registeredAt: "2026-09-26",
    entries: 0,
    gmv: 0,
    docs: [
      { name: "飲食店営業許可証", status: "review" },
      { name: "食品衛生責任者証", status: "review" },
      { name: "PL保険 加入証明", status: "review" },
    ],
    rating: 0,
  },
  {
    id: "v6",
    name: "BBQ ROCKS",
    owner: "岩田 剛",
    genre: "肉料理・BBQ",
    area: "東京・八王子",
    status: "suspended",
    registeredAt: "2025-11-20",
    entries: 9,
    gmv: 610000,
    docs: [
      { name: "飲食店営業許可証", status: "expiring" },
      { name: "食品衛生責任者証", status: "ok" },
      { name: "PL保険 加入証明", status: "missing" },
    ],
    rating: 3.9,
  },
  {
    id: "v7",
    name: "ほっとドッグ屋",
    owner: "堀 直人",
    genre: "ホットドッグ",
    area: "東京・町田",
    status: "withdrawing",
    registeredAt: "2025-05-08",
    entries: 22,
    gmv: 1480000,
    docs: [
      { name: "飲食店営業許可証", status: "ok" },
      { name: "食品衛生責任者証", status: "ok" },
      { name: "PL保険 加入証明", status: "ok" },
    ],
    rating: 4.4,
  },
];

export const vendorStatusMeta: Record<VendorStatus, { label: string; bg: string; fg: string }> = {
  pending: { label: "登録審査中", bg: "#FEF3C7", fg: "#92660A" },
  active: { label: "利用中", bg: "#D1FAE5", fg: "#0F8A6B" },
  suspended: { label: "利用停止", bg: "#FEE2E2", fg: "#B91C1C" },
  withdrawing: { label: "退会申請", bg: "#F1F5F9", fg: "#475569" },
};

// ---------------------------------------------------------------
// 出店場所（募集）管理
// ---------------------------------------------------------------

export type Listing = {
  id: string; // lib/mock の spot id と対応
  name: string;
  area: string;
  date: string;
  fee: number;
  capacity: number;
  applied: number;
  approved: number;
  status: "draft" | "open" | "closed" | "done";
  deadline: string;
};

export const listings: Listing[] = [
  { id: "shibuya-park", name: "渋谷リバーサイド広場", area: "東京・渋谷", date: "2026-10-12", fee: 15000, capacity: 6, applied: 9, approved: 6, status: "closed", deadline: "2026-09-28" },
  { id: "yokohama-bay", name: "みなとみらい海沿いイベント区画", area: "神奈川・横浜", date: "2026-10-18〜19", fee: 28000, capacity: 10, applied: 14, approved: 8, status: "open", deadline: "2026-10-04" },
  { id: "saitama-mall", name: "大宮ショッピングモール 屋外区画", area: "埼玉・大宮", date: "2026-10-25", fee: 12000, capacity: 4, applied: 3, approved: 1, status: "open", deadline: "2026-10-11" },
  { id: "chiba-festival", name: "幕張ビーチフェス 出店エリア", area: "千葉・幕張", date: "2026-11-01", fee: 35000, capacity: 12, applied: 21, approved: 5, status: "open", deadline: "2026-10-15" },
  { id: "meguro-street", name: "中目黒 さくらストリート", area: "東京・目黒", date: "2026-11-08", fee: 18000, capacity: 5, applied: 6, approved: 2, status: "open", deadline: "2026-10-22" },
  { id: "kawasaki-plant", name: "川崎ものづくり広場", area: "神奈川・川崎", date: "2026-11-15", fee: 10000, capacity: 6, applied: 0, approved: 0, status: "open", deadline: "2026-10-29" },
  { id: "draft-odaiba", name: "お台場 冬のイルミネーション広場", area: "東京・お台場", date: "2026-12-12〜13", fee: 30000, capacity: 8, applied: 0, approved: 0, status: "draft", deadline: "—" },
];

export const listingStatusMeta: Record<Listing["status"], { label: string; bg: string; fg: string }> = {
  draft: { label: "下書き", bg: "#F1F5F9", fg: "#475569" },
  open: { label: "募集中", bg: "#DBEAFE", fg: "#1D4ED8" },
  closed: { label: "募集締切", bg: "#FEF3C7", fg: "#92660A" },
  done: { label: "開催終了", bg: "#E2E8F0", fg: "#475569" },
};

// ---------------------------------------------------------------
// 応募審査
// ---------------------------------------------------------------

export type Review = {
  id: string;
  vendorId: string;
  vendorName: string;
  genre: string;
  listingId: string;
  listingName: string;
  appliedAt: string;
  menu: string[];
  note?: string;
  status: "reviewing" | "approved" | "rejected";
  booth?: string;
};

export const reviews: Review[] = [
  { id: "r1", vendorId: "v1", vendorName: "山田キッチン", genre: "クレープ・スイーツ", listingId: "chiba-festival", listingName: "幕張ビーチフェス 出店エリア", appliedAt: "2026-09-22", menu: ["いちごカスタードクレープ", "チョコバナナクレープ"], note: "電源2kVA希望です", status: "reviewing" },
  { id: "r2", vendorId: "v3", vendorName: "港のタコス", genre: "メキシカン", listingId: "chiba-festival", listingName: "幕張ビーチフェス 出店エリア", appliedAt: "2026-09-23", menu: ["タコス3種盛り", "ブリトー"], status: "reviewing" },
  { id: "r3", vendorId: "v2", vendorName: "さくらベーグル", genre: "ベーグル・パン", listingId: "meguro-street", listingName: "中目黒 さくらストリート", appliedAt: "2026-09-24", menu: ["かぼちゃベーグル", "プレーンベーグル"], note: "SNSでの告知協力可能です", status: "reviewing" },
  { id: "r4", vendorId: "v6", vendorName: "BBQ ROCKS", genre: "肉料理・BBQ", listingId: "yokohama-bay", listingName: "みなとみらい海沿いイベント区画", appliedAt: "2026-09-25", menu: ["スペアリブ", "BBQプレート"], status: "reviewing" },
  { id: "r5", vendorId: "v1", vendorName: "山田キッチン", genre: "クレープ・スイーツ", listingId: "yokohama-bay", listingName: "みなとみらい海沿いイベント区画", appliedAt: "2026-09-20", menu: ["いちごカスタードクレープ"], status: "approved", booth: "B-03" },
  { id: "r6", vendorId: "v7", vendorName: "ほっとドッグ屋", genre: "ホットドッグ", listingId: "saitama-mall", listingName: "大宮ショッピングモール 屋外区画", appliedAt: "2026-09-18", menu: ["チリドッグ"], status: "rejected" },
];

// ---------------------------------------------------------------
// 入金・精算
// ---------------------------------------------------------------

export type AdminInvoice = {
  id: string;
  vendorName: string;
  listingName: string;
  amount: number;
  fee: number; // うちシステム利用料
  due: string;
  status: "unpaid" | "overdue" | "paid" | "refunded";
  method?: string;
};

export const adminInvoices: AdminInvoice[] = [
  { id: "INV-2026-0918", vendorName: "山田キッチン", listingName: "みなとみらい海沿いイベント区画", amount: 30800, fee: 2800, due: "2026-10-04", status: "unpaid" },
  { id: "INV-2026-0917", vendorName: "港のタコス", listingName: "みなとみらい海沿いイベント区画", amount: 30800, fee: 2800, due: "2026-10-04", status: "paid", method: "クレジットカード" },
  { id: "INV-2026-0915", vendorName: "BBQ ROCKS", listingName: "渋谷リバーサイド広場", amount: 16500, fee: 1500, due: "2026-09-25", status: "overdue" },
  { id: "INV-2026-0912", vendorName: "さくらベーグル", listingName: "渋谷リバーサイド広場", amount: 16500, fee: 1500, due: "2026-09-28", status: "paid", method: "クレジットカード" },
  { id: "INV-2026-0911", vendorName: "山田キッチン", listingName: "渋谷リバーサイド広場", amount: 16500, fee: 1500, due: "2026-09-28", status: "paid", method: "クレジットカード" },
  { id: "INV-2026-0719", vendorName: "山田キッチン", listingName: "幕張ビーチフェス 出店エリア", amount: 38500, fee: 3500, due: "2026-07-25", status: "refunded", method: "クレジットカード" },
];

export const invoiceStatusMeta: Record<AdminInvoice["status"], { label: string; bg: string; fg: string }> = {
  unpaid: { label: "未入金", bg: "#DBEAFE", fg: "#1D4ED8" },
  overdue: { label: "期限超過", bg: "#FEE2E2", fg: "#B91C1C" },
  paid: { label: "入金済み", bg: "#D1FAE5", fg: "#0F8A6B" },
  refunded: { label: "返金済み", bg: "#F1F5F9", fg: "#64748B" },
};

// 会場オーナー（出店場所提供者）への精算
export const settlements = [
  { id: "st1", owner: "渋谷リバーサイド管理組合", listingName: "渋谷リバーサイド広場", amount: 90000, due: "2026-10-31", status: "予定" },
  { id: "st2", owner: "横浜みなとみらい21協議会", listingName: "みなとみらい海沿いイベント区画", amount: 224000, due: "2026-10-31", status: "予定" },
  { id: "st3", owner: "目黒さくら商店会", listingName: "中目黒 さくらストリート", amount: 54000, due: "2026-09-30", status: "振込済み" },
];

// ---------------------------------------------------------------
// 問い合わせ
// ---------------------------------------------------------------

export type Inquiry = {
  id: string;
  vendorName: string;
  category: string;
  subject: string;
  status: "open" | "progress" | "closed";
  assignee?: string;
  updatedAt: string;
  messages: { from: "vendor" | "ops"; text: string; time: string }[];
};

export const inquiries: Inquiry[] = [
  {
    id: "q1",
    vendorName: "山田キッチン",
    category: "出店場所について",
    subject: "みなとみらい海沿いイベント区画",
    status: "progress",
    assignee: "鈴木",
    updatedAt: "9/21 10:40",
    messages: [
      { from: "ops", text: "この度はご応募ありがとうございます。出店を承認いたしました。決済のお手続きをお願いします。", time: "9/21 10:20" },
      { from: "vendor", text: "ありがとうございます！電源は2kVAとのことですが、延長ケーブルの持参は必要でしょうか？", time: "9/21 10:32" },
      { from: "ops", text: "はい、20m程度のケーブルをご持参ください。区画は入口から3番目になります。", time: "9/21 10:40" },
    ],
  },
  {
    id: "q2",
    vendorName: "GREEN SMOOTHIE",
    category: "アカウントについて",
    subject: "PL保険の証明書について",
    status: "open",
    updatedAt: "9/28 18:12",
    messages: [
      { from: "vendor", text: "PL保険に現在加入手続き中です。証明書は後日のアップロードでも登録審査を進めていただけますか？", time: "9/28 18:12" },
    ],
  },
  {
    id: "q3",
    vendorName: "BBQ ROCKS",
    category: "決済・請求について",
    subject: "渋谷の出店料の支払い",
    status: "open",
    updatedAt: "9/27 09:05",
    messages: [
      { from: "vendor", text: "カード決済がエラーになってしまいます。銀行振込に変更できますか？", time: "9/27 09:05" },
    ],
  },
  {
    id: "q4",
    vendorName: "さくらベーグル",
    category: "出店場所について",
    subject: "中目黒 さくらストリート",
    status: "closed",
    assignee: "高橋",
    updatedAt: "9/20 15:30",
    messages: [
      { from: "vendor", text: "テントの持ち込みは可能ですか？", time: "9/20 14:02" },
      { from: "ops", text: "2m×2mまでのテントであれば持ち込み可能です。", time: "9/20 15:30" },
    ],
  },
];

export const inquiryStatusMeta: Record<Inquiry["status"], { label: string; bg: string; fg: string }> = {
  open: { label: "未対応", bg: "#FEE2E2", fg: "#B91C1C" },
  progress: { label: "対応中", bg: "#FEF3C7", fg: "#92660A" },
  closed: { label: "完了", bg: "#D1FAE5", fg: "#0F8A6B" },
};

export const replyTemplates = [
  "お問い合わせありがとうございます。確認のうえ、本日中にご連絡いたします。",
  "決済方法の変更を承りました。請求書払い（銀行振込）に切り替えましたので、マイページからご確認ください。",
  "書類は後日のアップロードでも審査を進められます。出店前日までにご提出ください。",
];

// ---------------------------------------------------------------
// コミュニティ監視
// ---------------------------------------------------------------

export const reportedPosts = [
  { id: "rp1", author: "匿名ユーザー", text: "〇〇の会場は運営がひどい。二度と出店しない。", reason: "誹謗中傷の可能性", reports: 3, time: "9/28 21:10" },
  { id: "rp2", author: "BBQ ROCKS", text: "格安で発電機お譲りします！DMください（外部サイトURL）", reason: "外部取引への誘導", reports: 2, time: "9/27 12:44" },
];

// ---------------------------------------------------------------
// レポート（プラットフォーム全体）
// ---------------------------------------------------------------

export const platformMonthly = [
  { label: "4月", gmv: 4820000, feeRevenue: 312000, events: 38 },
  { label: "5月", gmv: 6150000, feeRevenue: 398000, events: 47 },
  { label: "6月", gmv: 3980000, feeRevenue: 254000, events: 31 },
  { label: "7月", gmv: 7430000, feeRevenue: 481000, events: 55 },
  { label: "8月", gmv: 8960000, feeRevenue: 572000, events: 63 },
  { label: "9月", gmv: 6210000, feeRevenue: 405000, events: 44 },
];

export const listingPerformance = [
  { name: "みなとみらい海沿いイベント区画", events: 8, gmv: 1840000, fillRate: 90 },
  { name: "幕張ビーチフェス 出店エリア", events: 4, gmv: 1520000, fillRate: 100 },
  { name: "渋谷リバーサイド広場", events: 12, gmv: 1260000, fillRate: 95 },
  { name: "中目黒 さくらストリート", events: 6, gmv: 820000, fillRate: 80 },
  { name: "大宮ショッピングモール 屋外区画", events: 5, gmv: 440000, fillRate: 60 },
  { name: "川崎ものづくり広場", events: 4, gmv: 330000, fillRate: 50 },
];
