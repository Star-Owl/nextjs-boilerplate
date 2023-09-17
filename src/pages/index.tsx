import type { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import React, { useEffect, useState } from 'react'
import Hero from '@/components/page-header'
import Nav from '@/components/layout/nav'
import Main from '@/components/layout/main'
import Aside from '@/components/layout/aside'
import NavMobile from '@/components/layout/nav-mobile'

interface HomePageProps {}
const HomePage: FunctionComponent<HomePageProps> = ({}) => {
	let [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		setIsMobile(window.innerWidth < 640)

		const handleResize = () => {
			setIsMobile(window.innerWidth < 640)
		}

		window.addEventListener('resize', handleResize)

		return () => window.removeEventListener('resize', handleResize)
	}, [])
	return (
		<React.Fragment>
			<NextSeo
				titleTemplate='%s'
				title='Home | StarOwl'
				description='Ready-to-go Next.js starter template using the battle-tested pages router.'
				canonical='https://nextjs-starter.nordcom.io/'
				additionalMetaTags={[
					{
						property: 'keywords',
						content: [
							'nextjs',
							'nextjs-starter',
							'next-starter',
							'react',
							'react-starter',
						].join(', '),
					},
				]}
			/>
			<div className='flex justify-center xl:gap-[2.5rem]'>
				{isMobile ? <NavMobile /> : <Nav />}
				<Main />
				<Aside />
			</div>
			{/* <Hero /> */}
		</React.Fragment>
	)
}

export default HomePage
