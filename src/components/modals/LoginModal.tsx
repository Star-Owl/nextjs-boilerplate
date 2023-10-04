'use client'

import * as React from 'react'
import { toast } from '@/hooks/use-toast'
import { Button } from '../ui/button'
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
} from '../ui/form'
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from '@nextui-org/modal'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useDisclosure } from '@nextui-org/react'

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
	const { deviceType, os, browser } = useDeviceAndBrowser()
	const [windowWidth, setWindowWidth] = React.useState(0)
	console.log(windowWidth)

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

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	})

	const toastTest = () => {
		toast({
			title: 'You submitted the following values:',
			description: (
				<pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
					<code className='text-white'>
						Friday, February 10, 2023 at 5:57 PM
					</code>
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
				variant={'outline'}
				size={windowWidth <= 1280 ? 'lg-icon' : 'lg'}
			>
				{windowWidth <= 1280 ? <OutlineEdit size={28} /> : 'Login'}
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
															{/* <Button
														disabled
														variant={'outline'}
														className='h-fit !ring-default-400'
														size={'default-icon'}
													>
														<OutlineUser
															size={24}
														/>
													</Button> */}
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
											<div className='flex justify-between px-1 py-2'>
												<Checkbox radius='sm'>
													Remember me
												</Checkbox>
												<Link
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
							</ModalBody>
							<ModalFooter className='justify-center'>
								<Link href={'#'}>Create an account</Link>
								{/* <Button
									size={'xs'}
									asChild
									variant={'link'}
								>
									<Link href={'#'}>Create an account</Link>
								</Button> */}
								{/* <Button
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
								</Button> */}
							</ModalFooter>
						</React.Fragment>
					)}
				</ModalContent>
			</Modal>
		</React.Fragment>
		// <Modal.Dialog
		// 	open={open}
		// 	onOpenChange={onOpenChange}
		// >
		// 	<Modal.Trigger asChild>
		// 		<Button
		// 			variant={'outline'}
		// 			size={
		// 				deviceType === 'tablet' && window.innerWidth < 1366
		// 					? 'lg-icon'
		// 					: 'lg'
		// 			}
		// 		>
		// 			{deviceType === 'tablet' && window.innerWidth < 1366 ? (
		// 				<OutlineEdit size={28} />
		// 			) : (
		// 				'Login'
		// 			)}
		// 		</Button>
		// 	</Modal.Trigger>
		// 	<Modal.Portal>
		// 		<Modal.Overlay className='DialogOverlay fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-[12px]' />
		// 		<Modal.Content className='DialogContent fixed left-1/2 top-1/2 z-40 max-h-[85vh] w-[90vw] max-w-xl -translate-x-2/4 -translate-y-2/4 rounded-2xl bg-primary-dark px-6 pb-6 pt-6 shadow-xl focus:outline-none'>
		// 			<header className='mb-10 flex w-full items-center justify-between'>
		// 				<Modal.Title className='text-xl'>Login</Modal.Title>
		// 				<Modal.Close asChild>
		// 					<Button
		// 						aria-label='Close'
		// 						variant={'ghost'}
		// 						size={'sm-icon'}
		// 					>
		// 						<Close size={24} />
		// 					</Button>
		// 				</Modal.Close>
		// 			</header>
		// 			{/* <DialogPrimitive.Description className="DialogDescription">
		// 				Make a Hoot
		// 			</DialogPrimitive.Description> */}

		// 			<main className='flex flex-col gap-4'>
		// 				<Form {...form}>
		// 					<form
		// 						onSubmit={form.handleSubmit(onSubmit)}
		// 						className='space-y-6'
		// 					>
		// 						<FormField
		// 							control={form.control}
		// 							name='email'
		// 							render={({ field }) => (
		// 								<FormItem>
		// 									{/* <FormLabel>Username</FormLabel> */}
		// 									<FormControl>
		// 										<div className='items-top flex gap-4'>
		// 											{/* <Button
		// 												disabled
		// 												variant={'outline'}
		// 												className='h-fit !ring-default-400'
		// 												size={'default-icon'}
		// 											>
		// 												<OutlineUser
		// 													size={24}
		// 												/>
		// 											</Button> */}
		// 											<Input
		// 												//isClearable
		// 												type='email'
		// 												label='Email'
		// 												variant='bordered'
		// 												{...field}
		// 												//placeholder='Enter your email'
		// 												//defaultValue='junior@nextui.org'
		// 												//description="We'll never share your email with anyone else."
		// 												// onClear={() =>
		// 												// 	console.log(
		// 												// 		'input cleared',
		// 												// 	)
		// 												// }
		// 												//className='max-w-xs'
		// 											/>
		// 										</div>
		// 									</FormControl>
		// 									{/* <FormDescription>
		// 										This is your public display
		// 										name.
		// 									</FormDescription> */}
		// 									<FormMessage className='text-danger' />
		// 								</FormItem>
		// 							)}
		// 						/>
		// 						<FormField
		// 							control={form.control}
		// 							name='password'
		// 							render={({ field }) => (
		// 								<FormItem>
		// 									{/* <FormLabel>Username</FormLabel> */}
		// 									<FormControl>
		// 										<div className='flex items-center gap-4'>
		// 											{/* <Button
		// 												disabled
		// 												variant={'outline'}
		// 												className='!ring-default-400'
		// 												size={'default-icon'}
		// 											>
		// 												<OutlineBell
		// 													size={24}
		// 												/>
		// 											</Button> */}

		// 											<Input
		// 												label='Password'
		// 												variant='bordered'
		// 												{...field}
		// 												//placeholder='Enter your password'
		// 												// startContent={
		// 												// 	<OutlineUser
		// 												// 		size={24}
		// 												// 	/>
		// 												// }
		// 												endContent={
		// 													<button
		// 														className='focus:outline-none'
		// 														type='button'
		// 														onClick={
		// 															toggleVisibility
		// 														}
		// 													>
		// 														{isVisible ? (
		// 															<OutlineEye
		// 																size={
		// 																	24
		// 																}
		// 																className='pointer-events-none text-2xl text-default-400'
		// 															/>
		// 														) : (
		// 															<OutlineEyeOff
		// 																size={
		// 																	24
		// 																}
		// 																className='pointer-events-none text-2xl text-default-400'
		// 															/>
		// 														)}
		// 													</button>
		// 												}
		// 												type={
		// 													isVisible
		// 														? 'text'
		// 														: 'password'
		// 												}
		// 												//className='max-w-xs'
		// 											/>
		// 										</div>
		// 									</FormControl>
		// 									{/* <FormDescription>
		// 										This is your public display
		// 										name.
		// 									</FormDescription> */}
		// 									<FormMessage />
		// 								</FormItem>
		// 							)}
		// 						/>
		// 						<div className='flex flex-col space-y-6'>
		// 							<Checkbox radius='sm'>Remember me</Checkbox>
		// 							<Button type='submit'>Login</Button>
		// 						</div>
		// 					</form>
		// 				</Form>
		// 			</main>

		// 			<footer className='mt-4 text-center text-neutral-400'>
		// 				<Button
		// 					size={'xs'}
		// 					className='
		// 							cursor-pointer
		// 							text-white
		// 							hover:underline
		// 						'
		// 					variant={'link'}
		// 				>
		// 					Create an account
		// 				</Button>
		// 			</footer>
		// 		</Modal.Content>
		// 	</Modal.Portal>
		// </Modal.Dialog>
	)
}

export default LoginModal
