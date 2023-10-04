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
	const [windowWidth, setWindowWidth] = React.useState(0)

	React.useEffect(() => {
		// Update the width when the component mounts
		setWindowWidth(window.innerWidth)

		// Add a resize listener
		const handleResize = () => {
			setWindowWidth(window.innerWidth)
		}

		window.addEventListener('resize', handleResize)

		// Cleanup the listener on component unmount
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			<DialogTrigger asChild>
				<Button
					disabled
					size={windowWidth <= 1280 ? 'lg-icon' : 'lg'}
				>
					{windowWidth <= 1280 ? (
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
