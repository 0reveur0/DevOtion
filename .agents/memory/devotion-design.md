---
name: DevOtion design system
description: Retro-Modern Tech aesthetic applied to DevOtion — the specific design choices and what to avoid
---

# DevOtion Design System

## The rule
Use the **Retro-Modern Tech** aesthetic (Option A from user's brief). Any future UI work must follow these rules exactly.

**Why:** User explicitly rejected the generic dark slate / AI SaaS template look and provided a detailed brief specifying this direction.

## How to apply

### Colors
- Page background: `bg-[#f8f9fa]` (off-white)
- Card/surface: `bg-white`
- Primary text: `text-gray-900`
- Secondary text: `text-gray-500`
- Muted text: `text-gray-400`
- Borders: `border-gray-200` (standard), `border-gray-300` (hover emphasis)
- Accent: `text-blue-600` / `bg-blue-600` (#2563eb cobalt blue) — used sparingly for CTAs, links, active states
- Accent light: `bg-blue-50` for hover backgrounds

### Typography
- Regular UI text: Inter (default font-sans)
- **Metrics, numbers, ratings, tags, breadcrumbs, dates, counts**: `font-mono`
- Monospace in: ToolCard rating/count, breadcrumb paths, section eyebrows ("TOP RATED"), stat badges, footer copyright

### Borders & shadows
- Standard card: `border border-gray-200 bg-white`
- Hover state: `hover:border-gray-400`
- Flat hover shadow (not ambient blur): `hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.06)]`
- Elevated element (CTA box): `shadow-[4px_4px_0px_0px_rgba(0,0,0,0.04)]`
- NO `shadow-lg`, NO `blur-*`, NO backdrop-blur

### Grids
- Tool/category grids use mosaic pattern: `grid gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-3`
  - Each cell is `bg-white` (gap-px + bg-gray-200 creates hairline separators)

### Tags / badges
- GitHub-label style: `border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-xs text-gray-500`
- No rounded-full pills, no colored backgrounds unless category-specific

### Buttons
- Primary: `border border-blue-600 bg-blue-600 text-white hover:bg-blue-700` (no rounded-xl, just `border`)
- Secondary: `border border-gray-200 bg-white text-gray-600 hover:border-gray-400`

### Rounding
- Minimal: no `rounded-2xl`, no `rounded-xl`
- Use `rounded` (4px) at most for subtle softening
- Prefer sharp corners on cards, inputs, buttons

## What NOT to do
- ❌ `bg-slate-*` (any shade)
- ❌ `bg-gradient-*` or `from-*/to-*`
- ❌ `blur-*`, `backdrop-blur`
- ❌ `ring-*` glow effects
- ❌ `rounded-2xl`, `rounded-xl`
- ❌ Translucent borders (`border-white/10`, `bg-white/5`)
- ❌ The `.dark` class or any `dark:` prefix
