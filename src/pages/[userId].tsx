import type { FunctionComponent } from 'react'
import { NextSeo } from 'next-seo'
import React, { useEffect, useState } from 'react'
import Nav from '@/components/layout/nav'
import Main from '@/components/layout/main'
import Aside from '@/components/layout/aside'
import NavMobile from '@/components/layout/nav-mobile'
import { generateSections } from '@/lib/post/generateSections'
import useDeviceAndBrowser from '@/hooks/useDeviceAndBrowser'
import Posts from '@/components/layout/post/posts'

import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'

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
	const router = useRouter()
	const { userId } = router.query

	const { data: fetchedUser, isLoading } = useUser(userId as string)

	const { deviceType, os, browser } = useDeviceAndBrowser()
	console.log(deviceType, os, browser)

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		//router.push('/404')
	// 	}, 3000)
	// 	return () => clearTimeout(timer)
	// 	// if (!isLoading && !fetchedUser) {
	// 	// 	const timer = setTimeout(() => {
	// 	// 		//router.push('/404')
	// 	// 		_FETCH = true
	// 	// 	}, 3000)
	// 	// 	return () => clearTimeout(timer)
	// 	// }
	// }, [fetchedUser, isLoading, router])

	return (
		<React.Fragment>
			<NextSeo
				titleTemplate='%s'
				title='Hasiradoo | StarOwl'
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
				<Nav activeItem='none' />
				<main className='flex w-full flex-col gap-6 py-[2.5rem] leading-none dark md:max-w-xl lg:max-w-lg xl:max-w-xl'>
					{!isLoading && !fetchedUser ? (
						<h1>user not found</h1>
					) : (
						<h1>loading...</h1>
					)}
				</main>
				<Aside />
				{deviceType === 'mobile' ? <NavMobile /> : ''}
			</div>
		</React.Fragment>
	)
}

export default HomePage
