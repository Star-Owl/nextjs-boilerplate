import type { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import React, { useEffect, useState } from 'react'
import Hero from '@/components/page-header'
import Nav from '@/components/layout/nav'
import Main, { generateSections } from '@/components/layout/main'
import Aside from '@/components/layout/aside'
import NavMobile from '@/components/layout/nav-mobile'

export async function getServerSideProps() {
	const posts = generateSections(
		20,
		'https://cdn.discordapp.com/avatars/569975072417251378/2113775a498da6818a3bdf75af82f40c.webp?size=128',
	)

	console.log(posts)

	return {
		props: { posts },
	}
}

interface HomePageProps {
	posts: any[]
}

const HomePage: FunctionComponent<HomePageProps> = ({ posts }) => {
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
			<div
				className={`flex xl:justify-center xl:gap-6 ${
					isMobile ? 'pb-24' : ''
				}`}
			>
				<Nav />
				<Main posts={posts} />
				<Aside />
				{isMobile ? <NavMobile /> : ''}
			</div>
			{/* <Hero /> */}
		</React.Fragment>
	)
}

export default HomePage
