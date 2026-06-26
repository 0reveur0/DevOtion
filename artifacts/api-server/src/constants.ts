export type CategorySlug =
  | 'frontend' | 'backend' | 'database' | 'devops'
  | 'cloud' | 'mobile' | 'ai' | 'testing' | 'design'

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

export const CATEGORIES: Category[] = [
  { slug: 'frontend', name: 'Frontend', description: 'UI frameworks, libraries, and tools for building user interfaces', icon: 'RiLayoutLine' },
  { slug: 'backend', name: 'Backend', description: 'Server-side frameworks, APIs, and backend services', icon: 'RiServerLine' },
  { slug: 'database', name: 'Database', description: 'Database systems, ORMs, and data management tools', icon: 'RiDatabase2Line' },
  { slug: 'devops', name: 'DevOps', description: 'CI/CD, containerization, and infrastructure tools', icon: 'RiGitBranchLine' },
  { slug: 'cloud', name: 'Cloud', description: 'Cloud platforms and cloud-native services', icon: 'RiCloudLine' },
  { slug: 'mobile', name: 'Mobile', description: 'Mobile development frameworks and tools', icon: 'RiSmartphoneLine' },
  { slug: 'ai', name: 'AI', description: 'Machine learning, AI APIs, and LLM tools', icon: 'RiBrainLine' },
  { slug: 'testing', name: 'Testing', description: 'Testing frameworks, tools, and quality assurance', icon: 'RiTestTubeLine' },
  { slug: 'design', name: 'Design', description: 'Design tools, UI kits, and prototyping platforms', icon: 'RiPaletteLine' },
]

export const FEATURED_TOOLS: Tool[] = [
  { id: '1', name: 'React', slug: 'react', description: 'A JavaScript library for building user interfaces', longDescription: 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces.', category: 'frontend', websiteUrl: 'https://react.dev', githubUrl: 'https://github.com/facebook/react', avgRating: 4.8, totalReviews: 1247 },
  { id: '2', name: 'Next.js', slug: 'nextjs', description: 'The React framework for production', longDescription: 'Next.js gives you the best developer experience with all the features you need for production.', category: 'frontend', websiteUrl: 'https://nextjs.org', githubUrl: 'https://github.com/vercel/next.js', avgRating: 4.7, totalReviews: 983 },
  { id: '3', name: 'Supabase', slug: 'supabase', description: 'Open source Firebase alternative with a PostgreSQL database', longDescription: 'Supabase is an open source Firebase alternative with a Postgres database, Authentication, and more.', category: 'backend', websiteUrl: 'https://supabase.com', githubUrl: 'https://github.com/supabase/supabase', avgRating: 4.9, totalReviews: 756 },
  { id: '4', name: 'Tailwind CSS', slug: 'tailwind-css', description: 'A utility-first CSS framework for rapidly building custom user interfaces', category: 'frontend', websiteUrl: 'https://tailwindcss.com', githubUrl: 'https://github.com/tailwindlabs/tailwindcss', avgRating: 4.6, totalReviews: 1089 },
  { id: '5', name: 'Docker', slug: 'docker', description: 'Platform for developing, shipping, and running applications in containers', category: 'devops', websiteUrl: 'https://www.docker.com', githubUrl: 'https://github.com/docker/cli', avgRating: 4.5, totalReviews: 892 },
  { id: '6', name: 'PostgreSQL', slug: 'postgresql', description: 'The worlds most advanced open source relational database', category: 'database', websiteUrl: 'https://www.postgresql.org', githubUrl: 'https://github.com/postgres/postgres', avgRating: 4.9, totalReviews: 1423 },
]

export const TOOLS_BY_CATEGORY: Record<CategorySlug, Tool[]> = {
  frontend: [
    { id: '1', name: 'React', slug: 'react', description: 'A JavaScript library for building user interfaces', category: 'frontend', avgRating: 4.8, totalReviews: 1247 },
    { id: '4', name: 'Tailwind CSS', slug: 'tailwind-css', description: 'A utility-first CSS framework for rapid UI development', category: 'frontend', avgRating: 4.6, totalReviews: 1089 },
    { id: '2', name: 'Next.js', slug: 'nextjs', description: 'The React framework for production', category: 'frontend', avgRating: 4.7, totalReviews: 983 },
    { id: '11', name: 'Vue.js', slug: 'vuejs', description: 'The progressive JavaScript framework', category: 'frontend', avgRating: 4.5, totalReviews: 634 },
  ],
  backend: [
    { id: '3', name: 'Supabase', slug: 'supabase', description: 'Open source Firebase alternative', category: 'backend', avgRating: 4.9, totalReviews: 756 },
    { id: '12', name: 'Firebase', slug: 'firebase', description: 'App development platform by Google', category: 'backend', avgRating: 4.3, totalReviews: 1102 },
    { id: '13', name: 'Express.js', slug: 'expressjs', description: 'Fast, unopinionated, minimalist web framework for Node.js', category: 'backend', avgRating: 4.4, totalReviews: 876 },
  ],
  database: [
    { id: '6', name: 'PostgreSQL', slug: 'postgresql', description: 'The worlds most advanced open source relational database', category: 'database', avgRating: 4.9, totalReviews: 1423 },
    { id: '14', name: 'MongoDB', slug: 'mongodb', description: 'A document-based NoSQL database', category: 'database', avgRating: 4.2, totalReviews: 987 },
    { id: '15', name: 'Redis', slug: 'redis', description: 'In-memory data structure store', category: 'database', avgRating: 4.7, totalReviews: 654 },
  ],
  devops: [
    { id: '5', name: 'Docker', slug: 'docker', description: 'Platform for developing and running applications in containers', category: 'devops', avgRating: 4.5, totalReviews: 892 },
    { id: '16', name: 'Kubernetes', slug: 'kubernetes', description: 'Production-grade container orchestration', category: 'devops', avgRating: 4.4, totalReviews: 543 },
    { id: '17', name: 'GitHub Actions', slug: 'github-actions', description: 'Automate your workflow from idea to production', category: 'devops', avgRating: 4.6, totalReviews: 782 },
  ],
  cloud: [
    { id: '18', name: 'Vercel', slug: 'vercel', description: 'Platform for frontend frameworks and serverless functions', category: 'cloud', avgRating: 4.7, totalReviews: 654 },
    { id: '19', name: 'AWS', slug: 'aws', description: 'Amazons cloud computing platform', category: 'cloud', avgRating: 4.1, totalReviews: 1234 },
    { id: '20', name: 'Cloudflare', slug: 'cloudflare', description: 'Web performance and security company', category: 'cloud', avgRating: 4.5, totalReviews: 567 },
  ],
  mobile: [
    { id: '21', name: 'React Native', slug: 'react-native', description: 'Create native apps for Android and iOS using React', category: 'mobile', avgRating: 4.4, totalReviews: 876 },
    { id: '22', name: 'Flutter', slug: 'flutter', description: 'Googles UI toolkit for building beautiful apps', category: 'mobile', avgRating: 4.5, totalReviews: 765 },
  ],
  ai: [
    { id: '23', name: 'OpenAI API', slug: 'openai', description: 'Powerful AI models including GPT-4', category: 'ai', avgRating: 4.6, totalReviews: 543 },
    { id: '24', name: 'LangChain', slug: 'langchain', description: 'Framework for developing LLM-powered applications', category: 'ai', avgRating: 4.4, totalReviews: 432 },
  ],
  testing: [
    { id: '25', name: 'Jest', slug: 'jest', description: 'Delightful JavaScript testing', category: 'testing', avgRating: 4.5, totalReviews: 654 },
    { id: '26', name: 'Cypress', slug: 'cypress', description: 'Fast, easy and reliable testing for anything that runs in a browser', category: 'testing', avgRating: 4.3, totalReviews: 456 },
  ],
  design: [
    { id: '27', name: 'Figma', slug: 'figma', description: 'Collaborative interface design tool', category: 'design', avgRating: 4.8, totalReviews: 1123 },
    { id: '28', name: 'Storybook', slug: 'storybook', description: 'Build component libraries and UIs in isolation', category: 'design', avgRating: 4.4, totalReviews: 567 },
  ],
}
