import Header from "@/components/Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <div className="mx-auto max-w-6xl px-5 py-8">{children}</div>
    </div>
  );
}
