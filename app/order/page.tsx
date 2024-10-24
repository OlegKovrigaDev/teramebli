'use client'

import { CartProduct } from '@/components/shared/header/cart-product'
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
import { selectCartItems, selectCartTotal } from '@/store/selectors'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { map, string, z } from 'zod'
import { useSubmitOrder } from '@/hooks/useSubmitOrder'
import { render } from 'react-dom'
import { text } from 'stream/consumers'
import { delivery, payment } from '@/constants'

const formSchema = z.object({
	firstName: z.string().min(2).max(50),
	lastName: z.string().min(2).max(50),
	phone: z.string().min(10, 'Invalid phone number').max(15),
	email: z.string().email('Invalid email address'),
	city: z.string().min(2).max(50),
	street: z.string().min(2).max(100),
	house: z.string().min(1).max(10),
	apartment: z.string().optional(),
	comment: z.string().optional(),
	delivery: z.string().nonempty('Delivery method is required'),
	payment: z.string().nonempty('Payment method is required'),
})

const order = [
	{ label: 'Введіть своє ім’я', placeholder: 'Ім’я', name: 'firstName' },
	{ label: 'Введіть своє прізвище', placeholder: 'Прізвище', name: 'lastName' },
	{ label: 'Введіть свій номер телефона', placeholder: '+380', name: 'phone' },
	{
		label: 'Введіть свою електорнну пошту',
		placeholder: 'tera_mebly@gmail.com',
		name: 'email',
	},
	{ label: 'Населений пункт', placeholder: 'Одеса', name: 'city' },
	{ label: 'Вулиця', placeholder: 'вул.Любомирська', name: 'street' },
	{ label: 'Будинок', placeholder: '163', name: 'house' },
	{ label: 'Квартира/ Офіс', placeholder: '23', name: 'apartment' },
]

export default function Order() {
	const cartItems = useSelector(selectCartItems)
	const cartTotal = useSelector(selectCartTotal)

	const { submit, isSubmitting, isError, error, isSuccess } = useSubmitOrder(
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
		await submit(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex justify-between'
			>
				<div className='w-[630px] flex flex-col gap-8'>
					<div className='bg-white flex justify-between py-4 px-2'>
						<div className='w-[296px]'>
							{order.slice(0, 4).map((item, index) => (
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
						<div className='w-[296px]'>
							{order.slice(4, 6).map((item, index) => (
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
								{order.slice(6, 8).map((item, index) => (
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

					<div className='bg-white flex justify-between py-4 px-2'>
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
												{[
													{ text: 'Доставка по місту', value: 'val1' },
													{ text: 'Самовивіз із магазину', value: 'val2' },
													{ text: 'Нова пошта', value: 'val3' },
													{ text: 'Meest', value: 'val4' },
												].map(({ text, value }, i) => (
													<FormItem className='flex items-center space-x-3 space-y-0'>
														<FormControl>
															<RadioGroupItem
																value={value}
																className='size-6'
															/>
														</FormControl>
														<FormLabel className='font-semibold text-4.5'>
															{text}
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
												{[
													{ text: 'Готівка', value: 'val1' },
													{ text: 'Платіжна картка', value: 'val2' },
													{ text: 'Безготівковий розрахунок', value: 'val3' },
													{ text: 'Кредит/Розсрочка', value: 'val4' },
												].map(({ text, value }, i) => (
													<FormItem className='flex items-center space-x-3 space-y-0'>
														<FormControl>
															<RadioGroupItem
																value={value}
																className='size-6'
															/>
														</FormControl>
														<FormLabel className='font-semibold text-4.5'>
															{text}
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
						<div className='grid w-full gap-1.5'>
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
					</div>
				</div>

				<div className='bg-white w-[630px] py-4 px-2'>
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
						<div className='flex justify-between mb-8'>
							<p className='text-2xl font-bold'>Всього: {cartTotal} грн.</p>
							<div className='flex gap-2'>
								<Button
									type='submit'
									className='bg-gray rounded-xl'
									disabled={isSubmitting}
								>
									{isSubmitting ? 'Submitting...' : 'Оформити замовлення'}
								</Button>
							</div>
						</div>
					</div>
					{isError && <p className='text-red-500'>Error:</p>}
				</div>
			</form>
		</Form>
	)
}
