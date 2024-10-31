export interface CartItem {
	offerId: string
	currencyId: string
	quantity: number
	[key: string]: any
}

export interface CartState {
	items: CartItem[]
}

export interface OrderFormData {
	firstName: string
	lastName: string
	phone: string
	email: string
	city: string
	street: string
	house: string
	apartment?: string
	comment?: string
	delivery: string
	payment: string
}
