import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse, Promotion } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurant",
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    // if (!response.ok) {
    //   throw new Error("Failed to get restaurant");
    // }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};

export const useGetRestaurantPromotions = (restaurantId?: string) => {
  const getPromotionsByRestaurantIdRequest = async (): Promise<Promotion[]> => {
    const response = await fetch(
      // `https://dut-food-ordering.onrender.com/api/promotion/673d96a2ccef09ead9f21f91`
      `https://dut-food-ordering.onrender.com/api/promotion/${restaurantId}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to get promotions");
      }
      
      return response.json();
    };
    
    const { data: promotions, isLoading } = useQuery(
      ["fetchPromotions", restaurantId],
      getPromotionsByRestaurantIdRequest,
      {
        enabled: !!restaurantId,
      }
      );
      
      return { promotions, isLoading };
  };