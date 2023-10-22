import { Button } from '@/components/atom/button'
import PostHeader from '@/components/ui/post/header'
import PostContent from '@/components/ui/post/main'
import { Avatar, AvatarGroup } from '@nextui-org/react'
import React from 'react'
import { FunctionComponent } from 'react'
import {
	FillRepost,
	FillUser,
	OutlineRepost,
	OutlineUser,
} from 'src/icons/Icons'

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

interface Props {
	posts: any[]
}

const Echoes: FunctionComponent<Props> = ({ posts }) => {
	return (
		<React.Fragment>
			<h3>Today</h3>
			{posts?.map((section) => (
				<section
					key={section.id}
					className='rounded-2xl bg-primary-lighter p-3'
				>
					<article className='head flex w-full flex-col items-start gap-4 leading-tight'>
						{/* <PostHeader /> */}
						{/* article {section.id} */}
						{/* <PostContent
							key={section.posts.id}
							text={section.posts.text}
							detailsUrl={section.posts.detailsUrl}
							maxTextLength={250}
						/> */}
						{/* <Postv2 content={section.posts.text} /> */}
						<div className='flex w-full justify-between'>
							<div className='flex items-center gap-6'>
								<FillRepost
									size={32}
									className={`text-success-500`}
								/>
								<AvatarGroup
									className='cursor-pointer'
									isBordered
									max={10}
									// renderCount={(count) => (
									// 	// <Avatar
									// 	// 	fallback={
									// 	// 		<p className='text-base'>+{count}</p>
									// 	// 	}
									// 	// ></Avatar>
									// 	<p className='ml-4 text-small font-medium text-foreground'>
									// 		+{count} others
									// 	</p>
									// )}
								>
									{section.avatars?.map(
										(avatar: AvatarType) => (
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
										),
									)}
								</AvatarGroup>
							</div>
							<Button
								variant={'ghost'}
								size={'xs-icon'}
							>
								<OutlineUser size={24} />
							</Button>
						</div>
						<span>
							<b>hasira </b> and N others has a birthday today!
						</span>
					</article>
				</section>
			))}
		</React.Fragment>
	)
}
export default Echoes
