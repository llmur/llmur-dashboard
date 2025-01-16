import {AzureOpenAiApiVersion, Models, Provider} from "@/llmur";

export type Connection = Models.Connection;

export type ConnectionCreateFormData = {
    provider: Provider | "";
    azure_openai?: AzureOpenAiConnectionCreateData;
    openai_v1?: OpenAiV1ConnectionCreateData;
    access: "public" | "private";
    projects: string[];
}

export type AzureOpenAiConnectionCreateData = {
    api_endpoint: string;
    deployment_name: string;
    api_key: string;
    azure_openai_api_version: AzureOpenAiApiVersion | "";
}
export const initialAzureOpenAiConnectionCreateData: AzureOpenAiConnectionCreateData = {
    api_endpoint: '',
    deployment_name: '',
    api_key: '',
    azure_openai_api_version: ''
}

export type OpenAiV1ConnectionCreateData = {
    api_endpoint: string;
    api_key: string;
    model: string;
}
export const initialOpenAiV1ConnectionCreateData: OpenAiV1ConnectionCreateData = {
    api_endpoint: '',
    api_key: '',
    model: ''
}