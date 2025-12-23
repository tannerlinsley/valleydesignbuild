import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { twMerge } from 'tailwind-merge'
import { Calendar, User, ArrowLeft, Tag, Phone, ArrowRight, Clock } from 'lucide-react'
import { headingFont, bodyFont } from '~/styles/typography'
import { allBlogs } from 'content-collections'
import { seo, canonicalLink } from '~/utils/seo'
import { articleSchema, breadcrumbSchema, schemaToScript } from '~/utils/schema'
import snarkdown from 'snarkdown'
import type { BlogPost } from '~/types/blog'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = allBlogs.find((p: BlogPost) => p.slug === params.slug)
    if (!post) {
      throw notFound()
    }
    const otherPosts = allBlogs
      .filter((p: BlogPost) => p.slug !== params.slug)
      .sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
    return { post, otherPosts }
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post
    const path = `/blog/${post?.slug}`

    return {
      meta: [
        ...seo({
          title: `${post?.title} | Valley Design Build Blog`,
          description: post?.description || '',
          path,
          type: 'article',
          image: post?.image,
          keywords: post?.tags,
          article: {
            publishedTime: post?.date,
            author: post?.author,
            tags: post?.tags,
          },
        }),
      ],
      links: [canonicalLink(path)],
      scripts: [
        {
          type: 'application/ld+json',
          children: schemaToScript([
            articleSchema({
              title: post?.title || '',
              description: post?.description || '',
              url: path,
              image: post?.image,
              datePublished: post?.date || '',
              author: post?.author || 'Valley Design Build',
            }),
            breadcrumbSchema([
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog' },
              { name: post?.title || '', url: path },
            ]),
          ]),
        },
      ],
    }
  },
  component: BlogPost,
})

function BlogPost() {
  const { post, otherPosts } = Route.useLoaderData()

  const htmlContent = snarkdown(post.content)

  return (
    <div className={twMerge('min-h-screen bg-gray-50 dark:bg-navy-900', bodyFont)}>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 bg-white/10 text-white rounded"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
            <h1
              className={twMerge(
                'text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase',
                headingFont,
              )}
            >
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <section className="bg-white dark:bg-gray-900 pt-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <img
                src={post.image}
                alt={post.imageAlt || post.title}
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg prose-gray dark:prose-invert max-w-none
                prose-headings:font-heading prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:leading-relaxed prose-p:mb-4
                prose-li:mb-2
                prose-a:text-cyan-600 dark:prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 dark:prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-cyan-700">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2
                className={twMerge('text-2xl font-bold text-white mb-2 uppercase', headingFont)}
              >
                Ready to Start Your Project?
              </h2>
              <p className="text-white/90">
                Get a free consultation from Valley Design Build.
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="tel:+18015107142"
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-3 rounded-md font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <Link
                to="/contact"
                className="bg-white text-cyan-700 px-5 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2
                className={twMerge(
                  'text-2xl font-bold mb-8 text-gray-900 dark:text-white uppercase',
                  headingFont,
                )}
              >
                More from Our Blog
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {otherPosts.map((relatedPost: BlogPost) => (
                  <Link
                    key={relatedPost.slug}
                    to="/blog/$slug"
                    params={{ slug: relatedPost.slug }}
                    className="group p-5 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all"
                  >
                    <h3
                      className={twMerge(
                        'font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2',
                        headingFont,
                      )}
                    >
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                      {relatedPost.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-cyan-600 dark:text-cyan-400 font-medium">
                      Read more
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
