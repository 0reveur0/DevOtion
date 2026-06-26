import { Link } from 'wouter'
import {
  RiCheckboxCircleFill,
  RiArrowRightLine,
  RiStarFill,
  RiTrophyLine,
  RiGridLine,
} from '@remixicon/react'
import { SearchBar } from '@/components/search-bar'
import { CategoryCard } from '@/components/category-card'
import { ToolCard } from '@/components/tool-card'
import { CATEGORIES, TOP_RATED_TOOLS, TOOLS_BY_CATEGORY } from '@/constants'

export default function HomePage() {
  return (
    <div className="flex flex-col bg-slate-950 text-slate-100">

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-800">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[600px] w-[900px] rounded-full bg-indigo-600/10 blur-3xl" />
        </div>

        <div className="container relative py-24 text-center">
          <div className="mx-auto max-w-3xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Community-powered developer tool reviews
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
              Discover the Best{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Dev Tools
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400 leading-relaxed">
              Real reviews from real developers — not vendor marketing. Find your next favourite
              framework, database, or API before you commit.
            </p>

            {/* Search */}
            <div className="mx-auto mt-10 max-w-lg">
              <SearchBar
                placeholder="Search React, PostgreSQL, Docker…"
                className="text-base"
              />
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              {[
                { label: 'Tools indexed', value: '500+' },
                { label: 'Community reviews', value: '10,000+' },
                { label: 'Open source', value: '100%' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <RiCheckboxCircleFill className="h-4 w-4 text-emerald-500" />
                  <span>
                    <strong className="font-semibold text-slate-300">{value}</strong>{' '}
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Top Rated ───────────────────────────────────────────────── */}
      <section id="tools" className="py-20">
        <div className="container">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
                <RiTrophyLine className="h-4 w-4" />
                Top Rated
              </div>
              <h2 className="text-3xl font-bold text-white">Highest Rated Tools</h2>
              <p className="mt-2 text-slate-500">Ranked by community rating across all categories</p>
            </div>
            <Link
              href="/category/frontend"
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200"
            >
              Browse all
              <RiArrowRightLine className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOP_RATED_TOOLS.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} showCategory rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ──────────────────────────────────────────────── */}
      <section id="categories" className="border-t border-slate-800/60 py-20">
        <div className="container">
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
              <RiGridLine className="h-4 w-4" />
              Browse by Category
            </div>
            <h2 className="text-3xl font-bold text-white">Explore Every Domain</h2>
            <p className="mt-2 text-slate-500">From frontend frameworks to AI tooling — we cover it all</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                toolCount={TOOLS_BY_CATEGORY[category.slug]?.length || 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="border-t border-slate-800/60 py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 px-8 py-16 text-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
            </div>
            <div className="relative">
              <div className="mb-4 flex items-center justify-center gap-1">
                {[5, 5, 5, 5, 5].map((_, i) => (
                  <RiStarFill key={i} className="h-5 w-5 text-amber-400" />
                ))}
              </div>
              <h2 className="text-3xl font-bold text-white">Share Your Experience</h2>
              <p className="mx-auto mt-4 max-w-md text-slate-400">
                Your honest review helps thousands of developers make better technology choices.
                Sign in with GitHub to write your first review.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">
                  Sign in with GitHub
                </button>
                <button className="rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
