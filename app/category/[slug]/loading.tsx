import React from 'react'
import Skeleton from '../../../components/ui/skeleton'

export default function CategoryLoading() {
  return (
    <div className="py-12">
      <div className="container max-w-6xl">
        <Skeleton>
          <div className="rounded-md border border-zinc-200 bg-white p-6">
            <div className="h-24 w-full rounded-md bg-zinc-200/60" />
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-md border border-zinc-200 bg-white p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-md bg-zinc-200/60" />
                    <div className="flex-1">
                      <div className="h-4 w-40 bg-zinc-200/60" />
                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-3 w-24 bg-zinc-200/60" />
                        <div className="h-3 w-16 bg-zinc-200/60" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  )
}
