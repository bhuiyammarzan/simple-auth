import type { AxiosResponse } from "axios";
import api from "../lib/axios";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";
import type { ApiResponseType } from "../types/user";

export const loginRequest = async (data: LoginInput) => {
  const res: AxiosResponse<ApiResponseType> = await api.post(
    "/auth/login",
    data
  );
  return res.data;
};

export const registerRequest = async (data: RegisterInput) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const getMeRequest = async () => {
  const res: AxiosResponse<ApiResponseType> = await api.get("/auth/me");
  return res.data;
};

export const logoutRequest = async () => {
  await api.post("/auth/logout");
};
