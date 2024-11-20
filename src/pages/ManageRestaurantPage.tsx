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
import { useEffect, useState } from "react";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { orders } = useGetMyRestaurantOrders();
  const [orderTab, setOrderTab] = useState<Order[] | undefined>(undefined);
  const [doneOrderTab, setDoneOrderTab] = useState<Order[] | undefined>(undefined);
  useEffect(() => {
    setOrderTab(orders?.filter(order => order.status !== "placed" && order.status !== "delivered"));
    setDoneOrderTab(orders?.filter(order => order.status === "delivered"));
  }, [orders]);

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
    <Tabs defaultValue="orders">
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
  );
};

export default ManageRestaurantPage;