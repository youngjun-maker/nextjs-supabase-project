export { DUMMY_USER, DUMMY_PARTICIPANT_USER, DUMMY_EVENTS, DUMMY_PARTICIPANTS } from "@/lib/types";

import type { GatherEvent, EventParticipant } from "@/lib/types";
import { DUMMY_EVENTS, DUMMY_PARTICIPANTS } from "@/lib/types";

export function getEventById(id: string): GatherEvent | undefined {
  return DUMMY_EVENTS.find((e) => e.id === id);
}

export function getParticipantsByEventId(eventId: string): EventParticipant[] {
  return DUMMY_PARTICIPANTS.filter((p) => p.eventId === eventId);
}

export function getUserEvents(userId: string): GatherEvent[] {
  return DUMMY_EVENTS.filter((e) => e.createdBy === userId);
}

/**
 * 특정 사용자가 참여자(participant)로 참여한 이벤트 목록 반환
 * DUMMY_PARTICIPANTS에서 userId와 role이 'participant'인 항목을 찾아 해당 이벤트를 반환
 */
export function getJoinedEvents(userId: string): GatherEvent[] {
  const joinedEventIds = DUMMY_PARTICIPANTS
    .filter((p) => p.userId === userId && p.role === 'participant')
    .map((p) => p.eventId);
  return DUMMY_EVENTS.filter((e) => joinedEventIds.includes(e.id));
}

/**
 * 초대 코드로 이벤트 조회
 */
export function getEventByInviteCode(inviteCode: string): GatherEvent | undefined {
  return DUMMY_EVENTS.find((e) => e.inviteCode === inviteCode);
}
