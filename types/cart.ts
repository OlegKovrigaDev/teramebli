

export interface CartItem {
  offerId: string;
  ModelName: string;
  Articul: string;
  RetailPrice: number; 
  RetailPriceWithDiscount?: number;
  currencyId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
