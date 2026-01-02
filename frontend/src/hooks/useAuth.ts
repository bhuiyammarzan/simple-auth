import { useQuery } from "@tanstack/react-query";
import { getMeRequest } from "../api/auth.api";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: getMeRequest,
    retry: false,
    staleTime: Infinity,
  });
};
