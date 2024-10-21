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
} from '@/components/ui'
import { selectCartItems, selectCartTotal } from '@/store/selectors'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { zodResolver } from '@hookform/resolvers/zod'
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
								<FormField
									control={form.control}
									name='username'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs font-semibold'>
												{order[0].label}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={order[0].placeholder}
													className='placeholder:font-medium placeholder:text-gray'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='username'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs font-semibold'>
												{order[1].label}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={order[1].placeholder}
													className='placeholder:font-medium placeholder:text-gray'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='username'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs font-semibold'>
												{order[2].label}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={order[2].placeholder}
													className='placeholder:font-medium placeholder:text-gray'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='username'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs font-semibold'>
												{order[3].label}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={order[3].placeholder}
													className='placeholder:font-medium placeholder:text-gray'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='w-[296px]'>
								<FormField
									control={form.control}
									name='username'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs font-semibold'>
												{order[4].label}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={order[4].placeholder}
													className='placeholder:font-medium placeholder:text-gray'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='username'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='text-xs font-semibold'>
												{order[5].label}
											</FormLabel>
											<FormControl>
												<Input
													placeholder={order[5].placeholder}
													className='placeholder:font-medium placeholder:text-gray'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='flex gap-4'>
									<FormField
										control={form.control}
										name='username'
										render={({ field }) => (
											<FormItem>
												<FormLabel className='text-xs font-semibold'>
													{order[6].label}
												</FormLabel>
												<FormControl>
													<Input
														placeholder={order[6].placeholder}
														className='placeholder:font-medium placeholder:text-gray'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name='username'
										render={({ field }) => (
											<FormItem>
												<FormLabel className='text-xs font-semibold'>
													{order[7].label}
												</FormLabel>
												<FormControl>
													<Input
														placeholder={order[7].placeholder}
														className='placeholder:font-medium placeholder:text-gray'
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
