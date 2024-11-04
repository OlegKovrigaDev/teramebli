'use client'

import Notification from '@/components/notification'
import { CartProduct } from '@/components/shared/header/cart-product'
import { formSchema } from '@/components/shared/order/formSchema'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	RadioGroup,
	RadioGroupItem,
} from '@/components/ui'
import { Textarea } from '@/components/ui/textarea'
import { orders, radioOptions } from '@/constants'
import { formatPrice } from '@/helpers'
import { useSubmitOrder } from '@/hooks/useSubmitOrder'
import { selectCartItems, selectCartTotal } from '@/store/selectors'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { z } from 'zod'

export default function Order() {
	const cartItems = useSelector(selectCartItems)
	const cartTotal = useSelector(selectCartTotal)

	const { submit, notification, closeNotification } = useSubmitOrder(
		cartItems,
		cartTotal
	)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			city: '',
			street: '',
			house: '',
			apartment: '',
			comment: '',
			delivery: '',
			payment: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
		await submit(values, form.reset)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-wrap justify-center xl:justify-between mb-16'
			>
				<div className='md:w-full xl:w-[630px] flex flex-col gap-8 order-2 md:order-1'>
					<div className='bg-white flex flex-wrap justify-between py-4 px-2'>
						<div className='w-full md:w-[296px]'>
							{orders.slice(0, 4).map((item, index) => (
								<FormField
									key={index}
									control={form.control}
									name={item.name as keyof z.infer<typeof formSchema>}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs font-semibold'>
												{item.label}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={item.placeholder}
													className='placeholder:font-medium placeholder:text-gray'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
						</div>
						<div className='w-full md:w-[296px]'>
							{orders.slice(4, 6).map((item, index) => (
								<FormField
									key={index}
									control={form.control}
									name={item.name as keyof z.infer<typeof formSchema>}
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs font-semibold'>
												{item.label}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={item.placeholder}
													className='placeholder:font-medium placeholder:text-gray'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							))}
							<div className='flex gap-4'>
								{orders.slice(6, 8).map((item, index) => (
									<FormField
										key={index}
										control={form.control}
										name={item.name as keyof z.infer<typeof formSchema>}
										render={({ field }) => (
											<FormItem>
												<FormLabel className='text-xs font-semibold'>
													{item.label}
												</FormLabel>
												<FormControl>
													<Input
														placeholder={item.placeholder}
														className='placeholder:font-medium placeholder:text-gray'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								))}
							</div>
						</div>
					</div>

					<div className='bg-white flex flex-wrap gap-4 justify-between py-4 px-2'>
						<div className='w-[296px]'>
							<FormField
								control={form.control}
								name='delivery'
								render={({ field }) => (
									<FormItem className='space-y-3'>
										<FormLabel className='text-xl font-bold'>
											Доставка
										</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className='flex flex-col space-y-1'
											>
												{radioOptions.delivery.map(({ label, value }) => (
													<FormItem
														key={value}
														className='flex items-center space-x-3'
													>
														<FormControl>
															<RadioGroupItem
																value={value}
																className='size-6'
															/>
														</FormControl>
														<FormLabel className='font-semibold text-4.5'>
															{label}
														</FormLabel>
													</FormItem>
												))}
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='w-[296px]'>
							<FormField
								control={form.control}
								name='payment'
								render={({ field }) => (
									<FormItem className='space-y-3'>
										<FormLabel className='text-xl font-bold'>Оплата</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className='flex flex-col space-y-1'
											>
												{radioOptions.payment.map(({ label, value }) => (
													<FormItem
														key={value}
														className='flex items-center space-x-3'
													>
														<FormControl>
															<RadioGroupItem
																value={value}
																className='size-6'
															/>
														</FormControl>
														<FormLabel className='font-semibold text-4.5'>
															{label}
														</FormLabel>
													</FormItem>
												))}
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className='bg-white flex flex-col justify-between py-4 px-2'>
						<p className='text-xl font-bold mb-6'>Коментар до замовлення</p>
						<div className='grid w-full gap-1.5 mb-2 md:mb-0'>
							<FormField
								control={form.control}
								name='comment'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-xs font-semibold'>
											Залиште коментар до вашого замовлення
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Коментар'
												className='bg-bg font-medium text-gray min-h-28'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button
							type='submit'
							className='block md:hidden w-full md:w-auto bg-gray rounded-xl'
						>
							Оформити замовлення
						</Button>
					</div>
				</div>

				<div className='bg-white w-full xl:w-[630px] py-4 px-2 order-1 md:order-2'>
					<h3 className='text-xl font-bold'>Ваше замовлення</h3>
					<div className='mb-10'>
						{cartItems.length > 0 ? (
							cartItems.map(item => (
								<CartProduct key={item.offerId} product={item} />
							))
						) : (
							<p>Кошик порожній</p>
						)}
					</div>
					<div className='flex flex-col w-full'>
						<div className='flex flex-wrap gap-4 justify-between md:mb-8'>
							<p className='text-2xl font-bold'>
								Всього: {formatPrice(cartTotal)} грн.
							</p>
							<Button
								type='submit'
								className='hidden md:block w-full md:w-auto bg-gray rounded-xl'
							>
								Оформити замовлення
							</Button>
						</div>
					</div>
					{notification && (
						<Notification
							message={notification.message}
							type={notification.type}
							onClose={closeNotification}
						/>
					)}
				</div>
			</form>
		</Form>
	)
}
