import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type PromotionFormProps = {
  promotion?: any;
  onClose: any;
  onSubmit: any;
};

const PromotionForm = ({ promotion, onClose, onSubmit }: PromotionFormProps) => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    discountAmount: 0,
    discountType: "flat",
    dateStart: "",
    dateEnd: "",
    numLimit: "",
    isActive: true,
  });

  useEffect(() => {
    if (promotion) {
      setFormState(promotion);
    }
  }, [promotion]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.discountAmount <= 0) {
      alert("Giá trị phải lớn hơn 0");
      return;
    }
    promotion ? onSubmit(formState, false) : onSubmit(formState, true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên khuyến mãi</label>
        <Input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
        <Textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="discountAmount" className="block text-sm font-medium text-gray-700">Giá trị giảm giá</label>
        <Input
          type="number"
          name="discountAmount"
          value={formState.discountAmount}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="discountType" className="block text-sm font-medium text-gray-700">Loại giảm giá</label>
        <select
          name="discountType"
          value={formState.discountType}
          onChange={(e) => setFormState((prev) => ({ ...prev, discountType: e.target.value }))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="flat">₫</option>
          <option value="percentage">%</option>
        </select>
      </div>
      <div>
        <label htmlFor="dateStart" className="block text-sm font-medium text-gray-700">Ngày bắt đầu</label>
        <Input
          type="date"
          name="dateStart"
          value={formState.dateStart}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="dateEnd" className="block text-sm font-medium text-gray-700">Ngày kết thúc</label>
        <Input
          type="date"
          name="dateEnd"
          value={formState.dateEnd}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="numLimit" className="block text-sm font-medium text-gray-700">Giới hạn số lượng</label>
        <Input
          type="number"
          name="numLimit"
          value={formState.numLimit}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      {promotion ? (
        <div>
          <label htmlFor="isActive" className="block text-sm font-medium text-gray-700">Kích hoạt</label>
          <input
            type="checkbox"
            name="isActive"
            checked={formState.isActive}
            onChange={(e) => setFormState((prev) => ({ ...prev, isActive: e.target.checked }))}
            className="mt-1 block"
          />
        </div>
      ) : null}

      <Button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
        {promotion ? "Cập nhật" : "Tạo mới"}
      </Button>
      <Button onClick={onClose} className="ml-4 mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">
        Huỷ
      </Button>
    </form>
  );
};

export default PromotionForm;