import { useState } from 'react'
import { clearCart } from '@/store/cartSlice'
import { useDispatch } from 'react-redux'

const BASE_URL = 'https://teramebli-api.onrender.com/api'

interface FormData {
	name: string
	phone: string
	email: string
	Articul: string
	RetailPrice: number
	RetailPriceWithDiscount: number
	ModelName: string
}

export const useSubmitOrder = (cartItems: any[], total: number) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitSuccess, setSubmitSuccess] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)
	const dispatch = useDispatch()

	const submitOrder = async (form: FormData) => {
		setIsSubmitting(true)
		setSubmitError(null)

		try {
			const response = await fetch(`${BASE_URL}/order`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					customer: form,
					items: cartItems,
					total,
				}),
			})

			if (!response.ok) {
				throw new Error('Ошибка при оформлении заказа')
			}

			setSubmitSuccess(true)
			dispatch(clearCart())
		} catch (error: any) {
			setSubmitError(error.message || 'Неизвестная ошибка')
		} finally {
			setIsSubmitting(false)
		}
	}

	return { isSubmitting, submitSuccess, submitError, submitOrder }
}
