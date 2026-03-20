/**
 * lib/types.ts
 * 앱 전역 TypeScript 타입/인터페이스 정의
 *
 * TODO: Phase 3에서 lib/supabase/types.ts DB 타입으로 교체
 *
 * 주의:
 * - AppUser: 브라우저 내장 User 타입과 충돌 방지를 위해 AppUser 사용
 * - GatherEvent: 브라우저 내장 Event 타입과 충돌 방지를 위해 GatherEvent 사용
 */

// =============================================================================
// 유니온 타입
// =============================================================================

/**
 * 이벤트 상태 타입
 * upcoming: 예정, ongoing: 진행중, ended: 종료
 * TODO: Phase 3에서 lib/supabase/types.ts DB 타입으로 교체
 */
export type EventStatus = 'upcoming' | 'ongoing' | 'ended'

/**
 * 사용자 역할 타입
 * user: 일반 사용자, admin: 관리자
 * TODO: Phase 3에서 lib/supabase/types.ts DB 타입으로 교체
 */
export type UserRole = 'user' | 'admin'

/**
 * 이벤트 참여자 역할 타입
 * host: 주최자, participant: 참여자
 * TODO: Phase 3에서 lib/supabase/types.ts DB 타입으로 교체
 */
export type ParticipantRole = 'host' | 'participant'

// =============================================================================
// 인터페이스
// =============================================================================

/**
 * 앱 사용자 인터페이스
 * 브라우저 내장 User 타입과 충돌 방지를 위해 AppUser로 명명
 * TODO: Phase 3에서 lib/supabase/types.ts DB 타입으로 교체
 */
export interface AppUser {
  /** 사용자 고유 ID */
  id: string
  /** 이메일 주소 */
  email: string
  /** 표시 이름 */
  name: string
  /** 프로필 이미지 URL (없을 경우 null) */
  avatarUrl: string | null
  /** 사용자 역할 */
  role: UserRole
  /** 계정 생성 일시 (ISO 8601) */
  createdAt: string
}

/**
 * 이벤트 인터페이스
 * 브라우저 내장 Event 타입과 충돌 방지를 위해 GatherEvent로 명명
 * TODO: Phase 3에서 lib/supabase/types.ts DB 타입으로 교체
 */
export interface GatherEvent {
  /** 이벤트 고유 ID */
  id: string
  /** 이벤트 제목 */
  title: string
  /** 이벤트 설명 (없을 경우 null) */
  description: string | null
  /** 이벤트 장소 */
  location: string
  /** 이벤트 날짜 및 시간 (ISO 8601) */
  eventDate: string
  /** 커버 이미지 URL (없을 경우 null) */
  coverImageUrl: string | null
  /** 초대 코드 */
  inviteCode: string
  /** 이벤트 상태 */
  status: EventStatus
  /** 이벤트 생성자 사용자 ID */
  createdBy: string
  /** 이벤트 생성 일시 (ISO 8601) */
  createdAt: string
  /** 현재 참여자 수 (선택적) */
  participantCount?: number
}

/**
 * 이벤트 참여자 인터페이스
 * TODO: Phase 3에서 lib/supabase/types.ts DB 타입으로 교체
 */
export interface EventParticipant {
  /** 참여 기록 고유 ID */
  id: string
  /** 이벤트 ID */
  eventId: string
  /** 사용자 ID */
  userId: string
  /** 참여자 역할 (host: 주최자, participant: 참여자) */
  role: ParticipantRole
  /** 참여 일시 (ISO 8601) */
  joinedAt: string
  /** 참여자 사용자 정보 (선택적) */
  user?: Pick<AppUser, 'id' | 'name' | 'avatarUrl'>
}

// =============================================================================
// 더미 데이터 상수
// =============================================================================

/**
 * 더미 사용자 데이터 (주최자)
 * TODO: Phase 3에서 Supabase 실제 인증 사용자 데이터로 교체
 */
export const DUMMY_USER: AppUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: '김개발',
  avatarUrl: null,
  role: 'user',
  createdAt: '2026-01-01T00:00:00Z',
}

/**
 * 더미 참여자 사용자 데이터
 * TODO: Phase 3에서 Supabase 실제 인증 사용자 데이터로 교체
 */
export const DUMMY_PARTICIPANT_USER: AppUser = {
  id: 'user-2',
  email: 'designer@example.com',
  name: '이디자인',
  avatarUrl: null,
  role: 'user',
  createdAt: '2026-01-05T00:00:00Z',
}

/**
 * 더미 이벤트 데이터 (3개)
 * - upcoming 2개, ended 1개
 * TODO: Phase 3에서 Supabase 실제 이벤트 데이터로 교체
 */
export const DUMMY_EVENTS: GatherEvent[] = [
  {
    id: 'event-1',
    title: '팀 빌딩 워크숍 2026',
    description: '올해 첫 번째 팀 빌딩 행사입니다. 다 함께 즐거운 시간을 보내요!',
    location: '서울시 강남구 역삼동 패스트파이브 강남점',
    eventDate: '2026-04-15T10:00:00Z',
    coverImageUrl: null,
    inviteCode: 'abc123',
    status: 'upcoming',
    createdBy: 'user-1',
    createdAt: '2026-03-01T09:00:00Z',
    participantCount: 5,
  },
  {
    id: 'event-2',
    title: '스프링 해커톤 2026',
    description:
      '48시간 동안 진행되는 해커톤 이벤트입니다. 팀을 이루어 혁신적인 아이디어를 구현해 보세요.',
    location: '서울시 마포구 상암동 디지털미디어시티',
    eventDate: '2026-05-20T09:00:00Z',
    coverImageUrl: null,
    inviteCode: 'def456',
    status: 'upcoming',
    createdBy: 'user-1',
    createdAt: '2026-03-10T14:00:00Z',
    participantCount: 12,
  },
  {
    id: 'event-3',
    title: '신년 맞이 네트워킹 파티',
    description:
      '2026년 새해를 맞아 개발자들이 한자리에 모이는 네트워킹 행사입니다.',
    location: '서울시 송파구 잠실동 롯데월드타워 SKY31 컨벤션',
    eventDate: '2026-01-10T18:00:00Z',
    coverImageUrl: null,
    inviteCode: 'ghi789',
    status: 'ended',
    createdBy: 'user-1',
    createdAt: '2025-12-15T10:00:00Z',
    participantCount: 8,
  },
]

/**
 * 더미 이벤트 참여자 데이터 (5개)
 * - host 1개, participant 4개
 * TODO: Phase 3에서 Supabase 실제 참여자 데이터로 교체
 */
export const DUMMY_PARTICIPANTS: EventParticipant[] = [
  {
    id: 'participant-1',
    eventId: 'event-1',
    userId: 'user-1',
    role: 'host',
    joinedAt: '2026-03-01T09:00:00Z',
    user: {
      id: 'user-1',
      name: '김개발',
      avatarUrl: null,
    },
  },
  {
    id: 'participant-2',
    eventId: 'event-1',
    userId: 'user-2',
    role: 'participant',
    joinedAt: '2026-03-05T11:30:00Z',
    user: {
      id: 'user-2',
      name: '이디자인',
      avatarUrl: null,
    },
  },
  {
    id: 'participant-3',
    eventId: 'event-1',
    userId: 'user-3',
    role: 'participant',
    joinedAt: '2026-03-06T14:00:00Z',
    user: {
      id: 'user-3',
      name: '박기획',
      avatarUrl: null,
    },
  },
  {
    id: 'participant-4',
    eventId: 'event-1',
    userId: 'user-4',
    role: 'participant',
    joinedAt: '2026-03-08T09:15:00Z',
    user: {
      id: 'user-4',
      name: '최마케팅',
      avatarUrl: null,
    },
  },
  {
    id: 'participant-5',
    eventId: 'event-1',
    userId: 'user-5',
    role: 'participant',
    joinedAt: '2026-03-10T16:45:00Z',
    user: {
      id: 'user-5',
      name: '정데이터',
      avatarUrl: null,
    },
  },
]
