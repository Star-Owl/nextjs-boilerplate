import { Chip } from '@nextui-org/react'
import Typography from '@mui/material/Typography'
import React from 'react'
import { FunctionComponent } from 'react'
import Twemoji from 'react-twemoji'

interface Props {
	userID?: string
	size?: 'small' | 'large'
}

const UserInfo: FunctionComponent<Props> = ({ size = 'small' }) => {
	const isLarge = size === 'large'
	const typographyStyle = isLarge ? 'text-xxl' : 'text-base'
	const chipTextStyle = isLarge ? 'text-white' : 'text-white/[.60]'
	const chipBgStyle = isLarge ? 'bg-black/[.3]' : 'bg-white/[.06]'

	return (
		<React.Fragment>
			<Twemoji options={{ className: 'emoji' }}>
				<Typography
					component={size === 'small' ? 'p' : 'h3'}
					className={`w-max cursor-pointer overflow-hidden text-ellipsis whitespace-pre ${typographyStyle} font-bold hover:underline`}
				>
					Hasira 🥃🪴
				</Typography>
			</Twemoji>
			<Chip
				radius='sm'
				classNames={{
					base: `group ${chipBgStyle} backdrop-blur-md py-[.281rem] px-[.562rem] !h-auto rounded-[.375rem] cursor-pointer transition-colors hover:bg-white/[.12]`,
					content: `${chipTextStyle} text-xs p-0 group-hover:text-white overflow-hidden text-ellipsis whitespace-pre leading-tight`,
				}}
			>
				@starowl.social
			</Chip>
		</React.Fragment>
	)
}

export default UserInfo
