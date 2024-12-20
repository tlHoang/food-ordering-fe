export type User = {
  _id: string;
  email: string;
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type MenuItem = {
  _id: string;
  name: string;
  price: number;
};

export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
  imageUrl: string;
  lastUpdated: string;
};

export type OrderStatus =
  | "placed"
  | "paid"
  | "inProgress"
  | "outForDelivery"
  | "delivered";

export type Order = {
  _id: string;
  restaurant: Restaurant;
  user: User;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  restaurantId: string;
};

export type RestaurantSearchResponse = {
  data: Restaurant[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type Review = {
  _id: string;
  user: string;
  restaurant: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  lastUpdated: string;
};

export type DiscountType = "percentage" | "flat";

export type PostPromotion = {
  name: string;
  discountType: string;
  discountAmount: number;
  description: string;
  dateStart: string;
  dateEnd: string;
  numLimit: number;
  isActive: boolean;
};

export type Promotion = {
  _id: string;
  name: string;
  discountType: DiscountType;
  discountAmount: number;
  description: string;
  dateStart: string;
  dateEnd: string;
  numLimit: number;
  numUsed: number;
  isActive: boolean;
};
