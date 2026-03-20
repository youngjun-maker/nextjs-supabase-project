export const dynamic = "force-dynamic";

import { EventDetailView } from "@/components/features/events/event-detail-view";
import { ParticipantEventDetailView } from "@/components/features/events/participant-event-detail-view";
import { DEMO_ROLE } from "@/lib/demo-config";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;

  // DEMO_ROLE에 따라 주최자/참여자 상세 뷰 분기
  if (DEMO_ROLE === "participant") {
    return <ParticipantEventDetailView id={id} />;
  }
  return <EventDetailView id={id} />;
}
