import { Link } from 'wouter'
import { RiCodeSSlashLine, RiGithubFill, RiTwitterXFill } from '@remixicon/react'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <RiCodeSSlashLine className="h-4 w-4 text-blue-600" />
              <span className="font-semibold text-gray-900 tracking-tight">DevOtion</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              Community-driven reviews for developer tools and technologies.
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Product</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/#tools" className="text-gray-500 hover:text-gray-900 transition-colors">Browse Tools</Link></li>
              <li><Link href="/#categories" className="text-gray-500 hover:text-gray-900 transition-colors">Categories</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Community</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/privacy" className="text-gray-500 hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-500 hover:text-gray-900 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 md:flex-row">
          <p className="font-mono text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DevOtion — MIT License
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors">
              <RiGithubFill className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors">
              <RiTwitterXFill className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
