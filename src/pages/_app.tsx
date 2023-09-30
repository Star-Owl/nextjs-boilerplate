import { useRouter } from 'next/router'
import React from 'react'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import SEO from 'nextseo.config'
import { NextUIProvider } from '@nextui-org/react'
import { Analytics } from '@vercel/analytics/react'

import '@/styles/globals.css'
import { NextWebVitalsMetric } from 'next/app'
import { SessionProvider } from 'next-auth/react'

interface Props {
	Component: React.ComponentType<any>
	pageProps: any
}

const App: React.FC<Props> = ({ Component, pageProps }) => {
	const router = useRouter()

	return (
		<React.Fragment>
			<Head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, shrink-to-fit=no'
				/>
				<meta
					name='apple-mobile-web-app-capable'
					content='yes'
				/>
				<meta
					name='apple-mobile-web-app-status-bar-style'
					content='black-translucent'
				/>
				<meta
					name='apple-mobile-web-app-title'
					content='Brandly by Nordcom Group Inc.'
				/>
				<link
					rel='icon'
					type='image/png'
					href='/favicon.ico'
				/>
				<link
					rel='icon'
					type='image/x-icon'
					href='/favicon.ico'
				/>
				<link
					rel='apple-touch-icon'
					href='/favicon.ico'
				/>
			</Head>
			<DefaultSeo {...SEO} />
			<SessionProvider session={pageProps.session}>
				<NextUIProvider>
					<Component
						key={router.asPath}
						{...pageProps}
					/>
				</NextUIProvider>
			</SessionProvider>
			<Analytics />
		</React.Fragment>
	)
}

export function reportWebVitals({
	id,
	name,
	value,
	label,
}: NextWebVitalsMetric) {
	if (process.env.NODE_ENV !== 'production') return
	;(window as any)?.dataLayer?.push({
		event: 'web-vital',
		event_category:
			label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
		event_action: name,
		event_value: Math.round(name === 'CLS' ? value * 1000 : value),
		event_label: id,
	})
}

export default App
