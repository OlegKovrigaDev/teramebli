'use client'
import Notification from '@/components/notification'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSubmitOrder } from '@/hooks/useSubmitOrder'
import { selectCartItems, selectCartTotal } from '@/store/selectors'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { z } from 'zod'
import { formSchema } from '../order/formSchema'

export const CartForm = () => {
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
			phone: '',
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await submit(values, form.reset)
		console.log(values)
	}

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='flex items-end justify-between w-full'
				>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-xs font-semibold'>
									Введіть своє ім’я
								</FormLabel>
								<FormControl>
									<Input
										placeholder='Ім’я'
										className='w-[270px] font-medium'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-xs font-semibold'>
									Введіть свій номер телефону
								</FormLabel>
								<FormControl>
									<Input
										placeholder='+380'
										className='w-[270px] font-medium'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={cartItems.length === 0}
						className='bg-gray rounded-xl'
						type='submit'
					>
						Купити в 1 клік
					</Button>
				</form>
			</Form>

			{notification && (
				<Notification
					message={notification.message}
					type={notification.type}
					onClose={closeNotification}
				/>
			)}
		</div>
	)
}
