export interface CartItem {
  offerId: string;
  ModelName: string;
  Articul: string;
  RetailPrice?: number;
  RetailPriceWithDiscount?: number;
  currencyId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface ProductItem {
  img?: string;
  title?: string;
  oldPrice?: number | string;
  newPrice?: number | string;
  Articul?: number | string;
}