import type { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import React from 'react'
import Hero from '@/components/page-header'
import Nav from '@/components/layout/nav'
import Main from '@/components/layout/main'
import Aside from '@/components/layout/aside'

interface HomePageProps {}
const HomePage: FunctionComponent<HomePageProps> = ({}) => {
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
			<div className='container mx-auto flex lg:gap-[2.5rem]'>
				<Nav />
				<Main />
				<Aside />
			</div>
			{/* <Hero /> */}
		</React.Fragment>
	)
}

export default HomePage
