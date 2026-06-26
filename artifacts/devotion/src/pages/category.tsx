import { useParams, Link } from 'wouter'
import { RiArrowLeftLine, RiHomeLine } from '@remixicon/react'
import { ToolCard } from '@/components/tool-card'
import { EmptyState } from '@/components/empty-state'
import { CustomButton } from '@/components/ui/custom-button'
import { CATEGORIES, TOOLS_BY_CATEGORY } from '@/constants'
import type { CategorySlug } from '@/types'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const category = CATEGORIES.find((c) => c.slug === slug)

  if (!category) {
    return (
      <div className="py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category Not Found</h1>
          <p className="mt-2 text-gray-600">The category you're looking for doesn't exist.</p>
          <Link href="/">
            <CustomButton variant="outline" className="mt-4">
              <RiHomeLine className="mr-2 h-4 w-4" />
              Back to Home
            </CustomButton>
          </Link>
        </div>
      </div>
    )
  }

  const tools = TOOLS_BY_CATEGORY[slug as CategorySlug] || []

  return (
    <div className="py-12">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
            <RiHomeLine className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">{category.name}</h1>
          <p className="mt-3 text-lg text-gray-600">{category.description}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
            {tools.length} tools available
          </div>
        </div>

        {/* Tools Grid */}
        {tools.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No tools yet"
            description={`Be the first to suggest a ${category.name} tool to be added to DevOtion.`}
            action={
              <CustomButton variant="outline">
                <RiArrowLeftLine className="mr-2 h-4 w-4" />
                Suggest a Tool
              </CustomButton>
            }
          />
        )}
      </div>
    </div>
  )
}
