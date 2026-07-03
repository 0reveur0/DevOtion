import React from 'react'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function Skeleton({ className = '', children }: Props) {
  return (
    <div className={`animate-pulse bg-transparent ${className}`}>
      <div className="[&_div]:bg-zinc-200/60 [&_div]:rounded-sm [&_div]:border [&_div]:border-zinc-200">{children}</div>
    </div>
  )
}
