import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient } from '@/lib/supabase/server'
import { FEATURED_TOOLS, TOOLS_BY_CATEGORY } from '@/constants'

const ALL_TOOLS = [...FEATURED_TOOLS, ...Object.values(TOOLS_BY_CATEGORY).flat()]

const toolBySlug = new Map(ALL_TOOLS.map((t) => [t.slug, t]))

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const tool = toolBySlug.get(slug)

  if (!tool) {
    return NextResponse.json({ error: 'Tool not found' }, { status: 404 })
  }

  const supabase = createPublicClient()

  const { data, error } = await supabase.from('reviews').select('rating').eq('tool_slug', slug)

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch review stats' }, { status: 500 })
  }

  const totalReviews = data?.length ?? 0
  const averageRating =
    totalReviews > 0
      ? Number((data!.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1))
      : null

  return NextResponse.json({
    tool: {
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      longDescription: tool.longDescription,
      category: tool.category,
      websiteUrl: tool.websiteUrl,
      githubUrl: tool.githubUrl,
      averageRating,
      totalReviews,
    },
  })
}
