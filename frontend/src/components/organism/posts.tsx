import { AnimatedNumber } from '@/components/ui/animated-number'
import { Button } from '@/components/atom/button'
import PostHeader from '@/components/ui/post/header'
import PostContent from '@/components/ui/post/main'
import { Avatar, AvatarGroup } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { FunctionComponent } from 'react'
import {
	ArrowRefesh,
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
} from '@/components/atom/tooltip'

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
					className='border-b-1 border-primary-badge p-4 md:rounded-2xl md:border-0 md:bg-primary-lighter'
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

interface Counters {
	stars: number
	comments: number
	rehoots: number
}

export const SocialCounters = () => {
	const [windowWidth, setWindowWidth] = useState<number | null>(null)
	const [counters, setCounters] = useState<Counters>({
		stars: getRandomNum(0, 9_999),
		comments: getRandomNum(0, 99_999),
		rehoots: getRandomNum(0, 999_999),
	})

	useEffect(() => {
		setWindowWidth(window.innerWidth)

		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const reloadCounter = (event: React.MouseEvent<HTMLDivElement>) => {
		const counterName = event.currentTarget.getAttribute('data-counter') as
			| keyof Counters
			| null

		setCounters((prevCounters) => {
			if (counterName) {
				return {
					...prevCounters,
					[counterName]: getRandomNum(
						0,
						counterName === 'stars' ? 9_999 : 99_999,
					),
				}
			} else {
				return {
					stars: getRandomNum(0, 9_999),
					comments: getRandomNum(0, 99_999),
					rehoots: getRandomNum(0, 999_999),
				}
			}
		})
	}

	function getRandomNum(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	return (
		<div className='flex w-full justify-between space-x-2'>
			<div className='flex w-full space-x-2 text-white-500 md:flex-initial md:space-x-8'>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div
								className='group flex w-1/4 cursor-pointer items-center justify-start space-x-1 md:w-1/5 md:flex-initial md:space-x-2'
								data-counter='stars'
								onClick={reloadCounter}
							>
								<Button
									className='transition-transform-colors group-hover:bg-warning-200/[.12]'
									variant={'ghost'}
									size={'xs-icon'}
								>
									<OutlineStar
										className='transition-transform-colors group-hover:text-warning-200'
										size={
											windowWidth !== null
												? windowWidth < 678
													? 20
													: 24
												: undefined
										}
									/>
								</Button>
								<AnimatedNumber
									className='text-sm normal-nums transition-transform-colors group-hover:text-warning-200 md:text-base'
									value={counters.stars}
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
							<div
								className='group flex w-1/4 cursor-pointer items-center justify-start space-x-1 md:w-1/5 md:flex-initial md:space-x-2'
								data-counter='comments'
								onClick={reloadCounter}
							>
								<Button
									className='transition-transform-colors group-hover:bg-accent-600/[.12]'
									variant={'ghost'}
									size={'xs-icon'}
								>
									<OutlineMessage
										className='transition-transform-colors group-hover:text-accent-600'
										size={
											windowWidth !== null
												? windowWidth < 678
													? 20
													: 24
												: undefined
										}
									/>
								</Button>
								<AnimatedNumber
									className='text-sm normal-nums transition-transform-colors group-hover:text-accent-600 md:text-base'
									value={counters.comments}
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
							<div
								className='group flex w-1/4 cursor-pointer items-center justify-start space-x-1 md:w-1/5 md:flex-initial md:space-x-2'
								data-counter='rehoots'
								onClick={reloadCounter}
							>
								<Button
									className='transition-transform-colors group-hover:bg-success-500/[.12]'
									variant={'ghost'}
									size={'xs-icon'}
								>
									<OutlineRepost
										className='transition-transform-colors group-hover:text-success-500'
										size={
											windowWidth !== null
												? windowWidth < 678
													? 20
													: 24
												: undefined
										}
									/>
								</Button>
								<span>
									<AnimatedNumber
										className='text-sm normal-nums transition-transform-colors group-hover:text-success-500 md:text-base'
										value={counters.rehoots}
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
			<Button
				variant={'ghost'}
				size={'sm-icon'}
				onClick={reloadCounter}
			>
				<ArrowRefesh
					size={
						windowWidth !== null
							? windowWidth < 678
								? 20
								: 24
							: undefined
					}
				/>
			</Button>
			<Button
				variant={'ghost'}
				size={'sm-icon'}
			>
				<OutlineBookmark
					size={
						windowWidth !== null
							? windowWidth < 678
								? 20
								: 24
							: undefined
					}
				/>
			</Button>
		</div>
	)
}

export default Posts
