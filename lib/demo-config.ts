/**
 * lib/demo-config.ts
 * 데모 모드 설정
 *
 * DEMO_ROLE 상수 하나로 주최자/참여자 UI 전환 가능
 * - 'organizer': 주최자 뷰 (Task 004 기본 UI)
 * - 'participant': 참여자 뷰 (Task 005 읽기 전용 UI)
 *
 * TODO: Phase 3에서 실제 인증 사용자 역할 기반 분기로 교체
 */
export const DEMO_ROLE: 'organizer' | 'participant' = 'participant';
