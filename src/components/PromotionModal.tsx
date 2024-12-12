import React from "react";
import { Promotion } from "@/types";

type PromotionModalProps = {
  promotions: Promotion[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPromotion: (promotion: Promotion) => void;
};

const PromotionModal: React.FC<PromotionModalProps> = ({ promotions, isOpen, onClose, onSelectPromotion }) => {
  if (!isOpen) return null;

  const currentDate = new Date();

  const activePromotions = promotions.filter((promotion) => {
    const startDate = new Date(promotion.dateStart);
    const endDate = new Date(promotion.dateEnd);
    return startDate <= currentDate && endDate >= currentDate;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Chọn voucher</h2>
        <ul>
          {activePromotions.map((promotion) => (
            <li key={promotion._id} className="mb-2">
              <button
                className="w-full text-left p-2 border rounded hover:bg-gray-100"
                onClick={() => onSelectPromotion(promotion)}
              >
                <h3 className="text-lg font-semibold">{promotion.name}</h3>
                <p>{promotion.description}</p>
                <p>Discount: {promotion.discountType === "flat" ? `${promotion.discountAmount} ₫` : `${promotion.discountAmount}%`}</p>
                <p>Start Date: {new Date(promotion.dateStart).toLocaleDateString("en-GB")}</p>
                <p>End Date: {new Date(promotion.dateEnd).toLocaleDateString("en-GB")}</p>
              </button>
            </li>
          ))}
        </ul>
        <button className="mt-4 p-2 bg-red-500 text-white rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default PromotionModal;