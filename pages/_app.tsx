// global styles shared across the entire site
import * as React from 'react'
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react'

// used for rendering equations (optional)
import 'styles/katex.min.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'
// global style overrides for notion
import 'styles/notion.css'
// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'

// nLine specific styles
import 'styles/nline.css'

const soehne = localFont({
  src: [
    {
      path: '../public/fonts/soehne-buch.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/soehne-kraftig.woff2',
      weight: '500',
      style: 'normal'
    }
  ]
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={soehne.className}>
      <Component {...pageProps} />
      <Analytics />
    </main>
  )
}
