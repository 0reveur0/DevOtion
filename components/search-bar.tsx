'use client'

import * as React from 'react'
import { RiSearchLine, RiCloseLine } from '@remixicon/react'
import { cn } from '@/lib/utils'

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
}

export function SearchBar({ className, onClear, value, ...props }: SearchBarProps) {
  return (
    <div className="relative">
      <RiSearchLine className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        className={cn(
          'flex h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-10 text-sm outline-none',
          'placeholder:text-gray-400',
          'focus:border-gray-400 focus:ring-1 focus:ring-gray-400',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <RiCloseLine className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
