import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, createAuthenticatedClient } from '@/lib/supabase/server'
import { getAuthenticatedUser } from '@/lib/auth/helpers'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const authResult = await getAuthenticatedUser(request)
  if ('error' in authResult) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status })
  }

  const token = request.headers.get('Authorization')!.slice(7)
  const supabase = createAuthenticatedClient(token)

  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .select('id, user_id')
    .eq('id', id)
    .single()

  if (reviewError || !review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  if (review.user_id === authResult.user.id) {
    return NextResponse.json({ error: 'You cannot vote on your own review' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('review_votes')
    .insert({ review_id: id, user_id: authResult.user.id, vote_type: 1 })
    .select('id, review_id, user_id, vote_type, created_at')
    .single()

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'You have already voted on this review' }, { status: 409 })
    }
    if (error.message?.includes('cannot vote on their own')) {
      return NextResponse.json({ error: 'You cannot vote on your own review' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Failed to create vote' }, { status: 500 })
  }

  const pub = createPublicClient()
  const { data: updated } = await pub.from('reviews').select('vote_count').eq('id', id).single()

  return NextResponse.json({ vote: data, vote_count: updated?.vote_count ?? 1 }, { status: 201 })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const authResult = await getAuthenticatedUser(request)
  if ('error' in authResult) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status })
  }

  const token = request.headers.get('Authorization')!.slice(7)
  const supabase = createAuthenticatedClient(token)

  const { error } = await supabase
    .from('review_votes')
    .delete()
    .eq('review_id', id)
    .eq('user_id', authResult.user.id)

  if (error) {
    return NextResponse.json({ error: 'Failed to remove vote' }, { status: 500 })
  }

  const pub = createPublicClient()
  const { data: updated } = await pub.from('reviews').select('vote_count').eq('id', id).single()

  return NextResponse.json({ vote_count: updated?.vote_count ?? 0 })
}
