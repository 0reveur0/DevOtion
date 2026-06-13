import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient } from '@/lib/supabase/server'
import { FEATURED_TOOLS, TOOLS_BY_CATEGORY } from '@/constants'

const ALL_TOOLS = [...FEATURED_TOOLS, ...Object.values(TOOLS_BY_CATEGORY).flat()]

const uniqueTools = Array.from(new Map(ALL_TOOLS.map((t) => [t.slug, t])).values())

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const category = searchParams.get('category')
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20))
  const offset = (page - 1) * limit

  let tools = uniqueTools
  if (category) {
    tools = tools.filter((t) => t.category === category)
  }

  const pagedTools = tools.slice(offset, offset + limit)

  const supabase = createPublicClient()

  const slugs = pagedTools.map((t) => t.slug)

  let statsBySlug: Record<string, { avgRating: number; totalReviews: number }> = {}

  if (slugs.length > 0) {
    const { data, error } = await supabase
      .from('reviews')
      .select('tool_slug, rating')
      .in('tool_slug', slugs)

    if (!error && data) {
      for (const row of data) {
        if (!statsBySlug[row.tool_slug]) {
          statsBySlug[row.tool_slug] = { avgRating: 0, totalReviews: 0 }
        }
        statsBySlug[row.tool_slug].totalReviews += 1
        statsBySlug[row.tool_slug].avgRating += row.rating
      }
      for (const slug of Object.keys(statsBySlug)) {
        const s = statsBySlug[slug]
        s.avgRating = s.totalReviews > 0 ? s.avgRating / s.totalReviews : 0
      }
    }
  }

  const result = pagedTools.map((tool) => {
    const stats = statsBySlug[tool.slug] || { avgRating: 0, totalReviews: 0 }
    return {
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      category: tool.category,
      websiteUrl: tool.websiteUrl,
      githubUrl: tool.githubUrl,
      averageRating: stats.totalReviews > 0 ? Number(stats.avgRating.toFixed(1)) : null,
      totalReviews: stats.totalReviews,
    }
  })

  return NextResponse.json({
    tools: result,
    pagination: {
      page,
      limit,
      total: tools.length,
      total_pages: Math.ceil(tools.length / limit),
    },
  })
}
