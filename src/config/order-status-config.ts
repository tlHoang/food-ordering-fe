import { OrderStatus } from "@/types";

type OrderStatusInfo = {
  label: string;
  value: OrderStatus;
  progressValue: number;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "Đã huỷ", value: "placed", progressValue: 0 },
  {
    label: "Chờ nhà hàng xác nhận",
    value: "paid",
    progressValue: 25,
  },
  { label: "Đang chuẩn bị", value: "inProgress", progressValue: 50 },
  { label: "Đang giao", value: "outForDelivery", progressValue: 75 },
  { label: "Đã giao", value: "delivered", progressValue: 100 },
];