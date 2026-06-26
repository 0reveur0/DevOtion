import { useParams } from 'wouter'
import {
  RiStarLine,
  RiThumbUpLine,
  RiChatQuoteLine,
  RiCalendarLine,
  RiSettingsLine,
} from '@remixicon/react'
import { MOCK_USER } from '@/constants'

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const user = username === MOCK_USER.username ? MOCK_USER : null

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] py-20 text-center">
        <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">404 — not found</p>
        <h1 className="text-2xl font-bold text-gray-900">User Not Found</h1>
        <p className="mt-2 text-sm text-gray-500">The profile you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-8">
      <div className="container max-w-3xl">

        {/* Profile Header */}
        <div className="border border-gray-200 bg-white p-6">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-start">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-16 w-16 border border-gray-200 bg-gray-100"
            />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
              <p className="font-mono text-xs text-gray-500 mt-0.5">@{user.username}</p>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{user.bio}</p>
              <div className="mt-2 flex items-center gap-1.5 font-mono text-xs text-gray-400">
                <RiCalendarLine className="h-3.5 w-3.5" />
                <span>Joined {user.joinedDate}</span>
              </div>
            </div>
            <button className="shrink-0 inline-flex items-center gap-1.5 border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors">
              <RiSettingsLine className="h-3.5 w-3.5" />
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 pt-5">
            <div className="flex flex-col items-center gap-1 px-4 first:pl-0">
              <div className="flex items-center gap-1.5">
                <RiChatQuoteLine className="h-4 w-4 text-blue-500" />
                <span className="font-mono text-xl font-bold text-gray-900">{user.reviewsCount}</span>
              </div>
              <p className="text-xs text-gray-500">Reviews</p>
            </div>
            <div className="flex flex-col items-center gap-1 px-4">
              <div className="flex items-center gap-1.5">
                <RiThumbUpLine className="h-4 w-4 text-blue-500" />
                <span className="font-mono text-xl font-bold text-gray-900">{user.totalUpvotesReceived}</span>
              </div>
              <p className="text-xs text-gray-500">Upvotes Received</p>
            </div>
            <div className="flex flex-col items-center gap-1 px-4">
              <div className="flex items-center gap-1.5">
                <RiStarLine className="h-4 w-4 text-amber-500" />
                <span className="font-mono text-xl font-bold text-gray-900">—</span>
              </div>
              <p className="text-xs text-gray-500">Avg Rating</p>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-6">
          <h2 className="mb-4 text-base font-bold text-gray-900 border-b border-gray-200 pb-3">Recent Reviews</h2>
          <div className="border border-gray-200 bg-white py-12 text-center">
            <RiChatQuoteLine className="mx-auto h-8 w-8 text-gray-300" />
            <p className="mt-3 text-sm font-semibold text-gray-700">No reviews yet</p>
            <p className="mt-1 text-xs text-gray-500">
              This user hasn't written any reviews yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
