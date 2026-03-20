import Link from "next/link";
import { MapPin, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { GatherEvent } from "@/lib/types";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const statusConfig: Record<
  GatherEvent["status"],
  { label: string; className: string }
> = {
  upcoming: {
    label: "예정",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 border-transparent",
  },
  ongoing: {
    label: "진행중",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-transparent",
  },
  ended: {
    label: "종료",
    className:
      "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 border-transparent",
  },
};

type EventCardProps = {
  event: GatherEvent;
  variant?: "default" | "compact";
};

export function EventCard({ event, variant = "default" }: EventCardProps) {
  const { label, className } = statusConfig[event.status];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-2">
        <Badge className={className}>{label}</Badge>
        <Link
          href={`/events/${event.id}`}
          className="block font-semibold text-base leading-snug hover:underline"
        >
          {event.title}
        </Link>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar size={14} className="shrink-0" />
          <span>{dateFormatter.format(new Date(event.eventDate))}</span>
        </div>
        {variant === "default" && (
          <>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin size={14} className="shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
            {event.participantCount !== undefined && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users size={14} className="shrink-0" />
                <span>{event.participantCount}명 참여</span>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
