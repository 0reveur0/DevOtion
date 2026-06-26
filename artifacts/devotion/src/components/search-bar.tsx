'use client'

import * as React from 'react'
import { useLocation } from 'wouter'
import { RiSearchLine, RiCloseLine, RiArrowRightUpLine } from '@remixicon/react'
import { cn } from '@/lib/utils'
import { ALL_TOOLS } from '@/constants'
import type { Tool } from '@/types'

const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  cloud: 'Cloud',
  mobile: 'Mobile',
  ai: 'AI / ML',
  testing: 'Testing',
  design: 'Design',
}

interface SearchBarProps {
  className?: string
  placeholder?: string
  onNavigate?: () => void
}

export function SearchBar({ className, placeholder = 'Search tools...', onNavigate }: SearchBarProps) {
  const [query, setQuery] = React.useState('')
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [, navigate] = useLocation()

  const results: Tool[] = React.useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return ALL_TOOLS.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    ).slice(0, 8)
  }, [query])

  React.useEffect(() => {
    setActiveIndex(-1)
  }, [query])

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  React.useEffect(() => {
    function handleSlash(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
    }
    document.addEventListener('keydown', handleSlash)
    return () => document.removeEventListener('keydown', handleSlash)
  }, [])

  function handleSelect(tool: Tool) {
    navigate(`/tools/${tool.slug}`)
    setQuery('')
    setIsOpen(false)
    inputRef.current?.blur()
    onNavigate?.()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || results.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i < results.length - 1 ? i + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i > 0 ? i - 1 : results.length - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && results[activeIndex]) {
        handleSelect(results[activeIndex])
      } else if (results[0]) {
        handleSelect(results[0])
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  const showDropdown = isOpen && query.trim().length > 0

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <div className="relative">
        <RiSearchLine className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex h-11 w-full rounded-xl border border-slate-700 bg-slate-800/80',
            'pl-10 pr-10 text-sm text-slate-100',
            'placeholder:text-slate-500',
            'outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
            'transition-all'
          )}
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setIsOpen(false); inputRef.current?.focus() }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <RiCloseLine className="h-4 w-4" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/40">
          {results.length > 0 ? (
            <ul role="listbox">
              {results.map((tool, idx) => (
                <li
                  key={tool.id}
                  role="option"
                  aria-selected={idx === activeIndex}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={(e) => { e.preventDefault(); handleSelect(tool) }}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-3 px-4 py-3 transition-colors',
                    idx === activeIndex ? 'bg-slate-800' : 'hover:bg-slate-800/60'
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-700 text-xs font-bold text-slate-300">
                      {tool.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-100 truncate">{tool.name}</p>
                      <p className="text-xs text-slate-500 truncate">{tool.description}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="hidden sm:inline-block rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                      {CATEGORY_LABELS[tool.category] ?? tool.category}
                    </span>
                    <RiArrowRightUpLine className={cn('h-4 w-4 transition-colors', idx === activeIndex ? 'text-indigo-400' : 'text-slate-600')} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center text-sm text-slate-500">
              No tools found for "<span className="text-slate-300">{query}</span>"
            </div>
          )}
          <div className="flex items-center gap-3 border-t border-slate-800 px-4 py-2 text-xs text-slate-600">
            <span className="flex items-center gap-1"><kbd className="rounded border border-slate-700 bg-slate-800 px-1 py-0.5 font-mono">↑↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="rounded border border-slate-700 bg-slate-800 px-1 py-0.5 font-mono">↵</kbd> select</span>
            <span className="flex items-center gap-1"><kbd className="rounded border border-slate-700 bg-slate-800 px-1 py-0.5 font-mono">Esc</kbd> close</span>
          </div>
        </div>
      )}
    </div>
  )
}
