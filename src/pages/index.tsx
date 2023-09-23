import type { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import React, { useEffect, useState } from 'react'
import Nav from '@/components/layout/nav'
import Main from '@/components/layout/main'
import Aside from '@/components/layout/aside'
import NavMobile from '@/components/layout/nav-mobile'
import { generateSections } from '@/lib/post/generateSections'
import useDeviceAndBrowser from '@/lib/useDeviceAndBrowser'

export async function getServerSideProps() {
	const posts = generateSections(
		5,
		'https://cdn.discordapp.com/avatars/569975072417251378/2113775a498da6818a3bdf75af82f40c.webp?size=128',
	)

	return {
		props: { posts },
	}
}

interface HomePageProps {
	posts: any[]
}

const HomePage: FunctionComponent<HomePageProps> = ({ posts }) => {
	const { deviceType, os, browser } = useDeviceAndBrowser()
	console.log(deviceType, os, browser)
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
					deviceType === 'mobile' ? 'pb-24' : ''
				}`}
			>
				<Nav />
				<Main posts={posts} />
				<Aside />
				{deviceType === 'mobile' ? <NavMobile /> : ''}
			</div>
			{/* <Hero /> */}
		</React.Fragment>
	)
}

export default HomePage
