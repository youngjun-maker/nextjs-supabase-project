/**
 * lib/mappers.ts
 * DB(snake_case) ↔ App(camelCase) 타입 변환 헬퍼
 *
 * 전략:
 * - DB 타입(lib/supabase/types.ts)은 Supabase 쿼리 레이어에서만 사용
 * - App 타입(lib/types.ts)은 컴포넌트/UI 레이어에서 사용
 * - 이 파일의 mapper 함수가 두 레이어 사이 변환을 담당
 *
 * Phase 3 교체 시:
 *   1. 각 테이블의 DB 타입을 lib/supabase/types.ts에서 생성
 *   2. 아래 mapper 함수를 구현
 *   3. 더미 데이터 대신 Supabase 쿼리 결과를 mapper에 통과시켜 사용
 *   4. 컴포넌트는 수정 없이 기존 App 타입을 그대로 소비
 */

import type { Profile } from "@/lib/supabase/types";
import type { AppUser, GatherEvent, EventParticipant } from "@/lib/types";

// =============================================================================
// Profile → AppUser (현재 DB 테이블 존재 — 즉시 사용 가능)
// =============================================================================

export function mapProfileToAppUser(profile: Profile): AppUser {
  return {
    id: profile.id,
    email: profile.email ?? "",
    name: profile.full_name ?? "",
    avatarUrl: profile.avatar_url,
    role: "user",       // profiles 테이블에 role 컬럼 없음 → Phase 3에서 추가
    createdAt: profile.created_at,
  };
}

// =============================================================================
// GatherEvent mapper (Phase 3: events 테이블 생성 후 구현)
// =============================================================================

/**
 * Phase 3에서 아래 DB 타입으로 교체:
 *   import type { Tables } from "@/lib/supabase/types";
 *   type EventRow = Tables<"events">;
 */
type EventRow = {
  id: string;
  title: string;
  description: string | null;
  location: string;
  event_date: string;
  cover_image_url: string | null;
  invite_code: string;
  status: GatherEvent["status"];
  created_by: string;
  created_at: string;
  participant_count?: number;
};

export function mapEventRowToGatherEvent(row: EventRow): GatherEvent {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    eventDate: row.event_date,
    coverImageUrl: row.cover_image_url,
    inviteCode: row.invite_code,
    status: row.status,
    createdBy: row.created_by,
    createdAt: row.created_at,
    participantCount: row.participant_count,
  };
}

// =============================================================================
// EventParticipant mapper (Phase 3: event_participants 테이블 생성 후 구현)
// =============================================================================

/**
 * Phase 3에서 아래 DB 타입으로 교체:
 *   type ParticipantRow = Tables<"event_participants">;
 */
type ParticipantRow = {
  id: string;
  event_id: string;
  user_id: string;
  role: EventParticipant["role"];
  joined_at: string;
  user?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
};

export function mapParticipantRowToEventParticipant(
  row: ParticipantRow
): EventParticipant {
  return {
    id: row.id,
    eventId: row.event_id,
    userId: row.user_id,
    role: row.role,
    joinedAt: row.joined_at,
    user: row.user
      ? {
          id: row.user.id,
          name: row.user.full_name ?? "",
          avatarUrl: row.user.avatar_url,
        }
      : undefined,
  };
}

// =============================================================================
// 배열 변환 유틸
// =============================================================================

export function mapMany<TRow, TApp>(
  rows: TRow[],
  mapper: (row: TRow) => TApp
): TApp[] {
  return rows.map(mapper);
}
