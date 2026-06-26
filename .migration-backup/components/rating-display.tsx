import * as React from 'react'
import { RiStarFill, RiStarLine } from '@remixicon/react'

interface RatingDisplayProps {
  rating: number
  maxRating?: number
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function RatingDisplay({
  rating,
  maxRating = 5,
  showValue = true,
  size = 'md',
}: RatingDisplayProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, index) => {
        const isFilled = index < Math.round(rating)
        const Icon = isFilled ? RiStarFill : RiStarLine

        return (
          <Icon
            key={index}
            className={`${sizeClasses[size]} ${
              isFilled ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
            }`}
          />
        )
      })}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
      )}
    </div>
  )
}
