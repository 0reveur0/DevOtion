import type { Metadata } from 'next'
import Link from 'next/link'
import { RiStarFill, RiArrowLeftLine } from '@remixicon/react'
import {
  devTools,
  CATEGORIES,
} from '../../../artifacts/devotion/src/constants/mockData'

type Props = { params: { slug: string } }

const SUPPORTED_SLUGS = ['frontend', 'backend', 'database', 'devops-cloud', 'api-testing', 'testing', 'ai-editors']

function resolveCategorySlugs(slug: string): string[] {
  if (slug === 'devops-cloud') return ['devops', 'cloud']
  if (slug === 'api-testing') return ['backend', 'testing']
  if (slug === 'ai-editors') return ['ai']
  return [slug]
}

const SUBCATEGORY_MAP: { name: string; keywords: string[] }[] = [
  { name: 'Frameworks / Libraries', keywords: ['react', 'vue', 'svelte', 'next', 'nuxt', 'angular', 'solid', 'qwik', 'astro', 'remix'] },
  { name: 'CSS / UI Styling', keywords: ['tailwind', 'shadcn', 'css', 'figma'] },
  { name: 'Build Tools', keywords: ['vite', 'webpack', 'rollup', 'parcel'] },
  { name: 'State Management', keywords: ['redux', 'zustand', 'recoil', 'mobx'] },
  { name: 'Databases', keywords: ['postgres', 'postgresql', 'mysql', 'mongodb', 'redis', 'supabase', 'drizzle'] },
  { name: 'Cloud & Platform', keywords: ['vercel', 'railway', 'supabase', 'aws', 'gcp', 'heroku'] },
  { name: 'DevOps & Infra', keywords: ['docker', 'kubernetes', 'terraform'] },
  { name: 'Testing & E2E', keywords: ['playwright', 'vitest', 'cypress', 'jest'] },
  { name: 'AI / Models & Tools', keywords: ['anthropic', 'ollama', 'openai', 'mistral', 'llama'] },
]

function assignSubcategory(tool: any) {
  const needle = `${(tool.slug || '')} ${tool.name || ''}`.toLowerCase()
  for (const entry of SUBCATEGORY_MAP) {
    for (const kw of entry.keywords) {
      if (needle.includes(kw)) return entry.name
    }
  }
  return 'Other'
}

export async function generateStaticParams() {
  return SUPPORTED_SLUGS.map((s) => ({ slug: s }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params
  if (!SUPPORTED_SLUGS.includes(slug)) {
    return {
      title: 'Category Not Found | DevOtion',
      description: 'Requested category does not exist on DevOtion.',
    }
  }
  const categorySlugs = resolveCategorySlugs(slug)
  const categoryMeta = CATEGORIES.find((c) => categorySlugs.includes(c.slug))
  const displayName = (slug === 'devops-cloud' ? 'DevOps + Cloud' : slug === 'api-testing' ? 'API & Testing' : slug === 'ai-editors' ? 'AI & Editors' : categoryMeta?.name ?? slug)

  const title = `${displayName} Tools — DevOtion`
  const description = `Explore ${displayName} tools and read developer reviews, comparisons, and specs on DevOtion.`

  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'><rect width='100%' height='100%' fill='#F8F9FA'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#1A1A1E' font-family='sans-serif' font-size='44'>${displayName} — DevOtion</text></svg>`
  )

  const image = `data:image/svg+xml;utf8,${svg}`

  return {
    title,
    description,
    keywords: [displayName, 'developer tools', 'reviews', 'comparison'],
    openGraph: {
      title,
      description,
      siteName: 'DevOtion',
      images: [{ url: image, alt: `${displayName} on DevOtion` }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = params

  if (!SUPPORTED_SLUGS.includes(slug)) {
    return (
      <div className="py-24">
        <div className="container max-w-3xl">
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-zinc-900">
            <h1 className="text-2xl font-bold text-zinc-900">404: Category Not Found</h1>
            <p className="mt-3 text-sm text-zinc-600">The category you requested does not exist or has been renamed. Please check the URL or return home.</p>
            <div className="mt-6">
              <Link href="/" className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                <RiArrowLeftLine className="h-4 w-4" />
                Back Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const categorySlugs = resolveCategorySlugs(slug)
  const filtered = devTools.filter((t: any) => categorySlugs.includes(t.category))

  const total = filtered.length

  const grouped: Record<string, any[]> = {}
  for (const tool of filtered) {
    const key = assignSubcategory(tool)
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(tool)
  }

  const subcategories = Object.keys(grouped)

  const categoryMeta = CATEGORIES.find((c) => categorySlugs.includes(c.slug))
  const displayName = (slug === 'devops-cloud' ? 'DevOps + Cloud' : slug === 'api-testing' ? 'API & Testing' : slug === 'ai-editors' ? 'AI & Editors' : categoryMeta?.name ?? slug)

  return (
    <div className="py-12">
      <div className="container max-w-6xl">
        <div className="rounded-md overflow-hidden">
          <div className="px-6 py-8" style={{ background: 'linear-gradient(90deg, rgba(249,250,251,1), rgba(245,251,255,0.6))' }}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-zinc-900">{displayName}</h1>
                <div className="mt-2 text-sm font-mono text-zinc-600">{total} Tools Listed</div>
              </div>
              <div className="hidden md:block">
                <div className="rounded-md bg-zinc-50 px-3 py-2 text-sm text-zinc-700">High-density developer view</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6 md:flex-row">
          <nav className="md:w-64 flex-shrink-0">
            <div className="rounded-md border border-zinc-200 bg-white p-3">
              <h4 className="text-sm font-semibold text-zinc-900">Sub-Categories</h4>
              <ul className="mt-3 flex flex-col gap-2">
                {subcategories.map((s) => (
                  <li key={s}>
                    <a href={`#${s.replace(/\s+/g, '-').toLowerCase()}`} className="block rounded-md border border-zinc-100 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <section className="flex-1">
            {subcategories.map((sub) => (
              <div key={sub} id={sub.replace(/\s+/g, '-').toLowerCase()} className="rounded-md border border-zinc-100 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-zinc-900">{sub}</h3>
                  <div className="text-xs font-mono text-zinc-500">{grouped[sub].length} items</div>
                </div>

                <div className="grid gap-2">
                  {grouped[sub].map((t) => (
                    <article key={t.slug} className="flex items-center justify-between gap-4 rounded-md border border-zinc-200 px-3 py-3 hover:border-zinc-900">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-semibold text-zinc-900">{t.name}</div>
                          <div className="text-xs rounded-md bg-zinc-50 px-2 py-1 text-zinc-700">{t.githubUrl ? 'Open Source' : 'Proprietary'}</div>
                        </div>
                        <div className="mt-1 text-sm text-zinc-600">{t.description}</div>
                      </div>

                      <div className="ml-4 flex items-center gap-3">
                        <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-500">
                          <RiStarFill className="h-4 w-4 text-amber-400" />
                          <span>{t.avgRating?.toFixed(1) ?? '—'}</span>
                          <span className="text-zinc-400">({t.totalReviews?.toLocaleString() ?? 0})</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  )
}
