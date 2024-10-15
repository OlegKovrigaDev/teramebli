export interface CartItem {
  offerId: string;
  ModelName: string;
  Articul: string;
  RetailPrice: string;
  RetailPriceWithDiscount: string;
  currencyId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
