import * as React from 'react'
import Link from 'next/link'
import { RiStarLine, RiChatQuoteLine, RiArrowRightLine } from '@remixicon/react'
import { Card, Badge } from '@/components/ui'
import type { Tool } from '@/types'

interface ToolCardProps {
  tool: Tool
  showCategory?: boolean
}

export function ToolCard({ tool, showCategory = false }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <Card className="group cursor-pointer transition-all hover:border-gray-400 hover:shadow-md">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-50 text-xl font-bold text-gray-600">
              {tool.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <RiStarLine className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium text-gray-900">{tool.avgRating.toFixed(1)}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{tool.name}</h3>
              {showCategory && (
                <Badge variant="secondary" className="text-xs">
                  {tool.category}
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{tool.description}</p>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <RiChatQuoteLine className="h-4 w-4" />
              <span>{tool.totalReviews.toLocaleString()} reviews</span>
            </div>
            <RiArrowRightLine className="h-4 w-4 text-gray-300 transition-colors group-hover:text-gray-600" />
          </div>
        </div>
      </Card>
    </Link>
  )
}
