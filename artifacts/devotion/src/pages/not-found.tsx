import { Link } from 'wouter'
import { RiErrorWarningLine } from '@remixicon/react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f8f9fa] px-4">
      <div className="w-full max-w-md border border-gray-200 bg-white p-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.04)] text-center">
        <div className="flex items-center justify-center gap-2 font-mono text-xs text-gray-400 mb-6">
          <RiErrorWarningLine className="h-4 w-4 text-red-400" />
          ERROR 404
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/">
          <button className="mt-6 border border-blue-600 bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  )
}
