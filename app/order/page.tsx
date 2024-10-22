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
import { Label } from '@radix-ui/react-dropdown-menu'
import { z } from 'zod'

const formSchema = z.object({
	username: z.string().min(2).max(50),
})

const order = [
	{ label: 'Введіть своє ім’я', placeholder: 'Ім’я' },
	{ label: 'Введіть своє прізвище', placeholder: 'Прізвище' },
	{ label: 'Введіть свій номер телефона', placeholder: '+380' },
	{
		label: 'Введіть свою електорнну пошту',
		placeholder: 'tera_mebly@gmail.com',
	},
	{ label: 'Населений пункт', placeholder: 'Одеса' },
	{ label: 'Вулиця', placeholder: 'вул.Любомирська' },
	{ label: 'Будинок', placeholder: '163' },
	{ label: 'Квартира/ Офіс', placeholder: '23' },
]

export default function Order() {
	const cartItems = useSelector(selectCartItems)
	const cartTotal = useSelector(selectCartTotal)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}
	return (
		<div className='flex justify-between'>
			<Form {...form}>
				<div className='w-[630px]'>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<div className='bg-white flex justify-between py-4 px-2'>
							<div className='w-[296px]'>
								{order.slice(0, 4).map((item, index) => (
									<FormField
										key={index}
										control={form.control}
										name='username'
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
										name='username'
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
											name='username'
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
											<FormLabel className='text-xl font-bold'>
												Оплата
											</FormLabel>
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
								<Label htmlFor='message' className='text-xs font-semibold'>
									Залиште коментар до вашого замовлення
								</Label>
								<Textarea
									placeholder='Коментар'
									id='message'
									className='bg-bg font-medium text-gray min-h-28'
								/>
							</div>
						</div>
					</form>
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
								<Button type='submit' className='bg-gray rounded-xl'>
									Оформити замовлення
								</Button>
							</div>
						</div>
					</div>
				</div>
			</Form>
		</div>
	)
}
