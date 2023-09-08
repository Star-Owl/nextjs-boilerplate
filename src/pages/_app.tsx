import '@/styles/globals.css'

import type { AppProps, NextWebVitalsMetric } from 'next/app'

import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import SEO from 'nextseo.config'
import { useRouter } from 'next/router'
import React from 'react'

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter()

    return (
        <React.Fragment>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
                <meta name='apple-mobile-web-app-capable' content='yes' />
                <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
                <meta name='apple-mobile-web-app-title' content='Brandly by Nordcom Group Inc.' />
                <link rel='icon' type='image/png' href='https://brandly.nordcom.io/favicon.png' />
                <link rel='icon' type='image/x-icon' href='https://brandly.nordcom.io/favicon.ico' />
                <link rel='apple-touch-icon' href='https://brandly.nordcom.io/favicon.png' />
            </Head>
            <DefaultSeo {...SEO} />

            {/* Page */}
            <Component key={router.asPath} {...pageProps} />
        </React.Fragment>
    )
}

export function reportWebVitals({ id, name, value, label }: NextWebVitalsMetric) {
    if (process.env.NODE_ENV !== 'production') return
    ;(window as any)?.dataLayer?.push({
        event: 'web-vital',
        event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
        event_action: name,
        // Google Analytics metrics must be integers, so the value is rounded.
        // For CLS the value is first multiplied by 1000 for greater precision
        // (note: increase the multiplier for greater precision if needed).
        event_value: Math.round(name === 'CLS' ? value * 1000 : value),
        // The 'id' value will be unique to the current page load. When sending
        // multiple values from the same page (e.g. for CLS), Google Analytics can
        // compute a total by grouping on this ID (note: requires `eventLabel` to
        // be a dimension in your report).
        event_label: id,
    })
}

export default App
