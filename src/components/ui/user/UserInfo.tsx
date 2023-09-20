import { Chip } from '@nextui-org/react'
import Typography from '@mui/material/Typography'
import React from 'react'
import { FunctionComponent } from 'react'
import Twemoji from 'react-twemoji'

interface Props {
	userID?: string
}

const UserInfo: FunctionComponent<Props> = ({}) => {
	return (
		<React.Fragment>
			<Twemoji
				noWrapper
				options={{ className: 'emoji' }}
			>
				{''}
				<Typography
					variant='body2'
					component='p'
					className='w-max cursor-pointer overflow-hidden text-ellipsis whitespace-pre !font-semibold hover:underline'
				>
					Hasira 🥃🪴
				</Typography>
			</Twemoji>
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
		</React.Fragment>
	)
}

export default UserInfo
