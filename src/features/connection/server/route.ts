import {Hono} from "hono";
import {zValidator} from "@hono/zod-validator";
import {createAzureOpenAiConnectionSchema} from "@/features/connection/schema";
import {sessionMiddleware} from "@/lib/session-middleware";

const app = new Hono()
    .post("/azureopenai",
        zValidator("json", createAzureOpenAiConnectionSchema),
        sessionMiddleware,
        async (c) => {
            const user = c.get("user");
            const connection = c.get("connection")

            const {api_endpoint, deployment_name, api_version, api_key} = c.req.valid("json")

            const result = await connection.createAzureOpenAiConnection({
                api_endpoint,
                deployment_name,
                api_version,
                api_key
            });

            return c.json({data: result})
        }
    );

export default app;