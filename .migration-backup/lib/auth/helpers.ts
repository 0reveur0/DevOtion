import { createAuthenticatedClient } from '@/lib/supabase/server'

export interface AuthUser {
  id: string
}

export async function getAuthenticatedUser(
  request: Request
): Promise<{ user: AuthUser } | { error: string; status: number }> {
  const authHeader = request.headers.get('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return { error: 'Missing or invalid Authorization header', status: 401 }
  }

  const token = authHeader.slice(7)
  const supabase = createAuthenticatedClient(token)

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return { error: 'Invalid or expired token', status: 401 }
  }

  return { user: { id: user.id } }
}
