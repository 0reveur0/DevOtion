import { CustomAvatar } from '@/components/ui/custom-avatar'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function UserAvatar({ src, alt, name, size = 'md', className }: UserAvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  }

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : null

  return (
    <CustomAvatar
      src={src}
      alt={alt || 'User avatar'}
      fallback={
        initials ? (
          <span className={cn('font-semibold text-gray-600', sizeClasses[size])}>{initials}</span>
        ) : undefined
      }
      className={cn(sizeClasses[size], className)}
    />
  )
}
