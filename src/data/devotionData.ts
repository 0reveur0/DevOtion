import { Tool, Review, UserProfile, ContributorIssue } from "../types";

export const INITIAL_TOOLS: Tool[] = [
  // Backend
  {
    id: "firebase",
    name: "Firebase",
    category: "Backend",
    description: "Google's mobile and web application development platform.",
    longDescription: "Firebase provides tools like Firestore, Authentication, Cloud Functions, and Hosting to help you build apps quickly. Known for its real-time capabilities and seamless authentication integration, security rules, and serverless infrastructure.",
    websiteUrl: "https://firebase.google.com",
    githubUrl: "https://github.com/firebase/firebase-js-sdk",
    avgRating: 4.2,
    totalReviews: 3
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "Backend",
    description: "The open source Firebase alternative.",
    longDescription: "Supabase is an open source BaaS platform that provisions a dedicated PostgreSQL database, instant RESTful/GraphQL APIs, Auth, real-time subscriptions, and Edge Functions. Perfect for developers who love relational query models and PostgreSQL standards.",
    websiteUrl: "https://supabase.com",
    githubUrl: "https://github.com/supabase/supabase",
    avgRating: 4.8,
    totalReviews: 2
  },
  {
    id: "appwrite",
    name: "Appwrite",
    category: "Backend",
    description: "Secure open-source backend server for web, mobile & flutter.",
    longDescription: "An open-source self-hostable alternative to Firebase. It abstracts backend API complexity into simple REST/Websocket calls for auth, databases, storage, and serverless functions.",
    websiteUrl: "https://appwrite.io",
    githubUrl: "https://github.com/appwrite/appwrite",
    avgRating: 4.1,
    totalReviews: 1
  },
  {
    id: "pocketbase",
    name: "PocketBase",
    category: "Backend",
    description: "Open source real-time backend in 1 single file.",
    longDescription: "A self-contained, lightweight Go executable holding an embedded SQLite database, administrative UI, authentication rules, and file uploads. Highly portable and super simple for small-to-medium side projects.",
    websiteUrl: "https://pocketbase.io",
    githubUrl: "https://github.com/pocketbase/pocketbase",
    avgRating: 4.6,
    totalReviews: 1
  },

  // Frontend
  {
    id: "react",
    name: "React",
    category: "Frontend",
    description: "A JavaScript library for building user interfaces.",
    longDescription: "Maintained by Meta and a vibrant community, React uses a component-driven pattern, virtual DOM emulation, and state-driven reconciliation loops to design highly performant applications.",
    websiteUrl: "https://react.dev",
    githubUrl: "https://github.com/facebook/react",
    avgRating: 4.5,
    totalReviews: 2
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Frontend",
    description: "The React framework for production.",
    longDescription: "Next.js provides clean API routes, server actions, server-side rendering (SSR), static site generation (SSG), and incremental static regeneration (ISR) to optimize modern web scale and speed.",
    websiteUrl: "https://nextjs.org",
    githubUrl: "https://github.com/vercel/next.js",
    avgRating: 4.4,
    totalReviews: 2
  },
  {
    id: "tailwind-css",
    name: "Tailwind CSS",
    category: "Frontend",
    description: "A utility-first CSS framework for rapid UI development.",
    longDescription: "Tailwind is a utility-first CSS engine. It replaces standard stylesheet overhead with custom class chains, completely compiling into fine-tuned utility blocks at compile time.",
    websiteUrl: "https://tailwindcss.com",
    githubUrl: "https://github.com/tailwindlabs/tailwindcss",
    avgRating: 4.9,
    totalReviews: 2
  },

  // Database
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    description: "The world's most advanced open source relational database.",
    longDescription: "PostgreSQL is a powerful, highly-extensible SQL engine known for compliance, transactions (ACID properties), JSON data handling, vector search extensions (pgvector), and performance under high load.",
    websiteUrl: "https://www.postgresql.org",
    githubUrl: "https://github.com/postgres/postgres",
    avgRating: 4.9,
    totalReviews: 1
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "Database",
    description: "Seamless JSON-like document database.",
    longDescription: "An industry-favorite schema-agnostic document database. Great for fast development iterations on semi-structured hierarchical objects and flexible payload schemas.",
    websiteUrl: "https://www.mongodb.com",
    githubUrl: "https://github.com/mongodb/mongo",
    avgRating: 4.0,
    totalReviews: 1
  },

  // DevOps
  {
    id: "docker",
    name: "Docker",
    category: "DevOps",
    description: "Pack and run any application as a lightweight, portable container.",
    longDescription: "Docker separates software dependencies into virtual sandbox containers. Ensures that development and production running environments match perfectly regardless of underlying system hosts.",
    websiteUrl: "https://www.docker.com",
    githubUrl: "https://github.com/docker/cli",
    avgRating: 4.8,
    totalReviews: 2
  },

  // AI
  {
    id: "gemini-api",
    name: "Gemini API",
    category: "AI",
    description: "Google's multimodal large language model toolchain.",
    longDescription: "Access state-of-the-art text, image, and system call processing models via Google's modern @google/genai SDK, featuring cost efficiency and high speed context retrieval limits.",
    websiteUrl: "https://ai.google.dev",
    githubUrl: "https://github.com/google/generative-ai-js",
    avgRating: 4.6,
    totalReviews: 1
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev1",
    toolId: "firebase",
    authorUsername: "alexdev",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=alexdev",
    authorBio: "Fullstock Engineer | MVP Builder",
    rating: 4,
    title: "Great for MVPs, pricing escalates at scale",
    content: "Firebase helped me launch my startup SaaS in less than two weeks. Having Authentication and Firestore integrated with three lines of JavaScript is unbeatable. However, be extremely careful with Firestore query loops in useEffect; a single unoptimized loop cost me $150 in reading fees.",
    createdAt: "2026-05-15T10:30:00Z",
    upvotes: 18
  },
  {
    id: "rev2",
    toolId: "firebase",
    authorUsername: "sarah_code",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=sarah_code",
    authorBio: "Mobile Dev @ Unicorn Corp",
    rating: 5,
    title: "Vitals are perfect. Push notifications save lives",
    content: "We use Firebase Cloud Messaging (FCM) and Firebase Auth for our React Native application. It is robust, works across Android and iOS out-of-the-box, and saves hundreds of hours of backend setup. Absolute benchmark.",
    createdAt: "2026-05-20T14:45:00Z",
    upvotes: 12
  },
  {
    id: "rev3",
    toolId: "firebase",
    authorUsername: "brutal_backend",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=brutal",
    authorBio: "Go/Postgres purist",
    rating: 3,
    title: "Vendor lock-in is a big issue",
    content: "It behaves marvelously for small databases, but migrating away from Firestore is exceptionally painful as it forces you into document schemas. Write-intensive scaling starts costing significantly more than a simple PostgreSQL VPS host.",
    createdAt: "2026-06-01T08:15:00Z",
    upvotes: 21
  },
  {
    id: "rev4",
    toolId: "supabase",
    authorUsername: "lee_tech",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=lee",
    authorBio: "Indie Hacker & NextJS guru",
    rating: 5,
    title: "PostgreSQL with a serverless wrapper is stunning",
    content: "Supabase delivers what Firebase should have been. You get standardSQL relation schemas, custom foreign keys, triggers, and Row Level Security (RLS) directly mapped to database rules. Highly recommended for relational models.",
    createdAt: "2026-06-02T19:22:00Z",
    upvotes: 32
  },
  {
    id: "rev5",
    toolId: "supabase",
    authorUsername: "alexdev",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=alexdev",
    authorBio: "Fullstock Engineer | MVP Builder",
    rating: 4,
    title: "Amazing platform, but watch Edge function warmups",
    content: "Row Level Security keeps our code extremely clean. The documentation is top-tier. Sometimes, cold start on edge functions can take a second, but all in all, it is the best open-source backend tool out there.",
    createdAt: "2026-06-04T12:00:00Z",
    upvotes: 15
  },
  {
    id: "rev6",
    toolId: "react",
    authorUsername: "dan_abramov_fan",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=dan",
    authorBio: "Senior React Engineer",
    rating: 5,
    title: "The standard for modern web component structure",
    content: "React 19 continues to streamline layout logic. The ecosystem is massive: finding npm packages, troubleshooting stack overflows, and recruiting developers is always seamless. It remains the absolute market consensus.",
    createdAt: "2026-05-10T11:00:00Z",
    upvotes: 24
  },
  {
    id: "rev7",
    toolId: "tailwind-css",
    authorUsername: "lee_tech",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=lee",
    authorBio: "Indie Hacker & NextJS guru",
    rating: 5,
    title: "I can never write standard CSS again!",
    content: "Tailwind radically changes standard web styling iterations. Eliminates file jumping entirely; everything sits directly in the markup. Production bundle remains extremely compact as unused classes get completely stripped off.",
    createdAt: "2026-05-28T16:40:00Z",
    upvotes: 41
  },
  {
    id: "rev8",
    toolId: "docker",
    authorUsername: "brutal_backend",
    authorAvatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=brutal",
    authorBio: "Go/Postgres purist",
    rating: 5,
    title: "Works on my machine - permanently",
    content: "If you aren't using containers for backend microservices in 2026, you are building setups prone to crash. It takes 15 minutes to write a solid Dockerfile, and your deployment runs flawlessly across local setups, AWS, and Cloud Run.",
    createdAt: "2026-06-03T09:00:00Z",
    upvotes: 19
  }
];

export const DEMO_USER_PROFILE: UserProfile = {
  username: "alexdev",
  name: "Alex Dev",
  avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=alexdev",
  bio: "Fullstack Engineer building SaaS products. Love open source tech stacks, next.js, and postgreSQL database optimization.",
  joinedDate: "October 2024",
  reviewsCount: 2,
  totalUpvotesReceived: 33
};

export const INITIAL_ISSUES: ContributorIssue[] = [
  {
    id: "iss-1",
    title: "feat: Add Appwrite review list sorting options (Trending / Most Recent)",
    status: "open",
    labels: ["good first issue", "enhancement"],
    commentsCount: 3,
    createdAt: "2026-06-03"
  },
  {
    id: "iss-2",
    title: "bug: Fix star rating rendering fractional values on tool cards",
    status: "open",
    labels: ["bug", "help wanted"],
    commentsCount: 1,
    createdAt: "2026-06-04"
  },
  {
    id: "iss-3",
    title: "docs: Add CONTRIBUTING guidelines for suggesting review tags",
    status: "closed",
    labels: ["documentation"],
    commentsCount: 5,
    createdAt: "2026-06-01"
  }
];
