import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const blog = defineCollection({
  name: 'blog',
  directory: 'content/blog',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    author: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()),
    content: z.string(),
  }),
  transform: (document) => {
    const slug = document._meta.path.replace(/\.md$/, '')
    const wordCount = document.content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)
    return {
      ...document,
      slug,
      wordCount,
      readingTime,
    }
  },
})

export default defineConfig({
  collections: [blog],
})
