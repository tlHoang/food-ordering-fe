import { CartItem } from "@/pages/DetailPage";
import { Restaurant, Promotion } from "@/types";
import { CardContent, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
  selectedPromotion: Promotion | null;
  openModal: () => void;
  cancelPromotion: () => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart, selectedPromotion, openModal, cancelPromotion }: Props) => {
  const getTotalCost = () => {
    const total = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const discount = selectedPromotion
      ? selectedPromotion.discountType === "flat"
        ? selectedPromotion.discountAmount
        : (total * selectedPromotion.discountAmount) / 100
      : 0;

    const totalWithDelivery = total + restaurant.deliveryPrice - discount;

    return totalWithDelivery.toLocaleString();
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Đơn của bạn</span>
          <span>{getTotalCost()} ₫</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between" key={item._id}>
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              {(item.price * item.quantity).toLocaleString()} ₫
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Cước phí</span>
          <span>{restaurant.deliveryPrice.toLocaleString()} ₫</span>
        </div>
        {selectedPromotion && (
          <>
            <Separator />
            <div className="flex justify-between">
              <span>Khuyến mãi</span>
              <span>
                {selectedPromotion.discountType === "flat"
                  ? `${selectedPromotion.discountAmount.toLocaleString()} ₫`
                  : `${selectedPromotion.discountAmount}%`}
              </span>
            </div>
            <button className="mt-2 p-2 bg-red-500 text-white rounded" onClick={cancelPromotion}>
              Huỷ
            </button>
          </>
        )}
        <Separator />
      </CardContent>
      <CardFooter>
        <button className="flex-1 mt-4 p-2 bg-blue-500 text-white rounded" onClick={openModal}>
          Voucher
        </button>
      </CardFooter>
    </>
  );
};

export default OrderSummary;