import React from 'react'
import Link from 'next/link'
import { RiGithubFill, RiCheckboxCircleLine, RiArrowLeftLine } from '@remixicon/react'
import ReviewCard from '../../../components/review-card'
import { MOCK_USERS, socialReviews, devTools } from '../../../artifacts/devotion/src/constants/mockData'

type Props = { params: { username: string } }

export default function ProfilePage({ params }: Props) {
  const { username } = params

  const user = (MOCK_USERS as any)[username]

  if (!user) {
    return (
      <div className="py-24">
        <div className="container max-w-3xl">
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-zinc-900">
            <h1 className="text-2xl font-bold text-zinc-900">404: Developer Profile Not Found</h1>
            <p className="mt-3 text-sm text-zinc-600">We couldn’t find a developer with that username. Try searching or return home.</p>
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

  // collect reviews authored by this user
  const allReviews = Object.values(socialReviews).flat() as any[]
  const userReviews = allReviews.filter((r) => r.authorUsername === username)

  const reviewsCount = userReviews.length
  const totalLikes = userReviews.reduce((s, r) => s + (r.upvotes ?? 0), 0)
  const commentsCount = userReviews.reduce((s, r) => s + ((r.comments && r.comments.length) || 0), 0)

  // tech stack tags derived from tool slugs the user reviewed
  const stackSlugs = Array.from(new Set(userReviews.map((r) => r.toolSlug)))
  const stackTools = stackSlugs.map((slug) => devTools.find((t: any) => t.slug === slug)).filter(Boolean)

  return (
    <div className="py-12">
      <div className="container max-w-6xl">
        <div className="mb-6">
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900">Home</Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Sidebar / Dev Passport */}
          <aside className="md:col-span-1">
            <div className="rounded-lg border border-zinc-200 bg-white p-6">
              <div className="flex items-start gap-4">
                <img src={user.avatar} alt={username} className="h-20 w-20 rounded-xl border border-zinc-200 object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-zinc-900">{user.name}</h2>
                    {user.githubVerified && (
                      <span className="ml-2 flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                        <RiGithubFill className="h-4 w-4" />
                        <RiCheckboxCircleLine className="h-4 w-4" />
                        GitHub Verified Contributor
                      </span>
                    )}
                  </div>
                  <div className="mt-1 font-mono text-xs text-zinc-500">@{user.username}</div>
                  {user.bio && <div className="mt-2 text-sm text-zinc-600">{user.bio}</div>}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-md border border-zinc-100 px-3 py-3">
                  <div className="text-xs font-mono text-zinc-500">Reviews Written</div>
                  <div className="mt-1 text-sm font-mono text-zinc-900">{reviewsCount}</div>
                </div>
                <div className="rounded-md border border-zinc-100 px-3 py-3">
                  <div className="text-xs font-mono text-zinc-500">Total Likes</div>
                  <div className="mt-1 text-sm font-mono text-zinc-900">{totalLikes}</div>
                </div>
                <div className="rounded-md border border-zinc-100 px-3 py-3">
                  <div className="text-xs font-mono text-zinc-500">Comments Made</div>
                  <div className="mt-1 text-sm font-mono text-zinc-900">{commentsCount}</div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-zinc-900">Tech Tags</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {stackTools.length === 0 && <div className="text-sm text-zinc-600">No tech tags yet</div>}
                  {stackTools.map((t: any) => (
                    <span key={t.slug} className="rounded-md bg-zinc-50 px-2 py-1 text-xs font-mono text-zinc-700">{t.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main feed */}
          <main className="md:col-span-2">
            <div className="rounded-lg border border-zinc-200 bg-white">
              <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-3">
                <nav className="flex items-center gap-4">
                  <button className="text-sm font-medium text-zinc-900">Reviews</button>
                  <button className="text-sm text-zinc-500">Saved Stacks</button>
                </nav>
              </div>

              <div className="p-6">
                {userReviews.length === 0 && (
                  <div className="rounded-md border border-zinc-100 bg-zinc-50 p-6 text-zinc-600">No reviews written yet.</div>
                )}

                <div className="flex flex-col gap-4">
                  {userReviews.map((r) => (
                    <ReviewCard
                      key={r.id}
                      review={r}
                      authorName={user.name}
                      authorHeadline={user.bio}
                      verified={!!user.githubVerified}
                    />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
