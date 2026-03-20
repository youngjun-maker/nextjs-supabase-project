import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ParticipantCard } from "@/components/common";
import { getEventById, getParticipantsByEventId } from "@/lib/dummy";

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

interface ParticipantEventDetailViewProps {
  id: string;
}

/**
 * 참여자(participant) 이벤트 상세 뷰
 * - 읽기 전용: 수정 버튼, 삭제 버튼, 초대 코드 섹션 제거
 * - 날짜, 장소, 참여자 목록, 상태 배지는 동일하게 표시
 */
export function ParticipantEventDetailView({ id }: ParticipantEventDetailViewProps) {
  const event = getEventById(id);
  if (!event) notFound();

  const participants = getParticipantsByEventId(id);
  const status = statusConfig[event.status];

  return (
    <div className="flex flex-col min-h-full">
      {/* 헤더: 뒤로가기만, 수정/삭제 버튼 없음 */}
      <div className="flex items-center p-4 border-b">
        <div className="flex items-center gap-3">
          <Link
            href="/events"
            className="p-1 rounded-md hover:bg-accent transition-colors"
            aria-label="뒤로가기"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-semibold">이벤트 상세</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        {/* 제목 + 상태 */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-xl font-bold leading-tight">{event.title}</h2>
            <Badge className={status.className}>{status.label}</Badge>
          </div>
          {event.description && (
            <p className="text-sm text-muted-foreground">{event.description}</p>
          )}
        </div>

        <Separator />

        {/* 날짜 / 장소 / 참여자 수 */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Calendar size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
            <span className="text-sm">{formatDate(event.eventDate)}</span>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-start gap-3">
            <Users size={16} className="mt-0.5 shrink-0 text-muted-foreground" />
            <span className="text-sm">{participants.length}명 참여 중</span>
          </div>
        </div>

        {/* 참여자 목록 */}
        <Separator />
        <div className="space-y-3">
          <p className="text-sm font-medium">참여자 ({participants.length})</p>
          {participants.length === 0 ? (
            <p className="text-sm text-muted-foreground">아직 참여자가 없습니다.</p>
          ) : (
            <div className="space-y-2">
              {participants.map((p) => (
                <ParticipantCard key={p.id} participant={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
