import { useState } from 'react'
import { useParams, Link } from 'wouter'
import {
  RiArrowLeftLine,
  RiExternalLinkLine,
  RiGithubLine,
  RiStarFill,
  RiStarLine,
  RiChatQuoteLine,
  RiThumbUpLine,
  RiThumbUpFill,
  RiCheckLine,
  RiCloseLine,
  RiCalendarLine,
  RiArrowUpLine,
} from '@remixicon/react'
import { cn } from '@/lib/utils'
import { ALL_TOOLS, MOCK_REVIEWS } from '@/constants'

const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  cloud: 'Cloud',
  mobile: 'Mobile',
  ai: 'AI / ML',
  testing: 'Testing',
  design: 'Design',
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(rating)
        return filled ? (
          <RiStarFill key={star} className="h-4 w-4 text-amber-400" />
        ) : (
          <RiStarLine key={star} className="h-4 w-4 text-slate-600" />
        )
      })}
      <span className="ml-1.5 text-sm font-semibold text-amber-400">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>()
  const tool = ALL_TOOLS.find((t) => t.slug === slug)
  const mockReviews = MOCK_REVIEWS[slug ?? ''] ?? []
  const [upvoted, setUpvoted] = useState<Set<string>>(new Set())
  const [upvoteCounts, setUpvoteCounts] = useState<Record<string, number>>(
    Object.fromEntries(mockReviews.map((r) => [r.id, r.upvotes]))
  )

  if (!tool) {
    return (
      <div className="min-h-screen bg-slate-950 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">Tool Not Found</h1>
        <p className="mt-2 text-slate-400">The tool you're looking for doesn't exist.</p>
        <Link href="/">
          <button className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800">
            <RiArrowLeftLine className="h-4 w-4" />
            Back to Home
          </button>
        </Link>
      </div>
    )
  }

  const category = CATEGORY_LABELS[tool.category] || tool.category

  function toggleUpvote(reviewId: string) {
    setUpvoted((prev) => {
      const next = new Set(prev)
      if (next.has(reviewId)) {
        next.delete(reviewId)
        setUpvoteCounts((c) => ({ ...c, [reviewId]: (c[reviewId] ?? 0) - 1 }))
      } else {
        next.add(reviewId)
        setUpvoteCounts((c) => ({ ...c, [reviewId]: (c[reviewId] ?? 0) + 1 }))
      }
      return next
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="container max-w-4xl">

        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/category/${tool.category}`} className="hover:text-slate-300 transition-colors">{category}</Link>
          <span>/</span>
          <span className="text-slate-300">{tool.name}</span>
        </nav>

        {/* ── Tool Header ─────────────────────────────────────────── */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-7">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-5">
              {/* Avatar */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 ring-1 ring-slate-700 text-2xl font-extrabold text-indigo-300">
                {tool.name.charAt(0)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">{tool.name}</h1>
                  <span className="rounded-lg bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-400 ring-1 ring-slate-700">
                    {category}
                  </span>
                </div>
                <p className="mt-2 text-slate-400 max-w-lg">{tool.description}</p>

                {/* Rating bar */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  <StarRating rating={tool.avgRating} />
                  <span className="text-slate-600">·</span>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <RiChatQuoteLine className="h-4 w-4" />
                    <span>{tool.totalReviews.toLocaleString()} reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-shrink-0 gap-2">
              {tool.websiteUrl && (
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:border-slate-600 hover:bg-slate-700 transition-colors"
                >
                  <RiExternalLinkLine className="h-4 w-4" />
                  Website
                </a>
              )}
              {tool.githubUrl && (
                <a
                  href={tool.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:border-slate-600 hover:bg-slate-700 transition-colors"
                >
                  <RiGithubLine className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* Long description */}
          {tool.longDescription && (
            <p className="mt-6 border-t border-slate-800 pt-6 text-slate-400 leading-relaxed">
              {tool.longDescription}
            </p>
          )}
        </div>

        {/* ── Pros & Cons ─────────────────────────────────────────── */}
        {(tool.pros?.length || tool.cons?.length) && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {/* Pros */}
            {tool.pros && tool.pros.length > 0 && (
              <div className="rounded-2xl border border-emerald-900/40 bg-emerald-950/20 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15">
                    <RiCheckLine className="h-4 w-4 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-emerald-400">Pros</h3>
                </div>
                <ul className="space-y-2.5">
                  {tool.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <RiCheckLine className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cons */}
            {tool.cons && tool.cons.length > 0 && (
              <div className="rounded-2xl border border-red-900/40 bg-red-950/20 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500/15">
                    <RiCloseLine className="h-4 w-4 text-red-400" />
                  </div>
                  <h3 className="font-semibold text-red-400">Cons</h3>
                </div>
                <ul className="space-y-2.5">
                  {tool.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <RiCloseLine className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ── Reviews ─────────────────────────────────────────────── */}
        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                Community Reviews{' '}
                {mockReviews.length > 0 && (
                  <span className="ml-1 rounded-lg bg-slate-800 px-2 py-0.5 text-sm font-medium text-slate-400">
                    {mockReviews.length}
                  </span>
                )}
              </h2>
              <p className="mt-1 text-sm text-slate-500">Honest experiences from real developers</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">
              Write a Review
            </button>
          </div>

          {mockReviews.length > 0 ? (
            <div className="space-y-4">
              {mockReviews.map((review) => {
                const isUpvoted = upvoted.has(review.id)
                return (
                  <div
                    key={review.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-colors hover:border-slate-700"
                  >
                    {/* Review header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.authorAvatar ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.authorUsername}`}
                          alt={review.authorUsername}
                          className="h-9 w-9 rounded-full bg-slate-800 ring-1 ring-slate-700"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-200">@{review.authorUsername}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <StarRating rating={review.rating} />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 text-xs text-slate-600">
                        <RiCalendarLine className="h-3.5 w-3.5" />
                        {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>

                    {/* Review content */}
                    <div className="mt-4">
                      <p className="font-semibold text-slate-100">{review.title}</p>
                      <p className="mt-2 text-sm text-slate-400 leading-relaxed">{review.content}</p>
                    </div>

                    {/* Upvote */}
                    <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4">
                      <button
                        onClick={() => toggleUpvote(review.id)}
                        className={cn(
                          'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                          isUpvoted
                            ? 'bg-indigo-600/20 text-indigo-400 ring-1 ring-indigo-500/40 hover:bg-indigo-600/30'
                            : 'bg-slate-800 text-slate-500 ring-1 ring-slate-700 hover:bg-slate-700 hover:text-slate-300'
                        )}
                      >
                        {isUpvoted ? (
                          <RiThumbUpFill className="h-3.5 w-3.5" />
                        ) : (
                          <RiThumbUpLine className="h-3.5 w-3.5" />
                        )}
                        Helpful · {upvoteCounts[review.id] ?? review.upvotes}
                      </button>
                      <div className="flex items-center gap-1 text-xs text-slate-700">
                        <RiArrowUpLine className="h-3.5 w-3.5" />
                        <span>{upvoteCounts[review.id] ?? review.upvotes} upvotes</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 py-16 text-center">
              <RiChatQuoteLine className="mx-auto h-10 w-10 text-slate-700" />
              <p className="mt-3 font-semibold text-slate-400">No reviews yet</p>
              <p className="mt-1 text-sm text-slate-600">
                Be the first to share your experience with {tool.name}.
              </p>
              <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors">
                Write the first review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
