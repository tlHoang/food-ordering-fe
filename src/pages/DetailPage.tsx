import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType, Promotion } from "../types";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";
import Review from "@/components/Review";
import { useGetReviews } from "@/api/ReviewApi";
import { Star, StarHalf } from "lucide-react";
import { useGetPromotionsByRestaurant } from "@/api/PromotionApi";
import PromotionModal from "@/components/PromotionModal";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();
  const { data: reviews } = useGetReviews(restaurantId);
  const { data: promotions } = useGetPromotionsByRestaurant(restaurantId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelectPromotion = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    closeModal();
  };

  const handleCancelPromotion = () => {
    setSelectedPromotion(null);
  };

  const averageRating = reviews?.length
    ? (reviews.reduce((acc: any, review: any) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : "Chưa có đánh giá";

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
      promotionId: selectedPromotion?._id,
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  if (isLoading || !restaurant) {
    return "";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[2fr_4fr_2fr] gap-5 md:px-32">
        <div>
          <div className="text-xl font-bold flex items-center gap-2">
            Rating: {averageRating}
            {reviews?.length > 0 && (
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <span key={index}>
                      {ratingValue <= Math.floor(Number(averageRating)) ? (
                        <Star className="h-5 w-5 text-yellow-500" />
                      ) : ratingValue - 0.5 <= Number(averageRating) ? (
                        <StarHalf className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Star className="h-5 w-5 text-white" />
                      )}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <Review />
        </div>

        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        {/* <div className="mt-4">
          <h2 className="text-xl font-bold">Promotions</h2>
          {promotions?.map((promotion) => (
            <div key={promotion._id} className="p-4 border rounded-lg shadow-sm bg-white">
              <h3 className="text-lg font-semibold">{promotion.name}</h3>
              <p>{promotion.description}</p>
              <p>Discount: {promotion.discountType === "flat" ? `${promotion.discountAmount} ₫` : `${promotion.discountAmount}%`}</p>
              <p>Start Date: {new Date(promotion.dateStart).toLocaleDateString()}</p>
              <p>End Date: {new Date(promotion.dateEnd).toLocaleDateString()}</p>
            </div>
          ))}
        </div> */}

        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              selectedPromotion={selectedPromotion}
              openModal={openModal}
              cancelPromotion={handleCancelPromotion}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
      <PromotionModal
        promotions={promotions || []}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelectPromotion={handleSelectPromotion}
      />
    </div>
  );
};

export default DetailPage;