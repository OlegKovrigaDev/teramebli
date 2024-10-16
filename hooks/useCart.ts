import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateQuantity } from "@/store/cartSlice";
import { CartItem } from "@/types/cart";
import { RootState } from "@/store";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const addItemToCart = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  const removeItemFromCart = (offerId: string) => {
    dispatch(removeFromCart(offerId));
  };

  const updateItemQuantity = (offerId: string, quantity: number) => {
    dispatch(updateQuantity({ offerId, quantity }));
  };

  return {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
  };
};
