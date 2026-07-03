"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { RiSearchLine, RiStarFill } from '@remixicon/react'
import { devTools, CATEGORIES } from '../artifacts/devotion/src/constants/mockData'

const CATEGORY_COLORS: Record<string, string> = {
  frontend: '#FDE68A',
  backend: '#D1FAE5',
  database: '#DFF3FF',
  devops: '#FFE4E6',
  cloud: '#E9D5FF',
  mobile: '#E6FFFA',
  ai: '#FEF3C7',
  testing: '#FEE2E2',
  design: '#FCE7F3',
  security: '#EEF2FF',
  observability: '#F0F9FF',
  'big-data': '#FFF7ED',
  'game-dev': '#F8FAFC',
  'project-management': '#F7FDF4',
  web3: '#FFF1F2',
}

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)

  const results = query
    ? devTools.filter((t: any) => {
        const q = query.toLowerCase()
        return (
          t.name.toLowerCase().includes(q) ||
          (t.slug && t.slug.toLowerCase().includes(q)) ||
          (t.description && t.description.toLowerCase().includes(q))
        )
      })
    : []

  useEffect(() => {
    setOpen(query.length > 0)
    setHighlight(0)
  }, [query])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey && e.key.toLowerCase() === 'k') || e.key === '/') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const sel = results[highlight]
      if (sel) router.push(`/tools/${sel.slug}`)
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div className="relative w-full max-w-lg">
      <div className="flex items-center gap-3">
        <div className="relative flex w-full items-center">
          <RiSearchLine className="absolute left-3 h-4 w-4 text-zinc-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search tools, tags, or features"
            className="w-full rounded-md border border-zinc-200 bg-white px-10 py-2 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-0 transition-colors"
          />

          <div className="absolute right-2 flex items-center gap-2">
            <div className="font-mono text-[10px] bg-zinc-100 text-zinc-500 rounded px-1.5 py-0.5">⌘ K /</div>
          </div>
        </div>
      </div>

      {open && (
        <div className="absolute left-0 right-0 z-40 mt-2 max-h-72 overflow-auto rounded-md border border-zinc-200 bg-white text-zinc-900">
          <ul ref={listRef} className="flex flex-col">
            {results.length === 0 && (
              <li className="px-4 py-3 text-sm text-zinc-600">No tools found matching '{query}'</li>
            )}

            {results.map((t: any, idx: number) => {
              const cat = CATEGORIES.find((c) => c.slug === t.category)
              const bg = CATEGORY_COLORS[t.category] ?? '#F8FAFC'
              const isHighlighted = idx === highlight
              return (
                <li
                  key={t.slug}
                  onMouseEnter={() => setHighlight(idx)}
                  onClick={() => router.push(`/tools/${t.slug}`)}
                  className={`flex cursor-pointer items-center justify-between gap-3 px-4 py-2 ${
                    isHighlighted ? 'bg-zinc-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col">
                      <div className="text-sm font-semibold text-zinc-900">{t.name}</div>
                      <div className="mt-0.5 text-xs text-zinc-600">{t.description}</div>
                    </div>
                  </div>

                  <div className="ml-4 flex items-center gap-3">
                    <div style={{ background: bg }} className="rounded-md px-2 py-1 text-xs text-zinc-800">
                      {cat?.name ?? t.category}
                    </div>
                    <div className="flex items-center gap-1 font-mono text-xs text-zinc-500">
                      <span>{t.avgRating?.toFixed(1) ?? '—'}</span>
                      <RiStarFill className="h-3 w-3 text-amber-400" />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
