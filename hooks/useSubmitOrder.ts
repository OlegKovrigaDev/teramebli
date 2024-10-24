import { useState } from 'react'
import { useSubmitOrderMutation } from '@/api/categoryApi'
import { useDispatch } from 'react-redux'
import { clearCart } from '@/store/cartSlice'
import { CartItem, OrderFormData } from '@/types/cart'

export const useSubmitOrder = (cartItems: CartItem[], total: number) => {
	const [submitOrder, { isError, isSuccess, error }] = useSubmitOrderMutation()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const dispatch = useDispatch()

	const submit = async (form: OrderFormData) => {
		setIsSubmitting(true)
		try {
			await submitOrder({ form, cartItems, total }).unwrap()
			dispatch(clearCart())
		} catch (e) {
			'Error submitting order: ' + (e as Error).message || 'Unknown error'
		} finally {
			setIsSubmitting(false)
		}
	}

	return {
		isSubmitting,
		isSuccess,
		isError,
		error,
		submit,
	}
}
