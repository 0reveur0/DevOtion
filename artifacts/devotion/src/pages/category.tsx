import { useParams, Link } from 'wouter'
import { RiHomeLine } from '@remixicon/react'
import { ToolCard } from '@/components/tool-card'
import { CATEGORIES, TOOLS_BY_CATEGORY } from '@/constants'
import type { CategorySlug } from '@/types'

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const category = CATEGORIES.find((c) => c.slug === slug)

  if (!category) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] py-20 text-center">
        <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">404 — not found</p>
        <h1 className="text-2xl font-bold text-gray-900">Category Not Found</h1>
        <p className="mt-2 text-sm text-gray-500">The category you're looking for doesn't exist.</p>
        <Link href="/">
          <button className="mt-6 inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors">
            <RiHomeLine className="h-4 w-4" />
            Back to Home
          </button>
        </Link>
      </div>
    )
  }

  const tools = TOOLS_BY_CATEGORY[slug as CategorySlug] || []

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 font-mono text-xs text-gray-400">
          <Link href="/" className="flex items-center gap-1 hover:text-gray-700 transition-colors">
            <RiHomeLine className="h-3.5 w-3.5" />
            home
          </Link>
          <span>/</span>
          <span className="text-gray-700">{category.slug}</span>
        </nav>

        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{category.name}</h1>
          <p className="mt-2 text-sm text-gray-500">{category.description}</p>
          <div className="mt-3 inline-flex items-center border border-gray-200 bg-white px-2.5 py-1 font-mono text-xs text-gray-500">
            {tools.length} tool{tools.length !== 1 ? 's' : ''} available
          </div>
        </div>

        {tools.length > 0 ? (
          <div className="grid gap-px bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="border border-gray-200 bg-white py-14 text-center">
            <p className="text-sm font-semibold text-gray-700">No tools yet</p>
            <p className="mt-1 text-xs text-gray-500">
              Be the first to suggest a {category.name} tool.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
