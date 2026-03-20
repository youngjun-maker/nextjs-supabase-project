export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { getEventByInviteCode } from "@/lib/dummy";
import { JoinEventView } from "@/components/features/events/join-event-view";

interface JoinPageProps {
  params: Promise<{ invite_code: string }>;
}

export default async function JoinPage({ params }: JoinPageProps) {
  const { invite_code } = await params;

  // 초대 코드로 이벤트 조회
  const event = getEventByInviteCode(invite_code);

  // 이벤트가 없으면 404
  if (!event) notFound();

  return <JoinEventView event={event} />;
}
