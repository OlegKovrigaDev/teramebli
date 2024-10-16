import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { header } from "@/constants";
import { ShoppingCart } from "lucide-react";
import { CartProduct } from "./cart-product";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "@/store/selectors";

export const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <Dialog>
      <DialogTrigger className="cart-trigger">
        <ShoppingCart />
        <span className="text">{header[1].text}</span>
      </DialogTrigger>
      <DialogContent className="min-w-[800px] p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Кошик</DialogTitle>
        </DialogHeader>
        <div className="mb-10">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartProduct key={item.offerId} product={item} />
            ))
          ) : (
            <p>Кошик порожній</p>
          )}
        </div>
        <DialogFooter>
          <div className="flex flex-col w-full">
            <div className="flex justify-between mb-8">
              <p className="text-2xl font-bold">Всього: {cartTotal} грн.</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-2 border-gray rounded-xl text-gray"
                >
                  Продовжити покупки
                </Button>
                <Button className="bg-gray rounded-xl">
                  Оформити замовлення
                </Button>
              </div>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
