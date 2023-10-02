import useDeviceAndBrowser from '@/hooks/useDeviceAndBrowser'
import { generateSections } from '@/lib/post/generateSections'
import { NextSeo } from 'next-seo'
import type { FunctionComponent } from 'react'
import React, { useEffect } from 'react'

import { ProfileCover, ProfileDetails } from '@/components/ui/user/Profile'
import useUser from '@/hooks/useUser'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

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
				title={`Hasiradoo | StarOwl`}
				description={`Ready-to-go Next.js starter template using the battle-tested pages router.`}
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
			<main className='flex w-full flex-col gap-6 leading-none dark md:max-w-xl lg:max-w-lg lg:py-[2.5rem] xl:max-w-xl'>
				{!fetchedUser ? (
					<React.Fragment>
						<ProfileCover
							profileImage={
								'https://cdn.discordapp.com/avatars/569975072417251378/2113775a498da6818a3bdf75af82f40c.webp?size=128'
							}
							displayName='John Doe'
							userID='john_doe_123'
							coverImage={
								'https://images.unsplash.com/photo-1671723521246-a6710cfafc70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80'
							}
							followers={1_234}
							following={12_345}
							links={[
								{
									url: 'https://ko-fi.com/pokercatscreations',
									label: 'Ko-fi',
								},
								{
									url: 'https://www.patreon.com/PokerCatsCreations',
									label: 'Patreon',
									type: 'patreon',
								},
								{
									url: 'google.com',
									label: 'Google',
								},
							]}
						/>
						<ProfileDetails
							bio='Digging UI'
							badges={[
								{
									content: 'STAFF',
									type: 'staff',
								},
								{
									content: 'Star User',
									type: 'staruser',
								},
								{
									content: 'Cancer',
									type: 'zodiac',
								},
								{
									content: 'He / Him',
									type: 'basic',
								},
							]}
						/>
					</React.Fragment>
				) : (
					// <h1>user not found</h1>
					<h1>loading...</h1>
				)}
			</main>
		</React.Fragment>
	)
}

export default HomePage
