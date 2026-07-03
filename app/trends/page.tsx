import React from 'react'
import type { Metadata } from 'next'
import { RiTrendingUpLine, RiStarFill } from '@remixicon/react'
import { devTools, socialReviews, CATEGORIES } from '../../artifacts/devotion/src/constants/mockData'

export const metadata: Metadata = {
  title: 'Trends & Analytics | DevOtion',
  description: 'Discover the most loved and trending developer tools and programming languages in 2026. Real-time community rankings and ecosystem insights.',
  keywords: ['trends', 'analytics', 'developer tools', 'rankings', 'ecosystem'],
  openGraph: {
    title: 'Trends & Analytics | DevOtion',
    description: 'Discover the most loved and trending developer tools and programming languages in 2026.',
    type: 'website',
  },
}

interface ToolMetrics {
  slug: string
  name: string
  category: string
  avgRating: number
  totalReviews: number
  recentReviewCount: number
  description: string
}

export default async function TrendsPage() {
  // Aggregate tool metrics
  const allReviews = Object.values(socialReviews).flat() as any[]

  const toolMetrics: ToolMetrics[] = (devTools as any[]).map((tool) => {
    const toolReviews = allReviews.filter((r) => r.toolSlug === tool.slug)
    const recentReviewCount = toolReviews.filter((r) => {
      const reviewDate = new Date(r.createdAt || '2025-01-01')
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      return reviewDate > oneWeekAgo
    }).length

    return {
      slug: tool.slug,
      name: tool.name,
      category: tool.category,
      avgRating: tool.avgRating || 0,
      totalReviews: tool.totalReviews || 0,
      recentReviewCount,
      description: tool.description || '',
    }
  })

  // Calculate rankings
  const mostLoved = [...toolMetrics].sort((a, b) => b.avgRating - a.avgRating).slice(0, 10)
  const trendingThisWeek = [...toolMetrics].sort((a, b) => b.recentReviewCount - a.recentReviewCount).slice(0, 10)

  // Global stats
  const totalTools = toolMetrics.length
  const totalReviews = allReviews.length
  const ecosystemCount = new Set((devTools as any[]).map((t) => t.category)).size

  // Prepare widget data as JSON string for GenerateWidget
  const widgetData = {
    totalTools,
    totalReviews,
    ecosystemCount,
    mostLovedTools: mostLoved.map((t, i) => ({
      rank: i + 1,
      name: t.name,
      slug: t.slug,
      category: t.category,
      rating: t.avgRating.toFixed(1),
      reviewCount: t.totalReviews,
    })),
    trendingTools: trendingThisWeek.map((t, i) => ({
      rank: i + 1,
      name: t.name,
      slug: t.slug,
      category: t.category,
      recentReviews: t.recentReviewCount,
      rating: t.avgRating.toFixed(1),
    })),
    ecosystemBreakdown: Array.from(
      toolMetrics.reduce((acc, t) => {
        acc.set(t.category, (acc.get(t.category) || 0) + 1)
        return acc
      }, new Map<string, number>())
    ).map(([cat, count]) => ({ ecosystem: cat, toolCount: count })),
  }

  return (
    <div className="py-12">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <RiTrendingUpLine className="h-6 w-6 text-zinc-700" />
            <h1 className="text-3xl font-bold text-zinc-900">Trends & Analytics 2026</h1>
          </div>
          <p className="mt-2 text-sm text-zinc-600">Real-time community rankings and ecosystem insights across the developer tool landscape.</p>
        </div>

        {/* Global Stats Header */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <div className="text-xs font-mono text-zinc-500">Total Stacks Indexed</div>
            <div className="mt-2 text-2xl font-mono font-bold text-zinc-900">{totalTools}</div>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <div className="text-xs font-mono text-zinc-500">Community Reviews Posted</div>
            <div className="mt-2 text-2xl font-mono font-bold text-zinc-900">{totalReviews.toLocaleString()}</div>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <div className="text-xs font-mono text-zinc-500">Active Ecosystems</div>
            <div className="mt-2 text-2xl font-mono font-bold text-zinc-900">{ecosystemCount}</div>
          </div>
        </div>

        {/* Most Loved Section */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between border-b border-zinc-200 pb-3">
            <h2 className="text-lg font-semibold text-zinc-900">Most Loved</h2>
            <div className="text-xs font-mono text-zinc-400">Highest Average Rating</div>
          </div>
          <div className="flex flex-col gap-3">
            {mostLoved.map((tool, idx) => {
              const catMeta = CATEGORIES.find((c) => c.slug === tool.category)
              return (
                <a
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center justify-between gap-4 rounded-md border border-zinc-200 px-4 py-3 hover:border-zinc-900"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-mono font-bold text-zinc-500">#{idx + 1}</div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">{tool.name}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="rounded-md bg-zinc-50 px-2 py-1 text-xs text-zinc-700">{catMeta?.name || tool.category}</div>
                        <div className="text-xs text-zinc-600">{tool.description.substring(0, 60)}...</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 font-mono text-sm text-zinc-700">
                      <RiStarFill className="h-4 w-4 text-amber-400" />
                      <span>{tool.avgRating.toFixed(1)}</span>
                    </div>
                    <div className="text-xs font-mono text-zinc-500">({tool.totalReviews} reviews)</div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Trending This Week Section */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between border-b border-zinc-200 pb-3">
            <h2 className="text-lg font-semibold text-zinc-900">Trending This Week</h2>
            <div className="text-xs font-mono text-zinc-400">Highest Review Velocity</div>
          </div>
          <div className="flex flex-col gap-3">
            {trendingThisWeek.map((tool, idx) => {
              const catMeta = CATEGORIES.find((c) => c.slug === tool.category)
              return (
                <a
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center justify-between gap-4 rounded-md border border-zinc-200 px-4 py-3 hover:border-zinc-900"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-mono font-bold text-zinc-500">#{idx + 1}</div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">{tool.name}</div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="rounded-md bg-zinc-50 px-2 py-1 text-xs text-zinc-700">{catMeta?.name || tool.category}</div>
                        <div className="text-xs text-zinc-600">{tool.description.substring(0, 60)}...</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 font-mono text-sm text-zinc-700">
                      <RiTrendingUpLine className="h-4 w-4 text-emerald-500" />
                      <span>{tool.recentReviewCount}</span>
                      <span className="text-zinc-400">this week</span>
                    </div>
                    <div className="text-xs font-mono text-zinc-500">{tool.avgRating.toFixed(1)} ★</div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Interactive Analytics Widget */}
        <div className="mb-8">
          <div className="mb-4 border-b border-zinc-200 pb-3">
            <h2 className="text-lg font-semibold text-zinc-900">Interactive Ecosystem Explorer</h2>
          </div>
          <GenerateWidget height="750px">
            {JSON.stringify({
              widgetSpec: {
                height: '750px',
                prompt: 'Objective: Create an interactive ecosystem leaderboard and market share explorer for developer languages and tools. Data State: Default view sorted by "Trending (Review Velocity)". Strategy: Form Layout. Inputs: Ecosystem Filter (Dropdown: All, Frontend, Backend, Database, DevOps, Cloud, Mobile, AI, Testing, Design), Sort Metric (Radio: Rating, Review Volume, Trending). Visuals/Behavior: Render a high-density, flat-styled leaderboard chart. Bars should adjust in real-time when inputs change. Each item shows rank number (#1, #2, #3) in font-mono, name, a small sub-category label with a soft pastel background fill, and its quantitative score. Hovering an item reveals its primary complementary companion tool. Use crisp zinc-200 borders, no gradients, 100% monospace metrics.',
                data: widgetData,
              },
            })}
          </GenerateWidget>
        </div>
      </div>
    </div>
  )
}

/* GenerateWidget placeholder component for interactive dashboards */
function GenerateWidget({ children, height }: { children: React.ReactNode; height: string }) {
  return (
    <div
      style={{ height }}
      className="rounded-lg border border-zinc-200 bg-white p-6"
    >
      <div className="flex h-full items-center justify-center text-center">
        <div>
          <div className="text-sm font-mono text-zinc-600">Interactive Widget Ready</div>
          <div className="mt-2 text-xs text-zinc-500">Data payload prepared. Awaiting widget renderer initialization.</div>
          <pre className="mt-4 overflow-auto rounded-md bg-zinc-50 p-4 text-left text-[10px] text-zinc-700">
            {typeof children === 'string' ? JSON.stringify(JSON.parse(children), null, 2).substring(0, 200) + '...' : ''}
          </pre>
        </div>
      </div>
    </div>
  )
}
