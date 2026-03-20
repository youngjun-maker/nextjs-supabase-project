export { DUMMY_USER, DUMMY_PARTICIPANT_USER, DUMMY_EVENTS, DUMMY_PARTICIPANTS } from "@/lib/types";

import type { GatherEvent, EventParticipant, AppUser } from "@/lib/types";
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

// ===== ADMIN 더미 데이터 =====

export const DUMMY_ALL_USERS: AppUser[] = [
  { id: 'user-1', email: 'kim@example.com', name: '김개발', avatarUrl: null, role: 'admin', createdAt: '2025-10-05T09:00:00Z' },
  { id: 'user-2', email: 'lee@example.com', name: '이디자인', avatarUrl: null, role: 'user', createdAt: '2025-10-18T11:00:00Z' },
  { id: 'user-3', email: 'park@example.com', name: '박기획', avatarUrl: null, role: 'user', createdAt: '2025-11-02T10:00:00Z' },
  { id: 'user-4', email: 'choi@example.com', name: '최마케팅', avatarUrl: null, role: 'user', createdAt: '2025-11-15T14:00:00Z' },
  { id: 'user-5', email: 'jung@example.com', name: '정데이터', avatarUrl: null, role: 'user', createdAt: '2025-11-28T09:30:00Z' },
  { id: 'user-6', email: 'han@example.com', name: '한백엔드', avatarUrl: null, role: 'user', createdAt: '2025-12-03T13:00:00Z' },
  { id: 'user-7', email: 'oh@example.com', name: '오프론트', avatarUrl: null, role: 'user', createdAt: '2025-12-20T10:00:00Z' },
  { id: 'user-8', email: 'shin@example.com', name: '신풀스택', avatarUrl: null, role: 'user', createdAt: '2026-01-08T09:00:00Z' },
  { id: 'user-9', email: 'kwon@example.com', name: '권데브옵스', avatarUrl: null, role: 'user', createdAt: '2026-01-15T11:00:00Z' },
  { id: 'user-10', email: 'lim@example.com', name: '임UX', avatarUrl: null, role: 'user', createdAt: '2026-01-22T14:00:00Z' },
  { id: 'user-11', email: 'ryu@example.com', name: '류PM', avatarUrl: null, role: 'user', createdAt: '2026-02-05T10:00:00Z' },
  { id: 'user-12', email: 'moon@example.com', name: '문QA', avatarUrl: null, role: 'user', createdAt: '2026-02-14T09:00:00Z' },
  { id: 'user-13', email: 'bae@example.com', name: '배보안', avatarUrl: null, role: 'user', createdAt: '2026-02-25T13:00:00Z' },
  { id: 'user-14', email: 'kwak@example.com', name: '곽분석', avatarUrl: null, role: 'user', createdAt: '2026-03-05T10:00:00Z' },
  { id: 'user-15', email: 'jeon@example.com', name: '전아키', avatarUrl: null, role: 'user', createdAt: '2026-03-12T11:00:00Z' },
]

export const DUMMY_ALL_EVENTS_ADMIN: GatherEvent[] = [
  { id: 'adm-event-1', title: '2026 스타트업 네트워킹', location: '서울 강남구 테헤란로 123', eventDate: '2026-04-10T18:00:00Z', description: '스타트업 생태계 네트워킹 행사', status: 'upcoming', inviteCode: 'net001', createdBy: 'user-1', createdAt: '2026-03-01T09:00:00Z', participantCount: 12, coverImageUrl: null },
  { id: 'adm-event-2', title: '디자인 씽킹 워크샵', location: '서울 마포구 홍대입구', eventDate: '2026-03-25T14:00:00Z', description: '디자인 씽킹 방법론 실습', status: 'upcoming', inviteCode: 'des002', createdBy: 'user-2', createdAt: '2026-03-05T10:00:00Z', participantCount: 8, coverImageUrl: null },
  { id: 'adm-event-3', title: '개발자 밋업 3월', location: '서울 송파구 잠실', eventDate: '2026-03-20T19:00:00Z', description: '월간 개발자 모임', status: 'ongoing', inviteCode: 'dev003', createdBy: 'user-1', createdAt: '2026-02-28T11:00:00Z', participantCount: 25, coverImageUrl: null },
  { id: 'adm-event-4', title: '마케팅 전략 세미나', location: '서울 중구 을지로', eventDate: '2026-03-18T10:00:00Z', description: '2026 마케팅 트렌드 공유', status: 'ongoing', inviteCode: 'mkt004', createdBy: 'user-4', createdAt: '2026-03-01T09:00:00Z', participantCount: 15, coverImageUrl: null },
  { id: 'adm-event-5', title: '데이터 분석 스터디', location: '서울 서초구 방배동', eventDate: '2026-03-15T14:00:00Z', description: '파이썬 데이터 분석 실습', status: 'ongoing', inviteCode: 'dat005', createdBy: 'user-5', createdAt: '2026-03-02T10:00:00Z', participantCount: 10, coverImageUrl: null },
  { id: 'adm-event-6', title: 'UI/UX 포트폴리오 리뷰', location: '온라인 (Zoom)', eventDate: '2026-03-10T15:00:00Z', description: '포트폴리오 피드백 세션', status: 'ended', inviteCode: 'uix006', createdBy: 'user-2', createdAt: '2026-02-20T09:00:00Z', participantCount: 20, coverImageUrl: null },
  { id: 'adm-event-7', title: '백엔드 아키텍처 토론', location: '서울 강서구 마곡', eventDate: '2026-03-08T18:00:00Z', description: '마이크로서비스 vs 모놀리스', status: 'ended', inviteCode: 'bak007', createdBy: 'user-6', createdAt: '2026-02-25T11:00:00Z', participantCount: 18, coverImageUrl: null },
  { id: 'adm-event-8', title: 'AI 해커톤 2026', location: '서울 성동구 성수동', eventDate: '2026-04-20T09:00:00Z', description: '48시간 AI 해커톤', status: 'upcoming', inviteCode: 'ai0008', createdBy: 'user-3', createdAt: '2026-03-10T09:00:00Z', participantCount: 5, coverImageUrl: null },
  { id: 'adm-event-9', title: '클라우드 네이티브 세미나', location: '서울 영등포구 여의도', eventDate: '2026-05-01T14:00:00Z', description: 'AWS/GCP 활용 사례 공유', status: 'upcoming', inviteCode: 'cld009', createdBy: 'user-1', createdAt: '2026-03-12T10:00:00Z', participantCount: 3, coverImageUrl: null },
  { id: 'adm-event-10', title: '애자일 코치 네트워킹', location: '서울 용산구 이태원', eventDate: '2026-03-05T18:00:00Z', description: '애자일 실천 사례 공유', status: 'ended', inviteCode: 'agi010', createdBy: 'user-8', createdAt: '2026-02-15T09:00:00Z', participantCount: 22, coverImageUrl: null },
  { id: 'adm-event-11', title: '프로덕트 매니저 밋업', location: '서울 강남구 선릉', eventDate: '2026-04-05T19:00:00Z', description: 'PM 경험 공유 모임', status: 'upcoming', inviteCode: 'pm0011', createdBy: 'user-11', createdAt: '2026-03-08T11:00:00Z', participantCount: 7, coverImageUrl: null },
  { id: 'adm-event-12', title: '보안 취약점 분석 워크샵', location: '서울 강남구 역삼', eventDate: '2026-03-22T10:00:00Z', description: 'OWASP Top 10 실습', status: 'ongoing', inviteCode: 'sec012', createdBy: 'user-13', createdAt: '2026-03-03T09:00:00Z', participantCount: 12, coverImageUrl: null },
  { id: 'adm-event-13', title: '신입 개발자 멘토링', location: '온라인 (Discord)', eventDate: '2026-03-28T15:00:00Z', description: '신입 개발자 Q&A 세션', status: 'upcoming', inviteCode: 'men013', createdBy: 'user-1', createdAt: '2026-03-15T10:00:00Z', participantCount: 15, coverImageUrl: null },
  { id: 'adm-event-14', title: '테크 토크: 웹 성능 최적화', location: '서울 마포구 합정', eventDate: '2026-03-02T18:00:00Z', description: 'Core Web Vitals 개선 사례', status: 'ended', inviteCode: 'ttk014', createdBy: 'user-7', createdAt: '2026-02-10T09:00:00Z', participantCount: 30, coverImageUrl: null },
  { id: 'adm-event-15', title: '오픈소스 기여 스터디', location: '서울 광진구 건대', eventDate: '2026-04-15T14:00:00Z', description: 'GitHub 오픈소스 기여 방법', status: 'upcoming', inviteCode: 'oss015', createdBy: 'user-9', createdAt: '2026-03-14T11:00:00Z', participantCount: 6, coverImageUrl: null },
]

export const DUMMY_MONTHLY_EVENTS = [
  { month: '10월', count: 3 },
  { month: '11월', count: 5 },
  { month: '12월', count: 4 },
  { month: '1월', count: 8 },
  { month: '2월', count: 6 },
  { month: '3월', count: 7 },
]

export const DUMMY_MONTHLY_USERS = [
  { month: '10월', count: 2 },
  { month: '11월', count: 4 },
  { month: '12월', count: 3 },
  { month: '1월', count: 6 },
  { month: '2월', count: 5 },
  { month: '3월', count: 8 },
]

export const DUMMY_STATUS_DIST = [
  { name: '예정', value: 8, fill: '#10b981' },
  { name: '진행중', value: 5, fill: '#3b82f6' },
  { name: '종료', value: 7, fill: '#6b7280' },
]

export function getAdminDashboardStats() {
  return {
    totalEvents: DUMMY_ALL_EVENTS_ADMIN.length,
    totalUsers: DUMMY_ALL_USERS.length,
    newThisMonth: DUMMY_ALL_EVENTS_ADMIN.filter(e => e.createdAt >= '2026-03-01').length,
    activeEvents: DUMMY_ALL_EVENTS_ADMIN.filter(e => e.status === 'ongoing').length,
  }
}

export function searchEvents(query: string, status: string): GatherEvent[] {
  return DUMMY_ALL_EVENTS_ADMIN.filter(e => {
    const matchesQuery = !query || e.title.toLowerCase().includes(query.toLowerCase()) || e.location.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = status === 'all' || e.status === status
    return matchesQuery && matchesStatus
  })
}

export function searchUsers(query: string, role: string): AppUser[] {
  return DUMMY_ALL_USERS.filter(u => {
    const matchesQuery = !query || u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase())
    const matchesRole = role === 'all' || u.role === role
    return matchesQuery && matchesRole
  })
}
