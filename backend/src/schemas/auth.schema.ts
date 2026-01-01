import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string("Email is required")
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z
    .string("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(128, "Password cannot exceed 128 characters"),
  name: z
    .string("Name is required")
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),
});
export const loginSchema = z.object({
  email: z
    .string("Email is required")
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
