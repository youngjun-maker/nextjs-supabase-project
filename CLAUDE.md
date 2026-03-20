# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

## Architecture

### Auth Flow

Authentication is handled entirely through Supabase Auth with cookie-based sessions (`@supabase/ssr`).

- `proxy.ts` — Next.js proxy (middleware) entry point. Calls `lib/supabase/proxy.ts:updateSession()` on every request to refresh the user session via cookies. Non-authenticated users are redirected to `/auth/login` for any route except `/` and `/auth/*`.
- `app/auth/confirm/route.ts` — OTP verification callback. Handles email confirmation links from Supabase.
- `app/protected/` — Route group requiring authentication. The proxy handles the redirect; no per-page auth checks needed.

### Supabase Client Pattern

Always create a new client per request/function — never use a global variable (required for Fluid compute compatibility).

- `lib/supabase/server.ts` — Server Components, Route Handlers, Server Actions. Uses `next/headers` cookies.
- `lib/supabase/client.ts` — Client Components only. Uses browser storage.
- `lib/supabase/proxy.ts` — Proxy/middleware only. Reads/writes cookies on the request/response.

### Database Types

`lib/supabase/types.ts` contains generated TypeScript types for the Supabase schema. Current tables: `profiles` (id, full_name, email, avatar_url, bio, website, created_at, updated_at). Convenience types `Profile`, `ProfileInsert`, `ProfileUpdate` are exported at the bottom.

To regenerate types after schema changes:
```bash
npx supabase gen types typescript --project-id <project-ref> > lib/supabase/types.ts
```

### UI

- shadcn/ui components live in `components/ui/`
- `components.json` configures shadcn (default style, Tailwind CSS)
- Theme switching is supported via `next-themes`
