import * as React from 'react'
import Link from 'next/link'
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
import { Card } from '@/components/ui'
import type { Category } from '@/types'

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  RiLayoutLine: RiLayoutLine,
  RiServerLine: RiServerLine,
  RiDatabase2Line: RiDatabase2Line,
  RiGitBranchLine: RiGitBranchLine,
  RiCloudLine: RiCloudLine,
  RiSmartphoneLine: RiSmartphoneLine,
  RiBrainLine: RiBrainLine,
  RiTestTubeLine: RiTestTubeLine,
  RiPaletteLine: RiPaletteLine,
}

interface CategoryCardProps {
  category: Category
  toolCount?: number
}

export function CategoryCard({ category, toolCount = 0 }: CategoryCardProps) {
  const IconComponent = CATEGORY_ICONS[category.icon] || RiLayoutLine

  return (
    <Link href={`/category/${category.slug}`}>
      <Card className="group cursor-pointer transition-all hover:border-gray-400 hover:shadow-md">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50">
              <IconComponent className="h-6 w-6 text-gray-600" />
            </div>
            <RiArrowRightLine className="h-5 w-5 text-gray-300 transition-colors group-hover:text-gray-600" />
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-900">{category.name}</h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{category.description}</p>
          </div>
          {toolCount > 0 && <p className="mt-3 text-xs text-gray-400">{toolCount} tools</p>}
        </div>
      </Card>
    </Link>
  )
}
