import Link from 'next/link'
import { RiCodeSSlashLine, RiGithubFill, RiSearchLine } from '@remixicon/react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <RiCodeSSlashLine className="h-6 w-6 text-gray-900" />
            <span className="font-semibold text-gray-900">DevOtion</span>
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-600">
            <Link href="/#tools" className="hover:text-gray-900">
              Tools
            </Link>
            <Link href="/#categories" className="hover:text-gray-900">
              Categories
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
          >
            <RiSearchLine className="h-4 w-4" />
            <span className="hidden sm:inline">Search tools...</span>
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-gray-200 bg-gray-50 px-1.5 font-mono text-xs sm:flex">
              <span>/</span>
            </kbd>
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 hover:text-gray-900"
          >
            <RiGithubFill className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  )
}
