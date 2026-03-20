import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { EventParticipant } from "@/lib/types";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

type ParticipantCardProps = {
  participant: EventParticipant;
};

export function ParticipantCard({ participant }: ParticipantCardProps) {
  const name = participant.user?.name ?? "알 수 없음";
  const fallback = name.charAt(0);

  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
      <Avatar className="h-10 w-10 shrink-0">
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm truncate">{name}</span>
          <Badge variant={participant.role === "host" ? "default" : "secondary"}>
            {participant.role === "host" ? "주최자" : "참여자"}
          </Badge>
        </div>
        <span className="text-xs text-muted-foreground">
          {dateFormatter.format(new Date(participant.joinedAt))}
        </span>
      </div>
    </div>
  );
}
