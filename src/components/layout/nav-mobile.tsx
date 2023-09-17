'use client'

import Typography from '@mui/material/Typography'
import { Avatar, Badge, Chip, Code, extendVariants } from '@nextui-org/react'
import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import { Button, buttonVariants } from 'src/components/ui/button'

import {
	FillBell,
	FillBookmark,
	FillHome,
	FillMessage,
	FillSearch,
	FillSettings,
	OutlineBell,
	OutlineBookmark,
	OutlineHome,
	OutlineLogOut,
	OutlineMessage,
	OutlineMore,
	OutlineSearch,
	OutlineSettings,
	OutlineUser,
} from 'src/icons/Icons'
import NavItem from './nav-item'

const currentUser = true

interface NavLinkItem {
	active: boolean
	href: string
	text: string
	icon?: ReactNode
	isLogout?: boolean
}

const items: NavLinkItem[] = [
	{
		active: true,
		href: '/home',
		text: 'Nest',
		icon: null,
	},
	{
		active: false,
		href: '/explore',
		text: 'Explore',
		icon: null,
	},
	...(currentUser
		? [
				{
					active: false,
					href: '/messages',
					text: 'Chatter',
					icon: null,
				},
				{
					active: false,
					href: '/notifications',
					text: 'Echoes',
					icon: null,
				},
		  ]
		: []),
	{
		active: false,
		href: '/settings',
		text: 'Tweak',
		icon: null,
	},
	// ...(currentUser
	// 	? [
	// 			{
	// 				active: false,
	// 				href: '',
	// 				text: 'Logout',
	// 				icon: null,
	// 				isLogout: true,
	// 			},
	// 	  ]
	// 	: []),
]

const activeIcons = {
	'/home': <FillHome size={28} />,
	'/explore': <FillSearch size={28} />,
	'/notifications': <FillBell size={28} />,
	'/messages': <FillMessage size={28} />,
	'/bookmarks': <FillBookmark size={28} />,
	'/settings': <FillSettings size={28} />,
}

const inactiveIcons = {
	'/home': <OutlineHome size={28} />,
	'/explore': <OutlineSearch size={28} />,
	'/notifications': <OutlineBell size={28} />,
	'/messages': <OutlineMessage size={28} />,
	'/bookmarks': <OutlineBookmark size={28} />,
	'/settings': <OutlineSettings size={28} />,
	'': <OutlineLogOut size={28} />,
}

interface Props {}
const NavMobile: FunctionComponent<Props> = ({}) => {
	return (
		<nav className='fixed bottom-0 flex w-full flex-1 bg-primary-badge/[.80] py-6 pb-[2.5rem] backdrop-blur-md'>
			<ul className='flex flex-1 justify-around gap-2 px-5'>
				{items.map(({ active, href, text, isLogout }, i) => (
					<React.Fragment key={`header-${i}`}>
						<NavItem
							active={active}
							href={href}
							width='inline'
							size='default'
							onClick={isLogout ? () => undefined : undefined}
						>
							{active
								? activeIcons[href as keyof typeof activeIcons]
								: inactiveIcons[
										href as keyof typeof inactiveIcons
								  ]}
							<span
								className={`
										hidden
										flex-none
										text-lg
										xl:inline-flex
										${active ? 'font-bold' : 'font-medium'}
									`}
							>
								{text}
							</span>
						</NavItem>
					</React.Fragment>
				))}
			</ul>
			{/* <section className='flex w-full flex-1 gap-6'>
				<Button size={isSmallScreen ? 'default-icon' : 'default'}>
					{isSmallScreen ? <OutlineUser size={28} /> : 'Hoot'}
				</Button>
			</section> */}
			{/* <section className='flex w-fit items-center justify-center gap-4 rounded-[1rem] bg-primary-lighter p-4 lg:w-full lg:justify-start lg:p-5'>
				<React.Fragment>
					<Badge
						content=''
						color='success'
						shape='circle'
						placement='bottom-right'
						className={`${
							isSmallScreen
								? 'h-[1.125rem] w-[1.125rem]'
								: 'h-5 w-5'
						} pointer-events-none border-4 border-primary-lighter`}
					>
						<Avatar
							//isBordered
							// color='base'
							name='Hasira'
							src='https://cdn.discordapp.com/avatars/569975072417251378/2113775a498da6818a3bdf75af82f40c.webp?size=128'
							fallback={
								<OutlineUser
									className={`${
										isSmallScreen ? 'h-4 w-4' : 'h-6 w-6'
									} text-default-500`}
									fill='currentColor'
								/>
							}
							className={`${
								isSmallScreen ? 'h-8 w-8' : 'h-12 w-12'
							} cursor-pointer bg-white/[.06] text-sm transition-opacity hover:opacity-60`}
						/>
					</Badge>
				</React.Fragment>
				{isSmallScreen ? (
					''
				) : (
					<React.Fragment>
						<div className='flex h-full flex-col justify-around overflow-hidden'>
							<Typography
								variant='body2'
								component='p'
								className='cursor-pointer overflow-hidden text-ellipsis whitespace-pre !font-semibold hover:underline'
							>
								Display Name Long Name
							</Typography>
							<Chip
								radius='sm'
								classNames={{
									base: 'group bg-white/[.06] !py-[.281rem] !px-[.562rem] !h-auto rounded-[.375rem] cursor-pointer text-xs transition-colors hover:bg-white/[.12]',
									content:
										'text-white/[.60] p-0 group-hover:text-white overflow-hidden text-ellipsis whitespace-pre leading-tight',
								}}
							>
								@starowl.social
							</Chip>
						</div>
						<OutlineMore
							className='cursor-pointer transition-colors hover:text-accent-600'
							size={28}
						/>
					</React.Fragment>
				)}
			</section> */}
		</nav>
	)
}

export default NavMobile
