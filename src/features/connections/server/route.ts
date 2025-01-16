import {Hono} from "hono";
import {sessionMiddleware} from "@/lib/session-middleware";
import {zValidator} from "@hono/zod-validator";
import {z} from "zod";
import {createProjectSchema} from "@/features/projects/schemas";
import {createConnectionSchema} from "@/features/connections/schemas";
import {Provider} from "@/llmur";

const app = new Hono()
    .get("/",
        sessionMiddleware,
        async (c) => {
            const connection = c.get("connection");

            const lst = await connection.list({});

            return c.json({data: lst});
        }).post(
        "/",
        zValidator("json", createConnectionSchema),
        sessionMiddleware,
        async (c) => {
            const connection = c.get("connection");

            const payload = c.req.valid("json");

            if (payload.provider === Provider.AzureOpenAi) {
                const new_connection = await connection.createAzureOpenAiConnection({
                    deployment_name: payload.deployment_name,
                    api_endpoint: payload.api_endpoint,
                    api_key: payload.api_key,
                });
            }

            return c.json({data: new_project});
        }
    );

export default app;