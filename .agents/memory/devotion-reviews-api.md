---
name: DevOtion reviews API integrity
description: Shape and integrity rules for the 9 review API endpoints — response format, auth status, and constraints
---

# DevOtion Reviews API

## Response shape (important)
Single review endpoints return a **flat** `Review` object — NOT `{ review: Review }`.
- `POST /api/reviews` → `Review` (201)
- `GET /api/reviews/:id` → `Review`
- `PATCH /api/reviews/:id` → `Review`

List endpoints return `ReviewListResponse` = `{ reviews: Review[], pagination: {...} }`.

Every `Review` object must include `updatedAt` (ISO string) — the `GET /tools/:slug/reviews` route maps this from the DB record.

**Why:** Code review blocked twice on response envelope mismatches. The OpenAPI spec is the source of truth; always check `lib/api-spec/openapi.yaml` before adding new endpoints.

## Integrity constraints
- One review per (tool_slug, author_username) — enforced via DB unique constraint + 409 response
- Self-vote prevention: `review.authorUsername === voterUsername` → 403
- Duplicate vote prevention: `review_votes` table has unique (review_id, voter_username) + 409 response
- Owner-only PATCH/DELETE: check `existing.authorUsername !== req.body.authorUsername` → 403

## Auth status (pre-implementation)
Ownership and vote checks currently trust client-supplied `authorUsername` / `voterUsername` from request body. There is **no session or JWT system** — this is a known limitation, intentionally deferred as a follow-up task. Do not remove these checks; they still provide some deterrence and the DB constraints are the real enforcement layer.

## All 9 endpoints
1. `GET /api/reviews` — list with ?toolSlug, ?page, ?limit
2. `POST /api/reviews` — create (one per user per tool)
3. `GET /api/reviews/:id` — get single review
4. `PATCH /api/reviews/:id` — owner-only update
5. `DELETE /api/reviews/:id` — owner-only delete (204)
6. `POST /api/reviews/:id/upvote` — requires body `{ voterUsername }`
7. `DELETE /api/reviews/:id/upvote` — requires body `{ voterUsername }`
8. `GET /api/tools/:slug/reviews` — list reviews for a tool (includes updatedAt)
9. (stats, categories, tools — in tools.ts)

After adding/changing endpoints, always run: `pnpm --filter @workspace/api-spec run codegen`
