'use client'

import { Avatar, AvatarGroup } from '@nextui-org/react'
import { FunctionComponent } from 'react'
import { FillUser, OutlineUser } from 'src/icons/Icons'
import { uuid } from 'uuidv4'
import PostHeader from './post/header'
import Typography from '@mui/material/Typography'
import { Button } from '../ui/button'
import { Stack } from '@mui/material'

interface Props {}

const availableColors: Array<
	'primary' | 'warning' | 'success' | 'default' | 'secondary' | 'danger'
> = ['primary', 'warning', 'success', 'default', 'secondary', 'danger']

const availableRadius: Array<'full' | 'md'> = ['full', 'md']

function generateSections(count: number, constantAvatarSrc: string) {
	return Array.from({ length: count }).map((_, index) => ({
		id: index + 1,
		avatars: [
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: constantAvatarSrc,
				radius: availableRadius[index % availableRadius.length],
			},
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: `https://i.pravatar.cc/150?u=${uuid()}`,
				radius: availableRadius[index % availableRadius.length],
			},
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: `https://i.pravatar.cc/150?u=${uuid()}`,
				radius: availableRadius[index % availableRadius.length],
			},
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: `https://i.pravatar.cc/150?u=${uuid()}`,
				radius: availableRadius[index % availableRadius.length],
			},
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: `https://i.pravatar.cc/150?u=${uuid()}`,
				radius: availableRadius[index % availableRadius.length],
			},
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: `https://i.pravatar.cc/150?u=${uuid()}`,
				radius: availableRadius[index % availableRadius.length],
			},
			{
				id: uuid(),
				color: availableColors[index % availableColors.length],
				src: `https://i.pravatar.cc/150?u=${uuid()}`,
				radius: availableRadius[index % availableRadius.length],
			},
			// ... Możesz dodać więcej avatara tutaj
		],
	}))
}

const sections = generateSections(
	20,
	'https://cdn.discordapp.com/avatars/569975072417251378/2113775a498da6818a3bdf75af82f40c.webp?size=128',
)

const Main: FunctionComponent<Props> = ({}) => {
	return (
		<main className='flex w-full flex-col gap-6 py-[2.5rem] leading-none dark md:max-w-xl lg:max-w-lg xl:max-w-2xl'>
			{sections.map((section) => (
				<section
					key={section.id}
					className='rounded-2xl bg-primary-lighter p-6'
				>
					<article className='head flex w-full flex-col items-start gap-4 leading-tight'>
						<PostHeader />
						{/* article {section.id} */}
						<Typography
							variant='body2'
							component='p'
							className=''
						>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Praesent vel ante at leo rhoncus commodo. Sed
							eget facilisis est, a interdum justo. Quisque non
							diam nec neque viverra imperdiet nec non velit.
							Vivamus vulputate, mauris eu accumsan pulvinar,
							lorem nisi facilisis velit, in cursus turpis sapien
							id ligula. Etiam ultrices, metus id mollis
							facilisis, odio arcu tempus ante, a dignissim magna
							purus sed libero. Maecenas at efficitur libero, eu
							viverra mi.
						</Typography>
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
								{section.avatars.map((avatar) => (
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
							<Button size={'sm-icon'}>
								Button
								<FillUser size={24} />
							</Button>
						</div>
					</article>
				</section>
			))}
		</main>
	)
}
export default Main
