import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CustomCard({ className, ...props }: CustomCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm',
        className
      )}
      {...props}
    />
  )
}

export function CustomCardHeader({ className, ...props }: CustomCardProps) {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
}

export function CustomCardTitle({ className, ...props }: CustomCardProps) {
  return (
    <h3 className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
  )
}

export function CustomCardDescription({ className, ...props }: CustomCardProps) {
  return <p className={cn('text-sm text-gray-500', className)} {...props} />
}

export function CustomCardContent({ className, ...props }: CustomCardProps) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}

export function CustomCardFooter({ className, ...props }: CustomCardProps) {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
}
