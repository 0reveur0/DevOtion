export type CategorySlug =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'cloud'
  | 'mobile'
  | 'ai'
  | 'testing'
  | 'design'

export interface Category {
  slug: CategorySlug
  name: string
  description: string
  icon: string
}

export interface Tool {
  id: string
  name: string
  slug: string
  description: string
  longDescription?: string
  category: CategorySlug
  websiteUrl?: string
  githubUrl?: string
  avgRating: number
  totalReviews: number
}

export interface Review {
  id: string
  toolId: string
  authorUsername: string
  authorAvatar: string
  rating: number
  title: string
  content: string
  createdAt: string
  upvotes: number
}

export interface User {
  username: string
  name: string
  avatar: string
  bio: string
  joinedDate: string
  reviewsCount: number
  totalUpvotesReceived: number
}
