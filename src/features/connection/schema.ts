import {z} from "zod";
import {AzureOpenAiApiVersion} from "@/llmur";

export const createAzureOpenAiConnectionSchema = z.object({
    api_endpoint: z.string().min(1, "Required"),
    api_key: z.string().min(1, "Required"),
    deployment_name: z.string().min(1, "Required"),
    api_version: z.nativeEnum(AzureOpenAiApiVersion),
});