import {z} from "zod";
import {AzureOpenAiApiVersion, ProjectRole, Provider} from "@/llmur";

export const createAzureOpenAiConnectionSchema = z.object({
    api_endpoint: z.string().trim().min(1, "Required"),
    api_key: z.string().trim().min(1, "Required"),
    deployment_name: z.string().trim().min(1, "Required"),
    azure_openai_api_version: z.nativeEnum(AzureOpenAiApiVersion)
});

export const createOpenAiV1ConnectionSchema = z.object({
    api_endpoint: z.string().trim().min(1, "Required"),
    api_key: z.string().trim().min(1, "Required"),
    model: z.string().trim().min(1, "Required"),
});

export const createConnectionSchema = z.object({
    api_endpoint: z.string().trim().min(1, "Required"),
    api_key: z.string().trim().min(1, "Required"),
    deployment_name: z.string().trim().min(1).optional(),
    provider: z.nativeEnum(Provider),
    azure_openai_api_version: z.nativeEnum(AzureOpenAiApiVersion).optional(),
    model: z.string().trim().min(1).optional(),
    access: z.enum(["public", "private"]),
    projects: z.array(z.string()).optional()
}).refine((data) => {
    if (data.provider === Provider.AzureOpenAi && (!data.deployment_name || !data.azure_openai_api_version)) {
        return false; // Fails validation
    }
    return true; // Passes validation
}, {
    message: "`deployment_name` and `azure_openai_api_version` is required when `provider` is `Azure OpenAi`.",
    path: ["deployment_name", "azure_openai_api_version"],
});