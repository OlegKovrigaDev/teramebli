import { z } from 'zod'

const minLengthMessage = 'Минимум 2 символа'
const phoneLengthMessage = 'Минимум 10 символов'

export const formSchema = z.object({
	firstName: z.string().min(2, minLengthMessage).max(50),
	lastName: z.string().min(2, minLengthMessage).max(50),
	phone: z.string().min(10, phoneLengthMessage).max(15),
	email: z.string().email(),
	city: z.string().min(2, minLengthMessage).max(50),
	street: z.string().min(2, minLengthMessage).max(100),
	house: z.string().min(1, 'Минимум 1 символ').max(10),
	apartment: z.string().optional(),
	comment: z.string().optional(),
	delivery: z.string().nonempty('Оберіть спосіб доставки'),
	payment: z.string().nonempty('Оберіть спосіб оплати'),
})
