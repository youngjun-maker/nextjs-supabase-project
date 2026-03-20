"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { GatherEvent } from "@/lib/types";

const statusConfig = {
  upcoming: { label: "예정", className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  ongoing: { label: "진행중", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" },
  ended: { label: "종료", className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
};

function formatDate(isoString: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoString));
}

interface JoinEventViewProps {
  event: GatherEvent;
}

/**
 * 초대 링크를 통한 이벤트 참여 페이지 뷰
 * - 이벤트 미리보기 카드 (제목, 날짜, 장소, 참여자 수)
 * - 참여하기 버튼: 이벤트 상세 페이지로 이동
 * - 돌아가기 버튼: 이전 페이지로 이동
 */
export function JoinEventView({ event }: JoinEventViewProps) {
  const router = useRouter();
  const status = statusConfig[event.status];

  function handleJoin() {
    router.push(`/events/${event.id}`);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-6">
        {/* 페이지 제목 */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">이벤트 초대</h1>
          <p className="text-sm text-muted-foreground">아래 이벤트에 초대받으셨습니다</p>
        </div>

        {/* 이벤트 미리보기 카드 */}
        <div className="rounded-xl border bg-white dark:bg-gray-900 shadow-sm p-5 space-y-4">
          {/* 제목 + 상태 배지 */}
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-bold leading-snug">{event.title}</h2>
            <Badge className={status.className}>{status.label}</Badge>
          </div>

          {/* 날짜 / 장소 / 참여자 수 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={15} className="shrink-0" />
              <span>{formatDate(event.eventDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={15} className="shrink-0" />
              <span>{event.location}</span>
            </div>
            {event.participantCount !== undefined && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users size={15} className="shrink-0" />
                <span>{event.participantCount}명 참여 중</span>
              </div>
            )}
          </div>
        </div>

        {/* 참여 확인 안내 */}
        <p className="text-center text-sm font-medium">이 이벤트에 참여하시겠어요?</p>

        {/* 액션 버튼 */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleJoin}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            참여하기
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/">돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
