# Development Guidelines — Gather (AI Agent Rules)

## 1. Project Overview

- **서비스**: 초대 링크 기반 소규모 일회성 이벤트 관리 플랫폼 (5-30명)
- **스택**: Next.js 15 (App Router) · TypeScript · Tailwind CSS v3 · shadcn/ui (new-york) · Supabase
- **PRD**: `docs/PRD.md` — 기능 명세, 페이지 상세, 데이터 모델 최종 출처
- **ROADMAP**: `docs/ROADMAP.md` — Task 진행 순서 및 완료 체크리스트

---

## 2. Directory Structure

```
app/                        # Next.js App Router 페이지
  auth/                     # 인증 관련 (login, confirm, error 등)
  join/[invite_code]/       # 초대 링크 참여 페이지 (공개)
  events/[id]/              # 이벤트 상세/수정
  events/new/               # 이벤트 생성
  profile/                  # 사용자 프로필
  admin/                    # 관리자 전용 (login, dashboard, events, users, analytics)
  protected/                # 인증 필수 라우트 그룹
  layout.tsx                # 루트 레이아웃
  page.tsx                  # 랜딩 페이지 (비로그인)

components/
  ui/                       # shadcn/ui 컴포넌트만 위치 (자동 생성)
  [feature].tsx             # 공통/재사용 컴포넌트 (ui/ 외부)

lib/
  supabase/
    client.ts               # 브라우저 전용 Supabase 클라이언트
    server.ts               # Server Component·Route Handler·Server Action 전용
    proxy.ts                # 미들웨어 전용 세션 갱신 로직
    types.ts                # DB 스키마 자동 생성 TypeScript 타입

proxy.ts                    # Next.js 미들웨어 진입점 (수정 금지에 가까움)
docs/
  PRD.md                    # 기능 명세 최종 출처
  ROADMAP.md                # Task 진행 관리
  LEANCANVAS.md             # 비즈니스 모델
  guides/                   # 기술 가이드 문서
```

---

## 3. Supabase Client Rules

- **브라우저 (Client Component)** → `lib/supabase/client.ts`의 `createClient()` 사용
- **서버 (Server Component, Route Handler, Server Action)** → `lib/supabase/server.ts`의 `createClient()` 사용
- **미들웨어** → `lib/supabase/proxy.ts`의 `updateSession()` 사용, 다른 클라이언트 절대 사용 금지
- **⛔ 절대 금지**: Supabase 클라이언트를 전역 변수에 저장 — 반드시 함수 내부에서 매번 새로 생성
- **⛔ 절대 금지**: `lib/supabase/proxy.ts`와 `proxy.ts`(루트) 사이에 코드 추가 — `proxy.ts`는 진입점만 유지

---

## 4. Auth & Routing Rules

- **인증 체크**: `proxy.ts` 미들웨어가 전담 — 개별 페이지에서 인증 체크 로직 중복 금지
- **공개 라우트**: `/`, `/auth/*`, `/join/*` — 미로그인 사용자 접근 허용
- **보호 라우트**: 그 외 모든 경로 — 미들웨어가 `/auth/login`으로 자동 리다이렉트
- **관리자 라우트**: `/admin/*` — 미들웨어에서 `role === 'admin'` 추가 체크 필요 (Task 008)
- **초대 링크**: `/join/[invite_code]` — 비로그인 사용자도 미리보기 가능, 참여 시 로그인 유도

---

## 5. TypeScript Types Rules

- **DB 타입 출처**: `lib/supabase/types.ts` — 유일한 DB 타입 정의 파일
- **DB 스키마 변경 시**: `npx supabase gen types typescript --project-id <ref> > lib/supabase/types.ts` 실행 후 타입 파일 갱신
- **편의 타입**: 테이블별 `Row`, `Insert`, `Update` 타입을 파일 하단에 export (예: `export type Event = Database["public"]["Tables"]["events"]["Row"]`)
- **⛔ 금지**: DB 테이블 타입을 `types.ts` 외부 파일에 별도 정의
- **UI 전용 타입**: DB와 무관한 컴포넌트 Props 타입은 해당 컴포넌트 파일 내부 또는 `lib/types.ts`에 정의

---

## 6. shadcn/ui Rules

- **컴포넌트 추가**: `npx shadcn@latest add [component]` 명령 사용 — 수동으로 `components/ui/`에 파일 생성 금지
- **컴포넌트 위치**: shadcn 컴포넌트는 `components/ui/`에만 위치
- **커스텀 컴포넌트**: `components/ui/` 외부 (`components/` 루트 또는 하위 폴더)에 위치
- **스타일 기준**: `components.json` — `style: new-york`, `baseColor: neutral`, CSS Variables 사용
- **아이콘**: Lucide React 사용 (`lucide-react` 패키지)

---

## 7. Layout Rules

- **모바일 레이아웃** (주최자/참여자): 하단 내비게이션 바 (4탭) — `app/(mobile)/layout.tsx`로 분리
- **관리자 데스크톱 레이아웃**: 좌측 사이드바 (240px) — `app/admin/layout.tsx`로 분리
- **두 레이아웃 혼용 금지**: 관리자 페이지에 모바일 내비게이션 바 포함 금지, 반대도 금지
- **루트 레이아웃** (`app/layout.tsx`): 전역 Provider (ThemeProvider 등)만 포함

---

## 8. Data Model Rules

- **목표 스키마** (PRD 기준):
  - `users` (id, email, name, avatar_url, role, created_at, updated_at)
  - `events` (id, title, description, location, event_date, cover_image_url, invite_code, status, created_by, created_at, updated_at)
  - `event_participants` (id, event_id, user_id, role, joined_at)
- **현재 상태**: `profiles` 테이블만 존재 — Task 007에서 스키마 전환 예정
- **RLS 필수**: 테이블 생성 시 반드시 Row Level Security 정책 동시 설정
  - `events`: `created_by = auth.uid()` 인 경우만 UPDATE/DELETE 허용
  - `event_participants`: `user_id = auth.uid()` 인 경우만 INSERT/DELETE 허용
- **invite_code**: `nanoid()` 또는 `uuid` 기반 고유 코드 자동 생성, DB 레벨 UNIQUE 제약 필수

---

## 9. Styling Rules

- **CSS 프레임워크**: Tailwind CSS v3 (`tailwind.config.ts` 존재)
- **Primary Color**: Emerald 500 (`#10B981`) — 버튼, 활성 상태, 강조
- **Accent Color**: Amber 500 (`#F59E0B`)
- **다크 모드**: `next-themes` 사용 — 모든 컴포넌트에 dark: 변형 적용
- **모바일 터치 영역**: 버튼 최소 높이 `min-h-[48px]`
- **카드 스타일**: `rounded-2xl shadow-md` 기본
- **`cn()` 유틸**: `lib/utils.ts`의 `cn()` 함수로 클래스 결합 — `clsx` + `tailwind-merge` 조합

---

## 10. Feature Implementation Rules

### 이벤트 생성/수정
- 폼 상태: `react-hook-form` + `zod` 스키마 검증 사용
- 이미지 업로드: Supabase Storage `event-covers` 버킷, 최대 5MB, jpg/png/webp만 허용
- `invite_code` 생성: 이벤트 INSERT 시 DB 트리거 또는 서버 액션에서 자동 생성

### 실시간 참여자 목록
- `supabase.channel()` + `postgres_changes` 이벤트로 `event_participants` 테이블 구독
- Client Component에서만 Realtime 구독 — Server Component에서 구독 금지
- 컴포넌트 언마운트 시 반드시 `channel.unsubscribe()` 호출

### 관리자 기능
- `/admin/*` 접근 시 서버에서 `role === 'admin'` 검증 필수 (미들웨어 + 페이지 레벨 이중 체크)
- 통계 쿼리: Supabase RPC 함수 또는 서버 액션에서 처리 — 클라이언트에서 집계 쿼리 금지

---

## 11. File Interaction Rules

| 변경 대상 | 동시 수정 필요 파일 |
|-----------|-------------------|
| DB 스키마 변경 | `lib/supabase/types.ts` regenerate 필수 |
| 새 라우트 추가 | `docs/ROADMAP.md` Task 체크박스 업데이트 |
| 미들웨어 인증 로직 변경 | `proxy.ts` (루트) + `lib/supabase/proxy.ts` 동시 확인 |
| shadcn 컴포넌트 추가 | `components.json` 자동 업데이트 확인 |
| 환경 변수 추가 | `.env.local` 추가 + `CLAUDE.md` Environment Variables 섹션 업데이트 |

---

## 12. Roadmap Task Rules

- **Task 완료 시**: `docs/ROADMAP.md`에서 해당 Task 항목 `- [ ]` → `- [x]` 업데이트 필수
- **Task 순서 엄수**: Phase 1 완료 전 Phase 2 시작 금지 (ROADMAP 구조 우선 접근법)
- **현재 Task**: Task 001 (프로젝트 구조 및 라우팅 설정) — Phase 1 첫 번째

---

## 13. Prohibited Actions

- **⛔** Supabase 클라이언트를 모듈 레벨 전역 변수로 선언
- **⛔** `components/ui/` 내 shadcn 파일을 직접 수동 편집 (shadcn CLI 우회)
- **⛔** Server Component에서 Supabase Realtime 구독
- **⛔** 개별 페이지에서 인증 여부 직접 체크 (미들웨어 역할 중복)
- **⛔** DB 타입을 `lib/supabase/types.ts` 외부에 중복 정의
- **⛔** 관리자 레이아웃과 모바일 레이아웃 혼용
- **⛔** `.env.local` 파일을 커밋에 포함
- **⛔** `Untitled` 파일 등 임시 메모 파일을 커밋에 포함
- **⛔** RLS 미설정 상태로 테이블 생성 후 기능 구현 진행
