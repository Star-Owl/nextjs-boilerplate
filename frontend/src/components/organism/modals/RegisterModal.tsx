import * as React from 'react'
import { toast } from '@/hooks/use-toast'
import { Button } from '../../atom/button'
import useDeviceAndBrowser from '@/hooks/useDeviceAndBrowser'
import {
	OutlineClose,
	OutlineBell,
	OutlineEdit,
	OutlineEye,
	OutlineEyeOff,
	OutlineUser,
} from 'src/icons/Icons'
import { useModalContext } from 'src/contexts/ModalContext'
import { useCallback, useState } from 'react'
import * as z from 'zod'
import { signIn } from 'next-auth/react'
import { Input } from '@nextui-org/input'
import { Checkbox } from '@nextui-org/checkbox'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../atom/form'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@nextui-org/modal'
import { Spacer } from '@nextui-org/spacer'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useDisclosure } from '@nextui-org/react'

interface Props {
	open: boolean
	onOpenChange: (state: boolean) => void
}

const FormSchema = z.object({
	name: z.string().max(50, {
		message: `Dispaly name can't have more than 50 characters`,
	}),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(6, {
		message: 'Password must be at least 6 characters.',
	}),
})

const RegisterModal: React.FC<Props> = () => {
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

	const [isVisible, setIsVisible] = React.useState(false)
	const [page, setPage] = useState(1)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

	function getCurrentDateTime() {
		const now = new Date()

		const month = now.getMonth() + 1 // Months are 0-based
		const day = now.getDate()
		const year = now.getFullYear()

		let hours = now.getHours()
		const ampm = hours >= 12 ? 'PM' : 'AM'

		hours = hours % 12
		hours = hours ? hours : 12 // the hour '0' should be '12'
		const minutes = String(now.getMinutes()).padStart(2, '0')
		const seconds = String(now.getSeconds()).padStart(2, '0')

		const dateStr = `${month}/${day}/${year}`
		const timeStr = `${hours}:${minutes} ${ampm}`

		return `${dateStr} and ${timeStr}`
	}

	const onNext = async () => {
		setPage(2)
	}

	const onBack = async () => {
		setPage(1)
	}

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

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>
						{JSON.stringify(data, null, 2)}
					</code>
				</pre>
			),
		})
	}

	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const toggleVisibility = () => setIsVisible(!isVisible)

	return (
		<React.Fragment>
			<Button
				onClick={onOpen}
				size={windowWidth <= 1280 ? 'lg-icon' : 'lg'}
			>
				{windowWidth <= 1280 ? <OutlineEdit size={28} /> : 'Register'}
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				backdrop='blur'
				closeButton={
					// <Button variant='ghost'>
					// 	<OutlineClose size={24} />
					// </Button>
					false
				}
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
								Register
								<Button
									variant='ghost'
									size={'sm-icon'}
									onClick={onClose}
								>
									<OutlineClose size={24} />{' '}
								</Button>
							</ModalHeader>
							<ModalBody className='mb-4'>
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className='space-y-6'
									>
										{page === 1 ? (
											<React.Fragment>
												<FormField
													control={form.control}
													name='name'
													render={({ field }) => (
														<FormItem>
															{/* <FormLabel>Username</FormLabel> */}
															<FormControl>
																<div className='items-top flex gap-4'>
																	<Input
																		//isClearable
																		type='name'
																		label='Display Name'
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
															{/* <FormDescription>
												This is your public display
												name.
											</FormDescription> */}
															<FormMessage className='text-danger' />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name='email'
													render={({ field }) => (
														<FormItem>
															{/* <FormLabel>Username</FormLabel> */}
															<FormControl>
																<div className='items-top flex gap-4'>
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
															{/* <FormDescription>
												This is your public display
												name.
											</FormDescription> */}
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
																	{/* <Button
														disabled
														variant={'outline'}
														className='!ring-default-400'
														size={'default-icon'}
													>
														<OutlineBell
															size={24}
														/>
													</Button> */}

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
																				onClick={
																					toggleVisibility
																				}
																			>
																				{isVisible ? (
																					<OutlineEye
																						size={
																							24
																						}
																						className='pointer-events-none text-2xl text-default-400'
																					/>
																				) : (
																					<OutlineEyeOff
																						size={
																							24
																						}
																						className='pointer-events-none text-2xl text-default-400'
																					/>
																				)}
																			</button>
																		}
																		type={
																			isVisible
																				? 'text'
																				: 'password'
																		}
																		//className='max-w-xs'
																	/>
																</div>
															</FormControl>
															{/* <FormDescription>
												This is your public display
												name.
											</FormDescription> */}
															<FormMessage />
														</FormItem>
													)}
												/>

												<div className='flex flex-col space-y-6'>
													<Spacer y={4} />
													<div className='flex justify-end space-x-6'>
														<Button
															variant={'ghost'}
															onClick={toastTest}
														>
															Cancel
														</Button>
														<Button
															//type='submit'
															//disabled={}
															onClick={onNext}
														>
															Next
														</Button>
													</div>
													{/* <div className='flex justify-between px-1 py-2'>
												<Checkbox radius='sm'>
													Remember me
												</Checkbox>
												<Link
													className='font-bold text-accent-600 underline-offset-2 transition-transform-colors hover:text-accent-700 hover:underline'
													color='primary'
													href='#'
												>
													Forgot password?
												</Link>
											</div> */}
													{/* <Button
												variant={'ghost'}
												onClick={toastTest}
											>
												Cancel
											</Button>
											<Button
												type='submit'
												onClick={toastTest}
											>
												Next
											</Button> */}
												</div>
											</React.Fragment>
										) : (
											<React.Fragment>
												<FormField
													control={form.control}
													name='name'
													render={({ field }) => (
														<FormItem>
															{/* <FormLabel>Username</FormLabel> */}
															<FormControl>
																<div className='items-top flex gap-4'>
																	<Input
																		//isClearable
																		type='name'
																		label='Display Name'
																		variant='bordered'
																		disabled
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
															{/* <FormDescription>
												This is your public display
												name.
											</FormDescription> */}
															<FormMessage className='text-danger' />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name='email'
													render={({ field }) => (
														<FormItem>
															{/* <FormLabel>Username</FormLabel> */}
															<FormControl>
																<div className='items-top flex gap-4'>
																	<Input
																		//isClearable
																		type='email'
																		label='Email'
																		variant='bordered'
																		disabled
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
															{/* <FormDescription>
												This is your public display
												name.
											</FormDescription> */}
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
																	{/* <Button
														disabled
														variant={'outline'}
														className='!ring-default-400'
														size={'default-icon'}
													>
														<OutlineBell
															size={24}
														/>
													</Button> */}

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
																				onClick={
																					toggleVisibility
																				}
																			>
																				{isVisible ? (
																					<OutlineEye
																						size={
																							24
																						}
																						className='pointer-events-none text-2xl text-default-400'
																					/>
																				) : (
																					<OutlineEyeOff
																						size={
																							24
																						}
																						className='pointer-events-none text-2xl text-default-400'
																					/>
																				)}
																			</button>
																		}
																		type={
																			isVisible
																				? 'text'
																				: 'password'
																		}
																		//className='max-w-xs'
																	/>
																</div>
															</FormControl>
															{/* <FormDescription>
												This is your public display
												name.
											</FormDescription> */}
															<FormMessage />
														</FormItem>
													)}
												/>

												<div className='flex flex-col space-y-6'>
													<Spacer y={4} />
													<div className='flex justify-end space-x-6'>
														<Button
															variant={'ghost'}
															onClick={onBack}
														>
															Back
														</Button>
														<Button
															type='submit'
															onClick={toastTest}
														>
															Register
														</Button>
													</div>
													{/* <div className='flex justify-between px-1 py-2'>
												<Checkbox radius='sm'>
													Remember me
												</Checkbox>
												<Link
													className='font-bold text-accent-600 underline-offset-2 transition-transform-colors hover:text-accent-700 hover:underline'
													color='primary'
													href='#'
												>
													Forgot password?
												</Link>
											</div> */}
													{/* <Button
												variant={'ghost'}
												onClick={toastTest}
											>
												Cancel
											</Button>
											<Button
												type='submit'
												onClick={toastTest}
											>
												Next
											</Button> */}
												</div>
											</React.Fragment>
										)}
									</form>
								</Form>
							</ModalBody>
							{/* <ModalFooter className='mb-2 justify-center'>
								<Link
									className='font-bold text-accent-600 underline-offset-2 transition-transform-colors hover:text-accent-700 hover:underline'
									href={'#'}
								>
									Already have an account? Log In
								</Link>
								<Button
									size={'xs'}
									asChild
									variant={'link'}
								>
									<Link href={'#'}>Create an account</Link>
								</Button>
								<Button
									color='danger'
									variant='outline'
									onClick={onClose}
								>
									Close
								</Button>
								<Button
									color='primary'
									onClick={onClose}
								>
									Action
								</Button>
							</ModalFooter> */}
						</React.Fragment>
					)}
				</ModalContent>
			</Modal>
		</React.Fragment>
	)
}

export default RegisterModal
