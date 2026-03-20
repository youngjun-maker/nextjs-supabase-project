import { EventListView } from "@/components/features/events/event-list-view";
import { ParticipantEventListView } from "@/components/features/events/participant-event-list-view";
import { DEMO_ROLE } from "@/lib/demo-config";

export default function EventsPage() {
  // DEMO_ROLE에 따라 주최자/참여자 뷰 분기
  if (DEMO_ROLE === "participant") {
    return <ParticipantEventListView />;
  }
  return <EventListView />;
}
