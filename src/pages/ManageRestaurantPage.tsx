import { useState, useEffect } from "react";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-from/ManageRestaurantForm";
import { Order } from "@/types";
import SearchBar from "@/components/OrderSearchBar";
import { removeVietnameseAccents } from "@/lib/utils";

// const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
//   const [query, setQuery] = useState("");

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//     onSearch(e.target.value);
//   };

//   return (
//     <input
//       type="text"
//       placeholder="Search by customer name"
//       value={query}
//       onChange={handleInputChange}
//     />
//   );
// };

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { orders } = useGetMyRestaurantOrders();
  const [orderTab, setOrderTab] = useState<Order[] | undefined>(undefined);
  const [doneOrderTab, setDoneOrderTab] = useState<Order[] | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    const filteredOrders = orders?.filter(order =>
      removeVietnameseAccents(order.deliveryDetails.name)
        .toLowerCase()
        .includes(removeVietnameseAccents(searchQuery).toLowerCase())
    );
    setOrderTab(filteredOrders?.filter(order => order.status !== "placed" && order.status !== "delivered"));
    setDoneOrderTab(filteredOrders?.filter(order => order.status === "delivered"));
  }, [orders, searchQuery]);

  const handleStatusUpdate = (updatedOrder: Order) => {
    setOrderTab((prevOrders) =>
      prevOrders
        ?.filter(order => order._id !== updatedOrder._id && order.status !== "delivered")
        .concat(updatedOrder.status !== "placed" && updatedOrder.status !== "delivered" ? [updatedOrder] : [])
    );
    setDoneOrderTab((prevOrders) =>
      prevOrders
        ?.filter(order => order._id !== updatedOrder._id)
        .concat(updatedOrder.status === "delivered" ? [updatedOrder] : [])
    );
  };

  const isEditing = !!restaurant;

  return (
    <div>
      {activeTab !== "manage-restaurant" && <SearchBar onSearch={setSearchQuery} />}
      <Tabs defaultValue="orders" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
          <TabsTrigger value="done-orders">Đơn hàng đã hoàn thành</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Nhà hàng</TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders"
          className="space-y-5 bg-gray-50 p-10 rounded-lg"
        >
          <h2 className="text-2xl font-bold">{orderTab?.length} đơn hàng</h2>
          {orderTab?.map((order) => (
            <OrderItemCard order={order} onStatusUpdate={handleStatusUpdate} />
          ))}
        </TabsContent>
        <TabsContent
          value="done-orders"
          className="space-y-5 bg-gray-50 p-10 rounded-lg"
        >
          <h2 className="text-2xl font-bold">{doneOrderTab?.length} đơn hàng đã hoàn thành</h2>
          {doneOrderTab?.map((order) => (
            <OrderItemCard order={order} onStatusUpdate={handleStatusUpdate} />
          ))}
        </TabsContent>
        <TabsContent value="manage-restaurant">
          <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageRestaurantPage;