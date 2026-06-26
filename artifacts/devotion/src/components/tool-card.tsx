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
  if (r >= 4.7) return 'text-emerald-600'
  if (r >= 4.3) return 'text-amber-600'
  return 'text-orange-600'
}

export function ToolCard({ tool, showCategory = false, rank }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <div className="group relative cursor-pointer border border-gray-200 bg-white p-4 transition-all duration-150 hover:border-gray-400 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.06)]">
        {rank && (
          <span className="absolute right-3 top-3 font-mono text-xs font-bold text-gray-300">#{rank}</span>
        )}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gray-200 bg-gray-100 text-sm font-bold text-gray-500 font-mono">
            {tool.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
              {showCategory && (
                <span className="border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-xs text-gray-500">
                  {CATEGORY_LABELS[tool.category] ?? tool.category}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2 leading-relaxed">{tool.description}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <RiStarFill className={cn('h-3 w-3', ratingColor(tool.avgRating))} />
              <span className={cn('font-mono text-xs font-semibold', ratingColor(tool.avgRating))}>
                {tool.avgRating.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <RiChatQuoteLine className="h-3 w-3" />
              <span className="font-mono text-xs">{tool.totalReviews.toLocaleString()}</span>
            </div>
          </div>
          <RiArrowRightLine className="h-3.5 w-3.5 text-gray-300 transition-all group-hover:text-blue-500 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}
