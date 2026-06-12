'use client'

import { useState } from 'react'
import { RiSearchLine, RiCheckboxCircleLine } from '@remixicon/react'
import { SearchBar, CategoryCard, ToolCard, Button } from '@/components'
import { CATEGORIES, FEATURED_TOOLS, TOOLS_BY_CATEGORY } from '@/constants'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTools = searchQuery
    ? FEATURED_TOOLS.filter(
        (tool) =>
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : FEATURED_TOOLS

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="container py-20 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Discover the Best
              <br />
              <span className="text-gray-600">Developer Tools</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Community-driven reviews for developer tools and technologies. Read honest experiences
              from real developers, not marketing materials.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-10 max-w-xl">
              <SearchBar
                placeholder="Search tools by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery('')}
                className="h-12 text-base"
              />
            </div>

            {/* Stats */}
            <div className="mt-10 flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <RiCheckboxCircleLine className="h-5 w-5 text-green-600" />
                <span>
                  <strong>500+</strong> Tools
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RiCheckboxCircleLine className="h-5 w-5 text-green-600" />
                <span>
                  <strong>10,000+</strong> Reviews
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RiCheckboxCircleLine className="h-5 w-5 text-green-600" />
                <span>
                  <strong>100%</strong> Open Source
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Browse by Category</h2>
            <p className="mt-3 text-gray-600">Explore tools across different technology domains</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                toolCount={TOOLS_BY_CATEGORY[category.slug]?.length || 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section id="tools" className="border-t border-gray-200 bg-gray-50 py-20">
        <div className="container">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">Featured Tools</h2>
              <p className="mt-3 text-gray-600">Top-rated tools by the community</p>
            </div>
            <Button variant="outline" className="hidden sm:flex">
              View All Tools
              <RiSearchLine className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} showCategory />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-200 py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Join the Community</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Share your experience with developer tools. Your reviews help thousands of developers
            make better technology decisions.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg">Sign in with GitHub</Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
