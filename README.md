# KitchenBase — キッチンカー事業者向け 出店ポータル（モックアップ）

株式会社Geek の商談用モックアップです。React + TypeScript + Next.js（App Router）+ Tailwind CSS で構成しています。バックエンド接続はなく、`lib/mock.ts` のダミーデータで動作します。

## 画面

| パス | 画面 |
| --- | --- |
| `/login` | ログイン・新規登録 |
| `/spots` | 出店場所の検索・一覧（キーワード／エリア／ジャンルで絞り込み） |
| `/spots/[id]` | 出店場所の詳細・応募（エントリー） |
| `/mypage` | 応募状況・出店可否・予約・オンライン決済 |
| `/chat` | 運営事務局とのチャット |

トップ（`/`）は `/login` にリダイレクトします。

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
- フォント: Google Fonts（Noto Sans JP / Zen Kaku Gothic New）を `app/layout.tsx` で読み込み
- 配色は提案資料と統一（ネイビー `#0E1B2A` × ブルー `#2563EB`）
# kitchen
# kitchen
