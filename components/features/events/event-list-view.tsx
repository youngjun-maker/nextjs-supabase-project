import Link from "next/link";
import { Plus } from "lucide-react";
import { getUserEvents } from "@/lib/dummy";
import { EventFilterTabs } from "./event-filter-tabs";

export function EventListView() {
  const events = getUserEvents("user-1");

  return (
    <div className="relative min-h-full">
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold">내 이벤트</h1>
        {/* 주최자 뷰에서는 빈 상태 액션 버튼 표시 */}
        <EventFilterTabs
          events={events}
          emptyAction={{ label: "이벤트 만들기", href: "/events/new" }}
        />
      </div>

      <Link
        href="/events/new"
        className="fixed bottom-20 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-600 active:scale-95 transition-all z-40"
        aria-label="새 이벤트 만들기"
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}
