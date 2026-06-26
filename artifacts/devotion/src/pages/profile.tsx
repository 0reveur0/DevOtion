import { useParams } from 'wouter'
import {
  RiStarLine,
  RiThumbUpLine,
  RiChatQuoteLine,
  RiCalendarLine,
  RiSettingsLine,
} from '@remixicon/react'
import { CustomCard } from '@/components/ui/custom-card'
import { CustomButton } from '@/components/ui/custom-button'
import { UserAvatar } from '@/components/user-avatar'
import { EmptyState } from '@/components/empty-state'
import { MOCK_USER } from '@/constants'

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const user = username === MOCK_USER.username ? MOCK_USER : null

  if (!user) {
    return (
      <div className="py-12">
        <div className="container max-w-4xl text-center">
          <h1 className="text-2xl font-bold text-gray-900">User Not Found</h1>
          <p className="mt-2 text-gray-600">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="container max-w-4xl">
        {/* Profile Header */}
        <CustomCard className="p-8">
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
            <CustomButton variant="outline" className="self-start">
              <RiSettingsLine className="mr-2 h-4 w-4" />
              Edit Profile
            </CustomButton>
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
                <span className="text-2xl font-bold text-gray-900">{user.totalUpvotesReceived}</span>
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
        </CustomCard>

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
