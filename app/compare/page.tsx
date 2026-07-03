"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { RiExchangeLine, RiStarFill } from '@remixicon/react'
import ReviewCard from '../../components/review-card'
import { devTools, socialReviews, CATEGORIES } from '../../artifacts/devotion/src/constants/mockData'

type DevTool = {
  slug: string
  name: string
  category: string
  avgRating?: number
  totalReviews?: number
  description?: string
  githubUrl?: string
}

export default function ComparePage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [toolA, setToolA] = useState<DevTool | null>(null)
  const [toolB, setToolB] = useState<DevTool | null>(null)

  const [openA, setOpenA] = useState(false)
  const [openB, setOpenB] = useState(false)
  const [qA, setQA] = useState('')
  const [qB, setQB] = useState('')

  useEffect(() => {
    const a = searchParams?.get('a')
    const b = searchParams?.get('b')
    if (a) {
      const found = (devTools as any).find((t: any) => t.slug === a)
      if (found) setToolA(found)
    }
    if (b) {
      const found = (devTools as any).find((t: any) => t.slug === b)
      if (found) setToolB(found)
    }
  }, [searchParams])

  const grouped = useMemo(() => {
    const map: Record<string, DevTool[]> = {}
    for (const t of devTools as any[]) {
      if (!map[t.category]) map[t.category] = []
      map[t.category].push(t)
    }
    return map
  }, [])

  function chooseToolA(t: DevTool) {
    setToolA(t)
    setOpenA(false)
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set('a', t.slug)
    router.replace(`/compare?${params.toString()}`)
  }

  function chooseToolB(t: DevTool) {
    setToolB(t)
    setOpenB(false)
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    params.set('b', t.slug)
    router.replace(`/compare?${params.toString()}`)
  }

  const filteredA = useMemo(() => {
    const q = qA.trim().toLowerCase()
    if (!q) return devTools as DevTool[]
    return (devTools as DevTool[]).filter((t) => t.name.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q))
  }, [qA])

  const filteredB = useMemo(() => {
    const q = qB.trim().toLowerCase()
    if (!q) return devTools as DevTool[]
    return (devTools as DevTool[]).filter((t) => t.name.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q))
  }, [qB])

  function winnerBadge(left: number | undefined, right: number | undefined, side: 'left' | 'right') {
    if (left == null || right == null) return null
    if (left === right) return null
    const leftWins = left > right
    if ((side === 'left' && leftWins) || (side === 'right' && !leftWins)) {
      return <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-mono text-emerald-700">Top</span>
    }
    return null
  }

  const reviewsA = toolA ? ((socialReviews as any)[toolA.slug] ?? []).slice(0, 3) : []
  const reviewsB = toolB ? ((socialReviews as any)[toolB.slug] ?? []).slice(0, 3) : []

  return (
    <div className="py-12">
      <div className="container max-w-6xl">
        <h1 className="text-2xl font-bold text-zinc-900">Tool Comparison</h1>
        <p className="mt-2 text-sm text-zinc-600">Select two technologies to compare metrics and community feedback side-by-side.</p>

        {/* Selectors */}
        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative w-full md:w-1/2">
            <label className="mb-2 block text-sm font-medium text-zinc-700">Tool A</label>
            <div className="rounded-md border border-zinc-200 bg-white px-3 py-2">
              <div className="flex items-center justify-between">
                <div>{toolA ? <div className="font-semibold text-zinc-900">{toolA.name}</div> : <div className="text-sm text-zinc-600">No tool selected</div>}</div>
                <div className="flex items-center gap-2">
                  <input className="border border-zinc-100 px-2 py-1 text-sm" placeholder="Search" value={qA} onChange={(e) => setQA(e.target.value)} />
                  <button type="button" onClick={() => setOpenA((v) => !v)} className="text-sm text-zinc-700">Select</button>
                </div>
              </div>
            </div>

            {openA && (
              <div className="absolute z-40 mt-2 max-h-64 w-full overflow-auto rounded-md border border-zinc-200 bg-white">
                {Object.entries(grouped).map(([cat, tools]) => (
                  <div key={cat} className="border-b border-zinc-50 last:border-b-0">
                    <div className="px-3 py-2 text-xs font-mono text-zinc-500">{cat}</div>
                    {tools
                      .filter((t) => t.name.toLowerCase().includes(qA.toLowerCase()) || qA === '')
                      .map((t) => (
                        <div key={t.slug} onClick={() => chooseToolA(t)} className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2 hover:bg-zinc-50">
                          <div>
                            <div className="font-medium text-zinc-900">{t.name}</div>
                            <div className="text-xs text-zinc-600">{t.description}</div>
                          </div>
                          <div className="text-xs font-mono text-zinc-500">{t.avgRating?.toFixed(1) ?? '—'} ★</div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative w-full md:w-1/2">
            <label className="mb-2 block text-sm font-medium text-zinc-700">Tool B</label>
            <div className="rounded-md border border-zinc-200 bg-white px-3 py-2">
              <div className="flex items-center justify-between">
                <div>{toolB ? <div className="font-semibold text-zinc-900">{toolB.name}</div> : <div className="text-sm text-zinc-600">No tool selected</div>}</div>
                <div className="flex items-center gap-2">
                  <input className="border border-zinc-100 px-2 py-1 text-sm" placeholder="Search" value={qB} onChange={(e) => setQB(e.target.value)} />
                  <button type="button" onClick={() => setOpenB((v) => !v)} className="text-sm text-zinc-700">Select</button>
                </div>
              </div>
            </div>

            {openB && (
              <div className="absolute z-40 mt-2 max-h-64 w-full overflow-auto rounded-md border border-zinc-200 bg-white">
                {Object.entries(grouped).map(([cat, tools]) => (
                  <div key={cat} className="border-b border-zinc-50 last:border-b-0">
                    <div className="px-3 py-2 text-xs font-mono text-zinc-500">{cat}</div>
                    {tools
                      .filter((t) => t.name.toLowerCase().includes(qB.toLowerCase()) || qB === '')
                      .map((t) => (
                        <div key={t.slug} onClick={() => chooseToolB(t)} className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2 hover:bg-zinc-50">
                          <div>
                            <div className="font-medium text-zinc-900">{t.name}</div>
                            <div className="text-xs text-zinc-600">{t.description}</div>
                          </div>
                          <div className="text-xs font-mono text-zinc-500">{t.avgRating?.toFixed(1) ?? '—'} ★</div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Empty state */}
        {!toolA && !toolB && (
          <div className="mt-8 rounded-md border border-zinc-200 bg-white p-8 text-center text-zinc-700">
            <div className="mx-auto inline-flex items-center gap-3 rounded-full bg-zinc-50 px-4 py-3">
              <RiExchangeLine className="h-6 w-6 text-zinc-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900">Select two technologies to begin comparison</h3>
            <p className="mt-2 text-sm text-zinc-600">Select two technologies from our registry to begin hardware/software benchmarking and community review breakdown.</p>
          </div>
        )}

        {/* Matrix View */}
        {toolA && toolB && (
          <div className="mt-8 grid gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-sm font-medium text-zinc-700">{toolA.name}</div>
                  <div className="mt-1 text-xs font-mono text-zinc-500">{toolA.category}</div>
                </div>
                <div className="text-sm font-mono text-zinc-400">VS</div>
                <div>
                  <div className="text-sm font-medium text-zinc-700">{toolB.name}</div>
                  <div className="mt-1 text-xs font-mono text-zinc-500">{toolB.category}</div>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-zinc-200 bg-white p-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="flex flex-col items-start gap-2">
                  <div className="text-xs text-zinc-500">Overall Rating</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-mono text-zinc-900">{toolA.avgRating?.toFixed(1) ?? '—'}</div>
                      <RiStarFill className="h-4 w-4 text-amber-400" />
                      {winnerBadge(toolA.avgRating, toolB.avgRating, 'left')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <div className="text-xs text-zinc-500">Review Count</div>
                  <div className="text-sm font-mono text-zinc-900">{toolA.totalReviews ?? 0}</div>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <div className="text-xs text-zinc-500">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {(toolA.pros || []).slice(0, 4).map((p: string, i: number) => (
                      <span key={i} className="rounded-md bg-zinc-50 px-2 py-1 text-xs font-mono text-zinc-700">{p.split(' ')[0]}</span>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="my-4 border-zinc-100" />

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <div className="text-xs text-zinc-500">Overall Rating</div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-mono text-zinc-900">{toolB.avgRating?.toFixed(1) ?? '—'}</div>
                      <RiStarFill className="h-4 w-4 text-amber-400" />
                      {winnerBadge(toolA.avgRating, toolB.avgRating, 'right')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-xs text-zinc-500">Review Count</div>
                  <div className="text-sm font-mono text-zinc-900">{toolB.totalReviews ?? 0}</div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-xs text-zinc-500">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {(toolB.pros || []).slice(0, 4).map((p: string, i: number) => (
                      <span key={i} className="rounded-md bg-zinc-50 px-2 py-1 text-xs font-mono text-zinc-700">{p.split(' ')[0]}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Dual feeds */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-3 text-sm font-semibold text-zinc-900">{toolA.name} — Recent Reviews</h4>
                <div className="flex flex-col gap-4">
                  {reviewsA.map((r: any) => (
                    <ReviewCard key={r.id} review={r} authorName={r.authorUsername} />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold text-zinc-900">{toolB.name} — Recent Reviews</h4>
                <div className="flex flex-col gap-4">
                  {reviewsB.map((r: any) => (
                    <ReviewCard key={r.id} review={r} authorName={r.authorUsername} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
