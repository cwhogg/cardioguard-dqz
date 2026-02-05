import { getAllPosts, getPostBySlug } from '../../../lib/content'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts('blog-post')
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug('blog-post', slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | CardioGuard'
    }
  }
  
  return {
    title: `${post.title} | CardioGuard`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

function ArticleJsonLd({ post }: { post: any }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'CardioGuard'
    },
    publisher: {
      '@type': 'Organization',
      name: 'CardioGuard'
    }
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug('blog-post', slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-background text-text">
      <ArticleJsonLd post={post} />
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/blog"
            className="text-accent hover:text-primary-light font-semibold inline-flex items-center mb-8 transition-colors"
          >
            ← Back to Blog
          </Link>
          
          <article>
            <header className="mb-8">
              <time className="text-sm text-text-muted">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mt-2 mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                {post.description}
              </p>
            </header>
            
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
          
          <div className="mt-12 pt-8 border-t border-border">
            <Link 
              href="/blog"
              className="text-accent hover:text-primary-light font-semibold inline-flex items-center transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}