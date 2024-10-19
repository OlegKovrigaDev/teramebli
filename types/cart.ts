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
