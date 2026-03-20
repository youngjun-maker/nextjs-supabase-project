import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Users, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ParticipantCard } from "@/components/common";
import { InviteCodeCopy } from "./invite-code-copy";
import { DeleteEventButton } from "./delete-event-button";
import { getEventById, getParticipantsByEventId, DUMMY_USER } from "@/lib/dummy";

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

interface EventDetailViewProps {
  id: string;
}

export function EventDetailView({ id }: EventDetailViewProps) {
  const event = getEventById(id);
  if (!event) notFound();

  const participants = getParticipantsByEventId(id);
  const isHost = event.createdBy === DUMMY_USER.id;
  const status = statusConfig[event.status];

  return (
    <div className="flex flex-col min-h-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 border-b">
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
        {isHost && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="gap-1.5">
              <Link href={`/events/${id}/edit`}>
                <Pencil size={14} />
                수정
              </Link>
            </Button>
            <DeleteEventButton eventId={id} />
          </div>
        )}
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

        {/* 날짜 / 장소 */}
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

        {/* 초대 코드 (주최자만) */}
        {isHost && (
          <>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm font-medium">초대 코드</p>
              <InviteCodeCopy inviteCode={event.inviteCode} />
            </div>
          </>
        )}

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
