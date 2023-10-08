import Posts from '@/components/layout/post/posts'
import useDeviceAndBrowser from '@/hooks/useDeviceAndBrowser'
import { generateSections } from '@/lib/post/generateSections'
import { getSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import type { FunctionComponent } from 'react'
import React, { useEffect, useState } from 'react'

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
	const [following, setFollowing] = useState<string[]>([])
	console.log(deviceType, os, browser)

	// const [session, loading] = useSession()

	// if (loading) {
	// 	return <p>Loading...</p>
	// }

	// if (!session) {
	// 	return <p>You need to sign in to access this page</p>
	// }

	useEffect(() => {
		const following = localStorage.getItem('following')
		if (following !== null) {
			setFollowing(JSON.parse(following))
		}
	}, [])

	getSession().then((session) => {
		console.log(session)
	})

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
			<main
				className={`flex w-full flex-col gap-6 py-[2.5rem] leading-none dark ${
					deviceType !== 'mobile' ? ' md:max-w-xl' : ''
				} lg:max-w-lg xl:max-w-xl`}
			>
				<Posts posts={posts} />
			</main>
		</React.Fragment>
	)
}

export default HomePage
