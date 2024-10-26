export interface CartItem {
	offerId: string
	ModelName?: string
	Articul: string
	RetailPrice?: number | string
	RetailPriceWithDiscount?: number | string
	currencyId: string
	quantity: number
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
