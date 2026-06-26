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
        <RiSearchLine className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400 pointer-events-none" />
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
            'flex h-9 w-full border border-gray-200 bg-white',
            'pl-9 pr-9 text-sm text-gray-900',
            'placeholder:text-gray-400',
            'outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30',
            'transition-all'
          )}
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setIsOpen(false); inputRef.current?.focus() }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <RiCloseLine className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden border border-gray-200 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.06)]">
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
                    'flex cursor-pointer items-center justify-between gap-3 px-3 py-2.5 transition-colors border-b border-gray-100 last:border-0',
                    idx === activeIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center border border-gray-200 bg-gray-100 font-mono text-xs font-bold text-gray-500">
                      {tool.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{tool.name}</p>
                      <p className="text-xs text-gray-500 truncate">{tool.description}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="hidden sm:inline-block border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-xs text-gray-500">
                      {CATEGORY_LABELS[tool.category] ?? tool.category}
                    </span>
                    <RiArrowRightUpLine className={cn('h-3.5 w-3.5', idx === activeIndex ? 'text-blue-500' : 'text-gray-300')} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              No tools found for "<span className="text-gray-900">{query}</span>"
            </div>
          )}
          <div className="flex items-center gap-3 border-t border-gray-100 bg-gray-50 px-3 py-1.5 text-xs text-gray-400">
            <span className="flex items-center gap-1"><kbd className="border border-gray-200 bg-white px-1 font-mono">↑↓</kbd> navigate</span>
            <span className="flex items-center gap-1"><kbd className="border border-gray-200 bg-white px-1 font-mono">↵</kbd> select</span>
            <span className="flex items-center gap-1"><kbd className="border border-gray-200 bg-white px-1 font-mono">Esc</kbd> close</span>
          </div>
        </div>
      )}
    </div>
  )
}
