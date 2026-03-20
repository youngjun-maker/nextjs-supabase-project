import { Suspense } from "react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { MobileNavParticipant } from "@/components/layout/mobile-nav-participant";
import { DEMO_ROLE } from "@/lib/demo-config";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="flex flex-col w-full max-w-[430px] min-h-screen bg-white shadow-xl">
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Suspense fallback={<div className="h-16 border-t bg-background shrink-0" />}>
          {/* DEMO_ROLE에 따라 네비게이션 분기 */}
          {DEMO_ROLE === "participant" ? <MobileNavParticipant /> : <MobileNav />}
        </Suspense>
      </div>
    </div>
  );
}
