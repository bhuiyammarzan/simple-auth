import React, { createContext } from "react";
import type { LoginInput } from "../schemas/auth.schema";
import type { UserType } from "../types/user";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { loginRequest, logoutRequest } from "../api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryClient } from "../main";

type AuthContextType = {
  user: UserType | undefined;
  isAuthenticated: boolean;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
  });
  const logoutMutation = useMutation({
    mutationFn: logoutRequest,
  });

  const login = async (formData: LoginInput) => {
    const toastId = toast.loading("Logining user...");
    loginMutation.mutate(formData, {
      onSuccess: async (data) => {
        const accessToken = data.token || "";
        localStorage.setItem("accessToken", accessToken);
        toast.update(toastId, {
          render: "Login successful 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        axios.defaults.headers.common["Authorization"] = `Berer ${accessToken}`;
        await queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      },
      onError: (error) => {
        console.log("ERROR", error);
        toast.update(toastId, {
          render: "Something went wrong ❌",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      },
    });
  };

  const logout = (): void => {
    const toastId = toast.loading("Logging out...");

    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        queryClient.setQueryData(["auth-user"], null);
        toast.update(toastId, {
          render: "Logout successful 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      },
      onError: () => {
        toast.update(toastId, {
          render: "Something went wrong ❌",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
