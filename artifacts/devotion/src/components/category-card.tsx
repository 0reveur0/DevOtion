import * as React from 'react'
import { Link } from 'wouter'
import {
  RiLayoutLine,
  RiServerLine,
  RiDatabase2Line,
  RiGitBranchLine,
  RiCloudLine,
  RiSmartphoneLine,
  RiBrainLine,
  RiTestTubeLine,
  RiPaletteLine,
  RiArrowRightLine,
} from '@remixicon/react'
import { cn } from '@/lib/utils'
import type { Category } from '@/types'

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  RiLayoutLine,
  RiServerLine,
  RiDatabase2Line,
  RiGitBranchLine,
  RiCloudLine,
  RiSmartphoneLine,
  RiBrainLine,
  RiTestTubeLine,
  RiPaletteLine,
}

const ACCENT_COLORS: Record<string, { icon: string; bg: string; border: string }> = {
  'text-blue-400':    { icon: 'text-blue-600',   bg: 'bg-blue-50',   border: 'border-blue-200' },
  'text-violet-400':  { icon: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
  'text-emerald-400': { icon: 'text-emerald-700',bg: 'bg-emerald-50',border: 'border-emerald-200' },
  'text-orange-400':  { icon: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  'text-sky-400':     { icon: 'text-sky-600',    bg: 'bg-sky-50',    border: 'border-sky-200' },
  'text-pink-400':    { icon: 'text-pink-600',   bg: 'bg-pink-50',   border: 'border-pink-200' },
  'text-yellow-400':  { icon: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  'text-red-400':     { icon: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200' },
  'text-fuchsia-400': { icon: 'text-fuchsia-600',bg: 'bg-fuchsia-50',border: 'border-fuchsia-200' },
}

interface CategoryCardProps {
  category: Category
  toolCount?: number
}

export function CategoryCard({ category, toolCount = 0 }: CategoryCardProps) {
  const IconComponent = CATEGORY_ICONS[category.icon] || RiLayoutLine
  const accent = ACCENT_COLORS[category.color] ?? { icon: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' }

  return (
    <Link href={`/category/${category.slug}`}>
      <div className="group cursor-pointer border border-gray-200 bg-white p-4 transition-all duration-150 hover:border-gray-400 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.06)]">
        <div className="flex items-start justify-between">
          <div className={cn('flex h-9 w-9 items-center justify-center border', accent.bg, accent.border)}>
            <IconComponent className={cn('h-4 w-4', accent.icon)} />
          </div>
          <RiArrowRightLine className="h-3.5 w-3.5 text-gray-300 transition-all group-hover:text-gray-600 group-hover:translate-x-0.5" />
        </div>
        <div className="mt-3">
          <h3 className="font-semibold text-gray-900">{category.name}</h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2 leading-relaxed">{category.description}</p>
        </div>
        {toolCount > 0 && (
          <p className="mt-3 font-mono text-xs text-gray-400">
            {toolCount} tool{toolCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </Link>
  )
}
