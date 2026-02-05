import type { Metadata } from 'next'
import { Inter, Source_Sans_3, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sourceSans = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  title: 'Best Cardiovascular Biomarkers for Entrepreneurs — CardioGuard',
  description: 'Best cardiovascular biomarkers for entrepreneurs and health-conscious individuals. Skip insurance hassles - get ApoB, Lp(a), and advanced cardiac tests directly.',
  keywords: 'cardiovascular biomarkers, apolipoprotein b test, lipoprotein a test, advanced lipid panel, heart disease prevention, cardiac risk assessment',
  authors: [{ name: 'CardioGuard' }],
  creator: 'CardioGuard',
  publisher: 'CardioGuard',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cardioguard.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Best Cardiovascular Biomarkers for Entrepreneurs — CardioGuard',
    description: 'Best cardiovascular biomarkers for entrepreneurs and health-conscious individuals. Skip insurance hassles - get ApoB, Lp(a), and advanced cardiac tests directly.',
    siteName: 'CardioGuard',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Cardiovascular Biomarkers for Entrepreneurs — CardioGuard',
    description: 'Best cardiovascular biomarkers for entrepreneurs and health-conscious individuals. Skip insurance hassles - get ApoB, Lp(a), and advanced cardiac tests directly.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${sourceSans.variable} ${jetbrainsMono.variable} font-body bg-background text-text antialiased`}>
        {children}
      </body>
    </html>
  )
}