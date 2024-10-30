import { useState } from 'react'
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
	Input,
} from '@/components/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import { PopoverClose } from '@radix-ui/react-popover'
import { useAddProductReviewMutation } from '@/api/categoryApi'
import Notification from '@/components/notification'

const reviewSchema = z.object({
	name: z.string().min(2, "Ім'я повинно містити хоча б 2 символи"),
	reviewText: z.string().min(5, 'Відгук повинен містити хоча б 5 символів'),
})

interface ReviewPopoverProps {
	offerId: string
	refetchReviews: () => void
}

export function ReviewPopover({ offerId, refetchReviews }: ReviewPopoverProps) {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [notification, setNotification] = useState<{
		message: string
		type: 'success' | 'error'
	} | null>(null)

	const form = useForm({
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			name: '',
			reviewText: '',
		},
	})

	const [addReview] = useAddProductReviewMutation()

	const handleAddReview = async (values: z.infer<typeof reviewSchema>) => {
		setIsSubmitting(true)
		try {
			await addReview({
				name: values.name,
				review: values.reviewText,
				createdAt: new Date(),
				offerId,
			}).unwrap()
			form.reset()
			refetchReviews()

			setNotification({
				message: 'Ваш відгук успішно надіслано!',
				type: 'success',
			})
		} catch (error) {
			setNotification({
				message: 'Відгук не вдалося надіслати.',
				type: 'error',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleCloseNotification = () => {
		setNotification(null)
	}

	return (
		<>
			{notification && (
				<Notification
					message={notification.message}
					type={notification.type}
					onClose={handleCloseNotification}
				/>
			)}

			<Popover>
				<div className='flex justify-end'>
					<PopoverTrigger className='rounded-xl border-2 border-gray text-gray py-2 px-5 mb-6'>
						Залишити відгук
					</PopoverTrigger>
				</div>
				<PopoverContent className='w-80 p-4'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleAddReview)}
							className='space-y-4'
						>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-xs font-semibold'>
											Ваше ім'я
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Ваше ім'я"
												className='placeholder:font-medium placeholder:text-gray w-full p-2 border rounded'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='reviewText'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-xs font-semibold'>
											Ваш відгук
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Ваш відгук'
												className='placeholder:font-medium placeholder:text-gray w-full p-2 border rounded min-h-24'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex justify-end'>
								<PopoverClose
									type='submit'
									className='mt-2 rounded-[8px] px-4 py-2 bg-gray text-white'
									disabled={isSubmitting}
									aria-label='Close'
								>
									{isSubmitting ? 'Надсилання...' : 'Додати відгук'}
								</PopoverClose>
							</div>
						</form>
					</Form>
				</PopoverContent>
			</Popover>
		</>
	)
}
