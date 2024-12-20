import rawSiteConfig from '../site.config'
import { type SiteConfig } from './site-config'
import { NextApiRequest } from 'next'

if (!rawSiteConfig) {
  throw new Error(`Config error: invalid site.config.ts`)
}

// allow environment variables to override site.config.ts
let siteConfigOverrides: SiteConfig

try {
  if (process.env.NEXT_PUBLIC_SITE_CONFIG) {
    siteConfigOverrides = JSON.parse(process.env.NEXT_PUBLIC_SITE_CONFIG)
  }
} catch (err) {
  console.error('Invalid config "NEXT_PUBLIC_SITE_CONFIG" failed to parse')
  throw err
}

const siteConfig: SiteConfig = {
  ...rawSiteConfig,
  ...siteConfigOverrides
}

export function getSiteConfig<T>(key: string, defaultValue?: T): T {
  const value = siteConfig[key]

  if (value !== undefined) {
    return value
  }

  if (defaultValue !== undefined) {
    return defaultValue
  }

  throw new Error(`Config error: missing required site config value "${key}"`)
}

export function getEnv(
  key: string,
  defaultValue?: string,
  env = process.env
): string {
  const value = env[key]

  if (value !== undefined) {
    return value
  }

  if (defaultValue !== undefined) {
    return defaultValue
  }

  throw new Error(`Config error: missing required env variable "${key}"`)
}

// Get the site URL based on environment
export function getSiteUrl(req?: NextApiRequest | Request): string {
  // If we're in production, use the configured domain
  if (process.env.NODE_ENV === 'production') {
    return `https://${rawSiteConfig.domain}`
  }

  // If we're on Vercel preview deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // If we have a request object, use its host
  if (req) {
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'

    if ('headers' in req && req.headers && 'host' in req.headers) {
      // Handle NextApiRequest
      return `${protocol}://${req.headers.host}`
    }

    if (req instanceof Request) {
      // Handle standard Request
      const host = req.headers.get('host')
      if (host) {
        return `${protocol}://${host}`
      }
    }
  }

  // Fallback for local development - always use http
  return 'http://localhost:3000'
}
