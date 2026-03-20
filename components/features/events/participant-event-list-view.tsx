import { getJoinedEvents } from "@/lib/dummy";
import { EventFilterTabs } from "./event-filter-tabs";

/**
 * 참여자(participant) 이벤트 목록 뷰
 * - FAB(+) 버튼 없음
 * - 제목: "참여한 이벤트"
 * - 빈 상태 액션 버튼 없음
 */
export function ParticipantEventListView() {
  // user-2(이디자인)가 참여자로 등록된 이벤트 조회
  const events = getJoinedEvents("user-2");

  return (
    <div className="relative min-h-full">
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold">참여한 이벤트</h1>
        {/* 참여자 뷰: emptyAction 미전달 → 빈 상태에서 버튼 없음 */}
        <EventFilterTabs events={events} />
      </div>
    </div>
  );
}
