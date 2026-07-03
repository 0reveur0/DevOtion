import type { Tool as DevTool } from '../artifacts/devotion/src/constants/mockData'

// Minimal local Tool type to keep compatibility across modules
export type Tool = {
  slug: string
  name: string
  category: string
  description?: string
  avgRating?: number
  totalReviews?: number
  pros?: string[]
}

// Curated alternative map for precision recommendations
const CURATED_ALTERNATIVES: Record<string, string[]> = {
  zod: ['valibot', 'arktype'],
  zod_ts: ['valibot', 'arktype'],
  lodash: ['radash'],
  elasticsearch: ['meilisearch', 'typesense'],
  'meilisearch': ['typesense', 'elasticsearch'],
  nextjs: ['vite', 'astro'],
  react: ['preact', 'solidjs'],
  prometheus: ['victoria-metrics', 'thanos'],
}

// Curated companions mapping
const CURATED_COMPANIONS: Record<string, string[]> = {
  nextjs: ['react-hook-form', 'zod', 'tanstack-query'],
  react: ['tailwind-css', 'shadcn-ui', 'react-hook-form'],
  prometheus: ['grafana', 'vector'],
  elasticsearch: ['kibana', 'logstash'],
  kafka: ['kafka-connect', 'ksql'],
}

// Keyword-based subcategory inference
const SUBCATEGORY_KEYWORDS: { name: string; keywords: string[] }[] = [
  { name: 'Schema Validation', keywords: ['zod', 'valibot', 'arktype', 'superstruct'] },
  { name: 'RPC Framework', keywords: ['trpc', 'grpc', 'json-rpc', 'rpc'] },
  { name: 'Search Engine', keywords: ['elasticsearch', 'meilisearch', 'typesense'] },
  { name: 'Background Jobs', keywords: ['bull', 'sidekiq', 'bee-queue', 'rq'] },
  { name: 'AI Orchestration', keywords: ['llama', 'ollama', 'ray', 'kubernetes'] },
  { name: 'UI Component', keywords: ['shadcn', 'mantine', 'chakra', 'material'] },
  { name: 'State Management', keywords: ['zustand', 'redux', 'tanstack', 'recoil'] },
  { name: 'Build Tool', keywords: ['vite', 'webpack', 'rollup'] },
  { name: 'Database', keywords: ['postgres', 'clickhouse', 'mongodb', 'redis'] },
]

export function inferSubcategory(tool: Tool): string {
  const needle = `${tool.slug} ${tool.name}`.toLowerCase()
  for (const entry of SUBCATEGORY_KEYWORDS) {
    for (const kw of entry.keywords) {
      if (needle.includes(kw)) return entry.name
    }
  }
  return 'General'
}

function uniqueBySlug(list: Tool[]) {
  const seen = new Set<string>()
  return list.filter((t) => {
    if (seen.has(t.slug)) return false
    seen.add(t.slug)
    return true
  })
}

export function findAlternatives(current: Tool, all: Tool[], limit = 3): Tool[] {
  // 1) curated list
  const curated = CURATED_ALTERNATIVES[current.slug] ?? []
  const byCurated = curated.map((s) => all.find((t) => t.slug === s)).filter(Boolean) as Tool[]
  if (byCurated.length > 0) return byCurated.slice(0, limit)

  // 2) infer subcategory and pick others in same subcategory sorted by closeness in rating
  const sub = inferSubcategory(current)
  const candidates = all.filter((t) => t.slug !== current.slug && inferSubcategory(t) === sub)

  candidates.sort((a, b) => {
    const ad = Math.abs((a.avgRating ?? 0) - (current.avgRating ?? 0))
    const bd = Math.abs((b.avgRating ?? 0) - (current.avgRating ?? 0))
    return ad - bd
  })

  return uniqueBySlug(candidates).slice(0, limit)
}

export function findCompanions(current: Tool, all: Tool[], limit = 3): Tool[] {
  // 1) curated companions
  const curated = CURATED_COMPANIONS[current.slug] ?? []
  const byCurated = curated.map((s) => all.find((t) => t.slug === s)).filter(Boolean) as Tool[]
  if (byCurated.length > 0) return byCurated.slice(0, limit)

  // 2) complementary categories heuristic
  const category = current.category
  const complementMap: Record<string, string[]> = {
    frontend: ['state-management', 'design', 'testing'],
    backend: ['database', 'observability', 'jobs'],
    database: ['observability', 'big-data'],
    devops: ['observability', 'cloud'],
    cloud: ['devops', 'database'],
    ai: ['observability', 'database'],
    'big-data': ['database', 'jobs'],
  }

  const companionsCats = complementMap[category] ?? [category]
  const candidates = all.filter((t) => companionsCats.includes(t.category) && t.slug !== current.slug)

  // rank by frequency of co-occurrence in short description words
  const currentWords = (current.description ?? '').toLowerCase().split(/\W+/).filter(Boolean)
  candidates.sort((a, b) => {
    const ascore = (a.description ?? '').toLowerCase().split(/\W+/).filter(Boolean).filter((w) => currentWords.includes(w)).length
    const bscore = (b.description ?? '').toLowerCase().split(/\W+/).filter(Boolean).filter((w) => currentWords.includes(w)).length
    return bscore - ascore
  })

  return uniqueBySlug(candidates).slice(0, limit)
}

export function oneLineSummary(tool: Tool): string {
  if (!tool.description) return ''
  const idx = tool.description.indexOf('.')
  if (idx === -1) return tool.description
  return tool.description.slice(0, idx + 1)
}
