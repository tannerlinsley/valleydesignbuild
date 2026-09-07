import { createFileRoute, Link } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import { Calendar, User, ArrowRight, Tag } from 'lucide-react'
import { headingFont, bodyFont } from '~/styles/typography'
import { allBlogs } from 'content-collections'
import { seo, canonicalLink } from '~/utils/seo'
import { breadcrumbSchema, webPageSchema, schemaToScript } from '~/utils/schema'
import type { BlogPost } from '~/types/blog'

export const Route = createFileRoute('/blog/')({
  head: () => ({
    meta: [
      ...seo({
        title: 'Blog | Valley Design Build Utah',
        description:
          'Practical notes on custom pools, pumptracks, skateparks, treehouses, water features, ice rinks, and outdoor builds in Northern Utah.',
        path: '/blog',
        keywords: [
          'custom pool tips utah',
          'pumptrack design',
          'backyard skatepark ideas',
          'outdoor entertainment',
          'utah outdoor living',
          'water features',
        ],
      }),
    ],
    links: [canonicalLink('/blog')],
    scripts: [
      {
        type: 'application/ld+json',
        children: schemaToScript([
          webPageSchema({
            name: 'Valley Design Build Blog',
            description: 'Practical project notes for custom pools, pumptracks, skateparks, and outdoor builds in Utah',
            url: '/blog',
          }),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
          ]),
        ]),
      },
    ],
  }),
  loader: () => {
    const posts = [...allBlogs].sort(
      (a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    return { posts }
  },
  component: BlogIndex,
})

function BlogIndex() {
  const { posts } = Route.useLoaderData()

  return (
    <div className={twMerge('min-h-screen bg-gray-50 dark:bg-navy-900', bodyFont)}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className={twMerge(
                'text-4xl md:text-5xl font-bold text-white mb-6 uppercase',
                headingFont,
              )}
            >
              Project Notes & Backyard Build Guides
            </h1>
            <p className="text-xl text-gray-300">
              Practical notes on pools, pumptracks, skateparks, water features,
              treehouses, ice rinks, and the site work behind them.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400">
                  No blog posts yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post: BlogPost, index: number) => (
                  <article
                    key={post.slug}
                    className={twMerge(
                      'p-6 md:p-8 rounded-lg border transition-all hover:shadow-lg',
                      index === 0
                        ? 'bg-gradient-to-br from-cyan-50 to-gray-50 dark:from-gray-800 dark:to-gray-800 border-cyan-200 dark:border-gray-700'
                        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
                    )}
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      <h2
                        className={twMerge(
                          'text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors',
                          headingFont,
                        )}
                      >
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          timeZone: 'UTC',
                        year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                    </div>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="inline-flex items-center gap-2 mt-4 text-cyan-600 dark:text-cyan-400 font-semibold hover:gap-3 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className={twMerge(
                'text-2xl font-bold mb-4 text-gray-900 dark:text-white uppercase',
                headingFont,
              )}
            >
              Have a Project in Mind?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Tell us what you want to build and what makes the site tricky. We
              will help you sort through the next step.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-cyan-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-cyan-600 transition-colors"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
