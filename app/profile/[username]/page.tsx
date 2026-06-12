import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  RiStarLine,
  RiThumbUpLine,
  RiChatQuoteLine,
  RiCalendarLine,
  RiSettingsLine,
} from '@remixicon/react'
import { Card, Badge, Button } from '@/components/ui'
import { UserAvatar, EmptyState } from '@/components'
import { MOCK_USER } from '@/constants'

interface ProfilePageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: ProfilePageProps) {
  const { username } = await params
  return {
    title: `@${username} - DevOtion Profile`,
    description: `Profile and contributions by ${username} on DevOtion`,
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params

  // Mock user data - in real app, fetch from database
  const user = username === MOCK_USER.username ? MOCK_USER : null

  if (!user) {
    notFound()
  }

  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        {/* Profile Header */}
        <Card className="p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <UserAvatar name={user.name} size="xl" className="h-24 w-24 text-2xl" />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:items-start">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <span className="text-gray-500">@{user.username}</span>
              </div>
              <p className="mt-3 max-w-lg text-gray-600">{user.bio}</p>
              <div className="mt-4 flex items-center gap-1 text-sm text-gray-500">
                <RiCalendarLine className="h-4 w-4" />
                <span>Joined {user.joinedDate}</span>
              </div>
            </div>
            <Button variant="outline" className="self-start">
              <RiSettingsLine className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <RiChatQuoteLine className="h-5 w-5 text-gray-400" />
                <span className="text-2xl font-bold text-gray-900">{user.reviewsCount}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <RiThumbUpLine className="h-5 w-5 text-gray-400" />
                <span className="text-2xl font-bold text-gray-900">
                  {user.totalUpvotesReceived}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Upvotes Received</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <RiStarLine className="h-5 w-5 text-gray-400" />
                <span className="text-2xl font-bold text-gray-900">--</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Avg Rating Given</p>
            </div>
          </div>
        </Card>

        {/* Reviews List */}
        <div className="mt-10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Reviews</h2>
          </div>

          <EmptyState
            icon={<RiChatQuoteLine className="h-12 w-12" />}
            title="No reviews yet"
            description="This user hasn't written any reviews yet. Reviews will appear here when they do."
          />
        </div>
      </div>
    </div>
  )
}
