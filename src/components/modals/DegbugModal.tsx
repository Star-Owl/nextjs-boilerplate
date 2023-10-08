import React, { useContext, useEffect, useState } from 'react'
import UAParser from 'ua-parser-js'
import axios from 'axios'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@nextui-org/modal'
import { Button } from '../ui/button'
import { OutlineClose } from 'src/icons/Icons'
import { Switch, cn } from '@nextui-org/react'
import { NotificationContext } from 'src/contexts/NotificationContext'

interface InfoData {
	browser: string | undefined
	version: string | undefined
	os: string | undefined
	device: string
	ip: string
}

const DebugMenuModal = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [info, setInfo] = useState<InfoData | null>(null)
	const context = useContext(NotificationContext)
	if (!context) {
		throw new Error('NotificationContext not provided')
	}
	const { isSelected, setIsSelected } = context

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.altKey && event.key === 'f') {
				setIsOpen(!isOpen)
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		if (isOpen) {
			const parser = new UAParser()
			const result = parser.getResult()
			axios.get('https://api.ipify.org?format=json').then((response) => {
				const ip = response.data.ip
				setInfo({
					browser: result.browser.name,
					version: result.browser.version,
					os: result.os.name,
					device: result.device.model || 'N/A',
					ip: ip,
				})
			})
		}

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen])

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={() => setIsOpen(false)}
			closeButton={false}
			classNames={{
				backdrop: 'bg-[#292f46]/50 backdrop-blur-md',
				base: 'border-none bg-primary-dark rounded-2xl',
				closeButton: 'hidden right-4 top-4',
			}}
		>
			<ModalContent>
				{(onClose) => (
					<React.Fragment>
						<ModalHeader className='flex flex-1 items-center justify-between gap-1'>
							Debug Menu
							<Button
								variant='ghost'
								size={'sm-icon'}
								onClick={onClose}
							>
								<OutlineClose size={24} />{' '}
							</Button>
						</ModalHeader>
						<ModalBody>
							<p>How did you get here?</p>
							<div>Browser: {info?.browser}</div>
							<div>Version: {info?.version}</div>
							<div>OS: {info?.os}</div>
							<div>Device: {info?.device}</div>
							<div>IP: {info?.ip}</div>
							<Switch
								isSelected={isSelected}
								onValueChange={setIsSelected}
								size={'sm'}
								classNames={{
									base: cn(
										'inline-flex flex-row-reverse w-full max-w-md bg-primary-lighter items-center',
										'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
										'data-[selected=true]:border-primary',
									),
									wrapper: cn(
										'p-0 h-4 overflow-visible bg-[#273648]',
										'group-data-[selected=true]:bg-accent-600',
									),
									thumb: cn(
										'w-6 h-6 border-2 shadow-lg border-[#273648] bg-primary-dark',
										'group-data-[hover=true]:border-accent',
										//selected
										'group-data-[selected=true]:ml-4 group-data-[selected=true]:border-accent-600',
										// pressed
										'group-data-[pressed=true]:w-6',
										'group-data-[selected]:group-data-[pressed]:ml-4',
									),
								}}
							>
								<div className='flex flex-col gap-1'>
									<p className='text-medium'>
										Disable Nest Notification
									</p>
									<p className='text-tiny text-default-400'>
										it's experimantal
									</p>
								</div>
							</Switch>
						</ModalBody>
						<ModalFooter className='mb-2'>
							<Button
								color='danger'
								variant='outline'
								onClick={onClose}
							>
								Close
							</Button>
						</ModalFooter>
					</React.Fragment>
				)}
			</ModalContent>
		</Modal>
	)
}

export default DebugMenuModal
