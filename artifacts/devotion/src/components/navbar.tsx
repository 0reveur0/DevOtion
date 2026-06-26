import { Link } from 'wouter'
import { RiCodeSSlashLine, RiGithubFill } from '@remixicon/react'
import { SearchBar } from '@/components/search-bar'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="container flex h-12 items-center gap-4">
        <div className="flex shrink-0 items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <RiCodeSSlashLine className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-gray-900 tracking-tight">DevOtion</span>
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm text-gray-500">
            <Link href="/#tools" className="hover:text-gray-900 transition-colors">
              Tools
            </Link>
            <Link href="/#categories" className="hover:text-gray-900 transition-colors">
              Categories
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden sm:block w-64">
            <SearchBar
              placeholder="Search tools... /"
              className="[&_input]:h-8 [&_input]:text-xs [&_input]:rounded [&_input]:border-gray-200"
            />
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <RiGithubFill className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  )
}
