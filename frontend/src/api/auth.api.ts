import api from "../lib/axios";
import type { RegisterInput } from "../schemas/auth.schema";

export const loginRequest = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const registerRequest = async (data: RegisterInput) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const getMeRequest = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};

export const logoutRequest = async () => {
  await api.post("/auth/logout");
};
