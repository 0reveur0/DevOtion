export type CategoryType = 
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Cloud"
  | "Mobile"
  | "AI"
  | "Testing"
  | "Design";

export interface Tool {
  id: string; // e.g. "firebase"
  name: string;
  category: CategoryType;
  description: string;
  longDescription: string;
  websiteUrl: string;
  githubUrl?: string;
  avgRating: number;
  totalReviews: number;
}

export interface Review {
  id: string;
  toolId: string;
  authorUsername: string;
  authorAvatar: string;
  authorBio: string;
  rating: number; // 1-5 stars
  title: string;
  content: string;
  createdAt: string;
  upvotes: number;
}

export interface UserProfile {
  username: string;
  name: string;
  avatar: string;
  bio: string;
  joinedDate: string;
  reviewsCount: number;
  totalUpvotesReceived: number;
}

export interface NewReviewInput {
  rating: number;
  title: string;
  content: string;
}

export interface ContributorIssue {
  id: string;
  title: string;
  status: "open" | "closed";
  labels: string[];
  commentsCount: number;
  createdAt: string;
}
