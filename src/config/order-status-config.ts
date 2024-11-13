import { OrderStatus } from "@/types";

type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "Đã đặt", value: "placed", progressValue: 0 },
  {
    label: "Đang chờ xác nhận của nhà hàng",
    value: "paid",
    progressValue: 25,
  },
  { label: "Đang tiến hành", value: "inProgress", progressValue: 50 },
  { label: "Đơn hàng đang giao hàng", value: "outForDelivery", progressValue: 75 },
  { label: "Đã giao hàng", value: "delivered", progressValue: 100 },
];