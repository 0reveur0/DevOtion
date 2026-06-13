import { NextRequest, NextResponse } from 'next/server'
import { createPublicClient, createAuthenticatedClient } from '@/lib/supabase/server'
import { validateUpdateReview } from '@/lib/validation/review'
import { getAuthenticatedUser } from '@/lib/auth/helpers'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('reviews')
    .select('id, tool_slug, user_id, rating, title, content, created_at, updated_at')
    .eq('id', id)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  return NextResponse.json({ review: data })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const authResult = await getAuthenticatedUser(request)
  if ('error' in authResult) {
    return NextResponse.json({ error: authResult.error }, { status: authResult.status })
  }

  const token = request.headers.get('Authorization')!.slice(7)
  const supabase = createAuthenticatedClient(token)

  const { data: existing, error: fetchError } = await supabase
    .from('reviews')
    .select('id, user_id')
    .eq('id', id)
    .single()

  if (fetchError || !existing) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  if (existing.user_id !== authResult.user.id) {
    return NextResponse.json({ error: 'You can only edit your own reviews' }, { status: 403 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const validation = validateUpdateReview(body)
  if (!validation.valid) {
    return NextResponse.json(
      { error: 'Validation failed', details: validation.errors },
      { status: 400 }
    )
  }

  const updates: Record<string, unknown> = {}
  const dto = body as Record<string, unknown>

  if ('rating' in dto) updates.rating = dto.rating
  if ('title' in dto) updates.title = (dto.title as string).trim()
  if ('content' in dto) updates.content = (dto.content as string).trim()

  const { data, error } = await supabase
    .from('reviews')
    .update(updates)
    .eq('id', id)
    .select('id, tool_slug, user_id, rating, title, content, created_at, updated_at')
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 })
  }

  return NextResponse.json({ review: data })
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

  const { data: existing, error: fetchError } = await supabase
    .from('reviews')
    .select('id, user_id')
    .eq('id', id)
    .single()

  if (fetchError || !existing) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  if (existing.user_id !== authResult.user.id) {
    return NextResponse.json({ error: 'You can only delete your own reviews' }, { status: 403 })
  }

  const { error } = await supabase.from('reviews').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Review deleted' })
}
