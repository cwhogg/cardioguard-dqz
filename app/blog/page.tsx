import Link from 'next/link'
import { getAllPosts } from '../../lib/content'

export const metadata = {
  title: 'Cardiovascular Health Blog — Tips & Guides | CardioGuard',
  description: 'Expert insights on cardiovascular biomarkers, heart disease prevention, and advanced cardiac testing. Learn about ApoB, Lp(a), and other predictive markers.',
}

export default async function BlogPage() {
  const posts = await getAllPosts('blog-post')

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Cardiovascular Health Blog
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              Expert insights on the cardiovascular biomarkers that matter most. Learn why ApoB and Lp(a) are more predictive than basic cholesterol panels, and discover the advanced testing strategies that health-optimizing professionals use to prevent heart disease.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="bg-background-elevated border border-border rounded-lg p-12 text-center">
              <h2 className="text-2xl font-heading font-semibold mb-4">Coming Soon</h2>
              <p className="text-text-secondary">
                We're preparing comprehensive guides on cardiovascular biomarkers and heart disease prevention. Check back soon for expert insights.
              </p>
              <Link 
                href="/"
                className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article key={post.slug} className="bg-background-elevated border border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
                  <div className="flex flex-col">
                    <time className="text-sm text-text-muted mb-2">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <Link href={`/blog/${post.slug}`} className="group">
                      <h2 className="text-2xl font-heading font-semibold mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      {post.description}
                    </p>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-accent hover:text-primary-light font-semibold inline-flex items-center transition-colors"
                    >
                      Read article →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}