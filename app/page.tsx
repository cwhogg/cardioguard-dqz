'use client'

import { useState } from 'react'
import { JsonLd } from '../components/content/JsonLd'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        setMessage('Thanks! We\'ll notify you when CardioGuard launches.')
        setEmail('')
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const faqs = [
    {
      question: "What are the best markers for cardiovascular health?",
      answer: "The most predictive cardiovascular biomarkers include ApoB (apolipoprotein B), Lp(a) (lipoprotein a), hs-CRP (high-sensitivity C-reactive protein), and advanced lipid panels. These markers provide much better risk assessment than basic cholesterol tests that insurance typically covers."
    },
    {
      question: "What is a preferred cardiac biomarker?",
      answer: "ApoB (apolipoprotein B) is considered the gold standard cardiac biomarker by leading cardiologists. It measures the actual number of atherogenic particles in your blood, providing a more accurate picture of cardiovascular risk than LDL cholesterol alone."
    },
    {
      question: "Does insurance cover LP(a) test?",
      answer: "Most insurance plans don't cover Lp(a) testing, despite it being one of the strongest predictors of heart disease. This creates a frustrating gap where the tests that matter most for prevention remain financially out of reach for many people."
    },
    {
      question: "Is a lipid panel covered by insurance?",
      answer: "Basic lipid panels are typically covered by insurance, but they only measure outdated markers like total cholesterol and LDL. The advanced biomarkers that cardiologists actually use for risk assessment - like ApoB, Lp(a), and particle size - usually aren't covered."
    },
    {
      question: "What are the new biomarkers for cardiovascular disease?",
      answer: "Advanced cardiovascular biomarkers include ApoB, Lp(a), LDL particle number and size, Lp-PLA2, and advanced inflammatory markers. These provide much better prediction of heart disease risk than traditional cholesterol panels, especially for people with metabolically healthy obesity or those following low-carb diets."
    },
    {
      question: "What is the best indicator of cardiovascular risk?",
      answer: "ApoB combined with Lp(a) provides the most comprehensive cardiovascular risk assessment available. When combined with a coronary calcium score and inflammatory markers like hs-CRP, you get a complete picture of your actual heart disease risk that basic cholesterol tests simply can't provide."
    }
  ]

  return (
    <>
      <JsonLd
        type="Organization"
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "CardioGuard",
          "description": "Advanced cardiovascular biomarkers for entrepreneurs and health-conscious individuals",
          "url": "https://cardioguard.com",
          "logo": "https://cardioguard.com/logo.png",
          "sameAs": []
        }}
      />
      
      <JsonLd
        type="WebSite"
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "CardioGuard",
          "url": "https://cardioguard.com",
          "description": "Best cardiovascular biomarkers for entrepreneurs and health-conscious individuals",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://cardioguard.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />

      <JsonLd
        type="FAQPage"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
                <span className="text-xl font-heading font-bold text-text">CardioGuard</span>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a href="/blog" className="text-text-secondary hover:text-text transition-colors">Heart Health Blog</a>
                <a href="/compare" className="text-text-secondary hover:text-text transition-colors">Compare Tests</a>
                <a href="/faq" className="text-text-secondary hover:text-text transition-colors">FAQ</a>
              </div>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-text mb-6 leading-tight">
                Get the Best <span className="gradient-text">Cardiovascular Biomarkers</span> Without Insurance Roadblocks
              </h1>
              <p className="text-xl text-text-secondary mb-8 max-w-4xl mx-auto leading-relaxed">
                Access ApoB, Lp(a), and advanced cardiac testing that insurance won't cover. Finally track the markers cardiologists actually rely on for heart disease prevention.
              </p>
              <form onSubmit={handleSignup} className="max-w-md mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 rounded-lg bg-background-elevated border border-border text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={isLoading || isSuccess}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Joining...' : 'Join Early Access'}
                  </button>
                </div>
                {message && (
                  <p className={`mt-3 text-sm ${isSuccess ? 'text-accent' : 'text-primary'}`}>
                    {message}
                  </p>
                )}
              </form>
              <p className="text-text-muted text-sm">
                Join 2,847 health-conscious professionals on our early access list
              </p>
            </div>
          </section>

          {/* Value Propositions */}
          <section aria-label="CardioGuard Benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-text mb-4">
                Advanced Heart Disease Prevention Testing
              </h2>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Skip insurance hassles and get direct access to the cardiovascular biomarkers that actually predict heart disease risk.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <article className="card-gradient rounded-xl p-8">
                <div className="w-12 h-12 bg-primary rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-heading font-semibold text-text mb-4">
                  Insurance-Free Advanced Testing
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Skip the physician gatekeeping and insurance denials. Get direct access to ApoB, Lp(a), hs-CRP, and other predictive cardiac biomarkers at transparent pricing.
                </p>
              </article>
              
              <article className="card-gradient rounded-xl p-8">
                <div className="w-12 h-12 bg-accent rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-heading font-semibold text-text mb-4">
                  Specialized Cardiac Risk Assessment
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Unlike broad wellness panels, every test and interpretation focuses specifically on cardiovascular prevention. Know your real heart disease risk, not just generic health metrics.
                </p>
              </article>
              
              <article className="card-gradient rounded-xl p-8">
                <div className="w-12 h-12 bg-primary-light rounded-lg mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-heading font-semibold text-text mb-4">
                  Longitudinal Risk Tracking
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Track how your cardiac biomarkers change over time with lifestyle and medication interventions. Understand if your prevention strategy is actually working.
                </p>
              </article>
            </div>
          </section>

          {/* FAQ Section */}
          <section aria-label="Frequently Asked Questions" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-text mb-4">
                Advanced Cardiovascular Testing Questions
              </h2>
              <p className="text-xl text-text-secondary">
                Everything you need to know about getting the cardiac biomarkers that actually predict heart disease.
              </p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details key={index} className="card-gradient rounded-lg p-6 cursor-pointer">
                  <summary className="text-lg font-heading font-semibold text-text mb-3 cursor-pointer">
                    {faq.question}
                  </summary>
                  <div className="prose text-text-secondary pl-4">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-background-elevated py-20">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-heading font-bold text-text mb-6">
                Stop Waiting for Insurance to Cover the Tests You Need
              </h2>
              <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
                Your basic cholesterol test is missing the markers that actually predict heart disease. Get early access to comprehensive cardiovascular risk assessment.
              </p>
              <form onSubmit={handleSignup} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={isLoading || isSuccess}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Joining...' : 'Join Early Access'}
                  </button>
                </div>
                {message && (
                  <p className={`mt-3 text-sm ${isSuccess ? 'text-accent' : 'text-primary'}`}>
                    {message}
                  </p>
                )}
              </form>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
                <span className="text-xl font-heading font-bold text-text">CardioGuard</span>
              </div>
              <div className="flex items-center space-x-6">
                <a href="/blog" className="text-text-secondary hover:text-text transition-colors">Heart Health Blog</a>
                <a href="/compare" className="text-text-secondary hover:text-text transition-colors">Compare Tests</a>
                <a href="/faq" className="text-text-secondary hover:text-text transition-colors">FAQ</a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-text-muted">
                © 2024 CardioGuard. Advanced heart testing without insurance barriers.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}