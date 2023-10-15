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
import { Separator } from '@/components/ui/separator'
import { Spacer } from '@nextui-org/react'
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from '@nextui-org/table'
import { toast } from '@/hooks/use-toast'
import { apiEndpoint } from '@/frontend/config'

interface InfoData {
	browser: string | undefined
	version: string | undefined
	os: string | undefined
	device: string
	ip: string
}

const DebugMenuModal = () => {
	const context = useContext(NotificationContext)
	if (!context) {
		throw new Error('NotificationContext not provided')
	}
	const { isSelected, setIsSelected } = context
	const [isOpen, setIsOpen] = useState(false)
	const [info, setInfo] = useState<InfoData | null>(null)

	useDebugModal(isOpen, setIsOpen, setInfo)

	return (
		<Modal
			isOpen={isOpen}
			size={'xl'}
			onOpenChange={() => setIsOpen(false)}
			closeButton={false}
			classNames={{
				backdrop: 'bg-[#292f46]/50 backdrop-blur-md z-10',
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
								<OutlineClose size={24} />
							</Button>
						</ModalHeader>
						<ModalBody>
							<p>How did you get here?</p>
							<Button onClick={fetchData}>Check Backend</Button>
							<CustomSwitch
								title={'Notification Controler'}
								description={'Turn On / Turn off notification'}
								isSelected={isSelected}
								onValueChange={setIsSelected}
							/>
							<CustomSwitch
								title={'test'}
								description={'test'}
							/>
							<CustomSwitch
								title={'test'}
								description={'test'}
							/>
							{/* <Separator /> */}
							<Spacer y={2} />
							<p>Data Table</p>
							<InfoDisplay info={info} />
						</ModalBody>
						<ModalFooter className='mb-2 flex gap-4'>
							<Button
								variant='ghost'
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button onClick={onClose}>Save</Button>
						</ModalFooter>
					</React.Fragment>
				)}
			</ModalContent>
		</Modal>
	)
}

export default DebugMenuModal

interface CustomSwitchProps {
	isSelected?: boolean
	onValueChange?: (value: boolean) => void
	title: string
	description: string
}

async function fetchData() {
	try {
		const response = await fetch(`${apiEndpoint}/example/data`)

		// Log raw response for debugging
		const text = await response.text()
		console.log(text)

		const data = JSON.parse(text)
		console.log(data)
		toast({
			title: 'Fetch Data Success',
			description: data.message,
		})
	} catch (error) {
		console.error('Error fetching data:', error)
		if (error instanceof Error) {
			toast({
				variant: 'destructive',
				title: 'Fetch Data Failed',
				description: error.message,
			})
		} else {
			toast({
				variant: 'destructive',
				title: 'Fetch Data Failed',
				description: 'An unexpected error occurred.',
			})
		}
	}
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
	isSelected,
	onValueChange,
	title,
	description,
}) => {
	return (
		<Switch
			isSelected={isSelected}
			onValueChange={onValueChange}
			size={'sm'}
			classNames={{
				base: cn(
					'inline-flex flex-row-reverse w-full max-w-full bg-primary-lighter items-center',
					'justify-between cursor-pointer rounded-2xl gap-2 p-4 border-2 border-transparent',
					'data-[selected=true]:border-primary',
				),
				wrapper: cn(
					'p-0 h-4 overflow-visible bg-[#273648]',
					'group-data-[selected=true]:bg-accent-600',
				),
				thumb: cn(
					'w-6 h-6 border-2 shadow-lg border-[#273648] bg-primary-dark',
					'group-data-[hover=true]:border-accent',
					'group-data-[selected=true]:ml-4 group-data-[selected=true]:border-accent-600',
					'group-data-[pressed=true]:w-6',
					'group-data-[selected]:group-data-[pressed]:ml-4',
				),
			}}
		>
			<div className='flex flex-col gap-1'>
				<h4 className='text-lg'>{title}</h4>
				<p className='text-sm text-white-500'>{description}</p>
			</div>
		</Switch>
	)
}

interface InfoProps {
	info: InfoData | null
}

const InfoDisplay: React.FC<InfoProps> = ({ info }) => {
	const classNames = React.useMemo(
		() => ({
			wrapper: [
				'max-h-[382px]',
				'max-w-3xl',
				'bg-primary-lighter shadow-none',
			],
			body: ['hover:bg-primary-badge tr-hover:bg-primary-badge'],
			th: [
				'bg-primary-badge',
				// 'bg-transparent',
				// 'text-default-500',
				// 'border-b',
				// 'border-divider',
			],
			//tr: ['hover:bg-primary-badge'],
			td: [
				// changing the rows border radius
				// first
				'group-data-[first=true]:first:before:rounded-none',
				'group-data-[first=true]:last:before:rounded-none',
				// // middle
				'group-data-[middle=true]:before:rounded-none',
				// // last
				'group-data-[last=true]:first:before:rounded-none',
				'group-data-[last=true]:last:before:rounded-none',
			],
		}),
		[],
	)

	return (
		<Table
			aria-label='Information table'
			classNames={classNames}
		>
			<TableHeader>
				<TableColumn>Property</TableColumn>
				<TableColumn>Value</TableColumn>
			</TableHeader>
			<TableBody emptyContent={'No rows to display.'}>
				<TableRow key='browser'>
					<TableCell>Browser</TableCell>
					<TableCell>{info?.browser || 'N/A'}</TableCell>
				</TableRow>
				<TableRow key='version'>
					<TableCell>Version</TableCell>
					<TableCell>{info?.version || 'N/A'}</TableCell>
				</TableRow>
				<TableRow key='os'>
					<TableCell>OS</TableCell>
					<TableCell>{info?.os || 'N/A'}</TableCell>
				</TableRow>
				<TableRow key='device'>
					<TableCell>Device</TableCell>
					<TableCell>{info?.device || 'N/A'}</TableCell>
				</TableRow>
				<TableRow key='ip'>
					<TableCell>IP</TableCell>
					<TableCell>{info?.ip || 'N/A'}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
}

const useDebugModal = (
	isOpen: boolean,
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
	setInfo: React.Dispatch<React.SetStateAction<InfoData | null>>,
) => {
	const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			setPressedKeys((prev) => new Set([...prev, event.key]))

			if (pressedKeys.has('h')) {
				//&& pressedKeys.has('p')
				setIsOpen(true)
			}

			if (event.altKey && event.key === 'f') {
				setIsOpen(!isOpen)
			}
		}

		const handleKeyUp = (event: KeyboardEvent) => {
			setPressedKeys((prev) => {
				const newSet = new Set([...prev])
				newSet.delete(event.key)
				return newSet
			})
		}

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)

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
			window.removeEventListener('keyup', handleKeyUp)
		}
	}, [isOpen, setIsOpen, setInfo, pressedKeys])
}
