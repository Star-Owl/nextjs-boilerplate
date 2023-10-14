import { AnimatedNumber } from '@/components/ui/animated-number'
import { Button } from '@/components/ui/button'
import PostHeader from '@/components/ui/post/header'
import PostContent from '@/components/ui/post/main'
import { Avatar, AvatarGroup } from '@nextui-org/react'
import React from 'react'
import { FunctionComponent } from 'react'
import {
	FillUser,
	OutlineBookmark,
	OutlineMessage,
	OutlineRepost,
	OutlineStar,
	OutlineUser,
} from 'src/icons/Icons'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

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

const Posts: FunctionComponent<Props> = ({ posts }) => {
	return (
		<React.Fragment>
			{posts?.map((section) => (
				<section
					key={section.id}
					className='rounded-2xl bg-primary-lighter p-4'
				>
					<article className='head flex w-full flex-col items-start gap-4 leading-tight'>
						<PostHeader />
						{/* article {section.id} */}
						<PostContent
							key={section.posts.id}
							text={section.posts.text}
							detailsUrl={section.posts.detailsUrl}
							maxTextLength={250}
						/>
						{/* <Postv2 content={section.posts.text} /> */}
						<SocialCounters />
					</article>
				</section>
			))}
		</React.Fragment>
	)
}

export const SocialCounters = () => {
	return (
		<div className='flex w-full justify-between'>
			<div className='flex flex-1 space-x-2'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className='group flex w-1/3 cursor-pointer items-center justify-start md:w-1/4 lg:space-x-2 xl:w-1/5'>
								<Button
									className='transition-transform-colors group-hover:bg-warning-200/[.12]'
									variant={'ghost'}
									size={'xs-icon'}
								>
									<OutlineStar
										className='transition-transform-colors group-hover:text-warning-200'
										size={24}
									/>
								</Button>
								<AnimatedNumber
									className='transition-transform-colors group-hover:text-warning-200'
									value={123}
								/>
							</div>
						</TooltipTrigger>
						<TooltipContent
							side='bottom'
							align='start'
						>
							<p>Star</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className='group flex w-1/3 cursor-pointer items-center justify-start md:w-1/4 lg:space-x-2 xl:w-1/5'>
								<Button
									className='transition-transform-colors group-hover:bg-accent-600/[.12]'
									variant={'ghost'}
									size={'xs-icon'}
								>
									<OutlineMessage
										className='transition-transform-colors group-hover:text-accent-600'
										size={24}
									/>
								</Button>
								<AnimatedNumber
									className='transition-transform-colors group-hover:text-accent-600'
									value={1_234}
								/>
							</div>
						</TooltipTrigger>
						<TooltipContent
							side='bottom'
							align='start'
						>
							<p>Comment</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className='group flex w-1/3 cursor-pointer items-center justify-start md:w-1/4 lg:space-x-2 xl:w-1/5'>
								<Button
									className='transition-transform-colors group-hover:bg-success-500/[.12]'
									variant={'ghost'}
									size={'xs-icon'}
								>
									<OutlineRepost
										className='transition-transform-colors group-hover:text-success-500'
										size={24}
									/>
								</Button>
								<span>
									<AnimatedNumber
										className='transition-transform-colors group-hover:text-success-500'
										value={12_345}
									/>
								</span>
							</div>
						</TooltipTrigger>
						<TooltipContent
							side='bottom'
							align='start'
						>
							<p>Rehoot</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
			{/* <AvatarGroup
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
			</AvatarGroup> */}
			<Button
				variant={'ghost'}
				size={'xs-icon'}
			>
				<OutlineBookmark size={24} />
			</Button>
		</div>
	)
}

export default Posts
