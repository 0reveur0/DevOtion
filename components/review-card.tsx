"use client"

import React, { useState } from 'react'
import {
  RiStarFill,
  RiHeartLine,
  RiChat3Line,
  RiShareLine,
} from '@remixicon/react'

type Comment = {
  id: string
  authorUsername: string
  authorAvatar?: string
  content: string
}

type Review = {
  id: string
  toolSlug: string
  authorUsername: string
  authorAvatar?: string
  rating: number
  title?: string
  content: string
  createdAt?: string
  upvotes?: number
  comments?: Comment[]
}

interface Props {
  review: Review
  authorName?: string
  authorHeadline?: string
  verified?: boolean
}

export default function ReviewCard({ review, authorName, authorHeadline, verified }: Props) {
  const [liked, setLiked] = useState(false)
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="w-full rounded-lg border border-zinc-200 bg-white p-4 text-zinc-900">
      <header className="flex items-start gap-3">
        <img
          src={review.authorAvatar}
          alt={review.authorUsername}
          className="h-10 w-10 rounded-full border border-zinc-200 object-cover"
        />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-sm">{authorName || review.authorUsername}</span>
              <span className="font-mono text-xs text-zinc-600">@{review.authorUsername}</span>
            </div>
            {verified && (
              <span className="ml-2 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                GitHub Verified
              </span>
            )}
          </div>
          {authorHeadline && (
            <div className="mt-1 text-xs text-zinc-500">{authorHeadline}</div>
          )}
        </div>

        <div className="ml-2 flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-1 text-xs font-mono text-zinc-800">
            <RiStarFill className="h-4 w-4 text-amber-400" />
            <span>{review.rating.toFixed(1)}</span>
          </div>
        </div>
      </header>

      <div className="mt-3">
        {review.title && <h3 className="text-sm font-semibold text-zinc-900">{review.title}</h3>}
        <p className="mt-2 text-sm text-zinc-800 leading-relaxed">{review.content}</p>
      </div>

      <footer className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
          <button
            aria-pressed={liked}
            onClick={() => setLiked((v) => !v)}
            className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-zinc-50"
          >
            <RiHeartLine className={`h-4 w-4 ${liked ? 'text-rose-500' : 'text-zinc-500'}`} />
            <span>{liked ? (review.upvotes ?? 0) + 1 : review.upvotes ?? 0}</span>
          </button>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-zinc-50"
          >
            <RiChat3Line className="h-4 w-4 text-zinc-500" />
            <span>{review.comments ? review.comments.length : 0}</span>
          </button>

          <button className="flex items-center gap-1 rounded-md px-2 py-1 hover:bg-zinc-50">
            <RiShareLine className="h-4 w-4 text-zinc-500" />
            <span>Share</span>
          </button>
        </div>

        <div className="text-xs font-mono text-zinc-400">{review.createdAt}</div>
      </footer>

      {expanded && review.comments && review.comments.length > 0 && (
        <div className="mt-4 border-l-2 border-zinc-100 pl-4">
          <div className="flex flex-col gap-3">
            {review.comments.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <img src={c.authorAvatar} alt={c.authorUsername} className="h-6 w-6 rounded-full border border-zinc-200" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">{c.authorUsername}</span>
                    <span className="text-xs font-mono text-zinc-500">@{c.authorUsername}</span>
                  </div>
                  <div className="mt-1 text-xs text-zinc-700">{c.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
