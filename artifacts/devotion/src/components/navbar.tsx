import { Link } from 'wouter'
import { RiCodeSSlashLine, RiGithubFill } from '@remixicon/react'
import { SearchBar } from '@/components/search-bar'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
      <div className="container flex h-14 items-center gap-4">
        <div className="flex shrink-0 items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <RiCodeSSlashLine className="h-5 w-5 text-indigo-400" />
            <span className="font-semibold text-white">DevOtion</span>
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-400">
            <Link href="/#tools" className="hover:text-white transition-colors">
              Tools
            </Link>
            <Link href="/#categories" className="hover:text-white transition-colors">
              Categories
            </Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden sm:block w-64">
            <SearchBar placeholder="Search tools... /" className="[&_input]:h-9 [&_input]:text-xs" />
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <RiGithubFill className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  )
}
