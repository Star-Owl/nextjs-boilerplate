import React from 'react'
import { Button } from '../button'
import { Chip } from '@nextui-org/react'
import UserInfo from './UserInfo'
import {
	ArrowBack,
	OutlineBell,
	OutlineLink,
	OutlineMessage,
	OutlineMore,
	OutlineTrashCan,
	OutlineUser,
} from 'src/icons/Icons'
import { FormatNumber } from '@/lib/numberFormat'
import useDeviceAndBrowser from '@/hooks/useDeviceAndBrowser'

type SpecialBadgeType =
	| 'bday'
	| 'staff'
	| 'backer'
	| 'staruser'
	| 'community'
	| 'zodiac'
	| 'basic'

interface BadgeProps {
	content: string
	type?: SpecialBadgeType
	color?: string
	icon?: React.ReactNode
}

interface ProfileCoverProps {
	profileImage: string
	coverImage: string
	displayName: string
	userID: string
	followers: number
	following: number
	isOwnProfile?: boolean
}

interface ProfileDetailsProps {
	bio: string
	badges: BadgeProps[]
}

const ProfileCover: React.FC<ProfileCoverProps> = ({
	profileImage,
	coverImage,
	displayName,
	userID,
	followers,
	following,
	isOwnProfile = false,
}) => {
	const { deviceType, os, browser } = useDeviceAndBrowser()

	return (
		<section className='relative overflow-hidden rounded-b-2xl p-4 lg:rounded-2xl lg:p-6'>
			{/* Cover with mask */}
			<figure
				className='absolute left-0 top-0 h-full w-full'
				style={{
					backgroundImage: `url(${coverImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					filter: 'brightness(60%)',
				}}
			></figure>

			{/* Content */}
			<article className='relative flex h-max flex-col gap-4'>
				<nav className='flex items-center justify-between space-x-3'>
					<Button
						variant={'dimmed'}
						size={'default-icon'}
					>
						<ArrowBack size={24} />
					</Button>
					<div className='flex gap-4 font-bold'>
						<div className='flex flex-col items-center space-y-1'>
							<span className=''>{FormatNumber(followers)}</span>
							<span className='text-white/[.60]'>Followers</span>
						</div>
						<div className='flex flex-col  items-center space-y-1'>
							<span className=''>{FormatNumber(following)}</span>
							<span className='text-white/[.60]'>Following</span>
						</div>
					</div>
					<div className='flex flex-col'>
						<Button
							variant={'dimmed'}
							size={'default-icon'}
						>
							<OutlineMore size={24} />
						</Button>
						{!isOwnProfile && (
							<Button
								variant={'dimmed'}
								className='absolute top-[4.5rem]'
								size={'default-icon'}
							>
								<OutlineBell size={24} />
							</Button>
						)}
					</div>
				</nav>
				<figure className='flex w-max'>
					<img
						src={profileImage}
						alt='Profile'
						className='h-20 w-20 rounded-full'
					/>
					{/* <div className='flex flex-col'>
						<UserInfo size='large' />
						<h1 className='text-xl font-bold'>{displayName}</h1>
						<span className='text-gray-600'>@{userID}</span>
					</div> */}
				</figure>
				<footer className='flex w-full flex-col'>
					<UserInfo size='large' />
					<div className='mt-2 flex items-baseline justify-between'>
						<div className='flex space-x-2'>
							<Button
								variant={'ghost'}
								size={
									deviceType === 'mobile'
										? 'xs-icon'
										: 'sm-icon'
								}
							>
								<OutlineLink size={24} />
							</Button>
							<Button
								variant={'ghost'}
								size={
									deviceType === 'mobile'
										? 'xs-icon'
										: 'sm-icon'
								}
							>
								<OutlineLink size={24} />
							</Button>
							<Button
								variant={'ghost'}
								size={
									deviceType === 'mobile'
										? 'xs-icon'
										: 'sm-icon'
								}
							>
								<OutlineLink size={24} />
							</Button>
						</div>
						<div className='flex space-x-4'>
							<Button
								variant={'outline'}
								size={
									deviceType === 'mobile'
										? 'sm-icon'
										: 'default-icon'
								}
							>
								<OutlineMessage size={24} />
							</Button>
							<Button
								variant={'outline'}
								size={
									deviceType === 'mobile' ? 'sm' : 'default'
								}
							>
								Following
							</Button>
							{/* <Button
								variant={'default'}
								size={'sm'}
							>
								Follow
							</Button> */}
						</div>
					</div>
				</footer>
			</article>
		</section>
	)
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ bio, badges }) => {
	const getSpecialBadgeProperties = (
		type: SpecialBadgeType,
	): { color?: string; icon?: React.ReactNode } => {
		switch (type) {
			case 'bday':
				return {
					color: 'text-accent-500',
					icon: <OutlineLink size={24} />,
				}
			case 'staff':
				return {
					color: 'text-white',
					icon: <OutlineLink size={24} />,
				}
			case 'backer':
				return {
					color: 'text-accent-500',
					icon: <OutlineLink size={24} />,
				}
			case 'staruser':
				return {
					color: 'text-warning-200',
					icon: <OutlineLink size={24} />,
				}
			case 'community':
				return {
					color: 'text-accent-500',
					icon: <OutlineLink size={24} />,
				}
			case 'zodiac':
				return {
					icon: <OutlineLink size={24} />,
				}
			default:
				return {}
		}
	}

	return (
		<section className='px-5'>
			<p>{bio}</p>
			<div className='scroll mt-3 flex space-x-4 overflow-x-auto pb-5'>
				{badges.map((badge, index) => {
					const { color, icon } = badge.type
						? getSpecialBadgeProperties(badge.type)
						: { color: badge.color, icon: null }
					return (
						<Chip
							key={index}
							classNames={{
								base: `group py-[.75rem] px-[1.5rem] !h-auto rounded-[.75rem] cursor-pointer transition-colors bg-primary-lighter hover:bg-primary-badge`,
								content: `text-white/[.60] ${color} p-0 flex items-center gap-2 text-lg overflow-hidden text-ellipsis whitespace-pre leading-tight`,
							}}
						>
							{icon}
							{badge.content}
						</Chip>
					)
				})}
			</div>
		</section>
	)
}

export { ProfileCover, ProfileDetails }
