import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  RiArrowLeftLine,
  RiExternalLinkLine,
  RiGithubLine,
  RiStarLine,
  RiChatQuoteLine,
  RiThumbUpLine,
  RiFolderLine,
} from '@remixicon/react'
import { Card, Badge, Button } from '@/components/ui'
import { RatingDisplay, EmptyState } from '@/components'
import { FEATURED_TOOLS, TOOLS_BY_CATEGORY } from '@/constants'
import type { CategorySlug } from '@/types'

interface ToolPageProps {
  params: Promise<{ slug: string }>
}

const ALL_TOOLS = [...FEATURED_TOOLS, ...Object.values(TOOLS_BY_CATEGORY).flat()]

export async function generateStaticParams() {
  return ALL_TOOLS.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = ALL_TOOLS.find((t) => t.slug === slug)

  if (!tool) {
    return { title: 'Tool Not Found' }
  }

  return {
    title: `${tool.name} Reviews - DevOtion`,
    description: tool.description,
  }
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params
  const tool = ALL_TOOLS.find((t) => t.slug === slug)

  if (!tool) {
    notFound()
  }

  const category =
    {
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Database',
      devops: 'DevOps',
      cloud: 'Cloud',
      mobile: 'Mobile',
      ai: 'AI',
      testing: 'Testing',
      design: 'Design',
    }[tool.category] || tool.category

  return (
    <div className="py-12">
      <div className="container max-w-5xl">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/category/${tool.category}`}
            className="hover:text-gray-900 transition-colors"
          >
            {category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{tool.name}</span>
        </nav>

        {/* Tool Header Card */}
        <Card className="p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100 text-2xl font-bold text-gray-600">
                {tool.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
                  <Badge variant="secondary">{category}</Badge>
                </div>
                <p className="mt-2 text-gray-600">{tool.description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <RiStarLine className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-900">{tool.avgRating.toFixed(1)}</span>
                    <span className="text-gray-400">/5</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400">
                    <RiChatQuoteLine className="h-4 w-4" />
                    <span>{tool.totalReviews.toLocaleString()} reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {tool.websiteUrl && (
                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <RiExternalLinkLine className="h-4 w-4" />
                  Website
                </a>
              )}
              {tool.githubUrl && (
                <a
                  href={tool.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <RiGithubLine className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>

          {tool.longDescription && (
            <div className="mt-6 border-t border-gray-100 pt-6">
              <p className="text-gray-600 leading-relaxed">{tool.longDescription}</p>
            </div>
          )}
        </Card>

        {/* Reviews Section */}
        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Reviews</h2>
            <Button className="flex items-center gap-2">Write a Review</Button>
          </div>

          <EmptyState
            icon={<RiChatQuoteLine className="h-12 w-12" />}
            title="No reviews yet"
            description="Be the first to share your experience with this tool. Your review helps other developers make informed decisions."
            action={
              <Button variant="outline" className="mt-2">
                <RiArrowLeftLine className="mr-2 h-4 w-4" />
                Write the first review
              </Button>
            }
          />
        </div>
      </div>
    </div>
  )
}
