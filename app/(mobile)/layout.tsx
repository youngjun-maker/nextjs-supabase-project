import { MobileNav } from "@/components/layout/mobile-nav";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <main className="pb-16">{children}</main>
      <MobileNav />
    </div>
  );
}
