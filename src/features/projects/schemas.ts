import {z} from "zod";

export const createProjectSchema = z.object({
    name: z.string().trim().min(1, "Required")
});

export const updateProjectSchema = z.object({
    name: z.string().trim().min(1, "Must have at least 1 character").optional()
});