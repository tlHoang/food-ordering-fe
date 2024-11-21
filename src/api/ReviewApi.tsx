import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetReviews = (restaurantId?: string) => {
  const getReviewsRequest = async () => {
    const response = await fetch(`${API_BASE_URL}/api/review/${restaurantId}`);
    if (!response.ok) {
      throw new Error("Failed to get reviews");
    }
    return response.json();
  };

  return useQuery(["reviews", restaurantId], getReviewsRequest);
};

type CreateReviewRequest = {
  restaurantId: string;
  rating: number;
  comment: string;
};

export const useCreateReview = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createReviewRequest = async (review: CreateReviewRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/review`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (!response.ok) {
      throw new Error("Failed to create review");
    }
  };

  return useMutation(createReviewRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      toast.success("Review created successfully");
    },
    onError: () => {
      toast.error("Failed to create review");
    },
  });
};

export const useDeleteReview = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const deleteReviewRequest = async (reviewId: string) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/review/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete review");
    }
  };

  return useMutation(deleteReviewRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      toast.success("Review deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete review");
    },
  });
};