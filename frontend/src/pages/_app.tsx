import '@/styles/globals.css'

import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import SEO from 'nextseo.config'
import { NextUIProvider } from '@nextui-org/react'
import { Analytics } from '@vercel/analytics/react'

import { NextWebVitalsMetric } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Nav from '@/components/organism/navigation/nav'
import Aside from '@/components/organism/navigation/aside'
import NavMobile from '@/components/organism/navigation/nav-mobile'
import { Toaster } from '@/components/molecule/toaster'
import DebugMenuModal from '@/components/organism/modals/DegbugModal'
import { NotificationProvider } from 'src/contexts/NotificationContext'
import { ThemeProvider } from 'src/contexts/ThemeContext'

interface Props {
	Component: React.ComponentType<any>
	pageProps: any
}

const App: React.FC<Props> = ({ Component, pageProps }) => {
	const router = useRouter()

	const excludedPaths = ['/particles', '/404', '/welcome']

	useEffect(() => {
		const savedHue = localStorage.getItem('accentColor-hue')
		const savedTheme = localStorage.getItem('selectedTheme')

		if (savedHue) {
			document.documentElement.style.setProperty('--accent-hue', savedHue)
		}

		if (savedTheme) {
			let primaryDark, primaryLighter, primaryBadge

			if (savedTheme === 'secondary') {
				primaryDark = 'hsl(215, 32%, 10%)'
				primaryLighter = 'hsl(215, 32%, 12%)'
				primaryBadge = 'hsl(215, 32%, 14%)'
			} else if (savedTheme === 'third') {
				primaryDark = 'hsl(220, 8%, 7%)'
				primaryLighter = 'hsl(220, 8%, 9%)'
				primaryBadge = 'hsl(220, 8%, 11%)'
			} else {
				primaryDark = 'hsl(206, 42%, 7%)'
				primaryLighter = 'hsl(206, 42%, 10%)'
				primaryBadge = 'hsl(206, 42%, 13%)'
			}

			document.documentElement.style.setProperty(
				'--primary-dark',
				primaryDark,
			)
			document.documentElement.style.setProperty(
				'--primary-lighter',
				primaryLighter,
			)
			document.documentElement.style.setProperty(
				'--primary-badge',
				primaryBadge,
			)

			localStorage.setItem('selectedTheme', savedTheme)
		}
	}, [])

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
					content='StarOwl Social by Poker Cats Creations'
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
					<ThemeProvider>
						<div
							className={`starOwl flex pb-24 md:pb-0 xl:justify-center xl:gap-6`}
						>
							<NotificationProvider>
								{!excludedPaths.includes(router.pathname) ? (
									<React.Fragment>
										<Nav activeItem={router.pathname} />
										<NavMobile />
									</React.Fragment>
								) : null}
								<DebugMenuModal />
							</NotificationProvider>
							{/* <Provider store={store}></Provider> */}
							<Component
								key={router.asPath}
								{...pageProps}
							/>
							{!excludedPaths.includes(router.pathname) ? (
								<Aside />
							) : null}
						</div>
						<Toaster />
					</ThemeProvider>
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
