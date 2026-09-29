import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck } from "lucide-react";

export default function AdminLoginPage() {
  const input =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-[#7F93A7] focus:border-brandsoft focus:outline-none";
  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 text-white">
          <span className="w-9 h-9 rounded-lg bg-brand flex items-center justify-center">
            <Truck size={20} />
          </span>
          <span className="leading-tight">
            <span className="block font-display font-black text-xl">KitchenBase</span>
            <span className="block text-[11px] font-bold tracking-wider text-brandsoft">運営管理コンソール</span>
          </span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-5">
          <p className="flex items-center gap-2 text-sm font-bold text-white">
            <ShieldCheck size={18} className="text-brandsoft" />
            運営スタッフ専用ログイン
          </p>
          <label className="block">
            <span className="block text-sm font-bold text-[#C4D2DF] mb-1.5">スタッフID / メールアドレス</span>
            <input placeholder="staff@kitchenbase.example" className={input} />
          </label>
          <label className="block">
            <span className="block text-sm font-bold text-[#C4D2DF] mb-1.5">パスワード</span>
            <input type="password" placeholder="••••••••" className={input} />
          </label>
          <Link
            href="/admin"
            className="block text-center bg-brand hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition"
          >
            ログイン
          </Link>
          <p className="text-center text-xs text-[#7F93A7]">※ デモのため、入力せずにそのまま進めます</p>
        </div>

        <Link href="/login" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#C4D2DF] hover:text-white">
          <ArrowLeft size={16} />
          出店事業者の方はこちら
        </Link>
      </div>
    </main>
  );
}
