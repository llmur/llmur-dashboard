import {Hono} from "hono";
import {sessionMiddleware} from "@/lib/session-middleware";
import {zValidator} from "@hono/zod-validator";
import {Provider} from "@/llmur";
import {formSchema} from "@/features/connections/schemas";

const app = new Hono()
    .get("/",
        sessionMiddleware,
        async (c) => {
            const connection = c.get("connection");

            const lst = await connection.list({});

            return c.json({data: lst});
        }).post(
        "/",
        zValidator("json", formSchema),
        sessionMiddleware,
        async (c) => {
            const connection = c.get("connection");

            const payload = c.req.valid("json");

            if(payload.provider === Provider.AzureOpenAi && payload.azureOpenAi) {
                const new_connection = await connection.createAzureOpenAiConnection({
                    api_endpoint: payload.azureOpenAi.api_endpoint,
                    deployment_name: payload.azureOpenAi.deployment_name,
                    api_key: payload.azureOpenAi.api_key,
                    api_version: payload.azureOpenAi.azure_openai_api_version,
                    access: payload.accessConfig.access,
                    projects: payload.accessConfig.projects
                })
                return c.json({data: new_connection});
            }
            else if (payload.provider === Provider.OpenAiV1) {
                return c.json({error: "Invalid payload"});
            }
            else {
                return c.json({error: "Invalid payload"});
            }
        }
    );

export default app;