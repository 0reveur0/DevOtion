export interface CreateReviewDTO {
  tool_slug: string
  rating: number
  title: string
  content: string
}

export interface UpdateReviewDTO {
  rating?: number
  title?: string
  content?: string
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

export function validateCreateReview(dto: unknown): ValidationResult {
  const errors: string[] = []

  if (!dto || typeof dto !== 'object') {
    return { valid: false, errors: ['Request body must be a JSON object'] }
  }

  const body = dto as Record<string, unknown>

  if (typeof body.tool_slug !== 'string' || body.tool_slug.trim().length === 0) {
    errors.push('tool_slug is required and must be a non-empty string')
  }

  if (
    typeof body.rating !== 'number' ||
    !Number.isInteger(body.rating) ||
    body.rating < 1 ||
    body.rating > 5
  ) {
    errors.push('rating is required and must be an integer between 1 and 5')
  }

  if (typeof body.title !== 'string' || body.title.trim().length === 0) {
    errors.push('title is required and must be a non-empty string')
  } else if (body.title.length > 100) {
    errors.push('title must be at most 100 characters')
  }

  if (typeof body.content !== 'string' || body.content.trim().length === 0) {
    errors.push('content is required and must be a non-empty string')
  } else if (body.content.length > 5000) {
    errors.push('content must be at most 5000 characters')
  }

  return { valid: errors.length === 0, errors }
}

export function validateUpdateReview(dto: unknown): ValidationResult {
  const errors: string[] = []

  if (!dto || typeof dto !== 'object') {
    return { valid: false, errors: ['Request body must be a JSON object'] }
  }

  const body = dto as Record<string, unknown>
  const hasUpdates = 'rating' in body || 'title' in body || 'content' in body

  if (!hasUpdates) {
    errors.push('At least one field (rating, title, or content) must be provided')
  }

  if ('rating' in body) {
    if (
      typeof body.rating !== 'number' ||
      !Number.isInteger(body.rating) ||
      body.rating < 1 ||
      body.rating > 5
    ) {
      errors.push('rating must be an integer between 1 and 5')
    }
  }

  if ('title' in body) {
    if (typeof body.title !== 'string' || body.title.trim().length === 0) {
      errors.push('title must be a non-empty string')
    } else if (body.title.length > 100) {
      errors.push('title must be at most 100 characters')
    }
  }

  if ('content' in body) {
    if (typeof body.content !== 'string' || body.content.trim().length === 0) {
      errors.push('content must be a non-empty string')
    } else if (body.content.length > 5000) {
      errors.push('content must be at most 5000 characters')
    }
  }

  return { valid: errors.length === 0, errors }
}
