import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ReviewCard from '../../../components/review-card'
import {
  devTools,
  socialReviews,
  MOCK_USERS,
  CATEGORIES,
} from '../../../artifacts/devotion/src/constants/mockData'
import Link from 'next/link'
import {
  RiExternalLinkLine,
  RiGithubLine,
  RiStarLine,
  RiChatQuoteLine,
} from '@remixicon/react'

type Params = {
  params: { slug: string }
}

const ALL_TOOLS = devTools

export async function generateStaticParams() {
  return ALL_TOOLS.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Params) {
  const tool = ALL_TOOLS.find((t) => t.slug === params.slug)
  if (!tool) {
    return {
      title: 'Tool Not Found | DevOtion',
      description: 'Requested tool does not exist in DevOtion.',
    }
  }

  const title = `${tool.name} Reviews - DevOtion`
  const description = `Read honest developer reviews for ${tool.name}. ${tool.description}`

  const siteUrl = 'https://devotion.app'
  const url = `${siteUrl}/tools/${tool.slug}`

  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630'><rect width='100%' height='100%' fill='#F8F9FA'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#1A1A1E' font-family='sans-serif' font-size='48'>${tool.name} — DevOtion</text></svg>`
  )

  const image = `data:image/svg+xml;utf8,${svg}`

  const keywords = [tool.name, tool.slug, tool.category, 'developer tools', 'reviews']

  const metadata: Metadata = {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: 'DevOtion',
      images: [{ url: image, alt: `${tool.name} on DevOtion` }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }

  return metadata
}

export default async function ToolPage({ params }: Params) {
  const { slug } = params
  const tool = ALL_TOOLS.find((t) => t.slug === slug)

  if (!tool) {
    notFound()
  }

  const categoryMeta = CATEGORIES.find((c) => c.slug === tool.category)

  const reviews = (socialReviews as any)[slug] ?? []

  const enriched = reviews.map((r: any) => ({
    ...r,
    authorName: MOCK_USERS[r.authorUsername]?.name ?? r.authorUsername,
    authorHeadline: MOCK_USERS[r.authorUsername]?.bio ?? undefined,
    verified: false,
  }))

  return (
    <div className="py-12">
      <div className="container max-w-6xl">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">
            Home
          </Link>
          <span className="text-sm text-zinc-400">/</span>
          <Link href={`/category/${tool.category}`} className="text-sm text-zinc-600 hover:text-zinc-900">
            {categoryMeta?.name ?? tool.category}
          </Link>
          <span className="text-sm text-zinc-400">/</span>
          <span className="text-sm font-medium text-zinc-900">{tool.name}</span>
        </div>

        <header className="rounded-lg border border-zinc-200 bg-white p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-zinc-50 text-2xl font-bold text-zinc-900">
                {tool.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-zinc-900">{tool.name}</h1>
                  <span className={`rounded-md px-2 py-1 text-xs font-medium`} style={{ backgroundColor: 'rgba(240,249,255,0.6)' }}>
                    {categoryMeta?.name}
                  </span>
                </div>
                <p className="mt-2 text-zinc-600">{tool.description}</p>
                <div className="mt-3 flex items-center gap-4 text-sm font-mono text-zinc-700">
                  <div className="flex items-center gap-1">
                    <RiStarLine className="h-4 w-4 text-amber-400" />
                    <span className="font-mono text-sm">{tool.avgRating.toFixed(1)}</span>
                    <span className="text-zinc-400">/5</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-500">
                    <RiChatQuoteLine className="h-4 w-4" />
                    <span className="font-mono text-sm">{tool.totalReviews.toLocaleString()}</span>
                    <span className="text-zinc-400">reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {tool.websiteUrl && (
                <a href={tool.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                  <RiExternalLinkLine className="h-4 w-4" />
                  Website
                </a>
              )}
              {tool.githubUrl && (
                <a href={tool.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
                  <RiGithubLine className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </header>

        <main className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <section className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-zinc-900">Social Review Feed</h2>
            </div>

            <div className="flex flex-col gap-4">
              {enriched.length === 0 && (
                <div className="rounded-md border border-zinc-100 bg-zinc-50 p-6 text-zinc-600">No reviews yet — be the first to write one.</div>
              )}

              {enriched.map((r: any) => (
                <ReviewCard
                  key={r.id}
                  review={r}
                  authorName={r.authorName}
                  authorHeadline={r.authorHeadline}
                  verified={r.verified}
                />
              ))}
            </div>
          </section>

          <aside className="md:col-span-1">
            <div className="rounded-lg border border-zinc-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-zinc-900">Quick Spec</h3>
              <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-700">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-zinc-500">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    {(tool.pros || []).slice(0, 4).map((t: string, i: number) => (
                      <span key={i} className="rounded-md bg-zinc-50 px-2 py-1 text-xs text-zinc-700">{t.split(' ')[0]}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-zinc-500">Package size</div>
                  <div className="text-sm font-mono text-zinc-800">—</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-zinc-500">License</div>
                  <div className="text-sm font-mono text-zinc-800">—</div>
                </div>

                <div className="mt-4">
                  <button className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white">Write a Review</button>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>
    </div>
  )
}
