import { Link } from 'wouter'
import { RiCodeSSlashLine, RiGithubFill, RiTwitterXFill } from '@remixicon/react'

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <RiCodeSSlashLine className="h-5 w-5 text-indigo-400" />
              <span className="font-semibold text-white">DevOtion</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500">
              Community-driven reviews for developer tools and technologies.
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-slate-300">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><Link href="/#tools" className="hover:text-slate-300 transition-colors">Browse Tools</Link></li>
              <li><Link href="/#categories" className="hover:text-slate-300 transition-colors">Categories</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-slate-300">Community</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-slate-300">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-500">
              <li><Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} DevOtion. MIT License. Built by the community, for the community.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-400 transition-colors">
              <RiGithubFill className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-400 transition-colors">
              <RiTwitterXFill className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
