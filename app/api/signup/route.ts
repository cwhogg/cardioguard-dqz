import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const SITE_ID = process.env.SITE_ID || 'cardioguard'

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingEmails = await redis.lrange(`email_signups:${SITE_ID}`, 0, -1)
    if (existingEmails.includes(email)) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 400 }
      )
    }

    // Get IP for tracking (optional)
    const forwardedFor = request.headers.get('x-forwarded-for')
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown'

    // Store signup data
    const signupData = {
      email,
      timestamp: new Date().toISOString(),
      ip,
      userAgent: request.headers.get('user-agent') || 'unknown',
    }

    // Add to email list
    await redis.rpush(`email_signups:${SITE_ID}`, JSON.stringify(signupData))
    
    // Increment counter
    await redis.incr(`email_signups_count:${SITE_ID}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const count = await redis.get(`email_signups_count:${SITE_ID}`) || 0
    return NextResponse.json({ count })
  } catch (error) {
    console.error('Get count error:', error)
    return NextResponse.json({ count: 0 })
  }
}