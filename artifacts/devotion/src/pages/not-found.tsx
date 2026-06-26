import { Link } from 'wouter'
import { RiErrorWarningLine } from '@remixicon/react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
        <RiErrorWarningLine className="mx-auto h-12 w-12 text-red-400" />
        <h1 className="mt-4 text-2xl font-bold text-white">404 — Page Not Found</h1>
        <p className="mt-2 text-sm text-slate-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <button className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}
