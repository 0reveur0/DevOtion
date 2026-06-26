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
      <div className="min-h-screen bg-slate-950 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">User Not Found</h1>
        <p className="mt-2 text-slate-400">The profile you're looking for doesn't exist.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="container max-w-4xl">
        {/* Profile Header */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-20 w-20 rounded-2xl bg-slate-800 ring-1 ring-slate-700"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-1 sm:items-start">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <span className="text-slate-500">@{user.username}</span>
              </div>
              <p className="mt-3 max-w-lg text-slate-400">{user.bio}</p>
              <div className="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
                <RiCalendarLine className="h-4 w-4" />
                <span>Joined {user.joinedDate}</span>
              </div>
            </div>
            <button className="self-start inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors">
              <RiSettingsLine className="h-4 w-4" />
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-800 pt-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <RiChatQuoteLine className="h-5 w-5 text-indigo-400" />
                <span className="text-2xl font-bold text-white">{user.reviewsCount}</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">Reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <RiThumbUpLine className="h-5 w-5 text-indigo-400" />
                <span className="text-2xl font-bold text-white">{user.totalUpvotesReceived}</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">Upvotes Received</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5">
                <RiStarLine className="h-5 w-5 text-amber-400" />
                <span className="text-2xl font-bold text-white">--</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">Avg Rating Given</p>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-10">
          <h2 className="mb-6 text-xl font-bold text-white">Recent Reviews</h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 py-16 text-center">
            <RiChatQuoteLine className="mx-auto h-10 w-10 text-slate-700" />
            <p className="mt-3 font-semibold text-slate-400">No reviews yet</p>
            <p className="mt-1 text-sm text-slate-600">
              This user hasn't written any reviews yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
