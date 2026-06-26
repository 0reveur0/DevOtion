# DevOtion

Community-powered reviews for developer tools — honest opinions from real developers, not vendor marketing.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: Vite + React, Wouter (routing), TanStack Query, Tailwind CSS v4
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/devotion/` — Vite + React frontend
  - `src/constants/` — mock data (`mockData.ts`) and categories/tools (`categories.ts`)
  - `src/types/index.ts` — shared TypeScript types (Category, Tool, Review, User)
  - `src/pages/` — home, tool detail, category, profile, not-found
  - `src/components/` — navbar, footer, tool-card, category-card, search-bar
- `artifacts/api-server/` — Express 5 API
  - `src/routes/reviews.ts` — 9 review endpoints with integrity checks
  - `src/routes/tools.ts` — tools, categories, stats endpoints
- `lib/db/src/schema/` — Drizzle schema (reviews table + review_votes table)
- `lib/api-spec/openapi.yaml` — source of truth for API contract
- `lib/api-client-react/` — generated React Query hooks (run codegen to update)

## Architecture decisions

- Frontend uses local mock data (`constants/mockData.ts`) for tool list/pros/cons — real DB reviews overlay via API when available
- Reviews table has unique constraint on `(tool_slug, author_username)` — one review per user per tool
- `review_votes` table tracks individual upvotes; prevents self-vote and duplicates at DB level
- Auth is pre-implementation: ownership checks use client-supplied `authorUsername` — a real session/JWT system is a planned follow-up
- Category grid uses `gap-px bg-gray-200` mosaic pattern to achieve seamless tiled layout

## Product

- Browse and search developer tools across 9 categories (Frontend, Backend, Database, DevOps, Cloud, Mobile, AI, Testing, Design)
- View detailed tool pages with pros/cons panels and community reviews
- Upvote helpful reviews (no self-votes, no duplicates)
- Search with keyboard-driven dropdown autocomplete (`/` shortcut)
- Profile pages with review history

## User preferences

- **Design system**: Retro-Modern Tech (Option A) — `#f8f9fa` off-white background, white card surfaces, cobalt blue (`blue-600`) accents, `font-mono` for metrics/tags/breadcrumbs, solid `border-gray-200` borders, flat `shadow-[2px_2px_0px_0px_rgba(0,0,0,0.06)]` on hover. Zero gradients, zero blurs, zero neon borders.
- Grid layout: `grid gap-px bg-gray-200` mosaic for tool/category grids
- Absolutely NO dark slate theme, NO radial gradients, NO glowing borders

## Gotchas

- After editing `lib/db/src/schema/`, run `pnpm --filter @workspace/db run push` to apply to dev DB
- After editing `lib/api-spec/openapi.yaml`, run `pnpm --filter @workspace/api-spec run codegen` to regenerate client hooks
- API server port is 8080 internally (mapped to `/api` prefix via proxy); do not hardcode 5000

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
