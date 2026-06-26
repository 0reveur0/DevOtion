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

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'xs' }) {
  const cls = size === 'xs' ? 'h-3 w-3' : 'h-3.5 w-3.5'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= Math.floor(rating) ? (
          <RiStarFill key={star} className={cn(cls, 'text-amber-500')} />
        ) : (
          <RiStarLine key={star} className={cn(cls, 'text-gray-300')} />
        )
      )}
      <span className={cn('ml-1 font-mono font-semibold text-amber-600', size === 'xs' ? 'text-xs' : 'text-sm')}>
        {rating.toFixed(1)}
      </span>
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
      <div className="min-h-screen bg-[#f8f9fa] py-20 text-center">
        <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">404 — not found</p>
        <h1 className="text-2xl font-bold text-gray-900">Tool Not Found</h1>
        <p className="mt-2 text-sm text-gray-500">The tool you're looking for doesn't exist.</p>
        <Link href="/">
          <button className="mt-6 inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors">
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
    <div className="min-h-screen bg-[#f8f9fa] py-8">
      <div className="container max-w-4xl">

        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 font-mono text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-700 transition-colors">home</Link>
          <span>/</span>
          <Link href={`/category/${tool.category}`} className="hover:text-gray-700 transition-colors">
            {category.toLowerCase()}
          </Link>
          <span>/</span>
          <span className="text-gray-700">{tool.slug}</span>
        </nav>

        {/* ── Tool Header ───────────────────────────────────────────── */}
        <div className="border border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gray-200 bg-gray-100 font-mono text-xl font-bold text-gray-500">
                {tool.name.charAt(0)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-900">{tool.name}</h1>
                  <span className="border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-xs text-gray-500">
                    {category}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-gray-600 max-w-lg leading-relaxed">{tool.description}</p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <StarRating rating={tool.avgRating} />
                  <div className="flex items-center gap-1.5 text-gray-400 font-mono text-xs">
                    <RiChatQuoteLine className="h-3.5 w-3.5" />
                    <span>{tool.totalReviews.toLocaleString()} reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 gap-2">
              {tool.websiteUrl && (
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
                >
                  <RiExternalLinkLine className="h-3.5 w-3.5" />
                  Website
                </a>
              )}
              {tool.githubUrl && (
                <a
                  href={tool.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
                >
                  <RiGithubLine className="h-3.5 w-3.5" />
                  GitHub
                </a>
              )}
            </div>
          </div>

          {tool.longDescription && (
            <p className="mt-5 border-t border-gray-100 pt-5 text-sm text-gray-600 leading-relaxed">
              {tool.longDescription}
            </p>
          )}
        </div>

        {/* ── Pros & Cons ───────────────────────────────────────────── */}
        {(tool.pros?.length || tool.cons?.length) && (
          <div className="mt-4 grid gap-px bg-gray-200 sm:grid-cols-2">
            {tool.pros && tool.pros.length > 0 && (
              <div className="bg-white p-5">
                <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <RiCheckLine className="h-4 w-4 text-emerald-600" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Pros</h3>
                </div>
                <ul className="space-y-2">
                  {tool.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-emerald-500" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tool.cons && tool.cons.length > 0 && (
              <div className="bg-white p-5">
                <div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-3">
                  <RiCloseLine className="h-4 w-4 text-red-500" />
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Cons</h3>
                </div>
                <ul className="space-y-2">
                  {tool.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-red-400" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ── Reviews ───────────────────────────────────────────────── */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Community Reviews
                {mockReviews.length > 0 && (
                  <span className="ml-2 border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-xs font-medium text-gray-500">
                    {mockReviews.length}
                  </span>
                )}
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">Honest experiences from real developers</p>
            </div>
            <button className="border border-blue-600 bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700">
              Write a Review
            </button>
          </div>

          {mockReviews.length > 0 ? (
            <div className="flex flex-col gap-px bg-gray-200">
              {mockReviews.map((review) => {
                const isUpvoted = upvoted.has(review.id)
                return (
                  <div key={review.id} className="bg-white p-5">
                    {/* Review header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.authorAvatar ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.authorUsername}`}
                          alt={review.authorUsername}
                          className="h-8 w-8 border border-gray-200 bg-gray-100"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">@{review.authorUsername}</p>
                          <StarRating rating={review.rating} size="xs" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 font-mono text-xs text-gray-400">
                        <RiCalendarLine className="h-3 w-3" />
                        {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>

                    {/* Review content */}
                    <div className="mt-3 border-l-2 border-blue-200 pl-3">
                      <p className="text-sm font-semibold text-gray-900">{review.title}</p>
                      <p className="mt-1 text-sm text-gray-600 leading-relaxed">{review.content}</p>
                    </div>

                    {/* Upvote */}
                    <div className="mt-4 flex items-center border-t border-gray-100 pt-3">
                      <button
                        onClick={() => toggleUpvote(review.id)}
                        className={cn(
                          'inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-xs font-medium transition-all',
                          isUpvoted
                            ? 'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100'
                            : 'border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:text-gray-700'
                        )}
                      >
                        {isUpvoted ? (
                          <RiThumbUpFill className="h-3 w-3" />
                        ) : (
                          <RiThumbUpLine className="h-3 w-3" />
                        )}
                        Helpful · {upvoteCounts[review.id] ?? review.upvotes}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="border border-gray-200 bg-white py-14 text-center">
              <RiChatQuoteLine className="mx-auto h-8 w-8 text-gray-300" />
              <p className="mt-3 text-sm font-semibold text-gray-700">No reviews yet</p>
              <p className="mt-1 text-xs text-gray-500">
                Be the first to share your experience with {tool.name}.
              </p>
              <button className="mt-5 inline-flex items-center gap-2 border border-blue-600 bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors">
                Write the first review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
