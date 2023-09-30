import React from 'react'
import { Button } from '../button'
import { Chip } from '@nextui-org/react'
import UserInfo from './UserInfo'
import {
	OutlineBell,
	OutlineMessage,
	OutlineMore,
	OutlineTrashCan,
	OutlineUser,
} from 'src/icons/Icons'
import { FormatNumber } from '@/lib/numberFormat'

interface BadgeProps {
	content: string
	color?: string
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
	return (
		<section className='relative overflow-hidden rounded-2xl p-5'>
			{/* Cover with mask */}
			<div
				className='absolute left-0 top-0 h-full w-full'
				style={{
					backgroundImage: `url(${coverImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					filter: 'brightness(60%)',
				}}
			></div>

			{/* Content */}
			<div className='relative flex h-max flex-col gap-4'>
				<nav className='flex items-center justify-between space-x-3'>
					<Button
						variant={'outline'}
						size={'sm-icon'}
					>
						<OutlineTrashCan size={24} />
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
							variant={'outline'}
							size={'sm-icon'}
						>
							<OutlineMore size={24} />
						</Button>
						{!isOwnProfile && (
							<Button
								variant={'outline'}
								className='absolute top-16'
								size={'sm-icon'}
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
						<div className='flex space-x-4'>
							<OutlineUser size={24} />
							<OutlineUser size={24} />
							<OutlineUser size={24} />
							<OutlineUser size={24} />
						</div>
						<div className='flex space-x-4'>
							<Button
								variant={'outline'}
								size={'sm-icon'}
							>
								<OutlineMessage size={24} />
							</Button>
							<Button
								variant={'outline'}
								size={'sm'}
							>
								Following
							</Button>
							<Button
								variant={'default'}
								size={'sm'}
							>
								Follow
							</Button>
						</div>
					</div>
				</footer>
			</div>

			{/* User Info and Followers/Following Count */}
			{/* <div className='mt-56 flex items-end justify-between px-5'>
				<div>
					<h1 className='text-xl font-bold'>{displayName}</h1>
					<span className='text-gray-600'>@{userID}</span>
				</div>

				<div className='flex space-x-8 text-gray-600'>
					<div className='flex flex-col items-center'>
						<span className='text-xl font-bold'>{followers}</span>
						<span>Followers</span>
					</div>
					<div className='flex flex-col items-center'>
						<span className='text-xl font-bold'>{following}</span>
						<span>Following</span>
					</div>
				</div>
			</div> */}
		</section>
	)
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ bio, badges }) => {
	return (
		<section className='px-5'>
			<p className='text-white'>{bio}</p>
			<div className='mt-3 flex space-x-2'>
				{badges.map((badge, index) => (
					<Chip
						key={index}
						radius='sm'
						classNames={{
							base: 'group bg-white/[.06] py-[.281rem] px-[.562rem] !h-auto rounded-[.375rem] cursor-pointer transition-colors hover:bg-white/[.12]',
							content:
								'text-white/[.60] p-0 group-hover:text-white text-xs overflow-hidden text-ellipsis whitespace-pre leading-tight',
						}}
					>
						{badge.content}
					</Chip>
					// <span
					// 	key={index}
					// 	className={`rounded-lg px-3 py-1 text-white ${
					// 		badge.color || 'bg-indigo-500'
					// 	}`}
					// >
					// 	{badge.content}
					// </span>
				))}
			</div>
		</section>
	)
}

export { ProfileCover, ProfileDetails }
