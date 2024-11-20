import { useGetMyOrders } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OrderStatusPage = () => {
  const { orders, isLoading } = useGetMyOrders();

  if (isLoading) {
    return <div></div>
  }

  if (!orders || orders.length === 0) {
    return "Không có đơn";
  }

  // Filter orders based on their status
  const activeOrders = orders.filter(order => order.status !== "delivered" && order.status !== "placed");
  const doneOrders = orders.filter(order => order.status === "delivered");

  return (
    <>
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Đang xử lý</TabsTrigger>
          <TabsTrigger value="done">Đã giao</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="space-y-10">
            {activeOrders.map((order) => (
              <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
                <OrderStatusHeader order={order} />
                <div className="grid gap-10 md:grid-cols-2">
                  <OrderStatusDetail order={order} />
                  <AspectRatio ratio={16 / 5}>
                    <img
                      src={order.restaurant.imageUrl}
                      className="rounded-md object-cover h-full w-full"
                    />
                  </AspectRatio>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="done">
          <div className="space-y-10">
            {doneOrders.map((order) => (
              <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
                <OrderStatusHeader order={order} />
                <div className="grid gap-10 md:grid-cols-2">
                  <OrderStatusDetail order={order} />
                  <AspectRatio ratio={16 / 5}>
                    <img
                      src={order.restaurant.imageUrl}
                      className="rounded-md object-cover h-full w-full"
                    />
                  </AspectRatio>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default OrderStatusPage;