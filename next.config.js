import bundleAnalyzer from '@next/bundle-analyzer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

export default withBundleAnalyzer({
  staticPageGenerationTimeout: 300,
  images: {
    remotePatterns: [
      // { hostname: '**.nline.io' },
      // { hostname: '**.notion.so' },
      // { hostname: '**.notionusercontent.com' },
      // { hostname: 'images.unsplash.com' },
      // { hostname: 'pbs.twimg.com' },
      // { hostname: 'abs.twimg.com' },
      // { hostname: 's3.us-west-2.amazonaws.com' },
      // { hostname: 'cdn.jsdelivr.net' },
      {
        protocol: 'https',
        hostname: 'www.notion.so'
      },
      {
        protocol: 'https',
        hostname: 'notion.so'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com'
      },
      {
        protocol: 'https',
        hostname: 'abs.twimg.com'
      },
      {
        protocol: 'https',
        hostname: 's3.us-west-2.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net'
      },
      {
        protocol: 'https',
        hostname: 'nline.io'
      },
      {
        protocol: 'https',
        hostname: 'notionusercontent.com'
      }
    ],
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },

  webpack: (config, _context) => {
    // Workaround for ensuring that `react` and `react-dom` resolve correctly
    // when using a locally-linked version of `react-notion-x`.
    // @see https://github.com/vercel/next.js/issues/50391
    const dirname = path.dirname(fileURLToPath(import.meta.url))
    config.resolve.alias.react = path.resolve(dirname, 'node_modules/react')
    config.resolve.alias['react-dom'] = path.resolve(
      dirname,
      'node_modules/react-dom'
    )
    return config
  }
})
