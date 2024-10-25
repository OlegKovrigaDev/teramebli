import { useState } from 'react'
import { useSubmitOrderMutation } from '@/api/categoryApi'
import { useDispatch } from 'react-redux'
import { clearCart } from '@/store/cartSlice'
import { CartItem, OrderFormData } from '@/types/cart'

export const useSubmitOrder = (cartItems: CartItem[], total: number) => {
	const [submitOrder, { isError, isSuccess, error }] = useSubmitOrderMutation()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [notification, setNotification] = useState<{
		message: string
		type: 'success' | 'error'
	} | null>(null)
	const dispatch = useDispatch()

	const submit = async (form: OrderFormData, resetForm: () => void) => {
		setIsSubmitting(true)
		try {
			await submitOrder({ form, cartItems, total }).unwrap()
			dispatch(clearCart())
			resetForm()
			setNotification({
				message: 'Order submitted successfully!',
				type: 'success',
			})
		} catch (e) {
			setNotification({
				message:
					'Error submitting order: ' +
					((e as Error).message || 'Unknown error'),
				type: 'error',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	const closeNotification = () => setNotification(null)

	return {
		isSubmitting,
		isSuccess,
		isError,
		error,
		submit,
		notification,
		closeNotification,
	}
}
