import { redirect } from "next/navigation";

// 旧URL互換：マイページはホーム（/dashboard）と応募・予約管理（/entries）に分割
export default function MyPageRedirect() {
  redirect("/entries");
}
