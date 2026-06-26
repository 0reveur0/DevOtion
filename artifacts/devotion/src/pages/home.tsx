import { Link } from 'wouter'
import {
  RiArrowRightLine,
  RiStarFill,
  RiTerminalLine,
  RiGridLine,
} from '@remixicon/react'
import { SearchBar } from '@/components/search-bar'
import { CategoryCard } from '@/components/category-card'
import { ToolCard } from '@/components/tool-card'
import { CATEGORIES, TOP_RATED_TOOLS, TOOLS_BY_CATEGORY } from '@/constants'

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#f8f9fa] text-gray-900">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container py-16">
          <div className="mx-auto max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 border border-gray-200 bg-gray-50 px-3 py-1 font-mono text-xs text-gray-500">
              <span className="h-1.5 w-1.5 bg-emerald-500" />
              community-powered · open source · no vendor marketing
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl leading-tight">
              Developer tool reviews<br />
              <span className="text-blue-600">by developers.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-gray-500 leading-relaxed">
              Real opinions on frameworks, databases, APIs, and more —
              not marketing copy. Find what actually works in production.
            </p>

            <div className="mt-8 max-w-lg">
              <SearchBar placeholder="Search React, PostgreSQL, Docker…" />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-gray-100 pt-6">
              {[
                { label: 'Tools indexed', value: '500+' },
                { label: 'Community reviews', value: '10,000+' },
                { label: 'Open source', value: '100%' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-blue-600">{value}</span>
                  <span className="text-sm text-gray-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Top Rated ─────────────────────────────────────────────────── */}
      <section id="tools" className="py-14">
        <div className="container">
          <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
                <RiTerminalLine className="h-3.5 w-3.5" />
                top rated
              </div>
              <h2 className="text-xl font-bold text-gray-900">Highest Rated Tools</h2>
              <p className="mt-1 text-sm text-gray-500">Ranked by community rating across all categories</p>
            </div>
            <Link
              href="/category/frontend"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
            >
              Browse all
              <RiArrowRightLine className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
            {TOP_RATED_TOOLS.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} showCategory rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────────────── */}
      <section id="categories" className="border-t border-gray-200 py-14 bg-white">
        <div className="container">
          <div className="mb-6 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">
              <RiGridLine className="h-3.5 w-3.5" />
              categories
            </div>
            <h2 className="text-xl font-bold text-gray-900">Explore Every Domain</h2>
            <p className="mt-1 text-sm text-gray-500">From frontend frameworks to AI tooling — we cover it all</p>
          </div>

          <div className="grid gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="border-t border-gray-200 py-14">
        <div className="container">
          <div className="border border-gray-200 bg-white p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.04)]">
            <div className="flex items-center gap-1 mb-4">
              {[5, 5, 5, 5, 5].map((_, i) => (
                <RiStarFill key={i} className="h-4 w-4 text-amber-400" />
              ))}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Share Your Experience</h2>
            <p className="mt-3 max-w-md text-sm text-gray-500 leading-relaxed">
              Your honest review helps thousands of developers make better technology choices.
              Sign in with GitHub to write your first review.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="border border-blue-600 bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
                Sign in with GitHub
              </button>
              <button className="border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-600 transition-colors hover:border-gray-400 hover:text-gray-900">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
