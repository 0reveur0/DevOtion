import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient } from '@/lib/supabase/server'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createPublicClient()

  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .select('id, vote_count')
    .eq('id', id)
    .single()

  if (reviewError || !review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  const { data: votes, error: votesError } = await supabase
    .from('review_votes')
    .select('id, user_id, vote_type, created_at')
    .eq('review_id', id)
    .order('created_at', { ascending: false })

  if (votesError) {
    return NextResponse.json({ error: 'Failed to fetch votes' }, { status: 500 })
  }

  return NextResponse.json({
    review_id: id,
    vote_count: review.vote_count,
    votes,
  })
}
