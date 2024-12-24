import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(1, "Password required"),
})

export const registerSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
})