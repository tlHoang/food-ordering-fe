import { PostPromotion, Promotion } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreatePromotion = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createPromotionRequest = async (promotion: PostPromotion) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/promotion`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promotion),
    });

    if (!response.ok) {
      throw new Error("Failed to create promotion");
    }

    return response.json();
  };

  const { mutateAsync: createPromotion, isLoading, isError, isSuccess } = useMutation(createPromotionRequest);

  if (isSuccess) {
    // toast.success("Promotion created successfully");
  }

  if (isError) {
    // toast.error("Failed to create promotion");
  }

  return {
    createPromotion,
    isLoading,
    isError,
    isSuccess
  };
};

export const useGetPromotions = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getPromotionsRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/promotion`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch promotions");
    }

    return response.json();
  };

  return useQuery("promotions", getPromotionsRequest);
};

export const useUpdatePromotion = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updatePromotionRequest = async (promotion: any): Promise<any> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/promotion/${promotion._id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promotion),
    });

    if (!response.ok) {
      throw new Error("Failed to update promotion");
    }

    return response.json();
  };

  const { mutate: updatePromotion, isLoading, isSuccess, error } = useMutation(updatePromotionRequest);

  if (isSuccess) {
    // toast.success("Promotion updated successfully");
  }

  if (error) {
    // toast.error("Failed to update promotion");
  }

  return { updatePromotion, isLoading };
};

export const useGetPromotionsByRestaurant = (restaurantId?: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getPromotionsByRestaurantRequest = async (): Promise<Promotion[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/promotion/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch promotions");
    }

    return response.json();
  };

  return useQuery(["promotionsByRestaurant", restaurantId], getPromotionsByRestaurantRequest, {
    enabled: !!restaurantId,
  });
};
