import { z } from "zod";
import { AzureOpenAiApiVersion, Provider } from "@/llmur";

export const azureOpenAiConnectionSchema = z.object({
    api_endpoint: z.string().trim().min(1, "Required"),
    api_key: z.string().trim().min(1, "Required"),
    deployment_name: z.string().trim().min(1, "Required"),
    azure_openai_api_version: z.nativeEnum(AzureOpenAiApiVersion),
});

export const openAiV1ConnectionSchema = z.object({
    api_endpoint: z.string().trim().min(1, "Required"),
    api_key: z.string().trim().min(1, "Required"),
    model: z.string().trim().min(1, "Required"),
});

export const accessSchema = z.object({
    access: z.enum(["public", "private"]),
    projects: z.array(z.string()).default([]),
});

export const formSchema = z
    .object({
        provider: z.nativeEnum(Provider),
        openAiV1: openAiV1ConnectionSchema.optional(),
        azureOpenAi: azureOpenAiConnectionSchema.optional(),
        accessConfig: accessSchema,
    }).refine((data) => {
        if (data.provider === Provider.AzureOpenAi) {
            return data.azureOpenAi !== undefined;
        } else if (data.provider === Provider.OpenAiV1) {
            return data.openAiV1 !== undefined;
        }
        return false;
    });
