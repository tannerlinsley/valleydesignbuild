export interface BlogPost {
  title: string
  description: string
  date: string
  author: string
  image?: string
  imageAlt?: string
  tags: string[]
  slug: string
  content: string
  wordCount: number
  readingTime: number
  _meta: {
    filePath: string
    fileName: string
    directory: string
    extension: string
    path: string
  }
}
