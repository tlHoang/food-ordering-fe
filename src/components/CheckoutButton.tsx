import { Button } from "./ui/button";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading: boolean;
};

const CheckoutButton = () => {
  return (
    <Button className="w-full" type="submit">
      Thanh toán
    </Button>
  );
};

export default CheckoutButton