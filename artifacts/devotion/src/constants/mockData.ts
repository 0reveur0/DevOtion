/**
 * Central data registry — imports domain files and assembles the unified
 * tool catalog and social review feed.
 *
 * Domain files:
 *   data/frontend.ts    → frontend + design tools
 *   data/backend.ts     → backend services and frameworks
 *   data/database.ts    → databases, ORMs, and data stores
 *   data/infra.ts       → DevOps, cloud, and mobile tools
 *   data/ai-testing.ts  → AI/ML, testing, and data engineering tools
 *   data/socialFeed.ts  → user profiles (MOCK_USERS) and reviews (SOCIAL_REVIEWS)
 */

import type { Category, CategorySlug } from '@/types'

import { FRONTEND_TOOLS } from './data/frontend'
import { BACKEND_TOOLS } from './data/backend'
import { DATABASE_TOOLS } from './data/database'
import { INFRA_TOOLS } from './data/infra'
import { AI_TESTING_TOOLS } from './data/ai-testing'
export { MOCK_USERS } from './data/socialFeed'
import { SOCIAL_REVIEWS, MOCK_USERS } from './data/socialFeed'

// ─── Category metadata ────────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  {
    slug: 'frontend',
    name: 'Frontend',
    description: 'UI frameworks, libraries, and tools for building user interfaces',
    icon: 'RiLayoutLine',
    color: 'text-blue-400',
  },
  {
    slug: 'backend',
    name: 'Backend',
    description: 'Server-side frameworks, APIs, and backend services',
    icon: 'RiServerLine',
    color: 'text-violet-400',
  },
  {
    slug: 'database',
    name: 'Database',
    description: 'Database systems, ORMs, and data management tools',
    icon: 'RiDatabase2Line',
    color: 'text-emerald-400',
  },
  {
    slug: 'devops',
    name: 'DevOps',
    description: 'CI/CD, containerization, and infrastructure tools',
    icon: 'RiGitBranchLine',
    color: 'text-orange-400',
  },
  {
    slug: 'cloud',
    name: 'Cloud',
    description: 'Cloud platforms and cloud-native services',
    icon: 'RiCloudLine',
    color: 'text-sky-400',
  },
  {
    slug: 'mobile',
    name: 'Mobile',
    description: 'Mobile development frameworks and tools',
    icon: 'RiSmartphoneLine',
    color: 'text-pink-400',
  },
  {
    slug: 'ai',
    name: 'AI / ML',
    description: 'Machine learning, AI APIs, and LLM tools',
    icon: 'RiBrainLine',
    color: 'text-yellow-400',
  },
  {
    slug: 'testing',
    name: 'Testing',
    description: 'Testing frameworks, tools, and quality assurance',
    icon: 'RiTestTubeLine',
    color: 'text-red-400',
  },
  {
    slug: 'design',
    name: 'Design',
    description: 'Design tools, UI kits, and prototyping platforms',
    icon: 'RiPaletteLine',
    color: 'text-fuchsia-400',
  },
]

// ─── Unified tool catalog (110+ tools) ───────────────────────────────────────
export const ALL_TOOLS = [
  ...FRONTEND_TOOLS,
  ...BACKEND_TOOLS,
  ...DATABASE_TOOLS,
  ...INFRA_TOOLS,
  ...AI_TESTING_TOOLS,
]

/** Alias for the unified catalog — use either name */
export const devTools = ALL_TOOLS

// ─── Derived views ────────────────────────────────────────────────────────────
export const TOOLS_BY_CATEGORY: Record<CategorySlug, typeof ALL_TOOLS> = {
  frontend: ALL_TOOLS.filter((t) => t.category === 'frontend'),
  backend: ALL_TOOLS.filter((t) => t.category === 'backend'),
  database: ALL_TOOLS.filter((t) => t.category === 'database'),
  devops: ALL_TOOLS.filter((t) => t.category === 'devops'),
  cloud: ALL_TOOLS.filter((t) => t.category === 'cloud'),
  mobile: ALL_TOOLS.filter((t) => t.category === 'mobile'),
  ai: ALL_TOOLS.filter((t) => t.category === 'ai'),
  testing: ALL_TOOLS.filter((t) => t.category === 'testing'),
  design: ALL_TOOLS.filter((t) => t.category === 'design'),
}

export const TOP_RATED_TOOLS = [...ALL_TOOLS]
  .sort((a, b) => b.avgRating - a.avgRating || b.totalReviews - a.totalReviews)
  .slice(0, 6)

export const FEATURED_TOOLS = ALL_TOOLS.filter((t) =>
  ['react', 'postgresql', 'supabase', 'vite', 'nextjs', 'drizzle-orm'].includes(t.slug)
)

// ─── Reviews — SOCIAL_REVIEWS is the canonical source; MOCK_REVIEWS aliases it
export const MOCK_REVIEWS = SOCIAL_REVIEWS

/** Alias — use either name */
export const socialReviews = SOCIAL_REVIEWS

// ─── Default profile for profile page demo ────────────────────────────────────
export const MOCK_USER = MOCK_USERS.tuan_fullstack
