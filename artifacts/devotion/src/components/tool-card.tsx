import * as React from 'react'
import { Link } from 'wouter'
import { RiStarFill, RiChatQuoteLine, RiArrowRightLine } from '@remixicon/react'
import { cn } from '@/lib/utils'
import type { Tool } from '@/types'

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

interface ToolCardProps {
  tool: Tool
  showCategory?: boolean
  rank?: number
}

function ratingColor(r: number) {
  if (r >= 4.7) return 'text-emerald-400'
  if (r >= 4.3) return 'text-amber-400'
  return 'text-orange-400'
}

export function ToolCard({ tool, showCategory = false, rank }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className="group relative cursor-pointer rounded-xl border border-slate-800 bg-slate-900 p-5 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/80">
        {rank && (
          <span className="absolute right-4 top-4 text-xs font-bold text-slate-700">#{rank}</span>
        )}
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 text-lg font-bold text-slate-300 ring-1 ring-slate-700">
            {tool.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-slate-100 group-hover:text-white transition-colors truncate">{tool.name}</h3>
              {showCategory && (
                <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs font-medium text-slate-400 ring-1 ring-slate-700">
                  {CATEGORY_LABELS[tool.category] ?? tool.category}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500 line-clamp-2">{tool.description}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <RiStarFill className={cn('h-3.5 w-3.5', ratingColor(tool.avgRating))} />
              <span className={cn('text-sm font-semibold', ratingColor(tool.avgRating))}>
                {tool.avgRating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-600">
              <RiChatQuoteLine className="h-3.5 w-3.5" />
              <span>{tool.totalReviews.toLocaleString()}</span>
            </div>
          </div>
          <RiArrowRightLine className="h-4 w-4 text-slate-700 transition-all group-hover:text-slate-400 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}
