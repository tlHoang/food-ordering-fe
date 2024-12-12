import { useState } from "react";
import { useCreatePromotion, useGetPromotions } from "@/api/PromotionApi";
import { Promotion } from "@/types";
import PromotionForm from "./PromotionForm";
import { Modal } from "@/components/Modal";
import { useUpdatePromotion } from "@/api/PromotionApi";
import { useQueryClient } from "react-query";

const PromotionList = () => {
  const queryClient = useQueryClient();
  const { data: promotions, isLoading, isError } = useGetPromotions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const { updatePromotion } = useUpdatePromotion();
  const { createPromotion } = useCreatePromotion();

  const handleOpenModal = (promotion?: Promotion) => {
    setSelectedPromotion(promotion || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPromotion(null);
  };

  const handleUpdatePromotion = async (promotion: Promotion, isCreate: boolean) => {
    if (isCreate) {
      await createPromotion(promotion);
    } else {
      await updatePromotion(promotion);
    }
    queryClient.invalidateQueries("promotions");
    handleCloseModal();
  };

  if (isLoading) {
    return <div></div>;
  }

  if (isError) {
    return <div>Failed to load promotions</div>;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <h2 className="text-2xl font-bold mb-4 ml-3">Khuyến mãi</h2>
        <button
          onClick={() => handleOpenModal()}
          className="md:ml-5 mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Thêm
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {promotions.map((promotion: Promotion) => (
          <div key={promotion._id} className="p-4 border rounded-lg shadow-sm bg-white">
            <h3 className="text-xl font-semibold mb-2">{promotion.name}</h3>
            <p className="text-gray-700 mb-1">{promotion.description}</p>
            <p className="text-gray-700 mb-1">Discount: {promotion.discountType === "flat" ? promotion.discountAmount.toLocaleString() : promotion.discountAmount}{promotion.discountType === "flat" ? " ₫" : "%"}</p>
            <p className="text-gray-700 mb-1">Ngày bắt đầu: {new Date(promotion.dateStart).toLocaleDateString("en-GB")}</p>
            <p className="text-gray-700 mb-1">Ngày kết thúc: {new Date(promotion.dateEnd).toLocaleDateString("en-GB")}</p>
            <p className="text-gray-700 mb-1">Giới hạn: {promotion.numLimit}</p>
            {/* <p className="text-gray-700 mb-1">Used: {promotion.numUsed}</p> */}
            <p className="text-gray-700">Trạng thái: {promotion.isActive ? "Hoạt động" : "Đã dừng"}</p>
            <button
              onClick={() => handleOpenModal(promotion)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Sửa
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <PromotionForm promotion={selectedPromotion} onClose={handleCloseModal} onSubmit={handleUpdatePromotion} />
        </Modal>
      )}
    </div>
  );
};

export default PromotionList;