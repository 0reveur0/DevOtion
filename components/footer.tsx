import Link from 'next/link'
import { RiCodeSSlashLine, RiGithubFill, RiTwitterXFill } from '@remixicon/react'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <RiCodeSSlashLine className="h-6 w-6 text-gray-900" />
              <span className="font-semibold text-gray-900">DevOtion</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">
              Community-driven reviews for developer tools and technologies.
            </p>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-gray-900">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/#tools" className="hover:text-gray-900">
                  Browse Tools
                </Link>
              </li>
              <li>
                <Link href="/#categories" className="hover:text-gray-900">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/#featured" className="hover:text-gray-900">
                  Featured
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-gray-900">Community</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/contributing" className="hover:text-gray-900">
                  Contributing
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/devotion/devotion"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gray-900"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-gray-900">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/privacy" className="hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 md:flex-row">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DevOtion. MIT License. Built by the community, for the
            community.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-gray-600"
            >
              <RiGithubFill className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-gray-600"
            >
              <RiTwitterXFill className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
