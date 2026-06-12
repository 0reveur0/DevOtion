import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RiArrowLeftLine, RiHomeLine } from '@remixicon/react'
import { ToolCard, EmptyState, Button } from '@/components'
import { CATEGORIES, TOOLS_BY_CATEGORY } from '@/constants'
import type { CategorySlug } from '@/types'

interface CategoryPageProps {
  params: Promise<{ slug: CategorySlug }>
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = CATEGORIES.find((c) => c.slug === slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.name} Tools - DevOtion`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = CATEGORIES.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  const tools = TOOLS_BY_CATEGORY[slug] || []

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
              <Button variant="outline">
                <RiArrowLeftLine className="mr-2 h-4 w-4" />
                Suggest a Tool
              </Button>
            }
          />
        )}
      </div>
    </div>
  )
}
