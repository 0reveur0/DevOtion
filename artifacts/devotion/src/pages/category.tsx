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
      <div className="min-h-screen bg-slate-950 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">Category Not Found</h1>
        <p className="mt-2 text-slate-400">The category you're looking for doesn't exist.</p>
        <Link href="/">
          <button className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800">
            <RiHomeLine className="h-4 w-4" />
            Back to Home
          </button>
        </Link>
      </div>
    )
  }

  const tools = TOOLS_BY_CATEGORY[slug as CategorySlug] || []

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="flex items-center gap-1 hover:text-slate-300 transition-colors">
            <RiHomeLine className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-slate-300">{category.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white">{category.name}</h1>
          <p className="mt-3 text-lg text-slate-400">{category.description}</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-400">
            {tools.length} tool{tools.length !== 1 ? 's' : ''} available
          </div>
        </div>

        {/* Tools Grid */}
        {tools.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 py-16 text-center">
            <p className="font-semibold text-slate-400">No tools yet</p>
            <p className="mt-1 text-sm text-slate-600">
              Be the first to suggest a {category.name} tool.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
