import * as React from 'react'
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogClose,
} from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import useDeviceAndBrowser from '@/hooks/useDeviceAndBrowser'
import { OutlineEdit } from 'src/icons/Icons'

interface Props {
	open: boolean
	onOpenChange: (state: boolean) => void
}

const RegisterModal: React.FC<Props> = ({ open, onOpenChange }) => {
	const { deviceType, os, browser } = useDeviceAndBrowser()
	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogTrigger asChild>
				<Button
					disabled
					size={
						deviceType === 'tablet' && window.innerWidth < 1366
							? 'lg-icon'
							: 'lg'
					}
				>
					{deviceType === 'tablet' && window.innerWidth < 1366 ? (
						<OutlineEdit size={28} />
					) : (
						'Register'
					)}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<h1>Register</h1>
				<DialogClose>Close</DialogClose>
			</DialogContent>
		</Dialog>
	)
}

export default RegisterModal
