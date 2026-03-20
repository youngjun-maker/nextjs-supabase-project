"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { EventCard, EmptyState } from "@/components/common";
import type { GatherEvent } from "@/lib/types";

type Tab = "all" | "upcoming" | "ongoing" | "ended";

const tabs: { value: Tab; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "upcoming", label: "예정" },
  { value: "ongoing", label: "진행중" },
  { value: "ended", label: "종료" },
];

type EventFilterTabsProps = {
  events: GatherEvent[];
  /** 빈 상태에서 표시할 액션 버튼. undefined이면 버튼 미표시 (참여자 뷰) */
  emptyAction?: { label: string; href: string };
};

export function EventFilterTabs({ events, emptyAction }: EventFilterTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filtered =
    activeTab === "all" ? events : events.filter((e) => e.status === activeTab);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
              activeTab === tab.value
                ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="이벤트가 없습니다"
          description={emptyAction ? "새 이벤트를 만들어 보세요" : "참여한 이벤트가 없습니다"}
          action={emptyAction}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
