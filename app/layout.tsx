import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'DevOtion',
    template: '%s | DevOtion',
  },
  description: 'Community-powered reviews for the tools developers use every day',
  keywords: [
    'frontend',
    'backend',
    'database',
    'devops',
    'cloud',
    'mobile',
    'ai',
    'testing',
    'design',
    'security',
    'observability',
    'big-data',
    'game-dev',
    'project-management',
    'web3',
  ],
  openGraph: {
    title: 'DevOtion',
    description: 'Community-powered reviews for the tools developers use every day',
    siteName: 'DevOtion',
    type: 'website',
    images: [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevOtion',
    description: 'Community-powered reviews for the tools developers use every day',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8F9FA] font-sans text-[#1A1A1E]">
        {children}
      </body>
    </html>
  )
}
