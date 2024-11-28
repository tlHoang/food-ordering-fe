import { useGetMyRestaurantOrders } from "@/api/MyRestaurantApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MenuItem } from "@/types";
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const { orders, isLoading: ordersLoading } = useGetMyRestaurantOrders();

  if (ordersLoading) {
    return <div></div>;
  }

  const doneOrders = orders?.filter(order => order.status === "delivered");
  const inProgressOrders = orders?.filter(order => order.status !== "delivered");

  const doneRevenue = doneOrders?.reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0);
  const inProgressRevenue = inProgressOrders?.reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0);

  const productSales: { [key: string]: { item: MenuItem; quantity: number } } = {};
  const customerOrders: { [key: string]: { name: string; totalOrders: number; totalSpent: number } } = {};

  orders?.forEach(order => {
    order.cartItems.forEach(cartItem => {
      if (!productSales[cartItem.menuItemId]) {
        productSales[cartItem.menuItemId] = {
          item: {
            _id: cartItem.menuItemId,
            name: cartItem.name,
            price: 0,
          },
          quantity: 0,
        };
      }
      productSales[cartItem.menuItemId].quantity += Number(cartItem.quantity);
    });

    if (!customerOrders[order.user._id]) {
      customerOrders[order.user._id] = {
        name: order.user.name,
        totalOrders: 0,
        totalSpent: 0,
      };
    }
    customerOrders[order.user._id].totalOrders += 1;
    customerOrders[order.user._id].totalSpent += Number(order.totalAmount) || 0;
  });

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const topCustomers = Object.values(customerOrders)
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5);

  const orderStatusSummary = {
    placed: orders?.filter(order => order.status === "placed").length || 0,
    paid: orders?.filter(order => order.status === "paid").length || 0,
    inProgress: orders?.filter(order => order.status === "inProgress").length || 0,
    outForDelivery: orders?.filter(order => order.status === "outForDelivery").length || 0,
    delivered: orders?.filter(order => order.status === "delivered").length || 0,
  };

  const revenueData = {
    labels: orders?.map(order => new Date(order.createdAt).toLocaleDateString()) || [],
    datasets: [
      {
        label: 'Doanh thu (₫)',
        data: orders?.map(order => order.totalAmount) || [],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const customersPerDay: { [key: string]: number } = {};
  orders?.forEach(order => {
    const date = new Date(order.createdAt).toLocaleDateString();
    if (!customersPerDay[date]) {
      customersPerDay[date] = 0;
    }
    customersPerDay[date] += 1;
  });

  const customerData = {
    labels: Object.keys(customersPerDay),
    datasets: [
      {
        label: 'Khách hàng (người)',
        data: Object.values(customersPerDay),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const totalCustomers = Object.keys(customerOrders).length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Tổng số đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders?.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu đã hoàn thành</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doneRevenue?.toLocaleString()} ₫</div>
          </CardContent>
        </Card>
        <Card className="row-span-2">
          <CardHeader>
            <CardTitle>Trạng thái đơn hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {Object.entries(orderStatusSummary).map(([status, count]) => (
                <li key={status} className="text-lg">
                  {(() => {
                    switch (status) {
                      case 'placed':
                        return 'Đã huỷ';
                      case 'paid':
                        return 'Đã thanh toán';
                      case 'inProgress':
                        return 'Đang xử lý';
                      case 'outForDelivery':
                        return 'Đang giao';
                      case 'delivered':
                        return 'Đã giao';
                      default:
                        return 'Trạng thái không xác định';
                    }
                  })()}: {count}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tổng số khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Doanh thu đang xử lý</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressRevenue?.toLocaleString()} ₫</div>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Những sản phẩm phổ biến</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {topProducts.map(product => (
                <li key={product.item._id} className="text-lg">
                  {product.item.name} ({product.quantity} đã bán)
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Khách hàng quen thuộc</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {topCustomers.map(customer => (
                <li key={customer.name} className="text-lg">
                  {customer.name} ({customer.totalOrders} đơn, đã chi {customer.totalSpent.toLocaleString()} ₫)
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="row-span-2">
          <CardHeader>
            <CardTitle>Doanh thu theo ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={revenueData} />
          </CardContent>
        </Card>
        <Card className="row-span-2">
          <CardHeader>
            <CardTitle>Khách hàng theo ngày</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={customerData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;