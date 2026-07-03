"use client"

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  RiStarLine,
  RiStarFill,
  RiLoader4Line,
} from '@remixicon/react'
import { devTools } from '../artifacts/devotion/src/constants/mockData'

const MAX_LENGTH = 1000

export default function WriteReviewForm() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState<number | null>(null)
  const [pros, setPros] = useState<string[]>([''])
  const [cons, setCons] = useState<string[]>([''])
  const [content, setContent] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const options = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return devTools.slice(0, 20)
    return devTools.filter((t: any) => {
      return (
        t.name.toLowerCase().includes(q) ||
        (t.slug && t.slug.toLowerCase().includes(q)) ||
        (t.description && t.description.toLowerCase().includes(q))
      )
    })
  }, [query])

  function addPro() {
    setPros((p) => [...p, ''])
  }
  function removePro(i: number) {
    setPros((p) => p.filter((_, idx) => idx !== i))
  }
  function updatePro(i: number, v: string) {
    setPros((p) => p.map((s, idx) => (idx === i ? v : s)))
  }

  function addCon() {
    setCons((c) => [...c, ''])
  }
  function removeCon(i: number) {
    setCons((c) => c.filter((_, idx) => idx !== i))
  }
  function updateCon(i: number, v: string) {
    setCons((c) => c.map((s, idx) => (idx === i ? v : s)))
  }

  function validate() {
    const errs: string[] = []
    if (!selectedSlug) errs.push('Please select a tool to review.')
    if (rating <= 0) errs.push('Please provide a rating greater than 0.')
    if (content.trim().length < 20) errs.push('Review content must be at least 20 characters.')
    setErrors(errs)
    return errs.length === 0
  }

  async function onSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 900))
      const payload = {
        tool: selectedSlug,
        rating,
        pros: pros.filter(Boolean),
        cons: cons.filter(Boolean),
        content,
        anonymous,
      }
      console.log('Submitting review', payload)
      // After submit, navigate to tool page
      router.push(`/tools/${selectedSlug}`)
    } catch (err) {
      setErrors(['Failed to submit review. Try again.'])
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full rounded-md border border-zinc-200 bg-white p-4 text-zinc-900">
      <div className="grid gap-3">
        {/* Tool selector */}
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">Tool</label>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search or pick a tool..."
              className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-0"
            />

            {query.length > 0 && (
              <ul className="absolute z-40 mt-1 max-h-52 w-full overflow-auto rounded-md border border-zinc-200 bg-white">
                {options.length === 0 && <li className="px-3 py-2 text-sm text-zinc-600">No tools match "{query}"</li>}
                {options.map((t: any) => (
                  <li
                    key={t.slug}
                    onClick={() => {
                      setSelectedSlug(t.slug)
                      setQuery(t.name)
                    }}
                    className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-zinc-50"
                  >
                    <div className="flex flex-col">
                      <span className="font-semibold text-zinc-900">{t.name}</span>
                      <span className="text-xs text-zinc-600">{t.description}</span>
                    </div>
                    <div className="text-xs font-mono text-zinc-500">{t.avgRating?.toFixed(1) ?? '—'} ★</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {selectedSlug && (
            <div className="mt-2 text-xs text-zinc-600">Selected: <span className="font-medium">{selectedSlug}</span></div>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">Rating</label>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => {
                const filled = (hoverRating ?? rating) >= n
                return (
                  <button
                    key={n}
                    type="button"
                    aria-label={`${n} star`}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => setRating(n)}
                    className="rounded p-1"
                  >
                    {filled ? <RiStarFill className="h-5 w-5 text-amber-400" /> : <RiStarLine className="h-5 w-5 text-zinc-400" />}
                  </button>
                )
              })}
            </div>
            <div className="text-xs font-mono text-zinc-700">[{(rating || 0).toFixed(1)} / 5.0]</div>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid gap-2 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">Pros</label>
            <div className="flex flex-col gap-2">
              {pros.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={p}
                    onChange={(e) => updatePro(i, e.target.value)}
                    placeholder="Add a pro"
                    className="flex-1 rounded-md border border-zinc-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 placeholder:text-emerald-500 focus:border-zinc-900 focus:ring-0"
                  />
                  <button type="button" onClick={() => removePro(i)} className="text-sm text-zinc-500">Remove</button>
                </div>
              ))}
              <button type="button" onClick={addPro} className="mt-1 text-sm text-emerald-700">+ Add pro</button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-zinc-700">Cons</label>
            <div className="flex flex-col gap-2">
              {cons.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={c}
                    onChange={(e) => updateCon(i, e.target.value)}
                    placeholder="Add a con"
                    className="flex-1 rounded-md border border-zinc-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 placeholder:text-rose-500 focus:border-zinc-900 focus:ring-0"
                  />
                  <button type="button" onClick={() => removeCon(i)} className="text-sm text-zinc-500">Remove</button>
                </div>
              ))}
              <button type="button" onClick={addCon} className="mt-1 text-sm text-rose-700">+ Add con</button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700">Review</label>
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your technical review (minimum 20 characters)"
              maxLength={MAX_LENGTH}
              rows={6}
              className="w-full resize-y rounded-md border border-zinc-200 px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-0"
            />
            <div className="absolute right-3 bottom-2 text-xs font-mono text-zinc-500">{content.length} / {MAX_LENGTH}</div>
          </div>
        </div>

        {/* Anonymous toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="h-4 w-4" />
              <span className="text-sm text-zinc-700">Post anonymously</span>
            </label>
            <div className="text-xs text-zinc-500">or post with GitHub Verified Profile</div>
          </div>

          <div className="flex items-center gap-3">
            {errors.length > 0 && (
              <div className="text-xs text-rose-600">{errors[0]}</div>
            )}
            <button
              type="button"
              onClick={onSubmit}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-md bg-[#1A1A1E] px-4 py-2 text-sm font-medium text-white hover:bg-black disabled:opacity-60"
            >
              {loading ? <RiLoader4Line className="h-4 w-4 animate-spin" /> : 'Submit Review'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
