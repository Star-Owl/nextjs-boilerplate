import Typography from '@mui/material/Typography'
import { FunctionComponent } from 'react'
import { Avatar, Badge, Chip } from '@nextui-org/react'
import React from 'react'
import { OutlineUser } from 'src/icons/Icons'
import Twemoji from 'react-twemoji'
import UserInfo from './UserInfo'
import { getDisplayName } from 'next/dist/shared/lib/utils'

interface Props {
	avatar?: boolean
	badge?: boolean
}

const UserAvatarCard: FunctionComponent<Props> = ({
	avatar = false,
	badge = false,
}) => {
	return (
		<React.Fragment>
			{badge && avatar ? (
				<Badge
					content=''
					color='success'
					shape='circle'
					placement='bottom-right'
					className='pointer-events-none h-5 w-5 border-4 border-primary-lighter'
				>
					<Avatar
						//isBordered
						// color='base'
						name='Hasira'
						src='https://cdn.discordapp.com/avatars/569975072417251378/2113775a498da6818a3bdf75af82f40c.webp?size=128'
						showFallback
						fallback={
							<OutlineUser
								className='h-6 w-6 text-default-500'
								fill='currentColor'
							/>
						}
						className='h-10 w-10 cursor-pointer bg-white/[.06] text-sm transition-opacity hover:opacity-60'
					/>
				</Badge>
			) : avatar ? (
				<Avatar
					//isBordered
					// color='base'
					name='Hasira'
					src='https://cdn.discordapp.com/avatars/569975072417251378/2113775a498da6818a3bdf75af82f40c.webp?size=128'
					showFallback
					fallback={
						<OutlineUser
							className={`h-4 w-4 text-default-500 md:h-6 md:w-6`}
							fill='currentColor'
						/>
					}
					className='h-10 w-10 cursor-pointer bg-white/[.06] text-sm transition-opacity hover:opacity-60 md:h-12 md:w-12'
				/>
			) : null}
			<div className='flex flex-1 gap-4 overflow-hidden'>
				<div className='flex h-full flex-col justify-evenly overflow-hidden'>
					<UserInfo
						displayName='⭐️ StarOwl 🦉'
						userID={'@starowl.social'}
						size='xs'
						link
					/>
				</div>
			</div>
		</React.Fragment>
	)
}

export default UserAvatarCard
