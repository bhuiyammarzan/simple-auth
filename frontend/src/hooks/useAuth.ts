import { useQuery } from "@tanstack/react-query";
import { getMeRequest } from "../api/auth.api";

export const useAuth = () => {
  const {
    data: response,
    isPending,
    error,
  } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getMeRequest,
    retry: false,
    staleTime: Infinity,
  });
  return { user: response?.user, loading: isPending, error };
};
