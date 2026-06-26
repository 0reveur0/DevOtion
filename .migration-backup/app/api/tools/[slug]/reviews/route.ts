import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { searchParams } = request.nextUrl
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20))
  const offset = (page - 1) * limit

  const supabase = createPublicClient()

  const [reviewsResult, countResult] = await Promise.all([
    supabase
      .from('reviews')
      .select('id, tool_slug, user_id, rating, title, content, vote_count, created_at, updated_at')
      .eq('tool_slug', slug)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1),
    supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('tool_slug', slug),
  ])

  if (reviewsResult.error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
  }

  return NextResponse.json({
    reviews: reviewsResult.data,
    pagination: {
      page,
      limit,
      total: countResult.count ?? 0,
      total_pages: Math.ceil((countResult.count ?? 0) / limit),
    },
  })
}
