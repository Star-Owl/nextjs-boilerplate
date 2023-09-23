'use client'

import { Avatar, AvatarGroup } from '@nextui-org/react'
import { FunctionComponent } from 'react'
import { FillUser, OutlineUser } from 'src/icons/Icons'
import PostHeader from './post/header'
import { Button } from '../ui/button'
import React from 'react'
import Post from '../ui/post/Post'

interface Props {
	posts: any[]
}

interface AvatarType {
	id: string
	color:
		| 'primary'
		| 'warning'
		| 'success'
		| 'default'
		| 'secondary'
		| 'danger'
	src: string
	radius: 'full' | 'md'
}

const Main: FunctionComponent<Props> = ({ posts }) => {
	return (
		<main className='flex w-full flex-col gap-6 py-[2.5rem] leading-none dark md:max-w-xl lg:max-w-lg xl:max-w-xl'>
			{posts?.map((section) => (
				<section
					key={section.id}
					className='rounded-2xl bg-primary-lighter p-6'
				>
					<article className='head flex w-full flex-col items-start gap-4 leading-tight'>
						<PostHeader />
						{/* article {section.id} */}
						<Post
							key={section.posts.id}
							text={section.posts.text}
							detailsUrl={section.posts.detailsUrl}
							maxTextLength={250}
						/>
						{/* <Postv2 content={section.posts.text} /> */}
						<div className='flex w-full justify-between'>
							<AvatarGroup
								className='cursor-pointer'
								isBordered
								max={3}
								renderCount={(count) => (
									// <Avatar
									// 	fallback={
									// 		<p className='text-base'>+{count}</p>
									// 	}
									// ></Avatar>
									<p className='ml-4 text-small font-medium text-foreground'>
										+{count} others
									</p>
								)}
							>
								{section.avatars?.map((avatar: AvatarType) => (
									<Avatar
										key={avatar.id}
										color={avatar.color}
										src={avatar.src}
										showFallback
										radius={avatar.radius}
										fallback={
											<FillUser
												className={`h-6 w-6 text-white`}
												fill='currentColor'
											/>
										}
									/>
								))}
							</AvatarGroup>
							<Button
								variant={'ghost'}
								size={'xs-icon'}
							>
								<OutlineUser size={24} />
							</Button>
						</div>
					</article>
				</section>
			))}
		</main>
	)
}
export default Main
