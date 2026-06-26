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

interface CategoryCardProps {
  category: Category
  toolCount?: number
}

export function CategoryCard({ category, toolCount = 0 }: CategoryCardProps) {
  const IconComponent = CATEGORY_ICONS[category.icon] || RiLayoutLine

  return (
    <Link href={`/category/${category.slug}`}>
      <div className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900 p-5 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800/80">
        <div className="flex items-start justify-between">
          <div className={cn('flex h-11 w-11 items-center justify-center rounded-lg bg-slate-800 ring-1 ring-slate-700 transition-colors group-hover:ring-slate-500', category.color?.replace('text-', 'bg-').replace('400', '400/10'))}>
            <IconComponent className={cn('h-5 w-5', category.color || 'text-slate-400')} />
          </div>
          <RiArrowRightLine className="h-4 w-4 text-slate-600 transition-all group-hover:text-slate-400 group-hover:translate-x-0.5" />
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-slate-100">{category.name}</h3>
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">{category.description}</p>
        </div>
        {toolCount > 0 && (
          <p className="mt-3 text-xs text-slate-600">
            {toolCount} tool{toolCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </Link>
  )
}
