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
import Nav from '@/components/layout/nav'
import Aside from '@/components/layout/aside'
import NavMobile from '@/components/layout/nav-mobile'
import { Toaster } from '@/components/ui/toaster'
import DebugMenuModal from '@/components/modals/DegbugModal'
import { NotificationProvider } from 'src/contexts/NotificationContext'

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
					<div
						className={`flex pb-24 md:pb-0 xl:justify-center xl:gap-6`}
					>
						<NotificationProvider>
							{router.pathname !== '/particles' &&
							router.pathname !== '/404' ? (
								<React.Fragment>
									<Nav activeItem={router.pathname} />
									<NavMobile />
								</React.Fragment>
							) : null}
							<DebugMenuModal />
						</NotificationProvider>
						<Component
							key={router.asPath}
							{...pageProps}
						/>
						{router.pathname !== '/particles' &&
						router.pathname !== '/404' ? (
							<Aside />
						) : null}
					</div>
					<Toaster />
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
