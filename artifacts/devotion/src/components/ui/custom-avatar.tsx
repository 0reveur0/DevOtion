import * as React from 'react'
import { cn } from '@/lib/utils'
import { RiUserLine } from '@remixicon/react'

export interface CustomAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
}

export function CustomAvatar({ src, alt, fallback, className, ...props }: CustomAvatarProps) {
  const [error, setError] = React.useState(false)

  return (
    <div
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100',
        className
      )}
      {...props}
    >
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          {fallback || <RiUserLine className="h-5 w-5" />}
        </div>
      )}
    </div>
  )
}
