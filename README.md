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
