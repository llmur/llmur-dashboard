import {z} from "zod";
import {ProjectRole} from "@/llmur";

export const createProjectSchema = z.object({
    name: z.string().trim().min(1, "Required")
});

export const updateProjectSchema = z.object({
    name: z.string().trim().min(1, "Must have at least 1 character").optional()
});

export const createInviteSchema = z.object({
    defaultRole: z.nativeEnum(ProjectRole),
    codeLength: z.number().min(6).max(32).optional().default(10),
    validity: z.string().optional()
});

export const createInviteSchemaBuilder = z.object({
    defaultRole: z.nativeEnum(ProjectRole),
    codeLength: z.number(),
    enableValidity: z.boolean(),
    validityNumber: z.number().optional(), // Initially optional
    validityUnit: z.enum(['s', 'm', 'h', 'd', 'w', 'M', 'y']).optional(), // Initially optional
}).superRefine((data, ctx) => {
    if (data.enableValidity) {
        if (!data.validityNumber) {
            ctx.addIssue({
                code: "custom", // Specify the issue type
                path: ["validityNumber"], // Highlight the validityNumber field
                message: "Required field",
            });
        }
        if (!data.validityUnit) {
            ctx.addIssue({
                code: "custom", // Specify the issue type
                path: ["validityUnit"], // Highlight the validityUnit field
                message: "Required field",
            });
        }
    }
});