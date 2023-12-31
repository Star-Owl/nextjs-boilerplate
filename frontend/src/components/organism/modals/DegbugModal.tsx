import { apiEndpoint } from '@/frontend/config'
import { toast } from '@/hooks/use-toast'
import packageJson from '@/root/package.json'
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/modal'
import { ScrollShadow, Spacer, Switch, cn } from '@nextui-org/react'
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/table'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { NotificationContext } from 'src/contexts/NotificationContext'
import { ThemeContext } from 'src/contexts/ThemeContext'
import { OutlineClose } from 'src/icons/Icons'
import UAParser from 'ua-parser-js'
import { Button } from '../../atom/button'
import HueCircle from '@/components/molecule/color-wheel'
import { RadioGroup, Radio } from '@nextui-org/react'

interface InfoData {
	browser: string | undefined
	version: string | undefined
	os: string | undefined
	device: string
	ip: string
}

const DebugMenuModal = () => {
	const context = useContext(NotificationContext)
	if (!context) throw new Error('NotificationContext not provided')

	const themeContext = useContext(ThemeContext)
	if (!themeContext)
		throw new Error('YourComponent must be used within a ThemeProvider')

	const { isSecondaryTheme, toggleTheme, accentHue, setAccentHue } =
		themeContext

	const [tempAccentHue, setTempAccentHue] = useState(accentHue)

	const handleSave = () => {
		setAccentHue(tempAccentHue)
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
			scrollBehavior={'inside'}
			classNames={{
				backdrop: 'bg-[#292f46]/50 backdrop-blur-md z-10',
				base: 'border-none bg-primary-dark rounded-2xl max-h-[80vh]',
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
							<ScrollShadow
								hideScrollBar
								className='flex h-full flex-col gap-2'
							>
								<p>How did you get here?</p>
								{/* <Spacer y={2} /> */}
								{/* <Button onClick={fetchData}>
									Check Backend
								</Button> */}
								<Spacer y={2} />
								<ThemeChanger label={'Select your theme'} />
								<Spacer y={2} />
								<CustomSwitch
									title={'Notification Controller'}
									description={
										'Turn On / Turn off notification'
									}
									isSelected={isSelected}
									onValueChange={setIsSelected}
								/>
								<CustomSwitch
									title={'Toggle Theme'}
									description={
										'Switch between primary and secondary themes'
									}
									isSelected={isSecondaryTheme}
									onValueChange={toggleTheme}
								/>
								<div className='flex justify-center p-6'>
									<HueCircle />
								</div>
								{/* <label htmlFor='accentHue'>Accent Hue:</label> */}
								{/* <input
									id='accentHue'
									type='number'
									value={accentHue}
									onChange={(e) =>
										setTempAccentHue(Number(e.target.value))
									}
								/> */}
								{/* <Separator /> */}
								<Spacer y={2} />
								<p>Data Table</p>
								<Spacer y={2} />
								<InfoDisplay info={info} />
							</ScrollShadow>
						</ModalBody>
						<ModalFooter className='mb-2 flex gap-4'>
							<Button
								variant='ghost'
								onClick={onClose}
							>
								Cancel
							</Button>
							<Button
								onClick={() => {
									handleSave()
									onClose()
								}}
							>
								Save
							</Button>
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

interface ThemeChangerProps {
	isSelected?: boolean
	onValueChange?: (value: boolean) => void
	label?: string
}

const ThemeChanger: React.FC<ThemeChangerProps> = ({ label = null }) => {
	const [theme, setTheme] = useState(
		localStorage.getItem('selectedTheme') || 'primary',
	)

	useEffect(() => {
		changeTheme(theme)
	}, [theme])

	const changeTheme = (theme: string) => {
		let primaryDark, primaryLighter, primaryBadge

		if (theme === 'secondary') {
			primaryDark = 'hsl(215, 32%, 10%)'
			primaryLighter = 'hsl(215, 32%, 12%)'
			primaryBadge = 'hsl(215, 32%, 14%)'
		} else if (theme === 'third') {
			primaryDark = 'hsl(220, 8%, 7%)'
			primaryLighter = 'hsl(220, 8%, 9%)'
			primaryBadge = 'hsl(220, 8%, 11%)'
		} else {
			primaryDark = 'hsl(206, 42%, 7%)'
			primaryLighter = 'hsl(206, 42%, 10%)'
			primaryBadge = 'hsl(206, 42%, 13%)'
		}

		document.documentElement.style.setProperty(
			'--primary-dark',
			primaryDark,
		)
		document.documentElement.style.setProperty(
			'--primary-lighter',
			primaryLighter,
		)
		document.documentElement.style.setProperty(
			'--primary-badge',
			primaryBadge,
		)

		localStorage.setItem('selectedTheme', theme)
	}

	useEffect(() => {
		const savedTheme = localStorage.getItem('selectedTheme')
		if (savedTheme) {
			changeTheme(savedTheme)
		}
	}, [])

	return (
		<RadioGroup
			label={label}
			orientation='horizontal'
			value={theme}
			onValueChange={(value) => setTheme(value)}
		>
			<Radio value='primary'>Deep Space</Radio>
			<Radio value='secondary'>Stellar Blue</Radio>
			<Radio value='third'>Cosmic Gray</Radio>
		</RadioGroup>
	)
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
					'data-[selected=true]:border-accent-600',
				),
				wrapper: cn(
					'p-0 h-4 overflow-visible bg-white-500',
					'group-data-[selected=true]:bg-accent-600',
				),
				thumb: cn(
					'w-6 h-6 border-2 shadow-lg border-white-500 bg-primary-dark',
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
				<TableRow key='app_version'>
					<TableCell>StarOwl Version</TableCell>
					<TableCell>{packageJson.version || 'N/A'}</TableCell>
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
		}

		const handleKeyUp = (event: KeyboardEvent) => {
			setPressedKeys((prev) => {
				const newSet = new Set([...prev])
				newSet.delete(event.key)
				if (pressedKeys.has('h') && pressedKeys.has('p')) {
					setIsOpen(true)
				}
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
