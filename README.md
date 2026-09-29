# KitchenBase — キッチンカー事業者向け 出店ポータル（モックアップ）

株式会社Geek の商談用モックアップです。React + TypeScript + Next.js（App Router）+ Tailwind CSS で構成しています。バックエンド接続はなく、`lib/mock.ts` のダミーデータで動作します。

## 画面

ログイン後はサイドバー型レイアウト（`components/AppShell.tsx`）で、アイコンはすべて [Lucide](https://lucide.dev)（`lucide-react`）を使用しています。

| 機能 | パス | 画面 |
| --- | --- | --- |
| 事業者の登録 | `/login` | ログイン |
| | `/register` | 新規登録（アカウント → 事業者情報 → 車両・メニュー → 許可証） |
| 事業者の管理・退会 | `/account` | 事業者情報／車両・メニュー／許可証・書類／メンバー管理／ログイン・退会 |
| | `/account/withdraw` | 退会手続き（注意事項 → 理由 → 同意 → 完了） |
| ホーム | `/dashboard` | KPI、対応が必要なこと、出店スケジュール、お知らせ、売上推移、記事 |
| 出店場所の検索・応募 | `/spots` | 検索・絞り込み・保存 |
| | `/spots/[id]` | 詳細・応募（エントリー）フォーム・関連記事 |
| 出店可否・予約 | `/entries` | ステータス別タブ、進捗ステップ、予約詳細、取り下げ・キャンセル |
| 決済 | `/payments` | 未払い請求の決済、支払い履歴、領収書、支払い方法 |
| 売上ダッシュボード | `/sales` | 月別推移・出店場所別売上・明細、売上の記録、CSV出力 |
| 運営チャット | `/chat` | 問い合わせスレッド、新規問い合わせ（種別選択）、ファイル添付 |
| 情報配信・メディア | `/media`, `/media/[id]` | 開催レポート・会場ガイド・ノウハウ・インタビュー |
| お知らせ・コミュニティ | `/community` | 運営お知らせ・通知設定／出店者タイムライン（投稿・いいね・フォロー） |

### 運営管理側（`/admin`）

`/login` の「運営管理者の方はこちら」から `/admin/login` へ進みます。サイドバーは `components/AdminShell.tsx`（事業者側と共通の `components/Shell.tsx` を利用）、ダミーデータは `lib/admin-mock.ts` です。

| 機能 | パス | 画面 |
| --- | --- | --- |
| ログイン | `/admin/login` | 運営スタッフ専用ログイン |
| ダッシュボード | `/admin` | 流通額・事業者数などのKPI、要対応タスク、最新の問い合わせ、募集の充足状況 |
| 事業者管理 | `/admin/vendors` | 状態別一覧・検索、登録審査（書類承認・再提出依頼）、利用停止／再開、退会承認 |
| 出店場所・募集管理 | `/admin/listings` | 募集の作成・編集・複製、公開・締切、応募数と確定区画の充足状況 |
| 応募審査・予約 | `/admin/reviews` | 出店場所・状態で絞り込み、承認（区画・搬入時間・決済期限を設定）、見送り（メッセージ送信） |
| 入金・精算管理 | `/admin/billing` | 請求ごとの入金状況、督促、返金、会場オーナーへの精算 |
| 問い合わせ対応 | `/admin/inquiries` | 事業者チャットの受信箱、担当者割当、完了処理、定型文返信 |
| メディア記事管理 | `/admin/media` | 記事の作成・編集・削除、下書き／予約投稿／公開、閲覧数 |
| お知らせ・コミュニティ | `/admin/announcements` | 対象・チャネルを指定したお知らせ配信、配信履歴と開封率、通報投稿の非表示・警告 |
| 売上・手数料レポート | `/admin/reports` | 月別流通額、手数料収入、出店場所別の成績・充足率 |

トップ（`/`）は `/login` に、旧 `/mypage` は `/entries` にリダイレクトします。

## ローカルで動かす

```bash
npm install
npm run dev
# http://localhost:3000
```

本番ビルドの確認:

```bash
npm run build
npm start
```

## Vercel へのデプロイ手順

1. このフォルダを GitHub のリポジトリにプッシュする
   ```bash
   git init
   git add .
   git commit -m "init: kitchencar mockup"
   git branch -M main
   git remote add origin https://github.com/<あなたのアカウント>/<リポジトリ名>.git
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com) にログイン → **Add New… → Project**
3. 上記の GitHub リポジトリを **Import**
4. Framework は自動で **Next.js** が選択されます。設定はそのまま **Deploy** を押すだけ
5. 数分でデプロイ完了。以降は `git push` するたびに自動で再デプロイされます

環境変数の設定は不要です（モックデータのみのため）。

## 技術メモ

- Next.js 14 App Router / TypeScript / Tailwind CSS 3
- アイコン: lucide-react（絵文字は使用しない）
- フォント: Google Fonts（Noto Sans JP / Zen Kaku Gothic New）を `app/layout.tsx` で読み込み
- 配色は提案資料と統一（ネイビー `#0E1B2A` × ブルー `#2563EB`）
