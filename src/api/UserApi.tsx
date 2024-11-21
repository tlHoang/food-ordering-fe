import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { User } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetUserById = (userId?: string) => {
  const { getAccessTokenSilently } = useAuth0();

  const getUserByIdRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const { data: user, isLoading, error } = useQuery(
    ["fetchUserById", userId],
    getUserByIdRequest,
    {
      enabled: !!userId,
    }
  );

  return { user, isLoading, error };
};