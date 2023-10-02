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

interface Props {
	activeItem?: string
}

const NavMobile: FunctionComponent<Props> = ({ activeItem = 'nest' }) => {
	const items: NavLinkItem[] = [
		{
			active: activeItem === 'nest',
			href: '/',
			text: 'Nest',
			icon: null,
		},
		{
			active: activeItem === 'explore',
			href: '/explore',
			text: 'Explore',
			icon: null,
		},
		...(currentUser
			? [
					{
						active: activeItem === 'echoes',
						href: '/echoes',
						text: 'Echoes',
						icon: null,
					},
					{
						active: activeItem === 'messages',
						href: '/messages',
						text: 'Chatter',
						icon: null,
					},
					{
						active: activeItem === 'bookmarks',
						href: '/bookmarks',
						text: 'StarMark',
						icon: null,
					},
			  ]
			: []),
		{
			active: activeItem === 'settings',
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
		// 			}
		// 	  ]
		// 	: []),
	]

	const activeIcons = {
		'/': <FillHome size={28} />,
		'/explore': <FillSearch size={28} />,
		'/echoes': <FillBell size={28} />,
		'/messages': <FillMessage size={28} />,
		'/bookmarks': <FillBookmark size={28} />,
		'/settings': <FillSettings size={28} />,
	}

	const inactiveIcons = {
		'/': <OutlineHome size={28} />,
		'/explore': <OutlineSearch size={28} />,
		'/echoes': <OutlineBell size={28} />,
		'/messages': <OutlineMessage size={28} />,
		'/bookmarks': <OutlineBookmark size={28} />,
		'/settings': <OutlineSettings size={28} />,
		'': <OutlineLogOut size={28} />,
	}

	return (
		<nav className='fixed bottom-0 z-100 flex w-full rounded-t-2xl bg-primary-badge/[.80] py-4 backdrop-blur-md'>
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
								className={`hidden flex-none text-lg xl:inline-flex ${
									active ? 'font-bold' : 'font-medium'
								}`}
							>
								{text}
							</span>
						</NavItem>
					</React.Fragment>
				))}
			</ul>
		</nav>
	)
}

export default NavMobile
