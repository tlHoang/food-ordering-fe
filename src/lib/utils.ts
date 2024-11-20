import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeVietnameseAccents(str: string): string {
  return str
    .normalize("NFD") // Chuyển ký tự sang dạng tổ hợp
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu tổ hợp
    .replace(/đ/g, "d") // Thay "đ" thành "d"
    .replace(/Đ/g, "D"); // Thay "Đ" thành "D"
}