import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LogoutButton } from "@/components/logout-button";
import { DUMMY_USER, DUMMY_PARTICIPANT_USER, getUserEvents, getJoinedEvents } from "@/lib/dummy";

interface ProfileViewProps {
  /** 역할 variant: 'organizer'(기본)는 주최자 뷰, 'participant'는 참여자 뷰 */
  variant?: "organizer" | "participant";
}

export function ProfileView({ variant = "organizer" }: ProfileViewProps) {
  // variant에 따라 표시할 사용자와 이벤트 데이터 결정
  const isParticipant = variant === "participant";
  const user = isParticipant ? DUMMY_PARTICIPANT_USER : DUMMY_USER;
  const events = isParticipant
    ? getJoinedEvents(user.id)
    : getUserEvents(user.id);
  const fallback = user.name.charAt(0);

  // 통계 레이블: 주최자는 "내가 만든 이벤트", 참여자는 "참여한 이벤트"
  const statsLabel = isParticipant ? "참여한 이벤트" : "내가 만든 이벤트";

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">프로필</h1>

      <div className="flex flex-col items-center gap-3 py-6">
        <Avatar className="h-20 w-20">
          <AvatarFallback className="text-2xl">{fallback}</AvatarFallback>
        </Avatar>
        <div className="text-center space-y-1">
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <Badge variant={user.role === "admin" ? "default" : "secondary"}>
            {user.role === "admin" ? "관리자" : "일반 사용자"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{statsLabel}</span>
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {events.length}
            </span>
          </CardContent>
        </Card>
      </div>

      <div className="pt-4">
        <LogoutButton />
      </div>
    </div>
  );
}
