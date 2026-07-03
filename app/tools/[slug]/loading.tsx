import React from 'react'
import Skeleton from '../../../components/ui/skeleton'

export default function ToolLoading() {
  return (
    <div className="py-12">
      <div className="container max-w-6xl">
        <Skeleton>
          <div className="rounded-lg border border-zinc-200 bg-white p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-xl bg-zinc-200/60" />
                <div className="flex-1">
                  <div className="h-6 w-64 bg-zinc-200/60" />
                  <div className="mt-3 h-4 w-48 bg-zinc-200/60" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-24 bg-zinc-200/60" />
                <div className="h-10 w-24 bg-zinc-200/60" />
              </div>
            </div>
          </div>
        </Skeleton>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <main className="md:col-span-2 flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <article key={i} className="rounded-md border border-zinc-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-zinc-200/60" />
                  <div className="flex-1">
                    <div className="h-4 w-40 bg-zinc-200/60" />
                    <div className="mt-2 h-3 w-32 bg-zinc-200/60" />
                    <div className="mt-3 h-24 w-full bg-zinc-200/60" />
                    <div className="mt-3 flex items-center gap-4">
                      <div className="h-3 w-12 bg-zinc-200/60" />
                      <div className="h-3 w-12 bg-zinc-200/60" />
                      <div className="h-3 w-12 bg-zinc-200/60" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </main>

          <aside className="md:col-span-1">
            <div className="rounded-md border border-zinc-200 bg-white p-4">
              <div className="h-4 w-48 bg-zinc-200/60" />
              <div className="mt-4 flex flex-col gap-2">
                <div className="h-3 w-32 bg-zinc-200/60" />
                <div className="h-3 w-24 bg-zinc-200/60" />
                <div className="h-3 w-36 bg-zinc-200/60" />
              </div>
              <div className="mt-6 grid gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-8 w-full rounded-md bg-zinc-200/60" />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
