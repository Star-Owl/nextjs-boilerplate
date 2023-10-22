import { toast } from '@/hooks/use-toast'
import { Checkbox } from '@nextui-org/checkbox'
import { Input } from '@nextui-org/input'
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/modal'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import {
	OutlineClose,
	OutlineEdit,
	OutlineEye,
	OutlineEyeOff,
} from 'src/icons/Icons'
import * as z from 'zod'
import { Button } from '../../atom/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../../atom/form'

import { getCurrentDateTime } from '@/lib/date/date'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDisclosure } from '@nextui-org/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

interface Props {
	open: boolean
	onOpenChange: (state: boolean) => void
}

const FormSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(6, {
		message: 'Password must be at least 6 characters.',
	}),
})

const LoginModal: React.FC<Props> = () => {
	const [windowWidth, setWindowWidth] = React.useState(0)
	//console.log(windowWidth)

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

	const { isOpen, onOpen, onOpenChange } = useDisclosure()

	return (
		<React.Fragment>
			<Button
				onClick={onOpen}
				variant={'outline'}
				size={windowWidth <= 1280 ? 'lg-icon' : 'lg'}
			>
				{windowWidth <= 1280 ? <OutlineEdit size={28} /> : 'Login'}
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				backdrop='blur'
				closeButton={false}
				classNames={{
					//body: 'py-6',
					backdrop: 'bg-[#292f46]/50 backdrop-blur-md',
					base: 'border-none bg-primary-dark rounded-2xl',
					// header: 'border-b-[1px] border-[#292f46]',
					// footer: 'border-t-[1px] border-[#292f46]',
					closeButton: 'hidden right-4 top-4',
				}}
			>
				<ModalContent>
					{(onClose) => (
						<React.Fragment>
							<ModalHeader className='flex flex-1 items-center justify-between gap-1'>
								Login
								<Button
									variant='ghost'
									size={'sm-icon'}
									onClick={onClose}
								>
									<OutlineClose size={24} />{' '}
								</Button>
							</ModalHeader>
							<ModalBody>
								<FormComponent />
							</ModalBody>
							<ModalFooter className='mb-2 justify-center'>
								<Link
									className='font-bold text-accent-600 underline-offset-2 transition-transform-colors hover:text-accent-700 hover:underline'
									href={'#'}
								>
									Create an account
								</Link>
							</ModalFooter>
						</React.Fragment>
					)}
				</ModalContent>
			</Modal>
		</React.Fragment>
	)
}

export default LoginModal

const FormComponent = () => {
	const [isVisible, setIsVisible] = React.useState(false)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		signIn('credentials', {
			email: data.email,
			password: data.password,
			callbackUrl: '/',
		})
			.then(() => {
				toast({
					title: 'Successfully signed in!',
				})
			})
			.catch((error) => {
				console.error('Sign in failed:', error)
				toast({
					title: 'Sign in failed',
					description: error.message,
				})
			})
	}

	const toggleVisibility = () => setIsVisible(!isVisible)

	const toastTest = () => {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>{getCurrentDateTime()}</code>
				</pre>
			),
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'
			>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							{/* <FormLabel>Username</FormLabel> */}
							<FormControl>
								<div className='items-top flex gap-4'>
									{/*
									<Button
										disabled
										variant={'outline'}
										className='h-fit !ring-default-400'
										size={'default-icon'}
									>
										<OutlineUser
											size={24}
										/>
									</Button>
									*/}
									<Input
										//isClearable
										type='email'
										label='Email'
										variant='bordered'
										{...field}
										//placeholder='Enter your email'
										//defaultValue='junior@nextui.org'
										//description="We'll never share your email with anyone else."
										// onClear={() =>
										// 	console.log(
										// 		'input cleared',
										// 	)
										// }
										//className='max-w-xs'
									/>
								</div>
							</FormControl>
							{/*
							<FormDescription>
								This is your public display name.
							</FormDescription>
							*/}
							<FormMessage className='text-danger' />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							{/* <FormLabel>Username</FormLabel> */}
							<FormControl>
								<div className='flex items-center gap-4'>
									{/*
									<Button
										disabled
										variant={'outline'}
										className='!ring-default-400'
										size={'default-icon'}
									>
										<OutlineBell
											size={24}
										/>
									</Button>
									*/}
									<Input
										label='Password'
										variant='bordered'
										{...field}
										//placeholder='Enter your password'
										// startContent={
										// 	<OutlineUser
										// 		size={24}
										// 	/>
										// }
										endContent={
											<button
												className='focus:outline-none'
												type='button'
												onClick={toggleVisibility}
											>
												{isVisible ? (
													<OutlineEye
														size={24}
														className='pointer-events-none text-2xl text-default-400'
													/>
												) : (
													<OutlineEyeOff
														size={24}
														className='pointer-events-none text-2xl text-default-400'
													/>
												)}
											</button>
										}
										type={isVisible ? 'text' : 'password'}
										//className='max-w-xs'
									/>
								</div>
							</FormControl>
							{/*
							<FormDescription>
								This is your public displayvname.
							</FormDescription>
							*/}
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex flex-col space-y-6'>
					<div className='flex justify-between px-1 py-2'>
						<Checkbox radius='sm'>Remember me</Checkbox>
						<Link
							className='font-bold text-accent-600 underline-offset-2 transition-transform-colors hover:text-accent-700 hover:underline'
							color='primary'
							href='#'
						>
							Forgot password?
						</Link>
					</div>
					<Button
						type='submit'
						onClick={toastTest}
					>
						Login
					</Button>
				</div>
			</form>
		</Form>
	)
}
