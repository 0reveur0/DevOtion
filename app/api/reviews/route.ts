import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, createAuthenticatedClient } from '@/lib/supabase/server'
import { validateCreateReview } from '@/lib/validation/review'
import { getAuthenticatedUser } from '@/lib/auth/helpers'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20))
  const offset = (page - 1) * limit

  const supabase = createPublicClient()

  const [reviewsResult, countResult] = await Promise.all([
    supabase
      .from('reviews')
      .select('id, tool_slug, user_id, rating, title, content, vote_count, created_at, updated_at')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1),
    supabase.from('reviews').select('*', { count: 'exact', head: true }),
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

export async function POST(request: NextRequest) {
  const authResult = await getAuthenticatedUser(request)
  if ('error' in authResult) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const validation = validateCreateReview(body)
  if (!validation.valid) {
    return NextResponse.json(
      { error: 'Validation failed', details: validation.errors },
      { status: 400 }
    )
  }

  const dto = body as { tool_slug: string; rating: number; title: string; content: string }
  const token = request.headers.get('Authorization')!.slice(7)
  const supabase = createAuthenticatedClient(token)

  const { data: existing } = await supabase
    .from('reviews')
    .select('id')
    .eq('tool_slug', dto.tool_slug)
    .eq('user_id', authResult.user.id)
    .maybeSingle()

  if (existing) {
    return NextResponse.json(
      { error: 'You have already reviewed this tool', details: ['One review per user per tool'] },
      { status: 409 }
    )
  }

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      tool_slug: dto.tool_slug,
      user_id: authResult.user.id,
      rating: dto.rating,
      title: dto.title.trim(),
      content: dto.content.trim(),
    })
    .select('id, tool_slug, user_id, rating, title, content, vote_count, created_at, updated_at')
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'You have already reviewed this tool' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }

  return NextResponse.json({ review: data }, { status: 201 })
}
