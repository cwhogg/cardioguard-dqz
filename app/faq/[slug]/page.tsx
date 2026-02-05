import { getAllPosts, getPostBySlug } from '../../../lib/content'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts('faq')
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug('faq', slug)
  
  if (!post) {
    return {
      title: 'FAQ Not Found | CardioGuard'
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

function FAQJsonLd({ post }: { post: any }) {
  // Extract Q&A pairs from HTML content (simplified)
  const questions = [{
    question: post.title,
    answer: post.description
  }]
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(qa => ({
      '@type': 'Question',
      name: qa.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer
      }
    }))
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function FAQPost({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug('faq', slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-background text-text">
      <FAQJsonLd post={post} />
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <Link 
            href="/"
            className="text-accent hover:text-primary-light font-semibold inline-flex items-center mb-8 transition-colors"
          >
            ← Back to Home
          </Link>
          
          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
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
              href="/"
              className="text-accent hover:text-primary-light font-semibold inline-flex items-center transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}