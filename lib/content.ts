import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export interface ContentItem {
  slug: string
  title: string
  description: string
  type: string
  date: string
  content: string
  targetKeywords?: string[]
  ideaName?: string
  status?: string
}

const typeToDirectory: Record<string, string> = {
  'blog-post': 'content/blog',
  'comparison': 'content/comparison',
  'faq': 'content/faq'
}

export async function getAllPosts(type: string): Promise<ContentItem[]> {
  const directory = typeToDirectory[type]
  if (!directory) return []
  
  try {
    const fullPath = path.join(process.cwd(), directory)
    
    if (!fs.existsSync(fullPath)) {
      return []
    }
    
    const filenames = fs.readdirSync(fullPath)
    const posts = await Promise.all(
      filenames
        .filter(name => name.endsWith('.md'))
        .map(async name => {
          const slug = name.replace(/\.md$/, '')
          return await getPostBySlug(type, slug)
        })
        .filter(Boolean)
    )
    
    return posts.filter((post): post is ContentItem => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.warn(`Failed to read ${directory}:`, error)
    return []
  }
}

export async function getPostBySlug(type: string, slug: string): Promise<ContentItem | null> {
  const directory = typeToDirectory[type]
  if (!directory) return null
  
  try {
    const fullPath = path.join(process.cwd(), directory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const processedContent = await remark().use(html).process(content)
    const contentHtml = processedContent.toString()
    
    return {
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      type: data.type || type,
      date: data.date || new Date().toISOString(),
      content: contentHtml,
      targetKeywords: data.targetKeywords || [],
      ideaName: data.ideaName,
      status: data.status
    }
  } catch (error) {
    console.warn(`Failed to read post ${slug}:`, error)
    return null
  }
}