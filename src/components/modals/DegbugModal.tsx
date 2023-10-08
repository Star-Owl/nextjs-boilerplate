import React, { useEffect, useState } from 'react'
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
